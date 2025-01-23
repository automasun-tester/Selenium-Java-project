package pages;

import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

import static base.BaseClass.loc;
import static base.BaseClass.store;

@Slf4j
public class BillsRecordsRequested {

    private final WebDriver driver;
    private final WebDriverWait wait;
    private static final Properties billsRecords = new Properties();

    private static final String CONFIG_PATH = "src/test/resources/Config/bills_record_requested.properties";

    public BillsRecordsRequested(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 10);
    }

    public void setup() throws IOException {
        File configFile = new File(CONFIG_PATH);
        if (!configFile.exists()) {
            throw new FileNotFoundException("Config file not found at " + configFile.getPath());
        }
        try (FileReader reader = new FileReader(configFile)) {
            billsRecords.load(reader);
            log.info("Config properties loaded successfully from {}.", CONFIG_PATH);
        }
    }

    public void checkRequestBillsRecords() {
        String caseName = getTextFromElement(By.xpath(billsRecords.getProperty("br_case_name")));
        String searchedName = store.getProperty("create_case_first_name");

        if (caseName.contains(searchedName)) {
            log.info("Search successful: Case name '{}' contains the searched name '{}'.", caseName, searchedName);
        } else {
            log.error("Search failed: Case name '{}' does not contain the searched name '{}'.", caseName, searchedName);
            Assert.fail("Search failed: Case name mismatch.");
        }
    }

    public void goToBillsRecordsTab() {
        clickElement(By.xpath(loc.getProperty("bills_rec_req_tab")), "bills and records tab");
    }

    public void searchRequestRecordsCase() {
        WebElement searchBar = waitUntilVisible(By.xpath(billsRecords.getProperty("br_search")), "search bar");
        searchBar.click();
        log.info("Clicked the search bar.");

        String searchValue = store.getProperty("create_case_first_name");
        searchBar.sendKeys(searchValue);
        log.info("Entered case name '{}'.", searchValue);

        waitUntilTextPresent(By.xpath(billsRecords.getProperty("br_case_name")), searchValue, "case name");
    }

    public void openRequestedRecordsCase() {
        WebElement link = getElement(By.xpath(billsRecords.getProperty("br_case_name")), "case name link");
        removeTargetAttribute(link);
        link.click();
        log.info("Clicked on the case name link.");
    }

    private WebElement getElement(By locator, String elementDescription) {
        try {
            return driver.findElement(locator);
        } catch (Exception e) {
            log.error("Failed to locate element '{}': {}", elementDescription, e.getMessage());
            throw e;
        }
    }

    private WebElement waitUntilVisible(By locator, String elementDescription) {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        } catch (Exception e) {
            log.error("Timed out waiting for visibility of '{}': {}", elementDescription, e.getMessage());
            throw e;
        }
    }

    private void waitUntilTextPresent(By locator, String text, String elementDescription) {
        try {
            wait.until(ExpectedConditions.textToBePresentInElementLocated(locator, text));
        } catch (Exception e) {
            log.error("Timed out waiting for text '{}' to be present in '{}': {}", text, elementDescription, e.getMessage());
            throw e;
        }
    }

    private void clickElement(By locator, String elementDescription) {
        WebElement element = waitUntilVisible(locator, elementDescription);
        element.click();
        log.info("Clicked on '{}'.", elementDescription);
    }

    private String getTextFromElement(By locator) {
        WebElement element = getElement(locator, "element");
        return element.getText();
    }

    private void removeTargetAttribute(WebElement element) {
        ((JavascriptExecutor) driver).executeScript("arguments[0].removeAttribute('target')", element);
    }
}
