package stepdefs;

import base.BaseClass;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import org.openqa.selenium.WebDriver;
import pages.UserList;

import java.io.IOException;


public class UserListDefs {

    WebDriver driver;
    UserList user;
    BaseClass base = new BaseClass();
    @Before
    public void setUp() throws IOException {
        base.setup();
        driver = BaseClass.getDriver();  // Use the WebDriver instance from baseclass
        user = new UserList(driver); // Pass the WebDriver instance to UserList
        user.setup();
    }

    @Given("go to user page")
    public void gotoUserPage() {
        user.Open_UserList();
    }

    @Given("a")
    public void a() {
        user.update_EntryCount();
    }

    @Given("go to user create page")
    public void go_to_user_create_page() {
        user.user_create_button();
    }

    @Given("validate the created user in inactive list")
    public void validate_the_create_user_in_inactive_list() throws InterruptedException {
        user.search_inactive_user();
    }

    @Given("superadmin- search the user in inactive list")
    public void superadmin_search_the_user_in_inactive_list() throws InterruptedException {
        user.activating_inactive_user();
    }

    @Given("validate the created user in active list")
    public void validate_the_created_user_in_active_list() {
        user.search_active_user();
    }
}
