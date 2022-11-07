const asyncHandler = require('express-async-handler');

let roles = [
    'Admin',
    'Student',
    'Staff',
    'Tutor',
    'Module leader'
]

class RoleController {
    getAll = asyncHandler(async(req, res) => {
        return res.status(200).json(roles);
    })
}

module.exports = new RoleController();