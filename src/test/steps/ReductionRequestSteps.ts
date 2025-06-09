import { Given, When, Then, setDefaultTimeout, Before, BeforeStep } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import ReductionRequestPage from "../../pages/ReductionRequestPage";

setDefaultTimeout(60 * 1000 * 2)
let reductionRequestPage : ReductionRequestPage;
let assert : Assert ; 
      BeforeStep(async function () {
        reductionRequestPage = new ReductionRequestPage(fixture.page);
        assert = new Assert(fixture.page);
      });


      Given("go to reduction request tab", async function () {
        await reductionRequestPage.open_reduction_request();
    });   

    Given("validate needs response provider", async function () {
      await reductionRequestPage.validate_needs_request_provider();
  }); 
   
    Given("check case in waiting for response from attorney", async function () {
      await reductionRequestPage.check_case_waiting_response_attorney();
    });

    Given("open the offer case", async function () {
      await reductionRequestPage.open_offer_case();
    });
    
    Given("validate needs response attorney", async function () {
      await reductionRequestPage.validate_needs_request_attorney();
    });

    Given("check case in waiting for response from provider", async function () {
      await reductionRequestPage.check_case_waiting_response_provider();
    });

    Given("check the visibiliy of the table data for waiting on response",async function (){
      await reductionRequestPage.visibility_check_waiting_on_response();
    });


    Given("check the visibiliy of the table data for needs response", async function() {
      await reductionRequestPage.visibility_check_needs_resposne();
    });

  