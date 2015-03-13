(function () {
    var FundCtrl;

    FundCtrl = (function () {
        function FundCtrl($scope, $rootScope, $log, $location, ProductService, CommonService, CompanyService, SupplierService) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$log = $log;
            this.$location = $location;
            this.ProductService = ProductService;
            this.CommonService = CommonService;
            this.CompanyService = CompanyService;
            this.SupplierService = SupplierService;
            this.$log.debug("constructing FundCtrl");
            this.funds = [];
            this.pager = {};
            this.fund = this.$rootScope.fund || {};
            this.$rootScope.fund = {};
            this.fundTypes = [];
            this.investPeriods = [];
            this.toAccountTypes = [];
            this.riskGrades = [];
            this.productStatuses = [];
            this.fundCompanies = [];
            this.suppliers = [];
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
                        field: 'fundcode',
                        displayName: '基金编码'
                    },
                    {
                        field: 'fundname',
                        displayName: '基金名称'
                    },
                    {
                        field: 'fundTypeFormat',
                        displayName: '基金类型'
                    },
                    {
                        field: 'companyName',
                        displayName: '基金公司'
                    },
                    {
                        field: 'incomePerTenThousand',
                        displayName: '万分收益(元)'
                    },
                    {
                        field: 'percentSevenDaysFormat',
                        displayName: '七日年化'
                    },
                    {
                        field: "createTime",
                        displayName: '创建时间',
                        cellFilter: 'date:"yyyy-MM-dd"'
                    },
                    {
                        field: null,
                        displayName: '操作',
                        cellTemplate: 'views/fund/operation.html'
                    }
                ]
            };
        }

        FundCtrl.prototype.initSearch = function () {
            this.$log.debug("initSearch()");
            return this.findFundTypes();
        };

        FundCtrl.prototype.initSave = function () {
            this.$log.debug("initSave()");
            this.findDicts();
            this.findFundCompanies();
            return this.findSuppliers();
        };

        FundCtrl.prototype.findFundCompanies = function () {
            this.$log.debug("findFundCompanies()");
            return this.CompanyService.findCompanies({}).then((function (_this) {
                return function (data) {
                    _this.$log.debug("Promise returned " + data.value.list.length + " companies");
                    return _this.fundCompanies = data.value.list;
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to get companies: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        FundCtrl.prototype.findSuppliers = function () {
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

        FundCtrl.prototype.findFundTypes = function () {
            this.$log.debug("findFundTypes()");
            return this.CommonService.findDictsByCat("FP.PRODUCT.TYPE.1").then((function (_this) {
                return function (data) {
                    _this.$log.debug("Promise returned " + data.length + " fundTypes");
                    return _this.fundTypes = data;
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to get fundTypes: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        FundCtrl.prototype.findDicts = function () {
            this.$log.debug("findDicts()");
            this.findFundTypes();
            this.CommonService.findDictsByCat("FP.INVESTMENT.TYPE").then((function (_this) {
                return function (data) {
                    _this.$log.debug("Promise returned " + data.length + " investmentTypes");
                    return _this.investPeriods = data;
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to get investmentTypes: " + error);
                    return _this.error = error;
                };
            })(this));
            this.CommonService.findDictsByCat("FP.TOACCOUNT.TYPE").then((function (_this) {
                return function (data) {
                    _this.$log.debug("Promise returned " + data.length + " toAccountTypes");
                    return _this.toAccountTypes = data;
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to get toAccountTypes: " + error);
                    return _this.error = error;
                };
            })(this));
            this.CommonService.findDictsByCat("FP.RISK.GRADE").then((function (_this) {
                return function (data) {
                    _this.$log.debug("Promise returned " + data.length + " riskGrades");
                    return _this.riskGrades = data;
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to get riskGrades: " + error);
                    return _this.error = error;
                };
            })(this));
            return this.CommonService.findDictsByCat("FP.PRODUCT.FUND.STATUS").then((function (_this) {
                return function (data) {
                    _this.$log.debug("Promise returned " + data.length + " fundStatuses");
                    return _this.productStatuses = data;
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to get fundStatuses: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        FundCtrl.prototype.findFunds = function () {
            this.$log.debug("findFunds()");
            this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
            this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
            return this.ProductService.findFunds(this.pager).then((function (_this) {
                return function (data) {
                    _this.$log.debug("Promise returned " + data.value.list.length + " Funds");
                    return _this.$scope.pager = data.value;
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to get Funds: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        FundCtrl.prototype.saveFund = function () {
            this.$log.debug("saveFund()");
            return this.ProductService.saveFund(this.fund).then((function (_this) {
                return function (data) {
                    _this.$log.debug("successfully save Funds");
                    return _this.$location.path("/dashboard/fund");
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to get Funds: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        FundCtrl.prototype.createFund = function () {
            this.$log.debug("createFund()");
            return this.$location.path("/dashboard/fund/save");
        };

        FundCtrl.prototype.updateFund = function (fund) {
            this.$log.debug("updateFund()");
            this.$rootScope.fund = fund;
            return this.$location.path("/dashboard/fund/save");
        };

        FundCtrl.prototype.deleteFund = function (row) {
            this.$log.debug("deleteFund()");
            return this.ProductService.deleteFund(row.entity).then((function (_this) {
                return function (data) {
                    _this.$log.debug("successfully delete Fund");
                    return _this.findFunds();
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to delete Fund: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        return FundCtrl;

    })();

    angular.module('sbAdminApp').controller('FundCtrl', FundCtrl);

}).call(this);

