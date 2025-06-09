import { Given, When, Then, setDefaultTimeout, Before, BeforeStep } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import UserPage from "../../pages/UserPage";

setDefaultTimeout(60 * 1000 * 2)
let userPage : UserPage;
let assert : Assert ; 
      BeforeStep(async function () {
        userPage = new UserPage(fixture.page);
        assert = new Assert(fixture.page);
      });


      Given("go to user page", async function gotoUserPage() {
          await userPage.Open_UserList();
      });

      Given("go to user create page", async function go_to_user_create_page() {     
          await userPage.user_create_button();
      });

      Given("fill the user create form", async function fill_the_user_create_form() {
        await userPage.fill_user_create_form();
      });

      Given("validate the created user in inactive list", async function validate_the_create_user_in_inactive_list() {
        await userPage.search_inactive_user();
      });

      Given("superadmin- search the user in inactive list", async function superadmin_search_the_user_in_inactive_list() {
        await userPage.activating_inactive_user();
      });

      Given("activate the user", async function activate_the_user() {
        await userPage.activating();
      });

      
      Given("deactivate the user", async function deactivate_the_user() {
        await userPage.deactivating();
      });

      Given("Submit edit user changes", async function Submit_edit_user_changes() {
        await userPage.submit_edit();
      });

      Given("validate the created user in active list", async function validate_the_created_user_in_active_list() {
        await userPage.search_active_user();
      });

      Given("superadmin- search the user in active list", async function search_for_the_user_in_active_list() {
        await userPage.search_active_user_and_open();
      });