package stepdefs;

import base.BaseClass;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;
import pages.EditOffice;

import java.io.IOException;

    public class EditOfficeDefs {
        WebDriver driver;
        EditOffice office;
        BaseClass base = new BaseClass();
        @Before
        public void setUp() throws IOException {
            base.setup();
            driver = BaseClass.getDriver();  // Use the WebDriver instance from baseclass
            office = new EditOffice(driver); // Pass the WebDriver instance to UserList
            office.setup();
        }
        @Given("activate office")
        public void activate_the_office() {
            office.activating_office();
        }

        @When("submit the edit office form")
        public void submit_The_Edit_Office_Form() throws InterruptedException {
            office.submit_edit_office();
        }
    }

