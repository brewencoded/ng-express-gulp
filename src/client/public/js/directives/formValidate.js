angular.module('myApp')
    .directive('formValidate', function() {
        var message = {
            register: {
                error: ''
            },
            login: {
                error: ''
            }
        };
        return {
            link: function(scope, element, attrs) {
                scope.message = message;
                scope.hasErrors = false;
                var formElements = element.find('input');
                var errorElement = attrs.formtype === 'register' ? scope.message.register : scope.message.login;
                for (var i = 0; i < formElements.length; i++) {
                    switch (formElements[i].getAttribute('type')) {
                        case 'email':
                            validateEmail(scope, formElements[i], errorElement);
                            break;
                        case 'password':
                            validatePassword(scope, formElements[i], errorElement);
                        default:
                            break;
                    }
                }
            }
        };

        function promptUser(scope, text, errorElement) {
            if (text === 'clear') {
                scope.hasErrors = false;
                scope.$apply(function() {
                    errorElement.error = '';
                });
            } else {
                scope.hasErrors = true;
                scope.$apply(function() {
                    errorElement.error += text;
                    console.log(scope.message.register.error);
                });
            }
        }

        function validateEmail(scope, element, errorElement) {
            var element = angular.element(element);
            element.bind('blur', function() {
                var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(element.val());
                var isDirty = element.hasClass('ng-dirty');
                if (!isValid && isDirty) {
                    promptUser(scope, 'Invalid email format.\n', errorElement);
                } else {
                    promptUser(scope, 'clear', errorElement);
                }
            });
        }

        function validatePassword(scope, element, errorElement) {
            var element = angular.element(element);
            element.bind('blur', function() {
                if (element.hasClass('ng-invalid-minlength')) {
                    promptUser(scope, 'Password must be at least 6 characters.\n', errorElement);
                } else {
                    promptUser(scope, 'clear', errorElement);
                }
            });
        }
    });
