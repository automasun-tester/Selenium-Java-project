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
public class CreateUser {
    private final WebDriver driver;
    private static final Properties create = new Properties();
    private static final Properties store = new Properties();
    private final WebDriverWait wait;

    public CreateUser(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15); // Increased wait time to 15 seconds
    }
    public void setup() throws IOException {
        File configFile = new File("src/test/resources/Config/create_user.properties");
        if (configFile.exists()) {
            FileReader UserList_loc = new FileReader(configFile);
            create.load(UserList_loc);
            log.info("User_List :Config properties loaded successfully.");
        } else {
            throw new FileNotFoundException("User_List :Config file not found at " + configFile.getPath());
        }
}

    public void fill_user_create_form() throws IOException {
        generate_form_details_user();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(create.getProperty("user_first_name")))).sendKeys(store.getProperty("create_user_first_name")); //filling first_name
        driver.findElement(By.xpath(create.getProperty("user_last_name"))).sendKeys(store.getProperty("create_user_last_name")); //filling last name
        driver.findElement(By.xpath(create.getProperty("user_email"))).sendKeys(store.getProperty("create_user_email")); //filing the email addrs.
        Select select = new Select(driver.findElement(By.xpath(create.getProperty("user_role_dd"))));
        select.selectByIndex(random.number().numberBetween(0,1)); //selecting the Role Type Randomly between user admin and user

        driver.findElement(By.xpath(create.getProperty("user_create_submit"))).click();
        if (wait.until(ExpectedConditions.titleContains("User List"))){
            log.info("Create User : User Submit Successfully");
        }
        else{
            log.error("Create user : User Not submitted ");
            Assert.fail();
        }
    }

    private void generate_form_details_user() throws IOException {

        store.setProperty("create_user_first_name", "Test " + random.name().firstName());
        store.setProperty("create_user_last_name", random.name().lastName());
        store.setProperty("create_user_email", "attorneypi1+"+"test"+random.code().ean8()+"@gmail.com");
        try (FileOutputStream fos = new FileOutputStream("src/test/resources/Config/test.properties",false))
        {
            store.store(fos, "data to fill in the forms");
            fos.flush();  // Ensure data is fully written before release
//            System.out.println("Properties saved successfully.");
        }
        catch (IOException e){
            System.err.println("Error saving properties: " + e.getMessage());
        }
    }
}
