Feature: Automation - User Feature

  Scenario: The User Page Displays Successfully
    * login as provider and password
    * go to user page
    * logout

  Scenario: Creating a user from Provider
    * login as provider and password
    * go to user page
    * go to user create page
    * fill the user create form
    * logout

  Scenario: Validating the create user by provider
    * login as provider and password
    * go to user page
    * validate the created user in inactive list
    * logout

  Scenario: Activating a user from user admin login which created by provider
    * login as superadmin and password
    * go to user page
    * superadmin- search the user in inactive list
    * activate the user
    * Submit edit user changes
    * validate the created user in active list
    * logout

  Scenario: Creating a user from Attorney
    * login as attorney and password
    * go to user page
    * go to user create page
    * fill the user create form
    * logout

  Scenario: Validating the create user by attorney
    * login as attorney and password
    * go to user page
    * validate the created user in inactive list
    * logout

  Scenario: Activating a user from user admin login which created by attorney
    * login as superadmin and password
    * go to user page
    * superadmin- search the user in inactive list
    * activate the user
    * Submit edit user changes
    * validate the created user in active list
    * logout