angular.module('myApp')
    .controller('AuthCtrl', ['$scope', '$rootScope', 'AuthSvc', '$window', '$state',
        function($scope, $rootScope, AuthSvc, $window, $state) {
            'use strict';

            $scope.register = function(form) {
                AuthSvc.register(form,
                    function(response, status, headers, config) {
                        if (response.data.code === 'ER_DUP_ENTRY') {} else if (response.data.message === 'No Rows Updated') {} else {
                            $window.localStorage.token = response.data.token;
                            $rootScope.isLoggedIn = true;
                            $scope.toggleLogin();
                            $state.go('user.index');
                        }

                        console.log(response);
                    },
                    function(response) {
                        // Erase the token if the user fails to log in
                        delete $window.localStorage.token;
                        console.log(response);
                    });
            };


            $scope.login = function(form) {
                AuthSvc.login(form,
                    function(response, status, headers, config) {
                        $window.localStorage.token = response.data.token;
                        $rootScope.isLoggedIn = true;
                        $scope.toggleLogin();
                        console.log(response);
                        $state.go('user.index');
                    },
                    function(response) {
                        console.log(response.status);
                        if (response.status === 401) {} else {}
                        // Erase the token if the user fails to log in
                        delete $window.localStorage.token;
                        console.log(response);
                    });
            };

            $scope.logout = function() {
                console.log('logging out');
                AuthSvc.logout();
                $state.go('main.index');
            };

            $scope.toggleLogin = function() {
                $rootScope.$broadcast('requestLoginEvent');
            };

            $scope.passwordValidator = function(password) {

                if (!password) {
                    return;
                }

                if (password.length < 6) {
                    return "Password must be at least " + 6 + " characters long";
                }

                /*if (!password.match(/[A-Z]/)) {
                    return "Password must have at least one capital letter";
                }*/

                /*if (!password.match(/[0-9]/)) {
                    return "Password must have at least one number";
                }*/

                return true;
            };
        }
    ]);
