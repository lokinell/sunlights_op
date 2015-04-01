(function() {
  var ExchangeRuleService;

  ExchangeRuleService = (function() {
    ExchangeRuleService.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    ExchangeRuleService.defaultConfig = {
      headers: ExchangeRuleService.headers
    };

    function ExchangeRuleService($log, $http, $q) {
      this.$log = $log;
      this.$http = $http;
      this.$q = $q;
      this.$log.debug("constructing ExchangeRuleService");
    }

    ExchangeRuleService.prototype.saveRule = function(rule) {
      var deferred;
      this.$log.debug("saveRule " + (angular.toJson(rule, true)));
      deferred = this.$q.defer();
      this.$http.post(baseUrl + "/exchangeRewardRules", rule).success((function(_this) {
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

    ExchangeRuleService.prototype.deleteRule = function(rule) {
      var deferred;
      this.$log.debug("deleteRule " + (angular.toJson(rule, true)));
      deferred = this.$q.defer();
      this.$http.delete(baseUrl + '/exchangeRewardRules/' + rule.ruleId).success((function(_this) {
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

    return ExchangeRuleService;

  })();

  angular.module('sbAdminApp').service('ExchangeRuleService', ExchangeRuleService);

}).call(this);

