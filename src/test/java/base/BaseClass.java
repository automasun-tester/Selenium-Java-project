package base;


import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import io.github.bonigarcia.wdm.WebDriverManager;
import lombok.extern.slf4j.Slf4j;
import net.datafaker.Faker;
import org.apache.log4j.PropertyConfigurator;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.logging.LogEntries;
import org.openqa.selenium.logging.LogEntry;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;
import pages.LogReportGenerator;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Locale;
import java.util.Properties;

@Slf4j
public class BaseClass {

    private static final ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    public static final Properties prop = new Properties();
    public static final Properties loc = new Properties();
    public static final Properties store = new Properties();
    public static Faker random = new Faker(new Locale("en-US"));
    public static String scan;
    private final LogReportGenerator reportGenerator = new LogReportGenerator();

    public static WebDriver getDriver() {
        return driver.get();
    }

    @Before
    public void beforeScenario(Scenario scenario) {
        String featureName = extractFeatureName(scenario);
        log.info("Feature: {}", featureName);
        log.info("Starting scenario: {}", scenario.getName());
        scan = scenario.getName();
    }

    @After
    public void afterScenario(Scenario scenario) {
        if (scenario.isFailed()) {
            handleScenarioFailure(scenario);
        } else {
            log.info("Scenario passed: {}", scenario.getName());
        }
        reportGenerator.generateReportAfterTestSuite();
    }

    @BeforeSuite
    public void clearLogFile() {
        PropertyConfigurator.configure("src/test/resources/log4j.properties");
    }

    @BeforeMethod
    public void setup() {
        if (getDriver() == null) {
            try {
                loadProperties();
                initializeBrowser();
            } catch (Exception e) {
                log.error("Error during setup: {}", e.getMessage(), e);
                throw new RuntimeException("Setup failed", e);
            }
        }
    }

    @AfterMethod
    public void tearDown() {
        if (getDriver() != null) {
            captureBrowserLogs();
            quitDriver();
        }
    }

    private String extractFeatureName(Scenario scenario) {
        String featureFilePath = scenario.getUri().toString().replace("file:", "");
        return new File(featureFilePath).getName().replace(".feature", "");
    }

    private void handleScenarioFailure(Scenario scenario) {
        log.error("Scenario failed: {}", scenario.getName());
        if (getDriver() != null) {
            captureBrowserLogs();
            getDriver().manage().deleteAllCookies();
            quitDriver();
        }
    }

    private void loadProperties() throws IOException {
        loadPropertyFile("src/test/resources/Config/config.properties", prop);
        loadPropertyFile("src/test/resources/Config/common_locators.properties", loc);
        loadPropertyFile("src/test/resources/Config/test.properties", store);
    }

    private void loadPropertyFile(String filePath, Properties properties) throws IOException {
        File file = new File(filePath);
        if (file.exists()) {
            try (FileReader reader = new FileReader(file)) {
                properties.load(reader);
                log.info("Loaded properties from {}", filePath);
            }
        } else {
            log.error("Property file not found at {}", filePath);
            throw new IOException("Property file not found: " + filePath);
        }
    }

    private void initializeBrowser() {
        String browser = prop.getProperty("browser");
        if (browser == null) {
            throw new IllegalArgumentException("Browser type not specified in config.properties");
        }

        switch (browser.toLowerCase()) {
            case "chrome":
                setupChromeDriver();
                break;
            case "firefox":
                setupFirefoxDriver();
                break;
            default:
                throw new IllegalArgumentException("Unsupported browser type: " + browser);
        }

        String testUrl = prop.getProperty("test_url");
        if (testUrl == null || testUrl.isEmpty()) {
            throw new IllegalArgumentException("Test URL not specified in config.properties");
        }
        getDriver().get(testUrl);
        log.info("Navigated to test URL: {}", testUrl);
    }

    private void setupChromeDriver() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        configureBrowserOptions(options);
        driver.set(new ChromeDriver(options));
    }

    private void setupFirefoxDriver() {
        WebDriverManager.firefoxdriver().setup();
        FirefoxOptions options = new FirefoxOptions();
        configureBrowserOptions(options);
        driver.set(new FirefoxDriver(options));
    }

    private void configureBrowserOptions(ChromeOptions options) {
        configureCommonBrowserOptions(options);
        if (Boolean.parseBoolean(prop.getProperty("headless"))) {
            options.addArguments("--headless");
        }
    }

    private void configureBrowserOptions(FirefoxOptions options) {
        configureCommonBrowserOptions(options);
        if (Boolean.parseBoolean(prop.getProperty("headless"))) {
            options.addArguments("--headless");
        }
    }

    private void configureCommonBrowserOptions(Object options) {
        if (options instanceof ChromeOptions) {
            ((ChromeOptions) options).addArguments("--no-sandbox", "--disable-dev-shm-usage", "--window-size=1920,1080", "--disable-cache", "--disable-site-isolation-trials");
        } else if (options instanceof FirefoxOptions) {
            ((FirefoxOptions) options).addArguments("--no-sandbox", "--disable-dev-shm-usage", "--window-size=1920,1080", "--disable-cache", "--disable-site-isolation-trials");
        }
    }

    private void captureBrowserLogs() {
        try {
            LogEntries logs = getDriver().manage().logs().get("browser");
            for (LogEntry logEntry : logs) {
                log.info("{}: {}", logEntry.getLevel(), logEntry.getMessage());
            }
        } catch (Exception e) {
            log.error("Error capturing browser logs: {}", e.getMessage());
        }
    }

    private void quitDriver() {
        try {
            getDriver().quit();
            log.info("Browser closed successfully.");
        } catch (Exception e) {
            log.error("Error while quitting the driver: {}", e.getMessage());
        } finally {
            driver.remove();
            log.info("Driver removed from ThreadLocal.");
        }
    }
}
