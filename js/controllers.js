angular.module('app.controllers', [])
	// login 登录页面控制
	.controller('loginCtrl', function($scope, $state, LoginServe,GlobalServe) {
		$scope.user = {
			username: '',
			password: ''
		}
		$scope.login = function() {
			LoginServe.login($scope.user)
				.then(function(data) {
					console.log(arguments);
					console.log(data.data.result.token);
					GlobalServe.token=data.data.result.token;
					if (data.data.result.token) {
						$state.go('main');
					}
				}, function(error) {
					console.log(error);
				})
		};

	})
	//main 主页面控制
	.controller('mainCtrl', function($scope, $state) {

	})
	// Declare申报页面控制
	.controller('declareCtrl', function($scope, $state, DeclareServe,GlobalServe) {
		$scope.staffRelationship = function() {
			console.log(arguments);
		}
		$scope.declare = {
			token:GlobalServe.token,
			staff: '', //	申报人
			staffRelationship: '', //	与申报人关系 1:本人 2:直系亲属
			staffPoliticalStatus: '', //	政治面貌
			staffJob: '', //	单位职务 1：县级党员干部 2：科级党员干部 3：社区基层干部 4：一般工作人员
			staffSpouse: '', //	配偶
			staffPhone: '', //	联系电话
			eventType: '', //	操办事项 1：婚嫁 2：丧葬
			eventCount: '', //	操办次数
			eventDate: '', //	操办时间 格式示例 2016-08-27 00:00:00
			location: '', //	操办地点
			tableCount: '', //	操办桌数
			peopleCount: '', //	参加人数
			peopleRange: '', //	邀请范围
			carCount: '', //	用车数量
			carSource: '', //	用车来源
			attachmentFileCode: '', //	上传文件码
			selfPromise: '', //	本人承诺
			promisePeople: '', //	承诺人
			staffOrgId: '' //	所属部门
		};
		$scope.confirm = function() {
			DeclareServe.submit($scope.declare)
				.then(function(data) {
					console.log(data);
				}, function(error) {
					console.log(error);
				})
		};
	})
	// notifaction公开通报页面控制
	.controller('NotifCtrl', function($scope, $state, NotifServe,GlobalServe) {
		$scope.list = {
			token: '' , //	令牌
			staff: '' , //	被通报人姓名
			start: '' , //	从那个开始
			limit: ''  //	每页显示多少个
		};
		$scope.refresh = function() {
			NotifServe.list()
				.then(function(data) {
					console.log(data);
				}, function(error) {
					console.log(error);
				})
			console.log(GlobalServe.token);
		};
		$scope.refresh();
	})
