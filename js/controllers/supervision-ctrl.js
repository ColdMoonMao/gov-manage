//supervision监督页面控制
angular.module('app.controllers')
    .controller('supervisionCtrl', function($scope, $state, $timeout, SupervisionServe) {
        $scope.pubList = {
            token: sessionStorage.getItem('token'), //	令牌
            staff: '', //	申报人
            superviseStatus: -1, //	监督状态 -1：未监督 1：已监督
            page: 1, //  当前页数
            start: 0, //	从第几个开始
            limit: 10, //	每页显示多少个


        };
        $scope.modList = {
            token: sessionStorage.getItem('token'), //	令牌
            eventId: '', //	申报人
            status: -1, //	监督状态 -1：未监督 1：已监督
            // content: '' ,			//  监督报告
        };

        $scope.sureList = {
            token: sessionStorage.getItem('token'), //	令牌
            eventId: '', //	申报人id
            status: 1, //	监督状态 1：监督报告 2：违纪登记
            title: '', //标题
            content: '', //  监督报告
        };
        //违纪登记框接口参数
        $scope.registerList = {
            token: sessionStorage.getItem('token'), //	令牌
            eventId: '', //	申报人
            // status: -1,		//	监督状态 -1：未监督 1：已监督

        };
        //违纪登记确认参数
        $scope.registerSureList = {
            token: sessionStorage.getItem('token'), //	令牌
            eventId: '', //	申报人id
            // status: 1,					 //	监督状态 1：监督报告 2：违纪登记
            isCashGiftOutOfLimits: 0, // 礼金是否超标 0： 否 1：是
            isUsePublicCar: 0, // 使用公车 0： 否 1：是
            isUsePublicGoods: 0, // 使用公产0： 否 1：是
            isUsePublicAsserts: 0, // 使用公物 0： 否 1：是
            isUsePublicMoney: 0, // 使用公款 0： 否 1：是
            attachmentFileCode: '', // 附加文件
            otherQuestion: '', // 其他问题
            content: '', // 内容
        };
        //改变监督状态
        $scope.selChange = function() {
            // console.log(event);
            console.log(event.target.selectedIndex);
            if (event.target.selectedIndex == 0) {
                $scope.pubList.superviseStatus = -1;
            } else {
                $scope.pubList.superviseStatus = event.target.selectedIndex;
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
            SupervisionServe.pubList($scope.pubList)
                .then(function(data) {
                    //loading 效果
                    $.LoadingOverlay("hide");
                    console.log(data);
                    $scope.bulle = data.config.params.superviseStatus;
                    // console.log($scope.bulle)
                    $scope.list = data.data.result;
                    $scope.arr = data.data;
                    $scope.superviseStatus = data.config.params.superviseStatus;
                }, function(error) {
                    // console.log(error);
                });
            // console.log(GlobalServe.token);
        };
        // $scope.refresh();

        //监督报告按钮函数
        $scope.pass = function(index) {
            $scope.sureList.title = " ";
            $scope.sureList.content = " ";
            console.log(index);
            $scope.index = index;
            $scope.id = $scope.list[index].id;
            // console.log($scope.id);
            $scope.modList.eventId = $scope.id;

            $scope.superviseStatus = $scope.superviseStatus;
            SupervisionServe.modList($scope.modList)
                .then(function(data) {
                    console.log(data);

                    console.log($scope.superviseStatus);
                    if ($scope.superviseStatus == 1) {
                        $scope.sureList.title = data.data.result.title;
                        $scope.sureList.content = data.data.result.content;

                    } else {
                        $scope.sureList.title = " ";
                        $scope.sureList.content = " ";
                    }
                }, function(error) {
                    console.log(error);
                });
            // console.log(GlobalServe.token);
        };
        //监督报告模态框的确定函数
        $scope.sure = function() {
            // $('#myModal').modal('toggle');
            // console.log($scope.index)
            // $scope.list[$scope.index].auditStatus=1;
            //获取eventId
            $scope.id = $scope.list[$scope.index].id;
            $scope.sureList.eventId = $scope.id;
            console.log($scope.sureList.eventId);


            //请求接口
            SupervisionServe.sureList($scope.sureList)
                .then(function(data) {
                    console.log(data);
                    swal({
                        title: "监督报告成功",
                        text: "",
                        timer: 1000,
                        type: "success",
                        showConfirmButton: false
                    });
                    $scope.refresh();
                }, function(error) {
                    swal({
                        title: "登录授权过期",
                        text: "",
                        timer: 1000,
                        type: "error",
                        showConfirmButton: false
                    });
                    console.log(error);
                });
        };
        //违纪登记按钮函数
        $scope.refuse = function(index) {
            $scope.registerSureList.content = " ";
            $scope.registerSureList.otherQuestion = " ";
            $scope.registerSureList.isCashGiftOutOfLimits = "0";
            $scope.registerSureList.isUsePublicCar = "0";
            $scope.registerSureList.isUsePublicGoods = "0";
            $scope.registerSureList.isUsePublicAsserts = "0";
            $scope.registerSureList.isUsePublicMoney = "0";


            console.log(index);
            $scope.index = index;
            $scope.id = $scope.list[index].id;
            // console.log($scope.id);
            $scope.registerList.eventId = $scope.id;
            // $scope.sureList.status=2;
            $scope.registerSureList.otherQuestion = $scope.registerSureList.otherQuestion;
            $scope.registerSureList.content = $scope.registerSureList.content;
            SupervisionServe.registerList($scope.registerList)
                .then(function(data) {
                    console.log(data);
                    if (data.data.result != null) {
                        $scope.registerSureList.content = data.data.result.content;
                        $scope.registerSureList.otherQuestion = data.data.result.otherQuestion;
                        $scope.registerSureList.isCashGiftOutOfLimits = data.data.result.isCashGiftOutOfLimits;

                        if ($scope.registerSureList.isCashGiftOutOfLimits == true) {
                            $scope.registerSureList.isCashGiftOutOfLimits = '1';
                        } else {
                            $scope.registerSureList.isCashGiftOutOfLimits = '0';
                        }

                        if ($scope.registerSureList.isUsePublicAssets == true) {
                            $scope.registerSureList.isUsePublicAssets = '1';
                        } else {
                            $scope.registerSureList.isUsePublicAssets = '0';
                        }

                        if ($scope.registerSureList.isUsePublicCar == true) {
                            $scope.registerSureList.isUsePublicCar = '1';
                        } else {
                            $scope.registerSureList.isUsePublicCar = '0';
                        }

                        if ($scope.registerSureList.isUsePublicGoods == true) {
                            $scope.registerSureList.isUsePublicGoods = '1';
                        } else {
                            $scope.registerSureList.isUsePublicGoods = '0';
                        }

                        if ($scope.registerSureList.isUsePublicMoney == true) {
                            $scope.registerSureList.isUsePublicMoney = '1';
                        } else {
                            $scope.registerSureList.isUsePublicMoney = '0';
                        }

                    }

                }, function(error) {
                    console.log(error);
                });
        };
        //违纪登记模态框确定函数
        $scope.del = function() {
            $scope.id = $scope.list[$scope.index].id;
            $scope.registerSureList.eventId = $scope.id;
            console.log($scope.registerSureList.eventId);
            $scope.registerSureList.otherQuestion = $scope.registerSureList.otherQuestion;
            $scope.registerSureList.content = $scope.registerSureList.content;

            //请求接口
            SupervisionServe.registerSureList($scope.registerSureList)
                .then(function(data) {
                    console.log(data);
                    swal({
                        title: "违纪登记成功",
                        text: "",
                        timer: 1000,
                        type: "success",
                        showConfirmButton: false
                    });

                    $scope.refresh();
                }, function(error) {
                    swal({
                        title: "登录授权过期",
                        text: "",
                        timer: 1000,
                        type: "error",
                        showConfirmButton: false
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
