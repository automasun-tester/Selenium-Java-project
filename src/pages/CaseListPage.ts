import { Page, expect } from "@playwright/test";
import * as testData from '../helper/data/test.json';
import * as pageLocators from '../helper/locators/case_list.json';
import * as commonLocators from '../helper/locators/common_locators.json';
import PickleFilter from "@cucumber/cucumber/lib/pickle_filter";
import TestDataUpdater from "../helper/data/testDataUpdater";
import Assert from "../helper/wrapper/assert";

export default class CaseListPage {
    
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async CreateCaseButton() {
        // console.log("🔹 Clicking the 'Create Case' button...");
        await this.page.waitForLoadState("load");
        // Wait for dropdown to appear and click
        await this.page.waitForSelector(`xpath=${pageLocators.createcase_dd}`);
        await this.page.click(`xpath=${pageLocators.createcase_dd}`);

        // Wait for 'Create Case' button and click
        await this.page.waitForSelector(`xpath=${pageLocators.createcase_button}`);
        await this.page.click(`xpath=${pageLocators.createcase_button}`);

        // console.log("✅ 'Create Case' button clicked successfully.");

    }

    async go_to_case_list() {
        await this.page.waitForLoadState("load");
        await this.page.waitForSelector(`xpath=${commonLocators.case_tab_button}`);
        await this.page.click(`xpath=${commonLocators.case_tab_button}`);
    }

    async searchCase() {
        // console.log("🔹 Clicking on the 'Case List' tab...");

        const freshData = TestDataUpdater.getTestData();
                //  console.log("🔹 Using Fresh Test Data:");
        await this.page.waitForLoadState("load");
        // Click on the Case List Tab
        await this.page.waitForSelector(`xpath=${commonLocators.case_tab_button}`);
        await this.page.click(`xpath=${commonLocators.case_tab_button}`);

        // console.log("✅ Inside Case List Tab");

        // Click on the Search Bar
        await this.page.waitForSelector(`xpath=${pageLocators.case_search_bar}`);
        await this.page.click(`xpath=${pageLocators.case_search_bar}`);

        // console.log("✅ Search bar clicked");

        // Input the name stored in test.json
        const caseName = freshData.create_case_first_name + ' ' + freshData.create_case_last_name;
        await this.page.fill(`xpath=${pageLocators.case_search_bar}`, caseName);
        console.log(`✅ Entered search text: ${caseName}`);

        // Wait for search results
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector(`xpath=${pageLocators.case_name}`);

        // Validate search results
        const searchResult = await this.page.textContent(`xpath=${pageLocators.case_name}`);
        this.validateSearch(searchResult, caseName);
    }

    private validateSearch(name: string | null, search: string) {
        if (!name) {
            console.error("❌ Case name element not found.");
            throw new Error("Search validation failed - Case name is null");
        }

        name = name.toLowerCase();
        search = search.toLowerCase();

        if (name.includes(search)) {
            // console.log("✅ Case List: Search Successful");
            expect(true).toBeTruthy();
        } else {
            console.error("❌ Case List: Search Failed");
            expect(true).toBeFalsy();
        }
    }
    async openCase() {
            await this.page.waitForLoadState("load");
            await this.page.waitForSelector(`xpath=${pageLocators.case_name}`);
            await this.page.click(`xpath=${pageLocators.case_name}`);
      }
    async searchProviderGroup(){
        // console.log("🔹 Clicking on the 'Case List' tab...");
        await this.page.waitForLoadState("load");
        // Click on the Case List Tab
        await this.page.waitForSelector(`xpath=${commonLocators.case_tab_button}`);
        await this.page.click(`xpath=${commonLocators.case_tab_button}`);

        // console.log("✅ Inside Case List Tab");

        // Click on the Search Bar
        await this.page.waitForSelector(`xpath=${pageLocators.case_search_bar}`);
        await this.page.click(`xpath=${pageLocators.case_search_bar}`);

        // console.log("✅ Search bar clicked");

        
        let freshData = TestDataUpdater.getTestData();
                //  console.log("🔹 Using Fresh Test Data:");

        // Input the name stored in test.json
        const caseName = freshData.create_case_first_name;
        await this.page.fill(`xpath=${pageLocators.case_search_bar}`, caseName);
        console.log(`✅ Entered search text: ${caseName}`);

        // Wait for search results
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector(`xpath=${pageLocators.case_name}`);

        // Validate search results
        const searchResult = await this.page.textContent(`xpath=${pageLocators.case_name}`);
        this.validateSearch(searchResult, caseName);

    }  
 
    async searchProviderGroupandOpen() {
        // console.log("🔹 Clicking on the 'Case List' tab...");

        await this.page.waitForLoadState("load");
        // Click on the Case List Tab
        await this.page.waitForSelector(`xpath=${commonLocators.case_tab_button}`);
        await this.page.click(`xpath=${commonLocators.case_tab_button}`);

        // console.log("✅ Inside Case List Tab");

        // Click and clear the search bar
        await this.page.waitForSelector(`xpath=${pageLocators.case_search_bar}`);
        await this.page.fill(`xpath=${pageLocators.case_search_bar}`, ""); // Clears the field
        // console.log("✅ Search bar cleared");

        
        const freshData = TestDataUpdater.getTestData();
                //  console.log("🔹 Using Fresh Test Data:");

        // Input the name stored in test.json
        const caseName = freshData.create_case_first_name +' ' + freshData.create_case_last_name;
        await this.page.fill(`xpath=${pageLocators.case_search_bar}`, caseName);
        console.log(`✅ Entered search text: ${caseName}`);

        // Wait for search results
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector(`xpath=${pageLocators.case_name}`);

        // Validate search results
        const searchResult = await this.page.textContent(`xpath=${pageLocators.case_name}`);
        this.validateSearch(searchResult, caseName);

        // Click the case to open it
        await this.page.click(`xpath=${pageLocators.case_name}`);
        // console.log("✅ Case opened successfully.");
    }

    async getTileValues() {
        await this.page.waitForLoadState("load");
        let paginationLocator: string;

    // if (PickleFilter.name.includes("group provider")) {
    //   paginationLocator = "outoftotal_cases";
    // } else {
    //   paginationLocator = "outoftotal_caseshdn";
    // }

    // Capturing the number of cases displayed on the tile
    const newCase = await this.page.locator(`xpath=${pageLocators.newcase_tile}`).textContent();
    const openCase = await this.page.locator(`xpath=${pageLocators.opencase_tile}`).textContent();

    await this.page.locator(`xpath=${pageLocators.newcase_tile}`).click();
    // console.log("Case List: Search :new case: " + newCase);
    await this.evaluateCaseNumber(newCase, paginationLocator);

    await this.page.locator(`xpath=${pageLocators.opencase_tile}`).click();
    // console.log("Case List: Search :open case: " + openCase);
    await this.evaluateCaseNumber(openCase, paginationLocator);

    if (PickleFilter.name.includes("attorney") || PickleFilter.name.includes("Attorney")) {
      // Capturing the number of cases displayed on the tile
      const demandToSend = await this.page.locator(`xpath=${pageLocators.demandtosend_tile}`).textContent();
      await this.page.locator(`xpath=${pageLocators.demandtosend_tile}`).click();
    //   console.log("Case List: Search :demand to send: " + demandToSend);
      await this.evaluateCaseNumber(demandToSend, paginationLocator);

      // Capturing the number of cases displayed on the tile
      const inNegotiation = await this.page.locator(`xpath=${pageLocators.innagotiation_tile}`).textContent();
      await this.page.locator(`xpath=${pageLocators.innagotiation_tile}`).click();
    //   console.log("Case List: Search :In negotiation case: " + inNegotiation);
      await this.evaluateCaseNumber(inNegotiation, paginationLocator);

      // Capturing the number of cases displayed on the tile
      await this.page.locator(`xpath=${pageLocators.switch_to_demands_sent}`).click();
      const demandsSent = await this.page.locator(`xpath=${pageLocators.demands_sent_tile}`).textContent();
      await this.page.locator(`xpath=${pageLocators.demands_sent_tile}`).click();
    //   console.log("Case List: Search :In Demands Sent: " + demandsSent);
      await this.page.waitForTimeout(500);

      if (PickleFilter.name.includes("group") || PickleFilter.name.includes("Group")) {
        paginationLocator = "outoftotal_caseshdn";
        await this.evaluateCaseNumber(demandsSent, paginationLocator);
      } else {
        await this.evaluateCaseNumber(demandsSent, paginationLocator);
      }
    }

    if (PickleFilter.name.includes("provider") || PickleFilter.name.includes("Provider")) {
      // Capturing the number of cases displayed on the tile
      const recordToSend = await this.page.locator(`xpath=${pageLocators.recordtosent_tile}`).textContent();
      await this.page.locator(`xpath=${pageLocators.recordtosent_tile}`).click();
    //   console.log("Case List: Search :record to send: " + recordToSend);
      await this.evaluateCaseNumber(recordToSend, paginationLocator);

      // Capturing the number of cases displayed on the tile
      const badCase = await this.page.locator(`xpath=${pageLocators.badcase_tile}`).textContent();
      await this.page.locator(`xpath=${pageLocators.badcase_tile}`).click();
    //   console.log("Case List: Search :In bad case tile case: " + badCase);
      await this.evaluateCaseNumber(badCase, paginationLocator);

      // Capturing the number of cases displayed on the tile
      await this.page.locator(`xpath=${pageLocators.switch_to_recordssent}`).click();
      const recordsSent = await this.page.locator(`xpath=${pageLocators.records_sent_tile}`).textContent();
      await this.page.locator(`xpath=${pageLocators.records_sent_tile}`).click();
    //   console.log("Case List: Search :In Records Sent: " + recordsSent);
      await this.page.waitForTimeout(500);
      await this.evaluateCaseNumber(recordsSent, paginationLocator);
    }
  }

  // Evaluate the case number with the number of cases on the page
  async evaluateCaseNumber(tileCase: string, locator: string) {
        // Wait until the "Showing" text is present in the locator
        await this.page.locator(`xpath=${pageLocators[locator]}`).waitFor({ state: 'visible' });

        const casesInPage = await this.page.locator(`xpath=${pageLocators[locator]}`).textContent();
        const lstIndexSpace = casesInPage?.lastIndexOf(' ');
        const lstIndexOf = casesInPage?.lastIndexOf('f');
        // console.log("testing :" + casesInPage);

        // Capturing the number of cases on the page
        const caseCount = casesInPage?.substring(lstIndexOf + 1, lstIndexSpace);

        // console.log("Number of cases in page : " + caseCount);

        // Comparing the values with the cases on the page vs case on the tile
        if (casesInPage?.includes(tileCase)) {
        // console.log("Appear correct");
        } else {
        console.warn("Tile does not match with cases appear on the page");
        }
    }

    async open_closed_cases() {
        await this.page.waitForLoadState("load");
        await this.page.waitForSelector(`xpath=${pageLocators.completed_cases}`);
        await this.page.click(`xpath=${pageLocators.completed_cases}`);
    }

    async search_closed_case_attorney() {
        await this.page.waitForLoadState("load");
            // Click the search bar to input text
        await this.page.locator(`xpath=${pageLocators.completed_case_search_attorney}`).click();
        // console.log("Case List: Completed Cases Search :clicked the search bar");

        
        const freshData = TestDataUpdater.getTestData();
                //  console.log("🔹 Using Fresh Test Data:");

        // Input the name stored in store.json (equivalent to store.getProperty in Java)
        await this.page.locator(`xpath=${pageLocators.completed_case_search_attorney}`).fill(freshData.create_case_first_name);
        // console.log("Case List: Completed Cases Search :entered the case name");

        // Wait for the results to appear (similar to Thread.sleep() in Selenium)
        await this.page.waitForTimeout(2000); // Optional, Playwright will automatically wait for elements

        // Wait for the text to appear in the element (similar to Selenium's textToBePresentInElementLocated)
        const caseName = await this.page.locator(`xpath=${pageLocators.completed_case_name_attorney}`).textContent();
        const searched = freshData.create_case_first_name;

        // Validate search result
        this.validateSearch(caseName, searched);

    }

    async search_closed_case_provider() {
        await this.page.waitForLoadState("load");
        // Click the search bar to input text
        await this.page.locator(`xpath=${pageLocators.completed_case_search_provider}`).click();
        // console.log("Case List: Completed Cases Search :clicked the search bar");

        
        const freshData = TestDataUpdater.getTestData();
                //  console.log("🔹 Using Fresh Test Data:");

        // Input the name stored in store.json (equivalent to store.getProperty in Java)
        await this.page.locator(`xpath=${pageLocators.completed_case_search_provider}`).fill(freshData.create_case_first_name);
        // console.log("Case List: Completed Cases Search :entered the case name");

        // Wait for the results to appear (similar to Thread.sleep() in Selenium)
        await this.page.waitForTimeout(2000); // Optional, Playwright will automatically wait for elements

        // Wait for the text to appear in the element (similar to Selenium's textToBePresentInElementLocated)
        const caseName = await this.page.locator(`xpath=${pageLocators.completed_case_name_provider}`).textContent();
        const searched = freshData.create_case_first_name;

        // Validate search result
        this.validateSearch(caseName, searched);
    }

    async openCaseDetailForTheCompletedCase() {
        
        await this.page.locator(`xpath=${pageLocators.completed_case_name_attorney}`).click();
    }

    
  async validateCaseIsNotPresentInOpenCaseList(){
     // console.log("🔹 Clicking on the 'Case List' tab...");

        const freshData = TestDataUpdater.getTestData();
        //  console.log("🔹 Using Fresh Test Data:");
    await this.page.waitForLoadState("load");
    // // Click on the Case List Tab
    // await this.page.waitForSelector(`xpath=${common_locators.case_tab_button}`);
    // await this.page.click(`xpath=${common_locators.case_tab_button}`);

    // console.log("✅ Inside Case List Tab");

    // Click on the Search Bar
    await this.page.waitForSelector(`xpath=${pageLocators.case_search_bar}`);
    await this.page.click(`xpath=${pageLocators.case_search_bar}`);

    // console.log("✅ Search bar clicked");

    // Input the name stored in test.json
    let caseName = freshData.create_case_first_name + ' ' + freshData.create_case_last_name;
    await this.page.fill(`xpath=${pageLocators.case_search_bar}`, caseName);
    console.log(`✅ Entered search text: ${caseName}`);

    // Wait for search results
    await this.page.waitForTimeout(2000);
    if (await this.page.isVisible(`xpath=${pageLocators.case_name}`))
      throw new Error("Case is still present in the open case list after being closed.");

    // // Validate search results
    // let searchResult = await this.page.textContent(`xpath=${pageLocators.case_name}`);

    
    // caseName = caseName.toLowerCase();
    // searchResult = searchResult.toLowerCase();

    // if (caseName.includes(searchResult)) {
    //   throw new Error("Case is still present in the open case list after being closed.");
    // } 
  }

  async openBadCasesTab() {
    await this.page.waitForLoadState("load");
    await this.page.waitForSelector(`xpath=${pageLocators.badcase_tile}`);
    await this.page.click(`xpath=${pageLocators.badcase_tile}`);
  }
  
  async validateBadCasesAreVisible(){

    await this.page.waitForLoadState("load");

    const allBadCAses = await this.page.locator(`xpath=${pageLocators.bad_case_icon}`);
    await expect(allBadCAses).toBeVisible();
  }

  async goToProfileSettingsPage(){
    await this.page.waitForTimeout(2000);
    await this.page.waitForLoadState("load");

    await this.page.waitForSelector(`xpath=${commonLocators.top_right_profile_dd}`);
    await this.page.locator(`xpath=${commonLocators.top_right_profile_dd}`).click();

    await this.page.locator(`xpath=${commonLocators.profile_link}`).click();
  }

  async checkTheCaseListForTheMostRecentlyAccessedCase(){

    await this.page.waitForLoadState("load");
    const PresentRecentCase = await this.page.locator(`xpath=${pageLocators.case_name}`).textContent();
    const freshData = TestDataUpdater.getTestData();
    //  console.log("🔹 Using Fresh Test Data:")
    const ExpectedRecentCase = freshData.create_case_first_name + ' ' + freshData.create_case_last_name;
    if (PresentRecentCase?.includes(ExpectedRecentCase)) {
        console.log("✅ The most recently accessed case is present in the case list, working as expected.");
    }
    else {
        console.error("❌ The most recently accessed case is NOT present in the case list.");
        throw new Error("The most recently accessed case is NOT present in the case list after checking the setting.");
  }}

  async checkForTheCaseListForTheRecentlyAccessedCaseShouldNotBeAtTheTop(){

    await this.page.waitForLoadState("load");
    const PresentRecentCase = await this.page.locator(`xpath=${pageLocators.case_name}`).textContent();
    const freshData = TestDataUpdater.getTestData();
    //  console.log("🔹 Using Fresh Test Data:")
    const ExpectedRecentCase = freshData.create_case_first_name + ' ' + freshData.create_case_last_name;
    if (!(PresentRecentCase?.includes(ExpectedRecentCase))) {
        console.log("✅ The most recently accessed case is not present in the case list working as expected.");
    }
    else {
        // console.error("❌ The most recently accessed case is NOT present in the case list.");
        throw new Error("The most recently accessed case is present in the case list after unchecking the setting.");
  }}
}

