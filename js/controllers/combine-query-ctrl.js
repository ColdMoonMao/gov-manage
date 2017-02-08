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
