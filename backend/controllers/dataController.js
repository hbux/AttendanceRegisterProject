const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Register = require('../models/register');

const createFakeData_1 = asyncHandler(async(req, res) => {
    await createFakeStudents();
    await createFakeStaff();
    await createSuperUsers();

    return res.status(200).send();
})

const createFakeData_2 = asyncHandler(async(req, res) => {
    await createFakeRegisters();

    return res.status(200).send();
})

const createSuperUsers = async function() {
    superUsers = [
        {
            firstName: 'Tom',
            lastName: 'North',
            email: 't.north@admin.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Admin'
            ]
        }
    ];

    await User.insertMany(superUsers);
}

const createFakeStudents = async function() {
    students = [
        {
            firstName: 'James',
            lastName: 'Smith',
            email: '100200@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'John',
            lastName: 'Smith',
            email: '100201@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'John',
            lastName: 'Doe',
            email: '100202@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Marge',
            lastName: 'Simpson',
            email: '100282@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Homer',
            lastName: 'Smith',
            email: '100283@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Susan',
            lastName: 'Mayflower',
            email: '100284@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Abdullah',
            lastName: 'Malik',
            email: '100204@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Zain',
            lastName: 'Whaid',
            email: '100205@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Bethany',
            lastName: 'Green',
            email: '100206@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Ammar',
            lastName: 'Saeed',
            email: '100207@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Iolo',
            lastName: 'Hester',
            email: '100208@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Blossom',
            lastName: 'Hill',
            email: '100209@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Kelsea',
            lastName: 'Brewer',
            email: '100285@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        }
    ];

    await User.insertMany(students);
}

const createFakeStaff = async function() {
    tutors = [
        {
            firstName: 'Julie',
            lastName: 'Robbins',
            email: 'j.robbins@staff.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Staff',
                'Tutor'
            ]
        }
    ];

    moduleLeaders = [
        {
            firstName: 'Salahuddin',
            lastName: 'Hooper',
            email: 's.hooper@staff.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Staff',
                'Tutor',
                'Module Leader'
            ]
        }
    ];

    await User.insertMany(tutors);
    await User.insertMany(moduleLeaders);
}

const createFakeRegisters = async function() {
    let registers = [
        {
            isActive: false,
            module: {
                moduleId: '55-608212-AF-20223',
                name: 'Human Factors',
                moduleLeader: {
                    staffId: 800200,
                    firstName: 'Salahuddin',
                    lastName: 'Hooper',
                    user: '636d14545451a04e72d994c1'
                }
            },
            tutor: {
                staffId: 800200,
                firstName: 'Salahuddin',
                lastName: 'Hooper',
                user: '636d14545451a04e72d994c1'
            },
            class: {
                startDate: '10/11/2022',
                duration: '10:00-12:00',
                students: [
                    {
                        studentId: '100200',
                        firstName: 'James',
                        lastName: 'Smith',
                        user: '636d14545451a04e72d994b1',
                        hasRegistered: false
                    },
                    {
                        studentId: '100201',
                        firstName: 'John',
                        lastName: 'Smith',
                        user: '636d14545451a04e72d994b2',
                        hasRegistered: false
                    },
                    {
                        studentId: '100202',
                        firstName: 'John',
                        lastName: 'Doe',
                        user: '636d14545451a04e72d994b3',
                        hasRegistered: false
                    },
                    {
                        studentId: '100282',
                        firstName: 'Marge',
                        lastName: 'Simpson',
                        user: '636d14545451a04e72d994b4',
                        hasRegistered: false
                    },
                    {
                        studentId: '100283',
                        firstName: 'Homer',
                        lastName: 'Smith',
                        user: '636d14545451a04e72d994b5',
                        hasRegistered: false
                    },
                    {
                        studentId: '100284',
                        firstName: 'Susan',
                        lastName: 'Mayflower',
                        user: '636d14545451a04e72d994b6',
                        hasRegistered: false
                    }
                ]
            }
        },
        {
            isActive: false,
            module: {
                moduleId: '55-608212-AF-20223',
                name: 'Human Factors',
                moduleLeader: {
                    staffId: 800200,
                    firstName: 'Salahuddin',
                    lastName: 'Hooper',
                    user: '636d14545451a04e72d994c1'
                }
            },
            tutor: {
                staffId: 800200,
                firstName: 'Salahuddin',
                lastName: 'Hooper',
                user: '636d14545451a04e72d994c1'
            },
            class: {
                startDate: '10/11/2022',
                duration: '12:00-14:00',
                students: [
                    {
                        studentId: '100204',
                        firstName: 'Abdullah',
                        lastName: 'Malik',
                        user: '636d14545451a04e72d994b7',
                        hasRegistered: false
                    },
                    {
                        studentId: '100205',
                        firstName: 'Zain',
                        lastName: 'Whaid',
                        user: '636d14545451a04e72d994b8',
                        hasRegistered: false
                    },
                    {
                        studentId: '100206',
                        firstName: 'Bethany',
                        lastName: 'Green',
                        user: '636d14545451a04e72d994b9',
                        hasRegistered: false
                    },
                    {
                        studentId: '100207',
                        firstName: 'Ammar',
                        lastName: 'Saeed',
                        user: '636d14545451a04e72d994ba',
                        hasRegistered: false
                    },
                    {
                        studentId: '100208',
                        firstName: 'Iolo',
                        lastName: 'Hester',
                        user: '636d14545451a04e72d994bb',
                        hasRegistered: false
                    },
                    {
                        studentId: '100209',
                        firstName: 'Blossom',
                        lastName: 'Hill',
                        user: '636d14545451a04e72d994bc',
                        hasRegistered: false
                    },
                    {
                        studentId: '100284',
                        firstName: 'Kelsea',
                        lastName: 'Brewer',
                        user: '636d14545451a04e72d994bd',
                        hasRegistered: false
                    }
                ]
            }
        },
        {
            isActive: false,
            module: {
                moduleId: '55-608212-AF-20223',
                name: 'Human Factors',
                moduleLeader: {
                    staffId: 800200,
                    firstName: 'Salahuddin',
                    lastName: 'Hooper',
                    user: '636d14545451a04e72d994c1'
                }
            },
            tutor: {
                staffId: 800201,
                firstName: 'Julie',
                lastName: 'Robbins',
                user: '636d14545451a04e72d994bf'
            },
            class: {
                startDate: '14/11/2022',
                duration: '9:00-1:00',
                students: [
                    {
                        studentId: '100204',
                        firstName: 'Abdullah',
                        lastName: 'Malik',
                        user: '636d14545451a04e72d994b7',
                        hasRegistered: false
                    },
                    {
                        studentId: '100205',
                        firstName: 'Zain',
                        lastName: 'Whaid',
                        user: '636d14545451a04e72d994b8',
                        hasRegistered: false
                    },
                    {
                        studentId: '100206',
                        firstName: 'Bethany',
                        lastName: 'Green',
                        user: '636d14545451a04e72d994b9',
                        hasRegistered: false
                    },
                    {
                        studentId: '100207',
                        firstName: 'Ammar',
                        lastName: 'Saeed',
                        user: '636d14545451a04e72d994ba',
                        hasRegistered: false
                    },
                    {
                        studentId: '100208',
                        firstName: 'Iolo',
                        lastName: 'Hester',
                        user: '636d14545451a04e72d994bb',
                        hasRegistered: false
                    },
                    {
                        studentId: '100209',
                        firstName: 'Blossom',
                        lastName: 'Hill',
                        user: '636d14545451a04e72d994bc',
                        hasRegistered: false
                    },
                    {
                        studentId: '100284',
                        firstName: 'Kelsea',
                        lastName: 'Brewer',
                        user: '636d14545451a04e72d994bd',
                        hasRegistered: false
                    },
                    {
                        studentId: '100200',
                        firstName: 'James',
                        lastName: 'Smith',
                        user: '636d14545451a04e72d994b1',
                        hasRegistered: false
                    },
                    {
                        studentId: '100201',
                        firstName: 'John',
                        lastName: 'Smith',
                        user: '636d14545451a04e72d994b2',
                        hasRegistered: false
                    },
                    {
                        studentId: '100202',
                        firstName: 'John',
                        lastName: 'Doe',
                        user: '636d14545451a04e72d994b3',
                        hasRegistered: false
                    },
                    {
                        studentId: '100282',
                        firstName: 'Marge',
                        lastName: 'Simpson',
                        user: '636d14545451a04e72d994b4',
                        hasRegistered: false
                    },
                    {
                        studentId: '100283',
                        firstName: 'Homer',
                        lastName: 'Smith',
                        user: '636d14545451a04e72d994b5',
                        hasRegistered: false
                    },
                    {
                        studentId: '100284',
                        firstName: 'Susan',
                        lastName: 'Mayflower',
                        user: '636d14545451a04e72d994b6',
                        hasRegistered: false
                    }
                ]
            }
        },
        {
            isActive: false,
            module: {
                moduleId: '55-608212-AF-20223',
                name: 'Human Factors',
                moduleLeader: {
                    staffId: 800200,
                    firstName: 'Salahuddin',
                    lastName: 'Hooper',
                    user: '636d14545451a04e72d994c1'
                }
            },
            tutor: {
                staffId: 800201,
                firstName: 'Julie',
                lastName: 'Robbins',
                user: '636d14545451a04e72d994bf'
            },
            class: {
                startDate: '17/11/2022',
                duration: '16:00-17:00',
                students: [
                    {
                        studentId: '100204',
                        firstName: 'Abdullah',
                        lastName: 'Malik',
                        user: '636cd4218f02b16c1699c1fa',
                        hasRegistered: false
                    },
                    {
                        studentId: '100205',
                        firstName: 'Zain',
                        lastName: 'Whaid',
                        user: '636cd4218f02b16c1699c1fb',
                        hasRegistered: false
                    },
                    {
                        studentId: '100206',
                        firstName: 'Bethany',
                        lastName: 'Green',
                        user: '636cd4218f02b16c1699c1fc',
                        hasRegistered: false
                    },
                    {
                        studentId: '100207',
                        firstName: 'Ammar',
                        lastName: 'Saeed',
                        user: '636cd4218f02b16c1699c1fd',
                        hasRegistered: false
                    },
                    {
                        studentId: '100208',
                        firstName: 'Iolo',
                        lastName: 'Hester',
                        user: '636cd4218f02b16c1699c1fe',
                        hasRegistered: false
                    },
                    {
                        studentId: '100209',
                        firstName: 'Blossom',
                        lastName: 'Hill',
                        user: '636cd4218f02b16c1699c1ff',
                        hasRegistered: false
                    },
                    {
                        studentId: '100284',
                        firstName: 'Kelsea',
                        lastName: 'Brewer',
                        user: '636cd4218f02b16c1699c200',
                        hasRegistered: false
                    },
                    {
                        studentId: '100200',
                        firstName: 'James',
                        lastName: 'Smith',
                        user: '636cd4218f02b16c1699c1f4',
                        hasRegistered: false
                    },
                    {
                        studentId: '100201',
                        firstName: 'John',
                        lastName: 'Smith',
                        user: '636cd4218f02b16c1699c1f5',
                        hasRegistered: false
                    },
                    {
                        studentId: '100202',
                        firstName: 'John',
                        lastName: 'Doe',
                        user: '636cd4218f02b16c1699c1f6',
                        hasRegistered: false
                    },
                    {
                        studentId: '100282',
                        firstName: 'Marge',
                        lastName: 'Simpson',
                        user: '636cd4218f02b16c1699c1f7',
                        hasRegistered: false
                    },
                    {
                        studentId: '100283',
                        firstName: 'Homer',
                        lastName: 'Smith',
                        user: '636cd4218f02b16c1699c1f8',
                        hasRegistered: false
                    },
                    {
                        studentId: '100284',
                        firstName: 'Susan',
                        lastName: 'Mayflower',
                        user: '636cd4218f02b16c1699c1f9',
                        hasRegistered: false
                    }
                ]
            }
        }
    ];

    await Register.insertMany(registers);
}

module.exports = {
    createFakeData_1,
    createFakeData_2
}