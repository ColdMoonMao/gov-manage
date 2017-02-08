//login登录页面服务
angular.module('app.services')
    .factory('LoginServe', function($http, $q, $state) {
        return {
            login: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.user.auth,
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
            bg: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: 'http://bing.ioliu.cn/v1/rand',
                    params: params,
                    responseType: 'jsonp',

                }).then(function(data) {
                    deferred.resolve(data);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };
    });
