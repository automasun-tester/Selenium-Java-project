package pages;

import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.Properties;

import static base.BaseClass.loc;

@Slf4j
public class OfficeSettings {
    private final WebDriver driver;
    private static final Properties officeset_loc = new Properties();
    private final WebDriverWait wait;
    String itemToCheck = "test 5";

    public OfficeSettings(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20); // Increased wait time to 10 seconds
    }


    public void setup() throws IOException {
        File officepage = new File("src/test/resources/Config/office_settings.properties");
        if (officepage.exists()) {
            FileReader officeset = new FileReader(officepage);

            officeset_loc.load(officeset);
            log.info("Office_settings :Config properties loaded successfully.");
        } else {
            throw new FileNotFoundException("Office_settings :Config file not found at " + officepage.getPath());
        }
    }

    public void open_office_settings() throws InterruptedException {
        Thread.sleep(1000);
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(loc.getProperty("top_right_profile_dd")))).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(loc.getProperty("setting_link")))).click();
        log.info("OfficeSettings : open_office_settings : Office Setting opened");
    }


    public void click_create_appt_type_button() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officeset_loc.getProperty("create_appt_type_button")))).click();
        log.info("OfficeSettings : click_create_appt_type_button : Clicked on the Create appt type button");
    }

    public void create_appt_type() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officeset_loc.getProperty("create_appt_type_name")))).sendKeys(itemToCheck);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officeset_loc.getProperty("create_appt_type_submit")))).click();
        log.info("OfficeSettings : create_appt_type : Created appt type ");
    }

    public void validate_appt_type_create() {
        boolean isItemFound = false;
        WebElement table = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officeset_loc.getProperty("appt_type_validate"))));
        // Locate all rows in the table body
        List<WebElement> rows = table.findElements(By.xpath(".//tr"));
        // Iterate through the rows to find the item
        for (WebElement row : rows) {
            // Locate the type containing the item name
            WebElement type = row.findElement(By.xpath(".//td[2]"));
//            System.out.println("Row found for item: " + type.getText());
            // Check if the type's text matches the expected item
            if (type.getText().equals(itemToCheck)) {
                log.info("OfficeSettings :validate_appt_type_create: Item found in the table.");
                isItemFound = true;
                break;
            }
        }
        if (!isItemFound)
            log.error("OfficeSettings :validate_appt_type_create: Item not found in the table.");
    }

    public void edit_appt_type() {
        boolean isItemFound = false;
        WebElement table = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officeset_loc.getProperty("appt_type_validate"))));
        // Locate all rows in the table body
        List<WebElement> rows = table.findElements(By.xpath(".//tr"));

        // Iterate through the rows to find the item
        for (WebElement row : rows) {
            // Locate the type containing the item name
            WebElement type = row.findElement(By.xpath(".//td[2]"));

            // Check if the type's text matches the expected item
            if (type.getText().equals(itemToCheck)) {
                edit_process(row);
                break;
            }
        }

    }

    private void edit_process(WebElement appt) {
        Actions actions = new Actions(driver);// Create an Actions instance and perform the hover
        actions.moveToElement(appt).perform();// doing hovering action to unhide the edit and delete button

        // wait and click the edit
        wait.until(ExpectedConditions.elementToBeClickable(appt.findElement(By.xpath(".//td[6]//a[1]")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officeset_loc.getProperty("create_appt_type_duration")))).clear();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officeset_loc.getProperty("create_appt_type_duration")))).sendKeys("20");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officeset_loc.getProperty("create_appt_type_submit")))).click();

    }

    public void validate_edit_appt() {
        boolean isItemFound = false;
        WebElement table = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officeset_loc.getProperty("appt_type_validate"))));
        // Locate all rows in the table body
        List<WebElement> rows = table.findElements(By.xpath(".//tr"));
        // Iterate through the rows to find the item
        for (WebElement row : rows) {
            // Locate the type containing the item name
            WebElement type = row.findElement(By.xpath(".//td[2]"));
            System.out.println("Row found for type: " + type.getText());
            // Check if the type's text matches the expected item
            if (type.getText().equals(itemToCheck)) {
                WebElement duration = row.findElement(By.xpath(".//td[4]"));
                System.out.println("Row found for duration: " + duration.getText());
                if(duration.getText().equals("20")) {
                    log.info("OfficeSettings :validate_edit_appt: Item found in the table.");
                    isItemFound = true;
                    break;
                }
            }
        }
        if (!isItemFound)
            log.error("OfficeSettings :validate_edit_appt: Item not found in the table.");
    }

    public void delete_appt_type() throws InterruptedException {
        driver.navigate().refresh();
        Thread.sleep(2000);
        boolean isItemFound = false;
        WebElement table = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officeset_loc.getProperty("appt_type_validate"))));
        // Locate all rows in the table body
        List<WebElement> rows = table.findElements(By.xpath(".//tr"));
        int i=1;
        // Iterate through the rows to find the item
        for (WebElement row : rows) {
            // Locate the type containing the item name
            WebElement type = row.findElement(By.xpath(".//td[2]"));

            // Check if the type's text matches the expected item to delete
            if (type.getText().equals(itemToCheck)) {
                delete_process(row);
                break;
            }i++;
        }
    }

    private void delete_process(WebElement del)  {
        Actions actions = new Actions(driver);// Create an Actions instance and perform the hover
        actions.moveToElement(del).perform();

        // wait and click the delete
        wait.until(ExpectedConditions.visibilityOf(del.findElement(By.xpath(".//td[6]//a[2]//i")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officeset_loc.getProperty("appt_type_delete")))).click();
        log.info("OfficeSettings :delete_appt_type: Item deleted from the table.");
    }
}