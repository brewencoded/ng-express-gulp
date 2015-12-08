angular.module('myApp')
	.factory('AuthSvc', function() { 
		return { 
			isLoggedIn: false, 
		};
	});