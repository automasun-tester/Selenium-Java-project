Feature: office list functions

  Scenario: Creating a provider office from Super Admin
    * login as superadmin and password
    * go to office list page
    * superadmin - go to create office page
    * fill the office create form for provider
    * logout

  Scenario: Activating the provider office created
    * login as superadmin and password
    * go to office list page
    * go to inactive office list
    * search for the provider office in inactive list
    * go to edit inactive provider office
    * activate office
    * submit the edit office form
    * validate the provider office is active
    * logout

  Scenario: Creating a Attorney office from Super Admin
    * login as superadmin and password
    * go to office list page
    * superadmin - go to create office page
    * fill the office create form for Attorney
    * logout

  Scenario: Activating the Attorney office created
    * login as superadmin and password
    * go to office list page
    * go to inactive office list
    * search for the attorney office in inactive list
    * go to edit inactive attorney office
    * activate office
    * submit the edit office form
    * validate the attorney office is active
    * logout

#Creating Attorney Office from Attorney login
  Scenario: Creating a Attorney office request from Attorney login
   * login as attorney and password
   * go to office list page
   * go to create office page
   * fill the office create form for Attorney
   * logout

  Scenario: Approving Attorney office create by user admin Attorney
    * login as superadmin and password
    * go to office list page
    * go to create office request for attorney
    * search for the attorney request
    * approve attorney office request
    * logout

  Scenario: Inactive search test from Attorney login
    * login as attorney and password
    * go to office list page
    * go to inactive office list
    * search for the attorney office in inactive list
    * logout

  Scenario: Activating Attorney office create by user admin Attorney
    * login as superadmin and password
    * go to office list page
    * go to inactive office list
    * search for the attorney office in inactive list
    * go to edit inactive attorney office
    * activate office
    * submit the edit office form
    * validate the attorney office is active
    * logout

  Scenario: active search test from Attorney login
    * login as attorney and password
    * go to office list page
    * validate the attorney office is active
    * logout

#Creating Provider Office From Attorney Login
  Scenario: Creating a provider office request from Attorney login
    * login as attorney and password
    * go to office list page
    * go to create office page
    * fill the office create form for provider
    * logout

  Scenario: Approving Attorney office create by user admin Attorney
    * login as superadmin and password
    * go to office list page
    * go to create office request for provider
    * search for the provider request
    * approve provider office request
    * logout

  Scenario: Inactive search test from Attorney login
    * login as attorney and password
    * go to office list page
    * go to inactive office list
    * search for the provider office in inactive list
    * logout

  Scenario: Activating Attorney office create by user admin Attorney
    * login as superadmin and password
    * go to office list page
    * go to inactive office list
    * search for the provider office in inactive list
    * go to edit inactive provider office
    * activate office
    * submit the edit office form
    * validate the provider office is active
    * logout

  Scenario: active search test from Attorney login
    * login as attorney and password
    * go to office list page
    * validate the provider office is active
    * logout
#
  #Creating Provider Office From Provider Login
  Scenario: Creating a provider office request from provider login
    * login as provider and password
    * go to office list page
    * go to create office page
    * fill the office create form for provider
    * logout

  Scenario: Approving provider office create by useradmin provider
    * login as superadmin and password
    * go to office list page
    * go to create office request for provider
    * search for the provider request
    * approve provider office request
    * logout

  Scenario: Inactive search test from provider login
    * login as provider and password
    * go to office list page
    * go to inactive office list
    * search for the provider office in inactive list
    * logout

  Scenario: Activating provider office create by useradmin provider
    * login as superadmin and password
    * go to office list page
    * go to inactive office list
    * search for the provider office in inactive list
    * go to edit inactive provider office
    * activate office
    * submit the edit office form
    * validate the provider office is active
    * logout

  Scenario: active search test from provider login
    * login as provider and password
    * go to office list page
    * validate the provider office is active
    * logout

  #Creating Attorney Office From Provider Login
  Scenario: Creating a Attorney office request from provider login
    * login as provider and password
    * go to office list page
    * go to create office page
    * fill the office create form for Attorney
    * logout

  Scenario: Approving provider office create by useradmin provider
    * login as superadmin and password
    * go to office list page
    * go to create office request for attorney
    * search for the attorney request
    * approve attorney office request
    * logout

  Scenario: Inactive search test from provider login
    * login as provider and password
    * go to office list page
    * go to inactive office list
    * search for the attorney office in inactive list
    * logout

  Scenario: Activating provider office create by useradmin provider
    * login as superadmin and password
    * go to office list page
    * go to inactive office list
    * search for the attorney office in inactive list
    * go to edit inactive attorney office
    * activate office
    * submit the edit office form
    * validate the attorney office is active
    * logout

  Scenario: active search test from provider login
    * login as provider and password
    * go to office list page
    * validate the attorney office is active
    * logout


  Scenario: Creating a provider office request from provider group login
    * login as provider group and password
    * go to office list page
    * go to create office page
    * fill the office create form for provider
    * logout

  Scenario: Approving provider office create by user admin attorney
    * login as superadmin and password
    * go to office list page
    * go to create office request for provider
    * search for the provider request
    * approve provider office request
    * go to inactive office list
    * search for the provider office in inactive list
    * go to edit inactive provider office
    * activate office
    * submit the edit office form
    * validate the provider office is active
    * logout

  Scenario: Creating a provider office request from attorney group login
    * login as attorney group and password
    * go to office list page
    * go to create office page
    * fill the office create form for provider
    * logout

  Scenario: Creating a attorney office request from attorney group login
    * login as attorney group and password
    * go to office list page
    * go to create office page
    * fill the office create form for Attorney
    * logout

  Scenario: Super Admin rejecting Attorney office request
    * login as superadmin and password
    * go to office list page
    * go to create office request for attorney
    * search for the attorney request
    * Reject the attorney request
    * logout

  Scenario: Super Admin rejecting Provider office request
    * login as superadmin and password
    * go to office list page
    * go to create office request for provider
    * search for the provider request
    * Reject the provider request
    * logout



