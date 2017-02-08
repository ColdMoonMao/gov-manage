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
