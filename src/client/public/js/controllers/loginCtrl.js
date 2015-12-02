angular.module('myApp')
	.controller('loginCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
		'use strict';
		$scope.toggleLogin = function () {
			$rootScope.$broadcast('requestLoginEvent');
		};
	}]);