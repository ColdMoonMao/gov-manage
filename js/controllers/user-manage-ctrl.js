// usermanage用户管理页面控制
angular.module('app.controllers')
    .controller('userManageCtrl', function($scope, $state, $timeout, UserManageServe) {
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
        };
        $scope.search = function() {
            //loading 效果
            $.LoadingOverlay("show", {
                image: "img/oval.svg",
                bgcolor: 'rgba(28,43,54,0.7)'
            });
            UserManageServe.list($scope.listObj)
                .then(function(data) {
                    //loading 效果
                    $.LoadingOverlay("hide");
                    console.log(data);
                    $scope.array = data.data;
                    if (data.data.error) {
                        swal({
                                title: data.data.error.message,
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "确认",
                                closeOnConfirm: false,
                                cancelButtonText: "取消",
                                showLoaderOnConfirm: true,
                            },
                            function() {
                                swal("跳转……", "", "success");
                                setTimeout(function() {
                                    swal.close();
                                    $state.go('login');
                                }, 1000);
                            });
                    }
                }, function(error) {
                    console.log(error);
                });
        };
        // $scope.refresh();
        //新增 params
        $scope.addObj = {
            token: sessionStorage.getItem('token'), //  令牌
            orgId: 1, //    部门id
            username: '', //    用户名
            name: '', //    姓名
            password: '', //    密码
            roleId: 1 //   角色id
        };
        //获取部门列表
        var departObj = {
            token: sessionStorage.getItem('token'), //  令牌
        };
        //获取部门列表
        function getDepartList() {
            UserManageServe.depart(departObj)
                .then(function(data) {
                    console.log(data);
                    $scope.departArr = data.data.result;
                }, function(error) {
                    console.log(error);
                    getDepartList();

                });
        }
        getDepartList();

        //获取角色列表
        var roleObj = {
            token: sessionStorage.getItem('token'), //  令牌
            roleId: 0 //  当用户角色id
        };
        //获取角色列表
        function getRoleList() {
            UserManageServe.role(roleObj)
                .then(function(data) {
                    console.log(data);
                    $scope.roleArr = data.data.result;
                }, function(error) {
                    getRoleList();
                    console.log(error);
                });
        }
        getRoleList();
        //角色改变函数 添加和修改共用
        $scope.roleChange = function(value) {
            console.log(value);
            // $scope.addObj.roleId = value;
            // $scope.editObj.roleId = value;
            // console.log(value.id);
        };

        // //新增 addFun按钮函数
        // $scope.addFun = function() {

        // };
        //新增 添加确认函数
        $scope.add = function() {
            if ($scope.addObj.password != '' && $scope.addObj.username != '' && $scope.addObj.name != '') {
                if ($scope.addPasswordConfirm == $scope.addObj.password) {
                    UserManageServe.add($scope.addObj)
                        .then(function(data) {
                            console.log(data);
                            if (data.data.success) {
                                swal("添加成功!", "", "success");
                                setTimeout(function() {
                                    swal.close();
                                }, 1000);
                                $scope.refresh();
                                //提交状态重置
                                $scope.myForm.$submitted = false;
                                //关闭模态框
                                $('#addModal').modal('hide');
                                //清空上次添加内容
                                $scope.addObj.username = '';
                                $scope.addObj.name = '';
                                $scope.addObj.password = '';
                                $scope.addPasswordConfirm = '';
                            } else if (data.data.error) {
                                swal({
                                        title: data.data.error.message,
                                        type: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "确认",
                                        closeOnConfirm: false,
                                        cancelButtonText: "取消",
                                        showLoaderOnConfirm: true,
                                    },
                                    function() {
                                        swal("跳转……", "", "success");
                                        setTimeout(function() {
                                            swal.close();
                                            $state.go('login');
                                        }, 1000);
                                    });
                            } else {
                                swal("网络错误!", "", "warning");
                            }
                        }, function(error) {
                            console.log(error);
                        });
                } else {
                    swal({
                        title: '两次密码不一致',
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确认",
                        closeOnConfirm: true,
                        cancelButtonText: "取消"
                    });
                }
            }


        };
        //删除 params
        $scope.delObj = {
            token: sessionStorage.getItem('token'), //  令牌
            id: '' //   通报id
        };
        //删除函数
        $scope.del = function() {
            console.log(this.value.id);
            $scope.delObj.id = this.value.id;
            //sweetalert
            swal({
                    title: "确定删除?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "删除",
                    closeOnConfirm: false,
                    cancelButtonText: "取消",
                    showLoaderOnConfirm: true,
                },
                function() {
                    UserManageServe.del($scope.delObj)
                        .then(function(data) {
                            console.log(data);
                            if (data.data.success) {
                                // $('#normalModal').modal('hide');
                                swal({
                                    title: "已删除",
                                    type: "success",
                                    showConfirmButton: false
                                });
                                setTimeout(function() {
                                    swal.close();
                                }, 1000);
                                $scope.refresh();
                            } else if (data.data.error) {
                                swal({
                                        title: data.data.error.message,
                                        type: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "确认",
                                        closeOnConfirm: false,
                                        cancelButtonText: "取消",
                                        showLoaderOnConfirm: true,
                                    },
                                    function() {
                                        swal("跳转……", "", "success");
                                        setTimeout(function() {
                                            swal.close();
                                            $state.go('login');
                                        }, 1000);
                                    });
                            } else {
                                swal({
                                    title: "网络错误!",
                                    type: "warning",
                                    confirmButtonText: "确认"
                                });
                            }
                        }, function(error) {
                            console.log(error, '错误');
                            swal({
                                title: "网络错误!",
                                type: "warning",
                                confirmButtonText: "确认"
                            });
                        });
                });
        };
        //修改 params
        $scope.editObj = {
            token: sessionStorage.getItem('token'),//  令牌
            userId: '', //用户id
            orgId: 1, //	部门id
            name: '', //	姓名
            password: '', //	密码
            roleId: 1 //	角色id
        };
        //修改按钮函数
        $scope.edit = function() {
            console.log(this.value);
            //重置修改模态框提交状态
            $scope.editForm.$submitted=false;
            //调用接口读取用户信息
            UserManageServe.get({
                    token: sessionStorage.getItem('token'),
                    userId: this.value.id
                })
                .then(function(data) {
                    console.log(data);
                    $scope.editObj.roleId=data.data.result.role.id;
                    $scope.editObj.orgId=data.data.result.organization.id;
                }, function() {

                });
            if (this.value.name) {
                $scope.editObj.name = this.value.name;
            }
            if (this.value.id) {
                $scope.editObj.userId = this.value.id;
            }
            if (this.value.username) {
                $scope.editUsername = this.value.username;
            }
            $scope.editObj.password = '';
            $scope.editPasswordConfirm = '';
        };
        //修改确认按钮函数
        $scope.editConfirm = function() {
            if (Boolean($scope.editObj.name)) {
                if ($scope.editPasswordConfirm == $scope.editObj.password) {
                    UserManageServe.edit($scope.editObj)
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
                                //提交状态重置
                                $scope.editForm.$submitted = false;
                                //关闭模态框
                                $('#editModal').modal('hide');
                                //清空上次内容
                                $scope.editPasswordConfirm = '';
                            } else if (data.data.error) {
                                swal({
                                        title: data.data.error.message,
                                        type: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "确认",
                                        closeOnConfirm: false,
                                        cancelButtonText: "取消",
                                        showLoaderOnConfirm: true,
                                    },
                                    function() {
                                        swal("跳转……", "", "success");
                                        setTimeout(function() {
                                            swal.close();
                                            $state.go('login');
                                        }, 1000);
                                    });
                            } else {
                                swal("网络错误!", "", "warning");
                            }
                        }, function(error) {
                            console.log(error);
                            swal({
                                title: "修改失败",
                                text: "",
                                timer: 1000,
                                type: "warning",
                                showConfirmButton: false
                            });
                        });
                } else {
                    swal({
                        title: '两次密码不一致',
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确认",
                        closeOnConfirm: true,
                        cancelButtonText: "取消"
                    });
                }
            }

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
            console.log(Math.floor($scope.array.total / $scope.listObj.limit));
            $scope.listObj.page = Math.floor($scope.array.total / $scope.listObj.limit) + 1;
        };
        //监控页码变化.300ms后更新列表
        $scope.$watch('listObj.page', function(newValue) {
            $scope.listObj.start = $scope.listObj.limit * ($scope.listObj.page - 1);
            $timeout(function() {
                $scope.search();
                $scope.$apply();
            }, 300);
        });
        //排序
        $scope.orderFun = function() {
            if (event.target.innerText == '用户名') {
                $scope.exp = 'username';
                $scope.reverse = !$scope.reverse;
                $scope.isrotateusername = !$scope.isrotateusername;
            }
            if (event.target.innerText == '姓名') {
                $scope.exp = 'name';
                $scope.reverse = !$scope.reverse;
                $scope.isrotatename = !$scope.isrotatename;
            }
            if (event.target.innerText == '部门') {
                $scope.exp = 'orgName';
                $scope.reverse = !$scope.reverse;
                $scope.isrotateorgName = !$scope.isrotateorgName;
            }
        };
    });
//usermanage用户管理页面控制结束
