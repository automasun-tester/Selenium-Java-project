import { Given, When, Then, setDefaultTimeout, Before, BeforeStep } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import CaseListPage from "../../pages/CaseListPage";

setDefaultTimeout(60 * 1000 * 2)
let caseListPage : CaseListPage;
let assert : Assert ; 
      BeforeStep(async function () {
        caseListPage = new CaseListPage(fixture.page);
        assert = new Assert(fixture.page);
      });

      Given("go to case create page", async function () {
        await caseListPage.CreateCaseButton();
    });

    Given("go to case list page", async function goToCaseListPage() {
        await caseListPage.go_to_case_list();
    });

    Given("search for test case", async function () {
        await caseListPage.searchCase();
    });

    Given("open the case detail page for the searched case", async function () {
      await caseListPage.openCase();
  });
    Given("search for test case from group admin", async function () {
      await caseListPage.searchProviderGroup();
    });

    Given("search for test case from group admin and open", async function () {
      await caseListPage.searchProviderGroupandOpen();
    });

    Given("get tile values", async function () {
      await caseListPage.getTileValues();
    });

    Given("click on closed cases", async function clickOnCompleteCases() {
      await caseListPage.open_closed_cases();
    });

    Given("search for the closed case provider", async function searchForTheCompletedCaseProvider() {
      await caseListPage.search_closed_case_provider();
    });

    Given("search for the closed case attorney", async function searchForTheCompletedCaseAttorney() {
      await caseListPage.search_closed_case_attorney();
    });

    Given("open case detail for the completed case", async function openCaseDetailForTheCompletedCase() {
      await caseListPage.openCaseDetailForTheCompletedCase();
    });

    Given("validating the case is not present in open case list", async function validatingTheCaseIsNotPresentInOpenCaseList() {
      await caseListPage.validateCaseIsNotPresentInOpenCaseList();
    });

    Given("open bad cases tab", async function openBadCasesTab() {
      await caseListPage.openBadCasesTab();
    });

    Given("validate the bad cases are visible", async function validateTheBadCasesAreVisible() {
      await caseListPage.validateBadCasesAreVisible();
    });

    Given("go to profile settings page", async function goToProfileSettingsPage() {
      await caseListPage.goToProfileSettingsPage();
    });

    Given("check the case list for the most recently accessed case", async function checkTheCaseListForTheMostRecentlyAccessedCase() {
      await caseListPage.checkTheCaseListForTheMostRecentlyAccessedCase();
    });

    Given("check for the case list for the recently accessed case should not be at the top", async function checkForTheCaseListForTheRecentlyAccessedCaseShouldNotBeAtTheTop() {
      await caseListPage.checkForTheCaseListForTheRecentlyAccessedCaseShouldNotBeAtTheTop();
    });


    