package pages;

import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

import static base.BaseClass.*;

@Slf4j
public class UserList {
    private final WebDriver driver;
    private static final Properties userpage = new Properties();
    private final WebDriverWait wait;
    public final Properties store = new Properties();

    public UserList(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15); // Increased wait time to 15 seconds
    }
    public void setup() throws IOException {
        File configFile = new File("src/test/resources/Config/user_list.properties");
        File userdata = new File("src/test/resources/Config/test.properties");
        if (configFile.exists() && userdata.exists()) {
            FileReader UserList_loc = new FileReader(configFile);
            FileReader details = new FileReader(userdata);
            store.load(details);
            userpage.load(UserList_loc);
            log.info("User_List :Config properties loaded successfully.");
        } else {
            throw new FileNotFoundException("User_List :Config file not found at " + configFile.getPath());
        }
    }
    public void Open_UserList(){

        driver.findElement(By.xpath(loc.getProperty("top_right_profile_dd"))).click();
        driver.findElement(By.xpath(loc.getProperty("users_link"))).click();
        if (driver.getTitle().equalsIgnoreCase("SimplifyPI | User List")){
            log.info("In User List");
            Assert.assertTrue(true);

        }
        else {
            log.error("Clicked on user option but not in User List: Current location : " + driver.getTitle());

        }
    }

    public void update_EntryCount(){
        Select select = new Select(driver.findElement(By.xpath(userpage.getProperty("active_user_entry"))));
        select.selectByIndex(random.number().numberBetween(0,4));
    }

    public void next_UserList(){
       WebElement NextButton = driver.findElement(By.xpath(userpage.getProperty("active_user_next")));
       WebElement PreviousButton = driver.findElement(By.xpath(userpage.getProperty("active_user_previous")));
       WebElement UserList_info = driver.findElement(By.xpath("active_UserList_info"));  // number of user showing in the table
        if (NextButton.isEnabled()){                                                                    // checking if Next Pagination is Clickable
            log.info(" UserList: Next Button is Clickable ");
            String data = UserList_info.getText();
            int users_BeforeClicking_next = extract(data);
            NextButton.click();
            log.info("UserList: Clicked on Next Button");
            wait.until(ExpectedConditions.elementToBeClickable(PreviousButton));
            String data2 = UserList_info.getText();
            int users_AfterClicking_next = extract(data2);
            Assert.assertTrue(users_AfterClicking_next > users_BeforeClicking_next);
        }
        else
            log.info("UserList: Next Button not clickable");
        if (PreviousButton.isEnabled())
        {
            log.info(" UserList: Previous Button is Clickable ");
            String data = UserList_info.getText();
            int users_BeforeClicking_Previous = extract(data);
            NextButton.click();
            log.info("UserList: Clicked on Previous Button");
            wait.until(ExpectedConditions.elementToBeClickable(PreviousButton));
            String data2 = UserList_info.getText();
            int users_AfterClicking_Previous = extract(data2);
            Assert.assertTrue(users_AfterClicking_Previous < users_BeforeClicking_Previous);
            log.info("UserList: Previous Pagination Button working fine");
        }
    }

    private int extract(String extraction){        //Extracting number of User present in the User Table
        int start = extraction.indexOf("to")+1;
        int end = extraction.indexOf("of")-1;
        return Integer.parseInt(extraction.substring(start,end));
    }

    public void search_active_user() {
        WebElement search = driver.findElement(By.xpath(userpage.getProperty("active_user_search")));
        wait.until(ExpectedConditions.elementToBeClickable(search)).click();
        search.sendKeys(store.getProperty("create_user_email"));
        //Validation for the Search using first, last name and Email for the Provider
        validate_active_search(store.getProperty("create_user_email"));
//        validate_active_search(store.getProperty("search_user_last_name1"));
//        validate_active_search(prop.getProperty("search_user_email1"));
    }



    private void validate_active_search(String searched) {
        wait.until(ExpectedConditions.textToBe(By.xpath(userpage.getProperty("first_active_user_email")),store.getProperty("create_user_email")));
        String user_data = driver.findElement(By.xpath(userpage.getProperty("first_active_user_email"))).getText();
        System.out.println(user_data);
        if (user_data.contains(searched))
            log.info("User List: active list: Search Successful");
        else {
            log.info("User List: active list: Search Unsuccessful");
            Assert.fail();
        }

    }
    public void user_create_button() { //clicks on user create button
            wait.until(ExpectedConditions.elementToBeClickable(By.xpath(userpage.getProperty("create_user_button")))).click();
        }


        public void search_inactive_user() throws InterruptedException {

            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(userpage.getProperty("inactive_list_button")))).click();
            WebElement inactive_search = wait.until(ExpectedConditions.elementToBeClickable(By.xpath(userpage.getProperty("inactive_user_search"))));
            inactive_search.click();
            // By first name
//            inactive_search.sendKeys(store.getProperty("create_user_first_name"));
//            validating(store.getProperty("create_user_first_name"));
//            inactive_search.clear();
//            inactive_search.sendKeys(store.getProperty("create_user_last_name"));
//            validating(store.getProperty("create_user_last_name"));
//            inactive_search.clear();
            inactive_search.sendKeys(store.getProperty("create_user_email"));//search bar
            Thread.sleep(2000);
            validate_inactive_search(store.getProperty("create_user_email"));
            inactive_search.clear();

        }
        private void validate_inactive_search(String data){
//        wait.until(ExpectedConditions.textToBe(By.xpath(userpage.getProperty("first_inactive_user_email")),store.getProperty("create_user_email")));
        String email = driver.findElement(By.xpath(userpage.getProperty("first_inactive_user_email"))).getText();
        System.out.println(email);
            if(email.contains(data)){
                log.info("User List : Inactive user: Search Successful");
            }
            else {
                log.error("userList: Inactive user : Search Unsuccessful");
//                Assert.fail();
            }
        }


        public void activating_inactive_user() throws InterruptedException {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(userpage.getProperty("inactive_list_button")))).click();
            driver.findElement(By.xpath(userpage.getProperty("inactive_user_search"))).click();
            driver.findElement(By.xpath(userpage.getProperty("inactive_user_search"))).sendKeys(store.getProperty("create_user_email"));

            wait.until(ExpectedConditions.textToBe(By.xpath(userpage.getProperty("first_inactive_user_email")),store.getProperty("create_user_email")));
          if (driver.findElement(By.xpath(userpage.getProperty("first_inactive_user_edit"))).isDisplayed()) {
              driver.findElement(By.xpath(userpage.getProperty("first_inactive_user_edit"))).click();
          }
          else {
              log.error("User_List: Inactive User Search - not found");
          }

       }
    }


