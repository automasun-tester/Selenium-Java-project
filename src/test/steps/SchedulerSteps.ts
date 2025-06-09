import { Given, When, Then, setDefaultTimeout, Before, BeforeStep } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import SchedulerPage from "../../pages/SchedulerPage";

setDefaultTimeout(60 * 1000 * 2)
let schedulerPage : SchedulerPage;
let assert : Assert ; 
      BeforeStep(async function () {
        schedulerPage = new SchedulerPage(fixture.page);
        assert = new Assert(fixture.page);
      });

        Given("go to scheduler tab", async function go_to_scheduler_tab() {
            await schedulerPage.open_scheduler();
        });   

        Given("create appointment through scheduler", async function create_appt_through_scheduler() {
            await schedulerPage.create_appt_scheduler();
        });    
        
        Given("fill the appointment form through scheduler", async function fill_appt_form_through_scheduler() {
            await schedulerPage.fill_appt_form_scheduler();
        });

        Given("locate the appointment created", async function locateTheAppointmentCreated() {
            await schedulerPage.locate_appt_right_click_for_options();
        });

        Given("check for the providers available for the appointment", async function checkfortheprovidersinscheduler() {
            await schedulerPage.check_for_the_providers_in_scheduler();
        });

        Given("edit the appointment created", async function editTheAppointmentCreated() {
            await schedulerPage.click_edit_and_modify_the_note();
        });

        Given("delete the appointment created", async function deleteTheAppointmentCreated() {
            await schedulerPage.delete_the_appointment();
        });