import { Page, expect } from "@playwright/test";
import * as testData from '../helper/data/test.json';
import TestDataUpdater from "../helper/data/testDataUpdater"; // Import utility
import * as pageLocators from '../helper/locators/create_case.json';
import { faker } from "@faker-js/faker"; // ✅ Using Faker.js for random data
import fs from "fs";
import { PickleNameFilter } from "@cucumber/cucumber/lib/pickle_filter";

export default class CreateCasePage {
   
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillForm() {
            // Generate case details before filling the form
            const caseDetails = this.generateCaseDetails();
            await this.page.waitForLoadState("load");
            // console.log(`🔹 Filling Case Form with:`, caseDetails);

            const freshData = TestDataUpdater.getTestData();
                    // console.log("🔹 Using Fresh Test Data:", freshData);

            // Wait for first name input to appear and fill it
            await this.page.fill(`xpath=${pageLocators.fname}`, freshData.create_case_first_name);
            await this.page.fill(`xpath=${pageLocators.lname}`, freshData.create_case_last_name);

            // Select dropdown value for state
            await this.page.selectOption(`xpath=${pageLocators.state_xpath}`, { label: freshData.create_case_state });

            // Fill other form fields
            await this.page.fill(`xpath=${pageLocators.DOB_input}`, freshData.create_case_DOB);
            await this.page.keyboard.press("Enter"); // To save the DOB in the form
            await this.page.fill(`xpath=${pageLocators.SSN_input}`, freshData.create_case_SSN);
            await this.page.fill(`xpath=${pageLocators.DOI_input}`, freshData.create_case_DOI);
            await this.page.keyboard.press("Enter"); // To save the DOI in the form

            // if(PickleNameFilter.name.toLocaleLowerCase().includes(" provider ")){
            //     await this.page.click(`xpath=${pageLocators.health_speciality}`);
            //     await this.page.selectOption(`xpath=${pageLocators.health_speciality}`, { label: "Chiropractor" });
            // }

            // Click the submit button
            await this.page.click(`xpath=${pageLocators.submit_xpath}`);

            // Wait for form submission to complete (if needed)
            await this.page.waitForLoadState("domcontentloaded");

            // console.log("✅ Case form submitted successfully.");
    }

    generateCaseDetails() {
        const caseDetails = {
            create_case_first_name: `Test ${faker.person.firstName()}`,
            create_case_last_name: faker.person.lastName(),
            create_case_state: faker.location.state(),
            create_case_DOB: this.generateRandomDate(20, 50), // Random birthday between 20-50 years old
            create_case_SSN: faker.string.numeric(9), // 9-digit random SSN
            create_case_DOI: this.generateRandomDate(15, 30), // Random date in past 15-30 days
        };

        // **Update test.json without deleting other data**
        TestDataUpdater.updateTestData(caseDetails);

        return caseDetails;
    }
    

    generateRandomDate(minYears: number, maxYears: number): string {
            const today = new Date();
            const pastDate = faker.date.past({ years: faker.number.int({ min: minYears, max: maxYears }) });
            return pastDate.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
    }

   async fillFormWithDuplicateDOIDOB() {

    await this.page.waitForLoadState("load");   
    const freshData = TestDataUpdater.getTestData();
                    // console.log("🔹 Using Fresh Test Data:", freshData);

        // console.log("🔹 Filling case form with duplicate DOI & DOB...");
        await this.page.waitForLoadState("load");
        // Enter first name and last name
        await this.page.fill(`xpath=${pageLocators.fname}`, freshData.create_case_first_name);
        await this.page.fill(`xpath=${pageLocators.lname}`, freshData.create_case_last_name);

        // Select state from dropdown
        await this.page.selectOption(`xpath=${pageLocators.state_xpath}`, { label: freshData.create_case_state });

        // Enter DOB and DOI (both duplicate)
        await this.page.fill(`xpath=${pageLocators.DOB_input}`, freshData.create_case_DOB);
        // await this.page.keyboard.press("Enter"); // To save the DOB in the form
        await this.page.fill(`xpath=${pageLocators.DOI_input}`, freshData.create_case_DOI);
        await this.page.keyboard.press("Enter"); // To save the DOI in the form

        if(this.page.locator(`xpath=${pageLocators.group_office}`).isVisible){
            // Select office from dropdown (selecting by index)
            const officeDropdown = this.page.locator(`xpath=${pageLocators.group_office}`);
            const officeOptions = await officeDropdown.locator("option").count();

            if (officeOptions > 1) {
                await officeDropdown.selectOption({ index: 1 });
            } else {    
                console.warn("⚠️ Warning: No additional office options available.");
            }
        }
        // // Click on a random input box to trigger duplicate case popup
        // await this.page.click(`xpath=${pageLocators.emp_occupation}`);
        
        // Wait for the duplicate case popup and click cancel
        await this.page.waitForSelector(`xpath=${pageLocators.duplicate_case_popup_cancel}`);
        await this.page.click(`xpath=${pageLocators.duplicate_case_popup_cancel}`);

        // console.log("✅ Duplicate case popup handled.");
   }

   async fillFormWithDuplicateSSNDOB() {
    await this.page.waitForLoadState("load");

    const freshData = TestDataUpdater.getTestData();
                    // console.log("🔹 Using Fresh Test Data:", freshData);

        // console.log("🔹 Filling case form with duplicate SSN & DOB...");
        await this.page.waitForLoadState("load");
        // Enter first name and last name
        await this.page.fill(`xpath=${pageLocators.fname}`, freshData.create_case_first_name);
        await this.page.fill(`xpath=${pageLocators.lname}`, freshData.create_case_last_name);

        // Select state from dropdown
        await this.page.selectOption(`xpath=${pageLocators.state_xpath}`, { label: freshData.create_case_state });

        // Enter DOB and SSN (both duplicate)
        await this.page.fill(`xpath=${pageLocators.SSN_input}`, freshData.create_case_SSN);
        await this.page.fill(`xpath=${pageLocators.DOB_input}`, freshData.create_case_DOB);
        await this.page.keyboard.press("Enter"); // To save the DOB in the form
        
        if(this.page.locator(`xpath=${pageLocators.group_office}`).isVisible){
            // Select office from dropdown (selecting by index)
            const officeDropdown = this.page.locator(`xpath=${pageLocators.group_office}`);
            const officeOptions = await officeDropdown.locator("option").count();

            if (officeOptions > 1) {
                await officeDropdown.selectOption({ index: 1 });
            } else {
                console.warn("⚠️ Warning: No additional office options available.");
            }
        }


        // // Click on a random input box to trigger duplicate case popup
        // await this.page.click(`xpath=${pageLocators.emp_occupation}`);

        // Wait for the duplicate case popup and click "No"
        await this.page.waitForSelector(`xpath=${pageLocators.duplicate_case_SSN_popup_no}`);
        await this.page.click(`xpath=${pageLocators.duplicate_case_SSN_popup_no}`);

        // console.log("✅ Duplicate case popup handled.");
  }

  async fillFormForGroupAdmin() {
    const caseDetails = this.generateCaseDetails();

    await this.page.waitForLoadState("load");
    
    const freshData = TestDataUpdater.getTestData();
                    // console.log("🔹 Using Fresh Test Data:", freshData);

        
        // console.log("🔹 Filling case form for Group Admin...");
        await this.page.waitForLoadState("load");
        // Enter first name and last name
        await this.page.fill(`xpath=${pageLocators.fname}`, freshData.create_case_first_name);
        await this.page.fill(`xpath=${pageLocators.lname}`, freshData.create_case_last_name);

        // Select state from dropdown
        await this.page.selectOption(`xpath=${pageLocators.state_xpath}`, { label: freshData.create_case_state });

        // Select office from dropdown (selecting by index)
        const officeDropdown = await this.page.locator(`xpath=${pageLocators.group_office}`);
        const officeOptions = await officeDropdown.locator("option").count();

        if (officeOptions > 1) {
            await officeDropdown.selectOption({ index: 1 });
        } else {
            console.warn("⚠️ Warning: No additional office options available.");
        }

        // Enter DOB, DOI, SSN
        await this.page.fill(`xpath=${pageLocators.DOB_input}`, freshData.create_case_DOB);
        await this.page.keyboard.press("Enter"); // To save the DOB in the form
        await this.page.fill(`xpath=${pageLocators.DOI_input}`, freshData.create_case_DOI);
        await this.page.keyboard.press("Enter"); // To save the DOI in the form
        await this.page.fill(`xpath=${pageLocators.SSN_input}`, freshData.create_case_SSN);

        // Submit the form
        await this.page.click(`xpath=${pageLocators.submit_xpath}`);

        // console.log("✅ Group Admin case form submitted.");
  }

}