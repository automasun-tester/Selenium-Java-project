package stepdefs;

import base.BaseClass;
import io.cucumber.java.Before;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;
import pages.CaseList;
import java.io.IOException;


public class CaseListDefs {

    WebDriver driver;
    CaseList obj;
    BaseClass base = new BaseClass();

    @Before
    public void setUp() throws IOException {   //Setting up the base class and CaseList class
        base.setup(); //calling the setup method from base to initial browser and properties files
        driver = BaseClass.getDriver();  // Use the WebDriver instance from baseclass
        obj = new CaseList(driver);  // Pass the WebDriver instance to CaseList page
        obj.setup();  //calling the setup method from CaseList to initial Properties file of the local page
    }


    @When("search for test case")
    public void searchForTestCase() throws InterruptedException {
        obj.search(); //this function will search a case name which is stored in config.properties
    }

    @When("get tile values")
    public void getTileValues() throws InterruptedException {
        obj.tile_validation();
    }

    @When("go to case create page")
    public void goToCaseCreatePage() {
        obj.create_case_button();
    }

    @When("open the case detail page for the searched case")
    public void OpentheCaseDetailPagefortheSearchedCase(){
        obj.open_case();
    }


    @When("go to case list page")
    public void goToCaseListPage() throws InterruptedException {
        obj.go_to_case_list();
    }

    @When("click on complete cases")
    public void clickOnCompleteCases() {
        obj.open_complete_tab();
    }

    @When("search for the completed case attorney")
    public void searchForTheCompletedCaseAttorney() throws InterruptedException {
        obj.search_completed_case_attorney();
    }

    @When("search for the completed case provider")
    public void searchForTheCompletedCaseProvider() throws InterruptedException {
        obj.search_completed_case_provider();
    }

    @When("open my case tab")
    public void openMyCaseTab() {
        obj.open_my_case();
    }

    @When("search for the case in my case")
    public void searchForTheCaseInMyCase() throws InterruptedException {
        obj.search_in_my_case();
    }

    @When("search for test case from group admin")
    public void searchForTestCaseFromProviderGroupAdmin() throws InterruptedException { obj.search_provider_group();
    }

    @When("search for test case from group admin and open")
    public void searchForTestCaseAndOpenFromProviderGroupAdmin() throws InterruptedException { obj.search_and_open_case_provider_group();
    }


    @When("open case detail for the completed case")
    public void openCaseDetailForTheCompletedCase() {
        obj.open_completed_case();
    }
}
