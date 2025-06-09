import { Given, setDefaultTimeout, BeforeStep } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import OfficeListPage from "../../pages/OfficleListPage";

setDefaultTimeout(60 * 1000 * 2)
let officeListPage : OfficeListPage;
let assert : Assert ; 
      BeforeStep(async function () {
        officeListPage = new OfficeListPage(fixture.page);
        assert = new Assert(fixture.page);
      });

    Given("go to office list page", async function goto_office_list_page() {
                await officeListPage.Open_officelist();
    });

    Given("superadmin - go to create office page", async function superadmin_go_to_create_office_page() {
                await officeListPage.superadmin_create_office_button();
    });


  Given("go to inactive office list", async function goToInactiveList() {
      await officeListPage.open_inactive_list();
  });

  Given("search for the provider office in inactive list", async function searchForTheProviderOffice() {
    await officeListPage.search_inactive_provider();
  });

  Given("go to edit inactive provider office", async function goToEditInactiveProviderOffice() {
    await officeListPage.edit_inactive_provider();
  });

  Given("go to edit active provider office", async function goToEditActiveProviderOffice() {
    await officeListPage.edit_active_provider();
  });

  Given("go to edit active attorney office", async function goToEditActiveAttorneyOffice() {
    await officeListPage.edit_active_attorney();
  });

  Given("validate the provider office is active", async function validateTheProviderOfficeIsActive() {
    await officeListPage.validating_provider_activation();
  });

  Given("search for the attorney office in inactive list", async function searchForTheAttorneyOfficeinInactiveList() {
    await officeListPage.search_inactive_attorney();
  });

  Given("go to edit inactive attorney office", async function goToEditInactiveAttorneyOffice() {
    await officeListPage.edit_inactive_attorney();
  });

  Given("validate the attorney office is active", async function validateTheAttorneyOfficeIsActive() {
    await officeListPage.validating_attorney_activation();
  });

  Given("go to create office page", async function goToCreateOfficePage() {
    await officeListPage.create_office_button();
  });

  Given("go to create office request for attorney", async function goToCreateOfficeRequestForAttorney() {
    await officeListPage.open_office_request_attorney();
  });

  Given("search for the attorney request", async function searchForTheAttorneyRequest() {
    await officeListPage.search_request_attorney();
  });

  Given("approve attorney office request", async function approveAttorneyOfficeRequest() {
    await officeListPage.approve_attorney_request();
  });

  Given("go to create office request for provider", async function goToCreateOfficeRequestForProvider() {
    await officeListPage.open_office_request_provider();
  });

  Given("search for the provider request", async function searchForTheProviderRequest() {
    await officeListPage.search_request_provider();
  });

  Given("approve provider office request", async function approveProviderOfficeRequest() {
    await officeListPage.approve_provider_request();
  });

  Given("Reject the attorney request", async function rejectTheAttorneyRequest() {
    await officeListPage.reject_attorney_request();
  });

  Given("Reject the provider request", async function rejectTheProviderRequest() {
    await officeListPage.reject_provider_request();
  });

  Given("search for provider office in active list and open office detail page", async function searchForProviderOfficeInActiveList(){
      await officeListPage.search_active_provider_and_open();
  });

  Given("search for attorney office in active list and open office detail page", async function searchForAttsearchForAttorneyOfficeInActiveListAndOpenOfficeDetailPageorneyOfficeInActiveList(){
      await officeListPage.search_active_attorney_and_open();
  });




  
