//公示页面控制
angular.module('app.controllers')
    .controller('publicityCtrl', function($scope, $state, $timeout, PublicityServe) {
        $scope.pubList = {
            token: sessionStorage.getItem('token'), //	令牌
            staff: '', //	申报人
            bulletinStatus: -1, //	公示状态 -1：未公示 1：已公示
            page: 1, //  当前页数
            start: 0, //	从第几个开始
            limit: 10, //	每页显示多少个


        };
        $scope.modList = {
            token: sessionStorage.getItem('token'), //	令牌
            eventId: '', //	申报人
            status: -1, //	公示状态 1：已公示 -1：未公示
            // content: '' ,			//  公示意见内容
        };

        $scope.sureList = {
            token: sessionStorage.getItem('token'), //	令牌
            eventId: '', //	申报人id
            status: 1, //	公示状态 1：公示内容 2：公示结果
            content: '', //  公示意见内容

        };

        //公示结果参数
        $scope.resultList = {
            token: sessionStorage.getItem('token'), //	令牌
            eventId: '', //	申报人
            // status: -1,		//	公示状态 1：已公示 -1：未公示
            // content: '' ,			//  公示意见内容
        };
        //公示结果确认参数
        $scope.resultSureList = {
            token: sessionStorage.getItem('token'), //	令牌
            eventId: '', //	申报人id
            status: 1, //1: 通过 2：有异议
            content: '', //  公示意见内容
            attachmentFileCode: '', //文件
        };

        //改变公示状态
        $scope.selChange = function() {
            // console.log(event);
            console.log(event.target.selectedIndex);
            if (event.target.selectedIndex == 0) {
                $scope.pubList.bulletinStatus = -1;
            } else {
                $scope.pubList.bulletinStatus = event.target.selectedIndex;
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
            PublicityServe.pubList($scope.pubList)
                .then(function(data) {
                    //loading 效果
                    $.LoadingOverlay("hide");
                    console.log(data);
                    $scope.bulle = data.config.params.bulletinStatus;
                    $scope.bulletinStatus = data.config.params.bulletinStatus;
                    // console.log($scope.bulle)
                    $scope.list = data.data.result;
                    $scope.arr = data.data;

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

        //公示内容按钮函数
        $scope.pass = function(index) {
            $scope.sureList.content = "";
            console.log(index);
            $scope.index = index;
            $scope.id = $scope.list[index].id;
            // console.log($scope.id);
            $scope.modList.eventId = $scope.id;


            PublicityServe.modList($scope.modList)
                .then(function(data) {
                    console.log(data);
                    $scope.bulletinStatus = $scope.bulletinStatus;
                    console.log($scope.bulletinStatus);
                    if ($scope.bulletinStatus == 1) {
                        $scope.sureList.content = data.data.result.content;
                        console.log($scope.sureList.content);
                        $scope.attachmentPath = data.data.result.attachmentPath;
                        if ($scope.attachmentPath == null) {
                            $scope.attachmentPath = "无";
                        }
                    }

                }, function(error) {
                    console.log(error);
                });
            // console.log(GlobalServe.token);
        };
        //公示内容模态框的确定函数
        $scope.sure = function() {
            if ($scope.sureList.content != '') {
                // $('#myModal').modal('toggle');
                // console.log($scope.index)
                // $scope.list[$scope.index].auditStatus=1;
                //获取eventId
                $scope.id = $scope.list[$scope.index].id;
                $scope.sureList.eventId = $scope.id;
                console.log($scope.sureList.eventId);
                $scope.sureList.content = $scope.sureList.content;

                //请求接口
                PublicityServe.sureList($scope.sureList)
                    .then(function(data) {
                        console.log(data);
                        swal({
                            title: "公示成功",
                            text: "",
                            timer: 1000,
                            type: "success",
                            showConfirmButton: false
                        });
                        $scope.refresh();

                        //提交状态重置
                        // $scope.myForm.$submitted = false;
                        //关闭模态框
                        $('#myModal').modal('hide');

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
            }
        };
        //公示结果按钮函数

        $scope.refuse = function(index) {
            $scope.resultSureList.content = "";
            // $scope.resultSureList.status = '1';


            console.log(index);
            $scope.index = index;
            $scope.id = $scope.list[index].id;
            // console.log($scope.id);

            $scope.resultList.eventId = $scope.id;


            $scope.resultSureList.content = $scope.resultSureList.content;
            $scope.resultSureList.status = $scope.resultSureList.status;
            PublicityServe.resultList($scope.resultList)
                .then(function(data) {
                    console.log(data);
                    if (data.data.result == null) {
                        $scope.resultSureList.content = "";
                        $scope.resultSureList.status = '1';
                    } else {
                        if (data.data.result.content == null) {
                            $scope.resultSureList.content = " ";
                        } else {
                            $scope.resultSureList.content = data.data.result.content;
                        }
                        if (data.data.result.status == 1) {

                        } else {
                            $scope.resultSureList.status = '2';
                        }
                    }

                }, function(error) {
                    console.log(error);
                });
        };
        //公示结果模态框确定函数

        $scope.del = function() {
            if ($scope.resultSureList.content != '') {
                //获取eventId
                $scope.id = $scope.list[$scope.index].id;
                $scope.resultSureList.eventId = $scope.id;
                console.log($scope.resultSureList.eventId);

                //请求接口
                PublicityServe.resultSureList($scope.resultSureList)

                .then(function(data) {
                    console.log(data);
                    swal({
                        title: "公示结果成功",
                        text: "",
                        timer: 1000,
                        type: "success",
                        showConfirmButton: false
                    });
                    $scope.refresh();
                    //提交状态重置
                    // $scope.myForm.$submitted = false;
                    //关闭模态框
                    $('#myModal1').modal('hide');

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
            }
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
            if ($scope.pubList.page < $scope.arr.total / $scope.pubList.limit) {
                $scope.pubList.page++;
            }
        };
        //上一页
        $scope.prePage = function() {
            if ($scope.pubList.page > 1) {
                $scope.pubList.page--;
            }
        };
        //最后一页
        $scope.lastPage = function() {
            console.log(Math.floor($scope.arr.total / $scope.pubList.limit));
            $scope.pubList.page = Math.floor($scope.arr.total / $scope.pubList.limit) + 1;
        };
        //监控页码变化.300ms后更新列表
        $scope.$watch('pubList.page', function(newValue) {
            $scope.pubList.start = $scope.pubList.limit * ($scope.pubList.page - 1);
            $timeout(function() {
                $scope.search();
                $scope.$apply();
            }, 300);
        });

    });
