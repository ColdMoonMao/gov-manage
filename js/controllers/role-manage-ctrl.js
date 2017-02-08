// rolemanage角色管理页面控制
angular.module('app.controllers')
    .controller('roleManageCtrl', function($scope, $state, $timeout, RoleManageServe) {
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
            RoleManageServe.list($scope.listObj)
                .then(function(data) {
                    //loading 效果
                    $.LoadingOverlay("hide");
                    console.log(data);
                    $scope.array = data.data;
                }, function(error) {
                    console.log(error);
                });
        };
        // $scope.refresh();
        //新增 params
        $scope.addObj = {
            token: sessionStorage.getItem('token'), //  令牌
            roleName: '', //    角色名
            functionCodes: ''
        };
        //新增 添加确认函数
        $scope.add = function() {
            if ($scope.addObj.roleName != '') {
                //拼接参数
                var functionCodesArr = []; //选中的CheckBox项code数组
                $('#addModal [type="checkbox"]').each(function(index, el) {
                    if (el.checked) {
                        functionCodesArr.push(el.title);
                    }
                });
                $scope.addObj.functionCodes = functionCodesArr.join('&functionCodes=');
                RoleManageServe.add($scope.addObj.token, $scope.addObj.roleName, $scope.addObj.functionCodes)
                    .then(function(data) {
                        console.log(data);
                        if (data.data.success) {
                            swal("添加成功!", "", "success");
                            setTimeout(function() {
                                swal.close();
                            }, 1000);
                            //清除选中状态
                            $('#addModal [type="checkbox"]').each(function(index, el) {
                                el.checked = false;
                            });
                            //提交状态重置
                            $scope.addFormSub.$submitted = false;
                            //关闭模态框
                            $('#addModal').modal('hide');
                            functionCodesArr = []; //成功后清除参数的对象
                            $scope.addObj.roleName = ''; //成功后清除参数的对象
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
                                    showLoaderOnConfirm: true
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
                        swal({
                            title: "添加失败",
                            text: "",
                            timer: 1000,
                            type: "warning",
                            showConfirmButton: false
                        });
                    });
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
                    showLoaderOnConfirm: true
                },
                function() {
                    RoleManageServe.del($scope.delObj)
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
                                        showLoaderOnConfirm: true
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
                });
        };

        //修改按钮函数 先获取角色信息
        $scope.edit = function() {
            var getObj = {
                token: sessionStorage.getItem('token'),
                roleId: this.value.id //角色ID
            };
            $scope.editObj.roleId = this.value.id; //下方editObj内roleId赋值
            $scope.editObj.roleName = this.value.name; //下方editObj内roleName赋值
            console.log(this.value);
            RoleManageServe.getById(getObj)
                .then(function(data) {
                    if (data.data.success) {
                        console.log(data.data.result.functions);
                        //获取角色code 数组getCodeArr
                        var getCodeArr = data.data.result.functions;
                        //获取到的角色 checked状态,同步到dom
                        $('#editModal [type="checkbox"]').each(function(index, element) {
                            getCodeArr.forEach(function(el, i) {
                                if (element.title == el.code) {
                                    element.checked = true;
                                }
                            });
                        });
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
                }, function(er) {
                    console.log(er);
                });
        };
        //修改 params
        $scope.editObj = {
            token: sessionStorage.getItem('token'), //  令牌
            roleName: '', //    角色名
            roleId: '',
            functionCodes: ''
        };
        //修改确认按钮函数
        $scope.editConfirm = function() {
            if (Boolean($scope.editObj.roleName)) {
                var functionCodesArr = []; //选中的CheckBox项code数组
                $('#editModal [type="checkbox"]').each(function(index, el) {
                    if (el.checked) {
                        functionCodesArr.push(el.title);
                    }
                });
                $scope.editObj.functionCodes = functionCodesArr.join('&functionCodes=');
                RoleManageServe.edit($scope.editObj.token, $scope.editObj.roleName, $scope.editObj.roleId, $scope.editObj.functionCodes)
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
                        swal({
                            title: "修改失败",
                            text: "",
                            timer: 1000,
                            type: "warning",
                            showConfirmButton: false
                        });
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
            if (event.target.innerText == '角色名') {
                $scope.exp = 'name';
                $scope.reverse = !$scope.reverse;
                $scope.isrotate = !$scope.isrotate;
            }
        };
    });
//rolemanage角色管理页面控制结束
