package stepdefs;

import base.BaseClass;
import io.cucumber.java.Before;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;
import pages.EditCase;

import java.io.IOException;


public class EditCaseDefs {
    WebDriver driver;
    EditCase edit;
    BaseClass base = new BaseClass();

    @Before
    public void setUp() throws IOException {   //Setting up the base class and CaseList class
        base.setup(); //calling the setup method from base to initial browser and properties files
        driver = BaseClass.getDriver();  // Use the WebDriver instance from baseclass
        edit = new EditCase(driver);  // Pass the WebDriver instance to CaseList page
        edit.setup();  //calling the setup method from CaseList to initial Properties file of the local page
    }
    @When("Edit the case changes")
    public void EdittheCaseChanges() throws InterruptedException {
        edit.editing_case_details(); //updating the case details
    }

    @When("delete the test case")
    public void deleteTheTestCase() {
        edit.delete_the_case();
    }

    @When("delete the test case from group login")
    public void deleteTheTestCaseFromProviderGroupLogin() {
        edit.delete_the_case_provider_group();
    }
}
