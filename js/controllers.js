angular.module('app.controllers', [])
    // login 登录页面控制
    .controller('loginCtrl', function($scope, $state, LoginServe, GlobalServe) {
        $scope.user = {
            username: '',
            password: ''
        }
        $scope.login = function() {
            LoginServe.login($scope.user)
                .then(function(data) {
                    console.log(arguments);
                    console.log(data.data.result.token);
                    GlobalServe.token = data.data.result.token;
                    sessionStorage.setItem('token', data.data.result.token);
                    if (data.data.result.token) {
                        $state.go('main');
                    }
                }, function(error) {
                    console.log(error);
                })
        };

    })
    //main 主页面控制
    .controller('mainCtrl', function($scope, $state) {

    })
    // Declare申报页面控制
    .controller('declareCtrl', function($scope, $state, DeclareServe, GlobalServe) {
        //与申报人关系ng-change索引值
        $scope.staffRelationshipIndex = function() {
                // console.log(event);
                $scope.declare.staffRelationship = (event.target.selectedIndex + 1);
                console.log($scope.declare.staffRelationship);
            }
            //单位职务ng-change索引值
        $scope.staffJobIndex = function() {
                // console.log(event);
                $scope.declare.staffJob = (event.target.selectedIndex + 1);
                console.log($scope.declare.staffJob);
            }
            //操办事项ng-change索引值
        $scope.eventTypeIndex = function() {
                // console.log(event);
                $scope.declare.eventType = (event.target.selectedIndex + 1);
                console.log($scope.declare.eventType);
            }
            //所属部门ng-change索引值
        $scope.staffOrgIdIndex = function() {
            // console.log(event);
            $scope.declare.staffOrgId = (event.target.selectedIndex + 1);
            console.log($scope.declare.staffOrgId);
        }
        $scope.declare = {
            token: sessionStorage.getItem('token'),
            staff: ' ', //  申报人
            staffRelationship: 1, //    与申报人关系 1:本人 2:直系亲属
            staffPoliticalStatus: '', //    政治面貌
            staffJob: 1, // 单位职务 1：县级党员干部 2：科级党员干部 3：社区基层干部 4：一般工作人员
            staffSpouse: ' ', //    配偶
            staffPhone: '', //  联系电话
            eventType: 1, //    操办事项 1：婚嫁 2：丧葬
            eventCount: 2, //   操办次数
            eventDate: '', //   操办时间 格式示例 2016-08-27 00:00:00
            location: '', //    操办地点
            tableCount: '', //  操办桌数
            peopleCount: '', // 参加人数
            peopleRange: '', // 邀请范围
            carCount: '', //    用车数量
            carSource: '', //   用车来源
            attachmentFileCode: '', //  上传文件码
            selfPromise: ' ', //    本人承诺
            promisePeople: ' ', //  承诺人
            staffOrgId: 1 //    所属部门
        };
        $scope.confirm = function() {
            DeclareServe.submit($scope.declare)
                .then(function(data) {
                    console.log(data);
                    if (data.data.success) {
                        alert('成功');
                    }
                }, function(error) {
                    console.log(error);
                })
        };
    })
    // Declare申报页面控制结束

    // notifaction公开通报页面控制
    .controller('NotifCtrl', function($scope, $state, $timeout, NotifServe) {
        //获取列表params 对象
        $scope.listObj = {
            token: sessionStorage.getItem('token'), //  令牌
            page: 1,
            staff: '', //   被通报人姓名
            start: 0, //    从那个开始
            limit: 10 //    每页显示多少个
        };
        //刷新 搜索函数
        $scope.refresh = function() {
            $scope.search();
        }
        $scope.search = function() {
            NotifServe.list($scope.listObj)
                .then(function(data) {
                    console.log(data);
                    $scope.array = data.data;
                }, function(error) {
                    console.log(error);
                })
        };
        $scope.refresh();
        //新增通报 params
        $scope.addObj = {
            token: sessionStorage.getItem('token'), //  令牌
            title: '', //   标题
            content: '', // 内容
            staff: '', //   人员
            staffOrgId: 1 //    人员所属部门
        };
        //新增通报 添加函数
        $scope.add = function() {
            NotifServe.add($scope.addObj)
                .then(function(data) {
                    console.log(data);
                    if (data.data.success) {
                        $('#normalModal').modal('hide');
                        $scope.refresh();
                        swal({
                            title: "添加完成",
                            text: "",
                            timer: 1000,
                            type: "success",
                            showConfirmButton: false
                        });
                    };
                }, function(error) {
                    console.log(error);
                })
        };
        //删除通报 params
        $scope.delObj = {
            token: sessionStorage.getItem('token'), //  令牌
            id: '' //   通报id
        };
        //删除通报函数
        $scope.del = function() {
            console.log(this.value.id);
            //sweetalert
            swal({
                    title: "确定删除?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "删除",
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                function() {
                    NotifServe.del($scope.delObj)
                        .then(function(data) {
                            console.log(data);
                            if (data.data.success) {
                                // $('#normalModal').modal('hide');
                                swal("Deleted!", "", "success");
                                setTimeout(function() {
                                    swal.close();
                                }, 1000)
                                $scope.refresh();
                            };
                        }, function(error) {
                            console.log(error);
                        })
                });
            $scope.delObj.id = this.value.id;
        };
        //修改通报 params
        $scope.editObj = {
            token: sessionStorage.getItem('token'), //  令牌
            id: '', //  通报id
            title: '', //   标题
            content: '', // 内容
            staff: '', //   人员
            staffOrgId: 1 //    人员所属部门
        };
        //修改通报按钮函数
        $scope.edit = function() {
            console.log(this.value);
            if (this.value.id) {
                $scope.editObj.id = this.value.id;
            }
            if (this.value.title) {
                $scope.editObj.title = this.value.title;
            }
            if (this.value.content) {
                $scope.editObj.content = this.value.content;
            }
            if (this.value.staff) {
                $scope.editObj.staff = this.value.staff;
            }
            if (this.value.staffOrgId) {
                $scope.editObj.staffOrgId = this.value.staffOrgId;
            }
        };
        //修改通报确认按钮函数
        $scope.editConfirm = function() {
            NotifServe.edit($scope.editObj)
                .then(function(data) {
                    console.log(data);
                    if (data.data.success) {
                        $('#editModal').modal('hide');
                        $scope.refresh();
                        swal({
                            title: "修改完成",
                            text: "",
                            timer: 1000,
                            type: "success",
                            showConfirmButton: false
                        });
                    };
                }, function(error) {
                    console.log(error);
                })
        };
        //获取详情 params
        $scope.getObj = {
            token: sessionStorage.getItem('token'), //  令牌
            id: '' //  通报id
        };
        //双击列表获取详情
        $scope.get = function() {
        	$('#getModal').modal('show')
        	if (this.value.id) {
                $scope.getObj.id = this.value.id;
            }
            NotifServe.getById($scope.getObj)
                .then(function(data) {
                    console.log(data);
                    if (data.data.success) {
                        $scope.detailArr=data.data.result;
                        console.log(data);
                    };
                }, function(error) {
                    console.log(error);
                })
        };
        //下一页
        $scope.nextPage = function() {
            if ($scope.listObj.page < $scope.array.total / $scope.listObj.limit) {
                $scope.listObj.page++;
            }
        };
        //上一页
        $scope.prePage = function() {
            if ($scope.listObj.page > 1) {
                $scope.listObj.page--;
            }
        };
        //最后一页
        $scope.lastPage = function() {
            console.log(Math.floor($scope.array.total/$scope.listObj.limit));
            $scope.listObj.page=Math.floor($scope.array.total/$scope.listObj.limit)+1;
        };
        //监控页码变化.300ms后更新列表
        $scope.$watch('listObj.page', function(newValue) {
            $scope.listObj.start = $scope.listObj.limit * ($scope.listObj.page - 1);
            $timeout(function() {
                $scope.search();
                $scope.$apply()
            }, 300);
        });
    })
	//notifaction公开通报页面控制结束

	// punish纪律处分页面控制
    .controller('punishCtrl', function($scope, $state, $timeout, PunishServe) {
        //获取列表params 对象
        $scope.listObj = {
            token: sessionStorage.getItem('token'), //  令牌
            page: 1,
            staff: '', //   被通报人姓名
            start: 0, //    从那个开始
            limit: 10 //    每页显示多少个
        };
        //刷新 搜索函数
        $scope.refresh = function() {
            $scope.search();
        }
        $scope.search = function() {
            PunishServe.list($scope.listObj)
                .then(function(data) {
                    console.log(data);
                    $scope.array = data.data;
                }, function(error) {
                    console.log(error);
                })
        };
        $scope.refresh();
        //新增通报 params
        $scope.addObj = {
            token: sessionStorage.getItem('token'), //  令牌
            title: '', //   标题
            content: '', // 内容
            staff: '', //   人员
            staffOrgId: 1 //    人员所属部门
        };
        //新增通报 添加函数
        $scope.add = function() {
            PunishServe.add($scope.addObj)
                .then(function(data) {
                    console.log(data);
                    if (data.data.success) {
                        $('#normalModal').modal('hide');
                        $scope.refresh();
                        swal({
                            title: "添加完成",
                            text: "",
                            timer: 1000,
                            type: "success",
                            showConfirmButton: false
                        });
                    };
                }, function(error) {
                    console.log(error);
                })
        };
        //删除通报 params
        $scope.delObj = {
            token: sessionStorage.getItem('token'), //  令牌
            id: '' //   通报id
        };
        //删除通报函数
        $scope.del = function() {
            console.log(this.value.id);
            //sweetalert
            swal({
                    title: "确定删除?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "删除",
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                function() {
                    PunishServe.del($scope.delObj)
                        .then(function(data) {
                            console.log(data);
                            if (data.data.success) {
                                // $('#normalModal').modal('hide');
                                swal("Deleted!", "", "success");
                                setTimeout(function() {
                                    swal.close();
                                }, 1000)
                                $scope.refresh();
                            };
                        }, function(error) {
                            console.log(error);
                        })
                });
            $scope.delObj.id = this.value.id;
        };
        //修改通报 params
        $scope.editObj = {
            token: sessionStorage.getItem('token'), //  令牌
            id: '', //  通报id
            title: '', //   标题
            content: '', // 内容
            staff: '', //   人员
            staffOrgId: 1 //    人员所属部门
        };
        //修改通报按钮函数
        $scope.edit = function() {
            console.log(this.value);
            if (this.value.id) {
                $scope.editObj.id = this.value.id;
            }
            if (this.value.title) {
                $scope.editObj.title = this.value.title;
            }
            if (this.value.content) {
                $scope.editObj.content = this.value.content;
            }
            if (this.value.staff) {
                $scope.editObj.staff = this.value.staff;
            }
            if (this.value.staffOrgId) {
                $scope.editObj.staffOrgId = this.value.staffOrgId;
            }
        };
        //修改通报确认按钮函数
        $scope.editConfirm = function() {
            PunishServe.edit($scope.editObj)
                .then(function(data) {
                    console.log(data);
                    if (data.data.success) {
                        $('#editModal').modal('hide');
                        $scope.refresh();
                        swal({
                            title: "修改完成",
                            text: "",
                            timer: 1000,
                            type: "success",
                            showConfirmButton: false
                        });
                    };
                }, function(error) {
                    console.log(error);
                })
        };
        //获取详情 params
        $scope.getObj = {
            token: sessionStorage.getItem('token'), //  令牌
            id: '' //  通报id
        };
        //双击列表获取详情
        $scope.get = function() {
        	$('#getModal').modal('show')
        	if (this.value.id) {
                $scope.getObj.id = this.value.id;
            }
            PunishServe.getById($scope.getObj)
                .then(function(data) {
                    console.log(data);
                    if (data.data.success) {
                        $scope.detailArr=data.data.result;
                        console.log(data);
                    };
                }, function(error) {
                    console.log(error);
                })
        };
        //下一页
        $scope.nextPage = function() {
            if ($scope.listObj.page < $scope.array.total / $scope.listObj.limit) {
                $scope.listObj.page++;
            }
        };
        //上一页
        $scope.prePage = function() {
            if ($scope.listObj.page > 1) {
                $scope.listObj.page--;
            }
        };
        //最后一页
        $scope.lastPage = function() {
            console.log(Math.floor($scope.array.total/$scope.listObj.limit));
            $scope.listObj.page=Math.floor($scope.array.total/$scope.listObj.limit)+1;
        };
        //监控页码变化.300ms后更新列表
        $scope.$watch('listObj.page', function(newValue) {
            $scope.listObj.start = $scope.listObj.limit * ($scope.listObj.page - 1);
            $timeout(function() {
                $scope.search();
                $scope.$apply()
            }, 300);
        });
    })
	//punish纪律处分页面控制结束
	