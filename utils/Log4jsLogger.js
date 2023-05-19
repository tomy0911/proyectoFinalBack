import log4js from "log4js";
import dotenv from "dotenv";

dotenv.config();

log4js.configure({
  appenders: {
    terminal: { type: "console" },
    warnFile: { type: "file", filename: "./logs/warn.log" },
    errorFile: { type: "file", filename: "./logs/error.log" },
    loggerInfo: { type: "logLevelFilter", appender: "terminal", level: "info" },
    loggerWarn: {
      type: "logLevelFilter",
      appender: "warnFile",
      level: "warn",
      maxLevel: "warn",
    },
    loggerError: {
      type: "logLevelFilter",
      appender: "errorFile",
      level: "error",
      maxLevel: "error",
    },
  },
  categories: {
    default: {
      appenders: ["terminal", "loggerWarn", "loggerError"],
      level: "info",
    },
  },
});

const logger = log4js.getLogger();

export default logger;
