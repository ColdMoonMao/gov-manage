// approve审批页面服务
angular.module('app.services')
    .factory('ApproveServe', function($http, $q) {
        return {
            //页面接口
            userList: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: GlobalConfig.url.api.event.showAudit,
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
            //模态框接口
            modList: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.eventAudit.getByEvent,
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
            //模态框确认接口
            sureList: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.event.audit,
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
