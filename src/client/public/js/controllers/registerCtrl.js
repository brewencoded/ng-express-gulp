angular.module('myApp')
    .controller('RegisterCtrl', ['$scope', 'AuthSvc', '$window',
        function($scope, AuthSvc, $window) {
            'use strict';

            $scope.registerForm = {};
            $scope.message = {
                register: {error: ''}
            };

            $scope.register = function() {
                if ($scope.message.error !== {} || $scope.message.error !== '' && !isEmpty(registerForm)) {
                    console.log('errors!');
                } else {
                    AuthSvc.register($scope.registerForm,
                        function(response, status, headers, config) {
                            if (response.data.code === 'ER_DUP_ENTRY') {
                                $scope.message.error = 'That email address is already on file, try logging in';
                                $scope.message.hasError = true;
                            } else {
                                $window.localStorage.token = response.data.token;
                                 $scope.message.error = '';                            }
                            
                            console.log(response);
                        },
                        function(response) {
                            $scope.message.error = 'Sorry, something went wrong, try again later.';
                            // Erase the token if the user fails to log in
                            delete $window.localStorage.token;
                            console.log(response);
                        });
                }
            };

            function isEmpty() {
                return false;
            }
        }
    ]);
