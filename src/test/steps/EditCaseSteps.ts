import { Given, When, Then, setDefaultTimeout, Before, BeforeStep } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import EditCasePage from "../../pages/EditCasePage";

setDefaultTimeout(60 * 1000 * 2)
let editCasePage : EditCasePage;
let assert : Assert ; 
      BeforeStep(async function () {
        editCasePage = new EditCasePage(fixture.page);
        assert = new Assert(fixture.page);
      });

      Given("delete the test case", async function () {
        await editCasePage.delete_the_case();
    });  
       Given("delete the test case from group login", async function () {
        await editCasePage.delete_the_case_from_group_login();
    });  

    Given("Edit the case changes", async function EdittheCaseChanges() {
        await editCasePage.editing_case_details();
    });
   