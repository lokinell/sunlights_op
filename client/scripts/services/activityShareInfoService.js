(function() {
  var ActivityShareInfoService;

  ActivityShareInfoService = (function() {
    ActivityShareInfoService.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    ActivityShareInfoService.defaultConfig = {
      headers: ActivityShareInfoService.headers
    };

    function ActivityShareInfoService($log, $http, $q) {
      this.$log = $log;
      this.$http = $http;
      this.$q = $q;
      this.$log.debug("constructing ObtainRewardRulesService");
    }

    ActivityShareInfoService.prototype.findShares = function() {
      var deferred;
      this.$log.debug("findShares()");
      deferred = this.$q.defer();
      this.$http.get(baseUrl + "/activityshareinfo").success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully find findShares - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to find findShares - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    ActivityShareInfoService.prototype.findSpecialShares = function(parentId) {
      var deferred;
      this.$log.debug("findShares() parentId = " + parentId);
      deferred = this.$q.defer();
      this.$http.get(baseUrl + "/specialshare/" + parentId).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully find findShares - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to find findShares - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    ActivityShareInfoService.prototype.saveShare = function(share) {
      var deferred;
      this.$log.debug("saveRule " + (angular.toJson(share, true)));
      deferred = this.$q.defer();
      this.$http.post(baseUrl + "/activityshareinfo", share).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully save share - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to save share - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    ActivityShareInfoService.prototype.deleteShare = function(share) {
      var deferred;
      this.$log.debug("deleteShare " + (angular.toJson(share, true)));
      deferred = this.$q.defer();
      this.$http.delete(baseUrl + '/activityshareinfo/' + share.id).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully delete share - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to delete share - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    return ActivityShareInfoService;

  })();

  angular.module('sbAdminApp').service('ActivityShareInfoService', ActivityShareInfoService);

}).call(this);
