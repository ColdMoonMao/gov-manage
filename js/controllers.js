angular.module('app.controllers', [])
	.controller('loginCtrl', function ($scope,$state) {
		$scope.login=function () {
			$state.go('main');
		};

	})
	.controller('mainCtrl', function ($scope,$state) {
		
	})