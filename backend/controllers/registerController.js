const asyncHandler = require('express-async-handler');
const Register = require('../models/register');

class RegisterController {
    registerCode = asyncHandler(async(req, res) => {
        let { code } = req.body;
        let user = req.user;

        let register = await Register.findOne({ code });

        if (!register) {
            return res.status(404).send({ message: 'Registration code invalid.' });
        }

        if (register.isActive == false) {
            return res.status(404).send({ message: 'Register has not been opened yet, try again when the tutor has activated the register.' });
        }

        let student = register.class.students.find(s => s.user == user.id);

        if (!student) {
            return res.status(403).send({ message: 'Registration code invalid.' });
        }

        if (student.hasRegistered == true) {
            return res.status(400).send({ message: 'You have already registered your attendance for this class.' });
        }

        student.hasRegistered = true;

        await register.save();

        return res.status(200).send({ message: 'Successfully registered your attendance for this class.' });
    })

    activateRegister = asyncHandler(async(req, res) => {
        let { registerId } = req.body;
        let user = req.user;

        let register = await Register.findById(registerId);

        if (!register) {
            return res.status(404).send({ message: 'Unable to active register. Register not found.' });
        }

        if (register.tutor.user.id == user.id) {
            return res.status(403).send({ message: 'Unable to active register. You are not the tutor of the class.' });
        }

        if (register.isActive == true) {
            return res.status(400).send({ message: 'Register has already been activated.' });
        } 

        let randomCode = Math.floor(Math.random() * 10000) + 1000;

        register.isActive = true;
        register.dateActivated = Date.now();
        register.code = randomCode;

        // Ensure code is not the same as any other register
    
        await register.save();

        return res.status(200).send({ message: 'Register successfully activated.' });
    })

    createFakeData = asyncHandler(async(req, res) => {
        let register_1 = await Register.create({
            isActive: false,
            module: {
                moduleId: "909882-AF-SEM1",
                name: "Software Architecture and Design",
                moduleLeader: {
                    staffId: 30491,
                    firstName: "Soumya",
                    lastName: "Basu",
                    user: "636a811bbe034a8c406367a6"
                }
            },
            tutor: {
                staffId: 30491,
                firstName: "Soumya",
                lastName: "Basu",
                user: "636a811bbe034a8c406367a6"
            },
            class: {
                startDate: Date.now(),
                duration: "10:00-12:00",
                students: 
                [
                    {
                        studentId: 100120,
                        firstName: "John",
                        lastName: "Doe",
                        user: "636a89e757727da50403fee0",
                        hasRegistered: false
                    }
                ]
            }
        });

        return res.status(200).send(register_1);
    })
}

module.exports = new RegisterController();