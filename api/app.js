'use strict';

// load modules
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const notesRoutes = require('./routes/notes');

const MongoClient = require('mongodb').MongoClient;
const {connectionString, DB, collection} = require('./config/config');
//Create new instance of MongoClient
const client = new MongoClient(connectionString);

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

//Create Port variable
const port = process.env.PORT || 5000;

// create the Express app
const app = express();

// Enable All CORS Requests
app.use(cors());

app.use(express.json());


//Use courses routes
app.use('/api', notesRoutes);

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);


// Test the database connection.
(async () => {
  try {
    await client.connect();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


//Set up app listener on port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});