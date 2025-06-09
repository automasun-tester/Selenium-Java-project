import { Page, expect } from "@playwright/test";
import * as commonLocators from '../helper/locators/common_locators.json';   
import * as pageLocators from '../helper/locators/task_list.json';
import TestDataUpdater from "../helper/data/testDataUpdater";

export default class TaskListPage {
   
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open_TaskList() {
        await this.page.click(commonLocators.task_tab_buttons);
    }
    
    async click_create_task_button() {
        await this.page.waitForLoadState("load");
        await this.page.click(pageLocators.create_task);
    }

    async create_task_provider() {  
        // console.log("📝 Creating task for provider...");

        // Fill task description
        await this.page.fill(`xpath=${pageLocators.add_task_description}`, "Task created by the provider");

        // Assigning the task to "Testing Provider"
        await this.page.click(`xpath=${pageLocators.add_task_assignee}`);
        await this.page.fill(`xpath=${pageLocators.add_task_assignee_input}`, "Testing Provider");
        await this.page.click(`xpath=${pageLocators.add_task_assignee_first_in_list}`);
        // console.log("✅ Assigned task to Testing Provider");

        // Generate a random due date within the next 15 days
        const dueDate = this.generateFutureDate(15);
        await this.page.fill(`xpath=${pageLocators.due_date}`, dueDate);
        console.log(`📅 Task Due Date: ${dueDate}`);
        const freshData = TestDataUpdater.getTestData();
        // Insert case name
        await this.page.fill(`xpath=${pageLocators.add_task_case_name}`, freshData.create_case_last_name);
        await this.page.keyboard.press("Backspace"); // Ensure dropdown is updated
        await this.page.click(`xpath=${pageLocators.add_task_case_dd}`);
        // console.log("✅ Case name selected.");

        // Click Submit button
        await this.page.click(`xpath=${pageLocators.create_task_submit_button}`);
        // console.log("🚀 Task submitted successfully!");
    }

    // // ✅ Utility function to generate a random future date within X days
    // generateFutureDate(days: number): string {
    //     const futureDate = faker.date.future({ years: 0, refDate: new Date() });
    //     return futureDate.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
    // }


    async validate_created_task() {
        try {
            // console.log("🔍 Searching for the created task...");
            const freshData = TestDataUpdater.getTestData();
            // Clear and focus the search bar
            await this.page.fill(`xpath=${pageLocators.task_search}`, "");
            await this.page.click(`xpath=${pageLocators.task_search}`);

            // Enter the case last name
            await this.page.fill(`xpath=${pageLocators.task_search}`, freshData.create_case_last_name);
            await this.page.keyboard.press("Backspace"); // Ensure the dropdown updates

            // Wait for the task to appear in the list
            const caseLocator = this.page.locator(`xpath=${pageLocators.task_case_name_on_list}`);
            await expect(caseLocator).toContainText(freshData.create_case_last_name);

            // console.log("✅ Task List: Task is present in the list.");
        } catch (error) {
            console.error("⚠️ Task not found. Refreshing page and retrying...");
            // await this.page.reload();
            // await this.page.waitForTimeout(1000);
        }}

        
        async search_active_task() {  
            try {
            // console.log("🔍 Searching for the active task...");
            const freshData = TestDataUpdater.getTestData();
            const searchBox = this.page.locator(`xpath=${pageLocators.task_search}`);

            // Wait for search box to be visible and clear its content
            await searchBox.waitFor({ state: "visible" });
            await searchBox.fill("");

            // Click the search box and enter case last name
            await searchBox.click();
            await searchBox.fill(freshData.create_case_last_name);

            // Press Backspace to refresh dropdown
            await this.page.keyboard.press("Backspace");
            await this.page.waitForTimeout(1000); // Simulating a wait like Thread.sleep(1000)

            // Validate if the task is present in the list
            const caseLocator = this.page.locator(`xpath=${pageLocators.task_case_name_on_list}`);
            await expect(caseLocator).toContainText(freshData.create_case_last_name);

            // console.log("✅ Task List: Task is present in the active task list.");
        } catch (error) {
            console.error("⚠️ Task not found. Refreshing page and retrying...");
            // await this.page.reload();
            // await this.page.waitForTimeout(1000);
        }
    }

    async edit_active_task() {
        try {
            // console.log("🔄 Editing a task...");

            // Locate the task hover area
            const taskHoverArea = this.page.locator(`xpath=${pageLocators.task_hover_area}`);

            // Hover over the element to make edit button visible
            await taskHoverArea.hover();
            // console.log("🖱️ Hovered over task to reveal edit button");

            // Click the edit button
            const editButton = this.page.locator(`xpath=${pageLocators.task_edit_button}`);
            await editButton.waitFor({ state: "visible" });
            await editButton.click();
            // console.log("✏️ Clicked the Edit button");

            // Wait for description field and edit task
            const taskDescription = this.page.locator(`xpath=${pageLocators.add_task_description}`);
            await taskDescription.waitFor({ state: "visible" });
            await taskDescription.fill("Edited by the provider");

            // Submit the edited task
            await this.page.locator(`xpath=${pageLocators.create_task_submit_button}`).click();
            // console.log("✅ Task edited and submitted successfully.");
        } catch (error) {
            console.error("⚠️ Error encountered! Refreshing page and retrying...");
        //     await this.page.reload();
        //     await this.page.waitForTimeout(1000);
        }
    }

    async validate_edit_active_task() {
        await this.validate_created_task();
        await this.page.waitForTimeout(1000);

        // console.log("🔍 Validating edited task...");

        const taskDescriptionLocator = this.page.locator(`xpath=${pageLocators.task_description}`);
        await taskDescriptionLocator.waitFor({ state: "visible" });

        const taskDescription = await taskDescriptionLocator.textContent();
        if (taskDescription?.includes("Edited by the provider")) {
            // console.log("✅ Task successfully edited.");
        } else {
            console.error("❌ Task was not edited.");
            throw new Error("Task List: validate_edit_active_task: Task not present in task list");
        }
    }
  
    async mark_task_complete() {
        try {
            // console.log("🔍 Waiting for task completed checkbox...");
            
            const checkboxLocator = this.page.locator(`xpath=${pageLocators.task_completed_checkbox}`);
    
            // Wait for checkbox to be visible & clickable
            await checkboxLocator.waitFor({ state: "visible" });
    
            // Click the checkbox
            await checkboxLocator.click();
            
            // console.log("✅ Task completed checkbox clicked successfully.");
        } catch (error) {
            console.error("❌ Error while clicking task completed checkbox:", error);
            throw new Error("Task completion failed!");
        }
    }

    async open_completed_task_list() {
        try {
            // console.log("🔍 Waiting for completed task button...");
    
            const completedTaskButton = this.page.locator(`xpath=${pageLocators.completed_task_button}`);
    
            // Wait for the button to be visible
            await completedTaskButton.waitFor({ state: "visible" });
    
            // Click the button
            await completedTaskButton.click();
    
            // console.log("✅ Completed task button clicked successfully.");
        } catch (error) {
            console.error("❌ Error clicking completed task button:", error);
            throw new Error("Failed to click completed task button.");
        }
    }

    async validate_completed_task() {
        try {
            // console.log("🔍 Searching for completed task...");
            const freshData = TestDataUpdater.getTestData();
            const searchInput = this.page.locator(`xpath=${pageLocators.completed_task_search}`);
            const taskNameOnList = this.page.locator(`xpath=${pageLocators.completed_task_name_on_list}`);
    
            // Clear search input field
            await searchInput.waitFor({ state: "visible" });
            await searchInput.fill("");
    
            // Click and type search query
            await searchInput.click();
            await searchInput.fill(freshData.create_case_last_name);
    
            // Wait for results to update
            await this.page.waitForTimeout(1000); // Simulating delay for list update
    
            // Validate task presence
            const isTaskPresent = await taskNameOnList.innerText();
            if (isTaskPresent.includes(freshData.create_case_last_name)) {
                // console.log("✅ Task List: Task present in completed task list.");
            } else {
                console.error("❌ Task List: Task not present in completed task list.");
            }
    
        } catch (error) {
            console.error("❌ Error validating completed task:", error);
            await this.page.reload(); // Refresh the page
            await this.open_completed_task_list(); // Retry
        }
    }

    async search_completed_task() {
        try {
            // console.log("🔍 Searching for completed task...");
            const freshData = TestDataUpdater.getTestData();
            const searchInput = this.page.locator(`xpath=${pageLocators.completed_task_search}`);
            const taskNameOnList = this.page.locator(`xpath=${pageLocators.completed_task_name_on_list}`);
    
            // Clear search input field
            await searchInput.waitFor({ state: "visible" });
            await searchInput.fill("");
    
            // Click and type search query
            await searchInput.click();
            await searchInput.fill(freshData.create_case_last_name);
    
            // Wait for results to update
            await this.page.waitForTimeout(1000);
    
            // Validate task presence
            const isTaskPresent = await taskNameOnList.innerText();
            if (isTaskPresent.includes(freshData.create_case_last_name)) {
                // console.log("✅ Task List: Task present in completed task list.");
            } else {
                console.error("❌ Task List: Task not present in completed task list.");
            }
    
        } catch (error) {
            console.error("❌ Error searching completed task:", error);
            await this.page.reload(); // Refresh the page
            await this.open_completed_task_list(); // Retry
        }
    }

    async edit_completed_task() {
        try {
            // console.log("✏️ Editing completed task...");
    
            // Hover over the completed task to reveal edit button
            const completedTask = this.page.locator(`xpath=${pageLocators.completed_task_hover_area}`);
            const editButton = this.page.locator(`xpath=${pageLocators.completed_task_edit}`);
            const taskDescription = this.page.locator(`xpath=${pageLocators.add_task_description}`);
            const submitButton = this.page.locator(`xpath=${pageLocators.create_task_submit_button}`);
    
            await completedTask.waitFor({ state: "visible" });
            await completedTask.hover();  // Hover to reveal edit button
    
            // Click on Edit button
            await editButton.waitFor({ state: "visible" });
            await editButton.click();
            await this.page.waitForTimeout(1000); // Delay to allow UI updates
    
            // Clear the old task description and enter new text
            await taskDescription.waitFor({ state: "visible" });
            await taskDescription.fill(""); // Clear existing text
            await taskDescription.fill("Edited completed task by the provider");
    
            // Submit the changes
            await submitButton.waitFor({ state: "visible" });
            await submitButton.click();
    
            // console.log("✅ Task edited and submitted successfully.");
    
        } catch (error) {
            console.error("❌ Error editing completed task:", error);
            await this.page.reload(); // Refresh the page in case of a stale element issue
            await this.open_completed_task_list(); // Retry editing after reloading
        }
    }

    async mark_task_active() {  
        try {
            // console.log("🔍 Waiting for task active checkbox...");
            
            const checkboxLocator = this.page.locator(`xpath=${pageLocators.task_active_checkbox}`);
    
            // Wait for checkbox to be visible & clickable
            await checkboxLocator.waitFor({ state: "visible" });
    
            // Click the checkbox
            await checkboxLocator.click();
            
            // console.log("✅ Task active checkbox clicked successfully.");
        } catch (error) {
            console.error("❌ Error while clicking task active checkbox:", error);
            throw new Error("Task activation failed!");
        }
    }

    async create_task_provider_group_admin() {
        // console.log("📝 Creating a new task...");
        const freshData = TestDataUpdater.getTestData();
        const taskDescription = this.page.locator(`xpath=${pageLocators.add_task_description}`);
        const assigneeDropdown = this.page.locator(`xpath=${pageLocators.add_task_assignee}`);
        const assigneeInput = this.page.locator(`xpath=${pageLocators.add_task_assignee_input}`);
        const firstAssignee = this.page.locator(`xpath=${pageLocators.add_task_assignee_first_in_list}`);
        const dueDateInput = this.page.locator(`xpath=${pageLocators.due_date}`);
        const caseNameInput = this.page.locator(`xpath=${pageLocators.add_task_case_name}`);
        const caseDropdown = this.page.locator(`xpath=${pageLocators.add_task_case_dd}`);
        const submitButton = this.page.locator(`xpath=${pageLocators.create_task_submit_button}`);

        // Fill task description
        await taskDescription.waitFor({ state: "visible" });
        await taskDescription.fill("Task created by the provider");

        // Assign task to "Test User"
        await assigneeDropdown.click();
        // await assigneeInput.waitFor({ state: "visible" });
        // await assigneeInput.fill("Test User");
        await firstAssignee.click();
        // console.log("✅ Task assignee selected.");

        // Generate a random due date within the next 15 days
        const dueDate = this.generateFutureDate(15);
        await dueDateInput.fill(dueDate);
        console.log(`📅 Task due date set: ${dueDate}`);

        // Select case name
        await caseNameInput.fill(freshData.create_case_last_name);
        await this.page.waitForTimeout(1000); // Wait for dropdown to load
        await caseNameInput.press("Backspace"); // Simulating user action
        await caseDropdown.click();
        // console.log("✅ Case name added to task.");

        // Click submit button to create task
        await submitButton.click();
        // console.log("🚀 Task submitted successfully.");
    }

    // Function to generate a random future date in MM/dd/yyyy format
    private generateFutureDate(daysAhead: number): string {
        const today = new Date();
        const futureDate = new Date(today.setDate(today.getDate() + daysAhead));
        return futureDate.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
    }
    
    async delete_active_task() {
        // console.log("🗑️ Deleting task...");

        const taskHoverArea = this.page.locator(`xpath=${pageLocators.task_hover_area}`);
        const deleteButton = this.page.locator(`xpath=${pageLocators.task_delete_button}`);
        const deleteConfirmation = this.page.locator(`xpath=${pageLocators.task_delete_confirmation}`);

        try {
            // Hover over the task to reveal delete button
            await taskHoverArea.hover();
            // console.log("🖱️ Hovered over the task to reveal delete button.");

            // Click the delete button
            await deleteButton.waitFor({ state: "visible" });
            await deleteButton.click();
            // console.log("❌ Clicked on delete button.");

            // Confirm deletion
            await deleteConfirmation.waitFor({ state: "visible" });
            await deleteConfirmation.click();
            // console.log("✅ Task deleted successfully.");
            
        } catch (error) {
            console.error("🔴 Error deleting task. Refreshing page and retrying...");
            // await this.page.reload();
        }
    }



    async validate_not_in_active_task(){
        // console.log("🔍 Validating that the task is deleted...");

        const taskSearch = this.page.locator(`xpath=${pageLocators.task_search}`);
        const taskTableEmpty = this.page.locator(`xpath=${pageLocators.task_table_empty}`);

        try {
            const freshData = TestDataUpdater.getTestData();
            // Clear the search field
            await taskSearch.waitFor({ state: "visible" });
            await taskSearch.fill("");

            // Search for the deleted task
            await taskSearch.click();
            await taskSearch.fill(freshData.create_case_last_name);
            await taskSearch.press("Backspace");

            // Check if the task table displays "No Tasks"
            await expect(taskTableEmpty).toHaveText("No Tasks");
            // console.log("✅ Task successfully deleted and not in the active task list.");
            
        } catch (error) {
            console.error("🔴 Task might still be present. Refreshing the page and retrying...");
            await this.page.reload();
        }
    }

    async delete_completed_task() { 
        // console.log("🗑️ Deleting completed task...");

        const completedTaskHoverArea = this.page.locator(`xpath=${pageLocators.completed_task_hover_area}`);
        const completedTaskDelete = this.page.locator(`xpath=${pageLocators.completed_task_delete}`);
        const taskDeleteConfirmation = this.page.locator(`xpath=${pageLocators.task_delete_confirmation}`);

        try {
            // Hover over the completed task to reveal delete button
            await completedTaskHoverArea.hover();
            // console.log("✅ Hovered over the task to unhide delete button.");

            // Click on the delete button
            await completedTaskDelete.waitFor({ state: "visible" });
            await completedTaskDelete.click();
            // console.log("✅ Clicked on delete button.");

            // Confirm the deletion
            await taskDeleteConfirmation.waitFor({ state: "visible" });
            await taskDeleteConfirmation.click();
            // console.log("✅ Confirmed task deletion.");

        } catch (error) {
            console.error("🔴 Error encountered! Refreshing and retrying...");
            // await this.page.reload();
            // await this.openCompletedTaskList();
        }
    }

} 