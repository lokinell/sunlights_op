(function() {
    var MessageRuleMappingService;

    MessageRuleMappingService = (function() {
        MessageRuleMappingService.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        MessageRuleMappingService.defaultConfig = {
            headers: MessageRuleMappingService.headers
        };

        function MessageRuleMappingService($log, $http, $q) {
            this.$log = $log;
            this.$http = $http;
            this.$q = $q;
            this.$log.debug("constructing MessagePushService");
        }

        MessageRuleMappingService.prototype.saveMsgPushMapping = function(dict) {
            var deferred;
            this.$log.debug("saveMsgPushMapping " + (angular.toJson(dict, true)));
            deferred = this.$q.defer();
            this.$http.post(baseUrl + "/message/mapping", dict).success((function(_this) {
                return function(data, status, headers) {
                    _this.$log.info("Successfully saveMsgPushMapping - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function(_this) {
                return function(data, status, headers) {
                    _this.$log.error("Failed to saveMsgPushMapping - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        MessageRuleMappingService.prototype.delete = function(dict) {
            var deferred;
            this.$log.debug("deleteMsgPushMapping ---- " + (angular.toJson(dict, true)));
            deferred = this.$q.defer();
            if(!window.confirm('你确定要删除吗？')){
                return deferred.promise;
            }

            this.$http({
                method: 'DELETE',
                url: baseUrl + '/message/mapping',
                params: dict
            }).success((function(_this) {
                return function(data, status, headers) {
                    _this.$log.info("Successfully saveMsgPushMapping - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function(_this) {
                return function(data, status, headers) {
                    _this.$log.error("Failed to saveMsgPushMapping - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        MessageRuleMappingService.prototype.getActivityScene = function() {
            var deferred;
            deferred = this.$q.defer();
            this.$http.get(baseUrl + "/message/mapping/scene").success((function(_this) {
                return function(data, status, headers) {
                    return deferred.resolve(data);
                };
            })(this)).error((function(_this) {
                return function(data, status, headers) {
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        MessageRuleMappingService.prototype.getActivityId = function(activityId) {
            var deferred, param;
            this.$log.debug("scene is----" + activityId);
            deferred = this.$q.defer();
            param = {
                "value": activityId
            };
            this.$http.get(baseUrl + "/message/mapping/activity", param).success((function(_this) {
                return function(data, status, headers) {
                    _this.$log.info("Successfully find findRules - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function(_this) {
                return function(data, status, headers) {
                    _this.$log.error("Failed to find findRules - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        return MessageRuleMappingService;

    })();

    angular.module("sbAdminApp").service('MessageRuleMappingService', MessageRuleMappingService);

}).call(this);

