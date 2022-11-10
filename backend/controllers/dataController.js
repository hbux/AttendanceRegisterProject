const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Register = require('../models/register');

const createFakeData_1 = asyncHandler(async(req, res) => {
    await createFakeStudents();
    await createFakeStaff();
    await createFakeAdmins();
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
                'Admin',
                'Staff',
                'Module leader',
                'Tutor',
                'Student'
            ]
        }
    ];

    await User.insertMany(superUsers);
}

const createFakeAdmins = async function() {
    admins = [
        {
            firstName: 'James',
            lastName: 'Washington',
            email: 'j.washington@admin.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Admin'
            ]
        },
        {
            firstName: 'Walter',
            lastName: 'White',
            email: 'w.white@admin.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Admin'
            ]
        },
        {
            firstName: 'Aden',
            lastName: 'Hall',
            email: 'a.hall@admin.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Admin'
            ]
        },
    ];

    await User.insertMany(admins);
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
        },
        {
            firstName: 'Wallace',
            lastName: 'Sloan',
            email: '100210@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Karim',
            lastName: 'Lamb',
            email: '100211@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Shantelle',
            lastName: 'Alexander',
            email: '100212@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Chelsie',
            lastName: 'Barnard',
            email: '100213@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Stefano',
            lastName: 'Bruce',
            email: '100214@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Leah',
            lastName: 'Lin',
            email: '100215@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Austen',
            lastName: 'Correa',
            email: '100216@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Sommer',
            lastName: 'Christie',
            email: '100217@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Loki',
            lastName: 'Legge',
            email: '100218@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Troy',
            lastName: 'Crouch',
            email: '100219@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Jolyon',
            lastName: 'Ashton',
            email: '100220@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Ridwan',
            lastName: 'Ashley',
            email: '100221@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Sherri',
            lastName: 'Hunter',
            email: '100222@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Mckenzie',
            lastName: 'Carroll',
            email: '100223@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Hayley',
            lastName: 'Spencer',
            email: '100224@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Ben',
            lastName: 'Hancock',
            email: '100225@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Talha',
            lastName: 'Ayala',
            email: '100226@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Kylan',
            lastName: 'Patterson',
            email: '100227@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Amar',
            lastName: 'Peel',
            email: '100228@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Ifan',
            lastName: 'Campos',
            email: '100229@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Jamie',
            lastName: 'Lam',
            email: '100230@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Kaylan',
            lastName: 'Plummer',
            email: '100231@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Dani',
            lastName: 'Mcpherson',
            email: '100232@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Najma',
            lastName: 'Rutledge',
            email: '100233@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Paul',
            lastName: 'Weeks',
            email: '100234@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Kasim',
            lastName: 'Allman',
            email: '100235@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Maria',
            lastName: 'Britt',
            email: '100236@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Debbie',
            lastName: 'Hills',
            email: '100237@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Alara',
            lastName: 'Valentine',
            email: '100238@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Liyana',
            lastName: 'Bautista',
            email: '100239@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Wilbur',
            lastName: 'Trujillo',
            email: '100240@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Marguerite',
            lastName: 'Jensen',
            email: '1041@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Miles',
            lastName: 'Whitley',
            email: '100243@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Lennon',
            lastName: 'Clemons',
            email: '100244@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Keiran',
            lastName: 'Trejo',
            email: '100245@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Gail',
            lastName: 'Rogers',
            email: '100246@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Noel',
            lastName: 'Kaur',
            email: '100247@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Arya',
            lastName: 'Callahan',
            email: '100248@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Tai',
            lastName: 'Heaton',
            email: '100249@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Brendan',
            lastName: 'Johnson',
            email: '100250@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Huseyin',
            lastName: 'Mckinney',
            email: '100251@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Marjorie',
            lastName: 'Humphreys',
            email: '100252@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Gracie',
            lastName: 'Kenny',
            email: '100253@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Paolo',
            lastName: 'Irwin',
            email: '100254@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Danielius',
            lastName: 'Bradford',
            email: '100255@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Victoria',
            lastName: 'Robins',
            email: '100256@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Aran',
            lastName: 'Bishop',
            email: '100257@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Menaal',
            lastName: 'Mcghee',
            email: '100258@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Mirza',
            lastName: 'Bailey',
            email: '100259@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Stephen',
            lastName: 'Trujillo',
            email: '100260@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Amos',
            lastName: 'Burke',
            email: '100261@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Conrad',
            lastName: 'Walton',
            email: '100262@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Omari',
            lastName: 'York',
            email: '100263@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Zohaib',
            lastName: 'Wormald',
            email: '100264@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Destiny',
            lastName: 'Bonilla',
            email: '100265@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Harpreet',
            lastName: 'Mccormick',
            email: '100266@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Ruby',
            lastName: 'Dean',
            email: '100267@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Sami',
            lastName: 'Ahmad',
            email: '100268@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Haleemah',
            lastName: 'Arroyo',
            email: '100269@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Dominic',
            lastName: 'Larson',
            email: '100270@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Lacie',
            lastName: 'Ramos',
            email: '100271@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Pierce',
            lastName: 'Woodward',
            email: '100272@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Millicent',
            lastName: 'Hood',
            email: '100273@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Chardonnay',
            lastName: 'Glass',
            email: '100274@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Rumaisa',
            lastName: 'Small',
            email: '100275@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Gerrard',
            lastName: 'Timms',
            email: '100276@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Angelika',
            lastName: 'Benjamin',
            email: '100277@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Aarron',
            lastName: 'OSullivan',
            email: '100278@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Tamanna',
            lastName: 'North',
            email: '100279@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Massimo',
            lastName: 'Simmonds',
            email: '100280@student.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Student'
            ]
        },
        {
            firstName: 'Glenn',
            lastName: 'Avery',
            email: '100281@student.uops.ac.uk',
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
        },
        {
            firstName: 'Tomi',
            lastName: 'Mayo',
            email: 't.mayo@staff.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Staff',
                'Tutor'
            ]
        },
        {
            firstName: 'Leonard',
            lastName: 'Fleming',
            email: 'l.flemming@staff.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Staff',
                'Tutor'
            ]
        },
        {
            firstName: 'Chantelle',
            lastName: 'Chan',
            email: 'c.chan@staff.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Staff',
                'Tutor'
            ]
        },
        {
            firstName: 'Nuala',
            lastName: 'Robles',
            email: 'n.robles@staff.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Staff',
                'Tutor'
            ]
        },
        {
            firstName: 'Shelley',
            lastName: 'Collier',
            email: 's.collier@staff.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Staff',
                'Tutor'
            ]
        },
        {
            firstName: 'Blossom',
            lastName: 'Horner',
            email: 'b.horner@staff.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Staff',
                'Tutor'
            ]
        },
        {
            firstName: 'Faizaan',
            lastName: 'Jensen',
            email: 'f.jensen@staff.uops.ac.uk',
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
        },
        {
            firstName: 'Emmett',
            lastName: 'Patterson',
            email: 'e.patterson@staff.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Staff',
                'Tutor',
                'Module Leader'
            ]
        },
        {
            firstName: 'Rhian',
            lastName: 'Barrera',
            email: 'r.barrera@staff.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Staff',
                'Tutor',
                'Module Leader'
            ]
        },
        {
            firstName: 'Ruby',
            lastName: 'Costa',
            email: 'r.costa@staff.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Staff',
                'Tutor',
                'Module Leader'
            ]
        },
        {
            firstName: 'Lexi',
            lastName: 'Irvine',
            email: 'l.irvine@staff.uops.ac.uk',
            hashedPassword: '$2b$08$34U0Wuzr58pJPguiZvO.su79XI6huH7ddu21Q0N6Vvonm29MuYRZm',
            roles: [
                'Staff',
                'Tutor',
                'Module Leader'
            ]
        },
        {
            firstName: 'Cruz',
            lastName: 'Delarosa',
            email: 'c.delarosa@staff.uops.ac.uk',
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
                    user: '636cd4218f02b16c1699c252'
                }
            },
            tutor: {
                staffId: 800200,
                firstName: 'Salahuddin',
                lastName: 'Hooper',
                user: '636cd4218f02b16c1699c252'
            },
            class: {
                startDate: '10/11/2022',
                duration: '10:00-12:00',
                students: [
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
                    user: '636cd4218f02b16c1699c252'
                }
            },
            tutor: {
                staffId: 800200,
                firstName: 'Salahuddin',
                lastName: 'Hooper',
                user: '636cd4218f02b16c1699c252'
            },
            class: {
                startDate: '10/11/2022',
                duration: '12:00-14:00',
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