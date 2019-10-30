/**
 * @name:
 * @author:
 */


$(function() {
	$('.resorceMore').click(function() {
		window.location.href = "../ResourcePage/ResourcePage.html";
	});
	$('.taskMore').click(function() {
		window.location.href = "../TaskPage/TaskPage.html";
	});
	$('.testPaperMore').click(function() {
		window.location.href = "../ExaminationPaperPage/ExaminationPaperPage.html";
	});
	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;
		All.getMenu({
			num: 1
		});
	});
	layui.use('form', function() {
		var form = layui.form;
		info.init();
	});


	$(".search").focus(function() {
		$('.searchIcon').hide();
	});
	$(".search").blur(function() {
		if ($('.search').val() == '')
			$('.searchIcon').show();
	});


});
var info = {
	//页面主方法
	init: function() {
		layui.use('form', function() {
			var form = layui.form;
			form.render('select');
		});
	}
}