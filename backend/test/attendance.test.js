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

// Testing the attendance controller
describe('Testing block /attendance path', () => {

    // Requirement 001 (R001): Testing that registering a user/student's attendance of a register with a valid code and valid authentication and authorization works as expected
    // To register a code you MUST be logged in and be a student of the system.
    // The student must also be present in the register to be able to register their attendance.
    describe('POST /attendance/', () => {
        it('Requirement 001 (R001): Should successfully register student attendance of a register with a valid code, valid authentication and valid authorization.', (done) => {
            let registerCode = {
                code: '8794'
            }
            
            chai.request(app)
            .post('/attendance/')
            .set('Authorization', userTokens.studentToken)
            .send(registerCode)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('Successfully registered your attendance for this class.');

                done();
            })
        })
    });

    // Requirement 004 (R004): Testing that editing a user/student's attendance of a register with a valid code and valid authentication and authorization works as expected
    // To edit a student's attendance in a register a code you MUST be logged in and be a tutor of the system.
    // The tutor must also be a tutor of the class in the register to be able to edit their attendance.
    describe('PUT /attendance/', () => {
        it('Requirement 004 (R004): Should successfully edit a students attendance in a register with valid details and valid authentication and authorization.', (done) => {
            let editRequest = {
                registerId: '636d191368882aae23ebae38',
                student: {
                    studentId: '100200',
                    firstName: "James",
                    lastName: "Smith",
                    user: '636d14545451a04e72d994b1',
                    hasRegistered: false,
                    _id: '636d191368882aae23ebae39'
                }
            }
            
            chai.request(app)
            .put('/attendance/')
            .set('Authorization', userTokens.moduleLeaderToken)
            .send(editRequest)
            .end((error, res) => {
                res.should.have.status(200)

                done();
            })
        })
    });

    // Testing that registering a code without being logged in does not allow the user to pass the middleware
    // To register a code you MUST be logged in and be a student of the system.
    // The student must also be present in the register to be able to register their attendance.
    describe('POST /attendance/', () => {
        it('Should fail to register the users attendance of the register without being logged in.', (done) => {
            let registerCode = {
                code: '1931'
            }
            
            chai.request(app)
            .post('/attendance/')
            .send(registerCode)
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('Token invalid. Unauthorized.');

                done();
            })
        })
    });

    // Testing that registering a code without having a role of student does not allow the user to pass the middleware
    // To register a code you MUST be logged in and be a student of the system.
    // The student must also be present in the register to be able to register their attendance.
    describe('POST /attendance/', () => {
        it('Should fail to register the users attendance of the register without having a role of student.', (done) => {
            let registerCode = {
                code: '1931'
            }
            
            chai.request(app)
            .post('/attendance/')
            .set('Authorization', userTokens.tutorToken)
            .send(registerCode)
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('User is not authorized to access student resources.');

                done();
            })
        })
    });

    // Testing that registering an invalid code (a code that does not exist) does not allow the user to reigster their attendance.
    // To register a code you MUST be logged in and be a student of the system.
    // The student must also be present in the register to be able to register their attendance.
     describe('POST /attendance/', () => {
        it('Should fail to register the users attendance of the register using an invalid code', (done) => {
            let registerCode = {
                code: '1931'
            }
            
            chai.request(app)
            .post('/attendance/')
            .set('Authorization', userTokens.studentToken)
            .send(registerCode)
            .end((error, res) => {
                res.should.have.status(404)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('Registration code invalid.');

                done();
            })
        })
    });

    // Testing that editing a students attendance in a register without being logged in does not allow the user to pass the middleware
    // To edit a student's attendance in a register a code you MUST be logged in and be a tutor of the system.
    // The tutor must also be a tutor of the class in the register to be able to edit their attendance.
    describe('PUT /attendance/', () => {
        it('Should fail to edit a students attendance in a register without being logged in.', (done) => {
            let editRequest = {
                registerId: '636d191368882aae23ebae38',
                student: {
                    studentId: '100200',
                    firstName: "James",
                    lastName: "Smith",
                    user: '636d14545451a04e72d994b1',
                    hasRegistered: false,
                    _id: '636d191368882aae23ebae39'
                }
            }
            
            chai.request(app)
            .put('/attendance/')
            .send(editRequest)
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('Token invalid. Unauthorized.');

                done();
            })
        })
    });

    // Testing that editing a students attendance in a register without having a role of tutor does not allow the user to pass the middleware
    // To edit a student's attendance in a register a code you MUST be logged in and be a tutor of the system.
    // The tutor must also be a tutor of the class in the register to be able to edit their attendance.
    describe('PUT /attendance/', () => {
        it('Should fail to edit a students attendance of a register without having a role of tutor.', (done) => {
            let editRequest = {
                registerId: '636d191368882aae23ebae38',
                student: {
                    studentId: '100200',
                    firstName: "James",
                    lastName: "Smith",
                    user: '636d14545451a04e72d994b1',
                    hasRegistered: false,
                    _id: '636d191368882aae23ebae39'
                }
            }
            
            chai.request(app)
            .put('/attendance/')
            .set('Authorization', userTokens.studentToken)
            .send(editRequest)
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('User is not authorized to access tutor resources.');

                done();
            })
        })
    });

    // Testing that editing a students attendance in a register without providing a valid registerID does not succeed.
    // To edit a student's attendance in a register a code you MUST be logged in and be a tutor of the system.
    // The tutor must also be a tutor of the class in the register to be able to edit their attendance.
    describe('PUT /attendance/', () => {
        it('Should fail to edit a students attendance in a register with an invalid register ID.', (done) => {
            let editRequest = {
                registerId: '636d191368882aae23ebae44',
                student: {
                    studentId: '100200',
                    firstName: "James",
                    lastName: "Smith",
                    user: '636d14545451a04e72d994b1',
                    hasRegistered: false,
                    _id: '636d191368882aae23ebae39'
                }
            }
            
            chai.request(app)
            .put('/attendance/')
            .set('Authorization', userTokens.tutorToken)
            .send(editRequest)
            .end((error, res) => {
                res.should.have.status(404)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('Unable to find register.');

                done();
            })
        })
    });
});