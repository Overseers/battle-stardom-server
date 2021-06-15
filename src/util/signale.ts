import { Signale, SignaleOptions } from "signale";

const options: SignaleOptions = {
    disabled: false,
    interactive: false,
    logLevel: "debug",
    secrets: [],
    types: {
        debug: {
            badge: "",
            color: "green",
            label: "[LOG] >",
        },
        error: {
            badge: "",
            color: "red",
            label: "[ERROR] >",
        },
        warn: {
            badge: "",
            color: "yellow",
            label: "[WARN] >",
        },
    },
};

const logger = new Signale(options);

logger.config({
    displayTimestamp: true,
    displayFilename: true,
    displayDate: true,
    underlineLabel: false,
});

console.log = logger.debug;
console.error = logger.error;
console.warn = logger.warn;
