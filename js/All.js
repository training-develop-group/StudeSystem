$(document).ready(function() {
	/*分页方法*/
	paging();
})


/*分页*/
var paging = function() {

	layui.use('laypage', function() {
		var laypage = layui.laypage;

		laypage.render({
			elem: 'test1',
			count: 30,
			theme: '#279ef0',
			layout:['prev','page','next','limits','skip']
		});
	});

}
