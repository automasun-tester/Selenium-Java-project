package stepdefs;

import base.BaseClass;
import pages.OfficeList;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;

import java.io.IOException;


public class OfficeListDefs {
    WebDriver driver;
    OfficeList office;
    BaseClass base = new BaseClass();
    @Before
    public void setUp() throws IOException {
        base.setup();
        driver = BaseClass.getDriver();  // Use the WebDriver instance from baseclass
        office = new OfficeList(driver); // Pass the WebDriver instance to UserList
        office.setup();
    }
    @Given("go to office list page")
    public void goto_office_list_page() {
        office.Open_officelist();
    }

    @Given("superadmin - go to create office page")
    public void superadmin_go_to_create_office_page() {
            office.superadmin_create_office_button();
    }

    @When("go to inactive office list")
    public void goToInactiveList() { office.open_inactive_list();
    }

    @When("search for the provider office in inactive list")
    public void searchForTheProviderOffice() throws InterruptedException {
        office.search_inactive_provider();
    }

    @When("validate the provider office is active")
    public void validateTheProviderOfficeIsActive() throws InterruptedException {
        office.validating_provider_activation();
    }

    @When("validate the attorney office is active")
    public void validateTheAttorneyOfficeIsActive() throws InterruptedException {
        office.validating_attorney_activation() ;
    }

    @When("search for the attorney office in inactive list")
    public void searchForTheAttorneyOfficeinInactiveList() throws InterruptedException {
        office.search_inactive_attorney();
    }

    @When("go to create office page")
    public void goToCreateOfficePage() { office.create_office_button();
    }

    @When("go to create office request for attorney")
    public void goToCreateOfficeRequestForAttorney() { office.open_office_request_attorney();
    }

    @When("search for the attorney request")
    public void searchForTheAttorneyRequest() { office.search_request_attorney();
    }

    @When("approve attorney office request")
    public void approveAttorneyOfficeRequest() { office.approve_attorney_request();
    }

    @When("go to create office request for provider")
    public void goToCreateOfficeRequestForProvider() { office.open_office_request_provider();
    }

    @When("search for the provider request")
    public void searchForTheProviderRequest() { office.search_request_provider();
    }

    @When("approve provider office request")
    public void approveProviderOfficeRequest() { office.approve_provider_request();
    }

    @When("Reject the attorney request")
    public void rejectTheAttorneyRequest() { office.reject_attorney_request();
    }

    @When("Reject the provider request")
    public void rejectTheProviderRequest() { office.reject_provider_request();
    }

    @When("go to edit inactive attorney office")
    public void goToEditInactiveAttorneyOffice() { office.edit_inactive_attorney();
    }

    @When("go to edit inactive provider office")
    public void goToEditInactiveProviderOffice() { office.edit_inactive_provider();
    }

    @When("search for provider office in active list and open office detail page")
    public void searchForProviderOfficeInActiveList() throws InterruptedException {
        office.search_active_provider_and_open();
    }


    @When("search for attorney office in active list and open office detail page")
    public void searchForAttorneyOfficeInActiveListAndOpenOfficeDetailPage() throws InterruptedException {
        office.search_active_attorney_and_open();
    }
}
