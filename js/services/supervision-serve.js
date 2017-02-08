// supervision监督页面服务
angular.module('app.services')
    .factory('supervisionServe', function($http, $q) {
        return {
            //页面接口
            pubList: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: GlobalConfig.url.api.event.showSupervise,
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
            //监督报告框接口
            modList: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.eventSuperviseReport.getByEvent,
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
            //监督报告模态框确认接口
            sureList: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.eventSuperviseReport.add,
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
            //违纪登记模态框接口
            registerList: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.eventSupervisePrincipleBreaking.getByEvent,
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
            //违纪登记模态框确认接口
            registerSureList: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.eventSupervisePrincipleBreaking.add,
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
