package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.WatchEvent;
import java.util.Properties;

import static base.BaseClass.*;

public class Schedule {
    private final WebDriver driver;
    private static final Properties appt = new Properties();
    private final WebDriverWait wait;
    private Select state, office;

    public Schedule(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15); // Increased wait time to 15 seconds
    }
    public void setup() throws IOException {
        File configFile = new File("src/test/resources/Config/schedule.properties");
        if (configFile.exists()) {
            FileReader casepro = new FileReader(configFile);
            appt.load(casepro);
//            log.info("Schedule :Config properties loaded successfully.");
        } else {
            throw new FileNotFoundException("Schedule :Config file not found at " + configFile.getPath());
        }
    }
    //#1075-branch-start
    public void open_scheduler(){
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(loc.getProperty("scheduler_tab")))).click();
    }

    public void create_appt_scheduler() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(appt.getProperty("scheduler_at_10_30")))).click();
    }

    public void fill_appt_form_scheduler() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(appt.getProperty("new_appt_case_name")))).sendKeys(store.getProperty("create_case_last_name"));
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(appt.getProperty("new_appt_case_name_dd")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(appt.getProperty("new_appt_textarea")))).sendKeys("new appointment");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(appt.getProperty("new_appt_submit")))).click();
    }

    public void locate_appt_right_click_for_options() {
        WebElement appointment  = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(appt.getProperty("scheduler_at_10_30"))));
        // Perform right-click
        Actions actions = new Actions(driver);
        actions.contextClick(appointment).perform();
    }

    public void click_edit_and_modify_the_note() {
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(appt.getProperty("appt_edit_option")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(appt.getProperty("appt_edit_textarea")))).sendKeys(" edited");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(appt.getProperty("appt_edit_submit")))).click();
    }

    public void delete_the_appointment() {
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(appt.getProperty("appt_delete_option")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(appt.getProperty("appt_delete_button")))).click();
    }
    //#1075-branch-end
}
