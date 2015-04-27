(function () {
  var ProductManageCtrl;

  ProductManageCtrl = (function () {
    function ProductManageCtrl($scope, $rootScope, $log, $location, ProductService, CommonService, SupplierService, TaskService, toaster, ngDialog) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$log = $log;
      this.$location = $location;
      this.ProductService = ProductService;
      this.CommonService = CommonService;
      this.SupplierService = SupplierService;
      this.TaskService = TaskService;
      this.toaster = toaster;
      this.ngDialog = ngDialog;
      this.$log.debug("constructing ProductManageCtrl");
      this.manages = [];
      this.funds = [];
      this.codes = [];
      this.pager = {};
      this.manage = this.$scope.manage || {};
      this.productTypes = [];
      this.recommendTypes = [];
      this.recommendFlags = [];
      this.productStatuses = [];
      this.suppliers = [];
      this.$rootScope.canSubmit = true;
      this.dialog = {};
      this.status = [
        {
          key: 'Y',
          value: '是'
        },
        {
          key: 'N',
          value: '否'
        }
      ];
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
            field: 'productName',
            displayName: '产品名称'
          },
          {
            field: 'productTypeValue',
            displayName: '产品类型'
          },
          {
            field: 'productCode',
            displayName: '产品编码'
          },
          {
            field: 'upBeginTime',
            displayName: '上架时间',
            cellFilter: 'date:"yyyy-MM-dd"'
          },
          {
            field: 'downEndTime',
            displayName: '下架时间',
            cellFilter: 'date:"yyyy-MM-dd"'
          },
          {
            field: "createTime",
            displayName: '创建时间',
            cellFilter: 'date:"yyyy-MM-dd"'
          },
          {
            field: "productDesc",
            displayName: '产品说明'
          },
          {
            field: 'productStatusValue',
            displayName: '产品状态'
          },
          {
            field: 'isGrabDesc',
            displayName: '同步'
          },
          {
            field: null,
            displayName: '同步状态',
            cellTemplate: '<div class="{{ row.entity.grabStatus }}">{{ row.entity.grabStatusDesc }}</div>'
          },
          {
            field: null,
            displayName: '操作',
            cellTemplate: 'views/product/operation.html'
          }
        ]
      };
    }

    ProductManageCtrl.prototype.init = function () {
      return this.findCodes();
    };

    ProductManageCtrl.prototype.initSave = function () {
      this.findDicts();
      return this.findSuppliers();
    };

    ProductManageCtrl.prototype.findDicts = function () {
      this.$log.debug("findDicts()");
      this.CommonService.findDictsByCat("FP.PRODUCT.TYPE").then((function (_this) {
        return function (data) {
          _this.$log.debug("Promise returned " + data.length + " ProductTypes");
          return _this.productTypes = data;
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to get ProductTypes: " + error);
          return _this.error = error;
        };
      })(this));
      this.CommonService.findDictsByCat("FP.RECOMMEND.TYPE").then((function (_this) {
        return function (data) {
          _this.$log.debug("Promise returned " + data.length + " recommend types");
          return _this.recommendTypes = data;
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to get ProductTypes: " + error);
          return _this.error = error;
        };
      })(this));
      this.CommonService.findDictsByCat("FP.RECOMMEND.FLAG").then((function (_this) {
        return function (data) {
          _this.$log.debug("Promise returned " + data.length + " recommend flags");
          return _this.recommendFlags = data;
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to get ProductTypes: " + error);
          return _this.error = error;
        };
      })(this));
      return this.CommonService.findDictsByCat("FP.PRODUCT.MANAGE.STATUS").then((function (_this) {
        return function (data) {
          _this.$log.debug("Promise returned " + data.length + " Product status");
          return _this.productStatuses = data;
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to get Product status: " + error);
          return _this.error = error;
        };
      })(this));
    };

    ProductManageCtrl.prototype.findProductManages = function () {
      this.$log.debug("findProductManages()");
      this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
      this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
      return this.ProductService.findProductManages(this.pager).then((function (_this) {
        return function (data) {
          _this.$log.debug("Promise returned " + data.value.list.length + " ProductManages");
          return _this.$scope.pager = data.value;
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to get ProductManages: " + error);
          return _this.error = error;
        };
      })(this));
    };

    ProductManageCtrl.prototype.findCodes = function () {
      this.$log.debug("findCodes()");
      return this.ProductService.findCodes(this.pager).then((function (_this) {
        return function (data) {
          _this.$log.debug("Promise returned " + data.value.length + " Codes");
          return _this.codes = data.value;
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to get ProductManages: " + error);
          return _this.error = error;
        };
      })(this));
    };

    ProductManageCtrl.prototype.findFunds = function () {
      this.$log.debug("findFunds()");
      return this.ProductService.findFunds({}).then((function (_this) {
        return function (data) {
          _this.$log.debug("Promise returned " + data.value.list.length + " Funds");
          return _this.funds = data.value.list;
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to get Funds: " + error);
          return _this.error = error;
        };
      })(this));
    };

    ProductManageCtrl.prototype.findSuppliers = function () {
      this.$log.debug("findSuppliers()");
      return this.SupplierService.findSuppliers({}).then((function (_this) {
        return function (data) {
          _this.$log.debug("Promise returned " + data.value.list.length + " Suppliers");
          return _this.suppliers = data.value.list;
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to get companies: " + error);
          return _this.error = error;
        };
      })(this));
    };

    ProductManageCtrl.prototype.saveProductManage = function () {
      if (this.$rootScope.canSubmit) {
        this.$rootScope.canSubmit = false;
        this.$log.debug("findProductManages()");
        this.manage = angular.copy(this.$scope.manage);
        return this.ProductService.saveProductManage(this.manage).then((function (_this) {
          return function (data) {
            _this.findProductManages();
            _this.dialog.close();
            _this.toaster.pop('success', data.message.summary, data.message.detail);
            _this.$rootScope.canSubmit = true;
            return _this.$log.debug("successfully save ProductManages");
          };
        })(this), (function (_this) {
          return function (error) {
            _this.$scope.error = error;
            return _this.$log.error("Unable to get ProductManages: " + error);
            ;
          };
        })(this));
      }

    };

    ProductManageCtrl.prototype.createProductManage = function () {
      this.$log.debug("createProductManage()");
      this.$scope.error = null;
      this.$scope.manage = null;
      if (this.code && this.code.code) {
        if (this.code.onSale === 1) {
          this.$scope.manage = {productCode: this.code.code, productName: this.code.value, isGrab: 'Y'}
          return this.dialog = this.ngDialog.open({
            template: 'productSaveDialog',
            className: 'ngdialog-theme-plain product-width',
            scope: this.$scope,
            preCloseCallback: (function (_this) {
              return function (value) {
                _this.$log.debug("preCloseCallback()");
                if ('confirm' === value) {
                  _this.saveProductManage();
                  return false;
                } else {
                  return true;
                }
              };
            })(this)
          });
        } else {
          return this.error = {
            message: {
              detail: '该产品不是数米代销'
            }
          };
        }
      } else {
        return this.error = {
          message: {
            detail: '产品编码不能为空'
          }
        };
      }
    };

    ProductManageCtrl.prototype.updateProductManage = function (manage) {
      this.$scope.error = null;
      this.$scope.manage = angular.copy(manage);
      this.dialog = this.ngDialog.open({
        template: 'productSaveDialog',
        className: 'ngdialog-theme-plain product-width',
        scope: this.$scope,
        preCloseCallback: (function (_this) {
          return function (value) {
            _this.$log.debug("preCloseCallback()");
            if ('confirm' === value) {
              _this.saveProductManage();
              return false;
            } else {
              return true;
            }
          };
        })(this)
      });
      return this.$log.debug("updateProductManage()");
    };

    ProductManageCtrl.prototype.deleteProductManage = function (manage) {
      this.$log.debug("deleteProductManage()");
      return this.ProductService.deleteProductManage(manage).then((function (_this) {
        return function (data) {
          _this.$log.debug("successfully delete ProductManage");
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.findProductManages();
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to delete ProductManage: " + error);
          _this.toaster.pop('error', error.message.summary, error.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    ProductManageCtrl.prototype.grabProfitHistoryByCode = function (manage) {
      this.$log.debug("grabProfitHistoryByCode()");
      return this.ProductService.grabProfitHistoryByCode(manage).then((function (_this) {
        return function (data) {
          _this.$log.debug("grab Profit History By Code");
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.findProductManages();
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("grab Profit History By Code: " + error);
          _this.toaster.pop('error', error.message.summary, error.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    ProductManageCtrl.prototype.grabAllProfitHistory = function () {
      this.$log.debug("grabAllProfitHistory()");
      return this.ProductService.grabAllProfitHistory().then((function (_this) {
        return function (data) {
          _this.$log.debug("grabAllProfitHistory");
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.findProductManages();
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("grabAllProfitHistory: " + error);
          _this.toaster.pop('error', error.message.summary, error.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    ProductManageCtrl.prototype.handleRecommendType = function () {
      this.$log.debug("handleRecommendType()");
      if (this.manage.recommendType === 'FP.RECOMMEND.TYPE.1') {
        return this.manage.recommendFlag = 'FP.RECOMMEND.FLAG.1';
      }
    };

    ProductManageCtrl.prototype.grabFund = function () {
      this.$log.debug("grabFund()");
      return this.TaskService.grabFund().then((function (_this) {
        return function (data) {
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.$log.debug("Successfully grab Fund");
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to grab Fund: " + error);
          _this.toaster.pop('error', error.message.summary, error.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    ProductManageCtrl.prototype.grabFundCode = function () {
      this.$log.debug("grabFundCode()");
      return this.TaskService.grabFundCode().then((function (_this) {
        return function (data) {
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.$log.debug("Successfully grab Fund code");
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to grab Fund code: " + error);
          _this.toaster.pop('error', error.message.summary, error.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    ProductManageCtrl.prototype.refreshProduct = function () {
      this.$log.debug("refreshProduct()");
      return this.ProductService.refreshProduct().then((function (_this) {
        return function (data) {
          _this.$log.debug("successfully refresh Product cache");
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.findProductManages();
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to refresh Product cache: " + error);
          _this.toaster.pop('error', error.message.summary, error.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    return ProductManageCtrl;

  })();

  angular.module('sbAdminApp').controller('ProductManageCtrl', ProductManageCtrl);

}).call(this);

