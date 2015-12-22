describe('showLogin', function() {
    var $compile, $rootScope, $httpBackend;

    beforeEach(module('myApp'));
    beforeEach(module('ui.router'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('/auth');
    	$httpBackend.whenGET('/auth').respond({ hello: '' });
        $httpBackend.expectGET('/templates/landing.html');
        $httpBackend.whenGET('/templates/landing.html').respond({ hello: '' });
    }));

    it('should toggle between 2 classes on broadcast', function() {
        var element = $compile('<div show-login></div>')($rootScope);
        $rootScope.$digest();
        $rootScope.$broadcast('requestLoginEvent');
        expect(element.hasClass('slide-in-right')).toBe(true);
    });
});
