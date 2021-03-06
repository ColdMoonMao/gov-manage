angular.module('app.controllers', []);

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
                    if(data.data.success){
                        $scope.list = data.data.result;
                        $scope.array = data.data;
                    }else if(data.data.error){
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
                    // console.log(error);

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

//组合查询combinequery
angular.module('app.controllers')
    .controller('combineQueryCtrl', function($scope, $state, PreciseQueryServe) {

        $scope.token = sessionStorage.getItem("token");
        $scope.attrArr = ['staff', 'staffOrgName', 'eventType', 'peopleCount', 'createTime', 'eventDate', 'auditStatus', 'auditContent'];
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
            name: '批示意见',
            isrotate: true
        }];
        $scope.typeArr = [{
            type: '全部',
            key: '0'
        }, {
            type: '婚嫁',
            key: '1'
        }, {
            type: '丧葬',
            key: '2'
        }];
        $scope.peopleCountArr = [{
            countRange: "全部",
            countMin: "0",
            countMax: "0"
        }, {
            countRange: "0-50人",
            countMin: "0",
            countMax: "50"
        }, {
            countRange: "50-100人",
            countMin: "50",
            countMax: "100"
        }, {
            countRange: "100-150人",
            countMin: "100",
            countMax: "150"
        }, {
            countRange: "150-200人",
            countMin: "150",
            countMax: "200"
        }];
        //----日期选择插件设置
        jQuery.datetimepicker.setLocale('zh');
        jQuery('#createFromDatetimepicker').datetimepicker({
            timepicker: false,
            format: 'Y-m-d',
            closeOnDateSelect: true
                // onSelectDate: function(ct, $i) {
                //     $scope.CreateTimeFrom = ct.getFullYear()+"-"+(ct.getMonth()+1)+"-"+ct.getDate();
                //     console.log($scope.CreateTimeFrom);//split(""),双引号里需是本身自带的,表示以什么把字符串分开,空表示单个字符分开,
                // }
        });
        jQuery('#createToDatetimepicker').datetimepicker({
            timepicker: false,
            format: 'Y-m-d',
            closeOnDateSelect: true
                // onSelectDate: function(ct, $i) {
                //     $scope.CreateTimeTo = $('#createToDatetimepicker').val();
                //     console.log($('#createToDatetimepicker').val());
                // }
        });
        jQuery('#eventFormDatetimepicker').datetimepicker({
            timepicker: false,
            format: 'Y-m-d',
            closeOnDateSelect: true
                // onSelectDate: function(ct, $i) {
                //     $scope.TimeFrom = ct.toLocaleString().slice(0,9).split("/").join('-');
                // }
        });
        jQuery('#eventToDatetimepicker').datetimepicker({
            timepicker: false,
            format: 'Y-m-d',
            closeOnDateSelect: true
                // onSelectDate: function(ct, $i) {
                //     $scope.TimeTo = ct.toLocaleString().slice(0,9).split("/").join('-');
                // }
        });
        //日期选择插件设置end-----
        $scope.combineSearch = function() {
            $scope.CreateTimeFrom = $('#createFromDatetimepicker').val();
            $scope.CreateTimeTo = $('#createToDatetimepicker').val();
            $scope.TimeFrom = $('#eventFormDatetimepicker').val();
            $scope.TimeTo = $('#eventToDatetimepicker').val();
            $scope.combinequeryobj = {
                token: $scope.token, //令牌
                page: 1, //当前页
                start: 0, //从哪个开始
                limit: 10, //每页显示多少个
                eventType: $scope.typeSelect.key, //申报类型,全部:0,婚嫁:1,丧葬:2
                peopleCountMin: $scope.peopleCountSelect.countMin, //最少宴请人数
                peopleCountMax: $scope.peopleCountSelect.countMax, //最大宴请人数
                eventCreateTimeFrom: $scope.CreateTimeFrom, //申报开始时间
                eventCreateTimeTo: $scope.CreateTimeTo, //申报结束时间
                eventTimeFrom: $scope.TimeFrom, //宴请开始时间
                eventTimeTo: $scope.TimeTo, //宴请结束时间
            };
            //loading 效果
            $.LoadingOverlay("show", {
                image: "img/oval.svg",
                bgcolor: 'rgba(28,43,54,0.7)'
            });
            PreciseQueryServe.Preciselist($scope.combinequeryobj)
                .then(function(data) {
                    //loading 效果
                    $.LoadingOverlay("hide");
                    console.log(data);
                    if (data.data.success) {
                        $scope.combineArr = data.data.result;
                        $scope.pagearr = [];
                        for (var i = 0; i < Math.ceil(data.data.result.length / 10); i++) {
                            $scope.pagearr.push({
                                index: i,
                                iscurrent: i == 0 ? true : false
                            });
                        }
                        Page();
                    } else if (data.data.error.code) {
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
        //排序
        $scope.orderToggle = function(index) {
            $scope.x = ($scope.x == "+" ? "-" : "+");
            $scope.attr = $scope.attrArr[index];
            $scope.menuArr.forEach(function(value, i, arr) {
                value.isrotate = i == index ? $scope.menuArr[index].isrotate : true;
            });
            $scope.menuArr[index].isrotate = !$scope.menuArr[index].isrotate;
        };
        //分页
        function Page() {
            $scope.start = 1;
            $scope.changePage = function($index) {
                $scope.start = ($scope.start < 3 ? 3 : $scope.start > $scope.pagearr.length - 2 ? $scope.pagearr.length - 2 : $scope.start) + ($index - 2);
                $scope.pagearr.forEach(function(value, i, arr) {
                    value.iscurrent = false;
                });
                $scope.pagearr[$scope.start - 1].iscurrent = true;
                console.log($scope.start);

            };
            $scope.previous = function() {
                if ($scope.start > 1) {
                    $scope.pagearr.forEach(function(value, i, arr) {
                        value.iscurrent = false;
                    });
                    $scope.start--;
                    $scope.pagearr[$scope.start - 1].iscurrent = true;
                    console.log($scope.start);
                }
            };
            $scope.next = function() {
                if ($scope.start < $scope.pagearr.length) {
                    $scope.pagearr.forEach(function(value, i, arr) {
                        value.iscurrent = false;
                    });
                    $scope.start++;
                    $scope.pagearr[$scope.start - 1].iscurrent = true;
                    console.log($scope.start);

                }
            };
        }
        // 跳转到页面先执行一次,延迟0.5秒执行,否则会下拉框选择内容没加载
        setTimeout(function() {
            $scope.combineSearch();
        }, 500);


    });

// Declare申报页面控制
angular.module('app.controllers')
    .controller('declareCtrl', function($scope, $state, DeclareServe) {
        //与申报人关系ng-change索引值
        $scope.staffRelationshipIndex = function() {
            // console.log(event);
            $scope.declare.staffRelationship = (event.target.selectedIndex + 1);
            console.log($scope.declare.staffRelationship);
        };
        //单位职务ng-change索引值
        $scope.staffJobIndex = function() {
            // console.log(event);
            $scope.declare.staffJob = (event.target.selectedIndex + 1);
            console.log($scope.declare.staffJob);
        };
        //操办事项ng-change索引值
        $scope.eventTypeIndex = function() {
            // console.log(event);
            $scope.declare.eventType = (event.target.selectedIndex + 1);
            console.log($scope.declare.eventType);
        };
        //所属部门ng-change索引值
        $scope.staffOrgIdIndex = function() {
            // console.log(event);
            $scope.declare.staffOrgId = (event.target.selectedIndex + 1);
            console.log($scope.declare.staffOrgId);
        };
        $scope.declare = {
            token: sessionStorage.getItem('token'),
            staff: '', //  申报人
            staffRelationship: 1, //    与申报人关系 1:本人 2:直系亲属
            staffPoliticalStatus: '', //    政治面貌
            staffJob: 1, // 单位职务 1：县级党员干部 2：科级党员干部 3：社区基层干部 4：一般工作人员
            staffSpouse: ' ', //    配偶
            staffPhone: '', //  联系电话
            eventType: 1, //    操办事项 1：婚嫁 2：丧葬
            eventCount: 2, //   操办次数
            eventDate: new Date(), //   操办时间 格式示例 2016-08-27 00:00:00
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
        //确认申报按钮
        $scope.confirm = function() {
            //表单验证,必填项不能为空
            if ($scope.declare.staff != '' && $scope.declare.staffPhone != '' && $scope.declare.location != '' && $scope.declare.carSource != '') {
                //loading 效果
                $.LoadingOverlay("show", {
                    image: "img/oval.svg",
                    bgcolor: 'rgba(28,43,54,0.7)'
                });
                //上传文件
                DeclareServe.upload($scope.declare.attachmentFileCode)
                    .then(function(data) {
                        console.log(data, '文件');
                    }, function(er) {
                        console.log(er, '文件 er');
                    });
                DeclareServe.submit($scope.declare)
                    .then(function(data) {
                        //loading 效果
                        $.LoadingOverlay("hide");
                        console.log(data);
                        if (data.data.success) {
                            swal({
                                title: "成功",
                                text: "",
                                timer: 1000,
                                type: "success",
                                showConfirmButton: false
                            });
                            //清除填写状态
                            $scope.declare.staff = '';
                            $scope.declare.staffPhone = '';
                            $scope.declare.location = '';
                            $scope.declare.carSource = '';
                            $scope.myForm.$submitted = false;
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
        //----日期选择插件设置
        jQuery.datetimepicker.setLocale('zh');
        jQuery('#datetimepicker').datetimepicker({
            timepicker: false,
            format: 'Y-m-d',
            closeOnDateSelect: true,
            value: new Date(),
            onSelectDate: function(ct, $i) {
                // alert(ct.dateFormat('d/m/Y'))
                $scope.declare.eventDate = ct;
                // console.log(arguments);
            }
        });
        jQuery('#datetimepickerIcon').click(function() {
            jQuery('#datetimepicker').datetimepicker('show'); //support hide,show and destroy command
        });
        //日期选择插件设置end-----
    });
// Declare申报页面控制结束

// login 登录页面控制
angular.module('app.controllers')
    .controller('loginCtrl', function($scope, $state, LoginServe) {
        $scope.user = {
            username: '',
            password: ''
        };
        $scope.login = function() {
            //loading 效果
            $.LoadingOverlay("show", {
                image: "img/oval.svg",
                bgcolor: 'rgba(28,43,54,0.7)'
            });
            LoginServe.login($scope.user)
                .then(function(data) {
                        //loading 效果
                        $.LoadingOverlay("hide");
                        if (data.data.result) {
                            console.log(arguments);
                            // console.log(data.data.result.token);
                            sessionStorage.setItem('token', data.data.result.token);
                            sessionStorage.setItem('userInfo', JSON.stringify(data.data.result.user));
                            if (data.data.result.token) {
                                $state.go('main');
                            }
                        } else {
                            swal({
                                title: "用户名或密码错误",
                                type: "warning",
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "确定",
                                closeOnConfirm: true,
                                cancelButtonText: "取消"
                            });

                        }
                    },
                    function(error) {
                        console.log(error);
                    });
        };
        $scope.bg = function() {
            LoginServe.bg({
                    w: 1920,
                    h: 1080
                })
                .then(function(data) {
                    console.log(data, 'success');
                }, function(er) {
                    console.log(er, 'error');
                });
        };
        // $scope.bg();
        //登录背景图片获取
        $.ajax({
                url: 'http://bing.ioliu.cn/v1/rand',
                type: 'GET',
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: 'data',
                data: {
                    w: 1920,
                    h: 1080
                }
            })
            .done(function() {
                console.log(arguments, "success");
                $scope.bgiSet = "url('" + arguments["0"].data.url + "')";
                // $('#bgsetEl').css('backgroudImage',"url('" + arguments["0"].data.url + "')");
                // document.body.style.backgroundImage = "url('" + arguments["0"].data.url + "')";
            })
            .fail(function() {
                console.log("error");
            });

    });

//main 主页面控制
angular.module('app.controllers')
    .controller('mainCtrl', function($scope, $state) {
        //获取用户信息
        $scope.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        console.log($scope.userInfo);
        //退出登录
        $scope.logout = function() {

            //sweetalert
            swal({
                    title: "确认退出?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "退出",
                    closeOnConfirm: false,
                    cancelButtonText: "取消",
                    showLoaderOnConfirm: true,
                },
                function() {
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('userInfo');
                    swal("退出!", "", "success");
                    setTimeout(function() {
                        swal.close();
                        $state.go('login');
                    }, 1000);
                });
        };
        //控制侧边栏折叠,头部隐藏显示
        $(function() {

            //控制侧边栏折叠
            $('.sidebar-menu .openable > a').click(function() {

                if (!$('aside').hasClass('sidebar-mini') || Modernizr.mq('(max-width: 991px)')) {
                    if ($(this).parent().children('.submenu').is(':hidden')) {
                        $(this).parent().siblings().removeClass('open').children('.submenu').slideUp(200);
                        $(this).parent().addClass('open').children('.submenu').slideDown(200);
                    } else {
                        $(this).parent().removeClass('open').children('.submenu').slideUp(200);
                    }
                }
                return false;

            });

            //Open active menu
            if (!$('.sidebar-menu').hasClass('sidebar-mini') || Modernizr.mq('(max-width: 767px)')) {
                $('.openable.open').children('.submenu').slideDown(200);
            }

            //顶部三杠按钮切换侧边栏隐藏显示
            $('#sidebarToggleLG').click(function() {
                if ($('.wrapper').hasClass('display-right')) {
                    $('.wrapper').removeClass('display-right');
                    $('.sidebar-right').removeClass('active');
                } else {
                    //$('.nav-header').toggleClass('hide');
                    $('.top-nav').toggleClass('sidebar-mini');
                    $('aside').toggleClass('sidebar-mini');
                    $('footer').toggleClass('sidebar-mini');
                    $('.main-container').toggleClass('sidebar-mini');

                    $('.main-menu').find('.openable').removeClass('open');
                    $('.main-menu').find('.submenu').removeAttr('style');
                }
            });

            $('#sidebarToggleSM').click(function() {
                $('aside').toggleClass('active');
                $('.wrapper').toggleClass('display-left');
            });
        });
    });

// notifaction公开通报页面控制
angular.module('app.controllers')
    .controller('notifCtrl', function($scope, $state, $timeout, NotifServe) {
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
            NotifServe.list($scope.listObj)
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
        // $scope.search();
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
                //loading 效果
                $.LoadingOverlay("show", {
                    image: "img/oval.svg",
                    bgcolor: 'rgba(28,43,54,0.7)'
                });
                NotifServe.add($scope.addObj)
                    .then(function(data) {
                        //loading 效果
                        $.LoadingOverlay("hide");
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
                            //添加成功后清除添加模态框中内容
                            $scope.addObj = {
                                token: sessionStorage.getItem('token'), //  令牌
                                title: '', //   标题
                                content: '', // 内容
                                staff: '', //   人员
                                staffOrgId: 1 //    人员所属部门
                            };
                            //提交状态重置
                            $scope.addForm.$submitted = false;
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
                    NotifServe.del($scope.delObj)
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
            NotifServe.getById($scope.getObj)
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
            NotifServe.getById($scope.getObj)
                .then(function(data) {
                    if (data.data.success) {
                        //获取修改内容详情
                        $scope.editObj.content = data.data.result.content;
                        $scope.editObj.title = data.data.result.title;
                        $scope.editObj.staff = data.data.result.staff;
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
        //修改通报确认按钮函数
        $scope.editConfirm = function() {
            if (Boolean($scope.editObj.title) && Boolean($scope.editObj.content) && Boolean($scope.editObj.staff)) {
                NotifServe.edit($scope.editObj)
                    .then(function(data) {
                        console.log(data);
                        if (data.data.success) {
                            $scope.refresh();
                            swal({
                                title: "修改完成",
                                text: "",
                                timer: 1000,
                                type: "success",
                                showConfirmButton: false
                            });
                            //提交状态重置
                            $scope.myForm.$submitted = false;
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
//notifaction公开通报页面控制结束

//精确查询precisequery
angular.module('app.controllers')
    .controller('preciseQueryCtrl', function($scope, $state, PreciseQueryServe) {
        $scope.organizArr = [{
            organiz: '根组织',
            key: '1'
        }];
        $scope.token = sessionStorage.getItem("token");
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
            name: '批示意见',
            isrotate: true
        }];
        $scope.attrArr = ['staff', 'staffOrgName', 'eventType', 'peopleCount', 'createTime', 'eventDate', 'auditStatus', 'auditContent'];
        console.log($scope.token);
        $scope.preciseSearch = function() {
            $scope.precisequeryobj = {
                token: $scope.token, //令牌
                staff: $scope.staff, //申报人
                page: 1, //当前页
                start: 0, //从哪个开始
                limit: 10, //每页显示多少个
                staffOrgId: 1 //所属部门(根组织)
            };
            //loading 效果
            $.LoadingOverlay("show", {
                image: "img/oval.svg",
                bgcolor: 'rgba(28,43,54,0.7)'
            });
            PreciseQueryServe.Preciselist($scope.precisequeryobj)
                .then(function(data) {
                    //loading 效果
                    $.LoadingOverlay("hide");
                    console.log(data);
                    if (data.data.success) {
                        $scope.preciseArr = data.data.result;
                        $scope.pagearr = [];
                        for (var i = 0; i < Math.ceil(data.data.result.length / 10); i++) {
                            $scope.pagearr.push({
                                index: i,
                                iscurrent: i == 0 ? true : false
                            });
                        }
                        Page();
                    } else if (data.data.error.code) {
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
        $scope.preciseSearch();
        //排序
        $scope.orderToggle = function(index) {
            $scope.x = ($scope.x == "+" ? "-" : "+");
            $scope.attr = $scope.attrArr[index];
            $scope.menuArr.forEach(function(value, i, arr) {
                value.isrotate = i == index ? $scope.menuArr[index].isrotate : true;
            });
            $scope.menuArr[index].isrotate = !$scope.menuArr[index].isrotate;
        };

        function Page() {
            $scope.start = 1;
            $scope.changePage = function($index) {
                $scope.start = ($scope.start < 3 ? 3 : $scope.start > $scope.pagearr.length - 2 ? $scope.pagearr.length - 2 : $scope.start) + ($index - 2);
                $scope.pagearr.forEach(function(value, i, arr) {
                    value.iscurrent = false;
                });
                $scope.pagearr[$scope.start - 1].iscurrent = true;
                console.log($scope.start);

            };
            $scope.previous = function() {
                if ($scope.start > 1) {
                    $scope.pagearr.forEach(function(value, i, arr) {
                        value.iscurrent = false;
                    });
                    $scope.start--;
                    $scope.pagearr[$scope.start - 1].iscurrent = true;
                    console.log($scope.start);
                }
            };
            $scope.next = function() {
                if ($scope.start < $scope.pagearr.length) {
                    $scope.pagearr.forEach(function(value, i, arr) {
                        value.iscurrent = false;
                    });
                    $scope.start++;
                    $scope.pagearr[$scope.start - 1].iscurrent = true;
                    console.log($scope.start);

                }
            };
        }

    });

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
                    if(data.data.success){
                        $scope.bulle = data.config.params.bulletinStatus;
                        $scope.bulletinStatus = data.config.params.bulletinStatus;
                        // console.log($scope.bulle)
                        $scope.list = data.data.result;
                        $scope.arr = data.data;
                    }else if(data.data.error){
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
                    // console.log(error);

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

//数量统计
angular.module('app.controllers')
    .controller('statisticCtrl', function($scope, $state, StatisticServe) {
        //----日期选择插件设置
        jQuery.datetimepicker.setLocale('zh');
        jQuery('#createFromDatetimepicker').datetimepicker({
            timepicker: false,
            format: 'Y-m-d',
            closeOnDateSelect: true
                // onSelectDate: function(ct, $i) {
                //     $scope.CreateTimeFrom = ct.toLocaleString().slice(0,9).split("/").join('-');
                // }
        });
        jQuery('#createToDatetimepicker').datetimepicker({
            timepicker: false,
            format: 'Y-m-d',
            closeOnDateSelect: true
                // onSelectDate: function(ct, $i) {
                //    $scope.CreateTimeTo = ct.toLocaleString().slice(0,9).split("/").join('-');
                // }
        });
        jQuery('#eventFormDatetimepicker').datetimepicker({
            timepicker: false,
            format: 'Y-m-d',
            closeOnDateSelect: true
                // onSelectDate: function(ct, $i) {
                //     $scope.TimeFrom = ct.toLocaleString().slice(0,9).split("/").join('-');
                // }
        });
        jQuery('#eventToDatetimepicker').datetimepicker({
            timepicker: false,
            format: 'Y-m-d',
            closeOnDateSelect: true
                // onSelectDate: function(ct, $i) {
                //    $scope.TimeTo = ct.toLocaleString().slice(0,9).split("/").join('-');
                // }
        });
        //日期选择插件设置end-----
        $scope.token = sessionStorage.getItem("token");
        console.log($scope.token);
        $scope.statisticSearch = function() {
            $scope.CreateTimeFrom = $('#createFromDatetimepicker').val();
            $scope.CreateTimeTo = $('#createToDatetimepicker').val();
            $scope.TimeFrom = $('#eventFormDatetimepicker').val();
            $scope.TimeTo = $('#eventToDatetimepicker').val();
            $scope.statisticobj = {
                token: $scope.token, //令牌
                eventCreateTimeFrom: $scope.CreateTimeFrom, //申报开始时间
                eventCreateTimeTo: $scope.CreateTimeTo, //申报结束时间
                eventTimeFrom: $scope.TimeFrom, //宴请开始时间
                eventTimeTo: $scope.TimeTo //宴请结束时间
            };
            //loading 效果
            $.LoadingOverlay("show", {
                image: "img/oval.svg",
                bgcolor: 'rgba(28,43,54,0.7)'
            });
            StatisticServe.statisticlist($scope.statisticobj)
                .then(function(data) {
                    //loading 效果
                    $.LoadingOverlay("hide");
                    console.log(data);
                    if (data.data.success) {
                        $scope.statisticArr = data.data.result[0];
                        chart();
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
        $scope.statisticSearch();

        function chart() {
            var myChart = echarts.init(document.getElementById('chart'));
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '类型数量统计'
                },
                color: ['#3398DB'],
                tooltip: {},
                legend: {
                    data: ['人数', '类型']
                },
                xAxis: {
                    data: ["婚嫁", "丧葬"]
                },
                yAxis: {},
                series: [{
                    name: '人数',
                    type: 'bar',
                    data: [$scope.statisticArr.type1Count, $scope.statisticArr.type2Count]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    });

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
                    if(data.data.success){
                        $scope.bulle = data.config.params.superviseStatus;
                        // console.log($scope.bulle)
                        $scope.list = data.data.result;
                        $scope.arr = data.data;
                        $scope.superviseStatus = data.config.params.superviseStatus;
                    }else if(data.data.error){
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
                    // console.log(error);
                });

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
                        $scope.registerSureList.isUsePublicCar = data.data.result.isUsePublicCar;
                        $scope.registerSureList.isUsePublicGoods = data.data.result.isUsePublicGoods;
                        $scope.registerSureList.isUsePublicMoney = data.data.result.isUsePublicMoney;
                        $scope.registerSureList.isUsePublicAsserts = data.data.result.isUsePublicAsserts;

                        if ($scope.registerSureList.isCashGiftOutOfLimits == true) {
                            $scope.registerSureList.isCashGiftOutOfLimits = '1';
                        } else {
                            $scope.registerSureList.isCashGiftOutOfLimits = '0';
                        };

                        if ($scope.registerSureList.isUsePublicCar == true) {
                            $scope.registerSureList.isUsePublicCar ='1';
                        } else {
                            $scope.registerSureList.isUsePublicCar = '0';
                        };

                        if ($scope.registerSureList.isUsePublicGoods == true) {
                            $scope.registerSureList.isUsePublicGoods = '1';
                        } else {
                            $scope.registerSureList.isUsePublicGoods = '0';
                        };

                        if ($scope.registerSureList.isUsePublicMoney == true) {
                            $scope.registerSureList.isUsePublicMoney = '1';
                        } else {
                            $scope.registerSureList.isUsePublicMoney = '0';
                        };
                        if ($scope.registerSureList.isUsePublicAsserts == true) {
                            $scope.registerSureList.isUsePublicAsserts = '1';
                        } else {
                            $scope.registerSureList.isUsePublicAsserts = '0';
                        };

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
