(function() {
  var ActivitySceneService;

  ActivitySceneService = (function() {
    ActivitySceneService.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    ActivitySceneService.defaultConfig = {
      headers: ActivitySceneService.headers
    };

    function ActivitySceneService($log, $http, $q) {
      this.$log = $log;
      this.$http = $http;
      this.$q = $q;
      this.$log.debug("constructing ActivitySceneService");
    }

    ActivitySceneService.prototype.findActivityTypes = function() {
      var deferred;
      this.$log.debug("findActivityTypes()");
      deferred = this.$q.defer();
      this.$http.get(baseUrl + "/activity/type").success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully find Activity Types - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to find Activity Types - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    ActivitySceneService.prototype.findScenes = function(pager) {
      var deferred;
      this.$log.debug("findScenes()");
      deferred = this.$q.defer();
      this.$http.get(baseUrl + "/activity/scene", {
          headers: {
              'params': encodeURIComponent(angular.toJson(pager))
          }
      }).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully find Scenes - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to find Scenes - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    ActivitySceneService.prototype.saveScene = function(scene) {
      var deferred;
      this.$log.debug("saveScene " + (angular.toJson(scene, true)));
      deferred = this.$q.defer();
      this.$http.post(baseUrl + "/activity/scene", scene).success((function(_this) {
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

    ActivitySceneService.prototype.deleteScene = function(scene) {
      var deferred;
      this.$log.debug("deleteScene " + (angular.toJson(scene, true)));
      deferred = this.$q.defer();
      this.$http.delete(baseUrl + "/activity/scene/" + scene.id).success((function(_this) {
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

    ActivitySceneService.prototype.updateScene = function(scene) {
      var deferred;
      this.$log.debug("updateScene " + (angular.toJson(scene, true)));
      deferred = this.$q.defer();
      this.$http.put(baseUrl + "/activity/scene", scene).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully update scene - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to update scene - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    return ActivitySceneService;

  })();

  angular.module('sbAdminApp').service('ActivitySceneService', ActivitySceneService);

}).call(this);

