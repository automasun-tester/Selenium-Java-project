import { Given, setDefaultTimeout, BeforeStep } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import EditOfficePage from "../../pages/EditOfficePage";

setDefaultTimeout(60 * 1000 * 2)
let editOfficePage : EditOfficePage;
let assert : Assert ; 
      BeforeStep(async function () {
        editOfficePage = new EditOfficePage(fixture.page);
        assert = new Assert(fixture.page);
      });


      Given("activate office", async function activate_the_office() {
        await editOfficePage.activating_office();
      });

      Given("delete the office", async function delete_the_office() {
        await editOfficePage.deleting_office();
      });

      Given("deactivate office", async function deactivate_the_office() {
        await editOfficePage.deactivating_office();
      });

    Given("submit the edit office form", async function submit_The_Edit_Office_Form() {
    await editOfficePage.submit_edit_office();
    });


    


