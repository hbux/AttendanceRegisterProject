// Third-party dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Route dependencies
const indexRoute = require('./routes/indexRoute');
const authenticationRoute = require('./routes/authenticationRoute');

// Db config dependencies
const db = require('./config/keys').mongoUri;

const app = express();

// Connect to mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const port = process.env.PORT || 3000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors());

// Routes
app.use('/', indexRoute);
app.use('/authentication', authenticationRoute);

app.listen(port, console.log(`Server started on port: ${port}`));