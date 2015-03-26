(function () {
    var ExchangeResultCtrl;

    ExchangeResultCtrl = (function () {
        function ExchangeResultCtrl($rootScope, $scope, $modal, $log, $location, FileUploader, ExchangeResultService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$modal = $modal;
            this.$log = $log;
            this.$location = $location;
            this.FileUploader = FileUploader;
            this.ExchangeResultService = ExchangeResultService;
            this.$log.debug("constructing ExchangeResultCtrl");
            this.pager = {};
            this.exportPager = {};
            this.exportUrl = baseUrl + "/exchangeresult/red/excel";

            this.constant = {
                status: [
                    {
                        key: '',
                        value: '请选择'
                    },
                    {
                        key: '0',
                        value: '未审核'
                    },
                    {
                        key: '1',
                        value: '审核通过'
                    },
                    {
                        key: '2',
                        value: '审核不通过'
                    },
                    {
                        key: '3',
                        value: '等待兑换'
                    },
                    {
                        key: '4',
                        value: '兑换成功'
                    },
                    {
                        key: '5',
                        value: '兑换失败'
                    }
                ],
                rewardTypes: []
            };
            this.$rootScope.uploaderExcel = new FileUploader({
                method: 'POST',
                url: baseUrl + '/exchangeresult/red/excel',
                alias: 'excel'
            });
            this.$rootScope.uploaderExcel.onSuccessItem = function (fileItem, response, status, headers) {
                console.info("onSuccessItem", fileItem, response, status, headers);
                return $scope.info = response;
            };
            this.$scope.open = (function (_this) {
                return function () {
                    var modalInstance;
                    modalInstance = _this.$modal.open({
                        templateUrl: "exchangeResultModalContent.html",
                        controller: "ExcelModalInstanceCtrl"
                    });
                    return modalInstance.result.then((function (data) {
                    }), function () {
                        return _this.$log.info("Modal dismissed at: " + new Date());
                    });
                };
            })(this);
            $scope.gridOptions = {
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
                        field: 'realName',
                        displayName: '姓名'
                    },
                    {
                        field: 'registerMobile',
                        displayName: '注册手机号'
                    },
                    {
                        field: 'exchangeSceneStr',
                        displayName: '兑换场景'
                    },
                    {
                        field: 'statusStr',
                        displayName: '状态'
                    },
                    {
                        field: 'bankName',
                        displayName: '银行名称'
                    },
                    {
                        field: 'bankCardNo',
                        displayName: '银行卡号'
                    },
                    {
                        field: 'amount',
                        displayName: '待发金额（元）'
                    },
                    {
                        field: 'exchangedAmount',
                        displayName: '已发金额（元）'
                    },
                    {
                        field: 'balance',
                        displayName: '差额（元）'
                    },
                    {
                        field: 'paymentReceiptNo',
                        displayName: '支付回单号'
                    },
                    {
                        field: 'createTimeStr',
                        displayName: '创建时间'
                    }
                ]
            };
        }

        ExchangeResultCtrl.prototype.findRedPackets = function () {
            this.$log.debug("findRedPackets()");
            this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
            this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
            this.ExchangeResultService.findRedPackets(this.pager).then((function (_this) {
                return function (data) {
                    _this.$log.debug("Promise returned " + data.value.list.length + " Red Packets");
                    return _this.$scope.pager = data.value;
                };
            })(this), (function (_this) {
                return function (error) {
                    return _this.$log.error("Unable to get Scenes: " + error);
                };
            })(this));
            return this.exportPager = this.pager;
        };


        return ExchangeResultCtrl;

    })();

    angular.module('sbAdminApp').controller('ExchangeResultCtrl', ExchangeResultCtrl);

}).call(this);

