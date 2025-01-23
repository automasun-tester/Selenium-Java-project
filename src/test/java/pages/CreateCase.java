package pages;

import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import static base.BaseClass.*;
import static base.BaseClass.random;

@Slf4j
public class CreateCase {
    private final WebDriver driver;
    private static final Properties cre = new Properties();
    private final WebDriverWait wait;
    private Select state, office;

    public CreateCase(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15); // Increased wait time to 15 seconds
    }
    public void setup() throws IOException {
        File configFile = new File("src/test/resources/Config/create_case.properties");
        if (configFile.exists()) {
            FileReader casepro = new FileReader(configFile);
            cre.load(casepro);
            log.info("Create_Case :Config properties loaded successfully.");
        } else {
            throw new FileNotFoundException("Case List :Config file not found at " + configFile.getPath());
        }
    }

    public void fill_form(){
        generate_case_details();
        log.info("Create Case : " + driver.getTitle());
        //first name, last name input
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cre.getProperty("fname")))).sendKeys(store.getProperty("create_case_first_name"));
        driver.findElement(By.xpath(cre.getProperty("lname"))).sendKeys(store.getProperty("create_case_last_name"));
        state = new Select(driver.findElement(By.xpath(cre.getProperty("state_xpath")))); // initialising the dropdown web element
        state.selectByVisibleText(store.getProperty("create_case_state"));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cre.getProperty("DOB_input")))).sendKeys(store.getProperty("create_case_DOB"));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cre.getProperty("SSN_input")))).sendKeys(store.getProperty("create_case_SSN"));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cre.getProperty("DOI_input")))).sendKeys(store.getProperty("create_case_DOI"));
        driver.findElement(By.xpath(cre.getProperty("submit_xpath"))).click();
    }

    private void generate_case_details(){
        store.setProperty("create_case_first_name", "Test " + random.name().firstName());
        store.setProperty("create_case_last_name", random.name().lastName());
        store.setProperty("create_case_state", random.address().state());
        //Generating a past random date
        Date DOI = random.date().past(30, 15, TimeUnit.DAYS);
        // Format the date to MM/dd/yyyy
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        store.setProperty("create_case_DOI",dateFormat.format(DOI));
        Date DOB = random.date().birthday(20,50);
        store.setProperty("create_case_DOB",dateFormat.format(DOB));
        store.setProperty("create_case_SSN", String.valueOf(random.number().randomNumber(9,true)));

        try (FileOutputStream fos = new FileOutputStream("src/test/resources/Config/test.properties",false))
        {
            store.store(fos, "data to fill in the Create Case forms");
            fos.flush();  // Ensure data is fully written before release
//            System.out.println("Properties saved successfully.");
        }
        catch (IOException e){
            System.err.println("Error saving properties: " + e.getMessage());
        }
    }

    public void fill_form_group_admin() {
        generate_case_details();
        log.info("Create Case : " + driver.getTitle());
        //first name, last name input
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cre.getProperty("fname")))).sendKeys(store.getProperty("create_case_first_name"));
        driver.findElement(By.xpath(cre.getProperty("lname"))).sendKeys(store.getProperty("create_case_last_name"));
        state = new Select(driver.findElement(By.xpath(cre.getProperty("state_xpath")))); // initialising the dropdown web element
        state.selectByVisibleText(store.getProperty("create_case_state"));
        office = new Select(driver.findElement(By.xpath(cre.getProperty("group_office"))));
        office.selectByIndex(1);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cre.getProperty("DOB_input")))).sendKeys(store.getProperty("create_case_DOB"));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cre.getProperty("DOI_input")))).sendKeys(store.getProperty("create_case_DOI"));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cre.getProperty("SSN_input")))).sendKeys(store.getProperty("create_case_SSN"));
        //clicking on a random input box to trigger the duplicate case popup
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(cre.getProperty("emp_occupation")))).click();
        driver.findElement(By.xpath(cre.getProperty("submit_xpath"))).click();
    }

    public void fill_form_with_duplicate_DOI_DOB() {
        log.info("Create Case : " + driver.getTitle());

        //first name, last name input
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cre.getProperty("fname")))).sendKeys(store.getProperty("create_case_first_name"));
        driver.findElement(By.xpath(cre.getProperty("lname"))).sendKeys(store.getProperty("create_case_last_name"));
        state = new Select(driver.findElement(By.xpath(cre.getProperty("state_xpath")))); // initialising the dropdown web element
        state.selectByVisibleText(store.getProperty("create_case_state"));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cre.getProperty("DOB_input")))).sendKeys(store.getProperty("create_case_DOB"));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cre.getProperty("DOI_input")))).sendKeys(store.getProperty("create_case_DOI"));
        //clicking on a random input box to trigger the duplicate case popup
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(cre.getProperty("emp_occupation")))).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(cre.getProperty("duplicate_case_popup_cancel")))).click();
//        driver.findElement(By.xpath(cre.getProperty("submit_xpath"))).click();
    }


    public void fill_form_with_duplicate_SSN_DOB() {
        log.info("Create Case : " + driver.getTitle());

        //first name, last name input
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cre.getProperty("fname")))).sendKeys(store.getProperty("create_case_first_name"));
        driver.findElement(By.xpath(cre.getProperty("lname"))).sendKeys(store.getProperty("create_case_last_name"));
        state = new Select(driver.findElement(By.xpath(cre.getProperty("state_xpath")))); // initialising the dropdown web element
        state.selectByVisibleText(store.getProperty("create_case_state"));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cre.getProperty("DOB_input")))).sendKeys(store.getProperty("create_case_DOB"));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(cre.getProperty("SSN_input")))).sendKeys(store.getProperty("create_case_SSN"));
        //clicking on a random input box to trigger the duplicate case popup
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(cre.getProperty("emp_occupation")))).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(cre.getProperty("duplicate_case_SSN_popup_no")))).click();
//        driver.findElement(By.xpath(cre.getProperty("submit_xpath"))).click();
    }


}


