package stepdefs;

import base.BaseClass;
import pages.TaskList;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;

import java.io.IOException;

public class TaskListDefs {
    WebDriver driver;
    TaskList task_obj;
    BaseClass base = new BaseClass();
    @Before
    public void setUp() throws IOException {
        base.setup();
        driver = BaseClass.getDriver();  // Use the WebDriver instance from baseclass
        task_obj = new TaskList(driver); // Pass the WebDriver instance to UserList
        task_obj.setup();
    }

    @Given("go to task list tab")
    public void goto_tasklist_tab() {
        task_obj.open_TaskList();
    }

    @When("click on create task")
    public void clickOnCreateTask() throws InterruptedException { task_obj.click_create_task_button();
    }

    @When("create a task as a provider")
    public void createATaskAsAProvider() throws InterruptedException { task_obj.create_task_provider();
    }

    @When("validate the task is present in the active task list")
    public void validateTheTaskInTheList() throws InterruptedException { task_obj.validate_created_task();
    }

    @When("search for the task")
    public void searchForTheTask() throws InterruptedException { task_obj.search_active_task();
    }

    @When("edit the searched task")
    public void editTheSearchedTask() throws InterruptedException { task_obj.edit_active_task();
    }

    @When("validate the edit details in the list")
    public void validateTheEditDetailsInTheList() throws InterruptedException { task_obj.validate_edit_active_task();
    }

    @When("mark the task as completed")
    public void markTheTaskAsCompleted() throws InterruptedException { task_obj.mark_task_complete();
    }

    @When("go to completed task list")
    public void goToCompletedTaskList() { task_obj.open_completed_task_list();
    }

    @When("validate the task is present in completed task list")
    public void validateTheTaskIsPresentInCompletedTaskList() throws InterruptedException { task_obj.validate_completed_task();
    }

    @When("search for the completed task")
    public void searchForTheCompletedTask() throws InterruptedException { task_obj.search_completed_task();
    }

    @When("edit the searched completed task")
    public void editTheSearchedCompletedTask() throws InterruptedException {  task_obj.edit_completed_task();
    }

    @When("validate the edit details of completed task")
    public void validateTheEditDetailsOfCompletedTask() throws InterruptedException { task_obj.validate_edit_completed_task();
    }

    @When("mark the task as active")
    public void markTheTaskAsActive() { task_obj.mark_task_active();
    }

    @When("validate the task is not present in completed task list")
    public void validateTheTaskIsNotPresentInCompletedTaskList() throws InterruptedException { task_obj.validate_not_in_completed_task();
    }

    @When("delete the searched task")
    public void deleteTheSearchedTask() throws InterruptedException { task_obj.delete_active_task();
    }

    @When("validate the task is not present in the active task list")
    public void validateTheTaskIsNotPresentInTheActiveTaskList() throws InterruptedException { task_obj.validate_not_in_active_task();
    }

    @When("delete the searched completed task")
    public void deleteTheSearchedCompletedTask() throws InterruptedException { task_obj.delete_completed_task();
    }

    @When("create a task as a provider group admin")
    public void createATaskAsAProviderGroupAdmin() throws InterruptedException {  task_obj.create_task_provider_group_admin();
    }
}
