(function() {
  var ActivityShareCtrl;

  ActivityShareCtrl = (function() {
    function ActivityShareCtrl($modal, $log, $scope, $location, FileUploader, ActivityService, ObtainRewardRulesService, ActivityShareInfoService) {
      this.$modal = $modal;
      this.$log = $log;
      this.$scope = $scope;
      this.$location = $location;
      this.FileUploader = FileUploader;
      this.ActivityService = ActivityService;
      this.ObtainRewardRulesService = ObtainRewardRulesService;
      this.ActivityShareInfoService = ActivityShareInfoService;
      this.$log.debug("constructing ActivityShareCtrl");
      this.condition = {};
      this.$scope.share = {};
      this.$scope.row;
      this.$scope.shareDatas = [];
      this.parentId;
      this.constant = {
        shareType: [
          {
            key: '',
            value: '请选择'
          }, {
            key: '0',
            value: '分享app'
          }, {
            key: '1',
            value: '分享jdj产品'
          }, {
            key: '2',
            value: '分享收益'
          }, {
            key: '3',
            value: '分享活动'
          }, {
            key: '4',
            value: '分享跑p2p产品'
          }
        ],
        isRefId: [
          {
            key: 0,
            value: '无关'
          }, {
            key: 1,
            value: '有关'
          }
        ]
      };
      this.$scope.addShare = (function(_this) {
        return function() {
          return _this.$scope.share = {};
        };
      })(this);
      this.$scope.cancel = (function(_this) {
        return function() {
          return _this.$scope.share = {};
        };
      })(this);
      this.$scope.editShare = (function(_this) {
        return function(row) {
          var modalInstance;
          _this.$scope.share = row.entity;
          _this.$scope.row = row.rowIndex;
          _this.parentId = row.entity.id;
          modalInstance = _this.$modal.open({
            templateUrl: "activityShareModalContent.html",
            controller: "activityShareModalInstanceCtrl",
            resolve: {
              selectedRow: function() {
                return _this.$scope.share;
              },
              parentId: function() {
                return _this.parentId;
              },
              constant: function() {
                return _this.constant;
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
      this.$scope.deleteShare = (function(_this) {
        return function(row) {
          return ActivityShareInfoService.deleteShare(row.entity).then(function(data) {
            $log.debug("Promise returned " + data.length + " shares");
            return _this.queryShare();
          }, function(error) {
            return $log.error("Unable to get activities: " + error);
          });
        };
      })(this);
      this.$scope.okShare = (function(_this) {
        return function() {
          return ActivityShareInfoService.saveShare($scope.share).then(function(data) {
            $log.debug("Promise returned " + data + " rules");
            if (data.updateTime) {
              $scope.shareDatas[$scope.row] = $scope.share;
            } else {
              $scope.share.id = data.id;
              $scope.shareDatas[$scope.shareDatas.length] = $scope.share;
              $scope.share = {};
            }
            $scope.share.shareTypeStr = data.shareTypeStr;
            return $scope.share.isRefIdStr = data.isRefIdStr;
          }, function(error) {
            return $log.error("Unable to get rules: " + error);
          });
        };
      })(this);
    }

    ActivityShareCtrl.prototype.setupScope = function() {
      return this.$scope.gridOptionsShare = {
        columnDefs: [
          {
            field: 'title',
            displayName: '分享标题'
          }, {
            field: 'shareTypeStr',
            displayName: '分享类型'
          }, {
            field: 'isRefIdStr',
            displayName: '是否和Id有关'
          }, {
            field: 'content',
            displayName: '内容'
          }, {
            field: 'baseUrl',
            displayName: '分享URL'
          }, {
            field: 'imageUrl',
            displayName: '图标路径'
          }, {
            field: 'locked',
            displayName: '操作',
            cellTemplate: 'views/cell/shareInfo.html'
          }
        ],
        multiSelect: false,
        data: 'shareDatas',
        useExternalSorting: true,
        i18n: "zh-cn",
        enableColumnResize: true,
        showColumnMenu: true
      };
    };

    ActivityShareCtrl.prototype.init = function() {
      this.setupScope();
      return this.queryShare();
    };

    ActivityShareCtrl.prototype.queryShare = function() {
      return this.ActivityShareInfoService.findShares().then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data + " activities");
          return _this.$scope.shareDatas = data;
        };
      })(this), (function(_this) {
        return function(error) {
          return _this.$log.error("Unable to get activities: " + error);
        };
      })(this));
    };

    return ActivityShareCtrl;

  })();

  angular.module('sbAdminApp').controller('ActivityShareCtrl', ActivityShareCtrl);

}).call(this);

