(function () {
  var SupplierCtrl;

  SupplierCtrl = (function () {
    function SupplierCtrl($scope, $rootScope, $log, $location, toaster, ngDialog, SupplierService) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$log = $log;
      this.$location = $location;
      this.toaster = toaster;
      this.ngDialog = ngDialog;
      this.SupplierService = SupplierService;
      this.$log.debug("constructing SupplierCtrl");
      this.suppliers = [];
      this.supplier = this.$scope.supplier || {};
      this.pager = {};
      this.dialog = {};
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
            field: 'supplierCode',
            displayName: '编号'
          }, {
            field: 'merchantName',
            displayName: '商家名称'
          }, {
            field: 'displayName',
            displayName: '商家简称'
          }, {
            field: 'belongAddress',
            displayName: '归属地址'
          }, {
            field: 'contactCallno',
            displayName: '联系电话'
          }, {
            field: 'corporateProperty',
            displayName: '企业性质'
          }, {
            field: 'regAddress',
            displayName: '注册地址'
          }, {
            field: "createTime",
            displayName: '创建时间' ,
            cellFilter: 'date:"yyyy-MM-dd HH:mm"'
          }, {
            field: null,
            displayName: '操作',
            cellTemplate: 'views/supplier/operation.html'
          }
        ]
      };
    }

    SupplierCtrl.prototype.findSuppliers = function () {
      this.$log.debug("findSuppliers()");
      this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
      this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
      return this.SupplierService.findSuppliers(this.pager).then((function (_this) {
        return function (data) {
          _this.$log.debug("Promise returned " + data.value.list.length + " Suppliers");
          return _this.$scope.pager = data.value;
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to get Suppliers: " + error);
          return _this.error = error;
        };
      })(this));
    };

    SupplierCtrl.prototype.saveSupplier = function () {
      this.$log.debug("saveSupplier()");
      this.supplier = angular.copy(this.$scope.supplier);
      return this.SupplierService.saveSupplier(this.supplier).then((function (_this) {
        return function (data) {
          _this.findSuppliers();
          _this.dialog.close();
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.$log.debug("save supplier successfully");
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$scope.error = error;
          return _this.$log.error("Unable to save supplier: " + error);
        };
      })(this));
    };

    SupplierCtrl.prototype.createSupplier = function () {
      this.$scope.error = null;
      this.$scope.supplier = {};
      this.dialog = this.ngDialog.open({
        template: 'supplierSaveDialog',
        className: 'ngdialog-theme-plain custom-width',
        scope: this.$scope,
        preCloseCallback: (function (_this) {
          return function (value) {
            _this.$log.debug("preCloseCallback()");
            if ('confirm' === value) {
              _this.saveSupplier();
              return false;
            } else {
              return true;
            }
          };
        })(this)
      });
      return this.$log.debug("createSupplier()");
    };

    SupplierCtrl.prototype.updateSupplier = function (supplier) {
      this.$scope.error = null;
      this.$scope.supplier = angular.copy(supplier);
      this.dialog = this.ngDialog.open({
        template: 'supplierSaveDialog',
        className: 'ngdialog-theme-plain custom-width',
        scope: this.$scope,
        preCloseCallback: (function (_this) {
          return function (value) {
            _this.$log.debug("preCloseCallback()");
            if ('confirm' === value) {
              _this.saveSupplier();
              return false;
            } else {
              return true;
            }
          };
        })(this)
      });
      return this.$log.debug("updateSupplier()");
    };

    SupplierCtrl.prototype.deleteSupplier = function (supplier) {
      this.$log.debug("deleteSupplier()");
      return this.SupplierService.deleteSupplier(supplier).then((function (_this) {
        return function (data) {
          _this.$log.debug("successfully delete supplier");
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.findSuppliers();
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to delete supplier: " + error);
          _this.toaster.pop('error', error.message.summary, error.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    return SupplierCtrl;

  })();

  angular.module('sbAdminApp').controller('SupplierCtrl', SupplierCtrl);

}).call(this);

