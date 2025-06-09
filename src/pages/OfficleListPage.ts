import { Page, expect } from "@playwright/test";
import * as pageLocators from '../helper/locators/office_list.json';
import * as commonLocators from '../helper/locators/common_locators.json';
import * as testData from '../helper/data/test.json';
import { faker } from "@faker-js/faker"; // ✅ Using Faker.js for random data
import fs from "fs";
import path from "path";
import TestDataUpdater from "../helper/data/testDataUpdater";

export default class OfficeListPage {
   
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async Open_officelist() {
        await this.page.waitForLoadState('load');
        await this.page.waitForSelector(commonLocators.office_tab_button);
        await this.page.click(commonLocators.office_tab_button);
    }

    async superadmin_create_office_button() {
        try {
            await this.page.waitForLoadState("load");
            const createOfficeButton = this.page.locator(`xpath=${pageLocators.create_office_button}`);

            // Wait until the button is visible & clickable
            await createOfficeButton.waitFor({ state: "visible" });
            await createOfficeButton.click();

            console.log("✅ Office List: SuperAdmin clicked 'Create Office' button.");
        } catch (error) {
            console.error("❌ Office List: SuperAdmin could not click 'Create Office' button.");
            throw new Error("Failed to click Create Office button");
    }}
    

    async open_inactive_list() {
        try {
            await this.page.waitForLoadState("load");
            // Click the "Inactive Office" button
            await this.page.waitForSelector(pageLocators.inactive_button);
            await this.page.locator(`xpath=${pageLocators.inactive_button}`).click();
            console.log("✅ Office List: Inactive Office List Button clicked successfully.");
        } catch (error) {
            console.error("❌ Office List: Failed to click Inactive Office Button.");
            throw new Error("Inactive Office Button click failed.");
        }
    }


    async search_inactive_provider() {
        try {
            await this.page.waitForLoadState("load");
            console.log("🔍 Searching for inactive provider...");

            const freshData = TestDataUpdater.getTestData();
            console.log("🔹 Using Fresh Test Data:", freshData);

            // Click on the inactive provider tab
            await this.page.waitForSelector(pageLocators.inactive_provider_tab);
            await this.page.locator(`xpath=${pageLocators.inactive_provider_tab}`).click();
            console.log("✅ Clicked on the Inactive Provider Tab.");

            // Click on the search field and enter the provider's office name
            const searchInput = this.page.locator(`xpath=${pageLocators.inactive_provider_search}`);
            await searchInput.click();
            await searchInput.fill(freshData.create_office_name_provider);
            console.log(`✅ Entered search query: ${freshData.create_office_name_provider}`);

            // Wait for search results to update
            await this.page.waitForTimeout(1000);

            // Validate that the first provider in the list matches the searched provider name
            const firstProviderElement = this.page.locator(`xpath=${pageLocators.inactive_provider_table_firstname}`);
            await expect(firstProviderElement).toContainText(freshData.create_office_name_provider);

            console.log(`✅ Search Successful: Found '${await firstProviderElement.textContent()}' in the inactive provider list.`);

        } catch (error) {
            console.error("❌ Office List: Inactive Provider Search Unsuccessful.");
            throw new Error("Inactive Provider Search Failed.");
        }
    }

    async edit_inactive_provider() {
        await this.page.waitForLoadState("load");
        await this.page.waitForSelector(pageLocators.inactive_provider_edit);
        await this.page.click(pageLocators.inactive_provider_edit);
    }

    async edit_active_provider() {
        await this.page.waitForLoadState("load");
        await this.page.waitForSelector(pageLocators.active_provider_edit);
        await this.page.click(pageLocators.active_provider_edit);
    }

    async edit_active_attorney() {
        await this.page.waitForLoadState("load");
        await this.page.waitForSelector(pageLocators.active_attorney_edit);
        await this.page.click(pageLocators.active_attorney_edit);
    }

    async validating_provider_activation() {
        console.log("🔹 Navigating to Active Provider Tab...");
        await this.page.waitForLoadState("load");
        await this.page.locator(`xpath=${pageLocators.active_provider_tab}`).click();

        const freshData = TestDataUpdater.getTestData();
        console.log("🔹 Using Fresh Test Data:", freshData);

        console.log("🔹 Searching for Activated Provider...");
        const searchBox = this.page.locator(`xpath=${pageLocators.active_provider_search}`);
        await searchBox.click();
        await searchBox.fill(freshData.create_office_name_provider);

        // Wait for the table to reflect the search result
        await this.page.waitForTimeout(1000); // Small wait to ensure search loads results

        const providerName = this.page.locator(`xpath=${pageLocators.active_provider_table_firstname}`);
        await expect(providerName).toHaveText(freshData.create_office_name_provider, { timeout: 5000 });

        console.log(`✅ Provider "${freshData.create_office_name_provider}" successfully found in Active Provider List.`);
    }

    async search_inactive_attorney() {

        const freshData = TestDataUpdater.getTestData();
        await this.page.waitForLoadState("load");
        console.log("🔹 Using Fresh Test Data:", freshData);

        console.log("🔹 Searching for an inactive attorney...");
        
        // Click on the inactive attorney tab
        await this.page.locator(`xpath=${pageLocators.inactive_attorney_tab}`).waitFor({ state: "visible" });
        await this.page.locator(`xpath=${pageLocators.inactive_attorney_tab}`).click();

        // Click on the search bar and enter the attorney's name
        const searchBox = this.page.locator(`xpath=${pageLocators.inactive_attorney_search}`);
        await searchBox.waitFor({ state: "visible" });
        await searchBox.click();
        await searchBox.fill(freshData.create_office_name_attorney);

        // **Wait for search results to update**
        await this.page.waitForTimeout(1000);
        const resultLocator = this.page.locator(`xpath=${pageLocators.inactive_attorney_table_firstname}`);

        // **Validation: Check if search results contain the attorney's name**
        const resultText = await resultLocator.textContent();
        if (resultText?.includes(freshData.create_office_name_attorney)) {
            console.log(`✅ Inactive Attorney '${freshData.create_office_name_attorney}' found.`);
        } else {
            console.error("❌ Inactive Attorney search unsuccessful.");
            throw new Error("Inactive Attorney not found in the search results.");
        }
    }

    async edit_inactive_attorney() {
        await this.page.waitForLoadState("load");
        console.log("🔹 Editing Inactive Attorney...");
        await this.page.locator(`xpath=${pageLocators.inactive_attorney_edit}`).click();
    }

    async validating_attorney_activation() {
        
        const freshData = TestDataUpdater.getTestData();
        console.log("🔹 Using Fresh Test Data:", freshData);

        await this.page.waitForTimeout(5000);
        await this.page.waitForLoadState("load");
        console.log("🔹 Validating Attorney Activation...");

        // Click on the active attorney tab
        await this.page.waitForSelector(pageLocators.active_attorney_tab);
        await this.page.locator(`xpath=${pageLocators.active_attorney_tab}`).click();
        console.log("🔹 clicked the attorney tab");

        // Click on the search bar and enter the attorney's name
        const searchBox = this.page.locator(`xpath=${pageLocators.active_attorney_search}`);
        await searchBox.waitFor({ state: "visible" });
        await searchBox.click();
        await searchBox.fill(freshData.create_office_name_attorney);

        // **Wait for search results to update**
        await this.page.waitForTimeout(1000);
        const resultLocator = this.page.locator(`xpath=${pageLocators.active_attorney_table_firstname}`);

        // **Validation: Check if search results contain the attorney's name**
        const resultText = await resultLocator.textContent();
        if (resultText?.includes(freshData.create_office_name_attorney)) {
            console.log(`✅ Attorney '${freshData.create_office_name_attorney}' is now active.`);
        } else {
            console.error("❌ Attorney activation validation failed.");
            throw new Error("Attorney not found in the active list.");
        }
    }

    async create_office_button() {
        console.log("🔹 Attempting to click the 'Create Office' button...");

        try {
            await this.page.waitForLoadState("load");
            // Click on the "Add Office" dropdown
            const addOfficeDropdown = this.page.locator(`xpath=${pageLocators.add_office_button_dd}`);
            await addOfficeDropdown.waitFor({ state: "visible" });
            await addOfficeDropdown.click();

            // Click on the "Create Office" option
            const createOfficeOption = this.page.locator(`xpath=${pageLocators.create_office_option}`);
            await createOfficeOption.waitFor({ state: "visible" });
            await createOfficeOption.click();

            console.log("✅ Successfully clicked on 'Create Office' option.");
        } catch (error) {
            console.error("❌ Error: Unable to click on 'Create Office' option.");
            throw new Error("Failed to select the create office option.");
        }
    }

    async open_office_request_attorney() {
        console.log("🔹 Attempting to open the Office Request for Attorney...");

        try {
            await this.page.waitForLoadState("load");

            // Click on "Create Office Request"
            const createOfficeRequest = this.page.locator(`xpath=${pageLocators.create_office_request}`);
            await createOfficeRequest.waitFor({ state: "visible" });
            await createOfficeRequest.click();

            // Click on "Attorney Office Request"
            const attorneyOfficeRequest = this.page.locator(`xpath=${pageLocators.attorney_office_request}`);
            await attorneyOfficeRequest.waitFor({ state: "visible" });
            await attorneyOfficeRequest.click();

            console.log("✅ Successfully opened the Office Request for Attorney.");
        } catch (error) {
            console.error("❌ Error: Unable to open the Office Request for Attorney.");
            throw new Error("Failed to open Office Request for Attorney.");
        }
    }

    async search_request_attorney() {
        console.log("🔹 Searching for Office Request for Attorney...");

        const freshData = TestDataUpdater.getTestData();
        console.log("🔹 Using Fresh Test Data:", freshData);
            await this.page.waitForLoadState("load");
        try {
            // Click on the search bar
            const searchBox = this.page.locator(`xpath=${pageLocators.attorney_office_request_search}`);
            await searchBox.waitFor({ state: "visible" });
            await searchBox.click();
            await searchBox.fill(freshData.create_office_name_attorney);

            // Wait for search results to update
            await this.page.waitForTimeout(1000);

            // Validate that the search result contains the expected office name
            const searchResult = this.page.locator(`xpath=${pageLocators.attorney_office_request_name}`);
            await expect(searchResult).toContainText(freshData.create_office_name_attorney);

            console.log("✅ Successfully found the office request for Attorney.");
        } catch (error) {
            console.error("❌ Error: Unable to search office request for Attorney.");
            throw new Error("Failed to search office request for Attorney.");
        }
    }

    async approve_attorney_request() {
        console.log("🔹 Approving Attorney Office Request...");
            await this.page.waitForLoadState("load");
        try {
            // Click the approve button for Attorney's office request
            const approveButton = this.page.locator(`xpath=${pageLocators.attorney_office_request_approve}`);
            await approveButton.waitFor({ state: "visible" });
            await approveButton.click();

            // Confirm approval in the popup
            const confirmApproval = this.page.locator(`xpath=${pageLocators.office_approve_popup_yes}`);
            await confirmApproval.waitFor({ state: "visible" });
            await confirmApproval.click();

            console.log("✅ Successfully approved office request for Attorney.");
        } catch (error) {
            console.error("❌ Error: Unable to approve office request for Attorney.");
            throw new Error("Failed to approve office request for Attorney.");
        }
    }

    async open_office_request_provider() {
        console.log("🔹 Opening Office Request for Provider...");

        try {
            await this.page.waitForLoadState("load");
            // Click on "Create Office Request" button
            const createOfficeRequest = this.page.locator(`xpath=${pageLocators.create_office_request}`);
            await createOfficeRequest.waitFor({ state: "visible" });
            await createOfficeRequest.click();

            // Click on "Provider Office Request" option
            const providerOfficeRequest = this.page.locator(`xpath=${pageLocators.provider_office_request}`);
            await providerOfficeRequest.waitFor({ state: "visible" });
            await providerOfficeRequest.click();

            console.log("✅ Successfully opened office request for Provider.");
        } catch (error) {
            console.error("❌ Error: Unable to open office request for Provider.");
            throw new Error("Failed to open office request for Provider.");
        }
    }

    async search_request_provider() {
        console.log("🔹 Searching for Office Request for Provider...");

        const freshData = TestDataUpdater.getTestData();
        console.log("🔹 Using Fresh Test Data:", freshData);
            await this.page.waitForLoadState("load");
        try {
            // Click on the search input field
            const providerSearch = this.page.locator(`xpath=${pageLocators.provider_office_request_search}`);
            await providerSearch.waitFor({ state: "visible" });
            await providerSearch.click();

            // Enter provider office name in search field
            await providerSearch.fill(freshData.create_office_name_provider);

            // Wait for search results to populate
            await this.page.waitForTimeout(1000);

            // Validate that the searched provider appears in the list
            const searchResult = this.page.locator(`xpath=${pageLocators.provider_office_request_name}`);
            await searchResult.waitFor({ state: "visible" });

            const foundProvider = await searchResult.textContent();
            if (foundProvider?.includes(freshData.create_office_name_provider)) {
                console.log(`✅ Office List: Successfully found office request for Provider: ${freshData.create_office_name_provider}`);
            } else {
                console.error("❌ Office List: Unable to find office request for Provider.");
                throw new Error("Provider office request not found.");
            }
        } catch (error) {
            console.error("❌ Error: Unable to search office request for Provider.");
            throw new Error("Failed to search office request for Provider.");
        }
    }

     async approve_provider_request() {
        console.log("🔹 Approving Office Request for Provider...");
        await this.page.waitForLoadState("load");
        try {
            // Click on the Approve button for provider office request
            const approveButton = this.page.locator(`xpath=${pageLocators.provider_office_request_approve}`);
            await approveButton.waitFor({ state: "visible" });
            await approveButton.click();

            // Wait for the approval confirmation popup and click "Yes"
            const approvePopup = this.page.locator(`xpath=${pageLocators.office_approve_popup_yes}`);
            await approvePopup.waitFor({ state: "visible" });
            await approvePopup.click();

            console.log("✅ Office List: Successfully approved office request for Provider.");
        } catch (error) {
            console.error("❌ Error: Unable to approve office request for Provider.");
            throw new Error("Failed to approve provider office request.");
        }
     }   

    async reject_attorney_request() {
        console.log("🔹 Rejecting Attorney Office Request...");
            await this.page.waitForLoadState("load");
        try {
            // Click on the Reject button for attorney office request
            const rejectButton = this.page.locator(`xpath=${pageLocators.attorney_office_request_reject}`);
            await rejectButton.waitFor({ state: "visible" });
            await rejectButton.click();

            // Open the rejection reason dropdown
            const rejectReasonDropdown = this.page.locator(`xpath=${pageLocators.request_reject_reason_dd}`);
            await rejectReasonDropdown.waitFor({ state: "visible" });
            await rejectReasonDropdown.click();

            // Select "Other" as the rejection reason
            await this.page.selectOption(`xpath=${pageLocators.request_reject_reason_dd}`, { label: "Other" });

            // Confirm rejection by clicking Yes
            const rejectYesButton = this.page.locator(`xpath=${pageLocators.request_reject_yes}`);
            await rejectYesButton.waitFor({ state: "visible" });
            await rejectYesButton.click();

            // Wait for the confirmation message
            const confirmationHeading = this.page.locator(`xpath=${pageLocators.request_reject_confirmation_heading}`);
            await confirmationHeading.waitFor({ state: "visible" });

            // Click on the final rejection confirmation button
            const confirmationButton = this.page.locator(`xpath=${pageLocators.rejection_confirmation}`);
            await confirmationButton.waitFor({ state: "visible" });
            await confirmationButton.click();

            console.log("✅ Office List: Attorney office request rejected successfully.");
        } catch (error) {
            console.error("❌ Error: Unable to reject attorney office request.");
            throw new Error("Failed to reject attorney office request.");
        }
    }

    async reject_provider_request() {
        console.log("🔹 Rejecting Provider Office Request...");
            await this.page.waitForLoadState("load");
        try {
            // Click on the Reject button for provider office request
            const rejectButton = this.page.locator(`xpath=${pageLocators.provider_office_request_reject}`);
            await rejectButton.waitFor({ state: "visible" });
            await rejectButton.click();

            // Open the rejection reason dropdown
            const rejectReasonDropdown = this.page.locator(`xpath=${pageLocators.request_reject_reason_dd}`);
            await rejectReasonDropdown.waitFor({ state: "visible" });
            await rejectReasonDropdown.click();

            // Select "Other" as the rejection reason
            await this.page.selectOption(`xpath=${pageLocators.request_reject_reason_dd}`, { label: "Other" });

            // Confirm rejection by clicking Yes
            const rejectYesButton = this.page.locator(`xpath=${pageLocators.request_reject_yes}`);
            await rejectYesButton.waitFor({ state: "visible" });
            await rejectYesButton.click();

            // Wait for the confirmation message
            const confirmationHeading = this.page.locator(`xpath=${pageLocators.request_reject_confirmation_heading}`);
            await confirmationHeading.waitFor({ state: "visible" });

            // Click on the final rejection confirmation button
            const confirmationButton = this.page.locator(`xpath=${pageLocators.rejection_confirmation}`);
            await confirmationButton.waitFor({ state: "visible" });
            await confirmationButton.click();

            console.log("✅ Office List: Provider office request rejected successfully.");
        } catch (error) {
            console.error("❌ Error: Unable to reject provider office request.");
            throw new Error("Failed to reject provider office request.");
        }
    }

    async search_active_provider_and_open() {

        await this.page.waitForLoadState("load");
        // Click the "Active Attorneys" tab
    await this.page.locator(`xpath=${pageLocators.active_provider_tab}`).click();

    // Click on the search input field
    const searchBox = this.page.locator(`xpath=${pageLocators.active_provider_search}`);
    await searchBox.click();

    // Type the attorney referral name
    await searchBox.fill(testData.provider_facility_name);

    // Wait for search results to update
    await this.page.waitForTimeout(1000);

    // Locate the first matching attorney name in the table
    const providerNameElement = this.page.locator(`xpath=${pageLocators.active_provider_table_firstname}`);

    // Wait until the search result matches the expected name
    await providerNameElement.waitFor({
        state: "visible",
        timeout: 5000,
    });

    // Verify that the provider exists
    const foundProviderName = await providerNameElement.textContent();
    if (foundProviderName.toLowerCase === testData.attorney_referral_name.toLowerCase) {
        console.log(`✅ Office_list: Active provider '${testData.provider_facility_name}' found.`);
        await providerNameElement.click(); // Click to open the provider details
    } else {
        console.error("❌ Office_list: Active provider search unsuccessful.");
        throw new Error("Active provider search failed.");
    }
    }
    

    async search_active_attorney_and_open() {
        try {
            await this.page.waitForLoadState("load");
            // Click on Active Attorney Tab
            await this.page.locator(`xpath=${pageLocators.active_attorney_tab}`).click();
    
            // Click on the search bar and enter the attorney's name
            const searchBox = this.page.locator(`xpath=${pageLocators.active_attorney_search}`);
            await searchBox.click();
            await searchBox.fill(testData.attorney_referral_name);
    
            // Wait for the search results to load
            await this.page.waitForTimeout(1000);
    
            // Verify if attorney exists in the search result
            const attorneyNameLocator = this.page.locator(`xpath=${pageLocators.active_attorney_table_firstname}`);
            const attorneyNameText = await attorneyNameLocator.textContent();
    
            if (attorneyNameText && attorneyNameText.includes(testData.attorney_referral_name)) {
                console.log(`✅ Office_list: Active Attorney Search Successful - ${testData.attorney_referral_name}`);
    
                // Click to open the attorney details
                await attorneyNameLocator.click();
            } else {
                console.error(`❌ Office_list: Active Attorney Search Unsuccessful - ${testData.attorney_referral_name} not found.`);
                throw new Error("Active Attorney Search Failed");
            }
        } catch (error) {
            console.error("❌ Error in searchActiveAttorneyAndOpen:", error);
            throw new Error("Failed to search and open Active Attorney");
        }
    }

}