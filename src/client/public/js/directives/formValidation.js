angular.module('myApp')
	.directive('formValidation', function () {
		return {
			restrict: 'A',
			scope: {
				type: '='
			},
			controller: function ($scope) {
				$scope.valid = false;

			},
			link: function (scope, element, attrs) {
				scope.$apply(function () {
					scope.valid = true;
				});
			}
		};
	});