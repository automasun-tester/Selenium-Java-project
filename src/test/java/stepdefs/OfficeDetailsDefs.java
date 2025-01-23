package stepdefs;

import base.BaseClass;
import pages.OfficeDetails;

import io.cucumber.java.Before;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;

import java.io.IOException;

public class OfficeDetailsDefs {
    WebDriver driver;
    OfficeDetails office;
    BaseClass base = new BaseClass();
    @Before
    public void setUp() throws IOException {
        base.setup();
        driver = BaseClass.getDriver();  // Use the WebDriver instance from baseclass
        office = new OfficeDetails(driver); // Pass the WebDriver instance to UserList
        office.setup();
    }

    @When("capture the data for attorney office \\(before test)")
    public void captureTheDataForAttorneyOfficeBeforeTest() {
        office.capture_attorney_details_BT();
    }

    @When("capture the data of provider office \\(before test)")
    public void captureTheDataOfProviderOfficeBeforeTest() {
        office.capture_provider_details_BT();
    }

    @When("capture the data of provider office \\(after test)")
    public void captureTheDataOfProviderOfficeAfterTest() {
        office.capture_provider_details_AT();

    }

    @When("capture the data for attorney office \\(after test)")
    public void captureTheDataForAttorneyOfficeAfterTest() {
        office.capture_attorney_details_AT();
    }


    @When("compare the office detail data")
    public void compareTheOfficeDetailData() { office.compare_office_details();
    }
}
