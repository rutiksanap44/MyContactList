// require the library
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

// connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

// acquire the connection(to check if it is successfull)
const db = mongoose.connection;

// if there is an error
db.on('error', console.error.bind(console, 'error connectiong to db'));

// if it is up and running then print the message
db.once('open', function () {
    console.log('Successfully connected to the database');
});