process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('./../index');
let expect = chai.expect;

const storeModel = require('./../models/store');

chai.use(chaiHttp);

describe('Store Panel Chareger test', () => {

    it('should fail validation, No inputs', (done) => {

        chai.request(server)
        .get('/api/customer/Knearest')
        .end((err, res) => {

            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            expect(res.body.status).to.be.equal('fail');
            expect(res.body.message).to.be.a('string');

        });

        done();
    });

    it('should fail validation, string input', (done) => {

        chai.request(server)
        .get('/api/customer/Knearest')
        .query({
            lat:"",
            lon:""
        })
        .end((err, res) => {

            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            expect(res.body.status).to.be.equal('fail');
            expect(res.body.message).to.be.a('string');

        });

        done();
    });

    it('should retrieve k nearest Jumbo stores, given a point', (done) => {

        chai.request(server)
        .get('/api/customer/Knearest')
        .query({
            lat: Math.random(),
            lon: Math.random()
        })
        .end((err, res) => {

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('data');
            res.body.data.should.have.property('k_nearest');
            expect(res.body.status).to.be.eql('Success');
            expect(res.body.data.k_nearest).to.be.a('array');
            expect(res.body.data.k_nearest).to.have.lengthOf.above(0);

            expect(res.body.data.k_nearest[0]).to.have.property('distance');
            expect(res.body.data.k_nearest[0]).to.have.property('store');
            
            expect(res.body.data.k_nearest[0].distance).to.be.a('number');

            expect(res.body.data.k_nearest[0].store).to.have.property('addressName');
            expect(res.body.data.k_nearest[0].store).to.have.property('street2');
            expect(res.body.data.k_nearest[0].store).to.have.property('latitude');
            expect(res.body.data.k_nearest[0].store).to.have.property('longitude');
            expect(res.body.data.k_nearest[0].store).to.have.property('postalCode');
            expect(res.body.data.k_nearest[0].store).to.have.property('todayClose');
            expect(res.body.data.k_nearest[0].store).to.have.property('todayOpen');
            expect(res.body.data.k_nearest[0].store).to.have.property('uuid');

        });

        done();
    });
})