let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

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
    })
});