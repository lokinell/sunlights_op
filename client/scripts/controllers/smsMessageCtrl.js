(function() {
  var SmsMessageCtrl;

  SmsMessageCtrl = (function() {
    function SmsMessageCtrl($log, $scope, $modal, SmsMessageService) {
      this.$log = $log;
      this.$scope = $scope;
      this.$modal = $modal;
      this.SmsMessageService = SmsMessageService;
      this.$log.debug("constructing SmsMessageCtrl");
      this.allCount = 0;
      this.exportUrl = baseUrl + "/smsmessage/excel";
      this.pager = {
        filter: {
          EQS_sendStatus: '',
          GED_beginTime: '',
          LTD_endTime: ''
        }
      };
      this.$scope.isSendSuccess = (function(_this) {
        return function(row) {
          return _this.sendSuccess(row);
        };
      })(this);
    }

    SmsMessageCtrl.prototype.sendSuccess = function(row) {
      return row.getProperty("sendStatus") === "Y";
    };

    SmsMessageCtrl.prototype.setupScope = function() {
      this.$scope.myData = [];
      return this.$scope.gridOptions = {
        columnDefs: [
          {
            field: 'sendTime',
            displayName: '发送时间'
          }, {
            field: 'sendStatus',
            displayName: '发送状态',
            cellTemplate: 'views/smsmessage/smsMessageCell.html'
          }, {
            field: 'count',
            displayName: '总条数'
          }
        ],
        multiSelect: false,
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: {
          pageSizes: [100, 200, 500],
          pageSize: 100,
          totalServerItems: 0,
          currentPage: 1
        },
        useExternalSorting: true,
        i18n: "zh-cn",
        enableColumnResize: true,
        showColumnMenu: true
      };
    };

    SmsMessageCtrl.prototype.init = function() {
      this.setupScope();
      return this.findSmsMessageVos();
    };

    SmsMessageCtrl.prototype.findSmsMessageVos = function() {
      this.$log.debug("findSmsMessageVos()");
      return this.SmsMessageService.findSmsMessageVos(this.pager).then((function(_this) {
        return function(data) {
          _this.$scope.myData = data.value.list;
          return _this.allCount = data.value.allCount;
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get SmsMessages: " + error);
          return _this.error = error;
        };
      })(this));
    };

    return SmsMessageCtrl;

  })();

  angular.module("sbAdminApp").controller('SmsMessageCtrl', SmsMessageCtrl);

}).call(this);

