(function() {
  var SupplierCtrl;

  SupplierCtrl = (function() {
    function SupplierCtrl($scope, $rootScope, $log, $location, SupplierService) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$log = $log;
      this.$location = $location;
      this.SupplierService = SupplierService;
      this.$log.debug("constructing SupplierCtrl");
      this.suppliers = [];
      this.supplier = this.$rootScope.supplier || {};
      this.$rootScope.supplier = {};
      this.pager = {};
      $scope.gridOptions = {
        data: 'pager.list',
        enablePaging: true,
        showFooter: true,
        multiSelect: false,
        i18n: "zh-cn",
        totalServerItems: 'pager.count',
        pagingOptions: {
          pageSizes: [5, 10, 15],
          pageSize: 10,
          currentPage: 1
        },
        columnDefs: [
          {
            field: 'supplierCode',
            displayName: '供应商编号'
          }, {
            field: 'merchantName',
            displayName: '商家名称'
          }, {
            field: 'displayName',
            displayName: '商家简称'
          }, {
            field: 'belongAddress',
            displayName: '商家归属详细地址'
          }, {
            field: 'contactCallno',
            displayName: '联系电话'
          }, {
            field: 'corporateProperty',
            displayName: '企业性质'
          }, {
            field: 'regAddress',
            displayName: '注册详细地址'
          }, {
            field: "createTime",
            displayName: '创建时间'
          }, {
            field: null,
            displayName: '操作',
            cellTemplate: 'views/supplier/operation.html'
          }
        ]
      };
    }

    SupplierCtrl.prototype.findSuppliers = function() {
      this.$log.debug("findSuppliers()");
      this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
      this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
      return this.SupplierService.findSuppliers(this.pager).then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.value.list.length + " Suppliers");
          return _this.$scope.pager = data.value;
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get Suppliers: " + error);
          return _this.error = error;
        };
      })(this));
    };

    SupplierCtrl.prototype.saveSupplier = function() {
      this.$log.debug("saveSupplier()");
      return this.SupplierService.saveSupplier(this.supplier).then((function(_this) {
        return function(data) {
          _this.$log.debug("save supplier successfully");
          return _this.$location.path("/dashboard/supplier");
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to save supplier: " + error);
          return _this.error = error;
        };
      })(this));
    };

    SupplierCtrl.prototype.createSupplier = function() {
      this.$log.debug("createSupplier()");
      return this.$location.path("/dashboard/supplier/save");
    };

    SupplierCtrl.prototype.updateSupplier = function(row) {
      this.$log.debug("updateSupplier()");
      this.supplier = row.entity;
      this.$rootScope.supplier = this.supplier;
      return this.$location.path("/dashboard/supplier/save");
    };

    SupplierCtrl.prototype.deleteSupplier = function(row) {
      this.$log.debug("deleteSupplier()");
      return this.SupplierService.deleteSupplier(row.entity).then((function(_this) {
        return function(data) {
          _this.$log.debug("successfully delete supplier");
          return _this.findSuppliers();
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to delete supplier: " + error);
          return _this.error = error;
        };
      })(this));
    };

    return SupplierCtrl;

  })();

    angular.module('sbAdminApp').controller('SupplierCtrl', SupplierCtrl);

}).call(this);

