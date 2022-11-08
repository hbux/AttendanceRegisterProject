// Third-party dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

// Route dependencies
const userRoute = require('./routes/userRoute');
const roleRoute = require('./routes/roleRoute');
const registerRoute = require('./routes/registerRoute');

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

// Logger
app.use(logger('dev'));

// Routes
app.use('/user', userRoute);
app.use('/role', roleRoute);
app.use('/register', registerRoute);

app.listen(port, console.log(`Server started on port: ${port}`));