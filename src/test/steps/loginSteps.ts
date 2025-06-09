import { Given, When, Then, setDefaultTimeout, Before, BeforeStep } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import LoginPage from "../../pages/loginPage";

setDefaultTimeout(60 * 1000 * 2)
let login : LoginPage;
let assert : Assert ; 
      BeforeStep(async function () {
        login = new LoginPage(fixture.page);
        assert = new Assert(fixture.page);
      });
    Given('login as provider and password', async function () {
        await fixture.page.goto(process.env.BASEURL);
        await login.login('provider');
        });
        
    Given('login as attorney and password', async function () {
      await fixture.page.goto(process.env.BASEURL);
      await login.login('attorney');
       });
      
    Given('login as attorney group and password', async function () {
         await fixture.page.goto(process.env.BASEURL);
         await login.login('attorney group');
       });
      
    Given('login as provider group and password', async function () {
         await fixture.page.goto(process.env.BASEURL);
         await login.login('provider group');
       });
      
    Given('login as superadmin and password', async function () {
          await fixture.page.goto(process.env.BASEURL);
          await login.login('superadmin');
        });

        Given("login as provider gcc and password", async function () {
          await fixture.page.goto(process.env.BASEURL);
          await login.login('provider gcc');
        });
      
    Given('logout', async function () {
         await login.logout();
       });  
      