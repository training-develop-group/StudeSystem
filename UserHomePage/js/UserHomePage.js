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
    tabChange:function(){
        $('.title li').off('click').on('click',function () {
            $('.title li').removeClass('active');
            $(this).addClass('active');
            var dataType = $(this).attr('data-type');
            console.log(dataType);
            info.taskList(50, 1,dataType);
        });
    },
    // 页面列表
    taskList: function (total, curr,dataType) {
        var pagaSize = 10;
        var data = {
            dataType:dataType,
            pagaSize:pagaSize,
            pageNum:curr
        };
        // $.ajax({
        //     url:'',
        //     data:{},
        //     dataType:'json',
        //     type:'get',
        //     beforeSend:function () {
        //         // 正在请求时
        //     },
        //     success:function (res) {
        //         // 请求成功时

        var time = new Date();
        var taskList = [
            {taskName: '这里11111', taskTime: time, taskImg: '../imgs/HeadPortrait.jpg',taskId:'1',taskType:'1'},
            {taskName: '测试任务2', taskTime: time, taskImg: '../imgs/HeadPortrait.jpg',taskId:'2',taskType:'2'},
            {taskName: '测试任务3测试任务3测试任务3测试任务3测试任务3测试任务3测试任务3测试任务3测试任务3测试任务3测试任务3测试任务3测试任务3测试任务3测试任务3测试任务3测试任务3测试任务3测试任务3测试任务3测试任务3', taskTime: time, taskImg: '../imgs/HeadPortrait.jpg',taskId:'3',taskType:'3'},
            {taskName: '测试任务4', taskTime: time, taskImg: '../imgs/HeadPortrait.jpg',taskId:'4',taskType:'2'},
            {taskName: '测试任务5', taskTime: time, taskImg: '../imgs/HeadPortrait.jpg',taskId:'5',taskType:'3'},
            {taskName: '测试任务6', taskTime: time, taskImg: '../imgs/HeadPortrait.jpg',taskId:'6',taskType:'1'}
        ];

        if (taskList) {
            var listHtml = [];
            taskList.forEach(function (item, index) {
                listHtml.push('<li class="clearfix">');
                listHtml.push('   <div class="leftBox">');
                listHtml.push('      <div class="imgBox ">');
                listHtml.push('          <img src="' + item.taskImg + '" alt="任务图片"/>');
                listHtml.push('      </div>');
                listHtml.push('   </div>');
                listHtml.push('   <div class="rightBox">');
                if(item.taskName.length > 50){
                    listHtml.push('       <h3><b title="'+ item.taskName + '" class="ToTask" data-id="'+ item.taskId +'" data-type="'+ item.taskType+'">'+ item.taskName.substring(0, 60) + '...</b></h3>');
                } else {
                    listHtml.push('       <h3><b title="'+ item.taskName + '" class="ToTask" data-id="'+ item.taskId +'" data-type="'+ item.taskType+'">'+ item.taskName + '</b></h3>');
                }
                listHtml.push('       <p>'+ item.taskTime +'</p>');
                listHtml.push('   </div>');
                listHtml.push('</li>');
            });

            $('#taskList').html(listHtml.join(''));
            //分页方法
            info.Page(total, curr);
            // 任务点击跳转
            info.ToTask();
        }
        //     },
        //     error:function (e) {
        //         // 请求失败时
        //     }
        // });


        // 分页插件
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
    ToTask:function () {
        $('body').delegate('.rightBox .ToTask','click',function () {
            var TaskType = $(this).attr('data-type');
            var TaskId = $(this).attr('data-id');
            console.log('TaskType',TaskType);
            console.log('TaskId',TaskId);
        });
    }
};