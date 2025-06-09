const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: "Playwright Automation Report",
    pageTitle: "SimplifyPI feature testing",
    displayDuration: true,
    metadata: {
        browser: {
            name: "chrome",
            version: "112",
        },
        device: "Test PC",
        platform: {
            name: "Linux",
            version: "10",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "Automation Testing" },
        ],
    },
});