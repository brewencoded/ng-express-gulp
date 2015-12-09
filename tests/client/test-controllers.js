'use strict';

describe('LoginCtrl', function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

    beforeEach(module('myApp'));

    var $controller, rootScope, $scope, loginCtrl;

    beforeEach(inject(function($rootScope, _$controller_) {
        $controller = _$controller_;
        rootScope = $rootScope;
        $scope = {};
            loginCtrl = $controller('LoginCtrl', {
                $scope: $scope
            });
    }));

    describe('controller', function() {
        it('should be defined', function() {
            expect(loginCtrl).toBeDefined();
        });
    });

    describe('toggleLogin', function() {
        beforeEach(function() {
            spyOn(rootScope, '$broadcast').and.callThrough();
        });

        it('should broadcast a requestLoginEvent', function() {
            $scope.toggleLogin();
            expect(rootScope.$broadcast).toHaveBeenCalledWith('requestLoginEvent');
        });

    });

    describe('checkFields', function() {
        it('should show error if fields are empty', function() {
            $scope.login();
            expect($scope.message.error).toEqual('All fields are required');
        });
    });

}); // describe loginCtrl

describe('RegisterCtrl', function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

    beforeEach(module('myApp'));
    beforeEach(module('ui.router'));

    var $controller, rootScope, $scope, registerCtrl;

    beforeEach(inject(function($rootScope, _$controller_) {
        $controller = _$controller_;
        rootScope = $rootScope;
        $scope = {
        };
        registerCtrl = $controller('RegisterCtrl', {
            $scope: $scope
        });
    }));

    describe('controller', function() {

        it('should be defined', function() {
            expect(registerCtrl).toBeDefined();
        });
    });

    describe('checkFields', function() {
        it('should show error if fields are empty', function() {
            $scope.register();
            expect($scope.message.error).toEqual('All fields are required');
        });
    });
});
