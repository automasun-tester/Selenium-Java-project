
Feature: Testing the case search on the case List Page

#   # Scenario: Validation the tile with case present on the page for attorney
#   #   * login as attorney and password
#   #   * get tile values
#   #   * logout

#   # Scenario: Validation the tile with case present on the page for provider
#   #   * login as provider and password
#   #   * get tile values
#   #   * logout

#   # Scenario: Validation the tile with case present on the page for group attorney
#   #   * login as attorney group and password
#   #   * get tile values
#   #   * logout

#   # Scenario: Validation the tile with case present on the page for group provider
#   #   * login as provider group and password
#   #   * get tile values
#   #   * logout

#   Scenario: Closing a case to validate it moves to completed cases section from attorney user admin
#     * login as attorney and password
#     * go to case create page
#     * fill the case create form and submit
#     * search for test case
#     * open the case detail page for the searched case
#     * refer the case to a provider
#     * mark status of the case as closed
#     * go to case list page
#     * click on closed cases
#     * search for the closed case attorney
#   #starting card #1192
#     * validating the case is not present in open case list
#   #ending card #1192
#     * logout


#   Scenario: Deleting the test case using attorney login
#     * login as attorney and password
#     * click on closed cases
#     * search for the closed case attorney
#     * open case detail for the completed case
#     * click on case edit button
#     * delete the test case
#     * logout

#   Scenario: Closing a case to validate it moves to completed cases section from provider user admin
#     * login as provider and password
#     * go to case create page
#     * fill the case create form and submit
#     * search for test case
#     * open the case detail page for the searched case
#     * refer the case to a attorney
#     * mark status of the case as closed
#     * go to case list page
#     * click on closed cases
#     * search for the closed case provider
#   #starting card #1192
#     * validating the case is not present in open case list
#   #ending card #1192
#     * logout

#   Scenario: Deleting the test case using provider login
#     * login as provider and password
#     * click on closed cases
#     * search for the closed case attorney
#     * open case detail for the completed case
#     * click on case edit button
#     * delete the test case
#     * logout

# ##starting card #1192
#   Scenario: Closing a case to validate it moves to completed cases section from group provider 
#     * login as provider group and password
#     * go to case create page
#     * fill the case create form for group admin and submit
#     # * search for test case from group admin and open
#     * refer the case to a attorney
#     * mark status of the case as closed for the group provider member
#     * go to case list page
#     * click on closed cases
#     * search for the closed case provider
#     * validating the case is not present in open case list
#     * logout  
# ##ending card #1192


##starting 1260

Scenario:Settings - Put most recently accessed case at the top....provdier login
    * login as provider and password
    * go to case create page
    * fill the case create form and submit
    * refer the case to a attorney    
    * go to case list page
    * check the case list for the most recently accessed case
    * go to profile settings page
    * uncheck the setting Put most recently accessed case at the top
    * go to case list page
    * check for the case list for the recently accessed case should not be at the top
    * go to profile settings page
    * checkmark the setting Put most recently accessed case at the top
    * logout

  Scenario:Settings - Put most recently accessed case at the top....attorney login
    * login as attorney and password  
    * go to case list page
    * search for test case
    * open the case detail page for the searched case
    * refer the case to a second provider
    * go to profile settings page
    * uncheck the setting Put most recently accessed case at the top
    * go to case list page
    * check for the case list for the recently accessed case should not be at the top
    * go to profile settings page
    * checkmark the setting Put most recently accessed case at the top
    * go to case list page
    * check the case list for the most recently accessed case
    * logout
  

  Scenario: Deleting the cases created Settings test.... by the provider
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * click on case edit button
    * delete the test case
    * logout

##ending 1260

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
#    * search for the closed case attorney
#    * open case detail for the completed case
#    * click on case edit button
#    * delete the test case
#    * logout


