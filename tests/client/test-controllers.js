'use strict';

describe('LoginCtrl', function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

    beforeEach(module('myApp'));
    beforeEach(module('ui.router'));

    var $controller, rootScope;

    beforeEach(inject(function($rootScope, _$controller_) {
        $controller = _$controller_;
        rootScope = $rootScope;
    }));

    describe('controller', function() {
        var $scope, loginCtrl;
        beforeEach(function() {
            $scope = {};
            loginCtrl = $controller('LoginCtrl', {
                $scope: $scope
            });
        });

        it('should be defined', function() {
            expect(loginCtrl).toBeDefined();
        });
    });

    describe('toggleLogin', function() {

        var $scope, loginCtrl;

        beforeEach(function() {
            $scope = {};
            loginCtrl = $controller('LoginCtrl', {
                $scope: $scope
            });
            spyOn(rootScope, '$broadcast').and.callThrough();
        });

        it('should broadcast a requestLoginEvent', function() {
            $scope.toggleLogin();
            expect(rootScope.$broadcast).toHaveBeenCalledWith('requestLoginEvent');
        });

    }); //describe toggleLogin

}); // describe loginCtrl
