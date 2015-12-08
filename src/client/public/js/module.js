angular.module('myApp', ['ui.router'])
    .config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {
        'use strict';
        $urlRouterProvider.otherwise('404');
        $locationProvider.html5Mode(true);
        $stateProvider
            .state('main', {
                abstract: true,
                templateUrl: '/templates/landing.html'
            })
            .state('main.index', {
                url: '/',
                templateUrl: '/templates/home.html'
            })
            .state('main.login', {
                url: '/login',
                templateUrl: '/templates/loginPage.html'
            })
            .state('user', {
                abstract: true,
                templateUrl: '/templates/user.html'
            })
            .state('user.index', {
                url: '/',
                templateUrl: '/templates/profile.html'
            })
            .state('main.about', {
                url: '/about',
                templateUrl: '/templates/about.html'
            })
            .state('main.contact', {
                url: '/contact',
                templateUrl: '/templates/contact.html'
            })
            .state('404', {
                url: '/404',
                templateUrl: '/templates/404.html'
            });
    }]).run(['$rootScope', '$state', 'AuthSvc',
        function($rootScope, $state, AuthSvc) {

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

                var isAuthenticationRequired = toState.data && toState.data.requiresLogin && !User.isLoggedIn;

                if (isAuthenticationRequired) {
                    event.preventDefault();
                    $state.go('home.loggedIn.index');
                }
            });

        }
    ])
    .controller('LogonCtrl', ['$scope', 'AuthSvc', function($scope, AuthSvc) {
        $scope.auth = AuthSvc;
    }]);
