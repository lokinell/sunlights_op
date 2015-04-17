(function() {
  var RewardTypesService;

  RewardTypesService = (function() {
    RewardTypesService.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    RewardTypesService.defaultConfig = {
      headers: RewardTypesService.headers
    };

    function RewardTypesService($log, $http, $q) {
      this.$log = $log;
      this.$http = $http;
      this.$q = $q;
      this.$log.debug("constructing RewardTypesService");
    }

    RewardTypesService.prototype.findRewardTypes = function(pager) {
      var deferred;
      this.$log.debug("findRewardTypes()");
      deferred = this.$q.defer();
      this.$http.get(baseUrl + "/rewardTypes", {
          headers: {
              'params': encodeURIComponent(angular.toJson(pager))
          }
      }).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully find RewardTypes - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to find RewardTypes - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    RewardTypesService.prototype.saveType = function(rewardType) {
      var deferred;
      this.$log.debug("saveType " + (angular.toJson(rewardType, true)));
      deferred = this.$q.defer();
      this.$http.post(baseUrl + "/rewardTypes", rewardType).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully save rewardType - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to save rewardType - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    RewardTypesService.prototype.deleteType = function(rewardType) {
      var deferred;
      this.$log.debug("deleteType " + (angular.toJson(rewardType, true)));
      deferred = this.$q.defer();
      this.$http.delete(baseUrl + '/rewardTypes/' + rewardType.code).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully delete rewardType - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to delete rewardType - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    return RewardTypesService;

  })();

  angular.module('sbAdminApp').service('RewardTypesService', RewardTypesService);

}).call(this);

