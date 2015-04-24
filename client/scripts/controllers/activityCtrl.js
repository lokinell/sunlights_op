(function() {
  var ActivityCtrl;

  ActivityCtrl = (function() {
    function ActivityCtrl($modal, $log, $scope, $location,toaster, FileUploader, ActivityService, ObtainRewardRulesService, ActivityShareInfoService) {
      this.$modal = $modal;
      this.$log = $log;
      this.$scope = $scope;
      this.$location = $location;
      this.toaster = toaster;
      this.FileUploader = FileUploader;
      this.ActivityService = ActivityService;
      this.ObtainRewardRulesService = ObtainRewardRulesService;
      this.ActivityShareInfoService = ActivityShareInfoService;
      this.$log.debug("constructing ActivityCtrl");
      this.activities = [];
      this.activity = {};
      this.condition = {};
      this.$scope.myData = [];
      this.activityId;
      this.pager = {

      };
      this.constant = {
        activityStyle: [
          {
            key: '',
            value: '请选择'
          }, {
            key: '1',
            value: '分享类'
          }, {
            key: '2',
            value: '邀请类'
          }, {
            key: '3',
            value: '翻牌类'
          }
        ],
        status: [
          {
            key: '',
            value: '请选择'
          }, {
            key: 'N',
            value: '启用'
          }, {
            key: 'F',
            value: '禁用'
          }
        ],
        scenes: []
      };

      this.ruleConstant = {
        isInviters: [
          {
            key: '',
            value: '请选择'
          }, {
            key: 0,
            value: '被推荐人'
          }, {
            key: 1,
            value: '推荐人'
          }
        ],
        rewardTypes: [],
        effectTimes: [
          {
            key: '',
            value: '请选择'
          }, {
            key: 1,
            value: '实时到账'
          }, {
            key: 2,
            value: '1到2个工作日'
          }, {
            key: 3,
            value: '2到3个工作日'
          }, {
            key: 4,
            value: '月末'
          }
        ],
        validTimes: [
          {
            key: '',
            value: '请选择'
          }, {
            key: 1,
            value: '1个月'
          }, {
            key: 2,
            value: '2个月'
          }, {
            key: 3,
            value: '3个月'
          }, {
            key: 4,
            value: '6个月'
          }
        ],
        status: [
          {
            key: '',
            value: '请选择'
          }, {
            key: 'N',
            value: '启用'
          }, {
            key: 'F',
            value: '禁用'
          }
        ]
      };
      this.$scope.isNomal = (function(_this) {
        return function(row) {
          return row.getProperty("status") === "N";
        };
      })(this);
    }

    ActivityCtrl.prototype.setupScope = function() {
      this.$scope.gridOptions = {
        columnDefs: [
          {
            field: 'id',
            displayName: 'ID'
          }, {
            field: 'title',
            displayName: '标题'
          }, {
            field: 'beginTime',
            displayName: '开始时间'
          }, {
            field: 'endTime',
            displayName: '结束时间'
          }, {
            field: 'sceneName',
            displayName: '活动场景'
          }, {
            field: 'status',
            displayName: '活动状态',
            cellTemplate: 'views/cell/statuscell.html'
          }, {
            field: 'url',
            displayName: 'h5名称'
          },{
             field: 'image',
             displayName: '图片名称'
          },{
            field: 'locked',
            displayName: '操作',
            cellTemplate: 'views/cell/rewardTypeCell.html'
          }, {
            field: 'locked',
            displayName: '活动维护',
            cellTemplate: 'views/cell/activitycell.html'
          }
        ],
        multiSelect: false,
        data: 'pager.list',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'pager.count',
        pagingOptions: {
          pageSizes: [5, 10, 20],
          pageSize: 10,
          currentPage: 1
        },
        useExternalSorting: true,
        i18n: "zh-cn",
        enableColumnResize: true,
        showColumnMenu: true
      };
      this.$scope.editRow = (function(_this) {
        return function(row) {
          return _this.editRow(row);
        };
      })(this);
      this.$scope.deleteRow = (function(_this) {
        return function(row) {
          return _this.deleteRow(row);
        };
      })(this);
      this.$scope.addRule = (function(_this) {
        return function(row) {
          return _this.addRule(row);
        };
      })(this);
      this.$scope.editRule = (function(_this) {
        return function(row) {
          return _this.editRule(row);
        };
      })(this);
      this.$scope.deleteRule = (function(_this) {
        return function(row) {
          return _this.deleteRule(row);
        };
      })(this);

      this.$scope.open = (function(_this) {
        return function(isEditing) {
          var modalInstance;
          modalInstance = _this.$modal.open({
            templateUrl: "activityModalContent.html",
            controller: "activityModalInstanceCtrl",
            resolve: {
              selectedRow: function() {
                if (isEditing) {
                  return _this.activity;
                } else {
                  return {};
                }
              },
              constant: function() {
                return _this.constant;
              },
              uploaderImage: function() {
                return _this.uploaderImage;
              },
              uploaderHtml5: function() {
                return _this.uploaderHtml5;
              }
            }
          });
          return modalInstance.result.then((function(selectedItem) {
            return _this.$scope.selected = selectedItem;
          }), function() {
            return _this.$log.debug("Modal dismissed at: " + new Date());
          });
        };
      })(this);
      return this.$scope.openRule = (function(_this) {
        return function(isEditing) {
          var modalInstance;
          modalInstance = _this.$modal.open({
            templateUrl: "obtainRuleModalContent.html",
            controller: "obtainRuleModalInstanceCtrl",
            resolve: {
              selectedRow: function() {
                return {};
              },
              activityId: function() {
                return _this.activityId;
              },
              ruleConstant: function() {
                return _this.ruleConstant;
              }
            }
          });
          return modalInstance.result.then((function(selectedItem) {
            return _this.$scope.selected = selectedItem;
          }), function() {
            return _this.$log.debug("Modal dismissed at: " + new Date());
          });
        };
      })(this);
    };

    ActivityCtrl.prototype.init = function() {
      this.setupScope();
      return this.prepareData();
    };

    ActivityCtrl.prototype.findActivities = function() {
      this.$log.debug("findActivities()");
      this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
      this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;

      return this.ActivityService.findActivities(this.pager).then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.length + " activities");
          return _this.$scope.pager = data.value;
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get activities: " + error);
          return _this.error = error;
        };
      })(this));
    };

    ActivityCtrl.prototype.editRow = function(row) {
      var value;
      value = angular.toJson(row.entity);
      this.$log.debug(value);
      this.activity = value;
      return this.$scope.open(true);
    };



    ActivityCtrl.prototype.deleteRow = function(row) {
      return this.ActivityService.deleteActivity(row.entity).then((function(_this) {
        return function(data) {
          _this.$log.debug("Successfully delete Activity");
          _this.toaster.pop('success', "删除成功", "删除成功");
          return _this.findActivities();
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to delete Activity: " + error);
          _this.toaster.pop('success', "删除失败", "删除失败");
          return _this.error = error;
        };
      })(this));
    };

    ActivityCtrl.prototype.prepareData = function() {
      this.ActivityService.loadRewardTypes().then((function(_this) {
        return function(data) {
          _this.$log.debug(data);
          return _this.ruleConstant.rewardTypes = data;
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get activities: " + error);
          return _this.error = error;
        };
      })(this));
      return this.ActivityService.loadActivityScene().then((function(_this) {
        return function(data) {
          _this.$log.debug(data);
          return _this.constant.scenes = data;
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get activities: " + error);
          return _this.error = error;
        };
      })(this));
    };

    ActivityCtrl.prototype.addRule = function(row) {
      var value;
      this.prepareData();
      value = angular.toJson(row.entity);
      this.activityId = row.entity.id;
      this.code = row.entity.code;
      return this.$scope.openRule();
    };

    ActivityCtrl.prototype.editRule = function(row) {
      var value;
      this.prepareData();
      value = angular.toJson(row.entity);
      this.activityId = row.entity.id;
      this.activity = value;
      return this.$scope.openRule(true);
    };

    ActivityCtrl.prototype.deleteRule = function(row) {
      return this.ObtainRewardRulesService.deleteRule(angular.toJson(row.entity)).then((function(_this) {
        return function(data) {
          _this.$log.debug("Successfully delete Rule");
          return _this.findActivities();
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to delete Rule: " + error);
          return _this.error = error;
        };
      })(this));
    };

    return ActivityCtrl;

  })();

  angular.module('sbAdminApp').controller('ActivityCtrl', ActivityCtrl);

  angular.module('sbAdminApp').controller("activityModalInstanceCtrl", function($modal, $scope, $log, $location, $modalInstance, selectedRow, ActivityService, constant) {
      $log.debug("constructing ActivityCtrl");
      $scope.row = angular.fromJson(selectedRow);
      $scope.constant = angular.fromJson(constant);
      $scope.ok = function() {
          ActivityService.saveActivity($scope.row);
          $modalInstance.close($scope.row);
          return window.parent.location.reload();
      };
      $scope.cancel = function() {
          return $modalInstance.dismiss("cancel");
      };
  });




}).call(this);

