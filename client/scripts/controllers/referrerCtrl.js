/**
 * Created by Yuan on 2015/3/25.
 */
(function () {
    var ReferrerCtrl;

    ReferrerCtrl = (function () {
        function ReferrerCtrl($scope, $rootScope, $log, $location, ReferrerService) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$log = $log;
            this.$location = $location;
            this.ReferrerService = ReferrerService;
            this.$log.debug("constructing ReferrerCtrl");
            this.referrers = [];
            this.referrer = this.$rootScope.referrer || {};
            this.$rootScope.referrer = {};
            this.pager = {};
            this.exportPager = {};
            this.exportUrl = baseUrl + "/referrer/excel";
            $scope.referrerOptions = {
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
                        field: "mobile",
                        displayName: "推荐人手机号"
                    },
                    {
                        field: "name",
                        displayName: "推荐人"
                    },
                    {
                        field: "referrerTotality",
                        displayName: "推荐注册人数"
                    },
                    {
                        field: "purchaserCount",
                        displayName: "推荐成功购买人数"
                    },
                    {
                        field: "unPurchaserCount",
                        displayName: "注册未购买人数"
                    },
                    {
                        field: "recommendedPurchaseAmount",
                        displayName: "推荐购买总金额"
                    },
                    {
                        field: null,
                        displayName: "操作",
                        cellTemplate: "views/referrer/operation.html"
                    }
                ]
            };
            $scope.referrerDetailOptions = {
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
                        field: "mobile",
                        displayName: "注册手机号"
                    },
                    {
                        field: "realName",
                        displayName: "注册姓名"
                    },
                    {
                        field: "registrationDate",
                        displayName: "注册时间",
                        cellFilter: 'date:"yyyy-MM-dd HH:mm"'
                    },
                    {
                        field: "purchaseAmount",
                        displayName: "购买总金额"
                    }
                ]
            };
        }

        ReferrerCtrl.prototype.findReferrers = function () {
            this.$log.debug("findReferrers()");
            this.pager.pageSize = this.$scope.referrerOptions.pagingOptions.pageSize;
            this.pager.pageNum = this.$scope.referrerOptions.pagingOptions.currentPage;
            this.ReferrerService.findReferrers(this.pager).then((function (_this) {
                return function (data) {
                    _this.$log.debug("Promise returned " + data.value.list.length + " Referrers");
                    return _this.$scope.pager = data.value;
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to get Referrers: " + error);
                    return _this.error = error;
                };
            })(this));
            return this.exportPager = this.pager;
        };

        ReferrerCtrl.prototype.findReferrerDetails = function () {
            this.$log.debug("findReferrerDetails()");
            this.pager.pageSize = this.$scope.referrerDetailOptions.pagingOptions.pageSize;
            this.pager.pageNum = this.$scope.referrerDetailOptions.pagingOptions.currentPage;
            return this.ReferrerService.findReferrerDetails(this.pager).then((function (_this) {
                return function (data) {
                    _this.$log.debug("Promise returned " + data.value.list.length + " Referrer Details");
                    return _this.$scope.pager = data.value;
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to get Referrer Details: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        ReferrerCtrl.prototype.toDetail = function (referrer) {
            this.$log.debug("toDetail()");
            this.$rootScope.referrer = referrer;
            return this.$location.path("/dashboard/referrer/detail");
        };

        return ReferrerCtrl;

    })();

    angular.module('sbAdminApp').controller('ReferrerCtrl', ReferrerCtrl);

}).call(this);

