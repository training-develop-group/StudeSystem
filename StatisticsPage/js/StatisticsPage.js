$(function() {
	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;
		All.getMenu({
			num: 6
		});
		layui.use(['layer', 'form', 'laypage'], function() {
			var layer = layui.layer,
				form = layui.form;

			var laypage = layui.laypage,
				layer = layui.layer;

			//执行一个laypage实例
			laypage.render({
				elem: 'page',
				count: 100,
				theme: '#1E9FFF',
				// layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
				layout: ['prev', 'page', 'next', 'limits', 'skip'],
				jump: function(obj) {
					console.log(obj);
				}
			});
		});
	});
});

layui.use(['laypage', 'layer'], function() {
	var laypage = layui.laypage,
		layer = layui.layer;
	//执行一个laypage实例
	laypage.render({
		elem: 'page',
		count: 100,
		theme: '#1E9FFF',
		layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
		jump: function(obj) {
			console.log(obj);
		}
	});
});
