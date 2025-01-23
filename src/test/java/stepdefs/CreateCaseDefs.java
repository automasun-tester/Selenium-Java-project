package stepdefs;

import base.BaseClass;
import pages.CreateCase;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;

import java.io.IOException;


public class CreateCaseDefs {
    WebDriver driver;
    CreateCase cre_obj;
    BaseClass base = new BaseClass();

    @Before
    public void setUp() throws IOException {   //Setting up the base class and CaseList class
        base.setup(); //calling the setup method from base to initial browser and properties files
        driver = BaseClass.getDriver();  // Use the WebDriver instance from baseclass
        cre_obj = new CreateCase(driver);  // Pass the WebDriver instance to CaseList page
        cre_obj.setup();  //calling the setup method from CaseList to initial Properties file of the local page
    }
    @Given("fill the case create form and submit")
    public void fillTheCaseCreateFormAndSubmit(){
        cre_obj.fill_form();
    }

    @When("fill the case create form for group admin and submit")
    public void fillTheCaseCreateFormForGroupAdminAndSubmit() { cre_obj.fill_form_group_admin();
    }

    @When("fill the case create form with duplicate details DOI and DOB")
    public void fillTheCaseCreateFormWithDuplicateDetailsAndSubmit() {
        cre_obj.fill_form_with_duplicate_DOI_DOB();
    }

    @When("fill the case create form with duplicate details DOB and SSN")
    public void fillTheCaseCreateFormWithDuplicateDetailsDOBAndSSN() {
        cre_obj.fill_form_with_duplicate_SSN_DOB();
    }

}
