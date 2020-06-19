$(document).ready(function(){
	TableDataRequest(1);
});

// 分页
$(function(){
	layui.use(['layer','form'],function(){
		var layer = layui.layer,
			form = layui.form;
		All.getMenu({
			search: 1,
			type: 1,
			num:6
		});
		$('.search').keypress(function(e) {
			if (e.which == 13) {
				TableDataRequest(1);
			}
		});
	});
	
});
var TableDataRequest = function(pageNum) {
	var userName = $.trim($('.search').val());
	if(userName == undefined){
		userName = '';
	}
	var data = {
		'userName': userName,
		'pageNum' : pageNum,
		'pageSize' : 12
	};
	$.ajax({
		url: Url + 'manage_system/stat/list',
		data: data,
		dataType: 'json',
		type: 'GET',
		success(res) {
			var Html = [];
			res.data.list.forEach(function(item, index) {
				Html.push('<tr>');
				Html.push('<td>' + item.studentName + '</td>');
				Html.push('<td class="Centered">' + item.taskNumber + '</td>');
				Html.push('<td class="Centered">' + item.paperInfoNumber + '</td>');
				Html.push('<td class="Centered">' + item.questionNumber + '</td>');
				Html.push('<td class="Centered">' + item.questionPercentage + '%' + '</td>');
				Html.push('<td class="Centered">' + item.taskPercentage + '%' + '</td>');
				Html.push('</tr>');
			});
			$('#contentList').html(Html.join(''));
			$('#page').hide();
			if(res.data.total > 12){
				page(res.data.total,res.data.pageNum);
				$('#page').show();
			}
		}
	});
}
// 分页
var page = function(total,pageNum){
	layui.use('laypage', function() {
		var laypage = layui.laypage;
		laypage.render({
			elem: 'page' //注意，这里的 test1 是 ID，不用加 # 号
				,
			count: total //数据总数，从服务端得到
				,
			limit: '12',
			theme: '#1E9FFF',
			curr: pageNum,
			groups: '5',
			layout:['prev','page','next','limits','skip'],
			jump: function(item, first) {
				if (!first) {
					TableDataRequest(item.curr)
				}
			}
		});
	});
}