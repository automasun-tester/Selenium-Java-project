package stepdefs;

import base.BaseClass;
import pages.LoginTest;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import org.openqa.selenium.WebDriver;

import java.io.IOException;


public class LoginDefs {

    WebDriver driver;
    LoginTest login;
    BaseClass base = new BaseClass();
    @Before
    public void setUp() throws IOException {
        base.setup();
        driver = BaseClass.getDriver();  // Use the WebDriver instance from baseclass
        login = new LoginTest(driver); // Pass the WebDriver instance to loginpage
        login.setup();
    }

    // Generic step definition to handle different user types dynamically
    @Given("login as {string} and password")
    public void login_as_user_and_password(String user) {
        login.login(user);
    }

    // Specific step definition for provider login
    @Given("login as provider and password")
    public void login_as_provider_and_password() {
        login.login("provider");
    }

    //Specific step definition for attorney login
    @Given("login as attorney and password")
    public void login_as_attorney_and_password() {
        login.login("attorney");
    }

    //Specific step definition for Provider group login
    @Given("login as provider group and password")
    public void login_as_provider_group_and_password() {
        login.login("provider group");
    }

    //Specific step definition for attorney group login
    @Given("login as attorney group and password")
    public void login_as_attorney_group_and_password() {
        login.login("attorney group");
    }

    // Specific step definition for admin login
    @Given("login as superadmin and password")
    public void login_as_admin_and_password() {
        login.login("superadmin");
    }

    @Given("logout")
    public void logout() throws IOException {
        login.logout();
        base.tearDown();
    }

}