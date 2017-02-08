// notifaction公开通报页面服务
angular.module('app.services')
    .factory('NotifServe', function($http, $q, $state) {
        return {
            //获取列表list
            list: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: GlobalConfig.url.api.wdm.publicNotification.show,
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
            //双击列表读取详情getById
            getById: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: GlobalConfig.url.api.wdm.publicNotification.getById,
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
            //添加通报
            add: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.wdm.publicNotification.add,
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
            //删除通报
            del: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.wdm.publicNotification.remove,
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
            //编辑通报
            edit: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.wdm.publicNotification.update,
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
