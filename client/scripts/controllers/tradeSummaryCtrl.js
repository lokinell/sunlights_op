/**
 * Created by Yuan on 2015/3/26.
 */
(function () {
    var TradeSummaryCtrl;

    TradeSummaryCtrl = (function () {
        function TradeSummaryCtrl($scope, $log, PurchaseStatisticsService) {
            this.$scope = $scope;
            this.$log = $log;
            this.PurchaseStatisticsService = PurchaseStatisticsService;
            this.$log.debug("constructing TradeSummaryCtrl");
            this.pager = {};
            this.exportPager = {};
            this.exportUrl = baseUrl + "/statistics/summary/excel";
            $scope.tradeSummaryOptions = {
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
                        field: "tradeDate",
                        displayName: "注册日期",
                        cellFilter: 'date:"yyyy-MM-dd HH:mm"'
                    },
                    {
                        field: "totalInCustomerCount",
                        displayName: "累计转入人数"
                    },
                    {
                        field: "inAmountTotal",
                        displayName: "累计转入金额"
                    },
                    {
                        field: "totalOutCustomerCount",
                        displayName: "累计转出人数"
                    },
                    {
                        field: "outAmountTotal",
                        displayName: "累计转出金额"
                    },
                    {
                        field: "inCustomerCount",
                        displayName: "日新增人数"
                    },
                    {
                        field: "dayInAmount",
                        displayName: "日转入金额"
                    },
                    {
                        field: "dayOutAmount",
                        displayName: "日增转出金额"
                    },
                    {
                        field: "registrationTotal",
                        displayName: "注册人数"
                    }
                ]
            };

        }

        TradeSummaryCtrl.prototype.findTradeSummaries = function () {
            this.$log.debug("findTradeSummaries()");
            this.pager.pageSize = this.$scope.tradeSummaryOptions.pagingOptions.pageSize;
            this.pager.pageNum = this.$scope.tradeSummaryOptions.pagingOptions.currentPage;
            this.PurchaseStatisticsService.findTradeSummaries(this.pager).then((function (_this) {
                return function (data) {
                    _this.$log.debug("Promise returned " + data.value.list.length + " TradeSummaries");
                    return _this.$scope.pager = data.value;
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to get TradeSummaries: " + error);
                    return _this.error = error;
                };
            })(this));
            return this.exportPager = this.pager;
        };

        return TradeSummaryCtrl;

    })();

    angular.module('sbAdminApp').controller('TradeSummaryCtrl', TradeSummaryCtrl);

}).call(this);

