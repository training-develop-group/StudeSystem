$(function () {

    layui.use(['layer', 'form'], function () {
        var layer = layui.layer,
            form = layui.form;
        All.getMenu({
            search: 2,
            type: 2
        });

        info.Back();
        info.Verifiers();
    });
});

var info = {

    // 返回主页面
    Back: function () {
        $('#Back').off('click').on('click', function () {
            layer.open({
                type: 1,
                title: ['', 'color:#fff;background-color:#279EF0;text-align: center; font-size: 20px;'],
                shadeClose: false,
                shade: 0.5,
                move: false,
                skin: 'myskin',
                area: ['450px', '140px'],
                content: $('.back'),
                success: function () {
                    $('.yes').off('click').on('click', function () {
                        window.location.href = "../HomePage/HomePage.html";
                    });
                    $('.no').off('click').on('click', function () {
                        layer.closeAll();
                    });
                },
            });
        });
    },
    // 密码校验
    Verifiers: function () {
        // 获取输入框内容
        var OriginalPassword = $('.OriginalPassword').val();
        var NewPassWord = $('.NewPassWord').val();
        var ConfirmPassWord = $('.ConfirmPassWord').val();


        // 修改点击事件
        $('body').on('click', '.confirm', function () {

            // 非空校验/密码重复校验
            if (OriginalPassword == '' || OriginalPassword == null || OriginalPassword == undefined) {
                layer.msg('请输入原密码')
            } else if (NewPassWord == '' || NewPassWord == null || NewPassWord == undefined) {
                layer.msg('请输入新密码');
            } else if (ConfirmPassWord == '' || ConfirmPassWord == null || ConfirmPassWord == undefined) {
                layer.msg('请再次输入密码');
            } else if (OriginalPassword == NewPassWord) {
                $('.NewWord').removeClass('hidden');
            } else if (NewPassWord != ConfirmPassWord) {
                $('.confirmWord').addClass('hidden');
                $('.wrongPassWord').removeClass('hidden');
            } else {
                // 获取现账户用户名和密码
                $.ajax({
                    url: LBUrl + '' + '1',
                    data: {
                        originalPassword: '123456'
                    },
                    dataType: '',
                    type: '',
                    success(res) {
                        if (res.code = 1) {
                            if (originalPassword != OriginalPassword) {
                                layer.msg('原密码输入错误');
                            } else {
                                // 修改密码请求
                                info.Change();
                            }
                        } else {
                            console.log('请求错误');
                        }
                    },
                    error(fil) {
                        console.log('请求失败');
                    }
                });
            }
        });
    },
    // 修改密码请求
    Change: function () {
        // 新密码修改请求
        $.ajax({
            url: LBUrl + '',
            data: {
                originalPassword: '123456',
                newPassWord: '456789',
                passwordValidation: '456789'
            },
            dataType: '',
            type: '',
            success(res) {
                if (res.code == 1) {
                    console.log('请求接口成功');
                    layer.msg('修改成功！', function () {
                        window.location.href = "../../index.html";
                    });
                } else {
                    console.log('请求接口错误');
                }
            },
            error(fil) {
                console.log('请求接口失败');
            }
        });
    }
};