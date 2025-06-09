import { BrowserContext, Page } from "@playwright/test";
import { Logger } from "winston";

export const fixture = {
    // @ts-ignore
    page: undefined as Page,
    context: undefined as BrowserContext, // ✅ Add context here
    logger: undefined as Logger
}