package pages;
import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;

public class LogReportGenerator {

    public void generateReportAfterTestSuite() {
        String logFilePath = "automation-log.log";  // Path to your log file
        String reportFilePath = "automation-test-report.html";  // Output HTML file path

        // Parse the log file and generate the report
        generateHtmlReport(logFilePath, reportFilePath);
    }

    // Method to parse the log file and generate the HTML report
    private void generateHtmlReport(String logFilePath, String reportFilePath) {
        Map<String, Feature> featureMap = parseLogFile(logFilePath);  // Step 1: Parse the log file

        // Check if no features were found
        if (featureMap.isEmpty()) {
            System.out.println("No data found in the log file. Please check the log file format or contents.");
            return;
        }

        // Calculate overall summary statistics
        int totalScenarios = featureMap.values().stream().mapToInt(f -> f.getScenarios().size()).sum();
        int passedScenarios = featureMap.values().stream().flatMap(f -> f.getScenarios().stream()).filter(Scenario::isPassed).collect(Collectors.toList()).size();
        int failedScenarios = totalScenarios - passedScenarios;
        int warnings = (int) featureMap.values().stream().flatMap(f -> f.getScenarios().stream()).flatMap(s -> s.getLogs().stream()).filter(log -> log.contains("WARN")).count();
        int fatalErrors = (int) featureMap.values().stream().flatMap(f -> f.getScenarios().stream()).flatMap(s -> s.getLogs().stream()).filter(log -> log.contains("FATAL")).count();

        // Calculate percentages for the progress bar
        double passedPercentage = ((double) passedScenarios / totalScenarios) * 100;
        double failedPercentage = ((double) failedScenarios / totalScenarios) * 100;

        // Step 2: Generate HTML Report
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(reportFilePath))) {
            System.out.println("Generating HTML report at: " + reportFilePath);  // Debugging info

            writer.write("<html><head><title>Test Execution Dashboard</title>");
            writer.write("<style>");
            writer.write("body { font-family: Arial, sans-serif; } .summary { display: flex; justify-content: space-around; margin-bottom: 20px; }");
            writer.write(".summary div { text-align: center; } .progress-bar { width: 100%; height: 20px; background-color: #f3f3f3; border-radius: 10px; overflow: hidden; display: flex; margin-bottom: 10px; }");
            writer.write(".progress { height: 100%; text-align: center; color: white; font-weight: bold; } .progress-passed { background-color: #4CAF50; } .progress-failed { background-color: #f44336; }");
            writer.write(".feature-bar { cursor: pointer; padding: 10px; background-color: #e9ecef; border: 1px solid #ddd; margin-bottom: 5px; } .feature-details { display: none; margin-left: 20px; }");
            writer.write(".log-details { display: none; }");
            writer.write("table { width: 100%; border-collapse: collapse; margin-top: 10px; table-layout: fixed; }");  // Fixed table layout
            writer.write("th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }");
            writer.write(".passed { color: green; font-weight: bold; } .failed { color: red; font-weight: bold; } .warnings { color: orange; } .error-errors { color: red; }");
            writer.write(".log-warning { color: orange; font-weight: bold; } .log-error { color: red; font-weight: bold; } .log-fatal { color: darkred; font-weight: bold; }");

// Set specific styles for the log columns
            writer.write("td:nth-child(3) { max-width: 200px; overflow-wrap: break-word; word-wrap: break-word; }");  // Log column
            writer.write("pre { white-space: pre-wrap; word-wrap: break-word; max-width: 100%; overflow: auto; }");  // Ensure preformatted text wraps

            writer.write("</style>");
            writer.write("</head><body>");

            // Overall summary with progress bar for passed and failed percentages, warnings, and fatal errors
            writer.write("<h1>Test Execution Dashboard</h1>");
            writer.write("<div class='summary'><div><h2>Total Tests</h2><p>" + totalScenarios + "</p></div>");
            writer.write("<div><h2>Passed</h2><p style='color: #4CAF50;'>" + passedScenarios + "</p></div>");
            writer.write("<div><h2>Failed</h2><p style='color: #f44336;'>" + failedScenarios + "</p></div>");
            writer.write("<div><h2>Warnings</h2><p class='warnings'>" + warnings + "</p></div>");
            writer.write("<div><h2>Fatal Errors</h2><p class='fatal-errors'>" + fatalErrors + "</p></div></div>");
            writer.write("<div class='progress-bar'><div class='progress progress-passed' style='width: " + passedPercentage + "%;'>" + (int) passedPercentage + "% Passed</div>");
            writer.write("<div class='progress progress-failed' style='width: " + failedPercentage + "%;'>" + (int) failedPercentage + "% Failed</div></div>");

            // Loop through each unique feature
            for (Feature feature : featureMap.values()) {
                int featureTotal = feature.getScenarios().size();
                int featurePassed = (int) feature.getScenarios().stream().filter(Scenario::isPassed).count();
                int featureFailed = featureTotal - featurePassed;

                // Feature header with scenario count
                writer.write("<div class='feature-bar' onclick=\"toggleFeature('" + feature.getName().hashCode() + "')\">");
                writer.write("<h3>" + feature.getName() + " - Total: " + featureTotal + ", Passed: " + featurePassed + ", Failed: " + featureFailed + "</h3>");
                writer.write("</div><div id='" + feature.getName().hashCode() + "' class='feature-details' style='display:none;'>");

                // Scenario table within feature
                writer.write("<table><tr><th>Scenario</th><th>Status</th><th>Logs</th></tr>");
                for (Scenario scenario : feature.getScenarios()) {
                    String status = scenario.isPassed() ? "Passed" : "Failed";
                    String logId = "log-" + feature.getName().hashCode() + "-" + scenario.getName().replaceAll("\\s+", "_");

                    writer.write("<tr><td>" + scenario.getName() + "</td><td class='" + (scenario.isPassed() ? "passed" : "failed") + "'>" + status + "</td>");
                    writer.write("<td><button id='toggle-" + logId + "' onclick=\"toggleLog('" + logId + "')\">View Logs</button></td></tr>");

                    // Hidden log details
                    writer.write("<tr id='" + logId + "' class='log-details' style='display:none;'><td colspan='3'><pre>");
                    for (String log : scenario.getLogs()) {
                        // Apply styling based on log content
                        if (log.contains("WARN")) {
                            writer.write("<span class='log-warning'>" + log + "</span><br>");
                        } else if (log.contains("ERROR")) {
                            writer.write("<span class='log-error'>" + log + "</span><br>");
                        } else if (log.contains("FATAL")) {
                            writer.write("<span class='log-fatal'>" + log + "</span><br>");
                        } else {
                            writer.write(log + "<br>");
                        }
                    }
                    writer.write("</pre></td></tr>");
                }
                writer.write("</table></div>");
            }

            // Add JavaScript for toggling functionality for logs
            writer.write("<script>function toggleFeature(id) { var elem = document.getElementById(id); elem.style.display = (elem.style.display === 'none') ? 'block' : 'none'; }");
            writer.write("function toggleLog(id) { var elem = document.getElementById(id); var btn = document.getElementById('toggle-' + id);");
            writer.write("if (elem.style.display === 'none') { elem.style.display = 'table-row'; btn.innerText = 'Hide Logs'; } else { elem.style.display = 'none'; btn.innerText = 'View Logs'; } }");
            writer.write("</script>");
            writer.write("</body></html>");

            System.out.println("Report generated successfully!");

        } catch (IOException e) {
            System.out.println("Error generating report: " + e.getMessage());
        }
    }

    // Method to parse the log file and extract features and scenarios
    private Map<String, Feature> parseLogFile(String logFilePath) {
        Map<String, Feature> featureMap = new HashMap<>();
        Feature currentFeature = null;
        Scenario currentScenario = null;

        try (BufferedReader reader = Files.newBufferedReader(Paths.get(logFilePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
//                line = line.trim();
//                System.out.println("Processing log line: " + line);  // Debugging line

                if (line.contains("INFO : Feature:")) {
                    String featureName = line.substring(line.indexOf("Feature:") + 9);
                    currentFeature = featureMap.computeIfAbsent(featureName, Feature::new);  // Ensure feature exists
//                    System.out.println("New Feature: " + currentFeature.getName());  // Debugging line
                } else if (line.contains("INFO : Starting scenario:")) {
                    if (currentScenario != null) {
                        currentFeature.addScenario(currentScenario);  // Add previous scenario
                    }
                    currentScenario = new Scenario(line.substring(line.indexOf("Starting scenario:") + 19));  // Capture scenario name
//                    System.out.println("New Scenario: " + currentScenario.getName());  // Debugging line
                } else if (line.contains("INFO : Scenario passed:")) {
                    if (currentScenario != null) {
                        currentScenario.setPassed(true);
                        currentScenario.addLog(line);  // Add log for passed scenario
                        currentFeature.addScenario(currentScenario);
//                        System.out.println("Scenario passed: " + currentScenario.getName());  // Debugging line
                        currentScenario = null;  // Reset for next scenario
                    }
                } else if (line.contains("INFO : Scenario failed:")) {
                    if (currentScenario != null) {
                        currentScenario.setPassed(false);
                        currentScenario.addLog(line);  // Add log for failed scenario
                        currentFeature.addScenario(currentScenario);
//                        System.out.println("Scenario failed: " + currentScenario.getName());  // Debugging line
                        currentScenario = null;  // Reset for next scenario
                    }
                } else if (currentScenario != null) {
                    currentScenario.addLog(line);  // Add logs within a scenario
                }
            }

            // Add any remaining scenario and feature at the end
            if (currentScenario != null) {
                currentFeature.addScenario(currentScenario);
            }

        } catch (IOException e) {
            System.out.println("Error reading log file: " + e.getMessage());
        }

        return featureMap;
    }

    // Feature class to represent a feature and its scenarios
    static class Feature {
        private String name;
        private List<Scenario> scenarios = new ArrayList<>();

        public Feature(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }

        public void addScenario(Scenario scenario) {
            scenarios.add(scenario);
        }

        public List<Scenario> getScenarios() {
            return scenarios;
        }
    }

    // Scenario class to represent a scenario and its logs
    static class Scenario {
        private String name;
        private boolean passed;
        private List<String> logs = new ArrayList<>();

        public Scenario(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }

        public boolean isPassed() {
            return passed;
        }

        public void setPassed(boolean passed) {
            this.passed = passed;
        }

        public List<String> getLogs() {
            return logs;
        }

        public void addLog(String log) {
            logs.add(log);
        }
    }
}



