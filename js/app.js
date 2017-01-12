angular.module('app', ['app.controllers', 'ui.router', 'oc.lazyLoad'])
    .config(function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        // $ocLazyLoadProvider.config(function() {
        //     module: [{
        //         name: 'mainModule',
        //         files: [
        //             '../lib/js/jquery-1.11.1.min.js',
        //             '../lib/bower_components/bootstrap/js/bootstrap.min.js',
        //             '../lib/js/jquery.slimscroll.min.js',
        //             '../lib/js/jquery.popupoverlay.min.js',
        //             '../lib/js/modernizr.min.js',
        //             '../lib/js/simplify.js'
        //         ]
        //     }]
        // });
        $stateProvider
            .state('login', {
                url: '/login',
                controller: 'loginCtrl',
                templateUrl: 'templates/login.html'
            })
            .state('main', {
                url: '/main',
                controller: 'mainCtrl as main',
                templateUrl: 'templates/main.html',
                resolve: {
                    main: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            name: 'main',
                            files: [
                                'lib/js/jquery-1.11.1.min.js',
                                'lib/bower_components/bootstrap/js/bootstrap.min.js',
                                'lib/js/jquery.slimscroll.min.js',
                                'lib/js/jquery.popupoverlay.min.js',
                                'lib/js/modernizr.min.js',
                                'lib/js/simplify.js'
                            ]
                        });
                    }]
                }
            })
            .state('main.declare', {
                url: '/declare',
                views: {
                    'content': {
                        templateUrl: 'templates/declare.html',
                        controller: 'page1Ctrl'
                    }
                },
                params: {
                    data: {},
                    event: {}
                }
            })
            .state('main.approve', {
                url: '/approve',
                views: {
                    'content': {
                        templateUrl: 'templates/approve.html',
                        controller: 'page1Ctrl'
                    }
                },
                params: {
                    data: {},
                    event: {}
                }
            })
            .state('main.publicity', {
                url: '/publicity',
                views: {
                    'content': {
                        templateUrl: 'templates/publicity.html',
                        controller: 'page1Ctrl'
                    }
                },
                params: {
                    data: {},
                    event: {}
                }
            })
            .state('main.supervision', {
                url: '/supervision',
                views: {
                    'content': {
                        templateUrl: 'templates/supervision.html',
                        controller: 'page1Ctrl'
                    }
                },
                params: {
                    data: {},
                    event: {}
                }
            })
            .state('main.precisequery', {
                url: '/precisequery',
                views: {
                    'content': {
                        templateUrl: 'templates/precisequery.html',
                        controller: 'page1Ctrl'
                    }
                },
                params: {
                    data: {},
                    event: {}
                }
            })
            .state('main.combinequery', {
                url: '/combinequery',
                views: {
                    'content': {
                        templateUrl: 'templates/combinequery.html',
                        controller: 'page1Ctrl'
                    }
                },
                params: {
                    data: {},
                    event: {}
                }
            })
            .state('main.statistic', {
                url: '/statistic',
                views: {
                    'content': {
                        templateUrl: 'templates/statistic.html',
                        controller: 'page1Ctrl'
                    }
                },
                params: {
                    data: {},
                    event: {}
                }
            })
            .state('main.notification', {
                url: '/notification',
                views: {
                    'content': {
                        templateUrl: 'templates/notification.html',
                        controller: 'page1Ctrl'
                    }
                },
                params: {
                    data: {},
                    event: {}
                }
            })
            .state('main.punish', {
                url: '/punish',
                views: {
                    'content': {
                        templateUrl: 'templates/punish.html',
                        controller: 'page1Ctrl'
                    }
                },
                params: {
                    data: {},
                    event: {}
                }
            })
            .state('main.usermanage', {
                url: '/usermanage',
                views: {
                    'content': {
                        templateUrl: 'templates/usermanage.html',
                        controller: 'page1Ctrl'
                    }
                },
                params: {
                    data: {},
                    event: {}
                }
            })
            .state('main.rolemanage', {
                url: '/rolemanage',
                views: {
                    'content': {
                        templateUrl: 'templates/rolemanage.html',
                        controller: 'page1Ctrl'
                    }
                },
                params: {
                    data: {},
                    event: {}
                }
            })

        $urlRouterProvider.otherwise('/login');

    })
