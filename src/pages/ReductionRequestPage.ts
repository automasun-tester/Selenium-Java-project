import { Page, expect } from "@playwright/test";
import * as refer from '../helper/data/office_referrals.json';
import * as common_locators from '../helper/locators/common_locators.json';
import * as pageLocators from '../helper/locators/reduction_request.json';
import * as testData from '../helper/data/test.json';
import { faker } from "@faker-js/faker"; // ✅ Using Faker.js for random data
import fs from "fs";
import TestDataUpdater from "../helper/data/testDataUpdater";
import assert from "assert";

export default class ReductionRequestPage {
   
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open_reduction_request() {
        // console.log("🔹 Opening the 'Reduction Request' tab...");
        await this.page.waitForLoadState("load");
        // Wait for the tab to appear and click
        await this.page.waitForSelector(`xpath=${common_locators.reduction_req_tab}`);
        await this.page.click(`xpath=${common_locators  .reduction_req_tab}`);

        // console.log("✅ 'Reduction Request' tab opened successfully."); 

    }
    
    async validate_needs_request_provider() {
        // console.log("🔹 Navigating to 'Needs Response' tab...");
        await this.page.waitForLoadState("load");
        const freshData = TestDataUpdater.getTestData();
        // Click on the Needs Response tab



        await this.page.waitForSelector(`xpath=${pageLocators.needs_response_tile}`);
        await this.page.click(`xpath=${pageLocators.needs_response_tile}`);
        // console.log("✅ Inside 'Needs Response' tab");

        await this.page.waitForLoadState("load");

        // await this.page.waitForSelector(`xpath=${pageLocators.date_range}`);
        // await this.page.click(`xpath=${pageLocators.date_range}`);

        // await this.page.waitForSelector(`xpath=${pageLocators.all_case_filter}`);  
        // await this.page.click(`xpath=${pageLocators.all_case_filter}`);

        // Click the search bar and enter case name
        await this.page.waitForSelector(`xpath=${pageLocators.needs_response_search}`);
        await this.page.click(`xpath=${pageLocators.needs_response_search}`);

        const caseName = freshData.create_case_first_name + " " + freshData.create_case_last_name;
        await this.page.fill(`xpath=${pageLocators.needs_response_search}`, caseName);
        console.log(`✅ Entered case name: ${caseName}`);

        this.waitFortDatatoAppear(caseName);
        // Validate case name is present in the list
        await this.page.waitForSelector(`xpath=${pageLocators.needs_response_casename}`);
        const caseExists = await this.page.textContent(`xpath=${pageLocators.needs_response_casename}`);

        if (caseExists?.trim().includes(caseName.trim())) {
            // console.log("✅ Reduction Request: Case present in needs response");

            // Validate the offer amount
            const offerAmount = await this.page.textContent(`xpath=${pageLocators.needs_response_offeramount}`);
            if (offerAmount?.trim() === "1000") {
                // console.log("✅ Reduction Request: Offer Amount is correctly shown");
            } else {
                console.error("❌ Reduction Request: Offer Amount is NOT correctly shown");
            }

            // Validate referred attorney name
            const referredAttorney = await this.page.textContent(`xpath=${pageLocators.needs_response_referred_attorney}`);
            if (referredAttorney?.trim().includes(refer.attorney_referral_name.trim())) {
                // console.log("✅ Reduction Request: Referred Attorney is correctly shown");
            } else {
                console.error("❌ Reduction Request: Referred Attorney is NOT correctly shown");
            }
        } else {
            console.error("❌ Reduction Request: Case NOT present in the list");
        }
    }

    async waitFortDatatoAppear( text: string, timeout = 10000) {

        await expect(this.page.locator(`.ag-center-cols-container >> text=${text}`)).toBeVisible({ timeout });
    }


    async check_case_waiting_response_attorney(){
        // console.log("🔹 Navigating to 'Waiting for Response' tab...");
        await this.page.waitForLoadState("load");
        // Click on the Waiting for Response tab
        await this.page.waitForSelector(`xpath=${pageLocators.waiting_for_response_tile}`);
        await this.page.click(`xpath=${pageLocators.waiting_for_response_tile}`);
        // console.log("✅ Inside 'Waiting for Response' tab");

        await this.page.waitForLoadState("load");
        // await this.page.waitForSelector(`xpath=${pageLocators.date_range}`);
        // await this.page.click(`xpath=${pageLocators.date_range}`);

        // await this.page.waitForSelector(`xpath=${pageLocators.all_case_filter}`);  
        // await this.page.click(`xpath=${pageLocators.all_case_filter}`);

        // Click the search bar and enter case name
        await this.page.waitForSelector(`xpath=${pageLocators.waiting_for_response_search}`);
        await this.page.click(`xpath=${pageLocators.waiting_for_response_search}`);
        const freshData = TestDataUpdater.getTestData();
        const caseName = freshData.create_case_first_name + " " + freshData.create_case_last_name;
        await this.page.fill(`xpath=${pageLocators.waiting_for_response_search}`, caseName);
        console.log(`✅ Entered case name: ${caseName}`);

        this.waitFortDatatoAppear(caseName);
        // Validate case name is present in the list
        await this.page.waitForSelector(`xpath=${pageLocators.waiting_for_response_casename}`);
        const caseExists = await this.page.textContent(`xpath=${pageLocators.waiting_for_response_casename}`);

        if (caseExists?.trim().includes(caseName.trim())) {
            // console.log("✅ Reduction Request: Case present in waiting for response");

            // Validate the offer amount
            const offerAmount = await this.page.textContent(`xpath=${pageLocators.waiting_for_response_offeramount}`);
            if (offerAmount?.trim() === "1000") {
                // console.log("✅ Reduction Request: Offer Amount is correctly shown");
            } else {
                console.error("❌ Reduction Request: Offer Amount is NOT correctly shown");
            }

            // Validate referred facility name
            const referredFacility = await this.page.textContent(`xpath=${pageLocators.waiting_for_response_facility}`);
            if (referredFacility?.trim().includes(refer.provider_facility_name.trim())) {
                // console.log("✅ Reduction Request: Referred Facility is correctly shown");
            } else {
                console.error("❌ Reduction Request: Referred Facility is NOT correctly shown");
            }
        } else {
            console.error("❌ Reduction Request: Case NOT present in the list");
        }
    }

    async open_offer_case(){
        await this.page.waitForLoadState("load");
        await this.page.waitForSelector(`xpath=${pageLocators.waiting_for_response_casename}`);
        await this.page.click(`xpath=${pageLocators.waiting_for_response_casename}`);
    }
    

    async validate_needs_request_attorney() {
        // console.log("🔹 Navigating to 'Needs Response' tab...");
        await this.page.waitForLoadState("load");
        // Click on the Needs Response tab
        await this.page.waitForSelector(`xpath=${pageLocators.needs_response_tile}`);
        await this.page.click(`xpath=${pageLocators.needs_response_tile}`);
        // console.log("✅ Inside 'Needs Response' tab");

        await this.page.waitForLoadState("load");

        // await this.page.waitForSelector(`xpath=${pageLocators.date_range}`);
        // await this.page.click(`xpath=${pageLocators.date_range}`);

        // await this.page.waitForSelector(`xpath=${pageLocators.all_case_filter}`);  
        // await this.page.click(`xpath=${pageLocators.all_case_filter}`);

        // Click the search bar and enter case name
        await this.page.waitForSelector(`xpath=${pageLocators.needs_response_search}`);
        await this.page.click(`xpath=${pageLocators.needs_response_search}`); 


        const freshData = TestDataUpdater.getTestData();
        const caseName = freshData.create_case_first_name + " " + freshData.create_case_last_name;
        await this.page.fill(`xpath=${pageLocators.needs_response_search}`, caseName);
        console.log(`✅ Entered case name: ${caseName}`);

        this.waitFortDatatoAppear(caseName);
        // Validate case name is present in the list
        await this.page.waitForSelector(`xpath=${pageLocators.needs_response_casename}`);
        const caseExists = await this.page.textContent(`xpath=${pageLocators.needs_response_casename}`);

        if (caseExists?.trim().includes(caseName.trim())) {
            // console.log("✅ Reduction Request: Case present in needs response");

            // Validate counter-offer amount
            const counterOfferAmount = await this.page.textContent(`xpath=${pageLocators.needs_response_offeramount}`);
            if (counterOfferAmount?.trim() === "800") {
                // console.log("✅ Reduction Request: Counter-Offer Amount is correctly shown");
            } else {
                console.error("❌ Reduction Request: Counter-Offer Amount is NOT correctly shown");
            }

            // Validate referred facility
            const referredFacility = await this.page.textContent(`xpath=${pageLocators.waiting_for_response_facility}`);
            if (referredFacility?.trim().includes(refer.provider_facility_name.trim())) {
                // console.log("✅ Reduction Request: Facility is correctly shown");
            } else {
                console.error("❌ Reduction Request: Facility is NOT correctly shown");
            }
        } else {
            console.error("❌ Reduction Request: Case NOT present in the list");
        }
    }

    async check_case_waiting_response_provider(){
        await this.page.waitForLoadState("load");
        // console.log("🔹 Navigating to 'Waiting for Response' tab...");

        // Click on the Waiting for Response tab
        await this.page.waitForSelector(`xpath=${pageLocators.waiting_for_response_tile}`);
        await this.page.click(`xpath=${pageLocators.waiting_for_response_tile}`);
        // console.log("✅ Inside 'Waiting for Response' tab");

        await this.page.waitForLoadState("load");
        
        // await this.page.waitForSelector(`xpath=${pageLocators.date_range}`);
        // await this.page.click(`xpath=${pageLocators.date_range}`);

        // await this.page.waitForSelector(`xpath=${pageLocators.all_case_filter}`);  
        // await this.page.click(`xpath=${pageLocators.all_case_filter}`);

        // Click the search bar and enter case name
        await this.page.waitForSelector(`xpath=${pageLocators.waiting_for_response_search}`);
        await this.page.click(`xpath=${pageLocators.waiting_for_response_search}`);
        const freshData = TestDataUpdater.getTestData();
        const caseName = freshData.create_case_first_name + " " + freshData.create_case_last_name;
        await this.page.fill(`xpath=${pageLocators.waiting_for_response_search}`, caseName);
        console.log(`✅ Entered case name: ${caseName}`);

        this.waitFortDatatoAppear(caseName);
        // Validate case name is present in the list
        await this.page.waitForSelector(`xpath=${pageLocators.waiting_for_response_casename}`);
        const caseExists = await this.page.textContent(`xpath=${pageLocators.waiting_for_response_casename}`);

        if (caseExists?.trim().includes(caseName.trim())) {
            // console.log("✅ Reduction Request: Case present in 'Waiting for Response'");

            // Validate offer amount
            const offerAmount = await this.page.textContent(`xpath=${pageLocators.waiting_for_response_offeramount}`);
            if (offerAmount?.trim() === "1000") {
                // console.log("✅ Reduction Request: Offer Amount is correctly shown");
            } else {
                console.error("❌ Reduction Request: Offer Amount is NOT correctly shown");
            }

            // Validate referred provider
            const referredProvider = await this.page.textContent(`xpath=${pageLocators.waiting_for_response_facility}`);
            if (referredProvider?.trim().includes(refer.attorney_referral_name.trim())) {
                // console.log("✅ Reduction Request: Referred Provider is correctly shown");
            } else {
                console.error("❌ Reduction Request: Referred Provider is NOT correctly shown");
            }
        } else {
            console.error("❌ Reduction Request: Case NOT present in the list");
        }
    }

    async visibility_check_waiting_on_response(){
        await this.page.waitForLoadState("load");
        // console.log("🔹 Navigating to 'Waiting for Response' tab...");

        // Click on the Waiting for Response tab
        await this.page.waitForSelector(`xpath=${pageLocators.waiting_for_response_tile}`);
        await this.page.click(`xpath=${pageLocators.waiting_for_response_tile}`);
        // console.log("✅ Inside 'Waiting for Response' tab");

        await this.page.waitForLoadState("load");
        
        // await this.page.waitForSelector(`xpath=${pageLocators.date_range}`);
        // await this.page.click(`xpath=${pageLocators.date_range}`);

        // await this.page.waitForSelector(`xpath=${pageLocators.all_case_filter}`);  
        // await this.page.click(`xpath=${pageLocators.all_case_filter}`);

        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector(`xpath=${pageLocators.waiting_for_response_tile_count}`);
        const waitingforresposeCount = await this.page.textContent(`xpath=${pageLocators.waiting_for_response_tile_count}`);
        // console.log("waiting for respose Count ",waitingforresposeCount);
       
        await this.page.waitForSelector(`xpath=${pageLocators.waiting_for_response_pagination}`)
        let number = await this.page.textContent(`xpath=${pageLocators.waiting_for_response_pagination}`)
        // let casenumber = number.substring(number.lastIndexOf('f')+1,number.indexOf('e'));
        // console.log("pagination number ",casenumber);
        if (!(number.trim() == waitingforresposeCount.trim()))
            assert.fail("table data not visible : waiting for Response")
    }

    async visibility_check_needs_resposne(){
        await this.page.waitForLoadState("load");
        // console.log("🔹 Navigating to 'Needs Response' tab...");

        // Click on the Needs Response tab
        await this.page.waitForSelector(`xpath=${pageLocators.needs_response_tile}`);
        await this.page.click(`xpath=${pageLocators.needs_response_tile}`);
        // console.log("✅ Inside 'Needs Response' tab");

        await this.page.waitForLoadState("load");
        
        // await this.page.waitForSelector(`xpath=${pageLocators.date_range}`);
        // await this.page.click(`xpath=${pageLocators.date_range}`);

        // await this.page.waitForSelector(`xpath=${pageLocators.all_case_filter}`);  
        // await this.page.click(`xpath=${pageLocators.all_case_filter}`);

        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector(`xpath=${pageLocators.needs_response_tile_count}`);
        const needsResponseCount = await this.page.textContent(`xpath=${pageLocators.needs_response_tile_count}`);
        // console.log("needs response count ",needsResponseCount);

        await this.page.waitForSelector(`xpath=${pageLocators.needs_response_pagination}`)
        let number = await this.page.textContent(`xpath=${pageLocators.needs_response_pagination}`)
        // let casenumber = number.substring(number.lastIndexOf('f')+1,number.indexOf('e'));
        // console.log("pagination number ",casenumber);
        if (!(number.trim() == needsResponseCount.trim()) )
            assert.fail("table data not visible: Needs response")
    }
}