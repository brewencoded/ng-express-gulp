angular.module('myApp')
    .directive('showLogin', function() {
    	'use strict';
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                scope.showLogin = function(shown) {
                	if(shown) {
                		angular.element(document.querySelector('.nav')).removeClass('shrink-nav');
                		angular.element(document.querySelector('.nav')).addClass('grow-nav');

                		element.removeClass('slide-in-right');
                		element.addClass('slide-out-right');
                	}
                	else {
                		angular.element(document.querySelector('.nav')).removeClass('grow-nav');
                		angular.element(document.querySelector('.nav')).addClass('shrink-nav');

                		element.removeClass('slide-out-right');
                    	element.addClass('slide-in-right');
                    }
                };
                scope.$on('requestLoginEvent', function(event, data) {
                    scope.showLogin(element.hasClass('slide-in-right'));
                });
            }
        };
    });
