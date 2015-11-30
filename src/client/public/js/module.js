angular.module('my-app', ['ui.router'])
    .config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {
    	'use strict';
        $urlRouterProvider.otherwise('404');
        $locationProvider.html5Mode(true);
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/templates/home.html'
            })
            .state('about', {
            	url: '/about',
            	templateUrl: '/templates/about.html'
            })
            .state('contact', {
            	url: '/contact',
            	templateUrl: '/templates/contact.html'
            })
            .state('404', {
                url: '/404',
                templateUrl: '/templates/404.html'
            });
    }]);
