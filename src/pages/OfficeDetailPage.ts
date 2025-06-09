import { Page, expect } from "@playwright/test";
import * as pageLocators from '../helper/locators/office_details.json';
import * as commonLocators from '../helper/locators/common_locators.json';
import * as testData from '../helper/data/test.json';
import { faker } from "@faker-js/faker"; // ✅ Using Faker.js for random data
import fs from "fs";
import path from "path";
import TestDataUpdater from "../helper/data/testDataUpdater";
import Assert from "../helper/wrapper/assert";

export default class OfficeDetailPage {
   
    private page: Page;
    private officeDataFilePath ="src/helper/data/office_data.json";
    constructor(page: Page) {
        this.page = page;
    }

    async capture_provider_details_BT() {
        try {
            await this.page.waitForLoadState("load");
            // console.log("📌 Office Details: Starting to capture provider details...");
    
            // Capture provider details
            const pro_BT_total_case = parseInt(await this.page.locator(`xpath=${pageLocators.provider_total_case}`).textContent() || "0");
            const pro_BT_open_case = parseInt(await this.page.locator(`xpath=${pageLocators.provider_open_case}`).textContent() || "0");
            const pro_BT_money_paid = this.convertAmount(await this.page.locator(`xpath=${pageLocators.provider_money_paid}`).textContent() || "0");
            const pro_BT_case_referred = parseInt(await this.page.locator(`xpath=${pageLocators.provider_case_referred}`).textContent() || "0");
            const pro_BT_case_returned = parseInt(await this.page.locator(`xpath=${pageLocators.provider_case_returned}`).textContent() || "0");
    
            console.log(`✅ Captured Provider Details: 
                Total Cases: ${pro_BT_total_case},
                Open Cases: ${pro_BT_open_case},
                Money Paid: ${pro_BT_money_paid},
                Cases Referred: ${pro_BT_case_referred},
                Cases Returned: ${pro_BT_case_returned}`);
    
            // Store data for later comparison
            const providerData = {
                pro_BT_total_case,
                pro_BT_open_case,
                pro_BT_money_paid,
                pro_BT_case_referred,
                pro_BT_case_returned,
            };
    
            // Save data to a JSON file instead of properties file
            fs.writeFileSync("src/helper/data/office_data.json", JSON.stringify(providerData, null, 2));
            
            // console.log("✅ Office Details: Data saved successfully in Office_Data.json");
    
        } catch (error) {
            console.error("❌ Office Details: Problem in capturing provider details", error);
            throw new Error("Failed to capture provider details");
        }
    }
    
    // // Helper method for converting amount formats
    // convertAmount(amountText: string): string {
    //     return amountText.replace(/[^0-9.]/g, ""); // Removes currency symbols, commas, etc.
    // }

    async capture_attorney_details_BT() {

        try {
            await this.page.waitForLoadState("load");
            // console.log("🔹 Office Details: Starting to capture attorney details...");

            // Capturing attorney details
            const att_BT_total_case = parseInt(await this.page.locator(`xpath=${pageLocators.attorney_total_cases}`).textContent() || "0");
            const att_BT_open_case = parseInt(await this.page.locator(`xpath=${pageLocators.attorney_open_cases}`).textContent() || "0");
            const att_BT_money_received = this.convertAmount(await this.page.locator(`xpath=${pageLocators.attorney_money_received}`).textContent() || "0");
            const att_BT_case_referred = parseInt(await this.page.locator(`xpath=${pageLocators.attorney_case_referred}`).textContent() || "0");
            const att_BT_case_returned = parseInt(await this.page.locator(`xpath=${pageLocators.attorney_case_returned}`).textContent() || "0");

            // console.log("✅ Office Details Captured for Attorney Office");

            // Storing data in an object
            const officeData = {
                att_BT_total_case,
                att_BT_open_case,
                att_BT_money_received,
                att_BT_case_referred,
                att_BT_case_returned
            };

            // Saving the data to a JSON file
            this.storeOfficeData(officeData);
        } catch (error) {
            console.error("❌ Office Details: Problem in capturing attorney details", error);
            throw new Error("Failed to capture attorney details");
        }
    }

    private convertAmount(amountText: string): number {
        return parseFloat(amountText.replace(/[^0-9.]/g, "")); // Removes non-numeric characters (like $, commas)
    }

    private storeOfficeData(data: Record<string, any>) {
        try {
            fs.writeFileSync("src/helper/data/office_data.json", JSON.stringify(data, null, 2));
            // console.log("✅ Office_Details: Properties saved successfully.");
        } catch (error) {
            console.error("❌ Office_Details: Error saving properties:", error);
        }

    }

    async capture_provider_details_AT() {
        try {
            await this.page.waitForLoadState("load");
            // console.log("🔹 Office Details: Starting to capture provider details...");

            // Capturing provider details
            const pro_AT_total_case = parseInt(await this.page.locator(`xpath=${pageLocators.provider_total_case}`).textContent() || "0");
            const pro_AT_open_case = parseInt(await this.page.locator(`xpath=${pageLocators.provider_open_case}`).textContent() || "0");
            const pro_AT_money_paid = this.convertAmount(await this.page.locator(`xpath=${pageLocators.provider_money_paid}`).textContent() || "0");
            const pro_AT_case_referred = parseInt(await this.page.locator(`xpath=${pageLocators.provider_case_referred}`).textContent() || "0");
            const pro_AT_case_returned = parseInt(await this.page.locator(`xpath=${pageLocators.provider_case_returned}`).textContent() || "0");

            // console.log("✅ Office Details Captured for Provider Office");

            // Storing data in an object
            const officeData = {
                pro_AT_total_case,
                pro_AT_open_case,
                pro_AT_money_paid,
                pro_AT_case_referred,
                pro_AT_case_returned
            };

            // Saving the data to a JSON file
            this.storeOfficeData(officeData);
        } catch (error) {
            console.error("❌ Office Details: Problem in capturing provider details", error);
            throw new Error("Failed to capture provider details");
        }
    }

    async capture_attorney_details_AT() {
        try {
            await this.page.waitForLoadState("load");
            // console.log("🔹 Office Details: Starting to capture attorney details...");

            // Capturing attorney details
            const att_AT_total_case = parseInt(await this.page.locator(`xpath=${pageLocators.attorney_total_cases}`).textContent() || "0");
            const att_AT_open_case = parseInt(await this.page.locator(`xpath=${pageLocators.attorney_open_cases}`).textContent() || "0");
            const att_AT_money_received = this.convertAmount(await this.page.locator(`xpath=${pageLocators.attorney_money_received}`).textContent() || "0");
            const att_AT_case_referred = parseInt(await this.page.locator(`xpath=${pageLocators.attorney_case_referred}`).textContent() || "0");
            const att_AT_case_returned = parseInt(await this.page.locator(`xpath=${pageLocators.attorney_case_returned}`).textContent() || "0");

            // console.log("✅ Office Details Captured for Attorney Office");

            // Storing data in an object
            const officeData = {
                att_AT_total_case,
                att_AT_open_case,
                att_AT_money_received,
                att_AT_case_referred,
                att_AT_case_returned
            };

            // Saving the data to a JSON file
            this.storeOfficeData(officeData);
        } catch (error) {
            console.error("❌ Office Details: Problem in capturing attorney details", error);
            throw new Error("Failed to capture attorney details");
        }
    }

    async compare_office_details() {
        try {
            // Load the stored office details from JSON
            const officeData = this.loadOfficeData();

            if (!officeData) {
                console.error("❌ Office Details: No office data found for comparison!");
                return;
            }

            // Perform comparisons and log results
            this.compareValues(
                officeData.pro_AT_total_case, 
                officeData.pro_BT_total_case, 
                "Provider Total Case"
            );

            this.compareValues(
                officeData.pro_AT_open_case, 
                officeData.pro_BT_open_case, 
                "Provider Open Case"
            );

            this.compareValues(
                officeData.pro_AT_case_returned, 
                officeData.pro_BT_case_returned, 
                "Provider Case Returned"
            );

            this.compareValues(
                officeData.att_AT_open_case, 
                officeData.att_BT_open_case, 
                "Attorney Open Case"
            );

            this.compareValues(
                officeData.att_AT_total_case, 
                officeData.att_BT_total_case, 
                "Attorney Total Case"
            );

            this.compareValues(
                officeData.att_AT_case_referred, 
                officeData.att_BT_case_referred, 
                "Attorney Case Referred"
            );

        } catch (error) {
            console.error("❌ Office Details: Error while comparing office details", error);
        }
    }

    private loadOfficeData(): any {
        try {
            if (fs.existsSync(this.officeDataFilePath)) {
                const data = JSON.parse(fs.readFileSync(this.officeDataFilePath, "utf-8"));
                // console.log("✅ Office Details: Loaded office data for comparison.");
                return data;
            } else {
                console.error("❌ Office Details: Office data file not found.");
                return null;
            }
        } catch (error) {
            console.error("❌ Office Details: Failed to read office data file.", error);
            return null;
        }
    }

    private compareValues(newValue: number, oldValue: number, fieldName: string) {
        if ((newValue - oldValue) === 1) {
            console.log(`✅ Office Details: ${fieldName} Comparison CORRECT`);
        } else {
            throw new Error(`❌ Office Details: ${fieldName} Comparison INCORRECT`);
            console.error(`❌ Office Details: ${fieldName} Comparison INCORRECT`);
        }
    }
}