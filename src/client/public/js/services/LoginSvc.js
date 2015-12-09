angular.module('myApp')
    .factory('LoginSvc', function() {
        return {
            login: function (user) {
                $http.post('/login', user)
                    .then(function(response) {
                        return response;
                    }, function(response) {
                        return response;
                    });
            }
        };
    });
