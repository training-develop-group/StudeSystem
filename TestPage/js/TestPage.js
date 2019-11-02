/**
 * @name: common
 * @author：MengXin
 */
$(function () {
    layui.use(['layer', 'form'], function () {
        var layer = layui.layer,
            form = layui.form;


        // 公共头调用渲染
        All.getMenu({
            num: 3
        });

        // 获取测试题内容
        info.getList();
    });
});

var answer = [];

var info = {
    //  todo  接口 ,获取页面试题
    getList:function(){



        // 单选事件
        info.radioChange();
        // 多选事件
        info.checkboxChange();
        // 提交试题内容
        info.setList();
    },
    // 单选事件
    radioChange: function () {
        $('body').delegate('.questionCard .radio_box li span', 'click', function () {
            $('.questionCard .radio_box li span').removeClass('active');
            $(this).addClass('active');
        });

        // 下一题点击事件
        info.nextChange();
        // 上一题点击事件
        info.previousChange();
        // 最后一题不显示下一题,第一题不显示上一题
        $('.questionCard_box .questionCard').last().find('.next').addClass('hidden');
        $('.questionCard_box .questionCard').first().find('.previous').addClass('hidden');
    },
    // 多选事件
    checkboxChange: function () {
        $('body').delegate('.questionCard .checkbox_box li span', 'click', function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
        });

        // 下一题点击事件
        info.nextChange();
        // 上一题点击事件
        info.previousChange();
        // 点击编号跳转试题
        info.cardChange();


    },
    // 下一题点击事件
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

            // todo 获取用户选择的值 添加到上方空数组中保存
        });

    },
    // 上一题点击事件
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

            // todo 获取用户选择的值 添加到上方空数组中保存
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
    // todo 下面是交卷的接口 ,将上方  answer[]  传给后台
    setList:function () {

    }
};