import { Page, expect } from "@playwright/test";
import * as commonLocators from '../helper/locators/common_locators.json';   
import * as pageLocators from '../helper/locators/bills_record_requested.json';
import * as testData from '../helper/data/test.json';
import { faker } from "@faker-js/faker"; // ✅ Using Faker.js for random data
import fs from "fs";
import TestDataUpdater from "../helper/data/testDataUpdater";

export default class BillsRecordsRequestedPage {
   
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToBillsRecordsTab() {
        await this.page.waitForLoadState("load");
        await this.page.click(commonLocators.bills_rec_req_tab);
    }

    async searchRequestRecordsCase() {
        // console.log("🔹 Searching for request records case...");

        const freshData = TestDataUpdater.getTestData();
        //  console.log("🔹 Using Fresh Test Data:");
         await this.page.waitForLoadState("load");
        // Wait for the search bar to be visible and click on it
        await this.page.waitForSelector(`xpath=${pageLocators.br_search}`);
        await this.page.click(`xpath=${pageLocators.br_search}`);
        // console.log("✅ Clicked on search bar");

        // Get the case name from test data
        const searchValue = freshData.create_case_first_name+' '+freshData.create_case_last_name;

        // Type the case name into the search bar
        await this.page.fill(`xpath=${pageLocators.br_search}`, searchValue);
        // console.log(`✅ Entered case name: '${searchValue}'`);

        // Wait until the case name appears in search results
        await expect(this.page.locator(`xpath=${pageLocators.br_case_name}`)).toContainText(searchValue,{timeout: 1500});

        // console.log("✅ Case name found in search results");
    }

    async checkRequestBillsRecords() {
        // console.log("🔹 Verifying searched case name in request records...");

        const freshData = TestDataUpdater.getTestData();
        //  console.log("🔹 Using Fresh Test Data:");
         await this.page.waitForLoadState("load");
        // Get the case name from the UI
        const caseName = await this.page.textContent(`xpath=${pageLocators.br_case_name}`);
        const searchedName = freshData.create_case_first_name;

        if (caseName?.trim().includes(searchedName.trim())) {
            console.log(`✅ Search successful: Case name '${caseName.trim()}' contains the searched name '${searchedName}'.`);
        } else {
            console.error(`❌ Search failed: Case name '${caseName?.trim()}' does not contain the searched name '${searchedName}'.`);
            throw new Error("Search failed: Case name mismatch.");
        }
    }

    async openRequestedRecordsCase() {
    //     console.log("🔹 Opening requested records case...");

    //     // Wait for the case name link to be visible
    //     await this.page.waitForSelector(`xpath=${pageLocators.br_case_name}`);

    //     // Remove 'target' attribute to prevent opening in a new tab
    //     await this.page.evaluateHandle((selector) => {
    //         const link = document.querySelector(selector) as HTMLAnchorElement;
    //         if (link) {
    //             link.removeAttribute("target");
    //         }
    //     }, pageLocators.br_case_name);
    //     console.log("✅ Removed 'target' attribute (if existed)");
        
    //     // Click the case name link
    //     await this.page.click(`xpath=${pageLocators.br_case_name}`);
    //     console.log("✅ Clicked on the case name link");
    await this.page.waitForLoadState("load");
    const linkLocator = this.page.locator(pageLocators.br_case_name);
    await linkLocator.evaluate((link) => link.removeAttribute("target"));
    await linkLocator.click();

    }

    async verifyCountOfBillsAndRecordsRequested(){
        await this.page.waitForLoadState("load");

                // Step 1: Get column index of "Records Request Count"
        const headers = await this.page.$$(`xpath=${pageLocators.br_table_header}`);
        let colIndex = -1;

        for (let i = 0; i < headers.length; i++) {
        const headerText = await headers[i].textContent();
        if (headerText?.trim() === 'Records Request Count') {
            colIndex = i + 1; // XPath is 1-based index
            break;
        }
        }

        if (colIndex === -1) throw new Error("Header 'Records Request Count' not found");

        const cellsLocator = this.page.locator(`${pageLocators.br_request_count}//td[${colIndex}]`);
        const values = await cellsLocator.allTextContents();
    

        // Optional: Validate or log the values
        console.log('Records Request Count Column Values:', values);

        expect(values).toContain('2');

    }

    async verifyNoDuplicateRowsAppear(){
        await this.page.waitForLoadState("load");

        const count = await this.page.locator(pageLocators.br_request_count_duplicate_check).count();
        expect(count).toBeLessThanOrEqual(1);

    }

}