(function () {
    var DictService;

    DictService = (function () {
        DictService.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        DictService.defaultConfig = {
            headers: DictService.headers
        };

        function DictService($log, $http, $q) {
            this.$log = $log;
            this.$http = $http;
            this.$q = $q;
            this.$log.debug("constructing DictService");
        }

        DictService.prototype.findDicts = function (pager) {
            var deferred;
            this.$log.debug("findDicts()");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/dicts', {
                headers: {
                    'params': angular.toJson(pager)
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find Dicts - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find Dicts - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        DictService.prototype.saveDict = function (dictVo) {
            var deferred;
            this.$log.debug("saveDict " + (angular.toJson(dictVo, true)));
            deferred = this.$q.defer();
            this.$http.post(baseUrl + "/dict", dictVo).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully save Dict - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to save Dict - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        DictService.prototype.deleteDict = function (dictVo) {
            var deferred;
            this.$log.debug("deleteDict " + (angular.toJson(dictVo, true)));
            deferred = this.$q.defer();
            this.$http({
                method: 'DELETE',
                url: baseUrl + '/dict',
                params: dictVo
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully delete Dict - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to delete Dict - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        return DictService;

    })();

    angular.module('sbAdminApp').service('DictService', DictService);

}).call(this);

