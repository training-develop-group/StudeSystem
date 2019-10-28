$(function() {
	info.Page()
	info.selectTaskCount()
	
	info.selectTaskType()
	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;
		All.getMenu({
			num: 3
		});
	});
	//点击发布任务调出弹窗
	$('.releasTeask').click(function() {
		info.showDisplay()
	});

	layui.use('laydate', function() {
		var laydate = layui.laydate;
		//执行一个laydate实例
		laydate.render({
			elem: '#test1'//指定元素
			 ,theme: '#40AFFE'
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
	//点击选择试卷弹出试卷弹窗
	$('.selectPapers').click(function() {
		layer.open({
			type: 1,
			title: ['新建试卷', 'color:#fff;background-color:#40AFFE;'],
			shadeClose: true,
			shade: 0.8,
			skin: 'myskin',
			area: ['700px', '80%'],
			content: $('#selectPapers'),
			success: function() {

			},
		});
	});
	$('.selectResource').click(function(){
		info.selectResourceList(1);
	});
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
	showDisplay: function() {
		info.openAddRolePage();
	},
	//弹出新建试卷
	openAddRolePage: function(userId) {
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
					info.selectResources()
				})
			},
		});
	},

	//弹出选择资源
	selectResources: function() {

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
	},
	//弹出编辑任务
	popupsUpdateTaskName: function() {
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
	},
	// 分页插件
	Page: function() {
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
				layout: ['prev', 'page', 'next', 'limits', 'skip'],
				// 				jump: function(item, first) {
				// 					if (!first) {
				// 
				// 					}
				// 				}
			});

		})
	},
	//查询from
	//查询总条数(不显示)
	selectTaskCount: function() {
		$.ajax({
			url: LBUrl + 'manage_system/task/count',
			data: {},
			dataType: 'json',
			type: 'GET',
			success(res) {
				console.log(res)
			}
		})
	},
	
	//查询全部
	selectTaskAll:function(resa) {
		$.ajax({
			url: LBUrl + 'manage_system/task/tasks',
			data: {},
			dataType: 'json',
			type: 'GET',
			success(res) {
				console.log(res)
				var Html = [];
				res.data.forEach(function(item, index) {
					Html.push('<tr>');
					Html.push('<td style="float: left;">' + item.taskName + '</td>');
					resa.forEach(function(itemTypeName,index){
							var aa =itemTypeName.split(",");
							if(item.taskType == aa[0]){
								Html.push('<td>' +aa[1] + '</td>');
							}
						})
					Html.push('<td>' + dateFormata(item.startTime) + ' - ' + dateFormata(item.endTime) + '</td>');
					Html.push(
						'<td><button style="width: 50px;height: 25px;margin-right:20px; margin-left: 20px; background-color: #FFFFFF;border: none;float: left;" class="updateTaskName"value="' +
						item.taskId + '">编辑</button>' +
						'<button class="lookOver" style="width: 50px;height: 25px;margin-right:20px;border: none;background-color: #FFFFFF; margin-left: 20px; float: left;"value="' +
						item.taskId + '">查看</button>' +
						'<button class="deleteTask" style="width: 50px;height: 25px;margin-right:20px;border: none;background-color: #FFFFFF; margin-left: 20px; float: left;" value="' +
						item.taskId + '"><span>删除</span></button></td>'
					);
					Html.push('</tr>');
				})
				$('#taskContent').html(Html.join(''));
				//点击弹出编辑
				$('.updateTaskName').click(function() {
					info.popupsUpdateTaskName();
					$('.confirmAdd').val($(this).val())
				})
				//点击删除 删除点击的任务
				$('.deleteTask').click(function() {
					layer.msg('是否删除', {
						time: false, //20s后自动关闭
						btn: ['确认', '取消'],
						yes: function(){ 
							// 删除方法
							info.delectTask($(this).val())
							// 关闭提示框
							layer.closeAll();
						}
					});
				})
				$('.confirmAdd').click(function() {

					info.updateTaskName($(this).val())
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
	},
	//查询任务类型
	selectTaskType:function() { 
		$.ajax({
			url: LBUrl + 'manage_system/task/type',
			data: {},
			dataType: 'json',
			type: 'GET',
			success(res) {	
				console.log(res)
				var Html = [];
				res.forEach(function(item,index){
					var aa =item.split(",")
					Html.push('<option value="'+aa[0]+'">'+aa[1]+'</option>')
				})
				$('#taskType').html(Html.join(''));
				info.selectTaskAll(res)
				}
			})
		},
	//修改任务名根据主键
	updateTaskName: function(taskId) {
		var taskName = $('.taskName').val();
		var data = {
			'taskName': taskName
		}
		$.ajax({
			url: LBUrl + 'manage_system/task/task' + taskId,
			data: JSON.stringify(data),
			dataType: 'json',
			type: 'POST',
			contentType: 'application/json;charset=utf-8',
			success(res) {
				if (res) {
					// alert('成功');
					console.log('成功');
					window.location.reload();
				}
			}
		})
	},
	//刪除任務 根据主键删除
	delectTask: function(taskId) {
		$.ajax({
			url: LBUrl + 'manage_system/task/' + taskId,
			data: {},
			dataType: 'json',
			type: 'DELETE',
			success(res) {
				if (res) {
					// alert('删除成功');
					console.log('删除成功');
					window.location.reload();
				}
			}
		})
	},
	selectResourceList: function(resType) {
	    $.ajax({
	      url: 'http://192.168.188.114:8488/manage_system/resource/resources',
	      data: { 
			'resType' : resType
		},
		dataType: 'json',
		type: 'GET',
		contentType: 'application/json;charset=utf-8',
		success(res) {
			console.log(res)
			var Html = [];
			res.data.forEach(function(item,index){
				Html.push('<div style="float: left;">')
				Html.push('<input type="radio" name="res" style="position:absolute ;margin-top: 20px; margin-left: 20px; "value="'+item.resId+'">')
				Html.push('<div style="width: 150px; height: 100px; border: 1px solid #01AAED;margin: 20px; margin-bottom: 0px;" >')
				Html.push('<img src="'+item.path+'" alt="" style="width: 150px; height: 99px;">')
				Html.push('</div>')
				Html.push('<p style="margin-left: 20px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis; width:80px">'+item.resName+'1</p>')
				Html.push('</div>')
			})
			$('#resource').html(Html.join(''));
	        
			}
		})
	}
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
