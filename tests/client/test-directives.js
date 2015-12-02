describe('showLogin', function () {
	var $compile, $rootScope;

	beforeEach(module('myApp'));
	beforeEach(module('ui.router'));

	beforeEach(inject(function (_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it('should toggle between 2 classes on broadcast', function () {
		var element = $compile('<div show-login></div>')($rootScope);
		 $rootScope.$digest();
		 $rootScope.$broadcast('requestLoginEvent');
		 expect(element.hasClass('slide-in-right')).toBe(true);
	});
});