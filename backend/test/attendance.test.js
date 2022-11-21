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

    // Testing an unauthenticated register code request
    describe('POST /attendance/', () => {
        it('Should fail without authentication', (done) => {
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

    // Testing an unauthorized register code request
    describe('POST /attendance/', () => {
        it('Should fail without authorization', (done) => {
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

     // Testing an invalid register code request
     describe('POST /attendance/', () => {
        it('Should fail with invalid register code', (done) => {
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

    // Testing an unauthenticated edit student attendance request
    describe('PUT /attendance/', () => {
        it('Should fail without authentication', (done) => {
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

    // Testing an unauthorized edit student attendance request
    describe('PUT /attendance/', () => {
        it('Should fail without authorization', (done) => {
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

    // Testing editing a student when register is not active
    describe('PUT /attendance/', () => {
        it('Should fail when register is not', (done) => {
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
            .set('Authorization', userTokens.tutorToken)
            .send(editRequest)
            .end((error, res) => {
                res.should.have.status(404)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.be.eql('Register has not been activated yet.');

                done();
            })
        })
    });

    // Testing editing a student when register id is invalid
    describe('PUT /attendance/', () => {
        it('Should fail with invalid register id', (done) => {
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