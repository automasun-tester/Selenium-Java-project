package stepdefs;

import base.BaseClass;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import org.openqa.selenium.WebDriver;
import pages.CreateOffice;

import java.io.IOException;

public class CreateOfficeDefs {

        WebDriver driver;
        CreateOffice office;
        BaseClass base = new BaseClass();
        @Before
        public void setUp() throws IOException {
            base.setup();
            driver = BaseClass.getDriver();  // Use the WebDriver instance from baseclass
            office = new CreateOffice(driver); // Pass the WebDriver instance to UserList
            office.setup();
        }
        @Given("fill the office create form for Attorney")
        public void fill_the_office_create_form_for_Attorney() throws InterruptedException {
            office.fill_form_create_office_attorney();
        }

        @Given("fill the office create form for provider")
        public void fill_the_office_create_form_for_provider() throws InterruptedException {
            office.fill_form_create_office_provider();
        }
}
