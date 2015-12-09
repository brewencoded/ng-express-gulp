angular.module('myApp')
    .controller('LoginCtrl', ['$scope', '$rootScope', 'AuthSvc', 'ValidationSvc',
        function($scope, $rootScope, AuthSvc, ValidationSvc) {
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
                		function (response) {
                			console.log(response);
                		}, 
                		function (response) {
                			console.log(response);
                		});
                }
            };
        }
    ]);
