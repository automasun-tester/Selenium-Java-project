import { Page, expect } from "@playwright/test";
import * as testData from '../helper/data/test.json';
import * as pageLocators from '../helper/locators/create_case.json';
import { faker } from "@faker-js/faker"; // ✅ Using Faker.js for random data
import fs from "fs";

export default class EditCasePage {
   
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async delete_the_case() {  
    await this.page.waitForLoadState("load");
    await this.page.click(`xpath=${pageLocators.delete_case}`);
    await this.page.click(`xpath=${pageLocators.delete_confirmation}`);
    await this.page.waitForTimeout(3000);
    }

    async delete_the_case_from_group_login() {
        // console.log("🔹 Initiating case deletion...");
        await this.page.waitForLoadState("load");
        // Click on the delete button
        await this.page.waitForSelector(`xpath=${pageLocators.delete_case_pg}`);
        await this.page.click(`xpath=${pageLocators.delete_case_pg}`);
        // console.log("✅ Delete button clicked");

        // Confirm deletion in the popup
        await this.page.waitForSelector(`xpath=${pageLocators.delete_confirmation}`);
        await this.page.click(`xpath=${pageLocators.delete_confirmation}`);
        // console.log("✅ Deletion confirmed");
        await this.page.waitForTimeout(3000);
    }


    async editing_case_details() {
        await this.page.waitForLoadState("load");
         // Retrieve gender from test data
         const gender = testData.gender?.toLowerCase();

         if (!gender) {
             console.error("❌ Gender property not found in test data.");
             return;
         }
 
         // Select the appropriate radio button based on gender
         if (gender === "male") {
             await this.page.locator(`xpath=${pageLocators.radio_male}`).click();
            //  console.log("✅ Selected Male gender.");
         } else {
             await this.page.locator(`xpath=${pageLocators.radio_female}`).click();
            //  console.log("✅ Selected Female gender.");
         }
 
         // Click submit button
         await this.page.locator(`xpath=${pageLocators.submit_xpath}`).click();
        //  console.log("✅ Case details updated successfully.");

         await this.page.locator(`xpath=${pageLocators.edit_confirmation}`).click();


    }
}