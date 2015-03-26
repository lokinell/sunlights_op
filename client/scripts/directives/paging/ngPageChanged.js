/**
 * Created by Administrator on 2015/3/12.
 */
(function() {
    angular.module('sbAdminApp').directive("ngPageChanged", function() {
        return function(scope, element, attrs) {
            return scope.$watch("pagingOptions", (function(newVal, oldVal) {
                scope.$eval(attrs.ngPageChanged);
            }), true);
        };
    });

}).call(this);