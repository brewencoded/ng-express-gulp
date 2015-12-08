'use strict';

describe('formValidation directive', function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50;

    beforeEach(module('myApp'));
    beforeEach(module('ui.router'));

    var $compile, $scope;

    beforeEach(module('myApp'));
    beforeEach(module('ui.router'));

    beforeEach(inject(function(_$rootScope_, _$compile_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
    }));

    describe('register', function() {
        var $element, $controller, testForm, form;

        beforeEach(function() {
            testForm = angular.element('<form name="form" form-validate>' + '<p class="form-error">{{ message.error }}</p>' + '<input type="email" ng-model="register.email" name="email" placeholder="email">' + '<input type="password" ng-model="register.password" name="register-password" placeholder="password" ng-minlength="6">' + '<input type="password" ng-model="register.passwordVerify" name="password-verify" placeholder="password verify" ng-minlength="6">' + '<input type="submit" id="login-btn" value="Submit" >' + '</form>');
            
            $element = $compile(testForm)($scope);
            $scope.$digest();

        });

        describe('individual field', function() {
            it('adds correct content error element', function() {
                /*var input = testForm.find('input')[0];
                var angInput = angular.element(input);
                angInput.val('test');
                $scope.$apply();
                expect($scope.message.error === 'Invalid email format').toEqual(true);*/
            });
            it('does not add error if format is valid', function() {

            });
            it('unhides error element when valid', function() {

            });
        });

        describe('all fields', function() {

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
