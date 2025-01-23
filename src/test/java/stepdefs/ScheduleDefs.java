package stepdefs;

import base.BaseClass;
import pages.Schedule;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;

import java.io.IOException;

public class ScheduleDefs {
    WebDriver driver;
    Schedule appt;
    BaseClass base = new BaseClass();

    @Before
    public void setUp() throws IOException {
        base.setup();
        driver = BaseClass.getDriver();  // Use the WebDriver instance from baseclass
        appt = new Schedule(driver); // Pass the WebDriver instance to UserList
        appt.setup();
    }
//#1075-branch-start
    @Given("go to scheduler tab")
    public void go_to_scheduler_tab() {
        appt.open_scheduler();
    }

    @Given("create appointment through scheduler")
    public void create_appt_through_scheduler() {
        appt.create_appt_scheduler();
    }

    @Given("fill the appointment form through scheduler")
    public void fill_appt_form_through_scheduler() {
        appt.fill_appt_form_scheduler();
    }

    @When("locate the appointment created")
    public void locateTheAppointmentCreated() {
        appt.locate_appt_right_click_for_options();
    }

    @When("edit the appointment created")
    public void editTheAppointmentCreated() {
        appt.click_edit_and_modify_the_note();
    }

    @When("delete the appointment created")
    public void deleteTheAppointmentCreated() {
        appt.delete_the_appointment();
    }
//    #1075-branch-end
}

