(function() {
  var ResourceCtrl;

  ResourceCtrl = (function() {
    function ResourceCtrl($scope, $rootScope, $log, $location, ResourceService) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$log = $log;
      this.$location = $location;
      this.ResourceService = ResourceService;
      this.$log.debug("constructing ResourceCtrl");
      this.resources = [];
      this.resource = this.$rootScope.resource || {};
      this.$rootScope.resource = {};
      this.pager = {};
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
            field: 'name',
            displayName: '名称'
          }, {
            field: 'code',
            displayName: '代码'
          }, {
            field: 'seqNo',
            displayName: '序号'
          }, {
            field: 'parentId',
            displayName: '父资源'
          }, {
            field: 'type',
            displayName: '类型'
          }, {
            field: 'uri',
            displayName: '相对路径'
          }, {
            field: "createTime",
            displayName: '创建时间',
            cellFilter: 'date:"yyyy-MM-dd"'
          }, {
            field: "updateTime",
            displayName: '更新时间',
            cellFilter: 'date:"yyyy-MM-dd"'
          }, {
            field: "deleted",
            displayName: '是否有效',
            cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.deleted ? '否' : '是'}}</span></div>"
          }
        ]
      };
    }

    ResourceCtrl.prototype.findResources = function() {
      this.$log.debug("findResources()");
      this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
      this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
      return this.ResourceService.findResources(this.pager).then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.value.list.length + " Resources");
          return _this.$scope.pager = data.value;
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get Resources: " + error);
          return _this.error = error;
        };
      })(this));
    };

    return ResourceCtrl;

  })();

    angular.module('sbAdminApp').controller('ResourceCtrl', ResourceCtrl);

}).call(this);

