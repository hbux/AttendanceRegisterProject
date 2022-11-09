const asyncHandler = require('express-async-handler');
const Register = require('../models/register');

class RegisterController {
    // POST /register/code: This code attempts to register the user in a class
    registerCode = asyncHandler(async(req, res) => {
        // use deconstruction to get the code from the request body
        let { code } = req.body;
        let user = req.user;

        // Attempt to find a register which has the same code
        let register = await Register.findOne({ code });

        // No register found
        if (!register) {
            return res.status(404).send({ message: 'Registration code invalid.' });
        }

        // Regsiters can be ACTIVE (true/false), a tutor can activate a register which changes this to true
        if (register.isActive == false) {
            // Register not active
            return res.status(404).send({ message: 'Register has not been opened yet, try again when the tutor has activated the register.' });
        }


        register.class.students.forEach(s => console.log(s.user.toString()));
        console.log(user.id);

        // Only a student who is timetabled for this class can register their attendance
        let student = register.class.students.find(s => s.user == user.id);

        console.log(student);

        // No student found - they aren't listed in the timetable
        if (!student) {
            return res.status(403).send({ message: 'Registration code invalid.' });
        }

        // Student has already registered their attendance
        if (student.hasRegistered == true) {
            return res.status(400).send({ message: 'You have already registered your attendance for this class.' });
        }

        // Set the register status to true
        student.hasRegistered = true;

        // Mongoose tracks changes similar to EF Core, as I have now
        // change hasRegistered to true
        // this change will now be saved
        await register.save();

        // Nothing failed, registration was a sucess
        return res.status(200).send({ message: 'Successfully registered your attendance for this class.' });
    })

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

        // Create a random code for the register
        let randomCode = Math.floor(Math.random() * 10000) + 1000;

        // Set the register status to active as the tutor has now activate it
        registerToUpdate.isActive = true;
        registerToUpdate.dateActivated = Date.now();
        registerToUpdate.code = randomCode;

        // TODO
        // Ensure code is not the same as any other register
    
        // Mongoose tracks entity changes, these will now be updated in the database
        await registerToUpdate.save();

        // Nothing failed, register has now been activated
        return res.status(200).json(registerToUpdate);
    })

    // GET /register/getall: this method gets all the registers related to the tutor who sent the request
    getRegisters = asyncHandler(async(req, res) => {
        let user = req.user;

        // Find all registers who match the expression using mongoose DOT notation
        let registers = await Register.find({
            'tutor.user': user.id
        });

        // Nothing failed and array was populated return registers as json
        return res.status(200).json(registers);
    })

    getRegister = asyncHandler(async(req, res) => {
        let id = req.params.id;
        let user = req.user;

        let register = await Register.findById(id);

        if (!register) {
            return res.status(404).send({ message: 'Unable to find register.' });
        }

        if (register.tutor.user != user.id) {
            return res.status(403).send({ message: 'Unauthorized to access this register.' });
        }

        return res.status(200).json(register);
    })
}

module.exports = new RegisterController();