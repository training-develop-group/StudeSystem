$(function() {
	Page()
	selectTaskCount()
	selectTaskAll()
	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;
		All.getMenu({
			num: 3
		});
	});
	//点击发布任务调出弹窗
	$('.releasTeask').click(function() {
		showDisplay()
	});
	//分页
	var info = {
		//页面主方法

		init: function() {
			//重新渲染select
			layui.use('form', function() {
				var form = layui.form;
				form.render('select');
			});
		},
	}
	layui.use('laydate', function() {
		var laydate = layui.laydate;
		//执行一个laydate实例
		laydate.render({
			elem: '#test1' //指定元素
		});
	});



	//弹出选择人员
	$('.selectPersonnel').click(function() {
		layer.open({
			type: 1,
			title: ['选择人员', 'color:#fff;background-color:#40AFFE;;border-radius: 7px '],
			shadeClose: true,
			shade: 0.8,
			skin: 'myskin',
			area: ['600px', '50%'],
			content: $('#selectPersonnel'),
			success: function() {

			}
		})
	})

	//弹出新建试卷
	var openAddRolePage = function(userId) {
		layer.open({
			type: 1,
			title: ['新建试卷', 'color:#fff;background-color:#40AFFE;;border-radius: 7px'],
			shadeClose: true,
			shade: 0.8,
			skin: 'myskin',
			area: ['700px', '80%'],
			content: $('#addTaskPage'),
			success: function() {
				$('.selectResource').click(function() {
					aaaa()
				})
			},
		});
	}
	var showDisplay = function() {
		openAddRolePage();
	}
});
//弹出选择资源
var aaaa = function() {

	layer.open({
		type: 1,
		title: ['选择资源', 'color:#fff;background-color:#40AFFE;;border-radius: 7px '],
		shadeClose: true,
		shade: 0.8,
		skin: 'myskin',
		area: ['700px', '80%'],
		content: $('#selectResource'),
		success: function() {

		}
	})
}
//弹出编辑任务
var popupsUpdateTaskName = function() {
	layer.open({
		type: 1,
		title: ['编辑任务', 'color:#fff;background-color:#40AFFE;;border-radius: 7px'],
		shadeClose: true,
		shade: 0.8,
		skin: 'myskin',
		area: ['700px', '200px'],
		content: $('#updateTaskName'),
		success: function() {
				
		}
	})
}
// 分页插件
var Page = function() {
	layui.use('laypage', function() {
		var laypage = layui.laypage;
		//执行一个laypage实例

		laypage.render({
			elem: 'Page' //注意，这里的 test1 是 ID，不用加 # 号
				,
			count: '1111' //数据总数，从服务端得到
				,
			limit: '10',
			theme: '#1E9FFF',
			curr: '4',
			groups: '5',
			layout: ['prev', 'page', 'next' , 'limits' , 'skip'],
			// 				jump: function(item, first) {
			// 					if (!first) {
			// 
			// 					}
			// 				}
		});

	})
}
//查询from
//查询总条数(不显示)
var selectTaskCount = function(){
	$.ajax({
		url: 'http://localhost:8888/manage_system/task/count',
		data: {},
		dataType: 'json',
		type: 'GET',
		success(res) {
			console.log(res)
			}
		})
	}
	
//查询全部
var selectTaskAll = function() {
	$.ajax({
		url: 'http://localhost:8888/manage_system/task/tasks',
		data: {},
		dataType: 'json',
		type: 'GET',
		success(res) {
			console.log(res)
			var Html = [];
			res.data.forEach(function(item, index) {
				Html.push('<tr>');
				Html.push('<td style="float: left;">' + item.taskName + '</td>');
				Html.push('<td>' + item.taskType + '</td>');
				Html.push('<td>' + dateFormata(item.startTime) + ' - ' + dateFormata(item.endTime) + '</td>');
				Html.push(
					'<td><button style="width: 50px;height: 25px;margin-right:20px; margin-left: 20px; background-color: #FFFFFF;border: none;float: left;" class="updateTaskName"value="' +item.taskId + '">编辑</button>'+
					'<button class="lookOver" style="width: 50px;height: 25px;margin-right:20px;border: none;background-color: #FFFFFF; margin-left: 20px; float: left;"value="' +item.taskId + '">查看</button>'+
					'<button class="deleteTask" style="width: 50px;height: 25px;margin-right:20px;border: none;background-color: #FFFFFF; margin-left: 20px; float: left;" value="' +item.taskId + '"><span>删除</span></button></td>'
					);
			Html.push('</tr>');
			})
			$('#taskContent').html(Html.join(''));
			//点击弹出编辑
			$('.updateTaskName').click(function() {
				popupsUpdateTaskName();
				$('.confirmAdd').val($(this).val())
			})
			//点击删除 删除点击的任务
			$('.deleteTask').click(function() {
				delectTask($(this).val())
			})
		$('.confirmAdd').click(function(){
			
			updateTaskName($(this).val())
		})
			//弹出查看
			$('.lookOver').click(function() {
				layer.open({
					type: 1,
					title: ['查看任务', 'color:#fff;background-color:#40AFFE;;border-radius: 7px '],
					shadeClose: true,
					shade: 0.8,
					skin: 'myskin',
					area: ['600px', '50%'],
					content: $('#examineTask'),
					success: function() {

					}
				})
			})
		}
	})
}
//修改任务名根据主键
var updateTaskName = function(taskId){
		var taskName = $('.taskName').val();
		var data = {
			'taskName':taskName
			}
		$.ajax({
		url: 'http://localhost:8888/manage_system/task/task' + taskId,
		data: JSON.stringify(data),
		dataType: 'json',
		type: 'POST',
		contentType: 'application/json;charset=utf-8',
		success(res) {
			if (res) {
				alert('删除成功')
				window.location.reload();
			}
		}
	})
}
//刪除任務 根据主键删除
var delectTask = function(taskId) {
				$.ajax({
					url: 'http://localhost:8888/manage_system/task/' + taskId,
					data: {},
					dataType: 'json',
					type: 'DELETE',
					success(res) {
						if (res) {
							alert('删除成功')
							window.location.reload();
						}
					}
				})
			}







var dateFormata = function(time) {
	var date = new Date(time);
	var year = date.getFullYear();
	/* 在日期格式中，月份是从0开始的，因此要加0
	 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
	 * */
	var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	// 拼接
	return year + "-" + month + "-" + day + " " + (hours - 8) + ":" + minutes + ":" + seconds;
}
