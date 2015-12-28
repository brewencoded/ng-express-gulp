angular.module('myApp')
    .factory('AuthSvc', ['$http', '$rootScope', '$window', function($http, $rootScope, $window) {
        return {
            isLoggedIn: function (cb) {
            	$http({method: 'GET', url: '/auth'})
                    .then(function (data) {
                    	cb(data);
                    }, function (err) {
                    	console.log(err); //TODO: error handling
                    });
            },
            login: function(user, success, error) {
                $http.post('/login', user)
                    .then(success, error);
            },
            register: function(user, success, error) {
                $http.post('/register', user)
                    .then(success, error);
            },
            logout: function () {
            	delete $window.localStorage.token;
            	$rootScope.isLoggedIn = false;
            	console.log($rootScope.isLoggedIn);
            }
        };
    }])
    .factory('AuthInterceptor', ['$rootScope', '$q', '$window', function($rootScope, $q, $window) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                if ($window.localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
                }
                return config;
            },
            response: function(response) {
                //if (response.status === 401) {}
                return response || $q.when(response);
            }
        };
    }]);
