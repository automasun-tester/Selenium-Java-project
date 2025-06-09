import { Page, Locator } from "@playwright/test";
import * as pageLocators from '../helper/locators/office_settings.json';
import * as commonLocators from '../helper/locators/common_locators.json';
import TestDataUpdater from "../helper/data/testDataUpdater";
import { faker } from "@faker-js/faker"; // ✅ Using Faker.js for random data
import { PickleNameFilter } from "@cucumber/cucumber/lib/pickle_filter";

export default class OfficeSettingPage {
   
    private page: Page;
    private itemToCheck = "Test 5";

    constructor(page: Page) {
        this.page = page;
    }


    async open_office_settings() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState("load");
    
        // Click on the top-right profile dropdown
        await this.page.locator(`xpath=${commonLocators.top_right_profile_dd}`).click();
        
        // Click on the settings link
        await this.page.locator(`xpath=${commonLocators.setting_link}`).click();
    
        // console.log("✅ OfficeSettings: openOfficeSettings: Office Setting opened");
    }

    async click_create_appt_type_button() {
        await this.page.waitForLoadState("load"); // Wait for 1 second (if necessary)
        await this.page.waitForSelector(`xpath=${pageLocators.create_appt_type_button}`);
        await this.page.locator(`xpath=${pageLocators.create_appt_type_button}`).click();
    }

    async create_appt_type() {
        await this.page.waitForLoadState("load");
         // Fill the appointment type name
        await this.page.waitForSelector(`xpath=${pageLocators.create_appt_type_name}`);
        await this.page.locator(`xpath=${pageLocators.create_appt_type_name}`).fill(this.itemToCheck);
        // Click the submit button
        await this.page.locator(`xpath=${pageLocators.create_appt_type_submit}`).click();
        // console.log("✅ OfficeSettings: createApptType: Created appointment type");
    }

    async validate_appt_type_create() {
        let isItemFound = false;
        await this.page.waitForTimeout(1000);
        // Wait for the appointment type table to be visible
        const table = this.page.locator(`xpath=${pageLocators.appt_type_validate}`);
    
        // Ensure table is visible
        await table.waitFor({ state: "visible" });
    
        // Locate all rows inside the table body
        const rows = await table.locator("xpath=.//tr").all();
        
        
        // Iterate through each row to find the item
        for (const row of rows) {
            const apt_type = (await row.locator("xpath=.//td[2]").textContent())?.trim();
            console.log(apt_type);
            // Check if the text matches the expected item
            if (apt_type?.toLowerCase() === this.itemToCheck.toLowerCase()) {
                // console.log("✅ OfficeSettings: validateApptTypeCreate: Item found in the table.");
                isItemFound = true;
                break;
            }
        }
    
        if (!isItemFound) {
            console.error("❌ OfficeSettings: validateApptTypeCreate: Item not found in the table.");
            throw new Error("Appointment type not found.");
        }
    }

    async edit_appt_type() {
        await this.page.waitForLoadState("load");
        // Wait for the appointment type table to be visible
    const table = this.page.locator(`xpath=${pageLocators.appt_type_validate}`);
    await table.waitFor({ state: "visible" });

    // Locate all rows inside the table body
    const rows = await table.locator("xpath=.//tr").all();

    // Iterate through each row to find the matching appointment type
    for (const row of rows) {
        const typeLocator = row.locator("xpath=.//td[2]");
        const typeText = await typeLocator.textContent();

        // Check if the text matches the expected item
        if (typeText?.trim() === this.itemToCheck) {
            await this.editProcess(row);
            break;
        }
    }
}

private async editProcess(apptRow: Locator) {
    await this.page.waitForLoadState("load");
    // Hover over the row to reveal edit & delete buttons
    await apptRow.hover();
    
    // Click the edit button (assuming it's in the 6th column as per your code)
    const editButton = apptRow.locator("xpath=.//td[6]//a[1]");
    await editButton.waitFor({ state: "visible" });
    await editButton.click();

    // Wait for duration input to be visible, clear it & enter new value
    const durationInput = this.page.locator(`xpath=${pageLocators.create_appt_type_duration}`);
    await durationInput.waitFor({ state: "visible" });
    await durationInput.fill("20");

    // Click the submit button to save changes
    const submitButton = this.page.locator(`xpath=${pageLocators.create_appt_type_submit}`);
    await submitButton.waitFor({ state: "visible" });
    await submitButton.click();

    if(await this.page.locator(pageLocators.Only_this_office).isVisible()){
        await this.page.locator(pageLocators.Only_this_office).click();}

    // console.log("✅ Appointment type updated successfully.");
}
    async delete_appt_type() {
             // Refresh the page to ensure the latest data
    await this.page.reload();
    await this.page.waitForTimeout(2000);

    // Wait for the appointment type table to be visible
    const table = this.page.locator(`xpath=${pageLocators.appt_type_validate}`);
    await table.waitFor({ state: "visible" });

    // Locate all rows inside the table body
    const rows = await table.locator("xpath=.//tr").all();

    // Iterate through each row to find the matching appointment type
    for (const row of rows) {
        const typeLocator = row.locator("xpath=.//td[2]");
        const typeText = await typeLocator.textContent();

        // Check if the text matches the expected item to delete
        if (typeText?.trim() === this.itemToCheck) {
            await this.deleteProcess(row);
            break;
        }
    }
}

private async deleteProcess(delRow: Locator) {
    await this.page.waitForLoadState("load");
    // Hover over the row to reveal the delete button
    await delRow.hover();

    // Click the delete button (assuming it's in the 6th column, as per your code)
    const deleteButton = delRow.locator("xpath=.//td[6]//a[2]//i");
    await deleteButton.waitFor({ state: "visible" });
    await deleteButton.click();

    // Confirm the deletion by clicking the delete confirmation button
    const confirmDelete = this.page.locator(`xpath=${pageLocators.appt_type_delete}`);
    await confirmDelete.waitFor({ state: "visible" });
    await confirmDelete.click();

    // console.log("✅ Appointment type deleted successfully.");
    }


    async open_settings_page(){
        await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState("load");

        await this.page.waitForSelector(`xpath=${commonLocators.top_right_profile_dd}`);
        await this.page.locator(`xpath=${commonLocators.top_right_profile_dd}`).click();

        await this.page.locator(`xpath=${commonLocators.setting_link}`).click();
    }

    async click_other_clinics_setting(){
        await this.page.waitForLoadState("load");
        await this.page.waitForSelector(`xpath=${pageLocators.other_clinic_can_remove_me}`);
        await this.page.locator(`xpath=${pageLocators.other_clinic_can_remove_me}`).click();
       
    }

    async click_most_recently_accessed_setting(){
        await this.page.waitForLoadState("load");
        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector(`xpath=${pageLocators.most_recently_accessed_setting}`);
        await this.page.locator(`xpath=${pageLocators.most_recently_accessed_setting}`).click();
        await this.page.reload();
        await this.page.waitForLoadState("load");
    }
}