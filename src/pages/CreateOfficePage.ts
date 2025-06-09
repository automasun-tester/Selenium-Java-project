import { Page } from "@playwright/test";
import * as pageLocators from '../helper/locators/create_office.json';
import TestDataUpdater from "../helper/data/testDataUpdater";
import { faker } from "@faker-js/faker"; // ✅ Using Faker.js for random data
import { PickleNameFilter } from "@cucumber/cucumber/lib/pickle_filter";

export default class CreateOfficePage {
   
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fill_form_create_office_provider() {
        await this.page.waitForLoadState("load");

        // Generate form details for Provider Office
        this.generateFormDetailsOffice('P');
        // console.log("🔹 Filling Office Form with:", testData);

        const freshData = TestDataUpdater.getTestData();
        // console.log("🔹 Using Fresh Test Data:", freshData);

        // Fill office details
        await this.page.fill(`xpath=${pageLocators.office_name}`, freshData.create_office_name_provider);
        await this.page.selectOption(`xpath=${pageLocators.office_type}`, { label: "Provider Office" });

        await this.page.fill(`xpath=${pageLocators.provider_speciality}`, "chiro");
        await this.page.locator(`xpath=${pageLocators.provider_speciality_dd}`).click();
        await this.page.fill(`xpath=${pageLocators.office_phone}`, freshData.create_office_phone);

        // Fill address details
        const addressField = this.page.locator(`xpath=${pageLocators.office_address}`);
        await addressField.fill(freshData.create_office_streetAd);
        await this.page.fill(`xpath=${pageLocators.office_city}`, freshData.create_office_city);
        await this.page.selectOption(`xpath=${pageLocators.office_state}`, freshData.create_office_state);
        await this.page.fill(`xpath=${pageLocators.office_zip}`, freshData.create_office_zipcode);

        await this.page.waitForTimeout(500);
        await this.page.click(`xpath=${pageLocators.office_create_submit}`);
        // console.log("✅ Create Office: Clicked on Submit Button");


        // Confirm form submission success
        // await this.page.waitForLoadState("load");
        const pageTitle = await this.page.title();
        if (!pageTitle.includes("Office List")) {

            // Checking if create office warning is displayed
            if (!PickleNameFilter.name.includes("Super Admin")) {
                await this.page.waitForTimeout(1000);
                const warningLocator = this.page.locator(`xpath=${pageLocators.office_create_warning}`);
                    if (await warningLocator.isVisible()) {
                        // console.log("⚠️ Create Office: Warning Displayed, accepting...");
                        await warningLocator.click();
                    }
        }

        // // Verify if city and zip are missing, then retry
        // const cityValue = await this.page.inputValue(`xpath=${pageLocators.office_city}`);
        // const zipValue = await this.page.inputValue(`xpath=${pageLocators.office_zip}`);

        // if (!cityValue || !zipValue) {
        //     await this.fill_form_create_office_provider();
        // }

        // // Confirm form submission success
        // await this.page.waitForLoadState("load");
        // const pageTitle = await this.page.title();
        // if (pageTitle.includes("SimplifyPI | Office List")) {
            // console.log("✅ Create Office: Form Submitted Successfully");
        } else {
            console.error("❌ Create Office: Form Submission Failed");
            throw new Error("Office creation failed");
        }
    }

    generateFormDetailsOffice(call: 'P' | 'A') {
        let officeDetails: any = {};
        if (call === 'P') {
            officeDetails.create_office_name_provider = `${faker.company.name()} Provider`;
        } else {
            officeDetails.create_office_name_attorney = `${faker.person.lastName()} Attorney ${faker.number.int({ min: 1, max: 100 })}`;
        }
        officeDetails.create_office_phone = faker.phone.number();
        officeDetails.create_office_streetAd = faker.location.streetAddress();
        officeDetails.create_office_city = faker.location.city();
        officeDetails.create_office_state = faker.location.state();
        officeDetails.create_office_zipcode = faker.location.zipCode();

        TestDataUpdater.updateTestData(officeDetails);
        
        // console.log("📂 Office Details Saved:", officeDetails);

    }
    
    
    async fill_form_create_office_attorney() {
        await this.page.waitForLoadState("load");

        // Generate form details for Provider Office
        this.generateFormDetailsOffice('A');
        // console.log("🔹 Filling Office Form with:", testData);

        // ✅ Step 2: Read Fresh Data After Writing
        const freshData = TestDataUpdater.getTestData();
        // console.log("🔹 Using Fresh Test Data:", freshData);

        // Fill office details
        await this.page.fill(`xpath=${pageLocators.office_name}`, freshData.create_office_name_attorney);
        await this.page.selectOption(`xpath=${pageLocators.office_type}`, { label: "Attorney Office" });

        
        await this.page.fill(`xpath=${pageLocators.office_phone}`, freshData.create_office_phone);

        // Fill address details
        const addressField = this.page.locator(`xpath=${pageLocators.office_address}`);
        await addressField.fill(freshData.create_office_streetAd);
        await this.page.fill(`xpath=${pageLocators.office_city}`, freshData.create_office_city);
        await this.page.selectOption(`xpath=${pageLocators.office_state}`, freshData.create_office_state);
        await this.page.fill(`xpath=${pageLocators.office_zip}`, freshData.create_office_zipcode);

        await this.page.waitForTimeout(500);
        await this.page.click(`xpath=${pageLocators.office_create_submit}`);
        // console.log("✅ Create Office: Clicked on Submit Button");


        // Confirm form submission success
       
        const pageTitle = await this.page.title();
        if (!pageTitle.includes("Office List")) {

            // Checking if create office warning is displayed
            if (!PickleNameFilter.name.includes("Super Admin")) {
                await this.page.waitForTimeout(1000);
                const warningLocator = this.page.locator(`xpath=${pageLocators.office_create_warning}`);
                    if (await warningLocator.isVisible()) {
                        // console.log("⚠️ Create Office: Warning Displayed, accepting...");
                        await warningLocator.click();
                    }
        }
        // // Verify if city and zip are missing, then retry
        // const cityValue = await this.page.inputValue(`xpath=${pageLocators.office_city}`);
        // const zipValue = await this.page.inputValue(`xpath=${pageLocators.office_zip}`);

        // if (!cityValue || !zipValue) {
        //     await this.fill_form_create_office_provider();
        // }

        // // Confirm form submission success
        // await this.page.waitForLoadState("load");
        // const pageTitle = await this.page.title();
        // if (pageTitle.includes("SimplifyPI | Office List")) {
        //     console.log("✅ Create Office: Form Submitted Successfully");
        } else {
            console.error("❌ Create Office: Form Submission Failed");
            throw new Error("Office creation failed");
        }
    }

}