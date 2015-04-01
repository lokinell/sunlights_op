(function() {
  var ExchangeSceneService;

  ExchangeSceneService = (function() {
    ExchangeSceneService.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    ExchangeSceneService.defaultConfig = {
      headers: ExchangeSceneService.headers
    };

    function ExchangeSceneService($log, $http, $q) {
      this.$log = $log;
      this.$http = $http;
      this.$q = $q;
      this.$log.debug("constructing ExchangeRuleService");
    }

    ExchangeSceneService.prototype.findExchangeScenes = function() {
      var deferred;
      this.$log.debug("findExchangeScenes()");
      deferred = this.$q.defer();
      this.$http.get(baseUrl + "/exchangescene").success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully find exchangescene - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to find exchangescene - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    ExchangeSceneService.prototype.saveScene = function(scene) {
      var deferred;
      this.$log.debug("saveRule " + (angular.toJson(scene, true)));
      deferred = this.$q.defer();
      this.$http.post(baseUrl + "/exchangescene", scene).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully save scene - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to save scene - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    ExchangeSceneService.prototype.deleteScene = function(scene) {
      var deferred;
      this.$log.debug("deleteRule " + (angular.toJson(scene, true)));
      deferred = this.$q.defer();
      this.$http.delete(baseUrl + '/exchangescene/' + scene.id).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully delete scene - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to delete scene - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    return ExchangeSceneService;

  })();

  angular.module('sbAdminApp').service('ExchangeSceneService', ExchangeSceneService);

}).call(this);

