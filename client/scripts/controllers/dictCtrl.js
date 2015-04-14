(function () {
  var DictCtrl;

  DictCtrl = (function () {
    function DictCtrl($rootScope, $scope, $log, $location, toaster, ngDialog, DictService) {
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.$log = $log;
      this.$location = $location;
      this.toaster = toaster;
      this.ngDialog = ngDialog;
      this.DictService = DictService;
      this.$log.debug("constructing DictCtrl");
      this.dict = this.$scope.dict || {};
      this.dialog = {};
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

    DictCtrl.prototype.findDicts = function () {
      this.$log.debug("findDicts()");
      this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
      this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
      return this.DictService.findDicts(this.pager).then((function (_this) {
        return function (data) {
          _this.$log.debug("Promise returned " + data.list.length + " Dicts");
          return _this.$scope.pager = data;
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to get dicts: " + error);
          return _this.error = error;
        };
      })(this));
    };

    DictCtrl.prototype.saveDict = function () {
      this.$log.debug("saveDict()");
      this.dict = angular.copy(this.$scope.dict);
      return this.DictService.saveDict(this.dict).then((function (_this) {
        return function (data) {
          _this.findDicts();
          _this.dialog.close();
          _this.toaster.pop('success', '操作成功', '');
          return _this.$log.debug("save Dict successfully");
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$scope.error = error;
          return _this.$log.error("Unable to save Dict: " + error);
        };
      })(this));
    };

    DictCtrl.prototype.createDict = function () {
      this.$scope.error = null;
      this.$scope.dict = {status: 'Y'};
      this.dialog = this.ngDialog.open({
        template: 'dictSaveDialog',
        className: 'ngdialog-theme-plain custom-width',
        scope: this.$scope,
        preCloseCallback: (function (_this) {
          return function (value) {
            _this.$log.debug("preCloseCallback()");
            if ('confirm' === value) {
              _this.saveDict();
              return false;
            } else {
              return true;
            }
          };
        })(this)
      });
      return this.$log.debug("createDict()");
    };

    DictCtrl.prototype.updateDict = function (dict) {
      this.$scope.error = null;
      this.$scope.dict = dict;
      this.dialog = this.ngDialog.open({
        template: 'dictSaveDialog',
        className: 'ngdialog-theme-plain custom-width',
        scope: this.$scope,
        preCloseCallback: (function (_this) {
          return function (value) {
            _this.$log.debug("preCloseCallback()");
            if ('confirm' === value) {
              _this.saveDict();
              return false;
            } else {
              return true;
            }
          };
        })(this)
      });
      return this.$log.debug("updateDict");
    };

    DictCtrl.prototype.deleteDict = function (dict) {
      this.$log.debug("deleteDict()");
      return this.DictService.deleteDict(dict).then((function (_this) {
        return function (data) {
          _this.$log.debug("successfully delete dict");
          _this.toaster.pop('success', '操作成功', '');
          return _this.findDicts();
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to delete dict: " + error);
          _this.toaster.pop('error', '操作失败', '');
          return _this.error = error;
        };
      })(this));
    };

    DictCtrl.prototype.disableDict = function (dict) {
      this.$log.debug("disableDict()");
      this.dict = dict;
      this.dict.status = 'N';
      return this.DictService.saveDict(this.dict).then((function (_this) {
        return function (data) {
          _this.$log.debug("successfully disable dict");
          _this.toaster.pop('success', '操作成功', '');
          return _this.findDicts();
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to disable dict: " + error);
          _this.toaster.pop('error', '操作失败', '');
          return _this.error = error;
        };
      })(this));
    };

    DictCtrl.prototype.enableDict = function (dict) {
      this.$log.debug("enableDict()");
      this.dict = dict;
      this.dict.status = 'Y';
      return this.DictService.saveDict(this.dict).then((function (_this) {
        return function (data) {
          _this.$log.debug("successfully enable dict");
          _this.toaster.pop('success', '操作成功', '');
          return _this.findDicts();
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to enable dict: " + error);
          _this.toaster.pop('error', '操作失败', '');
          return _this.error = error;
        };
      })(this));
    };

    return DictCtrl;

  })();

  angular.module('sbAdminApp').controller('DictCtrl', DictCtrl);

}).call(this);

