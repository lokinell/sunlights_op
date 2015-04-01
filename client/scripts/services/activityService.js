(function() {
  var ActivityService;

  ActivityService = (function() {
    ActivityService.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    ActivityService.defaultConfig = {
      headers: ActivityService.headers
    };

    function ActivityService($log, $http, $q) {
      this.$log = $log;
      this.$http = $http;
      this.$q = $q;
      this.$log.debug("constructing ActivityService");
    }

    ActivityService.prototype.findActivities = function(pager) {
      var deferred;
      this.$log.debug("findActivities()");
      deferred = this.$q.defer();
      this.$http.get(baseUrl + "/activities", pager).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully find Activities - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to find Activities - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    ActivityService.prototype.saveActivity = function(activityVo) {
      var deferred;
      this.$log.debug("saveActivity " + (angular.toJson(activityVo, true)));
      deferred = this.$q.defer();
      this.$http.post(baseUrl + "/activity", activityVo).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully save Activity - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to save Activity - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    ActivityService.prototype.deleteActivity = function(activityVo) {
      var deferred;
      this.$log.debug("deleteActivity " + (angular.toJson(activityVo, true)));
      deferred = this.$q.defer();
      this.$http.delete(baseUrl + '/activity/' + activityVo.id).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully delete activityVo - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to delete activityVo - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    ActivityService.prototype.loadRewardTypes = function() {
      var deferred;
      deferred = this.$q.defer();
      this.$http.get(baseUrl + "/rewardTypes/kvType").success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully find loadRewardTypes - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to find loadRewardTypes - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    ActivityService.prototype.loadActivityScene = function() {
      var deferred;
      deferred = this.$q.defer();
      this.$http.get(baseUrl + "/activity/scene/keyvalues").success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully find loadActivityScene - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to find loadActivityScene - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };



    return ActivityService;

  })();

  angular.module('sbAdminApp').service('ActivityService', ActivityService);

}).call(this);

