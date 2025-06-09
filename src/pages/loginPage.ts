import { expect, Page } from "@playwright/test";
import * as creds from '../helper/data/user_creds.json';
import * as common_locators from '../helper/locators/common_locators.json';
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../hooks/pageFixture";


export default class LoginPage {
    private base: PlaywrightWrapper
    // private page: Page;
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }
   
    async login(user: string) {
        let username: string;
        let password: string;
        // await this.page.goto('https://uat.simplifypi.com/login');

        switch (user.toLowerCase()) {
            case "provider":
                username = creds.prouser;
                password = creds.pass;
                break;
            case "attorney":
                username = creds.attuser;
                password = creds.pass;
                break;
            case "provider group":
                username = creds.gp_user;
                password = creds.gp_pass;
                break;
            case "attorney group":
                username = creds.ga_user;
                password = creds.ga_pass;
                break;
            case "superadmin":
                username = creds.adminId;
                password = creds.adminpass;
                break;     
            case "provider gcc":
                username = creds.provider_gcc_user;
                password = creds.provider_gcc_pass;   
                break;
            default:
                throw new Error(`Unknown user type: ${user}`);
        }
        await this.page.locator("input[name='email']").fill(username);
        await this.page.locator("input[name='password']").fill(password);
        await this.page.locator("button[type='submit']").click();
    }

    async logout() {
        try {
            await this.page.waitForTimeout(2000);
            await this.page.waitForLoadState('load');
            await this.page.locator(common_locators.top_right_profile_dd).waitFor({ state: 'visible' });
            await this.page.locator(common_locators.top_right_profile_dd).click();
            await this.page.locator(common_locators.logout_link).click();   
            console.log("Logged out successfully.");
        } catch (e) {
            console.error("Logout button not found within the timeout period.");
            console.log("Page Source at the time of failure:\n" + await this.page.content());
            throw e;
        }
    }

}