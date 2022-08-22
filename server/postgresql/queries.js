// ========== //
// queries.js //
// ========== //

// This file contains the queries for interaction with postgresql database.

/* move to database.js file
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgre',
  host: 'localhost',
  database: 'applications',
  password: 'Aa123456',
  port: 5433,
});
*/

const nanoid = require('nanoid');
const pool = require('./database.js').pool;

// Check against the database and returns available id.
function getAvailableId()
{
    /*
    //import { nanoid } from 'nanoid'
    const nanoid = require('nanoid');

    const MAX_TRIES = 100;

    let tries = 0;
    let currId = nanoid(); //=> "V1StGXR8_Z5jdHi6B-myT"

    let validId = 'Not Valid';

    const DOES_EXIST_QUERY = `SELECT Id FROM applications WHERE EXISTS (SELECT Id FROM applications WHERE Id=${currId})`

    do
    {

    }
    while (tries <= MAX_TRIES);

    return validId;
    */

    const nanoid = require('nanoid');
    return nanoid();
}

// Create
const createApplication = (request, response) => {
    //const { name, email } = request.body;

    const { id, name, companyName, description, imageUrl, price, createdAt }

    const INSERT_QUERY = 'INSERT INTO applications (Id, name, companyName, description, imageUrl, price, createdAt) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

    pool.query(INSERT_QUERY,
        [name, email],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(201).send(`User added with ID: ${results.rows[0].id}`);
        }
    );
}

// List
const getAllApplications = async (request, response) => {

    let applicationsArr = [];

    try
    {
        const result = await pool.query('SELECT * FROM applications ORDER BY name ASC', (error, results) => {
            if (error) { throw error; }
            //response.status(200).json(results.rows);
            applicationsArr = results.rows;
        });
    }
    catch (err)
    {
        console.log(error.message);
    }

    return applicationsArr;
}

// Get
const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};


// Update
const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User modified with ID: ${id}`);
        }
    );
};


// Delete
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM users WHERE id=$1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User deleted with ID: ${id}`);
    });
};

module.exports = {
    getUsers,
    getUserById,
    createApplication,
    updateUser,
    deleteUser,
};