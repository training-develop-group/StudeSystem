/**
 * @name: common
 * @author：
 */
$(function() {
	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;

	});

	All.getMenu();
});

var All = {
	getMenu: function(options) {
		if (options && options != null) {
			var navHtml = [];
			navHtml.push('<div class="headerBox">')
			navHtml.push('<div class="logobox">')
			navHtml.push('<span>Logo</span>')
			navHtml.push('</div>')
			navHtml.push('<div class="navbox">')
			navHtml.push('<ul>')
			switch (options.num) {
				case 1:
					navHtml.push('<li class="active">首页</li>')
					navHtml.push('<li class="resource">资源</li>')
					navHtml.push('<li class="taskPage">任务</li>')
					navHtml.push('<li class="EditorTestPaper">试卷</li>')
					navHtml.push('<li class="testQuestions">试题</li>')
					navHtml.push('<li class="Statistics">统计</li>')
					// navHtml.push('<li>用户管理</li>')
					break;
				case 2:
					navHtml.push('<li class="homePage">首页</li>')
					navHtml.push('<li class="active">资源</li>')
					navHtml.push('<li class="taskPage">任务</li>')
					navHtml.push('<li class="EditorTestPaper">试卷</li>')
					navHtml.push('<li class="testQuestions">试题</li>')
					navHtml.push('<li class="Statistics">统计</li>')
					// navHtml.push('<li>用户管理</li>')
					break;
				case 3:
					navHtml.push('<li class="homePage">首页</li>')
					navHtml.push('<li class="resource">资源</li>')
					navHtml.push('<li class="active">任务</li>')
					navHtml.push('<li class="EditorTestPaper">试卷</li>')
					navHtml.push('<li class="testQuestions">试题</li>')
					navHtml.push('<li class="Statistics">统计</li>')
					// navHtml.push('<li>用户管理</li>')
					break;
				case 4:
					navHtml.push('<li class="homePage" id="homePage">首页</li>')
					navHtml.push('<li class="resource" id="resource">资源</li>')
					navHtml.push('<li class="taskPage" id="taskPage">任务</li>')
					navHtml.push('<li class="active">试卷</li>')
					navHtml.push('<li class="testQuestions" id="testQuestions">试题</li>')
					navHtml.push('<li class="Statistics">统计</li>')
					// navHtml.push('<li>用户管理</li>')
					break;
				case 5:
					navHtml.push('<li class="homePage">首页</li>')
					navHtml.push('<li class="resource">资源</li>')
					navHtml.push('<li class="taskPage">任务</li>')
					navHtml.push('<li class="EditorTestPaper">试卷</li>')
					navHtml.push('<li class="active">试题</li>')
					navHtml.push('<li class="Statistics">统计</li>')
					// navHtml.push('<li>用户管理</li>')
					break;
				case 6:
					navHtml.push('<li class="homePage">首页</li>')
					navHtml.push('<li class="resource">资源</li>')
					navHtml.push('<li class="taskPage">任务</li>')
					navHtml.push('<li class="EditorTestPaper">试卷</li>')
					navHtml.push('<li class="testQuestions">试题</li>')
					navHtml.push('<li class="active">统计</li>')
					// navHtml.push('<li>用户管理</li>')
					break;
				case 7:
					navHtml.push('<li>首页</li>')
					navHtml.push('<li>资源</li>')
					navHtml.push('<li>任务</li>')
					navHtml.push('<li>试卷</li>');
					navHtml.push('<li>试题</li>');
					navHtml.push('<li>统计</li>');
					// navHtml.push('<li class="active">用户管理</li>')
					break;
			}
			navHtml.push('</ul>');
			navHtml.push('</div>');
			navHtml.push('<div class="right">');
			navHtml.push('<img src="../imgs/HeadPortrait.jpg" class="userimg">');
			navHtml.push('<span class="username">用户名</span>');
			navHtml.push('<img src="./../imgs/et.png" class="logout">');
			navHtml.push('</div>');
			navHtml.push('<div class="left">');
			navHtml.push('<div class="searchbox">');
			navHtml.push('<img src="./../imgs/search.jpg" class="iconSearch">');
			navHtml.push('<input type="text" class="search" name="" value="" />');
			navHtml.push('</div>');
			navHtml.push('</div>');
			navHtml.push('</div>');
			
			$('#header').html(navHtml.join(''));
			$('.EditorTestPaper').click(function() {
				window.location.href = "../ExaminationPaperPage/ExaminationPaperPage.html";
			});
			
			$('.resource').click(function(){
				window.location.href = "../ResourcePage/ResourcePage.html";
			})

			$('.testQuestions').click(function() {
				window.location.href = "../TestQuestions/TestQuestions.html";
			});
			$('.taskPage').click(function(){
				window.location.href = "../TaskPage/TaskPage.html";
			})

			$('.homePage').click(function(){
				window.location.href = "../HomePage/HomePage.html";
			})
			
			$('.Statistics').click(function(){
				window.location.href = "../StatisticsPage/StatisticsPage.html";
			})
			
			$('.logout').click(function(){
				console.log("退出");
				// layui.use("layer", function() {
				// 	var layer = layui.layer;
				// 	layer.open({
				// 		type: 1 //Page层类型
				// 		,closeBtn: 0
				// 		,area: ['789px', '210px']
				// 		,title: ['新建试卷', 'background-color: #279ef0;text-align: center;font-size: 16px;line-height: 50px;color:white;letter-spacing: 5px;padding: 0px;']
				// 		// ,shade: 0.6 //遮罩透明度
				// 		,content: '<div class="inputLocation">'+
				// 				'<span>试卷名称</span>'
				// 				+ '<input type="text" autocomplete="off" id="nameOfExaminationPaper" class="layui-input">'
				// 				+ '<br />'
				// 				+ '<button type="button" class="layui-btn layui-btn-primary newTestPaperConfirm">确认</button>'
				// 				+ '<button type="button" class="layui-btn layui-btn-primary newTestPaperCancel">取消</button>'
				// 			+ '</div>'
				// 	});
				// 	// 点击确认
				// 	$('.newTestPaperConfirm').click(function() {
				// 		// 调用添加方法
				// 		info.increase();
				// 	});
				// 	// 点击取消
				// 	$('.newTestPaperCancel').click(function() {
				// 		layer.closeAll();
				// 	});
				// });
			})

			// //点击头像显示推出登陆
			// $('body').off('click').on('click',function () {
			// 	$('.logout').slideUp('slow');
			// });
			//
			// $('.userimg').off('click').on('click',function (event) {
			// 	event.stopPropagation();
			// 	$('.logout').slideToggle('slow');
			//
			// })

		}
	}
}
