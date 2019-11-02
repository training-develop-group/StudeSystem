/**
 * @name: common
 * @author��MengXin
 */
$(function () {
    layui.use(['layer', 'form'], function () {
        var layer = layui.layer,
            form = layui.form;


        // ����ͷ������Ⱦ
        All.getMenu({
            num: 3
        });

        // ��ȡ����������
        info.getList();
    });
});

var answer = [];

var info = {
    //  todo  �ӿ� ,��ȡҳ������
    getList:function(){



        // ��ѡ�¼�
        info.radioChange();
        // ��ѡ�¼�
        info.checkboxChange();
        // �ύ��������
        info.setList();
    },
    // ��ѡ�¼�
    radioChange: function () {
        $('body').delegate('.questionCard .radio_box li span', 'click', function () {
            $('.questionCard .radio_box li span').removeClass('active');
            $(this).addClass('active');
        });

        // ��һ�����¼�
        info.nextChange();
        // ��һ�����¼�
        info.previousChange();
        // ���һ�ⲻ��ʾ��һ��,��һ�ⲻ��ʾ��һ��
        $('.questionCard_box .questionCard').last().find('.next').addClass('hidden');
        $('.questionCard_box .questionCard').first().find('.previous').addClass('hidden');
    },
    // ��ѡ�¼�
    checkboxChange: function () {
        $('body').delegate('.questionCard .checkbox_box li span', 'click', function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
        });

        // ��һ�����¼�
        info.nextChange();
        // ��һ�����¼�
        info.previousChange();
        // ��������ת����
        info.cardChange();


    },
    // ��һ�����¼�
    nextChange: function () {
        $('.next').off('click').on('click', function () {
            var _thisQuestion = $(this).parents('.questionCard');
            _thisQuestion.addClass('hidden');
            _thisQuestion.next().removeClass('hidden');
            for (var i = 1; i <= $('.card li').length; i++) {
                if ($('.card li:nth-child(' + [i] + ')').attr('data-type') == _thisQuestion.attr('data-type')) {
                    $('.card li:nth-child(' + [i] + ')').removeClass('active');
                    $('.card li:nth-child(' + [i] + ')').next().addClass('active');
                }
            }

            // todo ��ȡ�û�ѡ���ֵ ��ӵ��Ϸ��������б���
        });

    },
    // ��һ�����¼�
    previousChange: function () {
        $('body').delegate('.previous', 'click', function () {
            var _thisQuestion = $(this).parents('.questionCard');
            _thisQuestion.addClass('hidden');
            _thisQuestion.prev().removeClass('hidden');

            for (var i = 1; i <= $('.card li').length; i++) {
                if ($('.card li:nth-child(' + [i] + ')').attr('data-type') == _thisQuestion.attr('data-type')) {
                    $('.card li:nth-child(' + [i] + ')').removeClass('active');
                    $('.card li:nth-child(' + [i] + ')').prev().addClass('active');
                }
            }

            // todo ��ȡ�û�ѡ���ֵ ��ӵ��Ϸ��������б���
        });
    },
    cardChange:function () {
        $('body').delegate('.card li', 'click', function () {
            $('.card li').removeClass('active');
            $(this).addClass('active');

            for (var i = 1; i <= $('.card li').length; i++) {
                if ($('.questionCard_box .questionCard:nth-child(' + [i] + ')').attr('data-type') == $(this).attr('data-type')) {
                    $('.questionCard_box .questionCard').addClass('hidden');
                    $('.questionCard_box .questionCard:nth-child(' + [i] + ')').removeClass('hidden');
                }
            }
        });
    },
    // todo �����ǽ���Ľӿ� ,���Ϸ�  answer[]  ������̨
    setList:function () {

    }
};