// ========= //
// server.js //
// ========= //

/**
 * This file is an abstraction layer above the database.
 * It encapsulates the use of the database by hiding it from the user.
 * It provides api end-points for the user to use.
 */

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const db = require('./queries');



app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => { response.json({ info: 'Node.js, Express, and Postgres API' }); });

// ------------------------------------------- //
// CRUD-L: Create, Read, Update, Delete, List. //
// ------------------------------------------- //

// Create
app.post('/users', db.createUser);

// Read
app.get('/users/:id', db.getUserById);

// Update
app.put('/users/:id', db.updateUser);

// Delete
app.delete('/users/:id', db.deleteUser);

// List
app.get('/users', db.getUsers);


app.listen(port, () => { console.log(`The server is running on port ${port}.`); });