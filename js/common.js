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
					navHtml.push('<li>统计</li>')
					// navHtml.push('<li>用户管理</li>')
					break;
				case 2:
					navHtml.push('<li class="homePage">首页</li>')
					navHtml.push('<li class="active">资源</li>')
					navHtml.push('<li class="taskPage">任务</li>')
					navHtml.push('<li class="EditorTestPaper">试卷</li>')
					navHtml.push('<li class="testQuestions">试题</li>')
					navHtml.push('<li>统计</li>')
					// navHtml.push('<li>用户管理</li>')
					break;
				case 3:
					navHtml.push('<li class="homePage">首页</li>')
					navHtml.push('<li class="resource">资源</li>')
					navHtml.push('<li class="active">任务</li>')
					navHtml.push('<li class="EditorTestPaper">试卷</li>')
					navHtml.push('<li class="testQuestions">试题</li>')
					navHtml.push('<li>统计</li>')
					// navHtml.push('<li>用户管理</li>')
					break;
				case 4:
					navHtml.push('<li class="homePage" id="homePage">首页</li>')
					navHtml.push('<li class="resource" id="resource">资源</li>')
					navHtml.push('<li class="taskPage" id="taskPage">任务</li>')
					navHtml.push('<li class="active">试卷</li>')
					navHtml.push('<li class="testQuestions" id="testQuestions">试题</li>')
					navHtml.push('<li>统计</li>')
					// navHtml.push('<li>用户管理</li>')
					break;
				case 5:
					navHtml.push('<li class="homePage">首页</li>')
					navHtml.push('<li class="resource">资源</li>')
					navHtml.push('<li class="taskPage">任务</li>')
					navHtml.push('<li class="EditorTestPaper">试卷</li>')
					navHtml.push('<li class="active">试题</li>')
					navHtml.push('<li>统计</li>')
					// navHtml.push('<li>用户管理</li>')
					break;
				case 6:
					navHtml.push('<li>首页</li>')
					navHtml.push('<li>资源</li>')
					navHtml.push('<li>任务</li>')
					navHtml.push('<li>试卷</li>')
					navHtml.push('<li>试题</li>')
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
<<<<<<< HEAD
<<<<<<< HEAD
			// navHtml.push('</ul>')
			// navHtml.push('</div>')
			// navHtml.push('<div class="right">')
			// navHtml.push(
			// 	'<button type="button" style="border: none;background-color: initial;margin-top:-10px" class="btn btn-default " data-container="body" data-toggle="popover" data-placement="bottom"data-content="LogOut"><img src="../imgs/HeadPortrait.jpg" class="userimg">'
			// )
			// navHtml.push('<span class="username">用户名</span>')
			// navHtml.push('</button></div>')
			// navHtml.push('<div class="left">')
			// navHtml.push('<div class="searchbox">')
			// navHtml.push('<img src="./../imgs/search.jpg" class="iconSearch">')
			// navHtml.push('<input type="text" class="search" name="" value="" />')
			// navHtml.push('</div>')
			// navHtml.push('</div>')
			// navHtml.push('</div>')
			navHtml.push('</ul>')
			navHtml.push('</div>')
			navHtml.push('<div class="right">')
			navHtml.push('<img src="../imgs/HeadPortrait.jpg" class="userimg">')
			navHtml.push('<span class="username">用户名</span>')
			navHtml.push('</div>')
			navHtml.push('<div class="left">')
			navHtml.push('<div class="searchbox">')
			navHtml.push('<img src="./../imgs/search.jpg" class="iconSearch">')
			navHtml.push('<input type="text" class="search" name="" value="" />')
			navHtml.push('</div>')
			navHtml.push('</div>')
			navHtml.push('</div>')

=======
=======
>>>>>>> 995f1ffc8124753ca4100d493fe37bb00b782923
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
			
>>>>>>> 995f1ffc8124753ca4100d493fe37bb00b782923
			$('#header').html(navHtml.join(''));
			$('.EditorTestPaper').click(function() {
				console.log(1);
				// 跳转到试题
				window.location.href = "../ExaminationPaperPage/ExaminationPaperPage.html";
			});

			$('.resource').click(function() {
				window.location.href = "../ResourcePage/ResourcePage.html";
			})

			$('.testQuestions').click(function() {
				console.log(1);
				// 跳转到试题
				window.location.href = "../TestQuestions/TestQuestions.html";
			});
			$('.taskPage').click(function() {
				window.location.href = "../TaskPage/TaskPage.html";
			})
<<<<<<< HEAD
<<<<<<< HEAD
			$('.homePage').click(function() {
				window.location.href = "../HomePage/HomePage.html";
			})
			// $('[data-toggle="popover"]').popover()
			// $('body').delegate('.popover-content','click',function(){
			// 	window.location.href = "../index.html"
			// });
			//鼠标悬停提示特效

			// var str = true;
			// $('.logout').hover(function() {
			// }, function() {

			// 	layer.closeAll();
			// });
			// $(".userimg").hover(function() {
			// 		openMsg();
			// }, function() {
			// });
			// var check = false;
			// $('.userimg').hover(function() {
			// 	if (!check) {
			// 		openMsg();
			// 	}

			// }, function() {
			// 	$('.layui-layer-content').mouseleave(function(){
			// 		layer.closeAll();
			// 		check = false;
			// 	});

			// });




			// function openMsg() {
			// 	layer.tips(
			// 		'<div class="aaa"><button type="button" class="layui-btn layui-btn-primary logout">log out</button></div>',
			// 		'.userimg', {
			// 			tips: [3, '#279ef0'],
			// 			time: false
			// 		});
			// 	check = true;
			// }
=======

			$('.homePage').click(function(){
				window.location.href = "../HomePage/HomePage.html";
			})
=======

			$('.homePage').click(function(){
				window.location.href = "../HomePage/HomePage.html";
			})
>>>>>>> 995f1ffc8124753ca4100d493fe37bb00b782923


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
<<<<<<< HEAD
>>>>>>> 995f1ffc8124753ca4100d493fe37bb00b782923
=======
>>>>>>> 995f1ffc8124753ca4100d493fe37bb00b782923

		}
	}
}
