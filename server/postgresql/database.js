// =========== //
// database.js //
// =========== //

/**
 * This file serves as a configuration file for postgresql database,
 * and creates connection Pool for us to use.
 */

 const { Pool } = require('pg');
 const pool = new Pool({
   user: 'postgre',
   host: 'localhost',
   database: 'applications',
   password: 'Aa123456',
   port: 5433,
 });

 exports.pool;