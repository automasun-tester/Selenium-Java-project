import { createLogger, format, transports } from "winston";

export function options(scenarioName: string) {
    return {
        level: "info",
        format: format.combine(format.colorize(), format.simple()),
        transports: [
            new transports.Console(), // ✅ Keep only console logs, remove file transport
        ],
    };
}