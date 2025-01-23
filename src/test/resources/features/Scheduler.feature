Feature: Scheduler Test
#1075-branch-start
  Scenario: Creating a appointment through scheduler from provider login
    * login as provider and password
    * go to scheduler tab
    * create appointment through scheduler
    * fill the appointment form through scheduler
    * logout

  Scenario: Editing the created appointed from provider login
    * login as provider and password
    * go to scheduler tab
    * locate the appointment created
    * edit the appointment created
    * logout

  Scenario: Deleting the created appointed from provider login
    * login as provider and password
    * go to scheduler tab
    * locate the appointment created
    * delete the appointment created
    * logout
#1075-branch-end