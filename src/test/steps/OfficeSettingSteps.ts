import { Given, setDefaultTimeout, BeforeStep } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import OfficeSettingPage from "../../pages/OfficeSettingPage";

setDefaultTimeout(60 * 1000 * 2)
let officeSettingPage : OfficeSettingPage;
let assert : Assert ; 
      BeforeStep(async function () {
        officeSettingPage = new OfficeSettingPage(fixture.page);
        assert = new Assert(fixture.page);
      });


    // Given("go to office settings", async function goToOfficeSettings() {
    // await officeSettingPage.open_office_settings();
    // });

    Given("click on create appointment type button", async function clickOnCreateAppointmentTypeButton() {
        await officeSettingPage.click_create_appt_type_button();
    });

    Given("create appointment type", async function createAppointmentType() {
        await officeSettingPage.create_appt_type();
    });

    Given("validate appointment type created", async function validateAppointmentTypeCreated() {
        await officeSettingPage.validate_appt_type_create();
    });

    Given("edit the appointment type", async function editTheAppointmentType() {
        await officeSettingPage.edit_appt_type();
    });

    Given("delete the appointment type", async function deleteTheAppointmentType() {
        await officeSettingPage.delete_appt_type();
    });

    Given("go to settings page", async function goToSettingsPage() {
        await officeSettingPage.open_settings_page();
    });

    Given("click the setting Other clinics can remove me as a provider to a case", async function disableOtherClinicsSetting() {
        await officeSettingPage.click_other_clinics_setting();
    });

    Given("uncheck the setting Put most recently accessed case at the top", async function uncheckMostRecentlyAccessedSetting() {
        await officeSettingPage.click_most_recently_accessed_setting();
    });

    Given("checkmark the setting Put most recently accessed case at the top", async function checkmarkMostRecentlyAccessedSetting() {
        await officeSettingPage.click_most_recently_accessed_setting();
    });