import { Given, setDefaultTimeout, BeforeStep } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import OfficeDetailPage from "../../pages/OfficeDetailPage";

setDefaultTimeout(60 * 1000 * 2)
let officeDetailPage : OfficeDetailPage;
let assert : Assert ; 
      BeforeStep(async function () {
        officeDetailPage = new OfficeDetailPage(fixture.page);
        assert = new Assert(fixture.page);
      });


      Given("capture the data of provider office before test", async function captureTheDataOfProviderOfficeBeforeTest() {
        await officeDetailPage.capture_provider_details_BT();
      });

      Given("capture the data for attorney office before test", async function captureTheDataForAttorneyOfficeBeforeTest() {
        await officeDetailPage.capture_attorney_details_BT();
      });

      Given("capture the data of provider office after test", async function captureTheDataOfProviderOfficeAfterTest() {
        await officeDetailPage.capture_provider_details_AT();
      });

        Given("capture the data for attorney office after test", async function captureTheDataForAttorneyOfficeAfterTest() {
            await officeDetailPage.capture_attorney_details_AT();
        });

        Given("compare the office detail data", async function compareTheOfficeDetailData() {
            await officeDetailPage.compare_office_details();
        });



