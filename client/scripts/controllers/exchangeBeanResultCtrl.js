(function() {
  var ExchangeBeanResultCtrl;

  ExchangeBeanResultCtrl = (function() {
    function ExchangeBeanResultCtrl($rootScope, $scope, $modal, $log, $location, FileUploader, ExchangeBeanResultService) {
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.$modal = $modal;
      this.$log = $log;
      this.$location = $location;
      this.FileUploader = FileUploader;
      this.ExchangeBeanResultService = ExchangeBeanResultService;
      this.$log.debug("constructing ExchangeBeanResultCtrl");
      this.exportUrl = baseUrl + "/exchangebean/export";
      this.pager = {
        filter: {
          LIKES_registerMobile: '',
          EQI_status: '',
          GED_beginTime: '',
          LTD_endTime: ''
        }
      };
      this.$scope.isNotSucc = (function(_this) {
        return function(row) {
          return row.getProperty("status") !== '4';
        };
      })(this);
      this.$scope.update2SuccStatus = (function(_this) {
        return function(row) {
          return _this.update2SuccStatus(row);
        };
      })(this);
      this.constant = {
        status: [
          {
            key: '',
            value: '请选择'
          }, {
            key: '1',
            value: '等待兑换'
          }, {
            key: '3',
            value: '兑换中'
          }, {
            key: '4',
            value: '兑换成功'
          }, {
            key: '5',
            value: '兑换失败'
          }
        ]
      };
      this.$rootScope.uploaderExcel = new FileUploader({
        url: baseUrl + '/exchangebean/upload',
        alias: 'excel'
      });
      this.$scope.open = (function(_this) {
        return function(isEditing) {
          var modalInstance;
          modalInstance = _this.$modal.open({
            templateUrl: "exchangeBeanResultModalContent.html",
            controller: "ExcelModalInstanceCtrl"
          });
          return modalInstance.result.then((function(data) {}), function() {
            return _this.$log.info("Modal dismissed at: " + new Date());
          });
        };
      })(this);
    }

    ExchangeBeanResultCtrl.prototype.setupScope = function() {
      this.$scope.myData = [];
      return this.$scope.gridOptions = {
        columnDefs: [
          {
            field: 'exchangeTime',
            displayName: '兑换时间'
          }, {
            field: 'registerMobile',
            displayName: '注册手机号'
          }, {
            field: 'exchangeMobile',
            displayName: '兑换电话'
          }, {
            field: 'exchangeAmount',
            displayName: '兑换金额（元）'
          }, {
            field: 'hasExchangeAmount',
            displayName: '已兑换金额（元）'
          }, {
            field: 'exchangeBean',
            displayName: '兑换金豆'
          }, {
            field: 'carrierName',
            displayName: '运营商'
          }, {
            field: 'statusDesc',
            displayName: '状态'
          }
        ],
        multiSelect: false,
        data: 'pager.list',
        useExternalSorting: true,
        i18n: "zh-cn",
        enableColumnResize: true,
        showColumnMenu: true,
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'pager.count',
        pagingOptions: {
          pageSizes: [5, 15, 25],
          pageSize: 10,
          currentPage: 1
        }
      };
    };

    ExchangeBeanResultCtrl.prototype.init = function() {
      this.setupScope();
    };

    ExchangeBeanResultCtrl.prototype.findExchangeBeanResults = function() {
      this.$log.debug("findExchangeBeanResults()");
      this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
      this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
      return this.ExchangeBeanResultService.findExchangeBeanResults(this.pager).then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.length + " Scenes");
          return _this.$scope.pager = data.value;
        };
      })(this), (function(_this) {
        return function(error) {
          return _this.$log.error("Unable to findExchangeBeanResults: " + error);
        };
      })(this));
    };

    return ExchangeBeanResultCtrl;

  })();

    angular.module('sbAdminApp').controller('ExchangeBeanResultCtrl', ExchangeBeanResultCtrl);

}).call(this);

