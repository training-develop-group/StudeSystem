$(document).ready(function(){
	TableDataRequest(1);
});

// 分页
$(function(){
	layui.use(['layer','form'],function(){
		var layer = layui.layer,
			form = layui.form;
		All.getMenu({
			num:6
		});
		$('.search').keypress(function(e) {
			
			if (e.which == 13) {
				console.log(1);
				TableDataRequest(1);
			}
		});
	});
});

var TableDataRequest = function(pageNum) {
	var userName = $.trim($('.search').val());
	console.log(userName)
	if(userName == undefined || $.trim(userName) == ''){
		userName = '';
	}
	var data = {
		'userName': userName,
		'pageNum' : pageNum,
		'pageSize' : 12
	};
	$.ajax({
		url: 'http://192.168.188.151:8888/manage_system/stat/list',
		data: data,
		dataType: 'json',
		type: 'GET',
		success(res) {
			console.log(res);
			var Html = [];
			console.log(res)
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

var page = function(total,pageNum){
	console.log(1)
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