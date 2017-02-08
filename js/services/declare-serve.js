// Declare申报页面服务
angular.module('app.services')
    .factory('DeclareServe', function($http, $q, $state) {
        return {
            submit: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.event.add,
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
            //上传文件
            upload: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.upload,
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
