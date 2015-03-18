(function () {
    var FeedBackService;

    FeedBackService = (function () {
        FeedBackService.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        FeedBackService.defaultConfig = {
            headers: FeedBackService.headers
        };

        function FeedBackService($log, $http, $q) {
            this.$log = $log;
            this.$http = $http;
            this.$q = $q;
            this.$log.debug("constructing FeedBackService");
        }

        FeedBackService.prototype.findFeedBacks = function (pager) {
            var deferred;
            this.$log.debug("findFeedBacks()");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/feedbacks', {
                headers: {
                    'params': angular.toJson(pager)
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully findFeedBacks - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to findFeedBacks - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        FeedBackService.prototype.approveFeedBack = function (feedBackVo) {
            var deferred;
            this.$log.debug("approveFeedBack " + (angular.toJson(feedBackVo, true)));
            deferred = this.$q.defer();
            this.$http.put(baseUrl + "/feedback", feedBackVo).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully approve FeedBack - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to approve FeedBack - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        FeedBackService.prototype.deleteFeedBack = function (feedBackVo) {
            var deferred;
            this.$log.debug("deleteFeedBack " + (angular.toJson(feedBackVo, true)));
            deferred = this.$q.defer();
            this.$http({
                method: 'DELETE',
                url: baseUrl + '/feedback',
                params: feedBackVo
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully delete FeedBack - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to delete FeedBack - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        return FeedBackService;

    })();

    angular.module('sbAdminApp').service('FeedBackService', FeedBackService);

}).call(this);

