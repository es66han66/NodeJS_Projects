# Custom Logger for Node.js

This is a custom logger for Node.js applications that allows you to filter log messages based on the type of log you want to view, and provides consistent, formatted logging for different log levels (`log`, `error`, `warn`, and `debug`).

## Installation

To use this custom logger in your project, simply copy the `logger.js` file into your project and require it where needed.

## Usage

1. **Import the logger:**

   ```javascript
   const logger = require('./logger');
   ```

2. **Create a logger instance for a specific log type:**

    ```javascript
    const appLogger = logger('app');
    const dbLogger = logger('database');
    ```

