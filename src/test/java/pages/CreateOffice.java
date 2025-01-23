package pages;

import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.*;
import java.util.Properties;
import static base.BaseClass.store;

import static base.BaseClass.random;
import static base.BaseClass.scan;

@Slf4j
public class CreateOffice {
    private final WebDriver driver;
    private static final Properties createoffice_loc = new Properties();
    private final WebDriverWait wait;
    private Select type;

    public CreateOffice(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15); // Increased wait time to 15 seconds
    }


    public void setup() throws IOException {
        File officepage = new File("src/test/resources/Config/create_office.properties");
        if (officepage.exists()) {
            FileReader UserList_loc = new FileReader(officepage);
            createoffice_loc.load(UserList_loc);
            log.info("Create_Office :Config properties loaded successfully.");
        } else {
            throw new FileNotFoundException("Create_Office :Config file not found at " + officepage.getPath());
        }
    }

    public void fill_form_create_office_provider() throws InterruptedException {

        generate_form_details_office('P'); // generating office details for provider office
        driver.findElement(By.xpath(createoffice_loc.getProperty("office_name"))).clear();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(createoffice_loc.getProperty("office_name")))).sendKeys(store.getProperty("create_office_name_provider"));
        //selecting the office type
        type = new Select(driver.findElement(By.xpath(createoffice_loc.getProperty("office_type"))));
        type.selectByVisibleText("Provider Office");

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(createoffice_loc.getProperty("provider_speciality")))).sendKeys("chiro");
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(createoffice_loc.getProperty("provider_speciality_dd")))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(createoffice_loc.getProperty("office_phone")))).sendKeys(store.getProperty("create_office_phone"));
        //filling the address
        WebElement address = driver.findElement(By.xpath(createoffice_loc.getProperty("office_address")));
        address.clear();
        address.sendKeys(store.getProperty("create_office_streetAd"));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(createoffice_loc.getProperty("office_city")))).sendKeys(store.getProperty("create_office_city"));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(createoffice_loc.getProperty("office_state")))).sendKeys(store.getProperty("create_office_state"));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(createoffice_loc.getProperty("office_zip")))).sendKeys(store.getProperty("create_office_zipcode"));
//        Thread.sleep(1000);
//        address.sendKeys(Keys.ARROW_DOWN);
//        address.sendKeys(Keys.ENTER);

        Thread.sleep(500);
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(createoffice_loc.getProperty("office_create_submit")))).click();
        log.info("Create Office : Clicked on the Submit Button ");



        //checking if create office warning is displayed
        if (!scan.contains("Super Admin")) {
            Thread.sleep(1000);
            if(driver.findElement(By.xpath(createoffice_loc.getProperty("office_create_warning"))).isDisplayed())
            {   log.info("Create Office : Create office Warning Displayed ");
                driver.findElement(By.xpath(createoffice_loc.getProperty("office_create_warning"))).click();
            }}

        if (driver.findElement(By.xpath(createoffice_loc.getProperty("office_city"))).getAttribute("value").isEmpty() || driver.findElement(By.xpath(createoffice_loc.getProperty("office_zip"))).getAttribute("value").isEmpty()){
            fill_form_create_office_provider();
        }

        if (wait.until(ExpectedConditions.titleIs("SimplifyPI | Office List"))){
            log.info("Create Office : Form Submitted Successfully ");
        }
        else{
            log.error("Create Office : Form Submit Unsuccessful");
            Assert.fail();
        }
    }

    public void fill_form_create_office_attorney() throws InterruptedException {

        generate_form_details_office('A'); // generating office details for provider office
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(createoffice_loc.getProperty("office_name")))).clear();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(createoffice_loc.getProperty("office_name")))).sendKeys(store.getProperty("create_office_name_attorney"));

        type = new Select(driver.findElement(By.xpath(createoffice_loc.getProperty("office_type"))));
        type.selectByVisibleText("Attorney Office"); // office type Attorney

        driver.findElement(By.xpath(createoffice_loc.getProperty("office_phone"))).sendKeys(store.getProperty("create_office_phone"));
        //filling the address
        WebElement address = driver.findElement(By.xpath(createoffice_loc.getProperty("office_address")));
        address.clear();
        address.sendKeys(store.getProperty("create_office_streetAd"));
        driver.findElement(By.xpath(createoffice_loc.getProperty("office_city"))).sendKeys(store.getProperty("create_office_city"));
        driver.findElement(By.xpath(createoffice_loc.getProperty("office_state"))).sendKeys(store.getProperty("create_office_state"));
        driver.findElement(By.xpath(createoffice_loc.getProperty("office_zip"))).sendKeys(store.getProperty("create_office_zipcode"));
//        Thread.sleep(1000);
//        address.sendKeys(Keys.ARROW_DOWN);
//        address.sendKeys(Keys.ENTER);

        Thread.sleep(500);

        //Pressing the Submit Button
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(createoffice_loc.getProperty("office_create_submit")))).click();
        log.info("Create Office : Clicked on the Submit Button ");

        //checking if create office warning is displayed
        if (!scan.contains("Super Admin")) {
            Thread.sleep(1000);
            if(driver.findElement(By.xpath(createoffice_loc.getProperty("office_create_warning"))).isDisplayed())
            {   log.info("Create Office : Create office Warning Displayed ");
                driver.findElement(By.xpath(createoffice_loc.getProperty("office_create_warning"))).click();
            }}

        if (driver.findElement(By.xpath(createoffice_loc.getProperty("office_city"))).getAttribute("value").isEmpty() || driver.findElement(By.xpath(createoffice_loc.getProperty("office_zip"))).getAttribute("value").isEmpty()){
            fill_form_create_office_attorney();
        }
        //validating submit
        if (wait.until(ExpectedConditions.titleIs("SimplifyPI | Office List"))){
            log.info("Create Office : Form Submitted Successfully ");
        }
        else{
            log.error("Create Office : Form  Submit Unsuccessful");
            Assert.fail();
        }
    }


    private void generate_form_details_office(Character call){

        if(call == 'P'){// capturing which office to be created
            store.setProperty("create_office_name_provider", random.name().name() + " Provider");
        }
        else{
            store.setProperty("create_office_name_attorney", random.name().lastName() + " Attorney"); //generating Attorney name, phone and address
        }
        store.setProperty("create_office_phone", random.phoneNumber().phoneNumber());
        //generating address
        store.setProperty("create_office_streetAd", random.address().streetAddress());
        store.setProperty("create_office_city", random.address().city());
        store.setProperty("create_office_state", random.address().state());
        store.setProperty("create_office_zipcode", random.address().zipCode());

//storing the generated data in a file
        try (FileOutputStream fos = new FileOutputStream("src/test/resources/Config/test.properties",false)) {
            store.store(fos, "data to fill in the forms");
            log.info("Create_Office: Office_Details : Properties saved successfully.");
        }
        catch (IOException e){
            log.error("Create_Office: Office_Details : Error saving properties: ");
        }}

}
