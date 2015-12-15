angular.module('myApp')
    .controller('LoginCtrl', ['$scope', '$rootScope', 'AuthSvc', '$window',
        function($scope, $rootScope, AuthSvc, $window) {
            'use strict';

            $scope.loginForm = {};
            $scope.message = {
                login: {error: ''}
            };

            $scope.toggleLogin = function() {
                $rootScope.$broadcast('requestLoginEvent');
            };

            $scope.login = function() {
                if ($scope.message.login.error !== {} || $scope.message.login.error !== '') {
                	$scope.message.login.error += 'Missing required fields\n';
                } else {
                	$scope.message.login.error = '';
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
