(function () {
    var CommonService;

    CommonService = (function () {
        CommonService.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        CommonService.defaultConfig = {
            headers: CommonService.headers
        };

        function CommonService($log, $http, $q) {
            this.$log = $log;
            this.$http = $http;
            this.$q = $q;
            this.$log.debug("constructing DictService");
        }

        CommonService.prototype.findDictsByCat = function (cat) {
            var deferred;
            this.$log.debug("findDictsByCat() " + cat);
            deferred = this.$q.defer();
            this.dict = {
                cat: cat
            };
            this.$http.post(baseUrl + "/common/dicts", this.dict).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully findDictsByCat - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find DictsByCat - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        return CommonService;

    })();

    angular.module('sbAdminApp').service('CommonService', CommonService);

}).call(this);

