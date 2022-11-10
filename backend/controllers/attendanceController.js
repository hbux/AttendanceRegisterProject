const asyncHandler = require('express-async-handler');
const Register = require('../models/register');

class AttendanceController {
    // POST /attendance/: This code attempts to register the user in a class
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
            return res.status(404).send({ message: 'Register has not been activated yet, try again when the tutor has activated the register.' });
        }

        // Only a student who is timetabled for this class can register their attendance
        let student = register.class.students.find(s => s.user == user.id);

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

    // PUT /attendance/: this method updates a students attendance
    editStudentAttendance = asyncHandler(async(req, res) => {
        let { registerId, student } = req.body;
        let user = req.user;
        
        // Find the register by the ID
        let register = await Register.findById(registerId);

        // No register was found
        if (!register) {
            return res.status(404).send({ message: 'Unable to find register.' });
        }

        // Regsiters can be ACTIVE (true/false), a tutor can activate a register which changes this to true
        if (register.isActive == false) {
            // Register not active
            return res.status(404).send({ message: 'Register has not been activated yet.' });
        }

        // Ensure the register tutor is the same as the tutor sending the request
        if (register.tutor.user != user.id) {
            return res.status(403).send({ message: 'Unauthorized to access this register.' });
        }

        // Find the student on the register
        let studentToUpdate = register.class.students.find(s => s.user == student.user);

        // No student found - they aren't listed in the timetable
        if (!studentToUpdate) {
            return res.status(403).send({ message: 'Student is not registered in this class.' });
        }

        // Set it to the opposite of what it current is
        studentToUpdate.hasRegistered = !studentToUpdate.hasRegistered;

        // Save the change
        await register.save();

        // Nothing failed, changing student attendance succeeded.
        return res.status(200).json(register.class.students);
    })
}

module.exports = new AttendanceController();