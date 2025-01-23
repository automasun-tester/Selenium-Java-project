package pages;

import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

import static base.BaseClass.prop;

@Slf4j
public class EditCase {
    private final WebDriver driver;
    private static final Properties edit = new Properties();
    private final WebDriverWait wait;
    private Select state;

    public EditCase(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15); // Increased wait time to 15 seconds
    }
    public void setup() throws IOException {
        File configFile = new File("src/test/resources/Config/create_case.properties");
        if (configFile.exists()) {
            FileReader casedit = new FileReader(configFile);
            edit.load(casedit);
            log.info("Edit_Case :Config properties loaded successfully.");
        } else {
            throw new FileNotFoundException("Case create :Config file not found at " + configFile.getPath());
        }
    }
    public void editing_case_details(){
        if(prop.getProperty("gender").equalsIgnoreCase("male")) {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(edit.getProperty("radio_male")))).click();//checkmark to male radio button
        }
        else {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(edit.getProperty("radio_female")))).click();//checkmark to male radio button
        }
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(edit.getProperty("submit_xpath")))).click();

    }

    public void delete_the_case() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(edit.getProperty("delete_case")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(edit.getProperty("delete_confirmation")))).click();

    }

    public void delete_the_case_provider_group() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(edit.getProperty("delete_case_pg")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(edit.getProperty("delete_confirmation")))).click();

    }
}

