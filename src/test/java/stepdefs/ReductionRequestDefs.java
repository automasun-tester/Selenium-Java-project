package stepdefs;

import base.BaseClass;
import pages.ReductionRequest;
import io.cucumber.java.Before;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;

import java.io.IOException;

public class ReductionRequestDefs {
    WebDriver driver;
    ReductionRequest obj;
    BaseClass base = new BaseClass();

    @Before
    public void setUp() throws IOException {   //Setting up the base class and CaseList class
        base.setup(); //calling the setup method from base to initial browser and properties files
        driver = BaseClass.getDriver();  // Use the WebDriver instance from baseclass

        obj = new ReductionRequest(driver);  // Pass the WebDriver instance to CaseList page
        obj.setup();  //calling the setup method from CaseList to initial Properties file of the local page
    }

    @When("go to reduction request tab")
    public void go_to_reduction_request_tab() throws InterruptedException { obj.open_reduction_request();
    }

    @When("validate needs response provider")
    public void validateNeedsResponseprovider() { obj.validate_needs_request_provider();
    }

    @When("check case in waiting for response from attorney")
    public void checkCaseInWaitingForResponseFromAttorney() {obj.check_case_waiting_response_attorney();
    }

    @When("open the offer case")
    public void openTheOfferCase() { obj.open_offer_case();
    }

    @When("validate needs response attorney")
    public void validateNeedsResponseAttorney() { obj.validate_needs_request_attorney();
    }

    @When("check case in waiting for response from provider")
    public void checkCaseInWaitingForResponseFromProvider() {obj.check_case_waiting_response_provider();
    }
}
