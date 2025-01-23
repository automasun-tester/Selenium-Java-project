package stepdefs;

import base.BaseClass;
import pages.CaseDetails;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Given;
import org.openqa.selenium.WebDriver;

import java.io.IOException;

public class CaseDetailsDefs {

    WebDriver driver;
    CaseDetails casedetails_obj;
    BaseClass base = new BaseClass();

    @Before
    public void setUp() throws IOException {   //Setting up the base class and CaseList class
        base.setup(); //calling the setup method from base to initial browser and properties files
        driver = BaseClass.getDriver();  // Use the WebDriver instance from baseclass
        casedetails_obj = new CaseDetails(driver);  // Pass the WebDriver instance to CaseList page
        casedetails_obj.setup();  //calling the setup method from CaseList to initial Properties file of the local page
    }

    @When("click on case edit button")
    public void clickonCaseEditButton() throws InterruptedException {
        casedetails_obj.click_case_edit(); //clicks on edit case button
    }

    @When("Verify edit changes")
    public void VerifyEditChangesn() throws InterruptedException {
        casedetails_obj.verifying_updates(); //clicks on edit case button
    }

    @When("refer the case to a attorney")
    public void referTheCaseToAAttorney() throws InterruptedException {
        casedetails_obj.refer_attorney();
    }

    @When("go to finance tab")
    public void goToFinanceTab() {
        casedetails_obj.open_finance_tab();
    }

    @When("click to the make offer")
    public void clickToTheMakeOffer() {
        casedetails_obj.click_make_offer_button();
    }

    @When("make an offer from provider")
    public void makeAnOfferfromprovider() {
        casedetails_obj.make_an_offer_provider();
    }

    @When("go to provider settlement")
    public void goToProviderSettlement() throws InterruptedException {
        casedetails_obj.open_provider_settlement();
    }

    @When("make a counter offer from attorney")
    public void makeACounterOfferFromAttorney() throws InterruptedException {
        casedetails_obj.make_counter_offer_attorney();
    }

    @When("accept the counter offer")
    public void acceptTheCounterOffer() throws InterruptedException {
        casedetails_obj.accept_the_counter_offer();
    }

    @When("refer the case to a provider")
    public void referTheCaseToAProvider() throws InterruptedException {
        casedetails_obj.refer_provider();
    }

    @When("make an offer from attorney")
    public void makeAnOfferFromAttorney() {
        casedetails_obj.make_an_offer_attorney();
    }

    @When("make a counter offer from provider")
    public void makeACounterOfferFromProvider() throws InterruptedException {
        casedetails_obj.make_counter_offer_provider();
    }

    @When("mark status of the case as closed")
    public void markStatusOfTheCaseAsClosed() {
        casedetails_obj.case_status_as_closed();
    }

    @When("assign a case manager to the case")
    public void assignACaseManagerToTheCase() {
        casedetails_obj.assign_case_manager();
    }

    @When("upload the test report")
    public void uploadTheTestReport() {
        casedetails_obj.upload_test_report();
    }

    @When("request for bills records")
    public void requestForBillRecords() {
        casedetails_obj.request_bill_records();
    }

    @When("open provider treatment section")
    public void openProviderTreatment() { casedetails_obj.open_provider_treatment();
    }

    @When("edit the provider referred date")
    public void editTheProviderReferredDate() { casedetails_obj.edit_provider_referred_date();
    }

    @When("validate the referred date")
    public void validateTheReferredDate() { casedetails_obj.validate_referred_date();
    }

    @When("click on add treatment button")
    public void clickOnAddTreatmentButton() { casedetails_obj.click_add_treatment();
    }

    @When("add treatment details and submit")
    public void addTreatmentDetailsAndSubmit() { casedetails_obj.add_treatment_details();
    }

    @When("validate treatment is added")
    public void validateTreatmentIsAdded() { casedetails_obj.validate_treatment_added();
    }

    @When("edit the latest treatment")
    public void editTheLatestTreatment() { casedetails_obj.edit_treatment_details();
    }

    @When("validate the edit treatment")
    public void validateTheEditTreatment() { casedetails_obj.validate_edit_treatment();
    }

    @When("delete the latest treatment")
    public void deleteTheLatestTreatment() { casedetails_obj.delete_treatment();
    }

    @When("refer the case to a second provider")
    public void referTheCaseToASecondProvider() throws InterruptedException { casedetails_obj.refer_second_provider();
    }

    @When("open second provider treatment section")
    public void openSecondProviderTreatmentSection() {  casedetails_obj.open_second_provider_treatment();
    }

    @When("end treatment discharge for loggedin office")
    public void endTreatmentdischargeForLoggedInOffice() throws InterruptedException {
        casedetails_obj.update_end_treatment_discharge();
    }

    @When("end treatment discontinue for loggedin office")
    public void endTreatmentdiscontinueForLoggedInOffice() throws InterruptedException {
        casedetails_obj.update_end_treatment_discontinue();
    }

    @Given("click on paperclip icon & generate link")
    public void clickOnPaperClipIconGenerateLink() throws InterruptedException {
        casedetails_obj.click_On_PaperClipIcon_GenerateLink();
    }

    //starting card-709
    @When("open activity logs icon & check whether able to see all details")
    public void openActivityLogTable() throws InterruptedException {
        casedetails_obj.open_ActivityLog_Table();
    }
    //ending card-709

    //card-1019
    @When("verify status is Collecting Records")
    public void verifyStatusCollectingRecords() throws InterruptedException {  casedetails_obj.verify_Status_Collecting_Records();
    }

    @When("send bills records")
    public void sendBillsRecords() throws InterruptedException  {
        casedetails_obj.send_bills_records();
    }

    @When("verify status is All Provider's Records Received")
    public void verifyStatusAllProvidersRecordsReceived() throws InterruptedException {  casedetails_obj.verify_Status_All_Providers_Records_Received();
    }
    //ending card-1019

    //card-1065
    @When("click on edit pencil icon & submit")
    public void clickOnEditPencilIcon() throws InterruptedException {  casedetails_obj.click_On_Edit_Pencil_Icon();
    }

    @When("verify status is Ready for Demand")
    public void verifyStatusReadyForDemand() throws InterruptedException {  casedetails_obj.verify_Status_ReadyForDemand();
    }

    @When("verify status should be Ready for Demand For Provider")
    public void verifyStatusReadyForDemandForProvider() throws InterruptedException {  casedetails_obj.verify_Status_ReadyForDemand_For_Provider();
    }
    //ending 1065 here
}


