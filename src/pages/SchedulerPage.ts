import { Page, expect } from "@playwright/test";
import * as commonLocators from '../helper/locators/common_locators.json';   
import * as pageLocators from '../helper/locators/schedule.json';
import * as testData from '../helper/data/test.json';
import TestDataUpdater from "../helper/data/testDataUpdater";

export default class SchedulerPage {
   
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open_scheduler() {
        await this.page.waitForSelector(commonLocators.scheduler_tab);
        await this.page.click(commonLocators.scheduler_tab);
        await this.page.waitForLoadState("load");
    }

    async create_appt_scheduler() {
        await this.page.waitForLoadState("load");
        await this.page.waitForSelector(pageLocators.scheduler_at_10_30);
        await this.page.click(pageLocators.scheduler_at_10_30);    
    }

    async fill_appt_form_scheduler() {
        await this.page.waitForLoadState("load");
        await this.page.waitForTimeout(1000);
         // Fill in the case name
         const freshData = TestDataUpdater.getTestData();
    await this.page.locator(`xpath=${pageLocators.new_appt_case_name}`).fill(freshData.create_case_last_name);
    await this.page.locator(`xpath=${pageLocators.new_appt_case_name}`).press("Backspace");
    // Click on the dropdown
    await this.page.locator(`xpath=${pageLocators.new_appt_case_name_dd}`).click();

    // Fill in the textarea for the appointment description
    await this.page.locator(`xpath=${pageLocators.new_appt_textarea}`).fill("new appointment");

    // Click on the submit button
    await this.page.locator(`xpath=${pageLocators.new_appt_submit}`).click();
    }

    async locate_appt_right_click_for_options() {
        // Locate the appointment element
        await this.page.waitForLoadState("load");

        // await this.page.waitForSelector(pageLocators.scheduler_at_10_30_rightclick);
    const appointment = this.page.locator(`xpath=${pageLocators.scheduler_at_10_30_rightclick}`);

        await this.page.waitForTimeout(1000);
    // Wait for it to be visible
    await appointment.waitFor({ state: "visible" });

    // Perform right-click on the element
    await appointment.click({ button: "right" });
    }

    async click_edit_and_modify_the_note() {
          // Click on the Edit option
          await this.page.waitForLoadState("load");
          await this.page.waitForSelector(`xpath=${pageLocators.appt_edit_option}`);
          await this.page.locator(`xpath=${pageLocators.appt_edit_option}`).click();
    
   
    // Wait for the text area to be visible and modify the note
    const editTextarea = this.page.locator(`xpath=${pageLocators.appt_edit_textarea}`);
    await editTextarea.waitFor({ state: "visible" });
    await editTextarea.fill(" edited");

    // Click the Submit button to save changes
    await this.page.locator(`xpath=${pageLocators.appt_edit_submit}`).click();
    
    }

    async delete_the_appointment() {
        await this.page.waitForLoadState("load");
        // Click on the delete option
        await this.page.waitForSelector(`xpath=${pageLocators.appt_delete_option}`)
        await this.page.locator(`xpath=${pageLocators.appt_delete_option}`).click();

    // Wait for the delete confirmation button to be visible and click it
    const deleteButton = this.page.locator(`xpath=${pageLocators.appt_delete_button}`);
    await deleteButton.waitFor({ state: "visible" });
    await deleteButton.click();
}

async check_for_the_providers_in_scheduler() {

    await this.page.waitForLoadState("load");
    await this.page.waitForSelector(pageLocators.provider_dropdown);
    await this.page.click(pageLocators.provider_dropdown);

    await this.page.waitForSelector(`xpath=${pageLocators.provider_checkedbox}`);
    const checkboxes = this.page.locator(`xpath=${pageLocators.provider_checkedbox}`);

    const checkboxesCount = await checkboxes.count();
    console.log("checkboxes count =",checkboxesCount);

    if (checkboxesCount > 1) {
        for(let i = 0; i > checkboxesCount-1; i++) {
            await checkboxes.nth(i).click();
            console.log("clicked on checkbox = number",i)
        }
    }

}


}