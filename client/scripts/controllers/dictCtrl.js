(function() {
  var DictCtrl;

  DictCtrl = (function() {
    function DictCtrl($rootScope, $scope, $log, $location, DictService, toaster) {
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.$log = $log;
      this.$location = $location;
      this.DictService = DictService;
      this.toaster = toaster;
      this.$log.debug("constructing DictCtrl");
      this.dict = this.$rootScope.dict || {};
      this.$rootScope.dict = {};
      this.status = [
        {
          key: '',
          value: '请选择'
        }, {
          key: 'Y',
          value: '启用'
        }, {
          key: 'N',
          value: '禁用'
        }
      ];
      this.pager = {
        filter: {
          EQS_status: ''
        },
        index: 0
      };
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
            field: 'codeCat',
            displayName: '类别'
          }, {
            field: 'codeKey',
            displayName: '值'
          }, {
            field: 'codeVal',
            displayName: '描述'
          }, {
            field: 'seqNo',
            displayName: '序号'
          }, {
            field: 'status',
            displayName: '状态'
          }, {
            field: 'magic',
            displayName: '图片'
          }, {
            field: 'remarks',
            displayName: '注释'
          }, {
            field: "createTime",
            displayName: '创建时间',
            cellFilter: 'date:"yyyy-MM-dd HH:mm"'
          }, {
            field: null,
            displayName: '操作',
            cellTemplate: 'views/dict/operation.html'
          }
        ]
      };
    }

    DictCtrl.prototype.findDicts = function() {
      this.$log.debug("findDicts()");
      this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
      this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
      return this.DictService.findDicts(this.pager).then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.list.length + " Dicts");
          return _this.$scope.pager = data;
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get dicts: " + error);
          return _this.error = error;
        };
      })(this));
    };

    DictCtrl.prototype.saveDict = function() {
      this.$log.debug("saveDict()");
      return this.DictService.saveDict(this.dict).then((function(_this) {
        return function(data) {
          _this.$log.debug("save Dict successfully");
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.$location.path("/dashboard/dict");
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to save Dict: " + error);
          _this.toaster.pop('error', error.message.summary, error.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    DictCtrl.prototype.createDict = function() {
      this.$log.debug("createDict()");
      this.dict.status = "Y";
      this.$rootScope.dict = this.dict;
      return this.$location.path("/dashboard/dict/save");
    };

    DictCtrl.prototype.updateDict = function(dict) {
      this.$log.debug("updateDict");
      this.$rootScope.dict = dict;
      return this.$location.path("/dashboard/dict/save");
    };

    DictCtrl.prototype.deleteDict = function(dict) {
      this.$log.debug("deleteDict()");
      return this.DictService.deleteDict(dict).then((function(_this) {
        return function(data) {
          _this.$log.debug("successfully delete dict");
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.findDicts();
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to delete dict: " + error);
          _this.toaster.pop('error', data.message.summary, data.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    DictCtrl.prototype.disableDict = function(dict) {
      this.$log.debug("disableDict()");
      this.dict = dict;
      this.dict.status = 'N';
      return this.DictService.saveDict(this.dict).then((function(_this) {
        return function(data) {
          _this.$log.debug("successfully disable dict");
          return _this.findDicts();
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to disable dict: " + error);
          return _this.error = error;
        };
      })(this));
    };

    DictCtrl.prototype.enableDict = function(dict) {
      this.$log.debug("enableDict()");
      this.dict = dict;
      this.dict.status = 'Y';
      return this.DictService.saveDict(this.dict).then((function(_this) {
        return function(data) {
          _this.$log.debug("successfully enable dict");
          return _this.findDicts();
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to enable dict: " + error);
          return _this.error = error;
        };
      })(this));
    };

    return DictCtrl;

  })();

    angular.module('sbAdminApp').controller('DictCtrl', DictCtrl);

}).call(this);

