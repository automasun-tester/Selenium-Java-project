import { Given, setDefaultTimeout, BeforeStep } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import CreateOfficePage from "../../pages/CreateOfficePage";

setDefaultTimeout(60 * 1000 * 2)
let createOfficePage : CreateOfficePage;
let assert : Assert ; 
      BeforeStep(async function () {
        createOfficePage = new CreateOfficePage(fixture.page);
        assert = new Assert(fixture.page);
      });
      
      
    Given("fill the office create form for provider", async function fill_the_office_create_form_for_provider() {
    await createOfficePage.fill_form_create_office_provider();
    });


    Given("fill the office create form for Attorney", async function fill_the_office_create_form_for_Attorney() {
    await createOfficePage.fill_form_create_office_attorney();
    });