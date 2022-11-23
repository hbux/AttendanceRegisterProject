let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

// Some routes require roles: use this in the authorization header:
// e.g. userTokens.adminToken for admin token
const userTokens = {
    adminToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQxNDU0NTQ1MWEwNGU3MmQ5OTRjMyIsImVtYWlsIjoidC5ub3J0aEBhZG1pbi51b3BzLmFjLnVrIiwicm9sZXMiOlsiQWRtaW4iXSwiaWF0IjoxNjY4Njg3MjY1fQ.7knyeWGZqnRbJZh6cosdQfqrfYll5vdCCd6vfeHuODM",
    moduleLeaderToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQxNDU0NTQ1MWEwNGU3MmQ5OTRjMSIsImVtYWlsIjoicy5ob29wZXJAc3RhZmYudW9wcy5hYy51ayIsInJvbGVzIjpbIlN0YWZmIiwiVHV0b3IiLCJNb2R1bGUgTGVhZGVyIl0sImlhdCI6MTY2ODY4NzM3NX0.gbDaWsGg4mMdtHmpVSDT-kKai96yZLbZ1nqYWGodmrc",
    tutorToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQxNDU0NTQ1MWEwNGU3MmQ5OTRiZiIsImVtYWlsIjoiai5yb2JiaW5zQHN0YWZmLnVvcHMuYWMudWsiLCJyb2xlcyI6WyJTdGFmZiIsIlR1dG9yIl0sImlhdCI6MTY2ODY4NzUwM30.ASqGaGD7_UZrhGlmKh8JxdldPWXb2TXLAhvaxSn8Fhc",
    studentToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQxNDU0NTQ1MWEwNGU3MmQ5OTRiMSIsImVtYWlsIjoiMTAwMjAwQHN0dWRlbnQudW9wcy5hYy51ayIsInJvbGVzIjpbIlN0dWRlbnQiXSwiaWF0IjoxNjY4Njg3NTIwfQ.atXjTwbXykRe7bjTBOpOO-yzZOY4WYteEc1CYiEv-pA"
}

// Testing the user controller
describe('Testing all of the User Controller', () => {

    // Testing that the system logs the user in when provided a valid email and password
    describe('POST /user/login', () => {
        it('Should log the user in successfully by returning a username and access_token when provided a valid email and password.', (done) => {
            let loginDetails = {
                email: '100200@student.uops.ac.uk',
                password: '12345'
            }
            
            chai.request(app)
                .post('/user/login')
                .send(loginDetails)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('username')
                    res.body.should.have.property('access_token')
                    
                    done();
                })
        })
    });

    // Testing that the system registers a new user when providing valid details with valid authentication and authorization
    // To register a new user you MUST be logged in and be an admin of the system
    describe('POST /user/register', () => {
        it('Should register a new user when providing valid details and valid authentication and authorization.', (done) => {
            let registerDetails = {
                firstName: 'Tester',
                lastName: 'Testing',
                email: 'test@test.uops.ac.uk',
                password: '12345',
                confirmPassword: '12345',
                roles: ['Test']
            }

            chai.request(app)
            .post('/user/register')
            .set('Authorization', userTokens.adminToken)
            .send(registerDetails)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('Thanks, your account has been created.');

                done();
            })
        })
    });

    // Testing that the system edits an existing user when providing valid details with valid authentication and authorization
    // To edit an existing user you MUST be logged in and be an admin of the system
    describe('PUT /user/', () => {
        it('Should edit an existing user successfully when provided valid details and valid authentication and authorization.', (done) => {
            let editStudentDetails = {
                id: '636d14545451a04e72d994b8',
                firstName: 'Zain',
                lastName: 'Whaid',
                email: '100205@student.uops.ac.uk',
                roles: ['Student']
            }

            chai.request(app)
            .put('/user/')
            .set('Authorization', userTokens.adminToken)
            .send(editStudentDetails)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                done();
            })
        })
    });

    // Testing that the fails to log the user in when provided an invalid email and a valid password
    describe('POST /user/login', () => {
        it('Should fail to log the user in when provided an invalid email and a valid password.', (done) => {
            let loginDetails = {
                email: '',
                password: '12345'
            }

            chai.request(app)
            .post('/user/login')
            .send(loginDetails)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('Please enter all required fields.');
                
                done();
            })
        })
    });

    // Testing that the fails to log the user in when provided a valid email but an invalid password
    describe('POST /user/login', () => {
        it('Should fail to log the user in when provided a valid email but an invalid password.', (done) => {
            let loginDetails = {
                email: '100200@student.uops.ac.uk',
                password: ''
            }

            chai.request(app)
            .post('/user/login')
            .send(loginDetails)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('Please enter all required fields.');
                
                done();
            })
        })
    });

    // Testing that the fails to log the user in when provided an email and password that does not match a user
    describe('POST /user/login', () => {
        it('Should fail to log the user in when provided a valid email and password that does not match an account.', (done) => {
            let loginDetails = {
                email: 'test@test.com',
                password: '12345'
            }

            chai.request(app)
            .post('/user/login')
            .send(loginDetails)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('Invalid username or password.');
                
                done();
            })
        })
    });

    // Testing that registering a user without being logged in does not allow the user to pass the middleware
    // To register a new user you MUST be logged in and be an admin of the system
    describe('POST /user/register', () => {
        it('Should fail to register a new user without being logged in.', (done) => {
            let registerDetails = {
                firstName: 'Tester',
                lastName: 'Testing',
                email: 't.testing@testing.uops.ac.uk',
                password: '12345',
                confirmPassword: '12345',
                roles: ['Test']
            }

            chai.request(app)
            .post('/user/register')
            .send(registerDetails)
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('Token invalid. Unauthorized.');

                done();
            })
        })
    });

    // Testing that registering a user without having an admin role does not allow the user to pass the middleware
    // To register a new user you MUST be logged in and be an admin of the system
    describe('POST /user/register', () => {
        it('Should fail to register a new user without having an admin role when logged in.', (done) => {
            let registerDetails = {
                firstName: 'Tester',
                lastName: 'Testing',
                email: 't.testing@testing.uops.ac.uk',
                password: '12345',
                confirmPassword: '12345',
                roles: ['Test']
            }

            chai.request(app)
            .post('/user/register')
            .set('Authorization', userTokens.studentToken)
            .send(registerDetails)
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('User is not authorized to access admin resources.');

                done();
            })
        })
    });

    // Testing that registering a user without having a first name field does not allow the user to register a new user
    // To register a new user you MUST be logged in and be an admin of the system
    describe('POST /user/register', () => {
        it('Should fail to register a new user when provided an invalid first name.', (done) => {
            let registerDetails = {
                firstName: '',
                lastName: 'Testing',
                email: 't.testing@testing.uops.ac.uk',
                password: '12345',
                confirmPassword: '12345',
                roles: ['Test']
            }

            chai.request(app)
            .post('/user/register')
            .set('Authorization', userTokens.adminToken)
            .send(registerDetails)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('Please enter all fields.');

                done();
            })
        })
    });

    // Testing that registering a user without having matching passwords does not allow the user to register a new user
    // To register a new user you MUST be logged in and be an admin of the system
    describe('POST /user/register', () => {
        it('Should fail to register a new user when provided passwords that do not match.', (done) => {
            let registerDetails = {
                firstName: 'Tester',
                lastName: 'Testing',
                email: 't.testing@testing.uops.ac.uk',
                password: '12345',
                confirmPassword: '123',
                roles: ['Test']
            }

            chai.request(app)
            .post('/user/register')
            .set('Authorization', userTokens.adminToken)
            .send(registerDetails)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('Passwords do not match.');

                done();
            })
        })
    });

    // Testing that registering a user with an email that already exists does not allow the user to register a new user
    // To register a new user you MUST be logged in and be an admin of the system
    describe('POST /user/register', () => {
        it('Should fail to register a new user when provided an email that already matches an existing account.', (done) => {
            let registerDetails = {
                firstName: 'Tester',
                lastName: 'Testing',
                email: '100200@student.uops.ac.uk',
                password: '12345',
                confirmPassword: '12345',
                roles: ['Test']
            }

            chai.request(app)
            .post('/user/register')
            .set('Authorization', userTokens.adminToken)
            .send(registerDetails)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('Email already in use.');

                done();
            })
        })
    });

    // Testing that editing an existing user without being logged in does not allow the user to pass the middleware
    // To edit an existing user you MUST be logged in and be an admin of the system
    describe('PUT /user/', () => {
        it('Should fail to edit an existing user without being logged in.', (done) => {
            let editStudentDetails = {
                id: '636d14545451a04e72d994b8',
                firstName: 'Zain',
                lastName: 'Whaid',
                email: '100205@student.uops.ac.uk',
                roles: ['Student']
            }

            chai.request(app)
            .put('/user/')
            .send(editStudentDetails)
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('Token invalid. Unauthorized.');

                done();
            })
        })
    });

    // Testing that editing an existing user without having an admin role does not allow the user to pass the middleware
    // To edit an existing user you MUST be logged in and be an admin of the system
    describe('PUT /user/', () => {
        it('Should fail to edit an existing new user without having an admin role when logged in.', (done) => {
            let editStudentDetails = {
                id: '636d14545451a04e72d994b8',
                firstName: 'Zain',
                lastName: 'Whaid',
                email: '100205@student.uops.ac.uk',
                roles: ['Student']
            }

            chai.request(app)
            .post('/user/register')
            .set('Authorization', userTokens.studentToken)
            .send(editStudentDetails)
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('User is not authorized to access admin resources.');

                done();
            })
        })
    });

    // Testing that editing an existing user without having a first name field does not allow the user to register a new user
    // To edit an existing user you MUST be logged in and be an admin of the system
    describe('PUT /user/', () => {
        it('Should fail to edit an existing user when provided an invalid first name.', (done) => {
            let editStudentDetails = {
                id: '636d14545451a04e72d994b8',
                firstName: '',
                lastName: 'Whaid',
                email: '100205@student.uops.ac.uk',
                roles: ['Student']
            }

            chai.request(app)
            .put('/user/')
            .set('Authorization', userTokens.adminToken)
            .send(editStudentDetails)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('Please enter all fields.');

                done();
            })
        })
    });

    // Testing that editing an existing user without having a valid ID field does not allow the user to register a new user
    // To register a new user you MUST be logged in and be an admin of the system
    describe('PUT /user/', () => {
        it('Should fail with invalid student id', (done) => {
            let editStudentDetails = {
                id: '636d14545451a04e72d994c5',
                firstName: 'Zain',
                lastName: 'Whaid',
                email: '100205@student.uops.ac.uk',
                roles: ['Student']
            }

            chai.request(app)
            .put('/user/')
            .set('Authorization', userTokens.adminToken)
            .send(editStudentDetails)
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('Unauthorized to update this user.');

                done();
            })
        })
    });
});