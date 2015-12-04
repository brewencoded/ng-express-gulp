'use strict';

describe('formValidation directive', function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50;

    beforeEach(module('myApp'));
    beforeEach(module('ui.router'));

    var $compile, $scope;

    beforeEach(module('myApp'));
    beforeEach(module('ui.router'));

    beforeEach(inject(function(_$rootScope_, _$compile_ ) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
    }));

    describe('login', function() {
    	var $element, $controller;

    	beforeEach(function () {
    		$element = $compile('<form form-validation type="\'login\'">'
    								+ '<input type="email" value="test@example.com">'
    								+ '<input type="password" value="password">',
    								+ '<input type="submit" value="login">'
    							+ '</form>')($scope);
    		$scope.$digest();
            $controller = $element.controller;
    	});

    	// on keyup the input should be read tested against emptiness and it's respective error message should be shown 
    	// if input is empty set nghide to true, if has value set nghide to false
    	// check value of ng-hide OR check if hasClass('ng-hide') is true
        describe('email field', function () {
            it('adds correct content error element', function() {
               
            });
            it('unhides error element when valid', function (done) {
            	
            });
        });
    });

    /*describe('login', function() {

        describe('email', function() {
            it('should return false for empty values', function() {
                $scope.validate('login');
            });
        });
        describe('password', function() {
            it('should return false for empty values', function() {
                $scope.validate('login');
            });
        });
        describe('password verification', function() {
            it('should not be empty', function() {
                $scope.validate('login');
            });
        });
        describe('all fields', function() {
            it('should set formValid to true when all conditions are met', function() {
                $scope.validate('login');
            });
        });

    });

    describe('registration', function() {

        describe('email', function() {
            it('should return false for empty values', function() {
                $scope.validate('register');
            });
            it('should return false for improperly formatted emails', function() {
                $scope.validate('register');
            });
            it('should return true for properly formatted emails', function() {
                $scope.validate('register');
            });

        });
        describe('password', function() {
            it('should return false for empty values', function() {
                $scope.validate('register');
            });
            it('should return false for passwords of length less than 6 characters', function() {
                $scope.validate('register');
            });
            it('should return true for password lengths 6 characters or more', function() {
                $scope.validate('register');
            });
        });
        describe('password verify', function() {
            it('should return true if password and password verify match', function() {
                $scope.validate('register');
            });
            it('should return false if password and password verify do not match', function() {
                $scope.validate('register');
            });
        });
        describe('all fields', function() {
            it('should set formValid to true when all conditions are met', function() {
                $scope.validate('register');
            });
        });
    });*/
});
