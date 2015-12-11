angular.module('myApp')
    .controller('LoginCtrl', ['$scope', '$rootScope', 'AuthSvc', 'ValidationSvc', '$window',
        function($scope, $rootScope, AuthSvc, ValidationSvc, $window) {
            'use strict';

            var errors = {
                allRequired: 'All fields are required'
            };

            $scope.loginForm = {};
            $scope.message = {};

            $scope.toggleLogin = function() {
                $rootScope.$broadcast('requestLoginEvent');
            };

            $scope.login = function() {
                var validForm = ValidationSvc.validate('login', $scope.loginForm);
                if (!validForm) {
                	$scope.message.error = errors.allRequired;
                } else {
                	AuthSvc.login($scope.loginForm, 
                		function (response, status, headers, config) {
                			$window.localStorage.token = response.data.token;
                			console.log(response.data.token);
                		}, 
                		function (response) {
                			// Erase the token if the user fails to log in
        					delete $window.localStorage.token;
                			console.log(response);
                		});
                }
            };
        }
    ]);
