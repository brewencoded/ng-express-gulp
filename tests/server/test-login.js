'use strict';
var request = require('supertest');

describe('login', function() {
    var server;
    beforeEach(function() {
        delete require.cache[require.resolve(__dirname + '/../../build/index')];
        server = require(__dirname + '/../../build/index');
    });
    describe('validation', function() {
        it('should return error on invalid email format', function(done) {
            request(server)
                .post('/login')
                .send({'email': 'testtesttest', 'password': '123123'})
                .expect('Content-Type', 'text/json')
                .expect(401)
                .end(function (err, res) {
                	console.log(JSON.parse(res.error.text).message);
                	expect(JSON.parse(res.error.text).message).toEqual('Not a valid email.');
                	done();
                });
        });

        it('should return error on invalid email / password combination', function (done) {
        	request(server)
                .post('/login')
                .send({'email': 'test@test.com', 'password': '123123'})
                .expect('Content-Type', 'text/json')
                .expect(401)
                .end(function (err, res) {
                	expect(JSON.parse(res.error.text).error).toEqual('Username and/or password combination invalid.');
                	done();
                });
        });
    });
});
