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
        'ui.bootstrap.datetimepicker'
    ])
    .run(function ($rootScope, $window, $location) {
        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            console.info('$locationChangeStart--:');

            var user = localStorage.getItem("user");

            if (!user) {

                $location.path('/login');
                console.log('未登入--: ' + $rootScope.originalUrl);
                return;
            } else {
                //已登录
                console.log('已登入--: ' + $rootScope.originalUrl);
            }
        });
    })
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        $ocLazyLoadProvider.config({
            debug: false,
            events: true
        });

        $urlRouterProvider.otherwise('/dashboard/home');

        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: '/views/dashboard/main.html',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                'scripts/directives/header/header.js',
                                'scripts/directives/header/header-notification/header-notification.js',
                                'scripts/directives/sidebar/sidebar.js',
                                'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                            ]
                        })
                        $ocLazyLoad.load({
                            name: 'toggle-switch',
                            files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                                "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                            ]
                        })
                        $ocLazyLoad.load({
                            name: 'ngAnimate',
                            files: ['bower_components/angular-animate/angular-animate.js']
                        })
                        $ocLazyLoad.load({
                            name: 'ngCookies',
                            files: ['bower_components/angular-cookies/angular-cookies.js']
                        })
                        $ocLazyLoad.load({
                            name: 'ngResource',
                            files: ['bower_components/angular-animate/angular-animate.js']
                        })
                        $ocLazyLoad.load({
                            name: 'ngSanitize',
                            files: ['bower_components/angular-sanitize/angular-sanitize.js']
                        })
                        $ocLazyLoad.load({
                            name: 'ngTouch',
                            files: ['bower_components/angular-touch/angular-touch.js']
                        })
                        $ocLazyLoad.load({
                            name: 'ngGrid',
                            files: ["bower_components/ng-grid/ng-grid-2.0.14.min.js",
                                "bower_components/ng-grid/ng-grid.min.css"
                            ]
                        })
                    }
                }
            })
            .state('dashboard.home', {
                url: '/home',
                controller: 'MainCtrl as mc',
                templateUrl: '/views/dashboard/home.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                'scripts/controllers/main.js',
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
                templateUrl: '/views/form.html',
                url: '/form'
            })
            .state('dashboard.blank', {
                templateUrl: '/views/pages/blank.html',
                url: '/blank'
            })
            .state('login', {
                templateUrl: '/views/pages/login.html',
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
            .state('dashboard.chart', {
                templateUrl: 'views/chart.html',
                url: '/chart',
                controller: 'ChartCtrl',
                resolve: {
                    loadMyFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            'bower_components/Chart.js/Chart.min.js'
                        ),
                            $ocLazyLoad.load({
                                name: 'chart.js',
                                files: [
                                    'bower_components/angular-chart.js/dist/angular-chart.min.js',
                                    'bower_components/angular-chart.js/dist/angular-chart.css'
                                ]
                            }),
                            $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: ['scripts/controllers/chartContoller.js']
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
            .state('dashboard.dictSave', {
                templateUrl: 'views/dict/save.html',
                url: '/dict/save',
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
            .state('dashboard.parameterSave', {
                templateUrl: 'views/parameter/save.html',
                url: '/parameter/save',
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
                controller: 'TaskCtrl',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                'scripts/directives/paging/ngPageChanged.js',
                                'scripts/services/taskService.js',
                                'scripts/controllers/taskCtrl.js'
                            ]
                        })
                    }
                }
            })
          .state('dashboard.tasksSave', {
            templateUrl: 'views/tasks/save.html',
            url: '/tasks/save',
            controller: 'TaskCtrl',
            resolve: {
              loadMyFiles: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name: 'sbAdminApp',
                  files: [
                    'bower_components/smalot-bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
                    'bower_components/smalot-bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
                    'scripts/directives/paging/ngPageChanged.js',
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
            .state('dashboard.fundSave', {
                templateUrl: 'views/fund/save.html',
                url: '/fund/save',
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
            .state('dashboard.productSave', {
                templateUrl: 'views/product/save.html',
                url: '/product/save',
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
            .state('dashboard.roleSave', {
                templateUrl: 'views/authority/role/save.html',
                url: '/role/save',
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
            .state('dashboard.userSave', {
                templateUrl: 'views/authority/user/save.html',
                url: '/user/save',
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
            .state('dashboard.bankSave', {
                templateUrl: 'views/bank/save.html',
                url: '/bank/save',
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
            .state('dashboard.feedback', {
                templateUrl: 'views/feedback/feedback.html',
                url: '/feedback',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                'scripts/services/feedbackService.js',
                                'scripts/controllers/feedbackCtrl.js'
                            ]
                        })
                    }
                }
            })
            .state('dashboard.feedbackApprove', {
                templateUrl: 'views/feedback/approve.html',
                url: '/feedback/approve',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                'scripts/services/feedbackService.js',
                                'scripts/controllers/feedbackCtrl.js'
                            ]
                        })
                    }
                }
            })
            .state('dashboard.question', {
                templateUrl: 'views/question/question.html',
                url: '/question',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                'scripts/services/questionService.js',
                                'scripts/controllers/questionCtrl.js'
                            ]
                        })
                    }
                }
            })
            .state('dashboard.questionSave', {
                templateUrl: 'views/question/save.html',
                url: '/question/save',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                'scripts/services/questionService.js',
                                'scripts/controllers/questionCtrl.js'
                            ]
                        })
                    }
                }
            })
    }]);
