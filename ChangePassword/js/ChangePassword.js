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

    // ������ҳ��
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
    // ����У��
    Verifiers: function () {
        // ��ȡ���������
        var OriginalPassword = $('.OriginalPassword').val();
        var NewPassWord = $('.NewPassWord').val();
        var ConfirmPassWord = $('.ConfirmPassWord').val();


        // �޸ĵ���¼�
        $('body').on('click', '.confirm', function () {

            // �ǿ�У��/�����ظ�У��
            if (OriginalPassword == '' || OriginalPassword == null || OriginalPassword == undefined) {
                layer.msg('������ԭ����')
            } else if (NewPassWord == '' || NewPassWord == null || NewPassWord == undefined) {
                layer.msg('������������');
            } else if (ConfirmPassWord == '' || ConfirmPassWord == null || ConfirmPassWord == undefined) {
                layer.msg('���ٴ���������');
            } else if (OriginalPassword == NewPassWord) {
                $('.NewWord').removeClass('hidden');
            } else if (NewPassWord != ConfirmPassWord) {
                $('.confirmWord').addClass('hidden');
                $('.wrongPassWord').removeClass('hidden');
            } else {
                // ��ȡ���˻��û���������
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
                                layer.msg('ԭ�����������');
                            } else {
                                // �޸���������
                                info.Change();
                            }
                        } else {
                            console.log('�������');
                        }
                    },
                    error(fil) {
                        console.log('����ʧ��');
                    }
                });
            }
        });
    },
    // �޸���������
    Change: function () {
        // �������޸�����
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
                    console.log('����ӿڳɹ�');
                    layer.msg('�޸ĳɹ���', function () {
                        window.location.href = "../../index.html";
                    });
                } else {
                    console.log('����ӿڴ���');
                }
            },
            error(fil) {
                console.log('����ӿ�ʧ��');
            }
        });
    }
};