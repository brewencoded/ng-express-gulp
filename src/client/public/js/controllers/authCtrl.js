angular.module('myApp')
    .controller('AuthCtrl', ['$scope', '$rootScope', 'AuthSvc', '$window',
        function($scope, $rootScope, AuthSvc, $window) {
            'use strict';

            $scope.loginForm = {};
            $scope.registerForm = {};
            $scope.message = {
                register: {
                    error: ''
                },
                login: {
                    error: ''
                }
            };

            $scope.register = function() {
                var empty = isEmpty($scope.registerForm);
                if ($scope.message.register.error !== '' || empty) {
                    console.log($scope.message.register);
                   $scope.message.register.error += 'Missing required fields\n';
                } else {
                    $scope.message.register.error += '';
                    AuthSvc.register($scope.registerForm,
                        function(response, status, headers, config) {
                            if (response.data.code === 'ER_DUP_ENTRY') {
                                $scope.message.error = 'That email address is already on file, try logging in';
                            } else if (response.data.message === 'No Rows Updated') {
                                $scope.message.error = 'Something went wrong try again later';
                            } else {
                                $window.localStorage.token = response.data.token;
                                $scope.message.register.error = '';
                                $rootScope.isLoggedIn = true;
                                $scope.toggleLogin();
                            }

                            console.log(response);
                        },
                        function(response) {
                            $scope.message.register.error = 'Sorry, something went wrong, try again later.';
                            // Erase the token if the user fails to log in
                            delete $window.localStorage.token;
                            console.log(response);
                        });
                }
            };


            $scope.login = function() {
                console.log($scope.loginForm);
                var empty = isEmpty($scope.loginForm);
                if ($scope.message.login.error !== '' || empty) {
                    console.log($scope.message.login);
                   $scope.message.login.error += 'Missing required fields\n';
                } else {
                    $scope.message.login.error = '';
                    AuthSvc.login($scope.loginForm, 
                        function (response, status, headers, config) {
                            $scope.message.login.error = '';
                            $window.localStorage.token = response.data.token;
                            $rootScope.isLoggedIn = true;
                            $scope.toggleLogin();
                            console.log(response);
                        }, 
                        function (response) {
                            $scope.message.login.error = 'Sorry, something went wrong, try again later.';
                            // Erase the token if the user fails to log in
                            delete $window.localStorage.token;
                            console.log(response);
                        });
                }
            };

            $scope.logout = function () {
                console.log('logging out');
                AuthSvc.logout();
            };

            $scope.toggleLogin = function() {
                $rootScope.$broadcast('requestLoginEvent');
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
