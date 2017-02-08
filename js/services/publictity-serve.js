// 公示页面服务
angular.module('app.services')
    .factory('PublicityServe', function($http, $q) {
        return {
            //页面接口
            pubList: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: GlobalConfig.url.api.event.showBulletin,
                    params: params,
                    responseType: 'json',
                    timeout: 30000
                }).then(function(data) {

                    deferred.resolve(data);
                    // console.log(deferred.resolve(data))
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            //公示内容模态框接口
            modList: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.eventBulletin.getByEvent,
                    params: params,
                    responseType: 'json',
                    timeout: 30000
                }).then(function(data) {

                    deferred.resolve(data);
                    // console.log(deferred.resolve(data))
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            //公示内容模态框确认接口
            sureList: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.eventBulletin.add,
                    params: params,
                    responseType: 'json',
                    timeoit: 30000
                }).then(function(data) {
                    deferred.resolve(data);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            //公示结果模态框接口
            resultList: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.eventBulletinResult.getByEvent,
                    params: params,
                    responseType: 'json',
                    timeout: 30000
                }).then(function(data) {

                    deferred.resolve(data);
                    // console.log(deferred.resolve(data))
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            //公示结果模态框确认接口
            resultSureList: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.eventBulletinResult.add,
                    params: params,
                    responseType: 'json',
                    timeoit: 30000
                }).then(function(data) {
                    deferred.resolve(data);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };
    });
