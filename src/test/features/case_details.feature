@page
Feature: Case Details - features

  Scenario: user should able to create case
    * login as attorney and password
    * go to case create page
    * fill the case create form and submit
    * search for test case
    * logout
    ##added for card-1019

  Scenario: Requesting bills and records from attorney login
    * login as attorney and password
    * search for test case
    * open the case detail page for the searched case
    * refer the case to a provider
    * request for bills records
    * verify status is Collecting Records
    * go to bills records requested tab
    * search for requested records case
    * check request generated on bills records tab
    * logout

  Scenario: Responding from the provider end by uploading a test report
    * login as provider and password
    * go to bills records requested tab
    * search for requested records case
    * open the requested records case
      # * upload the test report
    * send bills records
    * verify status is All Provider's Records Received
    * logout
  # ##ending for card-1019##


  Scenario: editing case details - update the gender
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * click on case edit button
    * Edit the case changes
    * Verify edit changes
    * logout
  #starting card-709

  Scenario: checking activity logs
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * click on paperclip icon & generate link
    * open activity logs icon & check whether able to see all details
    * logout
  #ending card-709
  ## adding card-1065

  Scenario: Requesting bills and records from attorney login for different status
    * login as attorney and password
    * search for test case
    * open the case detail page for the searched case
  #    * refer the case to a provider
    * click on edit pencil icon & edit the status to ready for demand
    * verify status is Ready for Demand
    * logout

  Scenario: Reverting send bills and records from provider login for different status
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * send bills records
    * verify status should be Ready for Demand For Provider
    * logout
  #ending for card-1065
  ###############################################################################################################
    # #below scenarios are related to treatment section: adding, deleting, editing

  Scenario: Treatment Section.... editing the provider referred date
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * open provider treatment section
    * edit the provider referred date
    * validate the referred date
    * logout

  Scenario: Treatment Section.... Adding a treatment
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * open provider treatment section
    * click on add treatment button
    * add treatment details and submit
    * validate treatment is added
    * logout

  Scenario: Treatment Section.... Editing a treatment
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * open provider treatment section
    * edit the latest treatment
    * validate the edit treatment
    * logout

  Scenario: Treatment Section.... Delete a treatment
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * open provider treatment section
    * delete the latest treatment
    * logout

  Scenario: 2nd provider.... refering MRI and updating the refered date for other provider
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * refer the case to a second provider
    * open second provider treatment section
    * edit the provider referred date
    * validate the referred date
    * logout

  Scenario: Treatment Section.... Adding, Editing, and Deleting treatment for other provider
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * open second provider treatment section
    * click on add treatment button
    * add treatment details and submit
    * validate treatment is added
    * edit the latest treatment
    * validate the edit treatment
    * delete the latest treatment
    * logout

  Scenario: refering MRI and updating the refered date from attorney
    * login as attorney and password
    * search for test case
    * open the case detail page for the searched case
    * open second provider treatment section
    * edit the provider referred date
    * validate the referred date
    * logout

  Scenario: Treatment Section.... Adding, Editing, and Deleting treatment from attorney
    * login as attorney and password
    * search for test case
    * open the case detail page for the searched case
    * open second provider treatment section
    * click on add treatment button
    * add treatment details and submit
    * validate treatment is added
    * edit the latest treatment
    * validate the edit treatment
    * delete the latest treatment
    * logout

  Scenario: Deleting the cases created for Treatment Section... by the attorney
    * login as attorney and password
    * search for test case
    * open the case detail page for the searched case
    * click on case edit button
    * delete the test case
    * logout

  Scenario: End treatment discharge from provider user login
    * login as provider and password
    * go to case create page
    * fill the case create form and submit
    * search for test case
    * open the case detail page for the searched case
    * end treatment discharge for loggedin office
    * logout

  Scenario: Deleting the cases created for discharge by the provider
    * login as provider and password
    * search for test case
    * open the case detail page for the searched case
    * click on case edit button
    * delete the test case
    * logout

  Scenario: End treatment discontinue from provider user login
    * login as provider and password
    * go to case create page
    * fill the case create form and submit
    * search for test case
    * open the case detail page for the searched case
    * end treatment discontinue for loggedin office
    * logout
    # Scenario: Deleting the cases created for discontinue by the provider
    #   * login as provider and password
    #   * search for test case
    #   * open the case detail page for the searched case
    #   * click on case edit button
    #   * delete the test case
    #   * logout  

  Scenario: End treatment discharge from group admin user login
    * login as provider group and password
    * go to case create page
    * fill the case create form for group admin and submit
    * search for test case from group admin and open
    * end treatment discharge for loggedin office
    * logout

  Scenario: Deleting the cases created for discharge by the provider group admin
    * login as provider group and password
    * search for test case from group admin and open
    * click on case edit button
    * delete the test case from group login
    * logout

  Scenario: End treatment discontinue from group admin user login
    * login as provider group and password
    * go to case create page
    * fill the case create form for group admin and submit
    * search for test case from group admin and open
    * end treatment discontinue for loggedin office
    * logout


    Scenario: Deleting the cases created for discharge by the provider group admin
      * login as provider group and password
      * search for test case from group admin and open
      * click on case edit button
      * delete the test case from group login
      * logout


  ## starting 1374

  Scenario: Redirect & Warning message for deleting self provider 
    * login as provider and password
    * go to case create page
    * fill the case create form and submit
    * refer the case to a attorney
    * copy URL of the case
    * delete self as refered provider from the case
    * verify that user is redirected to the case details page
    * verify warning message is displayed when accessing the case via URL
    * logout

  Scenario: Redirect & Warning message for deleting self provider group admin
    * login as provider group and password
    * go to case create page
    * fill the case create form for group admin and submit
    # * refer the case to a attorney
    * copy URL of the case
    * delete self as refered provider from the case
    * verify that user is redirected to the case details page
    * verify warning message is displayed when accessing the case via URL
    * logout

    ## ending 1374


    ## starting 1375

  Scenario: Redirect & Warning message for deleting self attorney
    * login as attorney and password
    * go to case create page
    * fill the case create form and submit
    # * refer the case to a provider
    * copy URL of the case
    * delete self as refered attorney from the case
    * verify that user is redirected to the case details page
    * verify warning message is displayed when accessing the case via URL
    * logout

    ## ending 1375

   #starting  1370

  Scenario: Bad cases validation for provider login 
    * login as provider and password
    * go to case list page
    * open bad cases tab
    * validate the bad cases are visible 
    * logout

  Scenario: Bad cases validation for provider group login 
    * login as provider group and password
    * go to case list page
    * open bad cases tab
    * validate the bad cases are visible 
    * logout      

     ##ending  1370

  ##  starting 1308
    Scenario:Bills and Records Requested COUNT should be accurate... attorney login #1308
    * login as attorney and password
    * go to case create page
    * fill the case create form and submit
    * refer the case to a provider
    * request for bills records
    * request for bills records
    * go to bills records requested tab
    * search for requested records case
    * Verify the count of bills and records requested
    * verify No duplicate rows appear
    * logout

    Scenario:Bills and Records Requested COUNT should be accurate... provider login #1308
    * login as provider and password
    * go to bills records requested tab
    * search for requested records case
    * Verify the count of bills and records requested
    * verify No duplicate rows appear
    * logout
    
  
    Scenario: Deleting the cases created for Bills and Records Requested COUNT by the attorney
    * login as attorney and password
    * search for test case
    * open the case detail page for the searched case
    * click on case edit button
    * delete the test case
    * logout
  ##ending 1308
