/**
 * Created by Yuan on 2015/4/16.
 */

(function () {
  'use strict';

  startsWith.$inject = ['$parse'];
  function startsWith($parse) {
    return function (actual, predicate, expected) {
      console.info("[startsWith]");
      if (angular.isArray(actual)) {
        var get = $parse(predicate);
        var out = [],i;
        for (i=0; i < actual.length; i++) {
          var lowerStr = (get(actual[i]) + "").toLowerCase();
          if (lowerStr.indexOf(expected.toLowerCase()) === 0) {
            out.push(actual[i]);
          }
        }
        return out;
      } else {
        return expected;
      }
    }
  }

  angular.module('sbAdminApp').filter('startsWith', startsWith);
})();


