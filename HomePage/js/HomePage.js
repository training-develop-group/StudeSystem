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
			type: 1,
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


			$.ajax({
				url: TDXUrl + 'manage_system/resource/resources',
				data: {
					'pageNum': 1,
					'pageSize': 5
				},
				dataType: 'json',
				type: 'GET',
				contentType: 'application/json;charset=utf-8',
				success(res) {
					var Html = []
					res.data.list.forEach(function(item, index) {
						Html.push('<tr>');
						Html.push('<td title="' + item.resName + '" style="text-align: left ">' + item.resName + '</td>')
						if (item.resType == 1) { //判断资源类型
							item.resType = '视频'
						} else if (item.resType == 2) {
							item.resType = '音频'
						} else if (item.resType == 3) {
							item.resType = '文档'
						} else {
							item.resType = '未知'
						}
						Html.push('<td title="' + item.resType + '" style="text-align: content ">' + item.resType + '</td>')
						Html.push('<td title="' + item.resSize + '" style="text-align: content ">' + getFileSize(item.resSize) + '</td>')
						Html.push('</tr>')
					})
					$('.Resourcesreview').html(Html.join(''));
				},
				error(e) {
					layer.msg('获取资源列表错误')
				}
			});


			$.ajax({
				url: LBUrl + 'manage_system/task/tasks',
				data: {
					'status': 1,
					'userId':'',
					'userType':2,
					"pageNum": 1,
					"pageSize": 5,
					'taskName': ''
				},
				dataType: 'json',
				type: 'GET',
				success(res) {
					console.log(res)
					var Html = [];
					res.data.list.forEach(function(item, index) {
						Html.push('<tr style="border-bottom: 1px solid #e6e6e6;">');
						Html.push('<td style="float: left; border:none" title="' + item.taskName + '">' + item.taskName + '</td>');
						if (item.taskType == 1) {
							item.taskType = '综合任务';
						} else if (item.taskType == 2) {
							item.taskType = '学习任务';
						} else if (item.taskType == 3) {
							item.taskType = '测试任务';
						}
						Html.push('<td style="float: content;" border:none title="' + item.taskType + '">' + item.taskType + '</td>');
						Html.push('</tr>');
					})
					$('.taskContent').html(Html.join(''))
				}
			})
			
			$.ajax({
				url: MCUrl + 'manage_system/paper/papers',
				data: {
					'pageNum':1,
					'pageSize':5,
					'paperName': ''
				},
				dataType: 'json',
				Type: 'GET',
				success: function(res) {
					console.log(res)
						var Html = [];
						res.data.list.forEach(function(item, index) {
							Html.push('<tr  style="border-bottom: 1px solid #e6e6e6;">');
							Html.push('<td style="float: left; border:none" title="' + item.paperName + '">' + item.paperName + '</td>');
							Html.push('<td style="float: content; border:none" title="' + item.single + '">' + item.single + '</td>');
							Html.push('<td style="float: content; border:none" title="' + item.many + '">' + item.many + '</td>');
							Html.push('</tr>');
						})
						$('.examinationContent').html(Html.join(''))
					},
				})
		});
	},
	
}

/**
 * 资源size格式化
 * @param {Object} fileByte 文件size格式化的参数
 */
var getFileSize = function(fileByte) {
	var fileSizeByte = fileByte;
	var fileSizeMsg = "";
	if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
	else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
	else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(
		2) + "MB";
	else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1GB";
	else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 *
		1024)).toFixed(2) + "GB";
	else fileSizeMsg = "文件超过1TB";
	return fileSizeMsg;
}