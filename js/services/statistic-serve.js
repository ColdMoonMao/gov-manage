//数量统计
angular.module('app.services')
    .factory('StatisticServe', function($http, $q) {
        return {
            //获取列表申报list
            statisticlist: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: GlobalConfig.url.api.event.getOrgEvenTypeCount,
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
