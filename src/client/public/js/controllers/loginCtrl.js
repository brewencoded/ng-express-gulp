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
                var empty = isEmpty($scope.loginForm);
                if ($scope.message.login.error !== '' || empty) {
                    console.log($scope.message.login);
                   $scope.message.login.error += 'Missing required fields\n';
                } else {
                	$scope.message.login.error = '';
                	AuthSvc.login($scope.loginForm, 
                		function (response, status, headers, config) {
                			$window.localStorage.token = response.data.token;
                			console.log(response);
                		}, 
                		function (response) {
                			// Erase the token if the user fails to log in
        					delete $window.localStorage.token;
                			console.log(response);
                		});
                }
            };

            function isEmpty(fields) {
                
                if(Object.keys(fields).length > 0) {
                    angular.forEach(fields, function (value, key) {
                        console.log(value);
                        if(value.trim() === '' || value === undefined) {
                            return true;
                        }
                    });
                } else {
                    return true;
                }
                return false;
            }
        }
    ]);
