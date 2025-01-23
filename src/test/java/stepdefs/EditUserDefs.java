package stepdefs;

import base.BaseClass;
import pages.EditUser;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import org.openqa.selenium.WebDriver;

import java.io.IOException;

public class EditUserDefs {
    WebDriver driver;
    EditUser edit;
    BaseClass base = new BaseClass();

    @Before
    public void setUp() throws IOException {
        base.setup();
        driver = BaseClass.getDriver();  // Use the WebDriver instance from baseclass
        edit = new EditUser(driver); // Pass the WebDriver instance to UserList
        edit.setup();
    }

    @Given("activate the user")
    public void activate_the_user() throws InterruptedException {
        edit.activating();
    }

    @Given("Submit edit user changes")
    public void Submit_edit_user_changes() {
        edit.submit_edit();
    }
}