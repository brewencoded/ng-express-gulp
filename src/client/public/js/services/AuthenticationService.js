angular.module('myApp')
    .factory('AuthSvc', ['$http', function($http) {
        return {
            isLoggedIn: false,
            login: function(user, success, error) {
                $http.post('/login', user)
                    .then(success, error);
            },
            register: function(user, success, error) {
                $http.post('/register', user)
                    .then(success, error);
            },
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
