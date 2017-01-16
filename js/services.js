/**
 * Created by Administrator on 2017/1/10.
 */
angular.module('app.services', [])
    //全局服务,传递参数;
    .factory('GlobalServe', function() {
        return {
            token: ''
        }
    })
    //login登录页面服务
    .factory('LoginServe', function($http, $q) {
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
            }
        }
    })
    // Declare申报页面服务
    .factory('DeclareServe', function($http, $q) {
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
            }
        }
    })
    // notifaction公开通报页面服务
    .factory('NotifServe', function($http, $q) {
        return {
            //获取列表list
            list: function() {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: GlobalConfig.url.api.event.search,
                    responseType: 'json',
                    timeout: 30000
                }).then(function(data) {
                    deferred.resolve(data);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        }
    })
