
Feature: Reduction Request Scenarios
##following Scenario workflow - create case from provider - refer a attorney - make an offer - attorney counter that offer - provider accepts the offer
  
  @UI_test
  Scenario:UI test for Reduction Request... table visibility by provider
   * login as provider and password
   * go to reduction request tab
   * check the visibiliy of the table data for waiting on response
   * check the visibiliy of the table data for needs response
   * logout

  @UI_test
  Scenario:UI test for Reduction Request... table visibility by attorney
   * login as attorney and password
   * go to reduction request tab
   * check the visibiliy of the table data for waiting on response
   * check the visibiliy of the table data for needs response
   * logout 
  
  
  
  
  Scenario: Creating a case to perform Reduction Request from provider
    * login as provider and password
    * go to case create page
    * fill the case create form and submit
    * logout

  Scenario: Referring attorney to the case created and making a offer
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * refer the case to a attorney
    * go to finance tab
    * click to the make offer
    * make an offer from provider
    * go to reduction request tab
    * validate needs response provider
    * logout

  Scenario: Checking and making a counter offer from attorney
    * login as attorney and password
    * go to reduction request tab
    * check case in waiting for response from attorney
    * open the offer case
    * go to finance tab
    * go to provider settlement
    * make a counter offer from attorney
    * go to reduction request tab
    * validate needs response attorney
    * logout

  Scenario: Accepting the offer by provider
    * login as provider and password
    * go to reduction request tab
    * check case in waiting for response from provider
    * open the offer case
    * go to finance tab
    * go to provider settlement
    * accept the counter offer
    * logout

  Scenario: Deleting the cases created for Reduction Request by the provider
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * click on case edit button
    * delete the test case
    * logout

##following Scenario workflow - create case from attorney - refer a provider - make an offer - provider counter that offer - attorney accepts the offer
  Scenario: Creating a case to perform Reduction Request from attorney
    * login as attorney and password
    * go to case create page
    * fill the case create form and submit
    * logout

  Scenario: Referring provider to the case created and making a offer
    * login as attorney and password
    * search for test case
    * open the case detail page for the searched case
    * refer the case to a provider
    * go to finance tab
    * click to the make offer
    * make an offer from attorney
    * go to reduction request tab
    * check case in waiting for response from attorney
    * logout

  Scenario: Checking and making a counter offer from provider
    * login as provider and password
    * go to reduction request tab
    * validate needs response provider
    * open the offer case
    * go to finance tab
    * go to provider settlement
    * make a counter offer from provider
    * go to reduction request tab
    * check case in waiting for response from provider
    * logout

  Scenario: Accepting the offer by attorney
    * login as attorney and password
    * go to reduction request tab
    * validate needs response attorney
    * open the offer case
    * go to finance tab
    * go to provider settlement
    * accept the counter offer
    * logout

  Scenario: Deleting the cases created for Reduction Request by the attorney
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * click on case edit button
    * delete the test case
    * logout