Feature: Office detail analytics

  #changes to be done from Provider side creating of case and referring the same
  Scenario: Capturing the analytics number before the test provider
    * login as attorney and password
    * go to office list page
    * search for provider office in active list and open office detail page
    * capture the data of provider office (before test)
    * logout

  Scenario: Capturing the analytics number before the test attorney
    * login as provider and password
    * go to office list page
    * search for attorney office in active list and open office detail page
    * capture the data for attorney office (before test)
    * logout

  Scenario: Will refer and make an offer from provider
    * login as provider and password
    * go to case list page
    * go to case create page
    * fill the case create form and submit
    * refer the case to a attorney
    * go to finance tab
    * click to the make offer
    * make an offer from provider
    * logout

  Scenario: Will accept the offer
    * login as attorney and password
    * go to case list page
    * search for test case
    * open the case detail page for the searched case
    * go to finance tab
    * go to provider settlement
    * accept the counter offer
    * logout

  Scenario: Capturing the analytics number after the test provider
    * login as attorney and password
    * go to office list page
    * search for provider office in active list and open office detail page
    * capture the data of provider office (after test)
    * logout

  Scenario: Capturing the analytics number after the test attorney
    * login as provider and password
    * go to office list page
    * search for attorney office in active list and open office detail page
    * capture the data for attorney office (after test)
    * logout


  Scenario: Compare the before and after results and validate the result
    * compare the office detail data

  Scenario: Deleting the cases created for office details by the provider
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * click on case edit button
    * delete the test case
    * logout

#changes to be done from Attorney side creating of case and referring the same
  Scenario: Capturing the analytics number before the test provider
    * login as attorney and password
    * go to office list page
    * search for provider office in active list and open office detail page
    * capture the data of provider office (before test)
    * logout

  Scenario: Capturing the analytics number before the test attorney
    * login as provider and password
    * go to office list page
    * search for attorney office in active list and open office detail page
    * capture the data for attorney office (before test)
    * logout

  Scenario: Will refer and make an offer from attorney
    * login as attorney and password
    * go to case list page
    * go to case create page
    * fill the case create form and submit
    * refer the case to a provider
    * go to finance tab
    * click to the make offer
    * make an offer from attorney
    * logout

  Scenario: Will accept the offer
    * login as provider and password
    * go to case list page
    * search for test case
    * open the case detail page for the searched case
    * go to finance tab
    * go to provider settlement
    * accept the counter offer
    * logout

  Scenario: Capturing the analytics number after the test provider
    * login as attorney and password
    * go to office list page
    * search for provider office in active list and open office detail page
    * capture the data of provider office (after test)
    * logout

  Scenario: Capturing the analytics number after the test attorney
    * login as provider and password
    * go to office list page
    * search for attorney office in active list and open office detail page
    * capture the data for attorney office (after test)
    * logout

  Scenario: Compare the before and after results and validate the result
    * compare the office detail data

  Scenario: Deleting the cases created for office details by the attorney
    * login as attorney and password
    * search for test case
    * open the case detail page for the searched case
    * click on case edit button
    * delete the test case
    * logout