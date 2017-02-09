// approve审批页面控制
angular.module('app.controllers')
    .controller('approveCtrl', function($scope, $state, $timeout, ApproveServe) {
        $scope.userList = {
            token: sessionStorage.getItem('token'), //	令牌
            staff: '', //	申报人
            auditStatus: -1, //	审核状态 -1：待审核 1：通过 2：拒绝
            page: 1, //  当前页数
            start: 0, //	从第几个开始
            limit: 10, //	每页显示多少个


        };
        $scope.modList = {
            token: sessionStorage.getItem('token'), //	令牌
            eventId: '', //	申报人
            status: '1', //	审核状态 1：通过 2：拒绝
            // content: '' ,			//  审批意见内容
        };

        $scope.sureList = {
            token: sessionStorage.getItem('token'), //	令牌
            eventId: '', //	申报人id
            status: '1', //	审核状态 1：通过 2：拒绝
            content: '', //  审批意见内容
        };
        //改变审核状态
        $scope.selChange = function() {
            // console.log(event);
            console.log(event.target.selectedIndex);
            if (event.target.selectedIndex == 0) {
                $scope.userList.auditStatus = -1;
            } else {
                $scope.userList.auditStatus = event.target.selectedIndex;
            }

        };

        $scope.search = function() {
            $scope.refresh();
        };
        //刷新
        $scope.refresh = function() {
            //loading 效果
            $.LoadingOverlay("show", {
                image: "img/oval.svg",
                bgcolor: 'rgba(28,43,54,0.7)'
            });
            ApproveServe.userList($scope.userList)
                .then(function(data) {
                    //loading 效果
                    $.LoadingOverlay("hide");
                    console.log(data);

                    $scope.list = data.data.result;
                    $scope.array = data.data;

                }, function(error) {
                    // console.log(error);
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
                });
        };
        // $scope.refresh();

        //通过按钮函数
        $scope.pass = function(index) {
            $scope.sureList.content = '';
            console.log(index);
            $scope.index = index;
            $scope.id = $scope.list[index].id;
            // console.log($scope.id);
            $scope.modList.eventId = $scope.id;

            $scope.sureList.status = 1;
            ApproveServe.modList($scope.modList)
                .then(function(data) {
                    console.log(data);
                    if (data.data.result == null) {
                        $scope.sureList.content = '';
                    } else {
                        $scope.sureList.content = data.data.result.content;
                    }

                }, function(error) {
                    console.log(error);
                });
            // console.log(GlobalServe.token);
        };
        //通过模态框的确定函数
        $scope.sure = function() {
            // $('#myModal').modal('toggle');
            // console.log($scope.index)
            // $scope.list[$scope.index].auditStatus=1;
            //获取eventId
            $scope.id = $scope.list[$scope.index].id;
            $scope.sureList.eventId = $scope.id;
            $scope.sureList.status = '1';
            console.log($scope.sureList.eventId);
            //请求接口
            ApproveServe.sureList($scope.sureList)
                .then(function(data) {
                    console.log(data);
                    swal({
                        title: "审批成功",
                        text: "",
                        timer: 1000,
                        type: "success",
                        showConfirmButton: false
                    });

                    $scope.refresh();
                }, function(error) {
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
                    console.log(error);
                });
        };
        //拒绝按钮函数
        $scope.refuse = function(index) {
            $scope.sureList.content = '';
            console.log(index);
            $scope.index = index;
            $scope.id = $scope.list[index].id;
            // console.log($scope.id);
            $scope.modList.eventId = $scope.id;
            $scope.modList.status = 2;
            $scope.sureList.status = 2;
            console.log($scope.sureList.status);

            ApproveServe.modList($scope.modList)
                .then(function(data) {
                    console.log(data);
                    if (data.data.result == null) {
                        $scope.sureList.content = '';
                    } else {
                        $scope.sureList.content = data.data.result.content;
                    }

                }, function(error) {
                    console.log(error);
                });
        };
        //拒绝模态框确定函数
        $scope.refuseSure = function() {
            $scope.id = $scope.list[$scope.index].id;
            $scope.sureList.eventId = $scope.id;
            $scope.modList.status = 2;
            $scope.sureList.status = 2;
            console.log($scope.sureList.eventId);
            //请求接口
            console.log(123);
            console.log($scope.sureList.status);
            ApproveServe.sureList($scope.sureList)
                .then(function(data) {
                    console.log(data);
                    swal({
                        title: "审批成功",
                        text: "",
                        timer: 1000,
                        type: "success",
                        showConfirmButton: false
                    });

                    $scope.refresh();
                }, function(error) {
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
                    console.log(error);
                });

        };

        $scope.menuArr = [{
            name: '申报人',
            isrotate: true
        }, {
            name: '部门',
            isrotate: true
        }, {
            name: '类型',
            isrotate: true
        }, {
            name: '人数',
            isrotate: true
        }, {
            name: '申报时间',
            isrotate: true
        }, {
            name: '宴请时间',
            isrotate: true
        }, {
            name: '状态',
            isrotate: true
        }, {
            name: '操作',
            isrotate: true
        }];
        $scope.attrArr = ['staff', 'staffOrgName', 'eventType', 'peopleCount', 'createTime', 'eventDate', 'auditStatus', 'auditContent'];
        //排序
        $scope.orderToggle = function(index) {
            $scope.x = ($scope.x == "+" ? "-" : "+");
            $scope.attr = $scope.attrArr[index];
            $scope.menuArr.forEach(function(value, i, arr) {
                value.isrotate = i == index ? $scope.menuArr[index].isrotate : true;
            });
            $scope.menuArr[index].isrotate = !$scope.menuArr[index].isrotate;
        };

        //下一页
        $scope.nextPage = function() {
            if ($scope.userList.page < $scope.array.total / $scope.userList.limit) {
                $scope.userList.page++;
            }
        };
        //上一页
        $scope.prePage = function() {
            if ($scope.userList.page > 1) {
                $scope.userList.page--;
            }
        };
        //最后一页
        $scope.lastPage = function() {
            console.log(Math.floor($scope.array.total / $scope.userList.limit));
            $scope.userList.page = Math.floor($scope.array.total / $scope.userList.limit) + 1;
        };
        //监控页码变化.300ms后更新列表
        $scope.$watch('userList.page', function(newValue) {
            $scope.userList.start = $scope.userList.limit * ($scope.userList.page - 1);
            $timeout(function() {
                $scope.search();
                $scope.$apply();
            }, 300);
        });

    });
