angular.module('myApp')
	.controller('LoginCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
		'use strict';
		$scope.toggleLogin = function () {
			$rootScope.$broadcast('requestLoginEvent');
		};
	}]);