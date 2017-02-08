angular.module('app.services', []);

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

//精确查询precisequery和组合查询公用
angular.module('app.services')
    .factory('PreciseQueryServe', function($http, $q) {
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

// punish纪律处分页面服务
angular.module('app.services')
    .factory('PunishServe', function($http, $q, $state) {
        return {
            //获取列表list
            list: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: GlobalConfig.url.api.wdm.disciplinePunish.show,
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
                    url: GlobalConfig.url.api.wdm.disciplinePunish.getById,
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
                    url: GlobalConfig.url.api.wdm.disciplinePunish.add,
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
                    url: GlobalConfig.url.api.wdm.disciplinePunish.remove,
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
                    url: GlobalConfig.url.api.wdm.disciplinePunish.update,
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

// rolemanage角色管理页面服务
angular.module('app.services')
    .factory('RoleManageServe', function($http, $q, $state) {
        return {
            //获取列表list
            list: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: GlobalConfig.url.api.role.show,
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
            //添加角色
            add: function(token, roleName, code) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.role.add + '?token=' + token + '&roleName=' + roleName + '&functionCodes=' + code,
                    responseType: 'json',
                    timeout: 30000
                }).then(function(data) {
                    deferred.resolve(data);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            //删除角色
            del: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.role.remove,
                    params: params,
                    responseType: 'json',
                    timeout: 30000
                }).then(function(data) {
                    deferred.resolve(data);
                    console.log('services del');
                    console.log(data);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            //获取角色参数
            getById: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.role.getById,
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
            //编辑角色
            edit: function(token, roleName, roleId, code) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.role.update + '?token=' + token + '&roleName=' + roleName + '&roleId=' + roleId + '&functionCodes=' + code,
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

// supervision监督页面服务
angular.module('app.services')
    .factory('SupervisionServe', function($http, $q) {
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

// usermanage用户管理页面服务
angular.module('app.services')
    .factory('UserManageServe', function($http, $q, $state) {
        return {
            //获取列表list
            list: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: GlobalConfig.url.api.user.show,
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
            //添加用戶
            add: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.user.add,
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
            //获取部门列表
            depart: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.organization.loadAll,
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
            //获取角色列表
            role: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.role.getAll,
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
            //删除用戶
            del: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.user.remove,
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
            //获取用戶信息
            get: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.user.getById,
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
            //编辑用戶
            edit: function(params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: GlobalConfig.url.api.user.update,
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
