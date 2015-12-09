angular.module('myApp')
    .controller('RegisterCtrl', ['$scope', 'ValidationSvc', function($scope, ValidationSvc) {
        'use strict';

        var errors = {
            allRequired: 'All fields are required'
        };

        $scope.register = {};
        $scope.message = {};

        $scope.register = function() {
            var validForm = ValidationSvc.validate('register', $scope.register);
                console.log(validForm);
                if (!validForm) {
                    $scope.message.error = errors.allRequired;
                }
        };
    }]);
