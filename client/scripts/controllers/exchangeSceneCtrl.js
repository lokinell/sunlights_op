(function() {
  var ExchangeSceneCtrl;

  ExchangeSceneCtrl = (function() {
    function ExchangeSceneCtrl($scope, $modal, $http, $timeout, $log, $location, ExchangeSceneService, ActivityService) {
      this.$scope = $scope;
      this.$modal = $modal;
      this.$http = $http;
      this.$timeout = $timeout;
      this.$log = $log;
      this.$location = $location;
      this.ExchangeSceneService = ExchangeSceneService;
      this.ActivityService = ActivityService;
      this.$log.debug("constructing rewardType");
      this.exchangeScene;
      this.editingRow = {};
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
      this.constant = {
        status: [
          {
            key: 'N',
            value: '启用'
          }, {
            key: 'F',
            value: '禁用'
          }
        ],
        activityTypes: [
          {
            key: '',
            value: '请选择'
          }, {
            key: 'ATT001',
            value: '注册类'
          }, {
            key: 'ATT002',
            value: '首次购买类'
          }, {
            key: 'ATT003',
            value: '购买类'
          }, {
            key: 'ATT004',
            value: '签到类'
          }, {
            key: 'ATT005',
            value: '邀请类'
          }
        ],
        exchangeTypes: [
          {
            key: '',
            value: '请选择'
          }, {
            key: '0',
            value: '取现'
          }, {
            key: '1',
            value: '兑话费'
          }, {
            key: '2',
            value: '兑Q币'
          }
        ],
        rewardTypes: []
      };
      this.$scope.pageSizes = [5, 10, 20];
      this.$scope.columnDefs = [
        {
          field: "scene",
          displayName: "编码"
        }, {
          field: "title",
          displayName: "名称"
        }, {
          field: "status",
          displayName: "状态",
          cellTemplate: 'views/cell/statuscell.html'
        }, {
          field: "rewardTypeStr",
          displayName: "奖励类型"
        }, {
          field: "activityTypeStr",
          displayName: "活动类型"
        }, {
          field: "exchangeTypeStr",
          displayName: "兑换类型"
        }, {
          field: "requireAmt",
          displayName: "所需数量"
        }, {
          field: "exchangedAmt",
          displayName: "兑换数量"
        }, {
          field: "exchangeLimit",
          displayName: "兑换限额"
        }, {
          field: "timeLimit",
          displayName: "到账期限"
        }, {
          field: "locked",
          displayName: "操作",
          cellTemplate: "views/cell/rewardTypeCell.html"
        }
      ];
      this.$scope.pageUrl = baseUrl + "/exchangescene";
      new PageService(this.$scope, this.$http, this.$timeout);
      this.$scope.isNomal = (function(_this) {
        return function(row) {
          return row.getProperty("status") === "N";
        };
      })(this);
      this.$scope.open = (function(_this) {
        _this.prepareData()
        return function(isEditing) {

          var modalInstance;
          modalInstance = _this.$modal.open({
            templateUrl: "modalContent.html",
            controller: "ExchangeSceneModalInstanceCtrl",
              windowClass : "popup-window",
              resolve: {
              selectedRow: function() {
                if (isEditing) {
                  return _this.exchangeScene;
                } else {
                  return {};
                }
              },
              constant: function() {
                return _this.constant;
              },
              myData: function() {
                return _this.$scope.myData;
              }
            }
          });
          return modalInstance.result.then((function(data) {
            if (!data.id) {
              return _this.$scope.myData[_this.$scope.myData.length] = data;
            } else {
              return _this.editingRow.entity = data;
            }
          }), function() {
            return _this.$log.info("Modal dismissed at: " + new Date());
          });
        };
      })(this);
    }

    ExchangeSceneCtrl.prototype.init = function() {
      this.findExchangeScenes();
      return this.prepareData();
    };

    ExchangeSceneCtrl.prototype.findExchangeScenes = function() {
      this.$log.debug("findExchangeScenes()");
      return this.ExchangeSceneService.findExchangeScenes().then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data + " Scenes");
          return _this.$scope.myData = data.list;
        };
      })(this), (function(_this) {
        return function(error) {
          return _this.$log.error("Unable to get Scenes: " + error);
        };
      })(this));
    };

    ExchangeSceneCtrl.prototype.prepareData = function() {
      return this.ActivityService.loadRewardTypes().then((function(_this) {
        return function(data) {
          _this.$log.debug(data);
          return _this.constant.rewardTypes = data;
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get rewardTypes: " + error);
          return _this.error = error;
        };
      })(this));
    };

    ExchangeSceneCtrl.prototype.editRow = function(row) {
      var value;
      this.editingRow = row;
      value = angular.toJson(row.entity);
      this.$log.debug(value);
      this.exchangeScene = value;
      return this.$scope.open(true);
    };

    ExchangeSceneCtrl.prototype.deleteRow = function(row) {
      return this.ExchangeSceneService.deleteScene(row.entity).then((function(_this) {
        return function(data) {
          _this.$log.debug("Successfully delete exchangeScene");
          return _this.findExchangeScenes();
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to delete exchangeScene: " + error);
          return _this.error = error;
        };
      })(this));
    };

    return ExchangeSceneCtrl;

  })();

  angular.module('sbAdminApp').controller('ExchangeSceneCtrl', ExchangeSceneCtrl);

  angular.module('sbAdminApp').controller("ExchangeSceneModalInstanceCtrl", function($scope, $log, $location, $modalInstance, selectedRow, constant, ExchangeSceneService, myData) {
    $scope.row = angular.fromJson(selectedRow);
    $scope.constant = constant;
    $scope.ok = function() {
      ExchangeSceneService.saveScene($scope.row).then((function(_this) {
        return function(data) {
          $log.debug("Successfully saveScene exchangeScene");
          $scope.row.id = data.id;
          $scope.row.rewardTypeStr = data.rewardTypeStr;
          $scope.row.activityTypeStr = data.activityTypeStr;
          return $scope.row.exchangeTypeStr = data.exchangeTypeStr;
        };
      })(this), (function(_this) {
        return function(error) {
          $log.error("Unable to delete exchangeScene: " + error);
          return _this.error = error;
        };
      })(this));
      return $modalInstance.close($scope.row);
    };
    return $scope.cancel = function() {
      return $modalInstance.dismiss("cancel");
    };
  });

}).call(this);

