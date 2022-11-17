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
describe('Testing block /user path', () => {

    // Testing a succesful login request
    describe('POST /user/login', () => {
        it('Should succesfully return username and access token', (done) => {
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

    // Testing a missing details login request
    describe('POST /user/login', () => {
        it('Should fail without email field', (done) => {
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

    // Testing a missing details login request
    describe('POST /user/login', () => {
        it('Should fail without password field', (done) => {
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

    // Testing an invalid login request
    describe('POST /user/login', () => {
        it('Should fail to login', (done) => {
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

    // Testing regsiter without authentication
    describe('POST /user/register', () => {
        it('Should fail without user authentication', (done) => {
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

    // Testing register without authorization
    describe('POST /user/register', () => {
        it('Should fail without admin authorization', (done) => {
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

    // Testing an invalid register request
    describe('POST /user/register', () => {
        it('Should fail without firstName field', (done) => {
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

    // Testing an invalid register request
    describe('POST /user/register', () => {
        it('Should fail without matching passwords', (done) => {
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

    // Testing an invalid register request
    describe('POST /user/register', () => {
        it('Should fail with existing email', (done) => {
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

    // Testing an register request
    describe('POST /user/register', () => {
        it('Should succeed with creating an account', (done) => {
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
});