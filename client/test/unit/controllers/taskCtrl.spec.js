/**
 * Created by Administrator on 2015/3/17.
 */
/* jshint undef:false*/
(function() {
  'use strict';

  describe('TaskCtrl', function() {
    var rootScope;
    var ctrl;
    var scope;

    beforeEach(module('sbAdminApp'));
    beforeEach(inject(function($rootScope, $controller) {
      rootScope = $rootScope;
      scope = $rootScope.$new();
      ctrl = $controller('TaskCtrl as task', {
        $scope: scope
      });
    }));

    it('should not be null', function() {
      expect(ctrl).not.toEqual(null);
    });

  });
})();
