(function() {
  var RewardTypeCtrl;

  RewardTypeCtrl = (function() {
    function RewardTypeCtrl($http, $timeout, $scope, $modal, toaster,$log, $location, FileUploader, RewardTypesService, ExchangeRuleService,toaster) {
      this.$http = $http;
      this.$timeout = $timeout;
      this.$scope = $scope;
      this.$modal = $modal;
      this.$log = $log;
      this.toaster = toaster;
      this.$location = $location;
      this.toaster = toaster;
      this.FileUploader = FileUploader;
      this.RewardTypesService = RewardTypesService;
      this.ExchangeRuleService = ExchangeRuleService;
      this.$log.debug("constructing rewardType");
      this.rewardTypes = [];
      this.rewardType;
      this.editingRow = {};
      this.code;
      this.pager = {

      };
      this.uploaderRuleH5 = new FileUploader({
        url: '/activities/uploadFile',
        alias: 'ruleH5'
      });

      this.$scope.gridOptions = {
          data: 'pager.list',
          enablePaging: true,
          showFooter: true,
          multiSelect: false,
          useExternalSorting: true,
          i18n: "zh-cn",
          enableColumnResize: true,
          showColumnMenu: true,
          totalServerItems: 'pager.count',
          pagingOptions: {
              pageSizes: [2, 10, 15],
              pageSize: 10,
              currentPage: 1
          },
          columnDefs: [
              {
                  field: "code",
                  displayName: "编码"
              }, {
                  field: "name",
                  displayName: "名称"
              }, {
                  field: "unit",
                  displayName: "单位"
              }, {
                  field: "rate",
                  displayName: "兑换率"
              }, {
                  field: "limitTime",
                  displayName: "兑换期限"
              }, {
                  field: "locked",
                  displayName: "操作",
                  cellTemplate: "views/cell/rewardTypeCell.html"
              }, {
                  field: "locked",
                  displayName: "兑换规则",
                  cellTemplate: "views/cell/exchangeRewardRule.html"
              }
          ]
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
            templateUrl: "modalContent.html",
            controller: "ModalInstanceCtrl",
            resolve: {
              selectedRow: function() {
                if (isEditing) {
                  return _this.rewardType;
                } else {
                  return {};
                }
              },
              uploaderRuleH5: function() {
                return _this.uploaderRuleH5;
              }
            }
          });
          return modalInstance.result.then((function(data) {
            _this.$log.debug("result>>>>" + data);
            return _this.editingRow.entity = data;
          }), function() {
            return _this.$log.info("Modal dismissed at: " + new Date());
          });
        };
      })(this);
      this.$scope.openRule = (function(_this) {
        return function(isEditing) {
          var modalInstance;
          modalInstance = _this.$modal.open({
            templateUrl: "ruleModalContent.html",
            controller: "ruleModalInstanceCtrl",
            resolve: {
              selectedRow: function() {
                if (isEditing) {
                  return _this.rewardType;
                } else {
                  return {};
                }
              },
              typeCode: function() {
                return _this.code;
              }
            }
          });
          return modalInstance.result.then((function(data) {
            _this.$log.debug("result>>>>" + data);
            return _this.editingRow.entity = data;
          }), function() {
            return _this.$log.info("Modal dismissed at: " + new Date());
          });
        };
      })(this);
    }

    RewardTypeCtrl.prototype.findRewardTypes = function() {
      this.$log.debug("findRewardTypes()");
      this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
      this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;

      return this.RewardTypesService.findRewardTypes(this.pager).then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.length + " RewardTypes");
          return _this.$scope.pager = data.value;
        };
      })(this), (function(_this) {
        return function(error) {
          return _this.$log.error("Unable to get RewardTypes: " + error);
        };
      })(this));
    };

    RewardTypeCtrl.prototype.editRow = function(row) {
      var value;
      this.editingRow = row;
      value = angular.toJson(row.entity);
      this.$log.debug(value);
      this.rewardType = value;
      return this.$scope.open(true);
    };

    RewardTypeCtrl.prototype.deleteRow = function(row) {
      return this.RewardTypesService.deleteType(row.entity).then((function(_this) {
        return function(data) {
          _this.$log.debug("Successfully delete rewardType");
          _this.toaster.pop('success', "删除成功", "删除成功");
          return _this.findRewardTypes();
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to delete rewardType: " + error);
          _this.toaster.pop('success', "删除失败", "删除失败");
          return _this.error = error;
        };
      })(this));
    };

    RewardTypeCtrl.prototype.addRule = function(row) {
      var value;
      value = angular.toJson(row.entity);
      this.code = row.entity.code;
      return this.$scope.openRule(false);
    };

    RewardTypeCtrl.prototype.editRule = function(row) {
      var value;
      this.editingRow = row;
      value = angular.toJson(row.entity);
      this.code = row.entity.code;
      this.rewardType = value;
      return this.$scope.openRule(true);
    };

    RewardTypeCtrl.prototype.deleteRule = function(row) {
      return this.ExchangeRuleService.deleteRule(row.entity).then((function(_this) {
        return function(data) {
          _this.$log.debug("Successfully delete rewardType");
          _this.toaster.pop('success', "删除成功", "删除成功");
          return _this.findRewardTypes();
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to delete rewardType: " + error);
          _this.toaster.pop('success', "删除失败", "删除失败");
          return _this.error = error;
        };
      })(this));
    };

    return RewardTypeCtrl;

  })();

  angular.module('sbAdminApp').controller('RewardTypeCtrl', RewardTypeCtrl);

  angular.module('sbAdminApp').controller("ModalInstanceCtrl", function($scope, $log, $location, $modalInstance, selectedRow, RewardTypesService, uploaderRuleH5) {
    $scope.row = angular.fromJson(selectedRow);
    $scope.uploaderRuleH5 = uploaderRuleH5;
    $scope.ok = function() {

      RewardTypesService.saveType($scope.row);
      $modalInstance.close($scope.row);
      return window.parent.location.reload();
    };
    return $scope.cancel = function() {
      return $modalInstance.dismiss("cancel");
    };
  });

  angular.module('sbAdminApp').controller("ruleModalInstanceCtrl", function($scope, $log, $location, $modalInstance, selectedRow, typeCode, ExchangeRuleService) {
    $scope.row = angular.fromJson(selectedRow);
    $scope.ok = function() {
      $scope.row.code = typeCode;
      ExchangeRuleService.saveRule($scope.row);
      $modalInstance.close($scope.row);
      return window.parent.location.reload();
    };
    return $scope.cancel = function() {
      return $modalInstance.dismiss("cancel");
    };
  });

}).call(this);

