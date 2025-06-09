@page
Feature: Automation - User Feature

  # Scenario: The User Page Displays Successfully
  #   * login as provider and password
  #   * go to user page
  #   * logout

  # Scenario: Creating a user from Provider
  #   * login as provider and password
  #   * go to user page
  #   * go to user create page
  #   * fill the user create form
  #   * logout

  # Scenario: Validating the create user by provider
  #   * login as provider and password
  #   * go to user page
  #   * validate the created user in inactive list
  #   * logout

  # Scenario: Activating a user from user admin login which created by provider
  #   * login as superadmin and password
  #   * go to user page
  #   * superadmin- search the user in inactive list
  #   * activate the user
  #   * Submit edit user changes
  #   * validate the created user in active list
  #   * logout

  # Scenario: Deactivating a user from user admin login which created by provider
  #   * login as superadmin and password
  #   * go to user page
  #   * superadmin- search the user in active list
  #   * deactivate the user
  #   * Submit edit user changes
  #   * validate the created user in inactive list
  #   * logout  

  # Scenario: Creating a user from Attorney
  #   * login as attorney and password
  #   * go to user page
  #   * go to user create page
  #   * fill the user create form
  #   * logout

  # Scenario: Validating the create user by attorney
  #   * login as attorney and password
  #   * go to user page
  #   * validate the created user in inactive list
  #   * logout

  # Scenario: Activating a user from user admin login which created by attorney
  #   * login as superadmin and password
  #   * go to user page
  #   * superadmin- search the user in inactive list
  #   * activate the user
  #   * Submit edit user changes
  #   * validate the created user in active list
  #   * logout

  #   Scenario: Deactivating a user from user admin login which created by provider
  #   * login as superadmin and password
  #   * go to user page
  #   * superadmin- search the user in active list
  #   * deactivate the user
  #   * Submit edit user changes
  #   * validate the created user in inactive list
  #   * logout



    ##starting 1325
    Scenario: Settings...Other clinics can remove me as a provider to a case (enabled)
    * login as provider and password
    * go to case create page
    * fill the case create form and submit
    * refer the case to a provider for setting test
    * verify user is able to delete other provider from the case
    * logout

    Scenario: Settings...Other clinics can remove me as a provider to a case (disabling)
    * login as provider gcc and password
    * go to settings page
    * click the setting Other clinics can remove me as a provider to a case
    * logout

    Scenario: Settings...Other clinics can remove me as a provider to a case (disabled)
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * verify user is not able to delete other provider from the case
    * logout

    Scenario: Settings...Other clinics can remove me as a provider to a case (enabling)
    * login as provider gcc and password
    * go to settings page
    * click the setting Other clinics can remove me as a provider to a case
    * logout

    Scenario: Deleting the cases created for Reduction Request by the provider
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * click on case edit button
    * delete the test case
    * logout

    ##ending 1325