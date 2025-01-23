package pages;

import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

import static base.BaseClass.*;

@Slf4j
public class CaseList {

    private final WebDriver driver;
    private static final Properties cas = new Properties();
    private final WebDriverWait wait;

    public CaseList(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15); // Increased wait time to 15 seconds
    }
    public void setup() throws IOException {
        File configFile = new File("src/test/resources/Config/case_list.properties");
        if (configFile.exists()) {
            FileReader casepro = new FileReader(configFile);
            cas.load(casepro);
                log.info("Case List :Config properties loaded successfully.");
        } else {
            throw new FileNotFoundException("Case List :Config file not found at " + configFile.getPath());
        }
    }

    public void search() throws InterruptedException {

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(loc.getProperty("case_tab_button")))).click(); // click on the Case List Tab
        log.info("Case List : Search : In case Tab");
        //click the search bar to input text
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("case_search_bar")))).click();
        log.info("Case List: Search :clicked the search bar");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("case_search_bar")))).sendKeys(store.getProperty("create_case_first_name")); //input the name stored in Config.properties
        log.info("Case List: Search :entered the case name ");
        Thread.sleep(2000);
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(cas.getProperty("case_name")), store.getProperty("create_case_first_name")));
        String Case = driver.findElement(By.xpath(cas.getProperty("case_name"))).getText();//getting the patient name to compare with the search name
        String searched= store.getProperty("create_case_first_name");
        validate_search(Case, searched);
    }
    public void open_case(){
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("case_name")))).click();
        log.info(driver.getTitle());
    }

    private void validate_search(String name, String search){ // this function validates the name searched and what is populated in the case list
        name = name.toLowerCase();
        search = search.toLowerCase();
        if (name.contains(search)) {
            log.info("Case List: Search : Successful ");
            Assert.assertTrue(true);
        }
        else{
            log.error("Case List: Search : Search not found");
            Assert.fail();
        }

    }

    public void tile_validation() throws InterruptedException {
        String pagination_locator;
        if(scan.contains("group provider") || scan.contains("group attorney")){
            pagination_locator = "outoftotal_cases";
        }
        else {
            pagination_locator = "outoftotal_caseshdn";
        }
        //capturing the number of cases displayed on the tile
        String newcase = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("newcase_tile")))).getText();
        String opencase = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("opencase_tile")))).getText();

        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(cas.getProperty("newcase_tile")))).click();
        log.info("Case List: Search :new case: " + newcase);
        evaluate_case_number(newcase,pagination_locator);

        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(cas.getProperty("opencase_tile")))).click();
        log.info("Case List: Search :open case: " + opencase);
        evaluate_case_number(opencase,pagination_locator);

        if(scan.contains("attorney") || scan.contains("Attorney")) {

            //capturing the number of cases displayed on the tile
            String demandtosend = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("demandtosend_tile")))).getText();
            wait.until(ExpectedConditions.elementToBeClickable(By.xpath(cas.getProperty("demandtosend_tile")))).click();
            log.info("Case List: Search :demand to send: " + demandtosend);
            evaluate_case_number(demandtosend,pagination_locator);
            //capturing the number of cases displayed on the tile
            String innagotiation = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("innagotiation_tile")))).getText();
            wait.until(ExpectedConditions.elementToBeClickable(By.xpath(cas.getProperty("innagotiation_tile")))).click();
            log.info("Case List: Search :In nagotiation case: " + innagotiation);
            evaluate_case_number(innagotiation,pagination_locator);
            //capturing the number of cases displayed on the tile
//            driver.findElement(By.xpath(cas.getProperty("switch_to_demands_sent"))).click();
//            String demandssent = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("demands_sent_tile")))).getText();
//            driver.findElement(By.xpath(cas.getProperty("demands_sent_tile"))).click();
//            log.info("Case List: Search :In Demands Sent: " + demandssent);
//            Thread.sleep(500);
//            if (scan.contains("group") || scan.contains("Group")){
//                pagination_locator = "outoftotal_caseshdn";
//                evaluate_case_number(demandssent,pagination_locator);
//            }
//            else {
//                evaluate_case_number(demandssent,pagination_locator);
//            }

        }if(scan.contains("provider") || scan.contains("Provider")) {
            //capturing the number of cases displayed on the tile
            String demandtosend = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("recordtosent_tile")))).getText();
            wait.until(ExpectedConditions.elementToBeClickable(By.xpath(cas.getProperty("recordtosent_tile")))).click();
            log.info("Case List: Search :recordtosent_tile :" + demandtosend);
            evaluate_case_number(demandtosend,pagination_locator);
            //capturing the number of cases displayed on the tile
            String innagotiation = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("badcase_tile")))).getText();
            wait.until(ExpectedConditions.elementToBeClickable(By.xpath(cas.getProperty("badcase_tile")))).click();
            log.info("Case List: Search :In badcase_tile case: " + innagotiation);
            evaluate_case_number(innagotiation,pagination_locator);
            //capturing the number of cases displayed on the tile
            wait.until(ExpectedConditions.elementToBeClickable(By.xpath(cas.getProperty("switch_to_recordssent")))).click();
            String recordsssent = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("records_sent_tile")))).getText();
            wait.until(ExpectedConditions.elementToBeClickable(By.xpath(cas.getProperty("records_sent_tile")))).click();
            log.info("Case List: Search :In Records Sent: " + recordsssent);
            Thread.sleep(500);
            evaluate_case_number(recordsssent,pagination_locator);

        }
    }

    private void evaluate_case_number(String tilecase, String locate){  // evaluates the tile value with the populated cases are same or not
        //tilecase = case number shown on the tile
        //locate = it is the locator to find the number of cases on the page
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(cas.getProperty(locate)), "Showing"));
        String casesinpage = driver.findElement(By.xpath(cas.getProperty(locate))).getText();
        int lstindex_space = casesinpage.lastIndexOf(' ');
        int lstindex_of = casesinpage.lastIndexOf('f');
        log.info("testing :"+casesinpage);
        // capturing the cases appears on the page
        casesinpage = casesinpage.substring(lstindex_of+1 , lstindex_space);
       log.info("Number of cases in page : "+casesinpage);
//comparing the values with the cases in the page vs case on the tile
        if (casesinpage.contains(tilecase))
            log.info("Appear correct");
        else
            log.warn("Tile does not match with cases appear on the page");
    }

    public void create_case_button(){ //click the case create button
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("createcase_dd")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("createcase_button")))).click();
    }


    public void go_to_case_list() throws InterruptedException {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(loc.getProperty("case_tab_button")))).click();
        Thread.sleep(1000);
    }

    public void open_complete_tab() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("completed_cases")))).click();
    }

    public void search_completed_case_attorney() throws InterruptedException {
        //click the search bar to input text
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(cas.getProperty("completed_case_search_attorney")))).click();
        log.info("Case List: Completed Cases Search :clicked the search bar");
        driver.findElement(By.xpath(cas.getProperty("completed_case_search_attorney"))).sendKeys(store.getProperty("create_case_first_name")); //input the name stored in Config.properties
        log.info("Case List: Completed Cases Search :entered the case name ");
        Thread.sleep(2000);
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(cas.getProperty("completed_case_name_attorney")), store.getProperty("create_case_first_name")));
        String Case = driver.findElement(By.xpath(cas.getProperty("completed_case_name_attorney"))).getText();//getting the patient name to compare with the search name
        String searched= store.getProperty("create_case_first_name");
        validate_search(Case, searched);
    }

    public void search_completed_case_provider() throws InterruptedException {
        //click the search bar to input text
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("completed_case_search_provider")))).click();
        log.info("Case List: Completed Cases Search :clicked the search bar");
        driver.findElement(By.xpath(cas.getProperty("completed_case_search_provider"))).sendKeys(store.getProperty("create_case_first_name")); //input the name stored in Config.properties
        log.info("Case List: Completed Cases Search :entered the case name ");
        Thread.sleep(2000);
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(cas.getProperty("completed_case_name_provider")), store.getProperty("create_case_first_name")));
        String Case = driver.findElement(By.xpath(cas.getProperty("completed_case_name_provider"))).getText();//getting the patient name to compare with the search name
        String searched= store.getProperty("create_case_first_name");
        validate_search(Case, searched);
    }

    public void open_my_case() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("my_cases_tab")))).click();
    }

    public void search_in_my_case() throws InterruptedException {
        //click the search bar to input text
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("my_case_search")))).click();
        log.info("Case List: My Cases Search :clicked the search bar");
        driver.findElement(By.xpath(cas.getProperty("my_case_search"))).sendKeys(store.getProperty("create_case_first_name")); //input the name stored in Config.properties
        log.info("Case List: My Cases Search :entered the case name ");
        Thread.sleep(2000);
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(cas.getProperty("my_case_case")), store.getProperty("create_case_first_name")));
        String Case = driver.findElement(By.xpath(cas.getProperty("my_case_case"))).getText();//getting the patient name to compare with the search name
        String searched= store.getProperty("create_case_first_name");
        validate_search(Case, searched);
    }

    public void search_provider_group() throws InterruptedException {

        driver.findElement(By.xpath(loc.getProperty("case_tab_button"))).click(); // click on the Case List Tab
        log.info("Case List : Search : In case Tab");
        //click the search bar to input text
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("case_search_bar_pg")))).click();
        log.info("Case List: Search :clicked the search bar");
        driver.findElement(By.xpath(cas.getProperty("case_search_bar_pg"))).sendKeys(store.getProperty("create_case_first_name")); //input the name stored in Config.properties
        log.info("Case List: Search :entered the case name ");
        Thread.sleep(2000);
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(cas.getProperty("case_name_pg")), store.getProperty("create_case_first_name")));
        String Case = driver.findElement(By.xpath(cas.getProperty("case_name_pg"))).getText();//getting the patient name to compare with the search name
        String searched= store.getProperty("create_case_first_name");
        validate_search(Case, searched);
    }

    public void search_and_open_case_provider_group() throws InterruptedException {

        driver.findElement(By.xpath(loc.getProperty("case_tab_button"))).click(); // click on the Case List Tab
        log.info("Case List : Search : In case Tab");
        //click the search bar to input text
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("case_search_bar_pg")))).clear();
        log.info("Case List: Search :clicked the search bar");
        driver.findElement(By.xpath(cas.getProperty("case_search_bar_pg"))).sendKeys(store.getProperty("create_case_first_name")); //input the name stored in Config.properties
        log.info("Case List: Search :entered the case name ");
        Thread.sleep(2000);
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(cas.getProperty("case_name_pg")), store.getProperty("create_case_first_name")));
        String Case = driver.findElement(By.xpath(cas.getProperty("case_name_pg"))).getText();//getting the patient name to compare with the search name
        String searched= store.getProperty("create_case_first_name");
        validate_search(Case, searched);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("case_name_pg")))).click();
    }

    public void open_completed_case() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cas.getProperty("completed_case_name_attorney")))).click();
    }
}
