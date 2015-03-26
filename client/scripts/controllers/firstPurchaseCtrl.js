/**
 * Created by Yuan on 2015/3/26.
 */
(function () {
    var FirstPurchaseCtrl;

    FirstPurchaseCtrl = (function () {
        function FirstPurchaseCtrl($scope, $log, PurchaseStatisticsService) {
            this.$scope = $scope;
            this.$log = $log;
            this.PurchaseStatisticsService = PurchaseStatisticsService;
            this.$log.debug("constructing FirstPurchaseCtrl");
            this.pager = {};
            this.exportPager = {};
            this.exportUrl = baseUrl + "/statistics/purchase/excel";
            $scope.firstPurchaseOptions = {
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
                        field: "registrationDate",
                        displayName: "注册日期",
                        cellFilter: 'date:"yyyy-MM-dd HH:mm"'
                    },
                    {
                        field: "mobile",
                        displayName: "注册手机号"
                    },
                    {
                        field: "name",
                        displayName: "用户名"
                    },
                    {
                        field: "tradeAmount",
                        displayName: "首次购买金额"
                    },
                    {
                        field: "bankName",
                        displayName: "银行卡信息"
                    },
                    {
                        field: "referrerMobile",
                        displayName: "推荐人手机号"
                    },
                    {
                        field: "referrerName",
                        displayName: "推荐人"
                    }
                ]
            };

        }

        FirstPurchaseCtrl.prototype.findFirstPurchases = function () {
            this.$log.debug("findFirstPurchases()");
            this.pager.pageSize = this.$scope.firstPurchaseOptions.pagingOptions.pageSize;
            this.pager.pageNum = this.$scope.firstPurchaseOptions.pagingOptions.currentPage;
            this.PurchaseStatisticsService.findFirstPurchases(this.pager).then((function (_this) {
                return function (data) {
                    _this.$log.debug("Promise returned " + data.value.list.length + " FirstPurchases");
                    return _this.$scope.pager = data.value;
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to get FirstPurchases: " + error);
                    return _this.error = error;
                };
            })(this));
            return this.exportPager = this.pager;
        };

        return FirstPurchaseCtrl;

    })();

    angular.module('sbAdminApp').controller('FirstPurchaseCtrl', FirstPurchaseCtrl);

}).call(this);

