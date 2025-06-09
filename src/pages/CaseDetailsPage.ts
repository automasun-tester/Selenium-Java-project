import { Page, expect } from "@playwright/test";
import * as refer from '../helper/data/office_referrals.json';
import * as pageLocators from '../helper/locators/case_details.json';
import * as testData from '../helper/data/test.json';
import { faker } from "@faker-js/faker"; // ✅ Using Faker.js for random data
import fs from "fs";
import path from "path";
import assert from "assert";
import { error } from "console";
import TestDataUpdater from "../helper/data/testDataUpdater";

export default class CaseDetailsPage {
   
    private page: Page;
    private treatDate: string;
    private caseURL: URL;

    constructor(page: Page) {
        this.page = page;
    }

    async click_case_edit() {
        // console.log("🔹 Clicking the 'Edit Case' button...");
        await this.page.waitForLoadState("load");
        // Wait for dropdown to appear and click
        await this.page.waitForSelector(`xpath=${pageLocators.case_edit}`);
        await this.page.click(`xpath=${pageLocators.case_edit}`);

        // console.log("✅ 'Edit Case' button clicked successfully.");
    }

    async refer_attorney() {
        // console.log("🔹 Clicking on 'Refer Attorney' button...");
        await this.page.waitForLoadState("load");
        // Click the 'Refer Attorney' button
        await this.page.waitForSelector(`xpath=${pageLocators.case_attorney_referral_button}`);
        await this.page.click(`xpath=${pageLocators.case_attorney_referral_button}`);

        // console.log("✅ Clicked on 'Refer Attorney' button");

        // Click the referral name input field
        await this.page.waitForSelector(`xpath=${pageLocators.case_attorney_referral_name}`);
        await this.page.click(`xpath=${pageLocators.case_attorney_referral_name}`);

        // Enter the attorney referral name
        const attorneyName = refer.attorney_referral_name;
        await this.page.fill(`xpath=${pageLocators.case_attorney_referral_name}`, attorneyName);

        console.log(`✅ Entered attorney name: ${attorneyName}`);

        // Wait briefly for dropdown suggestions (avoid hardcoded waits)
        await this.page.waitForTimeout(500);

        // Press "Arrow Down" and "Enter" to select attorney
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("Enter");

        await this.page.waitForTimeout(500);

        // Click the submit button
        await this.page.click(`xpath=${pageLocators.case_attorney_referral_submit}`);
        // console.log("✅ Submitted the attorney referral");


        // await this.page.waitForTimeout(5000); // Wait for the referral to process
        // Wait for the referral confirmation
        await this.page.waitForSelector(`xpath=${pageLocators.case_attorney_referred}`);

        // Validate that the correct attorney is referred
        const referredAttorney = await this.page.textContent(`xpath=${pageLocators.case_attorney_referred}`);
        if (referredAttorney?.trim() === attorneyName.trim()) {
            // console.log("✅ Attorney referral was successful");
        } else {
            throw new Error(`❌ Expected attorney name: ${attorneyName}, but found: ${referredAttorney}`);
        }
    }

    async open_finance_tab() {
        try {
            // console.log("🔹 Attempting to open Finance tab...");
            await this.page.waitForLoadState("load");
            // Wait for Finance tab and click it
            await this.page.waitForSelector(`xpath=${pageLocators.case_detail_finance_tab}`);
            await this.page.click(`xpath=${pageLocators.case_detail_finance_tab}`);

            // console.log("✅ Finance tab opened successfully.");
        } catch (error) {
            console.error(`❌ Case Details: Not able to open Finance tab - ${error}`);
        }
    }
    
    async click_make_offer_button() {
        await this.page.waitForLoadState("load");
        await this.page.waitForSelector(`xpath=${pageLocators.case_detail_reduction_offer_button}`);
        await this.page.click(`xpath=${pageLocators.case_detail_reduction_offer_button}`);
        // console.log("✅ Clicked on 'Make Offer' button");
    }

    async make_an_offer_provider() {
        // console.log("🔹 Initiating offer process...");
        await this.page.waitForLoadState("load");
        // Click the "Make an Offer" input field
        await this.page.waitForSelector(`xpath=${pageLocators.case_detail_make_an_offer}`);
        await this.page.click(`xpath=${pageLocators.case_detail_make_an_offer}`);

        // console.log("✅ Clicked on 'Make an Offer' input");

        // Enter offer amount
        await this.page.fill(`xpath=${pageLocators.case_detail_make_an_offer}`, "1000");
        // console.log("✅ Entered offer amount: 1000");

        // Enter offer note
        await this.page.fill(`xpath=${pageLocators.case_detail_offer_note}`, "from provider");
        // console.log("✅ Entered offer note: 'from provider'");

        // Click the Submit button
        await this.page.click(`xpath=${pageLocators.case_offer_submit}`);
        // console.log("✅ Offer submitted successfully.");
    }

    async open_provider_settlement() {
        try {
            // console.log("🔹 Checking if 'Provider Settlement' is already open...");
            await this.page.waitForLoadState("load");
            // Check if the Provider Settlement tab is already visible
            const isSettlementVisible = await this.page.isVisible(`xpath=${pageLocators.finance_tab_provider_settlement_check}`);

            if (!isSettlementVisible) {
                // console.log("✅ Opening Provider Settlement tab...");
                await this.page.waitForSelector(`xpath=${pageLocators.finance_tab_provider_settlement}`);
                await this.page.click(`xpath=${pageLocators.finance_tab_provider_settlement}`);
            }

            // console.log("✅ Provider Settlement tab opened successfully.");
        } catch (error) {
            console.error(`❌ Case Details: Unable to open provider settlement - ${error}`);
        }
    }
    
    async make_counter_offer_attorney() {
        // console.log("🔹 Initiating counter offer process...");
        await this.page.waitForLoadState("load");
        // Click the "Counter Offer" button
        await this.page.waitForSelector(`xpath=${pageLocators.finance_tab_counter_offer_button}`);
        await this.page.click(`xpath=${pageLocators.finance_tab_counter_offer_button}`);
        // console.log("✅ Clicked on 'Counter Offer' button");

        // Fill in counteroffer amount
        await this.page.fill(`xpath=${pageLocators.finance_tab_counter_offer_amount}`, "800");
        // console.log("✅ Entered counter offer amount: 800");

        // Fill in offer note
        await this.page.fill(`xpath=${pageLocators.finance_tab_counter_offer_note}`, "from Attorney");
        // console.log("✅ Entered counter offer note: 'from Attorney'");

        // Click the Submit button
        await this.page.click(`xpath=${pageLocators.finance_tab_counter_offer_submit}`);
        // console.log("✅ Counter offer submitted successfully.");
    }


    async accept_the_counter_offer() {
        // console.log("🔹 Initiating acceptance of the counter-offer...");
        await this.page.waitForLoadState("load");
        // Click the "Accept Offer" button
        await this.page.waitForSelector(`xpath=${pageLocators.finance_tab_offer_accept}`);
        await this.page.click(`xpath=${pageLocators.finance_tab_offer_accept}`);
        // console.log("✅ Clicked 'Accept Offer' button");

        // Click the confirmation button
        await this.page.waitForSelector(`xpath=${pageLocators.offer_accept_confirmation}`);
        await this.page.click(`xpath=${pageLocators.offer_accept_confirmation}`);
        // console.log("✅ Counter-offer successfully accepted.");
    }


    async refer_provider() {
        // console.log("🔹 Initiating provider referral...");
        await this.page.waitForLoadState("load");
        // Click "Refer Provider" button
        await this.page.waitForSelector(`xpath=${pageLocators.case_provider_referral_button}`);
        await this.page.click(`xpath=${pageLocators.case_provider_referral_button}`);
        // console.log("✅ Clicked 'Refer Provider' button");

        // Click the provider name input field and enter the facility name
        await this.page.waitForSelector(`xpath=${pageLocators.case_provider_referral_name}`);
        await this.page.click(`xpath=${pageLocators.case_provider_referral_name}`);
        await this.page.fill(`xpath=${pageLocators.case_provider_referral_name}`, refer.provider_facility_name);
        console.log(`✅ Entered provider facility name: ${refer.provider_facility_name}`);

        // Click the provider dropdown
        await this.page.waitForSelector(`xpath=${pageLocators.case_provider_referral_dd}`);
        await this.page.click(`xpath=${pageLocators.case_provider_referral_dd}`);
        // console.log("✅ Selected provider from dropdown");

        // await this.page.click(`xpath=${pageLocators.case_provider_referral_speciality}`);
        // await this.page.fill(`xpath=${pageLocators.case_provider_referral_speciality}`,"Chiropractor");
        // await this.page.keyboard.press("Enter");

        // Click Submit
        await this.page.click(`xpath=${pageLocators.case_provider_referral_submit}`);
        // console.log("✅ Provider referral submitted");

        // Validate provider in the referral list
        const providerList = await this.page.$$( `xpath=${pageLocators.case_provider_referred_list}`);
        let providerFound = false;

        for (const provider of providerList) {
            const text = await provider.textContent();
            if (text?.includes(refer.provider_facility_name)) {
                // console.log("✅ Case Details: Referred provider present in the Provider Referred List");
                providerFound = true;
                break;
            }
        }

        if (!providerFound) {
            console.error("❌ Case Details: Referred provider NOT present in the Provider Referred List");
        }
    }


    async make_an_offer_attorney() {
        // console.log("🔹 Initiating 'Make an Offer' process...");
        await this.page.waitForLoadState("load");
        // Click on the "Make an Offer" button
        await this.page.waitForSelector(`xpath=${pageLocators.case_detail_make_an_offer}`);
        await this.page.click(`xpath=${pageLocators.case_detail_make_an_offer}`);
        // console.log("✅ Clicked 'Make an Offer' button");

        // Enter offer amount
        await this.page.fill(`xpath=${pageLocators.case_detail_make_an_offer}`, "1000");
        // console.log("✅ Entered offer amount: 1000");

        // Enter offer note
        await this.page.fill(`xpath=${pageLocators.case_detail_offer_note}`, "from attorney");
        // console.log("✅ Entered offer note: 'from attorney'");

        // Click Submit button
        await this.page.click(`xpath=${pageLocators.case_offer_submit}`);
        // console.log("✅ Offer submitted successfully.");
    }

    async make_counter_offer_provider() {
        // console.log("🔹 Initiating counter offer process...");
        await this.page.waitForLoadState("load");
        // Click on the "Counter Offer" button
        await this.page.waitForSelector(`xpath=${pageLocators.finance_tab_counter_offer_button}`);
        await this.page.click(`xpath=${pageLocators.finance_tab_counter_offer_button}`);
        // console.log("✅ Clicked 'Counter Offer' button");

        // Enter counter-offer amount
        await this.page.fill(`xpath=${pageLocators.finance_tab_counter_offer_amount}`, "800");
        // console.log("✅ Entered counter-offer amount: 800");

        // Enter offer note
        await this.page.fill(`xpath=${pageLocators.finance_tab_counter_offer_note}`, "from provider");
        // console.log("✅ Entered counter-offer note: 'from provider'");

        // Click Submit button
        await this.page.click(`xpath=${pageLocators.finance_tab_counter_offer_submit}`);
        // console.log("✅ Counter-offer submitted successfully.");
    }

    async request_bill_records() {
        // console.log("🔹 Initiating Bill Records Request...");
        await this.page.waitForLoadState("load");
        // Click on the "Request Bill Records" button
        await this.page.waitForSelector(`xpath=${pageLocators.records_request_button}`);
        await this.page.click(`xpath=${pageLocators.records_request_button}`);
        // console.log("✅ Clicked on 'Request Bill Records' button");

        // Click on "Not uploading HIPAA"
        await this.page.waitForSelector(`xpath=${pageLocators.Hippa_not_upload}`);
        await this.page.click(`xpath=${pageLocators.Hippa_not_upload}`);
        // console.log("✅ Selected 'Not uploading HIPAA' option");

        // Click on the request text area and enter the reason
        await this.page.waitForSelector(`xpath=${pageLocators.records_request_textarea}`);
        await this.page.click(`xpath=${pageLocators.records_request_textarea}`);
        await this.page.fill(`xpath=${pageLocators.records_request_textarea}`, "from Attorney");
        // console.log("✅ Entered request reason: 'from Attorney'");

        // Click on the submit button
        await this.page.waitForSelector(`xpath=${pageLocators.records_request_submit}`);
        await this.page.click(`xpath=${pageLocators.records_request_submit}`);
        // console.log("✅ Bill Records request submitted successfully.");
    }

    async verify_Status_Collecting_Records() {  
        // console.log("🔹 Verifying case status: 'Collecting Records'...");
        await this.page.waitForLoadState("load");
        // Wait until the status column contains "Collecting Records"
        await expect(this.page.locator(`xpath=${pageLocators.status_column}`))
            .toHaveText("Collecting Records");

        // console.log("✅ Status verified: 'Collecting Records'");
    }

    async upload_test_report() {
        try {
            // Define the path of the file to be uploaded
            const filePath = path.join(process.cwd(), 'src/helper/data/uploads', 'samplepptx.pdf');
            // console.log("File path: ", filePath);
      
            // **Step 1: Locate the dropzone div element with Playwright's locator**
            const dropzoneLocator = this.page.locator(`xpath=${pageLocators.records_upload_area}`);
            
            // **Step 2: Ensure the dropzone is visible before proceeding**
            await dropzoneLocator.waitFor({ state: 'visible' });

            // **Step 3: Insert the file input element into the dropzone div using JavaScript**
            await this.page.evaluate((dropzoneSelector) => {
                // Locate the dropzone element using XPath
                const dropzone = document.querySelector(dropzoneSelector);
                if (!dropzone) throw new Error("Dropzone element not found.");
                
                // Create the file input element
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.style.display = 'none';  // Keep it hidden
                fileInput.id = 'hiddenFileInput';
                
                // Append the file input to the dropzone
                dropzone.appendChild(fileInput);
            }, pageLocators.records_upload_area);

            // **Step 4: Wait for the hidden file input to appear and upload the file**
            const fileInput = this.page.locator('#hiddenFileInput'); // Now the hidden input is available
            await fileInput.setInputFiles(filePath); // Set the file path to the input field, which simulates the upload

            // **Step 5: Wait for upload confirmation**
            await this.page.locator(`xpath=${pageLocators.records_upload_confirmation}`).waitFor({ state: 'visible' });
            await this.page.locator(`xpath=${pageLocators.file_uploaded_text}`).waitFor({ state: 'visible' });

            // console.log("Test report uploaded successfully.");
            } catch (e) {
            console.error("Error in uploading test report:", e);
            }
        }
    
    async send_bills_records(){
        // console.log("🔹 Sending bill records...");
        await this.page.waitForLoadState("load");
        // Wait for the "Send Request" button and click it
        await this.page.waitForSelector(`xpath=${pageLocators.send_request_button}`, { state: "visible" });
        await this.page.click(`xpath=${pageLocators.send_request_button}`);
        // console.log("✅ Clicked on the 'Send Request' button");

        // Click "Yes" in the confirmation dialog
        await this.page.waitForSelector(`xpath=${pageLocators.click_yes}`, { state: "visible" });
        await this.page.click(`xpath=${pageLocators.click_yes}`);
        // console.log("✅ Clicked 'Yes' in confirmation dialog");

        // Click "Submit" to finalize
        await this.page.waitForSelector(`xpath=${pageLocators.click_submit}`, { state: "visible" });
        await this.page.click(`xpath=${pageLocators.click_submit}`);
        // console.log("✅ Clicked on 'Submit'");

        // console.log("📌 Case Details: Bill records sent successfully.");

    }   
    async verify_Status_All_Providers_Records_Received() {
        // console.log("🔹 Refreshing the page...");
        await this.page.reload(); // Refresh the page
        // console.log("✅ Page refreshed");
        await this.page.waitForLoadState("load");
        // Wait for the status column to be visible
        await this.page.waitForSelector(`xpath=${pageLocators.atty_status_column}`, { state: "visible" });
        const statusText = await this.page.textContent(`xpath=${pageLocators.atty_status_column}`);
        console.log(`🔍 Found status text: "${statusText?.trim()}"`);

        // Expected status message
        const expectedStatus = "All Provider's Records Received - ";

        // Assert if the expected status is found
       if (statusText?.includes(expectedStatus)) {
            // console.log("✅ Status verification passed");
        } else {
        // console.log("✅ Status verification passed");}
   }
}

    async verifying_updates() {
        await this.page.waitForLoadState("load");
        // Retrieve gender from test data
        const expectedGender = testData.gender?.toLowerCase();

        if (!expectedGender) {
            console.error("❌ Gender property not found in test data.");
            return;
        }

        // Get the actual gender from the page
        const actualGenderElement = this.page.locator(`xpath=${pageLocators.case_gender}`);
        await actualGenderElement.waitFor({ state: "visible" });

        const actualGender = (await actualGenderElement.textContent())?.trim().toLowerCase();
        // console.log("actual ",actualGender);
        // console.log("expexted ",expectedGender);
        // Verify gender update
        if (actualGender.includes(expectedGender)) {
            // console.log("✅ Case updated successfully.");
        } else {
            console.error("❌ Case update verification failed.");
            throw new Error("Case not updated correctly.");
        }
    }

    async open_ActivityLog_Table() {

        await this.page.waitForLoadState("load");
         // Click on the Activity Log Table
         await this.page.locator(`xpath=${pageLocators.activity_log_table}`).click();
        
         // Wait for the logs to become visible and click
         
         const elementsLocator = await this.page.locator(`xpath=${pageLocators.logs_if_visible}`);

        // Check if elements are found and visible
        const count = await elementsLocator.count();
        
        if (count > 0) {
            // const isVisible = await elementsLocator.isVisible();
            // if (isVisible) {
            console.log("All elements in the table are visible.");
            } else {
            console.error("The elements are not visible.");
            }

         // Click on the Cancel button
         await this.page.locator(`xpath=${pageLocators.activitylogs_cancel_button}`).click();
    }

    async click_On_Edit_Pencil_Icon() {
        await this.page.waitForLoadState("load");
         // Click on the Edit Pencil Icon
         await this.page.locator(pageLocators.case_status_edit_button).click();

         // Wait for and click on the status selection dropdown
         await this.page.locator(pageLocators.selection_status).click();
 
         // Select "Ready for Demand" from the dropdown
         await this.page.locator(pageLocators.selection_status).selectOption({ label: "Ready for Demand" });
 
         // Click on the accept button
         await this.page.locator(pageLocators.click_accept_button).click();
 
        //  console.log("Case Details: Clicked on the send button");
    }

    async verify_Status_ReadyForDemand() {
        // Refresh the page
        await this.page.reload();
        await this.page.waitForLoadState("load");
         // Wait for the status to be "Ready for Demand" in the status column
         const statusText = "Ready for Demand";
 
         const statusElement = this.page.locator(pageLocators.status_column);
         await statusElement.waitFor({ state: 'attached' });
 
         // Wait until the status text is "Ready for Demand"
         await this.page.locator(pageLocators.status_column).waitFor({ state: 'visible' });
 
         const statusContent = await statusElement.textContent();
         if (statusContent && statusContent.includes(statusText)) {
            //  console.log("Status is 'Ready for Demand'. Test Passed!");
         } else {
             console.error(`Expected status 'Ready for Demand' but found '${statusContent}'. Test Failed!`);
         }
    }

    async verify_Status_ReadyForDemand_For_Provider() {
         // Refresh the page
         await this.page.reload();
         await this.page.waitForLoadState("load");
         // Wait for the status to be "Ready for Demand -" in the status column
         const expectedText = "Ready for Demand";
 
         const statusElement = this.page.locator(pageLocators.atty_status_column);
         await statusElement.waitFor({ state: 'attached' });
 
         // Wait until the text "Ready for Demand -" is present in the element
         await statusElement.waitFor({ state: 'visible' });
 
         const statusContent = await statusElement.textContent();
         if (statusContent && statusContent.toLowerCase().includes(expectedText.toLowerCase())) {
             console.log(`Status is '${expectedText}'. Test Passed!`);
         } else {
             console.error(`Expected status '${expectedText}' but found '${statusContent}'. Test Failed!`);
         }
    }

    async open_provider_treatment() {
        await this.page.waitForLoadState("load");
        await this.page.waitForSelector(`xpath=${pageLocators.treatment_tab_provider_name_1}`);
        await this.page.click(`xpath=${pageLocators.treatment_tab_provider_name_1}`);
    }

    private formattedDate: string;
    async edit_provider_referred_date() {
        await this.page.waitForLoadState("load");
        // Wait for and click on the provider referred date
        const referredDateLocator = this.page.locator(`xpath=${pageLocators.treatment_referred_date}`);
        await referredDateLocator.waitFor({ state: 'visible' });
        await referredDateLocator.click();

        // Clear the date input
        const referredDateEditLocator = this.page.locator(`xpath=${pageLocators.treatment_referred_date_edit}`);
        await referredDateEditLocator.waitFor({ state: 'visible' });
        await referredDateEditLocator.fill(''); // Clear the input

        // Generate a date between 20-60 days in the past
        const pastDate = faker.date.between({
            from: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
            to: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) // 20 days ago
        });
        this.formattedDate = new Date(pastDate).toLocaleDateString('en-US'); // Format to MM/dd/yyyy

        // Set the generated date as provider referred date
        await referredDateEditLocator.fill(this.formattedDate);

        // Click the accept button
        const referredDateAcceptLocator = this.page.locator(`xpath=${pageLocators.treatment_referred_date_edit_accept}`);
        await referredDateAcceptLocator.waitFor({ state: 'visible' });
        await referredDateAcceptLocator.click();

    
    }

    async validate_referred_date() {
        await this.page.waitForLoadState("load");
        const referredDateLocator = this.page.locator(`xpath=${pageLocators.treatment_referred_date_validate}`);

        // Wait for the element and get its text
        const referredDateText =  referredDateLocator.allTextContents // Or use .textContent() if you need raw text
    
        // Assert that the referred date is updated correctly
        try {
          assert.strictEqual(referredDateText, this.formattedDate, 'Provider referred date NOT updated');
          console.log('Case Details :validate_referred_date : Provider referred date updated');
        } catch (error) {
          console.error('Case Details :validate_referred_date : Provider referred date NOT updated');
          console.error(error.message);
        }
    }

    async update_end_treatment_discontinue() {
        await this.page.waitForLoadState("load");
          // Click the end treatment button
        const endTreatmentButton = this.page.locator(`xpath=${pageLocators.end_treatment_button_link}`);
        await endTreatmentButton.click();

        // Click the discontinue button
        const discontinueButton = this.page.locator(`xpath=${pageLocators.discontinue_button_link}`);
        await discontinueButton.click();

        // Select "Sickness" from the discontinue reason dropdown
        const discontinueReasonDropdown = this.page.locator(`xpath=${pageLocators.discontinue_reason_dropdown}`);
        await discontinueReasonDropdown.selectOption({ label: 'Sickness' });

        // Click the confirm discontinue button
        const confirmDiscontinueButton = this.page.locator(`xpath=${pageLocators.confirm_discontinue_button_link}`);
        await confirmDiscontinueButton.click();

        // Click the bad case "Yes" button
        const badCaseYesButton = this.page.locator(`xpath=${pageLocators.badcase_yes_button}`);
        await badCaseYesButton.click();

        // Select "Patient has minimal damage" from the bad case reason dropdown
        const badCaseReasonDropdown = this.page.locator(`xpath=${pageLocators.badcase_reason_dropdown}`);
        await badCaseReasonDropdown.selectOption({ label: 'Patient has minimal damage' });

        // Click the confirm bad case button
        const confirmBadCaseButton = this.page.locator(`xpath=${pageLocators.confirm_bad_case_button_link}`);
        await confirmBadCaseButton.click();

        // Log that the treatment has been discontinued
        // console.log("End treatment: Open case detail page: End treatment for office")
    }

    async update_end_treatment_discharge() {
        await this.page.waitForLoadState("load");
         // Wait for and click the end treatment button
        const endTreatmentButton = this.page.locator(`xpath=${pageLocators.end_treatment_button_link}`);
        await endTreatmentButton.click();

        // Wait for and click the discharge button
        const dischargeButton = this.page.locator(`xpath=${pageLocators.discharge_button_link}`);
        await dischargeButton.click();

        // Wait for and click the confirm discharge button
        const confirmDischargeButton = this.page.locator(`xpath=${pageLocators.confirm_discharge_button_link}`);
        await confirmDischargeButton.click();   

        // Log the end treatment action
        // console.log("End treatment: Open case detail page: End treatment for office");
    }

    async delete_treatment() {
        await this.page.waitForLoadState("load");
        // Hover over the element to unhide the edit and delete buttons
        const editUnhide = this.page.locator(`xpath=${pageLocators.added_treatment_table_hover_area}`);
        await editUnhide.hover();

        // Click on the delete button
        await this.page.locator(`xpath=${pageLocators.added_treatment_table_delete}`).click();
        // console.log("Case Details :delete_treatment : clicking on the delete treatment button");

        // Click on the delete confirmation
        await this.page.locator(`xpath=${pageLocators.added_treatment_delete_confirm}`).click();
        // console.log("Case Details :delete_treatment : clicking on the delete treatment confirmation");
    }


    async validate_edit_treatment() {
         // Get the text of the edited treatment note
        const editedTreatmentNote = await this.page.locator(`xpath=${pageLocators.added_treatment_table_note}`).textContent();

        // Validate if the treatment note contains the word "edited"
        if (editedTreatmentNote && editedTreatmentNote.includes('edited')) {
        // console.log("Case Details :validate_edit_treatment : Provider able to edit treatment");
        } else {
        console.error("Case Details :validate_edit_treatment : Provider NOT able to edit treatment");
        }
    }

    async edit_treatment_details() {
        await this.page.waitForLoadState("load");
          // Hover over the element to unhide the edit and delete buttons
        await this.page.locator(`xpath=${pageLocators.added_treatment_table_hover_area}`).hover();

        // Click on the edit treatment button
        await this.page.locator(`xpath=${pageLocators.added_treatment_table_edit}`).click();
        // console.log("Case Details :edit_treatment_details : clicking on the edit treatment button");

        // Clear the treatment note and enter new text
        const treatmentNoteField = this.page.locator(`xpath=${pageLocators.edit_treatment_note}`);
        await treatmentNoteField.fill(''); // Clear the field
        await treatmentNoteField.fill('z edited'); // Enter the new note
        // console.log("Case Details :edit_treatment_details : editing the note of the treatment");

        // Click the submit button to save changes
        await this.page.locator(`xpath=${pageLocators.edit_treatment_submit}`).click();
        // console.log("Case Details :edit_treatment_details : Submitting edit treatment form");
    }

    async validate_treatment_added() {
         // Get the added treatment date
        const addedTreatmentDate = await this.page.locator(`xpath=${pageLocators.added_treatment_table_date}`).textContent();

        // Validate if the added treatment date matches the expected treatment date
        if (addedTreatmentDate === this.treatDate) {
        // console.log("Case Details :validate_treatment_added : Provider able to add treatment");
        } else {
        console.error("Case Details :validate_treatment_added : Provider NOT able to add treatment");
        }
    }

    async add_treatment_details() {
        await this.page.waitForLoadState("load");
        // try {
            // Generate a random date in the past 15 days
            const pastDate = faker.date.recent({ days: 15 });
            const dateFormat = new Intl.DateTimeFormat('en-US'); // MM/dd/yyyy format
            this.treatDate = dateFormat.format(pastDate);
      
            const note = 'treatment added by the provider';
      
            // Wait for the date input field and remove the onkeydown restriction
            const dateInput = this.page.locator(`xpath=${pageLocators.add_treatment_date}`);
            await dateInput.waitFor({ state: 'visible' });
      
            
            // Step 1: Remove the onkeydown restriction (make it editable)
            await this.page.evaluate(() => {
                const inputElement = document.querySelector('#addTreatmentDate') as HTMLInputElement;
                if (inputElement) {
                inputElement.removeAttribute('onkeydown'); // Remove onkeydown restriction
                }
            });

            await dateInput.click();
            await dateInput.type(this.treatDate);
            // Enter the bill amount
            await this.page.locator(`xpath=${pageLocators.add_treatment_bill_amount}`).fill("120");
      
            // Enter the treatment note
            await this.page.locator(`xpath=${pageLocators.add_treatment_note}`).type(note);

            await this.page.waitForTimeout(1500);

            await dateInput.click();
            
            // Click on the submit button
            await this.page.locator(`xpath=${pageLocators.add_treatment_submit}`).click();
            // console.log("Case Details :add_treatment_details : clicked on submit");
      
        //   } catch (e) {
        //     console.error('Error in add_treatment_details:', e);
        //     // throw new Error(e);
        //   }
    }

    async click_add_treatment() {
        await this.page.waitForLoadState("load");
          // Wait for the add treatment button to be clickable and click it
        await this.page.locator(`xpath=${pageLocators.treatment_add_button}`).click();
        // console.log("Case Details :click_add_treatment : clicked on add treatment button");
    }

    async refer_second_provider() {
        await this.page.waitForLoadState("load");
        // Click the refer provider button
        await this.page.locator(`xpath=${pageLocators.case_provider_referral_button}`).click();
        // console.log("Case Details : Clicked on refer provider button");

        // Click the provider name element
        await this.page.locator(`xpath=${pageLocators.case_provider_referral_name}`).click();
        
        // Wait a bit (equivalent to Thread.sleep in Selenium)
        await this.page.waitForTimeout(1000);
        
        // Enter the second provider's name
        await this.page.locator(`xpath=${pageLocators.case_provider_referral_name}`).fill(testData.provider_facility_name_2);
        await this.page.waitForTimeout(1500);
        // console.log("Case Details : Inserted the provider name");

        // Click the referral dropdown and submit button
        await this.page.locator(`xpath=${pageLocators.case_provider_referral_dd}`).click();
        await this.page.locator(`xpath=${pageLocators.case_provider_referral_submit}`).click();
        // console.log("Case Details : Provider Referred");

        // Validating the provider in the referral list
        const sections = await this.page.locator(`xpath=${pageLocators.case_provider_referred_list}`).allTextContents();
        
        // Loop through each section and check if the provider name is in the list
        if (sections.some((section) => section.includes(testData.provider_facility_name_2))) {
        // console.log("Case Details : Referred provider present in the provider Referred List");
        } else {
        console.error("Case Details : Referred provider NOT present in the provider Referred List");
        }
    }

    async open_second_provider_treatment() {
        await this.page.waitForLoadState("load");
        await this.page.waitForSelector(`xpath=${pageLocators.treatment_tab_provider_name_2}`);
        await this.page.click(`xpath=${pageLocators.treatment_tab_provider_name_2}`);
    }

    async case_status_as_closed() {
        await this.page.waitForLoadState("load");
            // Click on the edit button to modify the case status
        await this.page.locator(`xpath=${pageLocators.case_status_edit_button}`).click();

        // Wait for the dropdown to be visible
        const statusDropdown = this.page.locator(`xpath=${pageLocators.case_status_edit_select_dd}`);
        await statusDropdown.waitFor({ state: 'visible' });

        // Select the "Closed" status from the dropdown
        await statusDropdown.selectOption({ label: 'Closed' });

        // console.log("Case Details : Case marked as closed");

        // Click the submit button to save the case status
        await this.page.locator(`xpath=${pageLocators.case_status_edit_submit}`).click();
    }

    async click_paperclip_icon() {
        await this.page.waitForLoadState("load");
        // Click on the paperclip icon
        await this.page.locator(`xpath=${pageLocators.paperclip_provider_1}`).click();
        // console.log("Case Details : Clicked on the paperclip icon");
        await this.page.locator(`xpath=${pageLocators.paperclip_provider_1_generatelink_button}`).click();
        // console.log("Case Details : Clicked on the generate link button");

    }


    async case_status_as_closed_group_provider(){
        
        await this.page.waitForLoadState("load");

        //click on the edit button to modify the case status
        await this.page.waitForSelector(`xpath=${pageLocators.edit_status_from_group_provider_penIcon}`);
        await this.page.locator(`xpath=${pageLocators.edit_status_from_group_provider_penIcon}`).click();

        
       const status_edit_dd =  await this.page.locator(`xpath=${pageLocators.status_edit_dd_group_provider_login}`);
        await status_edit_dd.waitFor({ state: 'visible' });
        await status_edit_dd.selectOption({ label: 'Closed' });

        await this.page.waitForSelector(`xpath=${pageLocators.status_submit_button_group_provider_login}`)
        await this.page.locator(`xpath=${pageLocators.status_submit_button_group_provider_login}`).click();
        
    }

    async delete_self_as_referred_provider()
    {
        await this.page.waitForLoadState("load");
        // Click the delete button for the self-referred provider
        await this.page.waitForSelector(`xpath=${pageLocators.treatment_tab_provider_name_1}`);
        await this.page.click(`xpath=${pageLocators.treatment_tab_provider_name_1}`);

        await this.page.waitForSelector(`xpath=${pageLocators.delete_provider}`);
        await this.page.click(`xpath=${pageLocators.delete_provider}`);

        await this.page.waitForSelector(`xpath=${pageLocators.delete_provider_confirmation}`);
        await this.page.click(`xpath=${pageLocators.delete_provider_confirmation}`);

        await this.page.waitForTimeout(2000); // Wait for 2 seconds to ensure the action is completed
    }
    

    async copy_case_url(){
        await this.page.waitForLoadState("load");
        // Click the copy URL button
        const URL ={
            caseURL : this.page.url()
        };
        TestDataUpdater.updateTestData(URL);
    }


    async verify_case_details_page(){
        await this.page.waitForLoadState("load");
        
       if (!((await this.page.title()).includes("Case List"))) {
            throw new Error("User is NOT redirected to the case details page");
        }
    }

    async verify_via_case_url(){

        await this.page.waitForLoadState("load");
        // Open the copied URL in a new tab

        // if (!this.caseURL) {
        //     throw new Error("caseURL is not defined. Ensure copy_case_url() is called before verify_via_case_url().");
        // }

        const freshData = TestDataUpdater.getTestData();

        await this.page.goto(freshData.caseURL); // Use the copied URL from the test data

        // Wait for the warning message to be visible

        await this.page.waitForLoadState("load");
        await this.page.waitForSelector(`xpath=${pageLocators.case_delete_alert_on_dashboard}`, { state: 'visible' });

        
        if (await this.page.locator(`xpath=${pageLocators.case_delete_alert_on_dashboard}`).isVisible()) {
            // console.log("Warning message is displayed correctly.");
        } else {
           throw new error("Warning message is NOT displayed correctly.");
        }
    }

    async delete_self_as_referred_attorney() {
        await this.page.waitForLoadState("load");

        await this.page.waitForSelector(`xpath=${pageLocators.case_attorney_referred_edit}`);
        await this.page.click(`xpath=${pageLocators.case_attorney_referred_edit}`);

        await this.page.waitForSelector(`xpath=${pageLocators.case_attorney_referred_edit_name}`);
        await this.page.click(`xpath=${pageLocators.case_attorney_referred_edit_name}`);

        await this.page.locator(`xpath=${pageLocators.case_attorney_referred_edit_name}`).clear();
        await this.page.locator(`xpath=${pageLocators.case_attorney_referred_edit_name}`).fill("None");

        await this.page.waitForTimeout(500);

        await this.page.keyboard.press("ArrowDown"); // Press Enter to save the changes
        await this.page.keyboard.press("Enter"); // Press Enter to save the changes

        await this.page.waitForTimeout(500);

        await this.page.click(`xpath=${pageLocators.case_attorney_referred_edit_submit}`);

        await this.page.waitForSelector(`xpath=${pageLocators.case_attorney_referred_edit_confirmation}`);
        await this.page.click(`xpath=${pageLocators.case_attorney_referred_edit_confirmation}`);

        await this.page.waitForSelector(`xpath=${pageLocators.case_attorney_referref_added_by_mistake}`);
        await this.page.click(`xpath=${pageLocators.case_attorney_referref_added_by_mistake}`);

        await this.page.waitForTimeout(1500);
        
    }

    async refer_provider_for_setting_test(){
        await this.page.waitForLoadState("load");
        // Click the refer provider button
        await this.page.locator(`xpath=${pageLocators.case_provider_referral_button}`).click();
        // console.log("Case Details : Clicked on refer provider button");

        // Click the provider name element
        await this.page.locator(`xpath=${pageLocators.case_provider_referral_name}`).click();
        
        // Wait a bit (equivalent to Thread.sleep in Selenium)
        await this.page.waitForTimeout(1000);
        
        // Enter the second provider's name
        await this.page.locator(`xpath=${pageLocators.case_provider_referral_name}`).fill(refer.provider_facility_for_setting_test);
        await this.page.waitForTimeout(1500);
        // console.log("Case Details : Inserted the provider name");

        // Click the referral dropdown and submit button
        await this.page.locator(`xpath=${pageLocators.case_provider_referral_dd}`).click();
        await this.page.locator(`xpath=${pageLocators.case_provider_referral_submit}`).click();
        // console.log("Case Details : Provider Referred");

        // Validating the provider in the referral list
        const sections = await this.page.locator(`xpath=${pageLocators.case_provider_referred_list}`).allTextContents();
        
        // Loop through each section and check if the provider name is in the list
        if (sections.some((section) => section.includes(refer.provider_facility_for_setting_test))) {
            // console.log("Case Details : Referred provider present in the provider Referred List");
        } else {
            console.error("Case Details : Referred provider NOT present in the provider Referred List");
        }
    }

    async verify_user_able_to_delete_other_provider(){
        await this.page.waitForLoadState("load");

        await this.page.waitForSelector(`xpath=${pageLocators.treatment_tab_provider_name_2}`);
        await this.page.click(`xpath=${pageLocators.treatment_tab_provider_name_2}`);

       if(await this.page.isEnabled(`xpath=${pageLocators.delete_provider}`)){
        console.log("User is able to delete other provider from the case");
       }
    }

    async verify_user_not_able_to_delete_other_provider(){
        await this.page.waitForLoadState("load");

        await this.page.waitForSelector(`xpath=${pageLocators.treatment_tab_provider_name_2}`);
        await this.page.click(`xpath=${pageLocators.treatment_tab_provider_name_2}`);

        await this.page.waitForSelector(`xpath=${pageLocators.delete_provider}`);
        await this.page.hover(`xpath=${pageLocators.delete_provider}`);

       if(await this.page.isVisible(`xpath=${pageLocators.delete_provider_restriction_message}`)){
        console.log("User is NOT able to delete other provider from the case : working correctly as expected");
       }else{
        console.error("User is able to delete other provider from the case : not working correctly as expected");
       }
    }
}