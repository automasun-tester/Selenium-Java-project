package stepdefs;

import base.BaseClass;
import pages.OfficeSettings;
import io.cucumber.java.Before;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;

import java.io.IOException;

public class OfficeSettingsDefs {
    WebDriver driver;
    OfficeSettings office;
    BaseClass base = new BaseClass();
    @Before
    public void setUp() throws IOException {
        base.setup();
        driver = BaseClass.getDriver();  // Use the WebDriver instance from baseclass
        office = new OfficeSettings(driver); // Pass the WebDriver instance to UserList
        office.setup();
    }
    @When("go to office settings")
    public void goToOfficeSettings() throws InterruptedException {
        office.open_office_settings();
    }

    @When("click on create appointment type button")
    public void clickOnCreateAppointmentTypeButton() {
        office.click_create_appt_type_button();
    }

    @When("create appointment type")
    public void createAppointmentType() {
        office.create_appt_type();
    }

    @When("validate appointment type created")
    public void validateAppointmentTypeCreated() {
        office.validate_appt_type_create();
    }

    @When("edit the appointment type")
    public void editTheAppointmentType() {
        office.edit_appt_type();
    }

    @When("validate edit appointment type")
    public void validateEditAppointmentType() {
        office.validate_edit_appt();
    }

    @When("delete the appointment type")
    public void deleteTheAppointmentType() throws InterruptedException {
        office.delete_appt_type();
    }
}
