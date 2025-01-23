package pages;

import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

@Slf4j
public class EditOffice {
    private final WebDriver driver;
    private static final Properties editoffice_loc = new Properties();
    private final WebDriverWait wait;

    public EditOffice(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15); // Increased wait time to 15 seconds
    }


    public void setup() throws IOException {
        File officepage = new File("src/test/resources/Config/edit_office.properties");
        if (officepage.exists()) {
            FileReader UserList_loc = new FileReader(officepage);
            editoffice_loc.load(UserList_loc);
            log.info("Edit_Office :Config properties loaded successfully.");
        } else {
            throw new FileNotFoundException("Edit_Office :Config file not found at " + officepage.getPath());
        }
    }

    public void activating_office() {  //activating the office
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(editoffice_loc.getProperty("office_active_yes")))).click();
    }

    public void deactivating_office() {  //deactivating the office
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(editoffice_loc.getProperty("office_active_no")))).click();
    }

    public void submit_edit_office() throws InterruptedException {
        Thread.sleep(500);
        driver.findElement(By.xpath(editoffice_loc.getProperty("office_edit_submit"))).click();
        //validating submit
        if (wait.until(ExpectedConditions.titleIs("SimplifyPI | Office List"))) {
            log.info("Edit Office : Form Submitted Successfully ");
        } else {
            log.error("Edit Office : Form Submit Unsuccessful");
            Assert.fail();
        }
    }

}
