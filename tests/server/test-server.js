/* jshint node: true */
/* jshint jasmine: true */
'use strict';
var request = require('supertest');

describe('loading express', function () {
	var server;
	beforeEach(function () {
		delete require.cache[require.resolve(__dirname + '/../../build/index')];
		server = require(__dirname + '/../../build/index');
	});
	it('responds to /', function (done) {
		request(server)
		.get('/')
		.expect('Content-Type', 'text/html')
		.expect(200, done);
	});
});