$(document).ready(function(){
	TableDataRequest();
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
		layui.use(['layer','form','laypage'],function(){
			var layer = layui.layer,
				form = layui.form;
			var laypage = layui.laypage,
				layer = layui.layer;
			laypage.render({
				elem:'page',
				count:100,
				theme:'#1E9FFF',
				layout:['prev','page','next','limits','skip'],
				jump:function(obj){
					console.log(obj)
				}
			});
		});
		
		$('.search').keypress(function(e) {
			
			if (e.which == 13) {
				console.log(1);
				TableDataRequest();
			}
		});
	});
	
});
var TableDataRequest = function() {
	var userName = $('.search').val();
	if(userName == undefined){
		userName = '';
	}
	var data = {
		'userName': userName
	};
	$.ajax({
		url: 'http://192.168.188.151:8888/manage_system/stat/list',
		data: data,
		dataType: 'json',
		type: 'GET',
		success(res) {
			console.log(res);
			var Html = [];
			
			res.data.forEach(function(item, index) {
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
		}
	});
}
