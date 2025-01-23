Feature: Checking the task list
###########################################################################
  #Below Scenarios are associated with provider admin logins
  Scenario: provider admin should able to create case
    * login as provider and password
    * go to case create page
    * fill the case create form and submit
    * search for test case
    * logout

  Scenario: provider admin should able create, edit, delete task
    * login as provider and password
    * go to case create page
    * fill the case create form and submit
    * search for test case
    * go to task list tab
    * click on create task
    * create a task as a provider
    * validate the task is present in the active task list
    * search for the task
    * edit the searched task
    * validate the edit details in the list
    * search for the task
    * mark the task as completed
    * go to completed task list
    * validate the task is present in completed task list
    * search for the completed task
    * edit the searched completed task
#    * validate the edit details of completed task
    * search for the completed task
    * mark the task as active
    * validate the task is present in the active task list
    * logout

  Scenario: Deleting the cases created for Treatment Section: by the provider
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * click on case edit button
    * delete the test case
    * logout


#############################################################################
#  #Below Scenarios are associated with provider group admin logins


  Scenario: provider group admin should able to create case
    * login as provider group and password
    * go to case create page
    * fill the case create form for group admin and submit
    * search for test case from provider group admin
    * go to task list tab
    * click on create task
    * create a task as a provider group admin
    * validate the task is present in the active task list
    * search for the task
    * edit the searched task
#    * validate the edit details in the list
    * search for the task
    * mark the task as completed
    * go to completed task list
    * validate the task is present in completed task list
    * search for the completed task
    * edit the searched completed task
#    * validate the edit details of completed task
    * search for the completed task
    * mark the task as active
    * validate the task is present in the active task list
    * search for the task
    * delete the searched task
    * validate the task is not present in the active task list
    * logout

  Scenario: Deleting a task in completed task list
    * login as provider group and password
    * go to task list tab
    * click on create task
    * create a task as a provider group admin
    * validate the task is present in the active task list
    * mark the task as completed
    * go to completed task list
    * search for the completed task
    * delete the searched completed task
    * logout

  Scenario: Deleting the cases created for task creation by the provider group
    * login as provider group and password
    * search for test case from group admin and open
    * click on case edit button
    * delete the test case from group login
    * logout




