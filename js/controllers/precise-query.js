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
