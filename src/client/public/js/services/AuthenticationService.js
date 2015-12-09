angular.module('myApp')
	.factory('AuthSvc', ['$http', function($http) { 
		return {
			isLoggedIn: false,
            login: function (user, success, error) {
                $http.post('/login', user)
                    .then(success, error);
            }
        };
	}]);