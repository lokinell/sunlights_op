(function() {
  var TaskService;

  TaskService = (function() {
    TaskService.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    TaskService.defaultConfig = {
      headers: TaskService.headers
    };

    function TaskService($log, $http, $q) {
      this.$log = $log;
      this.$http = $http;
      this.$q = $q;
      this.$log.debug("constructing TaskService");
    }

    TaskService.prototype.listTasks = function(pager) {
      var deferred;
      this.$log.debug("listTasks()");
      deferred = this.$q.defer();
      this.$http.get(baseUrl+'/tasks', {
        headers: {
          'params': encodeURIComponent(angular.toJson(pager))
        }
      }).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully listed tasks - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to list tasks - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    TaskService.prototype.saveTask = function(task) {
      var deferred;
      this.$log.debug("saveTask " + (angular.toJson(task, true)));
      deferred = this.$q.defer();
      this.$http.post(baseUrl+'/task', task).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully save Task - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to save Task - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    TaskService.prototype.deleteTask = function(task) {
      var deferred;
      this.$log.debug("deleteTask " + (angular.toJson(task, true)));
      deferred = this.$q.defer();
      this.$http({
        method: 'DELETE',
        url: baseUrl+'/task',
        params: task
      }).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully delete Task - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to delete Task - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    TaskService.prototype.pauseTask = function(task) {
      var deferred;
      this.$log.debug("pauseTask " + (angular.toJson(task, true)));
      deferred = this.$q.defer();
      task.status = 0;
      this.$http.put(baseUrl+"/task", task).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully pause Task - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to pause Task - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    TaskService.prototype.resumeTask = function(task) {
      var deferred;
      this.$log.debug("pauseTask " + (angular.toJson(task, true)));
      deferred = this.$q.defer();
      task.status = 1;
      this.$http.put(baseUrl+"/task", task).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully resume Task - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to resume Task - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    TaskService.prototype.grabFund = function() {
      var deferred;
      this.$log.debug("grabFund");
      deferred = this.$q.defer();
      this.$http.post(baseUrl+'/task/fund').success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully grab fund - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to grab fund - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    TaskService.prototype.grabFundCode = function() {
      var deferred;
      this.$log.debug("grabFundCode");
      deferred = this.$q.defer();
      this.$http.post(baseUrl+'/task/fund/code').success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully grab code fund - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to grab code fund - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    return TaskService;

  })();

  angular.module('sbAdminApp').service('TaskService', TaskService);

}).call(this);

