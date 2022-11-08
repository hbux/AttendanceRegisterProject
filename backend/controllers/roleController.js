const asyncHandler = require('express-async-handler');

// A list of all roles within the system
let roles = [
    'Admin',
    'Student',
    'Staff',
    'Tutor',
    'Module leader'
]

class RoleController {
    // GET /role: This code retrieves all roles as JSON
    getAll = asyncHandler(async(req, res) => {
        return res.status(200).json(roles);
    })
}

module.exports = new RoleController();