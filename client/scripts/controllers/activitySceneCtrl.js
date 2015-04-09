(function() {
  var activitySceneCtrl;

  activitySceneCtrl = (function() {
    function activitySceneCtrl($rootScope, $log, $http, $timeout, $location, ActivitySceneService, ProductService, CommonService, $scope) {
      this.$rootScope = $rootScope;
      this.$log = $log;
      this.$http = $http;
      this.$timeout = $timeout;
      this.$location = $location;
      this.ActivitySceneService = ActivitySceneService;
      this.ProductService = ProductService;
      this.CommonService = CommonService;
      this.$scope = $scope;
      this.$log.debug("constructing ActivitySceneCtrl");
      this.scenes = [];
      this.scene = this.$rootScope.scene || {};
      this.$rootScope.scene = {};
      this.activityTypes = [];
      this.manage = {};
      this.manages = [];
      this.productTypes = [];
      this.$scope.pageSizes = [5, 10, 20];

      this.pager = {
          filter: {

          }
      };
      this.$scope.columnDefs = [
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
          field: "prdCode",
          displayName: "产品编码"
        }, {
          field: "prdTypeDesc",
          displayName: "产品类型"
        }, {
          field: "createTime",
          displayName: "创建时间",
          cellFilter: "date:\"yyyy-MM-dd \""
        }, {
          field: "locked",
          displayName: "操作",
          cellTemplate: "views/cell/scenesCell.html"
        }
      ];
      this.$scope.pageUrl = baseUrl + "/activity/scene";
      new PageService(this.$scope, this.$http, this.$timeout);
    }

    activitySceneCtrl.prototype.initSave = function() {
      this.$log.debug("initSave()");
      this.findActivityTypes();
      this.findDicts();
      return this.handleProductChange();
    };

    activitySceneCtrl.prototype.findDicts = function() {
      this.$log.debug("findDicts()");
      return this.CommonService.findDictsByCat("FP.PRODUCT.TYPE").then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.length + " ProductTypes");
          return _this.productTypes = data;
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get ProductTypes: " + error);
          return _this.error = error;
        };
      })(this));
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
      return this.ActivitySceneService.findScenes(this.pager).then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.value + " Scenes");
          return _this.$scope.myData = data.value;
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get Scenes: " + error);
          return _this.error = error;
        };
      })(this));
    };

    activitySceneCtrl.prototype.saveScene = function() {
      this.$log.debug("saveScene()");
      return this.ActivitySceneService.saveScene(this.scene).then((function(_this) {
        return function(data) {
          _this.$log.debug("save scene successfully");
          return _this.$location.path("/dashboard/scene");
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to save scene: " + error);
          return _this.error = error;
        };
      })(this));
    };

    activitySceneCtrl.prototype.createScene = function() {
      this.$log.debug("createScene()");
      return this.$location.path("/dashboard/scene/save");
    };

    activitySceneCtrl.prototype.updateScene = function(scene) {
      this.$log.debug("updateScene()");
      this.$rootScope.scene = scene;
      return this.$location.path("/dashboard/scene/save");
    };

    activitySceneCtrl.prototype.deleteScene = function(scene) {
      this.$log.debug("deleteScene()");
      return this.ActivitySceneService.deleteScene(scene).then((function(_this) {
        return function(data) {
          _this.$log.debug("successfully delete scene");
          return _this.findScenes();
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to delete scene: " + error);
          return _this.error = error;
        };
      })(this));
    };

    activitySceneCtrl.prototype.handleProductChange = function() {
      this.$log.debug("handleSelectProduct()");
      if (this.scene.prdType) {
        return this.ProductService.findProductManages({
          filter: {
            EQS_product_type: this.scene.prdType
          }
        }).then((function(_this) {
          return function(data) {
            _this.$log.debug("Promise returned " + data.value.length + " ProductManages");
            return _this.manages = data.value;
          };
        })(this), (function(_this) {
          return function(error) {
            _this.$log.error("Unable to get ProductManages: " + error);
            return _this.error = error;
          };
        })(this));
      } else {
        return this.manages = [];
      }
    };

    return activitySceneCtrl;

  })();

  angular.module('sbAdminApp').controller('activitySceneCtrl', activitySceneCtrl);

}).call(this);

