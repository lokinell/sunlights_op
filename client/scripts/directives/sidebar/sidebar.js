'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
    .directive('sidebar', ['$location', function () {
        return {
            templateUrl: 'scripts/directives/sidebar/sidebar.html',
            restrict: 'E',
            replace: true
        }
    }]);
