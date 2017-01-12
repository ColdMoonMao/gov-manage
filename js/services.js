/**
 * Created by Administrator on 2017/1/10.
 */
angular.module('myApp.services', [])
    .factory('User', function ($http, $q) {
        return {
            getAll: function () {
                return userList;
            },
            getUserByIndex: function (i) {
                return userList[i]
            },
            login: function (params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: authURL,
                    params: params,
                    responseType: 'json',
                    timeout: 30000
                }).then(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        }
    });


