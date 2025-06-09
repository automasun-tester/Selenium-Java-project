import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
import fs from "fs-extra";
import path from "path";

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
    console.log("🚀 Initializing Playwright Browser...");
    getEnv();
    browser = await invokeBrowser(); // Ensure this is correctly implemented
    if (!browser) {
        throw new Error("❌ Failed to initialize Playwright browser.");
    }
});

Before(async function ({ pickle }) {
    console.log(`🚀 Starting scenario: ${pickle.name}`);
    if (!browser) {
        throw new Error("❌ Browser instance is not initialized.");
    }

    // Close previous context if it exists
    if (context) {
        console.log("🔄 Closing old browser context...");
        await context.close();
    }

    // ✅ Ensure a new context is created for each scenario
    const scenarioName = pickle.name.replace(/[^a-zA-Z0-9_-]/g, "_"); + pickle.id;
    context = await browser.newContext({
        recordVideo: { dir: "test-results/videos" },
    });

    if (!context) {
        throw new Error("❌ Failed to create new browser context.");
    }

    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true, snapshots: true
    });

    // ✅ Create a new page instance and assign it to `fixture.page`
    page = await context.newPage();
    if (!page) {
        throw new Error("❌ Failed to create a new page.");
    }

    fixture.page = page; // ✅ Assign page instance to fixture
    console.log("✅ Context and Page successfully initialized.");
    console.log(`🚀 Starting scenario: ${pickle.name}`);

    // const scenarioName = pickle.name.replace(/[^a-zA-Z0-9_-]/g, "_"); // Sanitize filename
    const logDir = path.join("test-results", "logs");

    // ✅ Ensure logs directory exists before Winston tries to write
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    // ✅ Now safely create logger
    fixture.logger = createLogger(options(scenarioName));
});

After(async function ({ pickle, result }) {
    // let videoPath: string;
    let img: Buffer;
    const videoPath = await fixture.page.video()?.path();
    const path = `./test-results/trace/${pickle.name}.zip`;
    if (result?.status == Status.FAILED) {
        img = await fixture.page.screenshot(
            { path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
            const videoContext = await browser.newContext({
                recordVideo: { dir: `test-results/videos/` }
              });
              
    }
    console.log(`🛑 Cleaning up after scenario: ${pickle.name}`);

    if (!context) {
        console.warn("⚠️ Warning: Context is undefined, skipping cleanup.");
        return;
    }

    try {
        await context.tracing.stop({ path: path });
        console.log("✅ Tracing stopped successfully.");
    } catch (error) {
        console.warn("⚠️ Warning: Tracing stop error", error);
    }

    try {
        if (page) {
            await page.close();
            console.log("✅ Page closed successfully.");
        }
    } catch (error) {
        console.warn("⚠️ Warning: Page close error", error);
    }

    try {
        await context.close();
        console.log("✅ Browser context closed successfully.");
    } catch (error) {
        console.warn("⚠️ Warning: Context close error", error);
    }

    if (result?.status == Status.FAILED) {
        this.attach(
            img, "image/png"
        );
       
         this.attach(
            fs.readFileSync(videoPath), "video/webm");


            const traceHTML = `
      <p>
        📦 <strong>Playwright Trace:</strong> 
        <a href="${path}" download target="_blank">${pickle.id}</a><br>
        Upload at <a href="https://trace.playwright.dev" target="_blank">trace.playwright.dev</a>
      </p>
    `;

    // ✅ Attach only the HTML (not the binary ZIP itself)
    this.attach(traceHTML, 'text/html');
        // const traceFileName = `${pickle.id}.zip`;    
        // const traceFileLink = `<a href="https://trace.playwright.dev//trace=blob&traceFileName=${encodeURIComponent(path)}">Open</a>`
        // this.link('https://trace.playwright.dev//trace=blob&traceFileName=${encodeURIComponent(path)}');

    //     // Read the trace file as a Buffer
    // const traceData = fs.readFileSync(path);
    // // Attach the trace buffer to the report with proper MIME type and filename
    // await this.attach(traceData, { mediaType: 'zip', fileName: 'trace.zip' });
  
        // const traceBuffer = fs.readFileSync(path);
        // this.attach(fs.readFileSync(path), 'application/zip');

        // this.attach(
        //     `<p><strong>Trace File:</strong> Download from <em>Attachment</em> above and upload to 
        //     <a href="https://trace.playwright.dev" target="_blank">trace.playwright.dev</a></p>`,
        //     'text/html'
        //   );
    }else {
        // cleanup video if not needed
        if (videoPath && fs.existsSync(videoPath)) {
          fs.unlinkSync(videoPath);
        }
        fs.unlinkSync(path);


    }
});

AfterAll(async function () {
    if (browser) {
        await browser.close();
        console.log("✅ Browser closed after all tests.");
    } else {
        console.warn("⚠️ Warning: Browser was already closed or not initialized.");
    }
});