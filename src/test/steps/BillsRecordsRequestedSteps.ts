import { Given, When, Then, setDefaultTimeout, Before, BeforeStep } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import BillsRecordsRequestedPage from "../../pages/BillsRecordsRequestedPage";

setDefaultTimeout(60 * 1000 * 2)
let billsRecordsRequestedPage : BillsRecordsRequestedPage;
let assert : Assert ; 
      BeforeStep(async function () {
        billsRecordsRequestedPage = new BillsRecordsRequestedPage(fixture.page);
        assert = new Assert(fixture.page);
      });


        Given("go to bills records requested tab", async function () {
            await billsRecordsRequestedPage.goToBillsRecordsTab();
        });

        Given("search for requested records case", async function () {
          await billsRecordsRequestedPage.searchRequestRecordsCase();
      });

        Given("check request generated on bills records tab", async function () {
         await billsRecordsRequestedPage.checkRequestBillsRecords();
        });

        Given("open the requested records case", async function () {
          await billsRecordsRequestedPage.openRequestedRecordsCase();
        });

        Given("Verify the count of bills and records requested", async function () {
          await billsRecordsRequestedPage.verifyCountOfBillsAndRecordsRequested();
        });

        Given("verify No duplicate rows appear", async function () {
          await billsRecordsRequestedPage.verifyNoDuplicateRowsAppear();
        });
      
      


