package pages;

import lombok.extern.slf4j.Slf4j;
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
public class EditUser {
    private final WebDriver driver;
    private static final Properties useredit = new Properties();
    private final WebDriverWait wait;

    public EditUser(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15); // Increased wait time to 15 seconds
    }
    public void setup() throws IOException {
        File configFile = new File("src/test/resources/Config/edit_user.properties");
        if (configFile.exists()) {
            FileReader EditUser_loc = new FileReader(configFile);
            useredit.load(EditUser_loc);
            log.info(" Edit_User :Config properties loaded successfully.");
        } else {
            throw new FileNotFoundException("Edit_User :Config file not found at " + configFile.getPath());
        }
    }
    public void activating() throws InterruptedException {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(useredit.getProperty("edit_active_yes"))));
        driver.findElement(By.xpath(useredit.getProperty("edit_active_yes"))).click();
    }

    public void deactivating(){
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(useredit.getProperty("edit_active_no"))));
        driver.findElement(By.xpath(useredit.getProperty("edit_active_no"))).click();
    }
    public void submit_edit(){
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(useredit.getProperty("edit_submit"))));
        driver.findElement(By.xpath(useredit.getProperty("edit_submit"))).click();
    }
}
