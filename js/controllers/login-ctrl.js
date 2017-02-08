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
