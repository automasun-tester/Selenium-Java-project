import { Given, When, Then, setDefaultTimeout, Before, BeforeStep } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import CreateCasePage from "../../pages/CreateCasePage";

setDefaultTimeout(60 * 1000 * 2)
let createCasePage : CreateCasePage;
let assert : Assert ; 
      BeforeStep(async function () {
        createCasePage = new CreateCasePage(fixture.page);
        assert = new Assert(fixture.page);
      });

      Given("fill the case create form and submit", async function () {
        await createCasePage.fillForm();
    });
    
    // ✅ Step Definition: Fill Case Form for Group Admin
    When("fill the case create form for group admin and submit", async function () {
        await createCasePage.fillFormForGroupAdmin();
    });
    
    // ✅ Step Definition: Fill Case Form with Duplicate DOI & DOB
    When("fill the case create form with duplicate details DOI and DOB", async function () {
        await createCasePage.fillFormWithDuplicateDOIDOB();
    });
    
    // ✅ Step Definition: Fill Case Form with Duplicate DOB & SSN
    When("fill the case create form with duplicate details DOB and SSN", async function () {
        await createCasePage.fillFormWithDuplicateSSNDOB();
    });  