// ========= //
// logger.js //
// ========= //

/**
 * This module provides simple logging functionality to text files.
 */

const DEFAULT_PATH = './logs/';

function log(message)
{
    log(message, DEFAULT_PATH);
}

function log(message, path = DEFAULT_PATH)
{
    const fs = require('fs');

    try
    {
        const logFile = `${path}log.txt`;

        console.log('Writing message to log file at: ' + logFile);
        fs.writeFileSync(logFile, message + '\n');
    }
    catch (err)
    {
        console.log(err.message);
    }
    finally
    {
        fs.closeSync();
    }
}