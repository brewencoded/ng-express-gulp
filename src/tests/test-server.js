/* jshint node: true */
'use strict';

var request = require('supertest'),
	chai = require('chai'),
	chaiPromise = require('chai-as-promised'),
	sinon = require('sinon');

describe('loading express', function () {
	var server;
	beforeEach(function () {
		server = require('../index');
	});
	it('responds to /', function (done) {
		request(server)
		.get('/')
		.expect(200, done);
	});
	it('404 to everything else', function (done) {
		console.log('responds to 404');
		request(server)
		.get('/foo/bar')
		.expect(404, done);
	});
});