(function() {
  var ActivityShareModalInstanceCtrl;

  ActivityShareModalInstanceCtrl = (function() {
    function ActivityShareModalInstanceCtrl($scope, $log, $location, modalInstance, selectedRow, parentId, ActivityShareInfoService, ActivityService, constant) {
      var vm;
      this.$scope = $scope;
      this.$log = $log;
      this.$location = $location;
      this.modalInstance = modalInstance;
      this.selectedRow = selectedRow;
      this.parentId = parentId;
      this.ActivityShareInfoService = ActivityShareInfoService;
      this.ActivityService = ActivityService;
      this.constant = constant;
      this.$log.debug("constructing ActivityShareModalInstanceCtrl");
      this.$scope.row = angular.fromJson(selectedRow);
      vm = this.$scope.vm = {};
      this.$scope.constant = constant;
      this.$scope.share = {};
      this.$scope.refIds = [];
      this.$scope.activities = [];
      this.$scope.specialShares = [];
      this.$scope.isEdit = false;
      this.$scope.parentId = parentId;
      ActivityService.findActivities().then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.length + " activities");
          return _this.$scope.refIds = data;
        };
      })(this), (function(_this) {
        return function(error) {
          return _this.$log.error("Unable to get activities: " + error);
        };
      })(this));
      ActivityShareInfoService.findSpecialShares(parentId).then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.length + " activities parentId = " + parentId);
          return _this.$scope.specialShares = data;
        };
      })(this), (function(_this) {
        return function(error) {
          return _this.$log.error("Unable to get activities: " + error);
        };
      })(this));
      this.$scope.okBasicShare = function() {
        return ActivityShareInfoService.saveShare($scope.row).then((function(_this) {
          return function(data) {
            modalInstance.close(data);
            return $log.debug("Promise returned " + data + " share");
          };
        })(this), (function(_this) {
          return function(error) {
            return $log.error("Unable to get share: " + error);
          };
        })(this));
      };
      this.$scope.okSpecialShare = function() {
        $scope.share.parentId = parentId;
        return ActivityShareInfoService.saveShare($scope.share).then((function(_this) {
          return function(data) {
            $log.debug("Promise returned " + data + " share");
            if (!$scope.isEdit) {
              $scope.share.id = data.id;
              $scope.share.refStr = data.refStr;
              $scope.specialShares[$scope.specialShares.length] = $scope.share;
              return $scope.share = {};
            } else {
              $scope.share.refStr = data.refStr;
              return $scope.specialShares[$scope.rowIndex] = $scope.share;
            }
          };
        })(this), (function(_this) {
          return function(error) {
            return $log.error("Unable to get share: " + error);
          };
        })(this));
      };
      this.$scope.editShare = (function(_this) {
        return function(row) {
          _this.$scope.share = row.entity;
          _this.$scope.rowIndex = row.rowIndex;
          return _this.$scope.isEdit = true;
        };
      })(this);
      this.$scope.addSpecialShare = (function(_this) {
        return function() {
          _this.$scope.share = {};
          return _this.$scope.isEdit = false;
        };
      })(this);
      this.$scope.deleteShare = (function(_this) {
        return function(row) {
          return ActivityShareInfoService.deleteShare(row.entity).then(function(data) {
            $log.debug("Promise returned " + data.length + " activities");
            return _this.querySpecialShare();
          }, function(error) {
            return $log.error("Unable to get activities: " + error);
          });
        };
      })(this);
      this.$scope.cancel = function() {
        return modalInstance.dismiss("cancel");
      };
      this.$scope.gridOptionsShare = {
        columnDefs: [
          {
            field: 'title',
            displayName: '分享标题'
          }, {
            field: 'refStr',
            displayName: '关联条目'
          }, {
            field: 'locked',
            displayName: '操作',
            cellTemplate: 'views/cell/shareInfo.html'
          }
        ],
        multiSelect: false,
        data: 'specialShares',
        useExternalSorting: true,
        i18n: "zh-cn",
        enableColumnResize: true,
        showColumnMenu: true
      };
    }

    ActivityShareModalInstanceCtrl.prototype.querySpecialShare = function() {
      return this.ActivityShareInfoService.findSpecialShares(this.$scope.parentId).then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.length + " activities");
          return _this.$scope.specialShares = data;
        };
      })(this), (function(_this) {
        return function(error) {
          return _this.$log.error("Unable to get activities: " + error);
        };
      })(this));
    };

    return ActivityShareModalInstanceCtrl;

  })();

  angular.module('sbAdminApp').controller('activityShareModalInstanceCtrl', ['$scope', '$log', '$location', '$modalInstance', 'selectedRow', 'parentId', 'ActivityShareInfoService', 'ActivityService', 'constant', ActivityShareModalInstanceCtrl]);

}).call(this);

