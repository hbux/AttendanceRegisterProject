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

// Testing the register controller
describe('Testing block /register path', () => {

    // Testing that retrieving all registers from the database with valid authentication and authorization works as expected
    // To retrieve all registers you MUST be logged in and be a tutor/module leader of the system
    describe('GET /register/', () => {
        it('Should successfully retrieve all registers with valid authentication and authorization.', (done) => {
            
            chai.request(app)
            .get('/register/get/all')
            .set('Authorization', userTokens.tutorToken)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.not.be.eql(0);

                done();
            })
        })
    });

    // Requirement 002 (R002): Testing that activating a register with valid authentication and authorization works as expected
    // To activate a register you MUST be logged in and be a tutor/module leader of the current register
    describe('PUT /register/', () => {
        it('Requirement 002 (R002): Should activate a register when provided a valid register ID and valid authentication and authorization', (done) => {
            let body = {
                id: '636d191368882aae23ebae3f'
            }
            
            chai.request(app)
            .put('/register/activate')
            .send(body)
            .set('Authorization', userTokens.tutorToken)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                done();
            })
        })
    });

    // Requirement 003 (R003): Testing that viewing cohort attendance of a register with valid authentication and authorization works as expected
    // To view cohort attendance of a register you MUST be logged in and be a tutor/module leader of the current register
    describe('GET /register/:id', () => {
        it('Requirement 003 (R003): Should view cohort attendance by returning a register object containing the details of who has registered their attendance', (done) => {
            let id = '636d191368882aae23ebae38';
            
            chai.request(app)
            .get(`/register/get/${id}`)
            .set('Authorization', userTokens.moduleLeaderToken)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                done();
            })
        })
    });

    // Testing that retrieving all registers from the database without being logged in does not allow the user to pass the middleware
    // To retrieve all registers you MUST be logged in and be a tutor/module leader of the system
    describe('GET /register/get/all', () => {
        it('Should fail to retrieve all registers without being logged in.', (done) => {

            chai.request(app)
            .get('/register/get/all')
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('Token invalid. Unauthorized.');

                done();
            })
        })
    });

    // Testing that retrieving all registers from the database without having a tutor/module leader role does not allow the user to pass the middleware
    // To retrieve all registers you MUST be logged in and be a tutor/module leader of the system
    describe('GET /register/get/all/', () => {
        it('Should fail to retrieve all registers without having a role of tutor/module leader.', (done) => {
            
            chai.request(app)
            .get('/register/get/all')
            .set('Authorization', userTokens.studentToken)
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('User is not authorized to access tutor resources.');

                done();
            })
        })
    });
});