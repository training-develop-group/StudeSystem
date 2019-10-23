$(function() {

	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;

		All.getMenu({
			num: 1
		});
	});

	$(".search").focus(function() {
		$('.searchIcon').hide();
	});
	$(".search").blur(function() {
		if ($('.search').val() == '')
			$('.searchIcon').show();
	});
	// 新建试卷
	$('#newTestPaper').click(function() {
		newTestPaper();
	});
	Page();
});
//表格数据请求
TableDataRequest = function() {
	$.ajax({
		url: '',
		data: {
			
		},
		dataType: 'json',
		Type: 'GET',
		success: function(res) {
			if (res || res.data !== null) {
				TableDrawing();
			}
		},
		error: function(e) {

		}
	});
};
//表格会绘制
var TableDrawing = function(){
	var index = 15;
	var Html = [];		// 选项
	// data.list.forEach(function(item, index) {
		Html.push('<tr>');
		Html.push('<td>微课程</td>');
		Html.push('<td class="middle">已发</td>');
		Html.push('<td class="middle">10</td>');
		Html.push('<td class="middle">20</td>');
		Html.push('<td>');
		Html.push('<button type="button" class="layui-btn layui-btn-primary" id="edit">编辑</button>');
		Html.push('<button type="button" class="layui-btn layui-btn-primary" id="selectedTopic">选题</button>');
		Html.push('<button type="button" class="layui-btn layui-btn-primary" id="toView">查看</button>');
		Html.push('<button type="button" class="layui-btn layui-btn-primary" id="delete">删除</button>');
		Html.push('</td>');
		Html.push('</tr>');
	// });
	$('#examinationPaperInformation').html(Html.join(''));
}
// 分页
var Page = function(){
	layui.use(['laypage', 'layer'], function() {
		var laypage = layui.laypage,
			layer = layui.layer;
		//完整功能
		laypage.render({
			elem: 'paging',
			// count: data.total,
			count: 100,
			limit: 10,
			theme: '#279ef0',
			// curr: data.pageNum,
			// groups: '5',
			// layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
			layout: ['prev', 'page', 'next' , 'count' , 'skip'],
			jump: function(item , first) {
				if (!first){
					console.log(first);
				}
			}
		});
	});
}
// 新建试卷
var newTestPaper = function() {
	layui.use("layer", function() {
		var layer = layui.layer;
		layer.open({
			type: 1 //Page层类型
			,closeBtn: 0
			,area: ['789px', '210px']
			,title: ['新建试卷', 'background-color: #279ef0;text-align: center;font-size: 16px;line-height: 50px;color:white;letter-spacing: 5px;padding: 0px;']
			// ,shade: 0.6 //遮罩透明度
			,content: '<div class="inputLocation">'+
					'<span>试卷名称</span>'
					+ '<input type="text" autocomplete="off" id="nameOfExaminationPaper" class="layui-input">'
					+ '<br />'
					// + '<button type="button" class="layui-btn layui-btn-primary" id="confirm">确认</button>'
				+ '</div>'
			,btn: ['确认'] //可以无限个按钮
			,btn1: function(index, layero){
				//按钮【确认】的回调
				layer.close(index);
			}
		});
	});
}