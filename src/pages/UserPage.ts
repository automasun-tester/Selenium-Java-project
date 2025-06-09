import test, { Page, expect } from "@playwright/test";
import * as commonLocators from '../helper/locators/common_locators.json';   
import * as pageLocators from '../helper/locators/user_list.json';
import * as usercreate from '../helper/locators/create_user.json';
import * as userEdit from '../helper/locators/edit_user.json';
import * as testData from '../helper/data/test.json';
import TestDataUpdater from "../helper/data/testDataUpdater"; // Import utility
import { faker } from "@faker-js/faker"; // ✅ Using Faker.js for random data
import fs from "fs";

export default class UserPage {
   
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async Open_UserList() {
        // console.log("📌 Navigating to User List...");

        await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState("load");
        // await this.page.waitForTimeout(500);

        // Click on profile dropdown in top-right
        await this.page.locator(`xpath=${commonLocators.top_right_profile_dd}`).waitFor({ state: "visible" });
        await this.page.locator(`xpath=${commonLocators.top_right_profile_dd}`).click();
        // console.log("✅ Clicked on profile dropdown.");

        // Click on 'Users' link
        await this.page.locator(`xpath=${commonLocators.users_link}`).click();
        // console.log("✅ Clicked on Users link.");

        // Wait for navigation to complete
        await this.page.waitForLoadState("domcontentloaded");

        // Validate if the title is correct
        const pageTitle = await this.page.title();
        if (pageTitle.trim() === "SimplifyPI | User List") {
            // console.log("✅ Successfully navigated to User List.");
        } else {
            console.error(`🔴 Error: Expected 'SimplifyPI | User List' but found '${pageTitle}'.`);
            throw new Error("Navigation failed! Not on the User List page.");
        }
    }

    async user_create_button() {
        // console.log("🔹 Clicking on 'Create User' button...");
        await this.page.waitForLoadState("load");
        // Wait for 'Create User' button to be visible
        await this.page.waitForSelector(`xpath=${pageLocators.create_user_button}`);
        await this.page.click(`xpath=${pageLocators.create_user_button}`);
        // console.log("✅ Clicked on 'Create User' button.");
    }

    async fill_user_create_form() {
          // Generate random user details
          const userDetails = this.generateUserDetails();
          TestDataUpdater.updateTestData(userDetails);
          console.log(`🔹 Filling User Form with:`, userDetails);
          await this.page.waitForLoadState("load");
          const freshData = TestDataUpdater.getTestData();
          // Fill the form fields
          await this.page.fill(`xpath=${usercreate.user_first_name}`, freshData.create_user_first_name);
          await this.page.fill(`xpath=${usercreate.user_last_name}`, freshData.create_user_last_name);
          await this.page.fill(`xpath=${usercreate.user_email}`, freshData.create_user_email);
  
          // Select dropdown value randomly (0 = Admin, 1 = User)
          const randomRoleIndex = faker.number.int({ min: 0, max: 1 });
          await this.page.selectOption(`xpath=${usercreate.user_role_dd}`, { index: randomRoleIndex });
          await this.page.waitForTimeout(500);
          // Click Submit button
          await this.page.click(`xpath=${usercreate.user_create_submit}`);
            // **Update test.json without deleting other data**
           
          // Validate successful submission
          await this.page.waitForLoadState("load");
          const pageTitle = await this.page.title();
  
        //   if (pageTitle.includes("User List")) {
            //   console.log("✅ User created successfully.");
        //   } else {
        //       console.error("🔴 Error: User creation failed.");
        //       throw new Error("User creation failed! Not redirected to User List.");
        //   }

    
      }
  
      generateUserDetails() {
            // Always generate fresh user details
            return {
                create_user_first_name: `Test ${faker.person.firstName()}`,
                create_user_last_name: faker.person.lastName(),
                create_user_email: `attorneypi1+test_user${faker.string.numeric(7)}@gmail.com`
            };
            
      }

      async search_inactive_user() {

        await this.page.waitForLoadState("load");
        const freshData = TestDataUpdater.getTestData();
                


         // Click on the "Inactive Users" list button
         await this.page.locator(`xpath=${pageLocators.inactive_list_button}`).click();

         // Wait for search bar to be visible & clickable
         const inactiveSearch = this.page.locator(`xpath=${pageLocators.inactive_user_search}`);
         await inactiveSearch.waitFor({ state: "visible" });
 
         // Click and enter the email into search bar
         await inactiveSearch.click();
         await inactiveSearch.fill(freshData.create_user_email);
 
         // Wait for search results to populate
         await this.page.waitForTimeout(2000);
 
         // Validate search results
         await this.validateInactiveSearch(freshData.create_user_email);
 
         // Clear the search input
         await inactiveSearch.fill("");
     }
 
     private async validateInactiveSearch(expectedEmail: string) {
         const emailLocator = this.page.locator(`xpath=${pageLocators.first_inactive_user_email}`);
 
         // Wait for email to appear in search results
         await emailLocator.waitFor({ state: "visible" });
 
         // Get the actual email text
         const actualEmail = await emailLocator.textContent();
 
         // Validate if expected email is present
         if (actualEmail?.includes(expectedEmail)) {
            //  console.log("✅ User List: Inactive user search successful.");
         } else {
             console.error("❌ User List: Inactive user search unsuccessful.");
             throw new Error("Inactive user search failed.");
         }
     }
    
     async activating_inactive_user() {
        await this.page.waitForLoadState("load");
        
        const freshData = TestDataUpdater.getTestData();
        // Click on the "Inactive Users" list button
        await this.page.locator(`xpath=${pageLocators.inactive_list_button}`).click();
    
        // Click the search bar and enter the email
        const inactiveSearch = this.page.locator(`xpath=${pageLocators.inactive_user_search}`);
        await inactiveSearch.click();
        await inactiveSearch.fill(freshData.create_user_email);
        await this.page.waitForTimeout(1000); // Small delay for UI update
    
        // Wait for the email locator to be visible
        const userEmailElement = this.page.locator(`xpath=${pageLocators.first_inactive_user_email}`);
    
        // ✅ Instead of waitForFunction, use Playwright's expect assertion
        await expect(userEmailElement).toHaveText(freshData.create_user_email, { timeout: 5000 });
    
        console.log(`✅ User '${freshData.create_user_email}' found in the inactive list.`);
    
        // Click the edit button once email is confirmed
        const editButton = this.page.locator(`xpath=${pageLocators.first_inactive_user_edit}`);
        if (await editButton.isVisible()) {
            await editButton.click();
            console.log(`✅ Editing inactive user: ${freshData.create_user_email}`);
        } else {
            console.error("❌ Edit button not found.");
            throw new Error("Edit button not found.");
        }
    }
    
    
    
    async activating(){
        await this.page.waitForLoadState("load");
        const activateButton = this.page.locator(`xpath=${userEdit.edit_active_yes}`);

        // Wait until the "Yes" button is visible
        await activateButton.waitFor({ state: "visible" });

        // Click the activate button
        await activateButton.click();

        // console.log("✅ User activation confirmed.");
    }

    async deactivating() {
        await this.page.waitForLoadState("load");
        const deactivateButton = this.page.locator(`xpath=${userEdit.edit_active_no}`);

        // Wait until the "No" button is visible
        await deactivateButton.waitFor({ state: "visible" });

        // Click the deactivate button
        await deactivateButton.click();

        // console.log("✅ User deactivation confirmed.");
    }

    async submit_edit() {
        const submitButton = this.page.locator(`xpath=${userEdit.edit_submit}`);

        // Wait for the submit button to be visible
        await submitButton.waitFor({ state: "visible" });

        // Click the submit button
        await submitButton.click();

        // console.log("✅ Edit form submitted successfully.");
    }

    async search_active_user() {
        await this.page.waitForLoadState("load");   
        const searchField = this.page.locator(`xpath=${pageLocators.active_user_search}`);

        const freshData = TestDataUpdater.getTestData();

        // Wait for the search field to be visible and clickable
        await searchField.waitFor({ state: "visible" });
        await searchField.click();

        // Enter the email into the search field
        await searchField.fill(freshData.create_user_email);
        console.log(`🔍 Searching for active user with email: ${freshData.create_user_email}`);
        await this.page.waitForTimeout(1000);
        // Validate search results
        await this.validateActiveSearch(freshData.create_user_email);
    }

    async search_active_user_and_open() {
        await this.page.waitForLoadState("load");   
        const searchField = this.page.locator(`xpath=${pageLocators.active_user_search}`);

        const freshData = TestDataUpdater.getTestData();

        // Wait for the search field to be visible and clickable
        await searchField.waitFor({ state: "visible" });
        await searchField.click();

        // Enter the email into the search field
        await searchField.fill(freshData.create_user_email);
        console.log(`🔍 Searching for active user with email: ${freshData.create_user_email}`);
        await this.page.waitForTimeout(1000);
        // Validate search results
        await this.validateActiveSearch(freshData.create_user_email);

        // Wait for the email locator to be visible
        const userEmailElement = this.page.locator(`xpath=${pageLocators.first_active_user_email}`);
    
        // ✅ Instead of waitForFunction, use Playwright's expect assertion
        await expect(userEmailElement).toHaveText(freshData.create_user_email, { timeout: 5000 });
    
        console.log(`✅ User '${freshData.create_user_email}' found in the inactive list.`);
    
        // Click the edit button once email is confirmed
        const editButton = this.page.locator(`xpath=${pageLocators.first_active_user_edit}`);
        if (await editButton.isVisible()) {
            await editButton.click();
            console.log(`✅ Editing inactive user: ${freshData.create_user_email}`);
        } else {
            console.error("❌ Edit button not found.");
            throw new Error("Edit button not found.");
        }


    }

    async validateActiveSearch(searchedEmail: string) {
        const resultEmailLocator = this.page.locator(`xpath=${pageLocators.first_active_user_email}`);

        // Wait for the search result to appear and validate
        await resultEmailLocator.waitFor({ state: "visible" });

        const userData = await resultEmailLocator.textContent();
        console.log(`🔍 Found user data: ${userData}`);

        if (userData && userData.includes(searchedEmail)) {
            // console.log("✅ User List: active list: Search Successful");
        } else {
            console.error("❌ User List: active list: Search Unsuccessful");
            throw new Error("Search validation failed: User not found.");
        }
    }

}