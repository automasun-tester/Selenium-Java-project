Feature: Testing the case search on the case List Page

  Scenario: Validation the tile with case present on the page for attorney
    * login as attorney and password
    * get tile values
    * logout

  Scenario: Validation the tile with case present on the page for provider
    * login as provider and password
    * get tile values
    * logout

  Scenario: Validation the tile with case present on the page for group attorney
    * login as attorney group and password
    * get tile values
    * logout

  Scenario: Validation the tile with case present on the page for group provider
    * login as provider group and password
    * get tile values
    * logout

  Scenario: Closing a case to validate it moves to completed cases section from attorney user admin
    * login as attorney and password
    * go to case create page
    * fill the case create form and submit
    * search for test case
    * open the case detail page for the searched case
    * refer the case to a provider
    * mark status of the case as closed
    * go to case list page
    * click on complete cases
    * search for the completed case attorney
    * logout


  Scenario: Deleting the test case using attorney login
    * login as attorney and password
    * click on complete cases
    * search for the completed case attorney
    * open case detail for the completed case
    * click on case edit button
    * delete the test case
    * logout

  Scenario: Closing a case to validate it moves to completed cases section from provider user admin
    * login as provider and password
    * go to case create page
    * fill the case create form and submit
    * search for test case
    * open the case detail page for the searched case
    * refer the case to a attorney
    * mark status of the case as closed
    * go to case list page
    * click on complete cases
    * search for the completed case provider
    * logout

  Scenario: Deleting the test case using provider login
    * login as provider and password
    * click on complete cases
    * search for the completed case attorney
    * open case detail for the completed case
    * click on case edit button
    * delete the test case
    * logout

##there is my tab for now
#  Scenario: Assigning case to a case manager and checking if the case comes under My case tab
#    * login as provider and password
#    * go to case create page
#    * fill the case create form and submit
#    * search for test case
#    * open the case detail page for the searched case
#    * assign a case manager to the case
#    * go to case list page
#    * open my case tab
#    * search for the case in my case
#    * logout
#
#  Scenario: Deleting the test case using provider login
#    * login as provider and password
#    * click on complete cases
#    * search for the completed case attorney
#    * open case detail for the completed case
#    * click on case edit button
#    * delete the test case
#    * logout


