import { Given, When, Then, setDefaultTimeout, Before, BeforeStep } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import CaseDetailsPage from "../../pages/CaseDetailsPage";

setDefaultTimeout(60 * 1000 * 2)
let caseDetailsPage : CaseDetailsPage;
let assert : Assert ; 
      BeforeStep(async function () {
        caseDetailsPage = new CaseDetailsPage(fixture.page);
        assert = new Assert(fixture.page);
      });

    Given("click on case edit button", async function () {
              await caseDetailsPage.click_case_edit();
          });

    Given("refer the case to a attorney", async function () {
            await caseDetailsPage.refer_attorney();
        }); 

    Given("go to finance tab", async function () {
          await caseDetailsPage.open_finance_tab();
      });   
      
    Given("click to the make offer", async function () {
        await caseDetailsPage.click_make_offer_button();
    }); 
      
    Given("make an offer from provider", async function () {
      await caseDetailsPage.make_an_offer_provider();
    });  

    Given("go to provider settlement", async function () {
      await caseDetailsPage.open_provider_settlement();
    });

    Given("make a counter offer from attorney", async function () {
      await caseDetailsPage.make_counter_offer_attorney();
    });

    Given("accept the counter offer", async function () {
      await caseDetailsPage.accept_the_counter_offer();  
    });

    Given("refer the case to a provider", async function () {
      await caseDetailsPage.refer_provider();  
    });

    Given("make an offer from attorney", async function () {
      await caseDetailsPage.make_an_offer_attorney();
    });

    Given("make a counter offer from provider", async function () {
      await caseDetailsPage.make_counter_offer_provider();  
    });

    Given("request for bills records", async function () {
      await caseDetailsPage.request_bill_records();
    });

    Given("verify status is Collecting Records", async function () {
      await caseDetailsPage.verify_Status_Collecting_Records();
    }); 
   
    Given("upload the test report", async function () {  
      await caseDetailsPage.upload_test_report();
    });

    Given("send bills records", async function () {
      await caseDetailsPage.send_bills_records();
    });

    Given("verify status is All Provider's Records Received", async function () {
      await caseDetailsPage.verify_Status_All_Providers_Records_Received();
    });

    Given("Verify edit changes", async function VerifyEditChangesn() {
      await caseDetailsPage.verifying_updates();
    });

    Given("open activity logs icon & check whether able to see all details", async function openActivityLogTable() {
      await caseDetailsPage.open_ActivityLog_Table();
    });

    Given("click on edit pencil icon & edit the status to ready for demand", async function clickOnEditPencilIcon() {
      await caseDetailsPage.click_On_Edit_Pencil_Icon();
    });

    Given("verify status is Ready for Demand", async function verifyStatusReadyForDemand() {
      await caseDetailsPage.verify_Status_ReadyForDemand();
    });

    Given("verify status should be Ready for Demand For Provider", async function verifyStatusReadyForDemandForProvider() {
      await caseDetailsPage.verify_Status_ReadyForDemand_For_Provider();
    });

    Given("open provider treatment section", async function openProviderTreatment() {
      await caseDetailsPage.open_provider_treatment();
    }); 

    Given("edit the provider referred date", async function editTheProviderReferredDate() {
      await caseDetailsPage.edit_provider_referred_date();
    });

    Given("validate the referred date", async function validateTheReferredDate() {
      await caseDetailsPage.validate_referred_date();
    });

    Given("end treatment discontinue for loggedin office", async function endTreatmentdiscontinueForLoggedInOffice() {
      await caseDetailsPage.update_end_treatment_discontinue();
    });

    Given("end treatment discharge for loggedin office", async function endTreatmentdischargeForLoggedInOffice() {
      await caseDetailsPage.update_end_treatment_discharge();
    });

    Given("delete the latest treatment", async function deleteTheLatestTreatment() {
      await caseDetailsPage.delete_treatment();
    }); 

    Given("validate the edit treatment", async function validateTheEditTreatment() {
      await caseDetailsPage.validate_edit_treatment();
    });

    Given("edit the latest treatment", async function editTheLatestTreatment() {
      await caseDetailsPage.edit_treatment_details();
    });

    Given("validate treatment is added", async function validateTreatmentIsAdded() {
      await caseDetailsPage.validate_treatment_added();
    });

    Given("add treatment details and submit", async function addTreatmentDetailsAndSubmit() {
      await caseDetailsPage.add_treatment_details();
    });

    Given("click on add treatment button", async function clickOnAddTreatmentButton() {
      await caseDetailsPage.click_add_treatment();
    });

    Given("refer the case to a second provider", async function referTheCaseToASecondProvider() {
      await caseDetailsPage.refer_second_provider();
    });

    Given("open second provider treatment section", async function openSecondProviderTreatmentSection() {
      await caseDetailsPage.open_second_provider_treatment();
    });

    Given("mark status of the case as closed", async function markStatusOfTheCaseAsClosed() {
      await caseDetailsPage.case_status_as_closed();
    });

    Given("click on paperclip icon & generate link", async function clickOnPaperclipIconAndGenerateLink() {
      await caseDetailsPage.click_paperclip_icon();
    });

    Given("mark status of the case as closed for the group provider member", async function markStatusOfTheCaseAsClosedForTheGroupProvider() {
      await caseDetailsPage.case_status_as_closed_group_provider();
    });

    Given("delete self as refered provider from the case", async function deleteSelfAsReferredProviderFromTheCase() {
      await caseDetailsPage.delete_self_as_referred_provider();
    });

    Given("copy URL of the case", async function copyURLOfTheCase() {
      await caseDetailsPage.copy_case_url();
    });

    Given("verify that user is redirected to the case details page", async function verifyThatUserIsRedirectedToTheCaseDetailsPage() {
      await caseDetailsPage.verify_case_details_page();
    });

    Given("verify warning message is displayed when accessing the case via URL", async function verifyWarningMessageIsDisplayedWhenAccessingTheCaseViaURL() {
      await caseDetailsPage.verify_via_case_url();
    });

    Given("delete self as refered attorney from the case", async function deleteSelfAsReferredAttorneyFromTheCase() {
      await caseDetailsPage.delete_self_as_referred_attorney();
    });

    Given("refer the case to a provider for setting test", async function referTheCaseToAProviderForSettingTest() {
      await caseDetailsPage.refer_provider_for_setting_test();
    });

    Given("verify user is able to delete other provider from the case", async function verifyUserIsAbleToDeleteOtherProviderFromTheCase() {
      await caseDetailsPage.verify_user_able_to_delete_other_provider();
    });

    Given("verify user is not able to delete other provider from the case", async function verifyUserIsNotAbleToDeleteOtherProviderFromTheCase() {
      await caseDetailsPage.verify_user_not_able_to_delete_other_provider();
    });



    