const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const keys = require('../config/keys');

class UserController {
    // POST /user/login: This code attempts to login
    login = asyncHandler(async(req, res) => {
        // Retrieve email and password from request body
        let { email, password } = req.body;

        // Validation to ensure email and password are present
        if (!email || !password) {
            // Validation failed
            return res.status(400).send({ message: 'Please enter all required fields.' });
        }

        // Attempt to find a user based on email from database
        let user = await User.findOne({ email });

        if (!user) {
            // Couldn't find a user
            return res.status(400).send({ message: 'Invalid username or password.' });
        }

        // Using bcrypt to compare password with hashed password
        var isPasswordValid = bcrypt.compareSync(password, user.hashedPassword);

        if (!isPasswordValid) {
            // Passwords do not match
            return res.status(400).send({ message: 'Invalid username or password.' });
        }

        // Create access token with id, email and all the roles
        var accessToken = jwt.sign({
            id: user.id,
            email: user.email,
            roles: user.roles
        }, keys.securityKey);

        // nothing failed so return a success code with a username and access token
        return res.status(200).send({
            username: user.email,
            access_token: accessToken
        })
    })

    // POST /user/register: This code attempts to create a user in the database
    register = asyncHandler(async(req, res) => {
        // Use deconstruction to get all the required details from the request body
        const { firstName, lastName, email, password, confirmPassword, roles } = req.body;

        // Validation to ensure all details are present
        if (!firstName || !lastName || !email || !password || !confirmPassword || !roles) {
            // Validation failed
            return res.status(400).send({ message: 'Please enter all fields.' });
        }

        // Do both passwords match
        if (password != confirmPassword) {
            // Passwords don't match
            return res.status(400).send({ message: 'Passwords do not match.' });
        }

        // Attempt to find an existing user in the database (emails HAVE to be unique)
        let userExists = await User.findOne({ email });

        if (userExists) {
            // There is already a user with the same email
            return res.status(400).send({ message: 'Email already in use.' });
        }

        // Using bcrypt to hash the password securely
        let encryptedPassword  = bcrypt.hashSync(password, 8);

        // Create the user with details provided in the request
        const user = await User.create({
            firstName,
            lastName,
            email,
            hashedPassword: encryptedPassword,
            roles
        });

        if (user) {
            // Nothing failed, return success
            return res.status(200).send({ message: 'Thanks, your account has been created.' });
        } else {
            // user was null so something failed
            return res.status(400).send({ message: 'Something went wrong creating your account.' })
        }
    })

    // GET /user/: this method retrieves all users from the database
    getAllUsers = asyncHandler(async(req, res) => {
        // Get all users
        let allUsers = await User.find();

        // If user array is undefined (meaning an error occured when getting users)
        if (!allUsers) {
            return res.status(400).send({ message: 'Unable to load users from database.' });
        }

        // return the array of users as json
        return res.status(200).json(allUsers);
    })

    // PUT /user/: this method updates a user
    updateUser = asyncHandler(async(req, res) => {
        // The fields which need updating from the request
        let { id, firstName, lastName, email, roles } = req.body;

        // Ensure the fields aren't empty
        if (!id || !firstName || !lastName || !email || !roles) {
            return res.status(400).send({ message: 'Please enter all fields.' });
        }

        // Attempt to find the user by id
        let userToUpdate = await User.findById(id);

        // Couldn't find the user
        if (!userToUpdate) {
            return res.status(403).send({ message: 'Unauthorized to update this user.' });
        }

        // Update the neccessary fields
        userToUpdate.firstName = firstName;
        userToUpdate.lastName = lastName;
        userToUpdate.email = email;
        userToUpdate.roles = roles;

        // Save the user
        await userToUpdate.save();

        // nothing failed, return the new updated user
        return res.status(200).json(userToUpdate);
    })

    // DELETE /user/:id: this method deletes a user by id from the database
    deleteUser = asyncHandler(async(req, res) => {
        // Get the user id to delete from the request parameters 
        let id = req.params.id;

        // If ID was empty return an error
        if (!id) {
            return res.status(400).send({ message: 'Delete failed, no ID provided.' });
        }

        // Attempt to find the user and delete them, returns either success or error
        try {
            await User.findByIdAndDelete(id);

            return res.status(200).send({ message: 'User deleted successfully.' });
        } catch (error) {
            return res.status(400).send({ message: error });
        }
    })
}

module.exports = new UserController();