angular.module('myApp')
    .directive('formValidate', function() {
        var message = {
            error: '',
            warning: '',
            notification: ''
        };

        return {
            link: function(scope, element, attrs) {
                scope.message = message;
                var formElements = element.find('input');
                for (var i = 0; i < formElements.length; i++) {
                    switch (formElements[i].getAttribute('type')) {
                        case 'email':
                            validateEmail(scope, formElements[i]);
                            break;
                        case 'password':
                        	validatePassword(scope, formElements[i]);
                        default:
                            break;
                    }
                }
            }
        };

        function promptUser(scope, text) {
            scope.$apply(function() {
                scope.message.error = text;
            });
        }

        function validateEmail(scope, element) {
            var element = angular.element(element);
            element.bind('blur', function() {
                if (element.hasClass('ng-invalid-email')) {
                    promptUser(scope, 'Invalid email format');
                } else {
                    promptUser(scope, '');
                }
            });
        }

        function validatePassword (scope, element) {
        	var element = angular.element(element);
            element.bind('blur', function() {
                if (element.hasClass('ng-invalid-minlength')) {
                    promptUser(scope, 'Password must be at least 6 characters');
                } else {
                    promptUser(scope, '');
                }
            });
        }
    });
