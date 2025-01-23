package pages;

import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.*;
import java.util.Properties;

import static base.BaseClass.*;
@Slf4j
public class OfficeList {

    private final WebDriver driver;
    private static final Properties officepage_loc = new Properties();
    private final WebDriverWait wait;

    public OfficeList(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20); // Increased wait time to 20 seconds
    }


    public void setup() throws IOException {
        File officepage = new File("src/test/resources/Config/office_list.properties");
        if (officepage.exists()) {
            FileReader UserList_loc = new FileReader(officepage);

            officepage_loc.load(UserList_loc);
            log.info("Office_list :Config properties loaded successfully.");
        } else {
            throw new FileNotFoundException("User_List :Config file not found at " + officepage.getPath());
        }}


    public void Open_officelist(){
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(loc.getProperty("office_tab_button")))).click();
            log.info("Office List : Open Office List");
        } catch (Exception e) {
            log.error("Office List : Not able open Office List");
            Assert.fail();
        }

    }


    public void superadmin_create_office_button(){
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("create_office_button")))).click();
            log.info("Office List : SuperAdmin : Clicked create office button");
        } catch (Exception e) {
            log.error("Office List : SuperAdmin : Not able to click create office button");
            Assert.fail();
        }
    }

    public void open_inactive_list(){
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("inactive_button")))).click();
            log.info("Office List : Inactive office List Button working");
        } catch (Exception e) {
            log.error("Office List : Inactive Office Button not clicked");
            Assert.fail();
        }
    }

    public void search_inactive_provider() throws InterruptedException {//searching
        //clicking on the inactive tab
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("inactive_provider_tab")))).click();
        //searching the inactive provider
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("inactive_provider_search")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("inactive_provider_search")))).sendKeys(store.getProperty("create_office_name_provider"));
        //Validation the searched provider with the list

//        String first_element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("inactive_provider_table_firstname")))).getText();
//        log.info("data found in table Before search"+first_element);
        Thread.sleep(1000);
        if (wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(officepage_loc.getProperty("inactive_provider_table_firstname")), (store.getProperty("create_office_name_provider")))))        {
            log.info("Office_list : Inactive Provider : Search Successful ");
            log.info("data found in table after search "+driver.findElement(By.xpath(officepage_loc.getProperty("inactive_provider_table_firstname"))).getText());
            log.info("data that is searched "+store.getProperty("create_office_name_provider"));

        }
        else {
            log.info("data found in table after search "+driver.findElement(By.xpath(officepage_loc.getProperty("inactive_provider_table_firstname"))).getText());
            log.info("data that is searched "+store.getProperty("create_office_name_provider"));
            log.error("Office_list : Inactive Provider : Search Unsuccessful ");
            Assert.fail();
        }}
    public void edit_inactive_provider(){
        //opening the edit office page
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("inactive_provider_edit")))).click();
    }

    public void edit_inactive_attorney(){
        //opening the edit office page
        driver.findElement(By.xpath(officepage_loc.getProperty("inactive_attorney_edit"))).click();
    }

    public void search_inactive_attorney() throws InterruptedException {
        //clicking on the inactive tab
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("inactive_attorney_tab")))).click();
        //searching the inactive attorney
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(officepage_loc.getProperty("inactive_attorney_search")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("inactive_attorney_search")))).sendKeys(store.getProperty("create_office_name_attorney"));
        //Validation the searched provider with the list
        Thread.sleep(1000);
        if (wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(officepage_loc.getProperty("inactive_attorney_table_firstname")), store.getProperty("create_office_name_attorney")))){
            log.info("Office_list : Inactive Attorney : Search Successful ");
        }
        else {
            log.error("Office_list : Inactive Attorney : Search Unsuccessful ");
            Assert.fail();
        }}

    public void validating_provider_activation() throws InterruptedException {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("active_provider_tab")))).click();
        driver.findElement(By.xpath(officepage_loc.getProperty("active_provider_search"))).click();
        driver.findElement(By.xpath(officepage_loc.getProperty("active_provider_search"))).sendKeys(store.getProperty("create_office_name_provider"));
        Thread.sleep(1000);
        if (wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(officepage_loc.getProperty("active_provider_table_firstname")), store.getProperty("create_office_name_provider")))){
            log.info("Office_list : active Provider : Search Successful ");
        }
        else {
            log.error("Office_list : active Provider : Search Unsuccessful ");
            Assert.fail();
        }}


    public void validating_attorney_activation() throws InterruptedException {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("active_attorney_tab")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("active_attorney_search")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("active_attorney_search")))).sendKeys(store.getProperty("create_office_name_attorney"));
        Thread.sleep(1000);
        if (wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(officepage_loc.getProperty("active_attorney_table_firstname")), store.getProperty("create_office_name_attorney")))){
            log.info("Office_list : active Attorney : Search Successful ");
        }
        else {
            log.error("Office_list : active Attorney : Search Unsuccessful ");
            Assert.fail();
        }}


    public void create_office_button(){
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("add_office_button_dd")))).click();
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("create_office_option")))).click();
            log.info("Office List : UserAdmin : Able to click create office option");
        } catch (Exception e) {
            log.error("Offer List : UserAdmin : Unable to click create office option");
            Assert.fail();
        }
    }

    public void open_office_request_attorney(){
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("create_office_request")))).click();
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("attorney_office_request")))).click();
            log.info("Office List : UserAdmin : Able to open the office request for Attorney");
        } catch (Exception e) {
            log.error("Office List : UserAdmin : Unable to open office request for attorney");
            Assert.fail();
        }
    }

    public void open_office_request_provider(){
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("create_office_request")))).click();
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("provider_office_request")))).click();
            log.info("Office List : UserAdmin : Able to open the office request for Provider");
        } catch (Exception e) {
            log.error("Office List : UserAdmin : Unable to open office request for Provider");
            Assert.fail();
        }
    }



    public void search_request_attorney(){
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("attorney_office_request_search")))).click();
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("attorney_office_request_search")))).sendKeys(store.getProperty("create_office_name_attorney"));
            Thread.sleep(1000);
            if (wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(officepage_loc.getProperty("attorney_office_request_name")), store.getProperty("create_office_name_attorney")))){
                log.info("Office List : UserAdmin : Able to search office request for Attorney");
            }

        } catch (Exception e) {
            log.error("Office List : UserAdmin : Unable to search office request for Attorney");
            Assert.fail();
        }
    }

    public void search_request_provider(){
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("provider_office_request_search")))).click();
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("provider_office_request_search")))).sendKeys(store.getProperty("create_office_name_provider"));
            Thread.sleep(1000);
            if (wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(officepage_loc.getProperty("provider_office_request_name")), store.getProperty("create_office_name_provider")))){
                log.info("Office List : UserAdmin : Able to search office request for Provider");
            }

        } catch (Exception e) {
            log.error("Office List : UserAdmin : Unable to search office request for Provider");
            Assert.
                    fail();
        }
    }

    public void approve_attorney_request(){
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("attorney_office_request_approve")))).click();
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("office_approve_popup_yes")))).click();
            log.info("Office List : UserAdmin : Able to approve office request for Attorney");
        } catch (Exception e) {
            log.info("Office List : UserAdmin : Unable to approve office request for Attorney");
            Assert.fail();
        }
    }

    public void approve_provider_request(){
        try {
            driver.findElement(By.xpath(officepage_loc.getProperty("provider_office_request_approve"))).click();
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("office_approve_popup_yes")))).click();
            log.info("Office List : UserAdmin : Able to approve office request for Provider");
        } catch (Exception e) {
            log.info("Office List : UserAdmin : Unable to approve office request for Provider");
            Assert.fail();
        }
    }

    public void reject_attorney_request(){
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("attorney_office_request_reject")))).click();
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("request_reject_reason_dd")))).click();
            Select reason = new Select(driver.findElement(By.xpath(officepage_loc.getProperty("request_reject_reason_dd"))));
            reason.selectByVisibleText("Other");
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("request_reject_yes")))).click();
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("request_reject_confirmation_heading"))));
            driver.findElement(By.xpath(officepage_loc.getProperty("rejection_confirmation"))).click();
            log.info("Office_List : Reject request : Provider office request rejected Successfully");
        } catch (Exception e) {
            log.error("Office_List : Reject request : Provider office request rejection Unsuccessfully");
        }
    }

    public void reject_provider_request(){
        try {
            driver.findElement(By.xpath(officepage_loc.getProperty("provider_office_request_reject"))).click();
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("request_reject_reason_dd")))).click();
            Select reason = new Select(driver.findElement(By.xpath(officepage_loc.getProperty("request_reject_reason_dd"))));
            reason.selectByVisibleText("Other");
            driver.findElement(By.xpath(officepage_loc.getProperty("request_reject_yes"))).click();
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("request_reject_confirmation_heading"))));
            driver.findElement(By.xpath(officepage_loc.getProperty("rejection_confirmation"))).click();
            log.info("Office_List : Reject request : Provider office request rejected Successfully");
        } catch (Exception e) {
            log.error("Office_List : Reject request : Provider office request rejection Unsuccessfully");
        }
    }

    public void search_active_provider_and_open() throws InterruptedException {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("active_provider_tab")))).click();
        driver.findElement(By.xpath(officepage_loc.getProperty("active_provider_search"))).click();
        driver.findElement(By.xpath(officepage_loc.getProperty("active_provider_search"))).sendKeys(store.getProperty("provider_facility_name"));
        Thread.sleep(1000);
        if (wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(officepage_loc.getProperty("active_provider_table_firstname")), store.getProperty("provider_facility_name")))){
            log.info("Office_list : active Provider : Search Successful ");
            driver.findElement(By.xpath(officepage_loc.getProperty("active_provider_table_firstname"))).click();
        }
        else {
            log.error("Office_list : active Provider : Search Unsuccessful ");
            Assert.fail();
        }
    }


    public void search_active_attorney_and_open() throws InterruptedException {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("active_attorney_tab")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("active_attorney_search")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("active_attorney_search")))).sendKeys(store.getProperty("attorney_referral_name"));
        Thread.sleep(1000);
        if (wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(officepage_loc.getProperty("active_attorney_table_firstname")), store.getProperty("attorney_referral_name")))){
            log.info("Office_list : active Attorney : Search Successful ");
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officepage_loc.getProperty("active_attorney_table_firstname")))).click();
        }
        else {
            log.error("Office_list : active Attorney : Search Unsuccessful ");
            Assert.fail();
        }

    }
}

