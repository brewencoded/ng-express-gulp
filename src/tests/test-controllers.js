/* jshint node: true */
'use strict';


var mocha = require('mocha'),
    chai = require('chai');

    require('../client/bower/angular/angular');
	require('../client/bower/angular-mocks/angular-mocks');


describe('user login form', function() {

    beforeEach(angular.mock.module('myApp'));

    it('should have a LoginCtrl controller', function() {
        expect(App.LoginCtrl).toBeDefined();
    });

});
