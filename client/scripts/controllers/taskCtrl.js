(function() {
  var TaskCtrl;

  TaskCtrl = (function() {
    function TaskCtrl($log, $rootScope, $http, $timeout, $scope, $location, TaskService) {
      var day, hour, minute, month, second;
      this.$log = $log;
      this.$rootScope = $rootScope;
      this.$http = $http;
      this.$timeout = $timeout;
      this.$scope = $scope;
      this.$location = $location;
      this.TaskService = TaskService;
      this.$log.debug("constructing TaskCtrl");
      this.pager = {};
      this.task = this.$rootScope.task || {};
      this.$log.debug(this.task);
      this.jobClasses = [
        {
          key: 'com.sunlights.op.jobs.FundJob',
          value: '基金同步'
        }, {
          key: 'com.sunlights.op.jobs.FundCodeJob',
          value: '基金代码同步'
        }, {
          key: 'com.sunlights.op.jobs.PushMessageJob',
          value: '推送信息'
        }, {
          key: 'com.sunlights.op.jobs.FundProfitHistoryJob',
          value: '基金净值同步'
        }, {
          key: 'com.sunlights.op.jobs.FundEquityMonitorJob',
          value: '基金净值监控'
        }, {
          key: 'com.sunlights.op.jobs.FundArchiveexJob',
          value: '基金档案同步'
        }, {
          key: 'com.sunlights.op.jobs.WeiXinTicketJob',
          value: '微信公众JS临时门票'
        }
      ];
      this.seconds = (function() {
        var _i, _results;
        _results = [];
        for (second = _i = 0; _i <= 59; second = ++_i) {
          _results.push(second + '');
        }
        return _results;
      })();
      this.minutes = (function() {
        var _i, _results;
        _results = [];
        for (minute = _i = -4; _i <= 59; minute = ++_i) {
          _results.push({
            'key': minute + '',
            'value': minute + ''
          });
        }
        return _results;
      })();
      this.minutes[0] = {
        'key': '*/5' + '',
        'value': '每隔5分钟'
      };
      this.minutes[1] = {
        'key': '*/10' + '',
        'value': '每隔10分钟'
      };
      this.minutes[2] = {
        'key': '*/20' + '',
        'value': '每隔20分钟'
      };
      this.minutes[3] = {
        'key': '*/30' + '',
        'value': '每隔30分钟'
      };
      this.hours = (function() {
        var _i, _results;
        _results = [];
        for (hour = _i = -1; _i <= 23; hour = ++_i) {
          _results.push(hour + '');
        }
        return _results;
      })();
      this.hours[0] = '*';
      this.dayOfMonth = (function() {
        var _i, _results;
        _results = [];
        for (day = _i = 0; _i <= 31; day = ++_i) {
          _results.push(day + '');
        }
        return _results;
      })();
      this.dayOfMonth[0] = '*';
      this.month = (function() {
        var _i, _results;
        _results = [];
        for (month = _i = 0; _i <= 12; month = ++_i) {
          _results.push(month + '');
        }
        return _results;
      })();
      this.month[0] = '*';
      this.dayOfWeek = ['*', '一', '二', '三', '四', '五', '六', '七'];
      $scope.gridOptions = {
        data: 'pager.list',
        enablePaging: true,
        showFooter: true,
        multiSelect: false,
        totalServerItems: 'pager.count',
        pagingOptions: {
          pageSizes: [5, 10, 15],
          pageSize: 10,
          currentPage: 1
        },
        columnDefs: [
          {
            field: 'jobName',
            displayName: '任务名称'
          }, {
            field: 'jobClass',
            displayName: '任务执行类'
          }, {
            field: 'jobParams',
            displayName: '任务参数'
          }, {
            field: 'jobStartTime',
            displayName: '执行时间'
          }, {
            field: 'state',
            displayName: '状态'
          }, {
            field: null,
            displayName: '操作',
            cellTemplate: 'views/tasks/taskOperation.html'
          }
        ]
      };
    }

    TaskCtrl.prototype.listTasks = function() {
      this.$log.debug("listTasks()");
      this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
      this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
      return this.TaskService.listTasks(this.pager).then((function(_this) {
        return function(data) {
          _this.$log.info("Promise returned " + data.value.list.length + " Tasks");
          return _this.$scope.pager = data.value;
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get Tasks: " + error);
          return _this.error = error;
        };
      })(this));
    };

    TaskCtrl.prototype.saveTask = function() {
      this.$log.debug("saveTask()");
      return this.TaskService.saveTask(this.task).then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data);
          return _this.$location.path("/dashboard/tasks");
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to create Task: " + (angular.toJson(error, true)));
          return _this.error = error;
        };
      })(this));
    };

    TaskCtrl.prototype.createTask = function() {
      this.$log.debug("createTask()");
      this.task = {};
      return this.$location.path("/dashboard/tasks/save");
    };

    TaskCtrl.prototype.editTask = function(task) {
      this.$log.debug("editTask() " + (angular.toJson(task, true)));
      task.isEdit = true;
      this.$rootScope.task = task;
      return this.$location.path("/dashboard/tasks/save");
    };

    TaskCtrl.prototype.deleteTask = function(task) {
      this.$log.debug("deleteTask");
      return this.TaskService.deleteTask(task).then((function(_this) {
        return function(data) {
          _this.$log.debug("Successfully delete Task");
          return _this.listTasks();
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get Tasks: " + error);
          return _this.error = error;
        };
      })(this));
    };

    TaskCtrl.prototype.pauseTask = function(task) {
      this.$log.debug("pauseTask()");
      return this.TaskService.pauseTask(task).then((function(_this) {
        return function(data) {
          _this.$log.debug("Successfully pause Task");
          return _this.listTasks();
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to pause Task: " + error);
          return _this.error = error;
        };
      })(this));
    };

    TaskCtrl.prototype.resumeTask = function(task) {
      this.$log.debug("resumeTask()");
      return this.TaskService.resumeTask(task).then((function(_this) {
        return function(data) {
          _this.$log.debug("Successfully resume Task");
          return _this.listTasks();
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to resume Task: " + error);
          return _this.error = error;
        };
      })(this));
    };

    return TaskCtrl;

  })();

  angular.module('sbAdminApp').controller('TaskCtrl', TaskCtrl);

}).call(this);

