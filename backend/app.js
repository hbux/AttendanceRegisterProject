// Third-party dependencies
const express = require('express');
const mongoose = require('mongoose');

// Route dependencies
const indexRoute = require('./routes/indexRoute');

// Db config dependencies
const db = require('./config/keys').mongoUri;

const app = express();

// Connect to mongo (currently commented out as no database has been setup)
// mongoose.connect(db, { useNewUrlParser: true })
//     .then(() => console.log('MongoDB connected...'))
//     .catch(err => console.log(err));

const port = process.env.PORT || 3000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', indexRoute);

app.listen(port, console.log(`Server started on port: ${port}`));