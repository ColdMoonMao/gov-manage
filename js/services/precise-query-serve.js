//精确查询precisequery和组合查询公用
angular.module('app.services')
    .factory('PrecisequeryServe', function($http, $q) {
        return {
            //获取列表申报list
            Preciselist: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: GlobalConfig.url.api.event.search,
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
