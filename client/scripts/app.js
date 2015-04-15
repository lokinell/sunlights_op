'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'ngGrid',
    'ui.date',
    'localytics.directives',
    'ui.bootstrap.datetimepicker',
    'angularFileUpload',
    'toaster',
    'ngAnimate',
    'ngDialog'
  ]).config(['ngDialogProvider', function (ngDialogProvider) {
    ngDialogProvider.setDefaults({
      className: 'ngdialog-theme-default',
      plain: false,
      showClose: true,
      closeByDocument: true,
      closeByEscape: true,
      appendTo: false
    });
  }]).config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      debug: false,
      events: true
    });

    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
          loadMyDirectives: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/directives/header/header.js',
                'scripts/directives/header/header-notification/header-notification.js',
                'scripts/directives/sidebar/sidebar.js',
                'scripts/directives/sidebar/sidebar-search/sidebar-search.js',
                'scripts/controllers/main.js',
                'scripts/services/loginService.js'
              ]
            })
          }
        }
      })
      .state('dashboard.home', {
        url: '/home',
        controller: 'MainCtrl as mc',
        templateUrl: 'views/dashboard/home.html',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js',
                'scripts/directives/paging/ngPageChanged.js'
              ]
            })
          }
        }
      })
      .state('dashboard.form', {
        templateUrl: 'views/form.html',
        url: '/form'
      })
      .state('dashboard.blank', {
        templateUrl: 'views/pages/blank.html',
        url: '/blank'
      })
      .state('dashboard.permission', {
        templateUrl: 'views/pages/permission.html',
        url: '/permission'
      })
      .state('login', {
        templateUrl: 'views/pages/login.html',
        url: '/login',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/loginService.js',
                'scripts/controllers/loginCtrl.js'
              ]
            })
          }
        }
      })
      .state('reset', {
        templateUrl: 'views/pages/password.html',
        url: '/reset',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/loginService.js',
                'scripts/controllers/loginCtrl.js'
              ]
            })
          }
        }
      })
      .state('logout', {
        templateUrl: 'views/pages/login.html',
        url: '/logout',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/loginService.js',
                'scripts/controllers/loginCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.table', {
        templateUrl: 'views/table.html',
        url: '/table'
      })
      .state('dashboard.panels-wells', {
        templateUrl: 'views/ui-elements/panels-wells.html',
        url: '/panels-wells'
      })
      .state('dashboard.buttons', {
        templateUrl: 'views/ui-elements/buttons.html',
        url: '/buttons'
      })
      .state('dashboard.notifications', {
        templateUrl: 'views/ui-elements/notifications.html',
        url: '/notifications'
      })
      .state('dashboard.typography', {
        templateUrl: 'views/ui-elements/typography.html',
        url: '/typography'
      })
      .state('dashboard.icons', {
        templateUrl: 'views/ui-elements/icons.html',
        url: '/icons'
      })
      .state('dashboard.grid', {
        templateUrl: 'views/ui-elements/grid.html',
        url: '/grid'
      })
      .state('dashboard.verifyCode', {
        templateUrl: 'views/verifyCode/verifyCode.html',
        url: '/verifyCode',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/customerService.js',
                'scripts/controllers/verifyCodeCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.dict', {
        templateUrl: 'views/dict/dict.html',
        url: '/dict',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/dictService.js',
                'scripts/controllers/dictCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.parameter', {
        templateUrl: 'views/parameter/parameter.html',
        url: '/parameter',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/parameterService.js',
                'scripts/controllers/parameterCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.tasks', {
        templateUrl: 'views/tasks/index.html',
        url: '/tasks',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/taskService.js',
                'scripts/controllers/taskCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.fundcompanies', {
        templateUrl: 'views/fundcompanies/index.html',
        url: '/fundcompanies',
        controller: 'CompanyCtrl',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/directives/paging/ngPageChanged.js',
                'scripts/services/companyService.js',
                'scripts/controllers/companyCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.fund', {
        templateUrl: 'views/fund/fund.html',
        url: '/fund',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/productService.js',
                'scripts/services/commonService.js',
                'scripts/services/companyService.js',
                'scripts/services/supplierService.js',
                'scripts/controllers/fundCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.product', {
        templateUrl: 'views/product/product.html',
        url: '/product',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/productService.js',
                'scripts/services/commonService.js',
                'scripts/services/taskService.js',
                'scripts/services/supplierService.js',
                'scripts/controllers/productManageCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.resource', {
        templateUrl: 'views/authority/resource/resource.html',
        url: '/resource',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/resourceService.js',
                'scripts/controllers/resourceCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.role', {
        templateUrl: 'views/authority/role/role.html',
        url: '/role',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/roleService.js',
                'scripts/services/resourceService.js',
                'scripts/controllers/roleCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.user', {
        templateUrl: 'views/authority/user/user.html',
        url: '/user',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/roleService.js',
                'scripts/services/userService.js',
                'scripts/controllers/userCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.deposit', {
        templateUrl: 'views/deposit/deposit.html',
        url: '/deposit',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/depositInterestService.js',
                'scripts/controllers/depositInterestCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.depositSave', {
        templateUrl: 'views/deposit/save.html',
        url: '/deposit/save',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/depositInterestService.js',
                'scripts/controllers/depositInterestCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.bank', {
        templateUrl: 'views/bank/bank.html',
        url: '/bank',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/bankService.js',
                'scripts/controllers/bankCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.sms', {
        templateUrl: 'views/smsmessage/smsMessage.html',
        url: '/smsmessage',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/jquery/exportExcel.js',
                'scripts/services/smsMessageService.js',
                'scripts/controllers/smsMessageCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.group', {
        templateUrl: 'views/group/group.html',
        url: '/group',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/common/pageService.js',
                'scripts/services/groupService.js',
                'scripts/controllers/groupCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.groupConfig', {
        templateUrl: 'views/group/groupConfig.html',
        url: '/group/config',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/common/pageService.js',
                'scripts/services/groupService.js',
                'scripts/controllers/groupCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.userSetting', {
        templateUrl: 'views/authority/user/setting.html',
        url: '/user/setting',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/roleService.js',
                'scripts/services/userService.js',
                'scripts/controllers/userCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.messageRule', {
        templateUrl: 'views/messagerule/messageRule.html',
        url: '/messagerule',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/common/pageService.js',
                'scripts/services/messageRuleService.js',
                'scripts/controllers/messageRuleCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.messageRuleSave', {
        templateUrl: 'views/messagerule/save.html',
        url: '/messagerule/save',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/messageRuleService.js',
                'scripts/controllers/messageRuleCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.messageRuleUpdate', {
        templateUrl: 'views/messagerule/update.html',
        url: '/messagerule/update',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/messageRuleService.js',
                'scripts/controllers/messageRuleCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.messageConfig', {
        templateUrl: 'views/messpushconfig/messagePushConfig.html',
        url: '/messageConfig',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/common/pageService.js',
                'scripts/services/messagePushConfigService.js',
                'scripts/controllers/messagePushConfigCtrl.js'
              ]
            })

          }
        }
      })
      .state('dashboard.messageMapping', {
        templateUrl: 'views/messagemapping/messageMapping.html',
        url: '/messageMapping',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/common/pageService.js',
                'scripts/services/messageMappingService.js',
                'scripts/controllers/messageMappingCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.red', {
        templateUrl: 'views/reward/exchange.html',
        url: '/exchange',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/controllers/excelModalCtrl.js',
                'scripts/services/exchangeResultService.js',
                'scripts/controllers/exchangeResultCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.scene', {
        templateUrl: 'views/activity/scenes.html',
        url: '/scene',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/controllers/activitySceneCtrl.js',
                'scripts/services/activitySceneService.js',
                'scripts/services/productService.js',
                'scripts/common/pageService.js',
                'scripts/services/commonService.js'
              ]
            })
          }
        }
      })
      .state('dashboard.scenesave', {
        templateUrl: 'views/activity/scene_save.html',
        url: '/scene/save',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/controllers/activitySceneCtrl.js',
                'scripts/services/activitySceneService.js',
                'scripts/services/productService.js',
                'scripts/common/pageService.js',
                'scripts/services/commonService.js'
              ]
            })
          }
        }
      })
      .state('dashboard.rewardType', {
        templateUrl: 'views/reward/rewardType.html',
        url: '/rewardType',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/controllers/rewardTypeCtrl.js',
                'scripts/common/pageService.js',
                'scripts/services/exchangeRuleService.js',
                'scripts/services/rewardTypesService.js'
              ]
            })
          }
        }
      })
      .state('dashboard.share', {
        templateUrl: 'views/activity/activityShareInfo.html',
        url: '/share',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/controllers/activityShareCtrl.js',
                'scripts/controllers/activityShareModalInstanceCtrl.js',
                'scripts/services/activityService.js',
                'scripts/services/activityShareInfoService.js',
                'scripts/services/obtainRewardRulesService.js'
              ]
            })
          }
        }
      })
      .state('dashboard.list', {
        templateUrl: 'views/activity/activityList.html',
        url: '/activity/list',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/controllers/activityCtrl.js',
                'scripts/controllers/obtainRuleModalInstanceCtrl.js',
                'scripts/services/activityService.js',
                'scripts/common/pageService.js',
                'scripts/services/activityShareInfoService.js',
                'scripts/services/obtainRewardRulesService.js'
              ]
            })
          }
        }
      })
      .state('dashboard.exchangescene', {
        templateUrl: 'views/reward/exchangeScene.html',
        url: '/exchangeScene',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/controllers/exchangeSceneCtrl.js',
                'scripts/services/activityService.js',
                'scripts/common/pageService.js',
                'scripts/services/exchangeSceneService.js'
              ]
            })
          }
        }
      })
      .state('dashboard.exchangebean', {
        templateUrl: 'views/reward/exchangebeanresult.html',
        url: '/exchangebean',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/controllers/excelModalCtrl.js',
                'scripts/controllers/exchangeBeanResultCtrl.js',
                'scripts/services/exchangeBeanResultService.js'
              ]
            })
          }
        }
      })
      .state('dashboard.errorMsg', {
        templateUrl: 'views/activity/activityReturnMsgMgr.html',
        url: '/activityReturnMsgMgr',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/controllers/activityReturnMsgModelInstance.js',
                'scripts/controllers/activityReturnMsgCtrl.js',
                'scripts/services/activityService.js',
                'scripts/common/pageService.js',
                'scripts/services/activityReturnMsgService.js'
              ]
            })
          }
        }
      })
      .state('dashboard.supplier', {
        templateUrl: 'views/supplier/suppliers.html',
        url: '/supplier',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/controllers/supplierCtrl.js',
                'scripts/services/supplierService.js'
              ]
            })
          }
        }
      })
      .state('dashboard.referrer', {
        templateUrl: 'views/referrer/referrer.html',
        url: '/referrer',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/referrerService.js',
                'scripts/controllers/referrerCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.referrerDetail', {
        templateUrl: 'views/referrer/detail.html',
        url: '/referrer/detail',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/referrerService.js',
                'scripts/controllers/referrerCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.statisticsPurchase', {
        templateUrl: 'views/statistics/purchase.html',
        url: '/statistics/purchase',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/purchaseStatisticsService.js',
                'scripts/controllers/firstPurchaseCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.statisticsUnPurchase', {
        templateUrl: 'views/statistics/unpurchase.html',
        url: '/statistics/unpurchase',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/purchaseStatisticsService.js',
                'scripts/controllers/unPurchaseCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.tradeSummary', {
        templateUrl: 'views/statistics/summary.html',
        url: '/statistics/summary',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/purchaseStatisticsService.js',
                'scripts/controllers/tradeSummaryCtrl.js'
              ]
            })
          }
        }
      })
      .state('dashboard.customer', {
        templateUrl: 'views/customer/customer.html',
        url: '/customer',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sbAdminApp',
              files: [
                'scripts/services/customerService.js',
                'scripts/controllers/customerCtrl.js'
              ]
            })
          }
        }
      })
  }])
  .run(function ($rootScope, $window, $location) {
    function hasPermission(permissions, state) {
      var _i;
      if (!permissions) return false;
      for (_i = 0; _i <= permissions.length; ++_i) {
        if (state.indexOf(permissions[_i]) > -1) {
          return true;
        }
      }
      return false;
    };

    $rootScope.$on("$locationChangeStart", function (ev, to, toParams, from, fromParams) {
      console.info('$locationChangeStart--:');
      var url = to;
      if (url.indexOf("reset") > -1) {
        return $location.path("reset");
      }

      var user = localStorage.getItem("user");

      if (!user) {

        $location.path('/login');
        console.log('未登入--: ' + $rootScope.originalUrl);
        return;
      } else {
        //已登录
        console.log('已登入--: ' + $rootScope.originalUrl);
        var currentUser = angular.fromJson(user);
        var permissions = currentUser.permissions;
        if (hasPermission(permissions, url)) {
          return;
        } else {
          return $location.path("/dashboard/permission");
        }
      }

    });
  });
