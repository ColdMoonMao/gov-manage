angular.module('app', ['app.controllers', 'app.services','ui.router'])
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
						controller: 'approveCtrl'
					}
				}
			})
			//publicity 公示页面
			.state('main.publicity', {
				url: '/publicity',
				views: {
					'content': {
						templateUrl: 'templates/publicity.html',
						controller: 'publicityCtrl'
					}
				}
			})
			//supervision 监督页面
			.state('main.supervision', {
				url: '/supervision',
				views: {
					'content': {
						templateUrl: 'templates/supervision.html',
						controller: 'supervisionCtrl'
					}
				}
			})
			//precisequery精确查询
			.state('main.preciseQuery', {
				url: '/precise-query',
				views: {
					'content': {
						templateUrl: 'templates/precise-query.html',
						controller: 'preciseQueryCtrl'
					}
				}
			})
			//combinequery组合查询
			.state('main.combineQuery', {
				url: '/combine-query',
				views: {
					'content': {
						templateUrl: 'templates/combine-query.html',
						controller: 'combineQueryCtrl'
					}
				}
			})
			//statistic数量统计
			.state('main.statistic', {
				url: '/statistic',
				views: {
					'content': {
						templateUrl: 'templates/statistic.html',
						controller: 'statisticCtrl'
					}
				}
			})
			//notification 公开通报
			.state('main.notification', {
				url: '/notification',
				views: {
					'content': {
						templateUrl: 'templates/notification.html',
						controller: 'notifCtrl'
					}
				}
			})
			//punish纪律处分
			.state('main.punish', {
				url: '/punish',
				views: {
					'content': {
						templateUrl: 'templates/punish.html',
						controller: 'punishCtrl'
					}
				}
			})
			//usermanage用户管理
			.state('main.userManage', {
				url: '/user-manage',
				views: {
					'content': {
						templateUrl: 'templates/user-manage.html',
						controller: 'userManageCtrl'
					}
				}
			})
			//rolemanage角色管理
			.state('main.roleManage', {
				url: '/role-manage',
				views: {
					'content': {
						templateUrl: 'templates/role-manage.html',
						controller: 'roleManageCtrl'
					}
				}
			});

		$urlRouterProvider.otherwise('/login');

	});
