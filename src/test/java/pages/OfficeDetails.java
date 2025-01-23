package pages;

import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.*;
import java.util.Properties;

@Slf4j
public class OfficeDetails {
    private final WebDriver driver;
    private static final Properties officedetail = new Properties();
    private final Properties data = new Properties();
    private final WebDriverWait wait;


    public OfficeDetails (WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 30); // Increased wait time to 30 seconds
    }


    public void setup() throws IOException {
        File Data = new File("src/test/resources/Config/office_data.properties");
        File officepage = new File("src/test/resources/Config/office_details.properties");
        if (officepage.exists()) {
            FileReader UserList_loc = new FileReader(officepage);
            FileReader officedata = new FileReader(Data);
            data.load(officedata);
            officedetail.load(UserList_loc);
            log.info("Office_list :Config properties loaded successfully.");
        } else {
            throw new FileNotFoundException("User_List :Config file not found at " + officepage.getPath());
        }}
    public int pro_BT_total_case, pro_BT_open_case, pro_BT_case_referred, pro_BT_case_returned;
    public double pro_BT_money_paid, att_BT_money_received;
    public int att_BT_total_case, att_BT_open_case, att_BT_case_referred, att_BT_case_returned;
//BT = before test
    public void capture_provider_details_BT() { //Capturing the provider office details from attorney side
        try {
            log.info("Office Details : starting to capture provider details");
            pro_BT_total_case = Integer.parseInt(wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officedetail.getProperty("provider_total_case")))).getText());
            pro_BT_open_case = Integer.parseInt(driver.findElement(By.xpath(officedetail.getProperty("provider_open_case"))).getText());
            pro_BT_money_paid = Double.parseDouble(convertamount(driver.findElement(By.xpath(officedetail.getProperty("provider_money_paid"))).getText()));
            System.out.println(pro_BT_money_paid);
            pro_BT_case_referred = Integer.parseInt(driver.findElement(By.xpath(officedetail.getProperty("provider_case_referred"))).getText());
            pro_BT_case_returned = Integer.parseInt(driver.findElement(By.xpath(officedetail.getProperty("provider_case_returned"))).getText());
            log.info("Office Details : Details captured for provider office ");
//Storing the data so that it can be compared later
            data.setProperty("pro_BT_total_case", String.valueOf(pro_BT_total_case));
            data.setProperty("pro_BT_open_case", String.valueOf(pro_BT_open_case));
            data.setProperty("pro_BT_money_paid", String.valueOf(pro_BT_money_paid));
            data.setProperty("pro_BT_case_referred", String.valueOf(pro_BT_case_referred));
            data.setProperty("pro_BT_case_returned", String.valueOf(pro_BT_case_returned));

//storing the generated data in a file
            try (FileOutputStream fos = new FileOutputStream("src/test/resources/config/office_data.properties",false)) {
                data.store(fos, "office details data for comparison  ");
                log.info("Office_Details : Office_Details : Properties saved successfully.");
            }
            catch (IOException e){
                log.error("Office_Details: Office_Details : Error saving properties: ");
            }
        } catch (NumberFormatException e) {
            log.error("Office Details : Problem in capturing provider details");
            throw new RuntimeException(e);
        }
    }
    //BT = before test
    public void capture_attorney_details_BT() {//Capturing the attorney office details from provider side
        try {
            log.info("Office Details : starting to capture attorney details");
            att_BT_total_case = Integer.parseInt(wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officedetail.getProperty("attorney_total_cases")))).getText());
            att_BT_open_case = Integer.parseInt(driver.findElement(By.xpath(officedetail.getProperty("attorney_open_cases"))).getText());
            att_BT_money_received = Double.parseDouble(convertamount(driver.findElement(By.xpath(officedetail.getProperty("attorney_money_received"))).getText()));
            att_BT_case_referred = Integer.parseInt(driver.findElement(By.xpath(officedetail.getProperty("attorney_case_referred"))).getText());
            att_BT_case_returned = Integer.parseInt(driver.findElement(By.xpath(officedetail.getProperty("attorney_case_returned"))).getText());
            log.info("Office Details : Details captured for attorney office ");

            data.setProperty("att_BT_total_case", String.valueOf(att_BT_total_case));
            data.setProperty("att_BT_open_case", String.valueOf(att_BT_open_case));
            data.setProperty("att_BT_money_received", String.valueOf(att_BT_money_received));
            data.setProperty("att_BT_case_referred", String.valueOf(att_BT_case_referred));
            data.setProperty("att_BT_case_returned", String.valueOf(att_BT_case_returned));

//storing the generated data in a file
            try (FileOutputStream fos = new FileOutputStream("src/test/resources/config/office_data.properties",false)) {
                data.store(fos, "office details data for comparison  ");
                log.info("Office_Details : Office_Details : Properties saved successfully.");
            }
            catch (IOException e){
                log.error("Office_Details: Office_Details : Error saving properties: ");
            }
        } catch (NumberFormatException e) {
            log.error("Office Details : Problem in capturing attorney details");
            throw new RuntimeException(e);
        }
    }
    public int pro_AT_total_case, pro_AT_open_case, pro_AT_case_referred, pro_AT_case_returned;
    public double pro_AT_money_paid, att_AT_money_received;
    public int att_AT_total_case, att_AT_open_case, att_AT_case_referred, att_AT_case_returned;
//AT = after test
    public void capture_provider_details_AT() {//Capturing the provider office details from attorney side
        try {
            log.info("Office Details : starting to capture provider details");
            pro_AT_total_case = Integer.parseInt(wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officedetail.getProperty("provider_total_case")))).getText());
            pro_AT_open_case = Integer.parseInt(driver.findElement(By.xpath(officedetail.getProperty("provider_open_case"))).getText());
            pro_AT_money_paid = Double.parseDouble(convertamount(driver.findElement(By.xpath(officedetail.getProperty("provider_money_paid"))).getText()));
            pro_AT_case_referred = Integer.parseInt(driver.findElement(By.xpath(officedetail.getProperty("provider_case_referred"))).getText());
            pro_AT_case_returned = Integer.parseInt(driver.findElement(By.xpath(officedetail.getProperty("provider_case_returned"))).getText());
            log.info("Office Details : Details captured for provider office ");

            data.setProperty("pro_AT_total_case", String.valueOf(pro_AT_total_case));
            data.setProperty("pro_AT_open_case", String.valueOf(pro_AT_open_case));
            data.setProperty("pro_AT_money_paid", String.valueOf(pro_AT_money_paid));
            data.setProperty("pro_AT_case_referred", String.valueOf(pro_AT_case_referred));
            data.setProperty("pro_AT_case_returned", String.valueOf(pro_AT_case_returned));

//storing the generated data in a file
            try (FileOutputStream fos = new FileOutputStream("src/test/resources/config/office_data.properties",false)) {
                data.store(fos, "office details data for comparison  ");
                log.info("Office_Details : Office_Details : Properties saved successfully.");
            }
            catch (IOException e){
                log.error("Office_Details: Office_Details : Error saving properties: ");
            }
        } catch (NumberFormatException e) {
            log.error("Office Details : Problem in capturing provider details");
            throw new RuntimeException(e);
        }
    }
    //AT = after test
    public void capture_attorney_details_AT() {
        try {
            log.info("Office Details : starting to capture attorney details");
            att_AT_total_case = Integer.parseInt(wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(officedetail.getProperty("attorney_total_cases")))).getText());
            att_AT_open_case = Integer.parseInt(driver.findElement(By.xpath(officedetail.getProperty("attorney_open_cases"))).getText());
            att_AT_money_received = Double.parseDouble(convertamount(driver.findElement(By.xpath(officedetail.getProperty("attorney_money_received"))).getText()));
            att_AT_case_referred = Integer.parseInt(driver.findElement(By.xpath(officedetail.getProperty("attorney_case_referred"))).getText());
            att_AT_case_returned = Integer.parseInt(driver.findElement(By.xpath(officedetail.getProperty("attorney_case_returned"))).getText());
            log.info("Office Details : Details captured for attorney office ");

            data.setProperty("att_AT_total_case", String.valueOf(att_AT_total_case));
            data.setProperty("att_AT_open_case", String.valueOf(att_AT_open_case));
            data.setProperty("att_AT_money_received", String.valueOf(att_AT_money_received));
            data.setProperty("att_AT_case_referred", String.valueOf(att_AT_case_referred));
            data.setProperty("att_AT_case_returned", String.valueOf(att_AT_case_returned));

//storing the generated data in a file
            try (FileOutputStream fos = new FileOutputStream("src/test/resources/config/office_data.properties",false)) {
                data.store(fos, "office details data for comparison  ");
                log.info("Office_Details : Office_Details : Properties saved successfully.");
            }
            catch (IOException e){
                log.error("Office_Details: Office_Details : Error saving properties: ");
            }
        } catch (NumberFormatException e) {
            log.error("Office Details : Problem in capturing attorney details");
            throw new RuntimeException(e);
        }
    }
    private String convertamount(String amount){ //converting the String value to double
        System.out.println(amount);
        int comma = amount.indexOf(',');
        return  amount.substring(1,comma)+amount.substring(comma+1);
    }

    public void compare_office_details() {
        if ((Integer.parseInt(data.getProperty("pro_AT_total_case")) - Integer.parseInt(data.getProperty("pro_BT_total_case"))) == 1)
            log.info("Office Details : Comparing provider Total case CORRECT");
        else
            log.error("Office Details : Comparing provider Total case INCORRECT");

        if ((Integer.parseInt(data.getProperty("pro_AT_open_case")) - Integer.parseInt(data.getProperty("pro_BT_open_case"))) == 1)
            log.info("Office Details : Comparing provider Open case CORRECT");
        else
            log.error("Office Details : Comparing provider Open case INCORRECT");

        if ((Integer.parseInt(data.getProperty("pro_AT_case_returned")) - Integer.parseInt(data.getProperty("pro_BT_case_returned"))) == 1)
            log.info("Office Details : Comparing provider case returned CORRECT");
        else
            log.error("Office Details : Comparing provider case returned INCORRECT");

        if ((Integer.parseInt(data.getProperty("att_AT_open_case")) - Integer.parseInt(data.getProperty("att_BT_open_case"))) == 1)
            log.info("Office Details : Comparing Attorney open case CORRECT");
        else
            log.error("Office Details : Comparing Attorney open case INCORRECT");

        if ((Integer.parseInt(data.getProperty("att_AT_total_case")) - Integer.parseInt(data.getProperty("att_BT_total_case"))) == 1)
            log.info("Office Details : Comparing Attorney Total case CORRECT");
        else
            log.error("Office Details : Comparing Attorney Total case INCORRECT");

        if ((Integer.parseInt(data.getProperty("att_AT_case_referred")) - Integer.parseInt(data.getProperty("att_BT_case_referred"))) == 1)
            log.info("Office Details : Comparing Attorney case referred CORRECT");
        else
            log.error("Office Details : Comparing Attorney case referred INCORRECT");

    }
}
