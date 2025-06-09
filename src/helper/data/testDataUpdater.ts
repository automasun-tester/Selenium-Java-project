import fs from "fs";
import path from "path";

export default class TestDataUpdater {
    private static dataFilePath = path.resolve(__dirname, "../data/test.json");

    static updateTestData(newData: Record<string, string>) {
        let existingData = {};

        // **Check if file exists and read existing data**
        if (fs.existsSync(this.dataFilePath)) {
            existingData = JSON.parse(fs.readFileSync(this.dataFilePath, "utf-8"));
        }

        // **Merge new data with existing data without deleting other keys**
        const updatedData = { ...existingData, ...newData };

        // **Force-write updated data to JSON file and flush the buffer**
        fs.writeFileSync(this.dataFilePath, JSON.stringify(updatedData, null, 2), { flag: "w" });

        console.log("✅ Test data updated successfully.");

        // **Force immediate read to prevent stale data issues**
        this.clearRequireCache();
    }

    // **Force Node.js to read fresh data every time**
    private static clearRequireCache() {
        delete require.cache[require.resolve(this.dataFilePath)];
    }

    // **Get the latest test data immediately**
    static getTestData(): Record<string, string> {
        return JSON.parse(fs.readFileSync(this.dataFilePath, "utf-8"));
    }
}
