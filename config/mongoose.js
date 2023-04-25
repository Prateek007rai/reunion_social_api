const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/reunion_social_api');

//creating connection with database
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to mongodb'));

db.once('open', function() {
  console.log("Successfully connected to the database");
});

//exporting db module for use in other places
module.exports = db;