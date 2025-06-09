import { Page } from "@playwright/test";
import * as pageLocators from '../helper/locators/edit_office.json';

export default class EditOfficePage {
   
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async activating_office() {
        try {
            await this.page.waitForLoadState("load");
            // console.log("🔹 Activating Office...");
            await this.page.locator(`xpath=${pageLocators.office_active_yes}`).click();
            // console.log("✅ Office Activated Successfully.");
        } catch (error) {
            console.error("❌ Failed to activate the office.");
            throw new Error("Office Activation Failed.");
        }
    }

    // **Deactivating the office**
    async deactivating_office() {
        try {
            await this.page.waitForLoadState("load");
            // console.log("🔹 Deactivating Office...");
            await this.page.locator(`xpath=${pageLocators.office_active_no}`).click();
            // console.log("✅ Office Deactivated Successfully.");
        } catch (error) {
            console.error("❌ Failed to deactivate the office.");
            throw new Error("Office Deactivation Failed.");
        }
    }

    async deleting_office() {
        try {
            await this.page.waitForLoadState("load");
            // console.log("🔹 Deleting Office...");
            await this.page.locator(`xpath=${pageLocators.office_delete}`).click();
            // console.log("✅ Office Deleted Successfully.");
        } catch (error) {
            console.error("❌ Failed to delete the office.");
            throw new Error("Office Deletion Failed.");
        }
    }


    async submit_edit_office() {
        try {
            await this.page.waitForLoadState("load");
            // console.log("🔹 Submitting the Edit Office Form...");
            await this.page.locator(`xpath=${pageLocators.office_edit_submit}`).click();
            // console.log("✅ Edit Office: Clicked on Submit Button");
        } catch (error) {
            console.error("❌ Edit Office: Failed to click Submit Button.");
            throw new Error("Edit Office Submit Button click failed.");
        }
    }
}