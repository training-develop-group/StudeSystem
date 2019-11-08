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

        // 获取心得字数
        info.textNum();

        // 获取心得列表  todo 应该先判断是否需要显示心得列表
        info.getExperienceList();
    });
});

var answer = [];

var info = {
    //  todo  接口 ,获取页面试题
    getList: function () {
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
    cardChange: function () {
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
    setList: function () {

    },
    // 获取心得列表
    getExperienceList: function () {
        var time = new Date();
        var ExperienceList = [
            {
                experience: '今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么',
                cTime: time
            },
            {
                experience: '今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么',
                cTime: time
            },
            {
                experience: '今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么',
                cTime: time
            },
            {
                experience: '今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么',
                cTime: time
            },
            {
                experience: '今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么今天我学习了什么什么',
                cTime: time
            }
        ];
        if (ExperienceList || ExperienceList.length > 0) {
            var html = [];
            ExperienceList.forEach(function (item, index) {
                html.push('<li class="List">');
                html.push('    <p class="uName">这里是姓名</p>');
                html.push('    <p>' + item.experience + '</p>');
                html.push('    <p class="time"><span>2019/10/10</span><span>1:10</span></p>');
                html.push('</li>');
            });

            $('.experienceList').html(html.join(''));
            // 提交心得区域显示内容
            $('.addExperience').removeClass('hidden');


            // 分页插件
            info.Page(50,1);

            // 学习心得提交事件
            info.addExperience();
        }

    },
    // 学习心得提交事件
    addExperience: function () {
        $('.add').off('click').on('click', function () {
            // 这里替换了换行与回车
            var Experience = $('.textExperience').val().replace(/\n/g, "<br/>").replace(" ", "&nbsp;");
            var html = [
                '<li class="List">',
                '<p>' + Experience + '</p>',
                '<p class="time"><span>2019/10/10</span><span>1:10</span></p>',
                '</li>'
            ];
            $('.experienceList').append(html.join(''));

            // 清空内容和数字计数
            $('.textExperience').val('');
            var textNum = $('.textExperience').val().length;
            $('.textNum').text(textNum);
        });
    },
    // 获取心得字数
    textNum: function () {
        $('.textExperience').keyup(function () {
            var textNum = $('.textExperience').val().length;
            $('.textNum').text(textNum);
        })
    },
    // 分页插件
    Page: function (total, curr) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            //执行一个laypage实例
            laypage.render({
                elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
                count: total, //数据总数，从服务端得
                limit: '10',
                theme: '#1E9FFF',
                curr: curr,
                groups: '5',
                layout: ['prev', 'page', 'next', 'limits', 'skip'],
                jump: function (item, first) {
                    if (!first) {
                        console.log(item.curr);
                    }
                }
            });

        })
    },
};