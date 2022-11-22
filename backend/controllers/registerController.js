const asyncHandler = require('express-async-handler');
const Register = require('../models/register');

class RegisterController {
    // PUT /register/activate: This code attempts to activate a register
    activateRegister = asyncHandler(async(req, res) => {
        // use deconstruction to get the registerId from the request body
        let { id } = req.body;
        let user = req.user;

        // Find a register by id in the database
        let registerToUpdate = await Register.findById(id);

        if (!registerToUpdate) {
            // No register found
            return res.status(404).send({ message: 'Unable to active register. Register not found.' });
        }

        // Only the tutor of the class can activate the register
        if (registerToUpdate.tutor.user.id == user.id) {
            // the user who sent this request does not match the registers tutor
            return res.status(403).send({ message: 'Unable to activate register. You are not the tutor of the class.' });
        }

        // Validation to ensure the register is not already active
        if (registerToUpdate.isActive == true) {
            return res.status(400).send({ message: 'Register has already been activated.' });
        } 

        let randomCode = 0;

        do {
            // Create a random code for the register
            randomCode = Math.floor(Math.random() * 10000) + 1000;

            // find a register with existing code
            let existingCode = await Register.findOne({
                code: randomCode
            });

            // code already exists
            if (existingCode) {
                randomCode = 0;
            }

        } while(randomCode == 0);
        

        // Set the register status to active as the tutor has now activate it
        registerToUpdate.isActive = true;
        registerToUpdate.dateActivated = Date.now();
        registerToUpdate.code = randomCode;

        // Mongoose tracks entity changes, these will now be updated in the database
        await registerToUpdate.save();

        // Nothing failed, register has now been activated
        return res.status(200).json(registerToUpdate);
    })

    // GET /attendance/get/all: this method gets all the registers related to the tutor who sent the request
    getRegisters = asyncHandler(async(req, res) => {
        let user = req.user;

        // Find all registers who match the expression using mongoose DOT notation
        let registers = await Register.find({
            'tutor.user': user.id
        });

        // Nothing failed and array was populated return registers as json
        return res.status(200).json(registers);
    })

    // GET /attendance/get/:id: this method gets a register by registerId
    viewCohortAttendance = asyncHandler(async(req, res) => {
        // Retrieve id from parameters
        let id = req.params.id;
        let user = req.user;

        // Attempt to find a register by id
        let register = await Register.findById(id);

        // No register was found
        if (!register) {
            return res.status(404).send({ message: 'Unable to find register.' });
        }

        // Ensure the register tutor is the same as the tutor sending the request
        if (register.tutor.user != user.id) {
            return res.status(403).send({ message: 'Unauthorized to access this register.' });
        }

        // User is authorized to access the register so return it as json
        return res.status(200).json(register);
    })
}

module.exports = new RegisterController();