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
