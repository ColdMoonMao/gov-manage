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
            eventDate: '', //   操办时间 格式示例 2016-08-27 00:00:00
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
