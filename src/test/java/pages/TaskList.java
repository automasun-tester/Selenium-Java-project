package pages;

import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import static base.BaseClass.*;
@Slf4j
public class TaskList {
    private final WebDriver driver;
    private static final Properties task_loc = new Properties();
    private WebDriverWait wait;

    public TaskList(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 10); // Increased wait time to 10 seconds
    }


    public void setup() throws IOException {
        File taskpage = new File("src/test/resources/Config/task_list.properties");
        if (taskpage.exists()) {
            FileReader UserList_loc = new FileReader(taskpage);

            task_loc.load(UserList_loc);
            log.info("Task_List :Config properties loaded successfully.");
        } else {
            throw new FileNotFoundException("Task_List :Config file not found at " + taskpage.getPath());
        }
    }

    public void open_TaskList() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(loc.getProperty("task_tab_buttons")))).click();
        log.info("Task List: Clicked on the Task List Tab");
    }

    public void click_create_task_button() throws InterruptedException {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("create_task")))).click();
        log.info("Task List: Clicked on create task button");
        Thread.sleep(1000);
    }


    public void create_task_provider() throws InterruptedException {

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("add_task_description")))).sendKeys("task created by the provider");
        //assigning the task to Dr. Soni Gcc
        driver.findElement(By.xpath(task_loc.getProperty("add_task_assignee"))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("add_task_assignee_input")))).sendKeys("Dr. Soni Gcc");
        driver.findElement(By.xpath(task_loc.getProperty("add_task_assignee_first_in_list"))).click();
        log.info("Task List: adding assignee to the task");
// Generate a random date due date within next 15 days
        Date date = random.date().future(15, TimeUnit.DAYS);
        // Format the date to MM/dd/yyyy
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        String duedate = dateFormat.format(date);
        // inserting the due date
        driver.findElement(By.xpath(task_loc.getProperty("due_date"))).sendKeys(duedate);
        log.info("Task List: Due date generated... inserting it in the task");

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("add_task_case_name")))).sendKeys(store.getProperty("create_case_last_name"));
        Thread.sleep(1000);
//        if(driver.findElement(By.xpath(task_loc.getProperty("add_task_case_dd"))).isDisplayed())
//            driver.findElement(By.xpath(task_loc.getProperty("add_task_case_dd"))).click();
////            wait.until(ExpectedConditions.elementToBeClickable(By.xpath(task_loc.getProperty("add_task_case_dd")))).click();
//        else {
        driver.findElement(By.xpath(task_loc.getProperty("add_task_case_name"))).sendKeys(Keys.BACK_SPACE);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("add_task_case_dd")))).click();
//        }
//        driver.findElement(By.xpath(task_loc.getProperty("add_task_case_dd"))).click();
        log.info("Task List: Creating task... adding case name");


        //clicking on submit
        driver.findElement(By.xpath(task_loc.getProperty("create_task_submit_button"))).click();
        log.info("Task List: Submitting...");


    }

    public void validate_created_task() throws InterruptedException {
//        for (int i = 0; i < 3; i++) {
            try {
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("task_search")))).clear();
                wait.until(ExpectedConditions.elementToBeClickable(By.xpath(task_loc.getProperty("task_search")))).click();
                driver.findElement(By.xpath(task_loc.getProperty("task_search"))).sendKeys(store.getProperty("create_case_last_name"));
                driver.findElement(By.xpath(task_loc.getProperty("task_search"))).sendKeys(Keys.BACK_SPACE);
                if (wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(task_loc.getProperty("task_case_name_on_list")), store.getProperty("create_case_last_name")))) {
                    log.info("Task List:validate_created_task: Task present in task list");
//                    break;
                } else {
                    log.error("Task List:validate_created_task: Task not present in task list");
                }
            } catch (Exception e) {
                driver.navigate().refresh();
                Thread.sleep(1000);
            }
//        }
    }

    public void search_active_task() throws InterruptedException {
//        for (int i = 0; i < 3; i++) {
            try {
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("task_search")))).clear();
                driver.findElement(By.xpath(task_loc.getProperty("task_search"))).click();
                driver.findElement(By.xpath(task_loc.getProperty("task_search"))).sendKeys(store.getProperty("create_case_last_name"));
                driver.findElement(By.xpath(task_loc.getProperty("task_search"))).sendKeys(Keys.BACK_SPACE);
                Thread.sleep(1000);
                if (wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(task_loc.getProperty("task_case_name_on_list")), store.getProperty("create_case_last_name")))) {
                    log.info("Task List:search_active_task: Task present in task list");
//                    break;
                } else {
                    log.error("Task List:search_active_task: Task not present in task list");
                }
            } catch (Exception e) {
                driver.navigate().refresh();
                Thread.sleep(1000);
            }
//        }
    }

    public void edit_active_task() throws InterruptedException {
//        for (int i = 0; i < 3; i++) {
            try {
                Actions actions = new Actions(driver);        // Create an Actions instance and perform the hover
                WebElement edit_unhide = driver.findElement(By.xpath(task_loc.getProperty("task_hover_area")));
                actions.moveToElement(edit_unhide).perform();// doing hovering action to unhide the edit and delete button
                wait.until(ExpectedConditions.elementToBeClickable(By.xpath(task_loc.getProperty("task_edit_button")))).click();
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("add_task_description")))).sendKeys("Edited by the provider");
                driver.findElement(By.xpath(task_loc.getProperty("create_task_submit_button"))).click();
            } catch (Exception e) {
                driver.navigate().refresh();
                Thread.sleep(1000);
            }
//        }
    }

    public void validate_edit_active_task() throws InterruptedException {

            validate_created_task();
            Thread.sleep(1000);
            if (wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(task_loc.getProperty("task_description")), "Edited by the provider"))) {
            log.info("Task List: validate_edit_active_task: Task Edited Successfully");}
            else {
            log.error("Task List : validate_edit_active_task: Task not present in task list");
        }
    }

    public void mark_task_complete() throws InterruptedException {
        Thread.sleep(1000);
//        for (int i = 0; i < 3; i++) {
            try {
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("task_completed_checkbox")))).click();
//                break;
            } catch (Exception e) {
                throw new RuntimeException(e);
//            }
        }
    }

    public void open_completed_task_list() {
        for (int i = 0; i < 3; i++) {
            try {
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("completed_task_button")))).click();
                break;
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    public void validate_completed_task() throws InterruptedException {
//        for (int i = 0; i < 3; i++) {
            try {

                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("completed_task_search")))).clear();
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("completed_task_search")))).click();
                driver.findElement(By.xpath(task_loc.getProperty("completed_task_search"))).sendKeys(store.getProperty("create_case_last_name"));
                Thread.sleep(1000);
                if (wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(task_loc.getProperty("completed_task_name_on_list")), store.getProperty("create_case_last_name")))) {
                    log.info("Task List: validate_completed_task: Task present in completed task list");
//                    break;
                } else {
                    log.error("Task List: validate_completed_task: Task not present in completed task list");
                }
            } catch (Exception e) {
                driver.navigate().refresh();
                open_completed_task_list();
//                Thread.sleep(1000);
            }
//        }
    }


    public void search_completed_task() throws InterruptedException {
//        for (int i = 0; i < 3; i++) {
            try {
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("completed_task_search")))).clear();
                driver.findElement(By.xpath(task_loc.getProperty("completed_task_search"))).click();
                driver.findElement(By.xpath(task_loc.getProperty("completed_task_search"))).sendKeys(store.getProperty("create_case_last_name"));
                if (wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(task_loc.getProperty("completed_task_name_on_list")), store.getProperty("create_case_last_name")))) {
                    log.info("Task List: search_completed_task: Task present in completed task list");
//                    break;
                } else {
                    log.error("Task List: search_completed_task: Task not present in completed task list");
                }
            } catch (Exception e) {
                driver.navigate().refresh();
                open_completed_task_list();
//                Thread.sleep(1000);
            }
//        }
    }


    public void edit_completed_task() throws InterruptedException {
//        for (int i = 0; i < 3; i++) {
            try {
                Actions actions = new Actions(driver);        // Create an Actions instance and perform the hover
                WebElement edit_unhide = driver.findElement(By.xpath(task_loc.getProperty("completed_task_hover_area")));
                actions.moveToElement(edit_unhide).perform();// doing hovering action to unhide the edit and delete button
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("completed_task_edit")))).click();
                Thread.sleep(1000);
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("add_task_description")))).clear();
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("add_task_description")))).sendKeys("Edited completed task by the provider");
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("create_task_submit_button")))).click();
//                break;
            } catch (StaleElementReferenceException e) {
                driver.navigate().refresh();
                open_completed_task_list();
//                Thread.sleep(1000);
            }
//        }
    }

    public void validate_edit_completed_task() throws InterruptedException {
            validate_completed_task();
            if (wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(task_loc.getProperty("completed_task_description")), "Edited completed"))) {
                log.info("Task List: validate_edit_active_task: Task Edited Successfully");
            }
            else {
                log.error("Task List: validate_edit_active_task: Task not present in task list");
            }
    }

    public void mark_task_active() {
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(task_loc.getProperty("task_active_checkbox")))).click();
    }

    public void validate_not_in_completed_task() throws InterruptedException {
//        for (int i = 0; i < 3; i++) {
            try {
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("completed_task_search")))).clear();
                driver.findElement(By.xpath(task_loc.getProperty("completed_task_search"))).click();
                driver.findElement(By.xpath(task_loc.getProperty("completed_task_search"))).sendKeys(store.getProperty("create_case_last_name"));
                if (wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(task_loc.getProperty("completed_task_name_on_list")), store.getProperty("create_case_last_name")))) {
                    log.info("Task List: validate_not_completed_task: Task moved to active or deleted task list");
//                    break;
                }
                else{
                    log.error("Task List: validate_not_completed_task: Task present in completed task list not moved or deleted");
                }
            } catch (Exception e) {
                driver.navigate().refresh();
                open_completed_task_list();
//                Thread.sleep(1000);
            }
//        }
    }

    public void delete_active_task() throws InterruptedException {
//        for (int i = 0; i < 3; i++) {
            try {
                Actions actions = new Actions(driver);        // Create an Actions instance and perform the hover
                WebElement edit_unhide = driver.findElement(By.xpath(task_loc.getProperty("task_hover_area")));
                actions.moveToElement(edit_unhide).perform();// doing hovering action to unhide the edit and delete button
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("task_delete_button")))).click();
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("task_delete_confirmation")))).click();
//                break;
            } catch (StaleElementReferenceException e) {
                driver.navigate().refresh();
//                Thread.sleep(1000);
            }
//        }
    }

    public void validate_not_in_active_task() throws InterruptedException {
//        for (int i = 0; i < 3; i++) {
            try {
                driver.findElement(By.xpath(task_loc.getProperty("task_search"))).clear();
                driver.findElement(By.xpath(task_loc.getProperty("task_search"))).click();
                driver.findElement(By.xpath(task_loc.getProperty("task_search"))).sendKeys(store.getProperty("create_case_last_name"));
                driver.findElement(By.xpath(task_loc.getProperty("task_search"))).sendKeys(Keys.BACK_SPACE);
                if (wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath(task_loc.getProperty("task_table_empty")), "No Tasks"))) {
                    log.info("Task List: validate_not_in_active_task: Task  deleted task list");
//                    break;
                }
                else{
                    log.error("Task List: validate_not_in_active_task: Task present in task list not moved or deleted");
                }
            } catch (Exception e) {
                driver.navigate().refresh();
//                Thread.sleep(1000);
            }
//        }
    }

    public void delete_completed_task() throws InterruptedException {
//        for (int i = 0; i < 3; i++) {
            try {
                Actions actions = new Actions(driver);        // Create an Actions instance and perform the hover
                WebElement edit_unhide = driver.findElement(By.xpath(task_loc.getProperty("completed_task_hover_area")));
                actions.moveToElement(edit_unhide).perform();// doing hovering action to unhide the edit and delete button
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("completed_task_delete")))).click();
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("task_delete_confirmation")))).click();
//                break;
            } catch (Exception e) {
                driver.navigate().refresh();
                open_completed_task_list();
                Thread.sleep(1000);
            }
//        }
    }

    public void create_task_provider_group_admin() throws InterruptedException {

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("add_task_description")))).sendKeys("task created by the provider");
        //assigning the task to Dr. Soni Gcc
        driver.findElement(By.xpath(task_loc.getProperty("add_task_assignee"))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("add_task_assignee_input")))).sendKeys("test");
        driver.findElement(By.xpath(task_loc.getProperty("add_task_assignee_first_in_list"))).click();
        log.info("Task List: adding assignee to the task");
// Generate a random date due date within next 15 days
        Date date = random.date().future(15, TimeUnit.DAYS);
        // Format the date to MM/dd/yyyy
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        String duedate = dateFormat.format(date);
        // inserting the due date
        driver.findElement(By.xpath(task_loc.getProperty("due_date"))).sendKeys(duedate);
        log.info("Task List: Due date generated... inserting it in the task");

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("add_task_case_name")))).sendKeys(store.getProperty("create_case_last_name"));
        Thread.sleep(1000);

        driver.findElement(By.xpath(task_loc.getProperty("add_task_case_name"))).sendKeys(Keys.BACK_SPACE);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(task_loc.getProperty("add_task_case_dd")))).click();

        log.info("Task List: Creating task... adding case name");
        //clicking on submit
        driver.findElement(By.xpath(task_loc.getProperty("create_task_submit_button"))).click();
        log.info("Task List: Submitting...");


    }
}