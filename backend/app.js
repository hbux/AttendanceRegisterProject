// Third-party dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

// Route dependencies
const userRoute = require('./routes/userRoute');
const roleRoute = require('./routes/roleRoute');
const attendanceRoute = require('./routes/attendanceRoute');
const registerRoute = require('./routes/registerRoute');
const dataRoute = require('./routes/dataRoute');

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
app.use('/attendance', attendanceRoute);
app.use('/register', registerRoute);
app.use('/data', dataRoute);

app.listen(port, console.log(`Server started on port: ${port}`));