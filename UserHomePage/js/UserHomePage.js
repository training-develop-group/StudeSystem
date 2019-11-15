/**
 * @name: UserHomePage
 * @author：MengXin
 */
$(function () {
    layui.use(['layer', 'form'], function () {
        var layer = layui.layer,
            form = layui.form;


        // 公共头调用渲染
        All.getMenu({
            search: 2,
            type: 2
        });


        //卡片切换
        info.tabChange();
        // 模拟未完成被选中
        $('.title li').eq(0).click();


    });
});
var info = {
    //卡片切换
    tabChange: function () {
        $('.title li').off('click').on('click', function () {
            $('.title li').removeClass('active');
            $(this).addClass('active');
            var dataType = $(this).attr('data-type');
            info.taskList(1, dataType);
        });
    },
    // 页面列表
    taskList: function (curr, userType) {
        var status = $('.active').attr('data-type');
        $.ajax({
            url: LBUrl + 'manage_system/task/tasks',
            data: {
                "pageNum": curr,
                "pageSize": 5,
                'status': status,
                'taskName': null,
                'userType': userType
            },
            dataType: 'json',
            type: 'GET',
            success(res) {
                console.log(res)
                var time = new Date();
                if (res.data != null) {
                    var listHtml = [];
                    // console.log(res)
                    res.data.list.forEach(function (item, index) {
                        listHtml.push('<li class="clearfix ToTask" data-id="' + item.taskId + '" data-type="' + item.taskType + '" data-paperId="' + item.paperId + '" data-resId="' + item.resId + '">');
                        listHtml.push('<div class="leftBox">');
                        if (item.taskType == 1) {
                            listHtml.push('<div class="imgBox "  style="border: 1px solid #0aae47;">');
                            listHtml.push('<img src="../imgs/sp2.png" height="50px" alt="任务图片"/>');

                        } else if (item.taskType == 2) {
                            listHtml.push('<div class="imgBox " style="border: 1px solid #42b0fe;">');
                            listHtml.push('<img src="../imgs/sp1.png" height="50px" alt="任务图片"/>');
                        } else if (item.taskType == 3) {
                            listHtml.push('<div class="imgBox "  style="border: 1px solid #fe9540;">');
                            listHtml.push('<img src="../imgs/sp3.png" height="50px" alt="任务图片"/>');
                        }

                        listHtml.push('</div>');
                        listHtml.push('</div>');
                        listHtml.push('<div class="contentText">');
                        if (item.taskName.length > 50) {
                            listHtml.push('<h3><b title="' + item.taskName + '" >' + item.taskName.substring(0, 60) + '...</b></h3>');
                        } else {
                            listHtml.push('<h3><b title="' + item.taskName + '" >' + item.taskName + '</b></h3>');
                        }
                        listHtml.push('<p> 开始/结束 ' + item.startTime + ' - ' + item.endTime + '</p>');
                        listHtml.push('</div>');
                        listHtml.push('</li>');
                    });
                    $('#taskList').html(listHtml.join(''));
                    //分页方法
                    info.Page(res.data.total, curr, userType);
                    // 任务点击跳转任务详情
                    info.ToTask();
                } else {
                    var listHtml = [];
                    listHtml.push('<div class="endTask"> 没有任务 </div>');
                    $('#taskList').html(listHtml.join(''));
                }
            },
            error(){

            }
        });
    },
    // 分页插件
    Page: function (total, curr, userType) {
        if (total > 5) {
            $('#page').removeClass('hidden')
            layui.use('laypage', function () {
                var laypage = layui.laypage;
                //执行一个laypage实例
                laypage.render({
                    elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
                    count: total, //数据总数，从服务端得
                    limit: '5',
                    theme: '#1E9FFF',
                    curr: curr,
                    groups: '5',
                    layout: ['prev', 'page', 'next', 'limits', 'skip'],
                    jump: function (item, first) {
                        if (!first) {
                            info.taskList(item.curr, userType);
                        }
                    }
                });
            })
        } else {
            $('#page').addClass('hidden')
        }
    },
    ToTask: function () {
        $('body').delegate('#taskList .ToTask', 'click', function () {
            var TaskId = $(this).attr('data-id');
            window.open("../TestPage/TestPage.html?value=" + TaskId, "_blank");
        });
    }
};