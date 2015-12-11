angular.module('myApp')
    .controller('RegisterCtrl', ['$scope', 'ValidationSvc', 'AuthSvc', function($scope, ValidationSvc, AuthSvc) {
        'use strict';

        var errors = {
            allRequired: 'All fields are required'
        };

        $scope.registerForm = {};
        $scope.message = {};

        $scope.register = function() {
            var validForm = ValidationSvc.validate('register', $scope.registerForm);
                console.log(validForm);
                if (!validForm) {
                    $scope.message.error = errors.allRequired;
                } else {
                    AuthSvc.register($scope.registerForm, 
                        function (response, status, headers, config) {
                            //$window.localStorage.token = response.data.token;
                            console.log(response);
                        }, 
                        function (response) {
                            // Erase the token if the user fails to log in
                            //delete $window.localStorage.token;
                            console.log(response);
                        });
                }
        };
    }]);
