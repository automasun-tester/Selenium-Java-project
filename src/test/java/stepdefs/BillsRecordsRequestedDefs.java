package stepdefs;

import base.BaseClass;
import io.cucumber.java.Before;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;
import pages.BillsRecordsRequested;

import java.io.IOException;

public class BillsRecordsRequestedDefs {

    private BillsRecordsRequested recordsRequested;

    @Before
    public void setUp() throws IOException {
        // Initialize the base setup
        BaseClass base = new BaseClass();
        base.setup();
        WebDriver driver = BaseClass.getDriver(); // Get WebDriver instance from BaseClass

        // Initialize BillsRecordsRequested with the driver
        recordsRequested = new BillsRecordsRequested(driver);
        recordsRequested.setup(); // Load properties specific to BillsRecordsRequested
    }

    @When("check request generated on bills records tab")
    public void checkRequestGeneratedOnBillsRecordsTab() {
        recordsRequested.checkRequestBillsRecords();
    }

    @When("go to bills records requested tab")
    public void goToBillsRecordsRequestedTab() {
        recordsRequested.goToBillsRecordsTab();
    }

    @When("search for requested records case")
    public void searchForRequestedRecordsCase() {
        recordsRequested.searchRequestRecordsCase();
    }

    @When("open the requested records case")
    public void openRequestedRecordsCase() {
        recordsRequested.openRequestedRecordsCase();
    }
}
