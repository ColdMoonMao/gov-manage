// punish纪律处分页面控制
angular.module('app.controllers')
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
        };
        $scope.search = function() {
            //loading 效果
            $.LoadingOverlay("show", {
                image: "img/oval.svg",
                bgcolor: 'rgba(28,43,54,0.7)'
            });
            PunishServe.list($scope.listObj)
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
            if ($scope.addObj.title != '' && $scope.addObj.content != '' && $scope.addObj.staff != '') {
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
                            //清除上次填写内容
                            $scope.addObj = {
                                token: sessionStorage.getItem('token'), //  令牌
                                title: '', //   标题
                                content: '', // 内容
                                staff: '', //   人员
                                staffOrgId: 1 //    人员所属部门
                            };
                            //提交状态重置
                            $scope.myForm.$submitted = false;
                            //关闭模态框
                            $('#addModal').modal('hide');
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
                        }
                    }, function(error) {
                        console.log(error);
                    });
            }

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
                    cancelButtonText: "取消",
                    showLoaderOnConfirm: true,
                },
                function() {
                    PunishServe.del($scope.delObj)
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
                                swal("网络错误!", "", "warning");
                            }
                        }, function(error) {
                            console.log(error);
                        });
                });
            $scope.delObj.id = this.value.id;
        };
        //获取详情 params
        $scope.getObj = {
            token: sessionStorage.getItem('token'), //  令牌
            id: '' //  通报id
        };
        //双击列表获取详情
        $scope.get = function() {
            $('#getModal').modal('show');
            if (this.value.id) {
                $scope.getObj.id = this.value.id;
            }
            PunishServe.getById($scope.getObj)
                .then(function(data) {
                    console.log(data);
                    if (data.data.success) {
                        $scope.detailArr = data.data.result;
                        console.log(data);
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
                    }
                }, function(error) {
                    console.log(error);
                });
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
                $scope.getObj.id = this.value.id;
                $scope.editObj.id = this.value.id;
            }
            PunishServe.getById($scope.getObj)
                .then(function(data) {
                    console.log(data);
                    if (data.data.success) {
                        //获取修改内容详情
                        $scope.editObj.content = data.data.result.content;
                        $scope.editObj.title = data.data.result.title;
                        $scope.editObj.staff = data.data.result.staff;
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
                    }
                }, function(error) {
                    console.log(error);
                });
        };
        //修改通报确认按钮函数
        $scope.editConfirm = function() {
            if (Boolean($scope.editObj.title) && Boolean($scope.editObj.content) && Boolean($scope.editObj.staff)) {
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
                            //提交状态重置
                            $scope.editForm.$submitted = false;
                            //关闭模态框
                            $('#editModal').modal('hide');
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
                        }
                    }, function(error) {
                        console.log(error);
                    });
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
            if (event.target.innerText == '被通报人') {
                $scope.exp = 'staff';
                $scope.reverse = !$scope.reverse;
                $scope.isrotatestaff = !$scope.isrotatestaff;
            }
            if (event.target.innerText == '被通报人部门') {
                $scope.exp = 'staffOrgName';
                $scope.reverse = !$scope.reverse;
                $scope.isrotatestaffOrgName = !$scope.isrotatestaffOrgName;
            }
            if (event.target.innerText == '标题') {
                $scope.exp = 'title';
                $scope.reverse = !$scope.reverse;
                $scope.isrotatetitle = !$scope.isrotatetitle;
            }
            if (event.target.innerText == '时间') {
                $scope.exp = 'createTime';
                $scope.reverse = !$scope.reverse;
                $scope.isrotatecreateTime = !$scope.isrotatecreateTime;
            }
        };
    });
//punish纪律处分页面控制结束
