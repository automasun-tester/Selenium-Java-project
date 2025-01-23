package pages;

import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.junit.Assert;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

import static base.BaseClass.loc;

@Slf4j
public class LoginTest {

    private WebDriver driver;
    private WebDriverWait wait;
    private static final Properties creds = new Properties();

    public LoginTest(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15); // Increased wait time to 15 seconds
    }

    public void setup() throws IOException {
        File configFile = new File("src/test/resources/Config/user_creds.properties");
        if (configFile.exists()) {
            FileReader credentials = new FileReader(configFile);
            creds.load(credentials);
            log.info("Login :Config properties loaded successfully.");
        } else {
            throw new FileNotFoundException("Login :Config file not found at " + configFile.getPath());
        }
    }

//    //failure scenario
//    public void login(String userType) {
//        String username;
//        String password;
//
//        switch (userType.toLowerCase()) {
//            case "provider":
//                username = baseClass.prop.getProperty("prouser");
//                password = baseClass.prop.getProperty("pass");
//                break;
//            case "attorney":
//                username = baseClass.prop.getProperty("attuser");
//                password = baseClass.prop.getProperty("pass");
//                break;
//            default:
//                throw new IllegalArgumentException("Invalid user type: " + userType);
//        }
//
//        // Wait for the username field to be visible before interacting
//        WebElement usernameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("username")));
//        WebElement passwordField = driver.findElement(By.name("password"));
//        WebElement loginButton = driver.findElement(By.cssSelector("button.btn.btn-default.submit[type='submit']"));
//
//        usernameField.sendKeys(username);
//        passwordField.sendKeys(password);
//        loginButton.click();
//
//        // Log the current URL for debugging purposes
//        System.out.println("Current URL after login: " + driver.getCurrentUrl());
//
//        // Update the expected URL to the correct one ("case" instead of "caselist")
//        wait.until(ExpectedConditions.urlContains("case"));
//
//        // Intentionally fail: Expecting an incorrect URL (for testing failure scenario)
//        String expectedUrl = "officelist"; // Wrong expectation for failure
//        String currentUrl = driver.getCurrentUrl();
//
//        // Assertion: This will fail because the expected URL is incorrect
//        Assert.assertTrue("Expected URL to contain 'officelist', but was redirected to: " + currentUrl, currentUrl.contains(expectedUrl));
//    }

    //success scenario
    public void login(String userType) {
        String username;
        String password;

        switch (userType.toLowerCase()) {
            case "provider":
                username = creds.getProperty("prouser");
                password = creds.getProperty("pass");
                break;
            case "attorney":
                username = creds.getProperty("attuser");
                password = creds.getProperty("pass");
                break;
            case "provider group":
                username = creds.getProperty("gp_user");
                password = creds.getProperty("gp_pass");
                break;
            case "attorney group":
                username = creds.getProperty("ga_user");
                password = creds.getProperty("ga_pass");
                break;
            case "superadmin":
                username = creds.getProperty("adminId");
                password = creds.getProperty("adminpass");
                break;

            default:
                throw new IllegalArgumentException("Invalid user type: " + userType);
        }

        // Wait for the username field to be visible before interacting
        WebElement usernameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("username")));
        WebElement passwordField = driver.findElement(By.name("password"));
        WebElement loginButton = driver.findElement(By.cssSelector("button.btn.btn-default.submit[type='submit']"));

        usernameField.sendKeys(username);
        passwordField.sendKeys(password);
        loginButton.click();

//        if(driver.findElement(By.id("error-login")).isDisplayed()) {
//            log.error("Error in login");
//        }

        // Log the current URL for debugging purposes
        System.out.println("Current URL after login: " + driver.getCurrentUrl());

        // Correct the expected URL to match the actual successful login URL
        wait.until(ExpectedConditions.urlContains("case"));

        // Verify that the actual URL contains "case", which indicates a successful login
        String currentUrl = driver.getCurrentUrl();
        Assert.assertTrue("Expected URL to contain 'case', but was redirected to: " + currentUrl, currentUrl.contains("case"));
    }


    public void logout() throws IOException {
        try {
            Thread.sleep(1000);
            WebElement menu_dropdown = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(loc.getProperty("top_right_profile_dd"))));
            wait.until(ExpectedConditions.elementToBeClickable(menu_dropdown)).click();
            // Wait for the logout button to be present and visible
            WebElement logoutButton = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(loc.getProperty("logout_link"))));

            // Ensure the element is clickable
            wait.until(ExpectedConditions.elementToBeClickable(logoutButton));

            logoutButton.click();
            log.info("Logged out successfully.");
        } catch (TimeoutException e) {
            log.error("Logout button not found within the timeout period.");
            System.out.println("Page Source at the time of failure:\n" + driver.getPageSource());
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

}
