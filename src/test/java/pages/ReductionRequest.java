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

import static base.BaseClass.*;
@Slf4j
public class ReductionRequest {
    private final WebDriver driver;
    private static final Properties reduction = new Properties();
    private final WebDriverWait wait;

    public ReductionRequest(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15); // Increased wait time to 15 seconds
    }
    public void setup() throws IOException {
        File configFile = new File("src/test/resources/Config/reduction_request.properties");
        if (configFile.exists()) {
            FileReader casepro = new FileReader(configFile);
            reduction.load(casepro);
            log.info("Reduction Request :Config properties loaded successfully.");
        } else {
            throw new FileNotFoundException("Reduction Request :Config file not found at " + configFile.getPath());
        }
    }

    public void open_reduction_request() throws InterruptedException {

//        Actions actions = new Actions(driver);
//        actions.moveToElement(driver.findElement(By.xpath(loc.getProperty("reduction_req_tab"))));
        Thread.sleep(1000);
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(loc.getProperty("reduction_req_tab")))).click();
        log.info("Reduction Request : Opened Reduction Request Tab" + driver.getTitle() );
    }

    public void validate_needs_request_provider() {

        //clicking on the Needs Response tab
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(reduction.getProperty("needs_response_tile")))).click();
        log.info("Reduction Request : in Needs Response");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(reduction.getProperty("needs_response_search")))).click();
        driver.findElement(By.xpath(reduction.getProperty("needs_response_search"))).sendKeys(store.getProperty("create_case_first_name"));

 //validating the case name is present in the list or not
        if(wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(reduction.getProperty("needs_response_casename")),store.getProperty("create_case_first_name")))){
            log.info("Reduction Request : Case present in needs response");

 //validating the offer amount is correctly displayed or not
            if(driver.findElement(By.xpath(reduction.getProperty("needs_response_offeramount"))).getText().equals("1000"))
            { log.info("Reduction Request : Offer Amount is correctly shown");}
            else {log.error("Reduction Request : Offer Amount is NOT correctly shown");}

 //validating the Referred attorney correctly displayed or not
            if(driver.findElement(By.xpath(reduction.getProperty("needs_response_referred_attorney"))).getText().equals(store.getProperty("attorney_referral_name"))){
                log.info("Reduction Request : Referred Attorney is correctly shown");}
            else {log.error("Reduction Request : Referred Attorney is NOT correctly shown");}
        }
        else {log.error("Reduction Request : Case NOT present in the list");}
    }

    public void check_case_waiting_response_attorney() {
        //clicking on the Needs Response tab
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(reduction.getProperty("waiting_for_response_tile")))).click();
        log.info("Reduction Request : in Waiting for Response");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(reduction.getProperty("waiting_for_response_search")))).click();
        driver.findElement(By.xpath(reduction.getProperty("waiting_for_response_search"))).sendKeys(store.getProperty("create_case_first_name"));

        //validating the case name is present in the list or not
        if(wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(reduction.getProperty("waiting_for_response_casename")),store.getProperty("create_case_first_name")))){
            log.info("Reduction Request : Case present in waiting for response");

            //validating the offer amount is correctly displayed or not
            if(driver.findElement(By.xpath(reduction.getProperty("waiting_for_response_offeramount"))).getText().equals("1000"))
            { log.info("Reduction Request : Offer Amount is correctly shown");}
            else {log.error("Reduction Request : Offer Amount is NOT correctly shown");}

            //validating the Referred attorney correctly displayed or not
            if(driver.findElement(By.xpath(reduction.getProperty("waiting_for_response_facility"))).getText().equals(store.getProperty("provider_facility_name"))){
                log.info("Reduction Request : Referred Attorney is correctly shown");}
            else {log.error("Reduction Request : Referred Attorney is NOT correctly shown");}
        }
        else {log.error("Reduction Request : Case NOT present in the list");}
    }

    public void open_offer_case() {
        driver.findElement(By.xpath(reduction.getProperty("waiting_for_response_casename"))).click();
    }

    public void validate_needs_request_attorney() {
        //clicking on the Needs Response tab
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(reduction.getProperty("needs_response_tile")))).click();
        log.info("Reduction Request : in Needs Response");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(reduction.getProperty("needs_response_search")))).click();
        driver.findElement(By.xpath(reduction.getProperty("needs_response_search"))).sendKeys(store.getProperty("create_case_first_name"));

        //validating the case name is present in the list or not
        if(wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(reduction.getProperty("needs_response_casename")),store.getProperty("create_case_first_name")))){
            log.info("Reduction Request : Case present in needs response");

            //validating the offer amount is correctly displayed or not
            if(driver.findElement(By.xpath(reduction.getProperty("needs_response_offeramount"))).getText().equals("800"))
            { log.info("Reduction Request : Counter-Offer Amount is correctly shown");}
            else {log.error("Reduction Request : Counter-Offer Amount is NOT correctly shown");}

            //validating the Referred attorney correctly displayed or not
            if(driver.findElement(By.xpath(reduction.getProperty("needs_response_referred_attorney"))).getText().equals(store.getProperty("provider_facility_name"))){
                log.info("Reduction Request : Facility is correctly shown");}
            else {log.error("Reduction Request : Facility is NOT correctly shown");}
        }
        else {log.error("Reduction Request : Case NOT present in the list");}
    }

    public void check_case_waiting_response_provider() {
        //clicking on the Needs Response tab
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(reduction.getProperty("waiting_for_response_tile")))).click();
        log.info("Reduction Request : in Waiting for Response");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(reduction.getProperty("waiting_for_response_search")))).click();

        driver.findElement(By.xpath(reduction.getProperty("waiting_for_response_search"))).sendKeys(store.getProperty("create_case_first_name"));

        //validating the case name is present in the list or not
        if(wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(reduction.getProperty("waiting_for_response_casename")),store.getProperty("create_case_first_name")))){
            log.info("Reduction Request : Case present in waiting for response");

            //validating the offer amount is correctly displayed or not
            if(driver.findElement(By.xpath(reduction.getProperty("waiting_for_response_offeramount"))).getText().equals("1000"))
            { log.info("Reduction Request : Offer Amount is correctly shown");}
            else {log.error("Reduction Request : Offer Amount is NOT correctly shown");}

            //validating the Referred attorney correctly displayed or not
            if(driver.findElement(By.xpath(reduction.getProperty("waiting_for_response_facility"))).getText().equals(store.getProperty("attorney_referral_name"))){
                log.info("Reduction Request : Referred Provider is correctly shown");}
            else {log.error("Reduction Request : Referred Provider is NOT correctly shown");}
        }
        else {log.error("Reduction Request : Case NOT present in the list");}
    }
}

