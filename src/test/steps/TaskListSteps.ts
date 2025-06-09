import { Given, setDefaultTimeout, BeforeStep } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import TaskListPage from "../../pages/TaskListPage";

setDefaultTimeout(60 * 1000 * 2)
let taskListPage : TaskListPage;
let assert : Assert ; 
      BeforeStep(async function () {
        taskListPage = new TaskListPage(fixture.page);
        assert = new Assert(fixture.page);
      });

      Given("go to task list tab", async function goToTaskListTab() {
          await taskListPage.open_TaskList();
      });

      Given("click on create task", async function clickOnCreateTask() {
        await taskListPage.click_create_task_button();      
        });

     Given("create a task as a provider", async function createATaskAsAProvider() {
        await taskListPage.create_task_provider();      
        });   

     Given("validate the task is present in the active task list", async function validateTheTaskInTheList() {
        await taskListPage.validate_created_task();
     });

     Given("search for the task", async function searchForTheTask() {
        await taskListPage.search_active_task();
     });

     Given("edit the searched task", async function editTheSearchedTask() {
        await taskListPage.edit_active_task();
     });

     Given("validate the edit details in the list", async function validateTheEditDetailsInTheList() {
        await taskListPage.validate_edit_active_task();
     });

     Given("mark the task as completed", async function markTheTaskAsCompleted() {
        await taskListPage.mark_task_complete();
     });

     Given("go to completed task list", async function goToCompletedTaskList() {     
        await taskListPage.open_completed_task_list();
     });

     Given("validate the task is present in completed task list", async function validateTheTaskIsPresentInCompletedTaskList() {
        await taskListPage.validate_completed_task();
     });

     Given("search for the completed task", async function searchForTheCompletedTask() {
        await taskListPage.search_completed_task();
     });

     Given("edit the searched completed task", async function editTheSearchedCompletedTask() {
        await taskListPage.edit_completed_task();
     });

     Given ("mark the task as active", async function markTheCompletedTaskAsActive() {
         await taskListPage.mark_task_active();
       });


    Given("create a task as a provider group admin", async function createATaskAsAProviderGroupAdmin() {
        await taskListPage.create_task_provider_group_admin();
    });

    Given("delete the searched task", async function deleteTheSearchedTask() {
        await taskListPage.delete_active_task();
    });

    Given("validate the task is not present in the active task list", async function validateTheTaskIsNotPresentInTheActiveTaskList() {     
        await taskListPage.validate_not_in_active_task();
    });

    Given("delete the searched completed task", async function deleteTheSearchedCompletedTask() {
        await taskListPage.delete_completed_task();
    });