(function() {
  var ObtainRewardRulesService;

  ObtainRewardRulesService = (function() {
    ObtainRewardRulesService.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    ObtainRewardRulesService.defaultConfig = {
      headers: ObtainRewardRulesService.headers
    };

    function ObtainRewardRulesService($log, $http, $q) {
      this.$log = $log;
      this.$http = $http;
      this.$q = $q;
      this.$log.debug("constructing ObtainRewardRulesService");
    }

    ObtainRewardRulesService.prototype.findRules = function(activityId) {
      var deferred, param;
      this.$log.debug("findRules()" + activityId);
      deferred = this.$q.defer();

      this.$http.get(baseUrl + "/obtainRewardRules/" + activityId).success((function(_this) {
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

    ObtainRewardRulesService.prototype.loadPrdTypes = function() {
      var deferred;
      deferred = this.$q.defer();
      this.$http.get(baseUrl + "/product/loadType").success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully find loadPrdTypes - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to find loadPrdTypes - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    ObtainRewardRulesService.prototype.loadPrds = function() {
      var deferred;
      deferred = this.$q.defer();
      this.$http.get(baseUrl + "/product/loadPrds").success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully find loadPrds - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to find loadPrds - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    ObtainRewardRulesService.prototype.saveRule = function(rule) {
      var deferred;
      this.$log.debug("saveRule " + (angular.toJson(rule, true)));
      deferred = this.$q.defer();
      this.$http.post(baseUrl + "/obtainRewardRules", rule).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully save rule - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to save rule - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    ObtainRewardRulesService.prototype.deleteRule = function(rule) {
      var deferred;
      this.$log.debug("deleteRule " + (angular.toJson(rule, true)));
      deferred = this.$q.defer();
      this.$http.delete(baseUrl + '/obtainRewardRules/' + rule.id).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully delete Rule - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to delete Rule - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    return ObtainRewardRulesService;

  })();

  angular.module('sbAdminApp').service('ObtainRewardRulesService', ObtainRewardRulesService);

}).call(this);

