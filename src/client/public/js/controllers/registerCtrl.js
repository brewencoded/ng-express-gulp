angular.module('myApp')
    .controller('RegisterCtrl', ['$scope', '$rootScope', 'AuthSvc', '$window',
        function($scope, $rootScope, AuthSvc, $window) {
            'use strict';

            $scope.registerForm = {};
            $scope.message = {
                register: {
                    error: ''
                }
            };
            $scope.loggedIn = AuthSvc.isLoggedIn(function (data) {
                    
                });

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
                                $scope.message.error = '';
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
