// usermanage用户管理页面服务
angular.module('app.services')
    .factory('UsermanageServe', function($http, $q, $state) {
        return {
            //获取列表list
            list: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: GlobalConfig.url.api.user.show,
                    params: params,
                    responseType: 'json',
                    timeout: 30000
                }).then(function(data) {
                    deferred.resolve(data);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            //添加用戶
            add: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.user.add,
                    params: params,
                    responseType: 'json',
                    timeout: 30000
                }).then(function(data) {
                    deferred.resolve(data);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            //获取部门列表
            depart: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.organization.loadAll,
                    params: params,
                    responseType: 'json',
                    timeout: 30000
                }).then(function(data) {
                    deferred.resolve(data);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            //获取角色列表
            role: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.role.getAll,
                    params: params,
                    responseType: 'json',
                    timeout: 30000
                }).then(function(data) {
                    deferred.resolve(data);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            //删除用戶
            del: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.user.remove,
                    params: params,
                    responseType: 'json',
                    timeout: 30000
                }).then(function(data) {
                    deferred.resolve(data);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            //获取用戶信息
            get: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.user.getById,
                    params: params,
                    responseType: 'json',
                    timeout: 30000
                }).then(function(data) {
                    deferred.resolve(data);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            //编辑用戶
            edit: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.user.update,
                    params: params,
                    responseType: 'json',
                    timeout: 30000
                }).then(function(data) {
                    deferred.resolve(data);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };
    });
