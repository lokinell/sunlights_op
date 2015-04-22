(function() {
  var activitySceneCtrl;

  activitySceneCtrl = (function() {
    function activitySceneCtrl($modal,$rootScope, $log, $http, $timeout, toaster, $location, ActivitySceneService, CommonService, $scope) {
      this.$rootScope = $rootScope;
      this.$log = $log;
      this.$http = $http;
      this.$timeout = $timeout;
      this.$location = $location;
      this.toaster = toaster;
      this.ActivitySceneService = ActivitySceneService;
      this.CommonService = CommonService;
      this.$scope = $scope;
      this.$modal = $modal;
      this.$log.debug("constructing ActivitySceneCtrl");
      this.scenes = [];
      this.scene = {};
      this.activityTypes = [];
      this.manage = {};
      this.manages = [];
      this.productTypes = [];
      this.pager = {};

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
              pageSizes: [5, 10, 15],
              pageSize: 10,
              currentPage: 1
          },
          columnDefs: [
              {
                  field: "scene",
                  displayName: "场景编码"
              }, {
                  field: "title",
                  displayName: "场景名称"
              }, {
                  field: "activityTypeDesc",
                  displayName: "活动类型"
              }, {
                  field: "status",
                  displayName: "状态",
                  cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.status== 'N' ? '正常' : '禁用'}}</span></div>"
              }, {
                  field: "createTime",
                  displayName: "创建时间",
                  cellFilter: "date:\"yyyy-MM-dd \""
              }, {
                  field: "locked",
                  displayName: "操作",
                  cellTemplate: "views/cell/scenesCell.html"
              }
          ]
      };

      this.$scope.open = (function(_this) {
          return function(isEditing) {
              var modalInstance;
              modalInstance = _this.$modal.open({
                  templateUrl: "activityScenesModalContent.html",
                  controller: "activityScenesModalInstanceCtrl",
                  resolve: {
                      selectedRow: function() {
                          if (isEditing) {
                              return _this.scene;
                          } else {
                              return {};
                          }
                      },
                      activityTypes: function() {
                          return _this.activityTypes;
                      },
                      productTypes: function() {
                          return _this.productTypes;
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
    }

    activitySceneCtrl.prototype.initSave = function() {
      this.$log.debug("initSave()");
      this.findActivityTypes();
    };

    activitySceneCtrl.prototype.findActivityTypes = function() {
      this.$log.debug("findActivityTypes()");
      return this.ActivitySceneService.findActivityTypes().then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.length + " Scenes");
          return _this.activityTypes = data;
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get Scenes: " + error);
          return _this.error = error;
        };
      })(this));
    };

    activitySceneCtrl.prototype.findScenes = function() {
      this.$log.debug("findScenes()");
      this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
      this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
      return this.ActivitySceneService.findScenes(this.pager).then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.value + " Scenes");
          return _this.$scope.pager = data.value;
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get Scenes: " + error);
          return _this.error = error;
        };
      })(this));
    };


    activitySceneCtrl.prototype.updateScene = function(scene) {
      this.scene = scene;
      return this.$scope.open(true);
    };

    activitySceneCtrl.prototype.deleteScene = function(scene) {
      this.$log.debug("deleteScene()");
      return this.ActivitySceneService.deleteScene(scene).then((function(_this) {
        return function(data) {
          _this.$log.debug("successfully delete scene");
          _this.toaster.pop('success', "删除成功", "删除成功");
          return _this.findScenes();
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to delete scene: " + error);
          _this.toaster.pop('success', "删除失败", "删除失败");
          return _this.error = error;
        };
      })(this));
    };

    return activitySceneCtrl;

  })();

  angular.module('sbAdminApp').controller('activitySceneCtrl', activitySceneCtrl);

  angular.module('sbAdminApp').controller("activityScenesModalInstanceCtrl", function($modal, $scope, $log, $location, $modalInstance, selectedRow, ActivitySceneService,activityTypes) {
      $log.debug("constructing activityScenesModalInstanceCtrl");
      $scope.row = angular.fromJson(selectedRow);
      $scope.activityTypes = activityTypes
      $scope.ok = function() {
          if($scope.row.id) {
              ActivitySceneService.updateScene($scope.row)
          } else {
              ActivitySceneService.saveScene($scope.row)
          }

          $modalInstance.close($scope.row);
          return window.parent.location.reload();
      };
      $scope.cancel = function() {
          return $modalInstance.dismiss("cancel");
      };
  });

}).call(this);

