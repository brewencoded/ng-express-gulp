/* jshint node: true */
/* jshint jasmine: true */

'use strict';

describe('LoginCtrl', function() {

    beforeEach(module('myApp'));
    beforeEach(module('ui.router'));

    var $controller, rootScope;

    beforeEach(inject(function($rootScope, _$controller_) {
        $controller = _$controller_;
        rootScope = $rootScope;
    }));

    describe('toggleLogin', function () {

    	var $scope, loginCtrl;

    	beforeEach(function () {
    		$scope = {};
    		loginCtrl = $controller('loginCtrl', { $scope: $scope });
    		spyOn(rootScope, '$broadcast').and.callThrough();
    	});

    	it('should broadcast a requestLoginEvent', function () {
    		$scope.toggleLogin();
    		expect(rootScope.$broadcast).toHaveBeenCalledWith('requestLoginEvent');
    	});

    }); //describe toggleLogin

}); // describe loginCtrl
