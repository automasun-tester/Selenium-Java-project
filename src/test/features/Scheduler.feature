@page
Feature: Scheduler Test
# #1075-branch-start
  Scenario: Creating a appointment through scheduler from provider login
    * login as provider and password
    * go to case create page
    * fill the case create form and submit
    * go to scheduler tab
    # * check for the providers available for the appointment
    * create appointment through scheduler
    * fill the appointment form through scheduler
    * logout

  Scenario: Editing the created appointed from provider login
    * login as provider and password
    * go to scheduler tab
    # * check for the providers available for the appointment 
    * locate the appointment created
    * edit the appointment created
    * logout

  Scenario: Deleting the created appointed from provider login
    * login as provider and password
    * go to scheduler tab
    # * check for the providers available for the appointment
    * locate the appointment created
    * delete the appointment created
    * logout
# #1075-branch-end

  Scenario: Deleting the cases created for Scheduler test... by the provider
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * click on case edit button
    * delete the test case
    * logout

