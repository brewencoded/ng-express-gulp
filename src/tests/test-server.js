/* jshint node: true */
'use strict';

var request = require('supertest'),
	chai = require('chai'),
	chaiPromise = require('chai-as-promised'),
	sinon = require('sinon');

describe('loading express', function () {
	var server;
	beforeEach(function () {
		delete require.cache[require.resolve('../index')];
		server = require('../index');
	});
	it('responds to /', function (done) {
		request(server)
		.get('/')
		.expect('Content-Type', 'text/html')
		.expect(200, done);
	});
});