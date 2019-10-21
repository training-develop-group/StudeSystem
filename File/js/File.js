$(function() {

	$(".search").focus(function() {
		$('.searchIcon').hide();
	});
	$(".search").blur(function() {
		if ($('.search').val() == '')
			$('.searchIcon').show();
	});
	 layui.use(['layer', 'form'], function () {
		var layer = layui.layer, form = layui.form;

		All.getMenu({
			num:2
		});
	});
});
