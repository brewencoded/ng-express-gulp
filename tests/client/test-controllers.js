'use strict';

describe('AuthCtrl', function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

    beforeEach(module('myApp'));

    var $controller, $rootScope, $scope, loginCtrl;

    beforeEach(inject(function(_$rootScope_, _$controller_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = {};
        loginCtrl = $controller('AuthCtrl', {
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
            spyOn($rootScope, '$broadcast').and.callThrough();
        });

        it('should broadcast a requestLoginEvent', function() {
            $scope.toggleLogin();
            expect($rootScope.$broadcast).toHaveBeenCalledWith('requestLoginEvent');
        });

    });

}); // describe authCtrl
