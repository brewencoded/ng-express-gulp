angular.module('myApp', ['ui.router'])
    .config(['$urlRouterProvider', '$stateProvider', '$locationProvider', '$httpProvider',
        function($urlRouterProvider, $stateProvider, $locationProvider, $httpProvider) {
            'use strict';
            $urlRouterProvider.otherwise('404');
            $locationProvider.html5Mode(true);
            $stateProvider
                .state('main', {
                    abstract: true,
                    templateUrl: '/templates/landing.html',
                    controller: 'AuthCtrl',
                    data: {
                        requireLogin: false
                    }
                })
                .state('main.index', {
                    url: '/',
                    templateUrl: '/templates/home.html'
                })
                .state('main.login', {
                    url: '/login',
                    templateUrl: '/templates/loginPage.html'
                })
                .state('main.about', {
                    url: '/about',
                    templateUrl: '/templates/about.html'
                })
                .state('main.contact', {
                    url: '/contact',
                    templateUrl: '/templates/contact.html'
                })
                .state('user', {
                    abstract: true,
                    templateUrl: '/templates/user.html',
                    controller: 'userInfoCtrl',
                    data: {
                        requireLogin: true
                    }
                })
                .state('user.index', {
                    url: '/',
                    templateUrl: '/templates/profile.html'
                })
                .state('404', {
                    url: '/404',
                    templateUrl: '/templates/404.html'
                });
            $httpProvider.interceptors.push('AuthInterceptor');
        }
    ]).run(['$rootScope', '$state', 'AuthSvc',
        function($rootScope, $state, AuthSvc) {
            AuthSvc.isLoggedIn(function (data) {
                if(data) {
                    console.log(data);
                    $rootScope.isLoggedIn = true;
                } else {
                    console.log('not logged in');
                    $rootScope.isLoggedIn = false;
                }
            });
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                var requiresLogin = toState.data.requiresLogin;

                if (requiresLogin && typeof $rootScope.currentUser === 'undefined') {
                    event.preventDefault();
                    // get me a login modal!
                }
            });

        }
    ]);
