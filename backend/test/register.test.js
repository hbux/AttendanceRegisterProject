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

    // Testing an unauthenticated get all registers request
    describe('GET /register/get/all', () => {
        it('Should fail without authentication', (done) => {

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

    // Testing an unauthorized get all registers request
    describe('GET /register/get/all/', () => {
        it('Should fail without authorization', (done) => {
            
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

    // Testing a succesful get all registers request
    describe('GET /register/', () => {
        it('Should succeed', (done) => {
            
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

    // Testing a succesful register activation
    describe('PUT /register/', () => {
        it('Should activate a register', (done) => {
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
});