const debugLogTypes = (process.env.DEBUG || "*")
  .split(",")
  .map((ele) => ele.trim());

const logger = (logType) => {
  const log = (mode, message) => {
    const logMessage = `${new Date().toISOString()} ${mode} [${logType}]: ${message}`;

    if (mode === "error") {
      console.error(logMessage);
      return;
    }

    if (debugLogTypes.includes("*") || debugLogTypes.includes(logType)) {
      console[mode](logMessage);
    }
  };

  return {
    log: (message) => log("log", message),
    error: (message) => log("error", message),
    warn: (message) => log("warn", message),
    debug: (message) => log("debug", message),
  };
};

module.exports = logger;