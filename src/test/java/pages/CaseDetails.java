package pages;

import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
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
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import static base.BaseClass.*;

@Slf4j
public class CaseDetails {

    private final WebDriver driver;
    private static final Properties details = new Properties();
    private final WebDriverWait wait;
    private String referreddate;
    private String treat_date;

    public CaseDetails(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 10); // Increased wait time to 20 seconds
    }

    public void setup() throws IOException {
        File configFile = new File("src/test/resources/Config/case_details.properties");
        if (configFile.exists()) {
            FileReader casedetail_locators = new FileReader(configFile);
            details.load(casedetail_locators);
            log.info("Case_details :Config properties loaded successfully.");
        } else {
            throw new FileNotFoundException("Case List :Config file not found at " + configFile.getPath());
        }
    }

    public void click_case_edit() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_edit")))).click();

    }

    public void verifying_updates() {
        if (details.getProperty("case_gender").equalsIgnoreCase(prop.getProperty("gender"))) {
            log.info("Case updated Successfully");
        } else {
            log.error("Case not updated");
        }
    }

    public void refer_attorney() throws InterruptedException {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_attorney_referral_button")))).click();
        log.info("Case Details : clicked on attorney Referral button ");
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("case_attorney_referral_name")))).click();
        Thread.sleep(1000);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_attorney_referral_name")))).sendKeys(store.getProperty("attorney_referral_name"));
        Thread.sleep(1500);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_attorney_referral_name")))).sendKeys(Keys.ARROW_DOWN);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_attorney_referral_name")))).sendKeys(Keys.ENTER);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_attorney_referral_submit")))).click();
        log.info("Case Details : Submitted the attorney referred ");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_attorney_referred"))));
        if (driver.findElement(By.xpath(details.getProperty("case_attorney_referred"))).getText().equals(store.getProperty("attorney_referral_name"))) {
            log.info("Case Details: Referred correctly");
        }
    }

    public void open_finance_tab() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_detail_finance_tab")))).click();
            log.info("Case Details : Finance tab opened ");
//            Thread.sleep(1000);
        } catch (Exception e) {
            log.error("Case Details : Not able to open Finance tab " + e.getMessage());
        }
    }

    public void click_make_offer_button() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_detail_reduction_offer_button")))).click();
    }

    public void make_an_offer_provider() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_detail_make_an_offer")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_detail_make_an_offer")))).sendKeys("1000");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_detail_offer_note")))).sendKeys("from provider");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_offer_submit")))).click();
        log.info("Case Detail : made an offer from provider");
    }

    public void open_provider_settlement() throws InterruptedException {
        try {
            if (!driver.findElement(By.xpath(details.getProperty("finance_tab_provider_settlement_check"))).isDisplayed()) {
                wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("finance_tab_provider_settlement")))).click();
            }
            log.info("Case Detail : opened Provider Settlement");
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            log.error("Case Details : Unable to open provider Settlement "+e.getMessage());
        }
    }

    public void make_counter_offer_attorney() throws InterruptedException {
        log.info("Case Detail : Going to make an counter offer from provider");
        Thread.sleep(1000);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("finance_tab_counter_offer_button")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("finance_tab_counter_offer_amount")))).sendKeys("800");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("finance_tab_counter_offer_note")))).sendKeys("from Attorney");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("finance_tab_counter_offer_submit")))).click();
        log.info("Case Detail : made an counter offer of 800 from attorney");
    }

    public void accept_the_counter_offer() throws InterruptedException {
        Thread.sleep(1500);
        log.info("Case Details : Going to accepted the offer of Reduction Request");
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("finance_tab_offer_accept")))).click();
//        driver.findElement(By.xpath(details.getProperty("finance_tab_offer_accept"))).click();
        log.info("Case Details : Going to confirm the offer of Reduction Request");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("offer_accept_confirmation")))).click();
        log.info("Case Details : accepted the offer of Reduction Request");
    }

    public void refer_provider() throws InterruptedException {
        //referred the provider
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_provider_referral_button")))).click();
        log.info("Case Details : Clicked on refer provider button");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_provider_referral_name")))).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath(details.getProperty("case_provider_referral_name"))).sendKeys(store.getProperty("provider_facility_name"));
        Thread.sleep(1500);
        log.info("Case Details : Inserted the provider name ");
//        Thread.sleep(100);
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("case_provider_referral_dd")))).click();
//        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(details.getProperty("case_provider_referral_dd")), store.getProperty("provider_facility_name")));
//        driver.findElement(By.xpath(details.getProperty("case_attorney_referral_name"))).sendKeys(Keys.ARROW_DOWN);
//        log.info("Case Details : arrow down ");
//        driver.findElement(By.xpath(details.getProperty("case_attorney_referral_name"))).sendKeys(Keys.ENTER);
        driver.findElement(By.xpath(details.getProperty("case_provider_referral_submit"))).click();
        log.info("Case Details : Provider Referred");
        //validating the provider in the referral list
        List<WebElement> sections = driver.findElements(By.xpath(details.getProperty("case_provider_referred_list")));
        // Loop through each element and check if the text is present
        for (WebElement section : sections) {
            if (section.getText().contains(store.getProperty("provider_facility_name"))) {
                log.info("Case Details : Referred provider present in the provider Referred List");
                break;
            }
            else {
                log.error("Case Details :Referred provider NOT present in the provider Referred List");}
        }
    }

    public void make_an_offer_attorney() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_detail_make_an_offer")))).click();
        driver.findElement(By.xpath(details.getProperty("case_detail_make_an_offer"))).sendKeys("1000");
        driver.findElement(By.xpath(details.getProperty("case_detail_offer_note"))).sendKeys("from attorney");
        driver.findElement(By.xpath(details.getProperty("case_offer_submit"))).click();
        log.info("Case Detail : made an offer from attorney");
    }

    public void make_counter_offer_provider() throws InterruptedException {
        log.info("Case Detail : going to make a counter offer from provider");
        Thread.sleep(1000);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("finance_tab_counter_offer_button")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("finance_tab_counter_offer_amount")))).sendKeys("800");
        driver.findElement(By.xpath(details.getProperty("finance_tab_counter_offer_note"))).sendKeys("from provider");
        driver.findElement(By.xpath(details.getProperty("finance_tab_counter_offer_submit"))).click();
        log.info("Case Detail : made an counter offer of 800 from provider");
    }

    public void case_status_as_closed() {
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("case_status_edit_button")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_status_edit_select_dd"))));
        Select status = new Select(driver.findElement(By.xpath(details.getProperty("case_status_edit_select_dd"))));
        status.selectByVisibleText("Closed");
        log.info("Case Details : Case marked as closed");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_status_edit_submit")))).click();
    }

    public void assign_case_manager() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_manager_button")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("add_case_manager_dd"))));
        Select cm = new Select(driver.findElement(By.xpath(details.getProperty("add_case_manager_dd"))));
        cm.selectByVisibleText("Dr. Soni Gcc");
        driver.findElement(By.xpath(details.getProperty("case_manager_form_submit"))).click();
    }

    public void upload_test_report() {
        try {

            // Define the path of the file to be uploaded
            String filePath = Paths.get(System.getProperty("user.dir"), "uploads", "samplepptx.pdf").toString();
//            System.out.println(filePath);

//            // Locate the dropzone element by its ID or other selector
            WebElement dropzone = driver.findElement(By.xpath(details.getProperty("records_upload_area")));

            // Step 1: Create a hidden file input element via JavaScript and add it to the document
            JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
            jsExecutor.executeScript(
                    "var fileInput = document.createElement('input');" +
                            "fileInput.type = 'file';" +
                            "fileInput.style.display = 'none';" +
                            "fileInput.id = 'tempFileInput';" +
                            "document.body.appendChild(fileInput);"
            );

            // Step 2: Send the file path to the newly created input element
            WebElement fileInput = driver.findElement(By.id("tempFileInput"));
            fileInput.sendKeys(filePath);

            // Step 3: Use JavaScript to create a DataTransfer object and attach it to a DragEvent
            jsExecutor.executeScript(
                    "var dropZone = arguments[0];" +
                            "var dataTransfer = new DataTransfer();" +
                            "dataTransfer.items.add(document.getElementById('tempFileInput').files[0]);" +  // Add the file to DataTransfer
                            "var event = new DragEvent('drop', { dataTransfer: dataTransfer });" +
                            "dropZone.dispatchEvent(event);", dropzone
            );

            // Optional: Click an upload button if required to complete the upload
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("records_upload_confirmation")))).click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("file_uploaded_text"))));

    } catch (Exception e) {
        e.printStackTrace();
    }

//        } catch (Exception e) {
////            log.error("Case Details : Unable to upload test report");
////            Assert.fail();
//            e.printStackTrace();
//        }
    }

    public void request_bill_records() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("records_request_button")))).click();
        log.info("Case Details : Clicked on the request button");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("Hippa_not_upload")))).click();
        log.info("Case Details : Not uploading hippa");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("records_request_textarea")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("records_request_textarea")))).sendKeys("from Attorney");
        log.info("Case Details : filled the request text area");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("records_request_submit")))).click();
        log.info("Case Details : Clicked on the submit button");

    }

    public void open_provider_treatment() {
        //clicking on the provider name in treatment section
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("treatment_tab_provider_name_1")))).click();

    }

    public void edit_provider_referred_date() {
        //clicking on the provider referred date
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("treatment_referred_date")))).click();
        //clearing the date input
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("treatment_referred_date_edit")))).clear();
        //Generating a past random date
        Date date = random.date().past(30, 15, TimeUnit.DAYS);
        // Format the date to MM/dd/yyyy
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        referreddate = dateFormat.format(date);
        //setting the generated date as provider referred date
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("treatment_referred_date_edit")))).sendKeys(referreddate);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("treatment_referred_date_edit_accept")))).click();
    }

    public void validate_referred_date() {
        if(wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(details.getProperty("treatment_referred_date_validate")),referreddate)))
            log.info("Case Details :validate_referred_date : Provider referred date updated ");
        else
            log.error("Case Details :validate_referred_date : Provider referred date NOT updated ");
    }

    public void click_add_treatment() {
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("treatment_add_button")))).click();
        log.error("Case Details :click_add_treatment : clicked on add treatment button ");
    }


    public void add_treatment_details() {
        try {
            Date date = random.date().past( 15, TimeUnit.DAYS);
            // Format the date to MM/dd/yyyy
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
            treat_date = dateFormat.format(date);
            String note="treatment added by the provider";
            WebElement dateInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("add_treatment_date"))));

            // Remove onkeydown restriction
            JavascriptExecutor js = (JavascriptExecutor) driver;
            js.executeScript("arguments[0].removeAttribute('onkeydown')", dateInput);

            dateInput.sendKeys(treat_date);//inserting the treatment date
            log.info("Case Details :add_treatment_details : Treatment date inserted ");
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("add_treatment_bill_amount")))).sendKeys("120");
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("add_treatment_note")))).sendKeys(note);
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("add_treatment_submit")))).click();
            log.info("Case Details :add_treatment_details : clicked on submit ");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    public void validate_treatment_added() {
        String added_treatment_date = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("added_treatment_table_date")))).getText();
        if(added_treatment_date.equals(treat_date))
            log.info("Case Details :validate_treatment_added : Provider able to add treatment ");
        else
            log.error("Case Details :validate_treatment_added : Provider NOT able to add treatment ");
    }

    public void edit_treatment_details() {
        Actions actions = new Actions(driver);        // Create an Actions instance and perform the hover
        WebElement edit_unhide = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("added_treatment_table_hover_area"))));
        actions.moveToElement(edit_unhide).perform();// doing hovering action to unhide the edit and delete button

        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("added_treatment_table_edit")))).click();
        log.info("Case Details :edit_treatment_details : clicking on the edit treatment button");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("edit_treatment_note")))).clear();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("edit_treatment_note")))).sendKeys("z edited");
        log.info("Case Details :edit_treatment_details : editing the note of the treatment ");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("edit_treatment_submit")))).click();
        log.info("Case Details :edit_treatment_details : Submitting edit treatment form");

    }

    public void validate_edit_treatment() {
        String edited_treatment_note = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("added_treatment_table_note")))).getText();
        if (edited_treatment_note.contains("edited"))
            log.info("Case Details :validate_edit_treatment : Provider able to edit treatment ");
        else
            log.error("Case Details :validate_edit_treatment : Provider NOT able to edit treatment ");
    }

    public void delete_treatment() {
        Actions actions = new Actions(driver);        // Create an Actions instance and perform the hover
        WebElement edit_unhide = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("added_treatment_table_hover_area"))));
        actions.moveToElement(edit_unhide).perform();// doing hovering action to unhide the edit and delete button
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("added_treatment_table_delete")))).click();
        log.info("Case Details :delete_treatment : clicking on the delete treatment button");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("added_treatment_delete_confirm")))).click();
        log.info("Case Details :delete_treatment : clicking on the delete treatment confirmation");

    }

    public void refer_second_provider() throws InterruptedException {
        //referred the second provider

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_provider_referral_button")))).click();
        log.info("Case Details : Clicked on refer provider button");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_provider_referral_name")))).click();
        Thread.sleep(1000);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_provider_referral_name")))).sendKeys(store.getProperty("provider_facility_name_2"));
        Thread.sleep(1500);
        log.info("Case Details : Inserted the provider name ");

        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("case_provider_referral_dd")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("case_provider_referral_submit")))).click();
        log.info("Case Details : Provider Referred");
        //validating the provider in the referral list
        List<WebElement> sections = driver.findElements(By.xpath(details.getProperty("case_provider_referred_list")));
        // Loop through each element and check if the text is present
        for (WebElement section : sections) {
            if (section.getText().contains(store.getProperty("provider_facility_name"))) {
                log.info("Case Details : Referred provider present in the provider Referred List");
                break;
            }
            else {
                log.error("Case Details :Referred provider NOT present in the provider Referred List");}
        }
    }

    public void open_second_provider_treatment() {
        //clicking on the provider name in treatment section
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("treatment_tab_provider_name_2")))).click();
    }

    public void update_end_treatment_discharge() throws InterruptedException {
        Thread.sleep(1000);
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("end_treatment_button_link")))).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("discharge_button_link")))).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("confirm_discharge_button_link")))).click();
        log.info("End treatment : open case detail page : end treatment for office");
    }

    public void update_end_treatment_discontinue() throws InterruptedException {
        Thread.sleep(1000);
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("end_treatment_button_link")))).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("discontinue_button_link")))).click();

        WebElement discontinueReasonDropdown = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath(details.getProperty("discontinue_reason_dropdown"))));
        Select a = new Select(discontinueReasonDropdown);
        a.selectByVisibleText("Sickness");

        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("confirm_discontinue_button_link")))).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("badcase_yes_button")))).click();

        WebElement badcaseReasonDropdown = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath(details.getProperty("badcase_reason_dropdown"))));
        Select b = new Select(badcaseReasonDropdown);
        b.selectByVisibleText("Patient has minimal damage");

        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("confirm_bad_case_button_link")))).click();
        log.info("End treatment : open case detail page : end treatment for office");
    }
    public void click_On_PaperClipIcon_GenerateLink() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("medical_records_link")))).click();
    }
    //starting card-709
    public void open_ActivityLog_Table() throws InterruptedException {
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("activity_log_table")))).click();
        List<WebElement> activity_logs = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.xpath(details.getProperty("logs_if_visible"))));
        if(!activity_logs.isEmpty())
            log.info("Case Details: Activity logs are present for the medical records link");
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("activitylogs_cancel_button")))).click();
    }
    //ending card-709

    //card-1019
    public void verify_Status_Collecting_Records() {
        //clicking on the provider name in treatment section
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(details.getProperty("status_column")),"Collecting Records"));
    }
    public void verify_Status_All_Providers_Records_Received() {
        driver.navigate().refresh();
        WebElement atty_status = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("atty_status_column"))));
        String expected_status = "All Provider's Records Received - ";
        if(atty_status.getText().contains(expected_status))
            Assert.assertTrue(true);
        else
            Assert.fail();
    }
    public void send_bills_records() {
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("send_request_button")))).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("click_yes")))).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("click_submit")))).click();
        log.info("Case Details : Clicked on the send button");
    }
    //ending card-1019 here

    //card-1065
    public void click_On_Edit_Pencil_Icon() {
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("case_status_edit_button")))).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("selection_status")))).click();
        Select status = new Select(driver.findElement(By.xpath(details.getProperty("selection_status"))));
        status.selectByVisibleText("Ready for Demand");
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(details.getProperty("click_accept_button")))).click();
        log.info("Case Details : Clicked on the send button");
    }

    public void verify_Status_ReadyForDemand() {
        driver.navigate().refresh();
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(details.getProperty("status_column")),"Ready for Demand"));
    }

    public void verify_Status_ReadyForDemand_For_Provider() {
        driver.navigate().refresh();
        WebElement atty_status = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(details.getProperty("atty_status_column"))));
        String expected_status = "Ready for Demand - ";
        if(atty_status.getText().contains(expected_status))
            Assert.assertTrue(true);
        else
            Assert.fail();
    }

    //ending card-1065 here
}