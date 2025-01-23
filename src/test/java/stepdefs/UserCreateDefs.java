package stepdefs;

import base.BaseClass;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import org.openqa.selenium.WebDriver;
import pages.CreateUser;

import java.io.IOException;


public class UserCreateDefs {

    WebDriver driver;
    CreateUser user_cre;
    BaseClass base = new BaseClass();
    @Before
    public void setUp() throws IOException {
        base.setup();
        driver = BaseClass.getDriver();  // Use the WebDriver instance from baseclass
        user_cre = new CreateUser(driver);  // Pass the WebDriver instance to create_user
        user_cre.setup();
    }

    @Given("fill the user create form")
    public void fill_the_user_create_form() throws IOException {
        user_cre.fill_user_create_form();
    }
}
