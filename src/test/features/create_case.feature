@page
Feature: Duplicate cases test - create case page

#  # Start 422 - Duplicate case detection within your office

    Scenario: create case for duplicate case check.... attorney
        * login as attorney and password
        * go to case create page
        * fill the case create form and submit
        * search for test case
        * logout

    Scenario: Creating a duplicate case using DOI and DOB.... attorney
        * login as attorney and password
        * go to case create page
        * fill the case create form with duplicate details DOI and DOB
        # duplicate case is not created, duplicate details has been entered to check if the popup is working or not
        * logout

    Scenario: Creating a duplicate case using DOB and SSN.... attorney
        * login as attorney and password
        * go to case create page
        * fill the case create form with duplicate details DOB and SSN
        # duplicate case is not created, duplicate details has been entered to check if the popup is working or not
        * logout

    Scenario: Deleting the cases created for Duplicate case.... by the attorney
        * login as attorney and password
        * search for test case
        * open the case detail page for the searched case
        * click on case edit button
        * delete the test case
        * logout

    Scenario: create case for duplicate case check.... provider
        * login as provider and password
        * go to case create page
        * fill the case create form and submit
        * search for test case
        * logout

    Scenario: Creating a duplicate case using DOI and DOB.... provider
        * login as provider and password
        * go to case create page
        * fill the case create form with duplicate details DOI and DOB
        # duplicate case is not created, duplicate details has been entered to check if the popup is working or not
        * logout

    Scenario: Creating a duplicate case using DOB and SSN.... provider
        * login as provider and password
        * go to case create page
        * fill the case create form with duplicate details DOB and SSN
        # duplicate case is not created, duplicate details has been entered to check if the popup is working or not
        * logout

    Scenario: Deleting the cases created for Duplicate case.... by the provider
        * login as provider and password
        * search for test case
        * open the case detail page for the searched case
        * click on case edit button
        * delete the test case
        * logout

## end 422 - Duplicate case detection within your office

## Start 423 - Duplicate case detection within a Group Office

    Scenario: create case for duplicate case check.... provider group
        * login as provider group and password
        * go to case create page
        * fill the case create form for group admin and submit
        * search for test case from group admin
        * logout

    Scenario: Creating a duplicate case using DOI and DOB.... provider group
        * login as provider group and password
        * go to case create page
        * fill the case create form with duplicate details DOI and DOB
        # duplicate case is not created, duplicate details has been entered to check if the popup is working or not
        * logout

    Scenario: Creating a duplicate case using DOB and SSN.... provider group
        * login as provider group and password
        * go to case create page
        * fill the case create form with duplicate details DOB and SSN
        # duplicate case is not created, duplicate details has been entered to check if the popup is working or not
        * logout

    Scenario: Deleting the cases created for Duplicate case.... provider group
        * login as provider group and password
        * search for test case from group admin and open
        * click on case edit button
        * delete the test case from group login
        * logout
    
    Scenario: create case for duplicate case check.... attorney group
        * login as attorney group and password
        * go to case create page
        * fill the case create form for group admin and submit
        * search for test case from group admin
        * logout

    Scenario: Creating a duplicate case using DOI and DOB.... attorney group
        * login as attorney group and password
        * go to case create page
        * fill the case create form with duplicate details DOI and DOB
        # duplicate case is not created, duplicate details has been entered to check if the popup is working or not
        * logout

    Scenario: Creating a duplicate case using DOB and SSN.... attorney group
        * login as attorney group and password
        * go to case create page
        * fill the case create form with duplicate details DOB and SSN
        # duplicate case is not created, duplicate details has been entered to check if the popup is working or not
        * logout

    Scenario: Deleting the cases created for Duplicate case.... attorney group
        * login as attorney group and password
        * search for test case from group admin and open
        * click on case edit button
        * delete the test case from group login
        * logout

# ## end 423 - Duplicate case detection within a Group Office
