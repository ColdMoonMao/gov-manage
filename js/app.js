angular.module('app', ['app.controllers', 'app.services','ui.router', 'oc.lazyLoad'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            //login登录页面
            .state('login', {
                url: '/login',
                controller: 'loginCtrl',
                templateUrl: 'templates/login.html'
            })
            //主页面main
            .state('main', {
                url: '/main',
                controller: 'mainCtrl',
                templateUrl: 'templates/main.html',
                resolve: {
                    main: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            name: 'main',
                            files: [
                                '../lib/js/jquery-1.11.1.min.js',
                                '../lib/bower_components/bootstrap/js/bootstrap.min.js',
                                '../lib/js/jquery.slimscroll.min.js',
                                '../lib/js/jquery.popupoverlay.min.js',
                                '../lib/js/modernizr.min.js',
                                '../lib/js/simplify.js'
                            ],
                            cache:true
                        });
                    }]
                }
            })
            //declare申报页面
            .state('main.declare', {
                url: '/declare',
                views: {
                    'content': {
                        templateUrl: 'templates/declare.html',
                        controller: 'declareCtrl'
                    }
                }
            })
            //approve审批页面
            .state('main.approve', {
                url: '/approve',
                views: {
                    'content': {
                        templateUrl: 'templates/approve.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            //publicity 公示页面
            .state('main.publicity', {
                url: '/publicity',
                views: {
                    'content': {
                        templateUrl: 'templates/publicity.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            //supervision 监督页面
            .state('main.supervision', {
                url: '/supervision',
                views: {
                    'content': {
                        templateUrl: 'templates/supervision.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            //precisequery精确查询
            .state('main.precisequery', {
                url: '/precisequery',
                views: {
                    'content': {
                        templateUrl: 'templates/precisequery.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            //combinequery组合查询
            .state('main.combinequery', {
                url: '/combinequery',
                views: {
                    'content': {
                        templateUrl: 'templates/combinequery.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            //statistic数量统计
            .state('main.statistic', {
                url: '/statistic',
                views: {
                    'content': {
                        templateUrl: 'templates/statistic.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            //notification 公开通报
            .state('main.notification', {
                url: '/notification',
                views: {
                    'content': {
                        templateUrl: 'templates/notification.html',
                        controller: 'NotifCtrl'
                    }
                }
            })
            //punish纪律处分
            .state('main.punish', {
                url: '/punish',
                views: {
                    'content': {
                        templateUrl: 'templates/punish.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            //usermanage用户管理
            .state('main.usermanage', {
                url: '/usermanage',
                views: {
                    'content': {
                        templateUrl: 'templates/usermanage.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            //rolemanage角色管理
            .state('main.rolemanage', {
                url: '/rolemanage',
                views: {
                    'content': {
                        templateUrl: 'templates/rolemanage.html',
                        controller: 'mainCtrl'
                    }
                }
            })

        $urlRouterProvider.otherwise('/login');

    })
