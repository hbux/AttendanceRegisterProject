let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

// Testing the role controller
describe('Testing block /role path', () => {
    
    // Testing the get all roles request
    describe('GET /role', () => {
        it('Should return an array of roles', (done) => {
            
            chai.request(app)
            .get('/role/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.not.be.eql(0);

                done();
            });
        })
    })
})