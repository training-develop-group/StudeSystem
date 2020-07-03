$(function() {
	info.selectTaskAll(1,'')
	layui.use(['layer', 'form', 'laydate'], function() {
		var layer = layui.layer,
			form = layui.form;
		form.on('checkbox(Staff)', function(data) {
			var a = data.elem.checked;
			if (a === true) {
				$(".checkAll").prop("checked", true);
				form.render('checkbox');
			} else {
				$(".checkAll").prop("checked", false);
				form.render('checkbox');
			}
		});
		form.on('checkbox(c_one)', function(data) {
			var item = $(".checkAll");
			for (var i = 0; i < item.length; i++) {
				if (item[i].checked === false) {
					$("#checkAll").prop("checked", false);
					form.render('checkbox');
					break;
				}
			}
			//如果都勾选了  勾上全选
			var all = item.length;
			for (var i = 0; i < item.length; i++) {
				if (item[i].checked === true) {
					all--;
				}
			}
			if (all === 0) {
				$("#checkAll").prop("checked", true);
				form.render('checkbox');
			}

		});
		laydate = layui.laydate;
		//执行一个laydate实例
		laydate.render({
			elem: '#test1', //指定元素,
			theme: '#40AFFE',
			type: 'datetime',
			value: firstToday
		});
		laydate.render({
			elem: '#test2', //指定元素,
			theme: '#40AFFE',
			type: 'datetime',
			value: lastToday
		});
		All.getMenu({
			search: 1,
			type: 1,
			num: 3

		});
		$('.search').keypress(function(e) {
			if (e.which === 13) {
				var search = $('.search').val();
				info.selectTaskType(1, search);
			}
		});
		$('#paperName').keypress(function(e) {
			var search = $('#paperName').val();
			info.TableDataRequest(1, search)
		});
		$('#resName').keypress(function(e) {
			if (e.which == 13) {
				var search = $('#resName').val();
				var resType = $('.layui-nav .layui-this').val();
				info.selectResourceList(1, resType, search);
			}
		});
		$('.usersSelectOk').off('click').on('click', function() {
			var Html = [];
			$.each($("[name='Staff']:checked"), function(i, val) {
				Html.push('<p>' + $(this).siblings('i').text() + '<input type="text"  hidden="" id="" value="' + $(this).val() +
					'" /> ' +
					'<i  data-id="' + $(this).val() +
					'" class="layui-icon layui-icon-close deleteUserName" style="font-size: 20px;"></i></p>')
			});
			$('.taskUsers').html(Html.join(''));
			$('.deleteUserName').off('click').on('click', function() {
				$(this).parents('p').remove();
				var userId = $(this).attr('data-id');
				$.each($("[name='Staff']:checked"), function(i, val) {
					if (val.value === userId) {
						$("#checkAll").prop("checked", false);
						$(this).prop("checked", false);
						layui.use('form', function() {
							var form = layui.form;
							form.render('');
						});
					}
				})
			});
			layer.close(layer.index);
		});
		form.on('select(fangxiang)', function(data) {
			var value = data.value;
			if (value === '1') {
				$('.selectPapers').show();
				$('.selectResource').show();
				$('.resAdd').text('');
				$('.paperAdd').text('');
			} else if (value === '2') {
				$('.selectResource').show();
				$('.selectPapers').hide();
				$('.resAdd').text('');
				$('.paperAdd').text('');
			} else if (value === '3') {
				$('.selectPapers').show();
				$('.selectResource').hide();
				$('.resAdd').text('');
				$('.paperAdd').text('');
			}
		});
		form.render('select');
		form.render('checkbox');
	});
	$('.resourceSelection').off('click').on('click', function() {
		var resName = $(this).attr('data-resname');
		if (resName.length > 30) {
			$('.resAdd').html('：' + resName.substring(0, 30) + '...');
		} else {
			$('.resAdd').html('：' + resName);
		}
		$('.resAdd').attr('title', resName);
		layer.close(layer.index);
	});
	//弹出选择人员
	$('.selectPersonnel').off('click').on('click', function() {
		layer.open({
			type: 1,
			title: ['选择人员',
				'color:#fff;background-color:#279EF0;overflow-x: hidden; text-align: center;font-size: 20px;cursor: default;'
			],
			move: false,
			skin: 'myskin',
			area: ['600px', '500px'],
			content: $('#selectPersonnel'),
			success: function() {

			}
		})
	});
	//点击选择试卷弹出试卷弹窗
	$('.selectPapers').off('click').on('click', function() {
		info.TableDataRequest(1,'')
		layer.open({
			type: 1,
			title: ['选择试卷', 'color:#fff;background-color:#279EF0; text-align: center;font-size: 20px;cursor: default;'],
			move: false,
			skin: 'myskin',
			area: ['700px', '800px'],
			content: $('#selectPapers'),
			success: function() {

			},
		});
	});
	//点击发布任务调出弹窗
	$('.releasTeask').off('click').on('click', function() {
		info.openAddRolePage();
	});
	// 选择资源
	$('.selectResource').off('click').on('click', function() {
		info.selectResources()
	});
	$('.selectRes').off('click').on('click', function() {
		info.selectResourceList(1, $(this).val(), '')
	})
});
//用户模糊查询 回车
$(".userNameRetrieval").keypress(function(e) {
	if (e.which === 13) {
		$('.myskin #selectPersonnel .layui-form-checkbox').removeClass('layui-form-checked');
		var userNameRetrieval = $.trim($('.userNameRetrieval').val());
		info.selectAllUser(userNameRetrieval);
	}
});
//分页
$('.addOk').off('click').on('click', function() {
	$(this).attr('disabled');
	info.addTask();
});

var JumpPageNum = '';
var JumpTotal = '';
var info = {
	//页面主方法
	init: function() {
		//重新渲染select
		layui.use('form', function() {
			var form = layui.form;
			form.render('select');
		});
	},

	//弹出新建任务
	openAddRolePage: function(userId) {
		info.selectAllUser('');
		// 清空输入框
		info.selectTaskType(1, '', 1);
		layui.use('form', function() {
			var form = layui.form;
			form.render('');
		});
		var layer = layui.layer,
			form = layui.form;
		$(".checkAll").prop("checked", false);
		$("#checkAll").prop("checked", false);
		form.render('checkbox');
		$('.img-box').removeClass('checked');
		$('.selectResource').css('display', '');
		$('.selectPapers').css('display', '');
		$('.taskName').val('');
		$('.taskRemark').val('');
		$('.taskUsers').empty();
		// 清空试卷名
		$('.paperAdd').text('');
		$('.resAdd').text('');

		// 赋值今天时间(开始)
		$('#test1').val(firstToday);
		// 赋值明天时间(结束)
		$('#test2').val(lastToday);
		layer.open({
			type: 1,
			title: ['新建任务', 'color:#fff;background-color:#279EF0;text-align: center;font-size: 20px;'],
			move: false,
			skin: 'myskin',
			area: ['700px', '770px'],
			content: $('#addTaskPage'),
			success: function() {

			},
		});
	},
	//弹出选择资源
	selectResources: function() {

		layer.open({
			type: 1,
			title: ['选择资源',
				'color:#fff;background-color:#279EF0;border-radius: 7px ;text-align: center;font-size: 20px; cursor: default;'
			],
			move: false,
			skin: 'myskin',
			area: ['700px', '800px'],
			content: $('#selectResource'),
			success: function() {

			}
		})
	},
	//弹出编辑任务
	popupsUpdateTaskName: function(taskName, taskId) {
		// 公共修改弹出框
		All.layuiOpenRename({
			num: 3,
			id: taskId,
			returnValue: taskName,
			msg: '任务名称'
		})
	},
	// 分页插件
	Page: function(total, pageNum) {
		if (total < 13) {
			$('#Page').css('display', 'none');
		} else {
			$('#Page').css('display', '');
		}
		layui.use('laypage', function() {
			var laypage = layui.laypage;
			//执行一个laypage实例

			laypage.render({
				elem: 'Page', //注意，这里的 test1 是 ID，不用加 # 号
				count: total, //数据总数，从服务端得
				limit: '12',
				theme: '#279ef0',
				curr: pageNum,
				groups: '5',
				layout: ['prev', 'page', 'next', 'limits', 'skip'],
				jump: function(item, first) {
					if (!first) {
						info.selectTaskAll(item.curr, $('.search').val());
					}
				}
			});

		})
	},
	resPage: function(total, pageNum, resType) {

		if (total > 9) {

			$('#resPage').show();
			layui.use('laypage', function() {
				var laypage = layui.laypage;
				//执行一个laypage实例

				laypage.render({
					elem: 'resPage', //注意，这里的 test1 是 ID，不用加 # 号
					count: total, //数据总数，从服务端得
					limit: '9',
					theme: '#279EF0',
					curr: pageNum,
					groups: '5',
					layout: ['prev', 'page', 'next', 'limits'],
					jump: function(item, first) {
						if (!first) {
							var search = $('#resName').val();
							info.selectResourceList(item.curr, resType, search);
						}
					}
				});
			})
		} else {
			$('#resPage').hide();
		}
	},
	paperPage: function(total, pageNum) {
		if (total > 12) {
			$('#paperPage').show();

			layui.use('laypage', function() {
				var laypage = layui.laypage;
				//执行一个laypage实例
				laypage.render({
					elem: 'paperPage', //注意，这里的 test1 是 ID，不用加 # 号
					count: total, //数据总数，从服务端得
					limit: '12',
					theme: '#279EF0',
					curr: pageNum,
					groups: '5',
					layout: ['prev', 'page', 'next', 'limits', 'skip'],
					jump: function(item, first) {
						if (!first) {
							info.TableDataRequest(item.curr);
						}
					}
				});

			})
		} else {
			$('#paperPage').hide();
		}
	},
	//查询from
	//点击查看查找所有关联的用户
	selectTaskUsers: function(taskId) {
		$.ajax({
			url: Url + 'manage_system/task/user-ok',
			data: {
				'taskId': taskId
			},
			dataType: 'json',
			type: 'GET',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(res) {
				var Html = [];
				res.data.forEach(function(item, index) {
					Html.push('<tr>');
					Html.push('<td><span>' + item.userName + '</span></td>');
					var status = '';
					if (item.status === 0) {
						status = '未完成'
					} else {
						status = '已完成'
					}
					Html.push('<td>' + status + '</td>');
					if (item.score == null) {
						item.score = '-';
					}
					Html.push('<td>' + item.score + '</td></tr>')
				});
				$('#taskUserDegreeCompletion').html(Html.join(''));
			}
		})
	},
	//查找选择试卷
	TableDataRequest: function(pageNum, paperName) {
		$.ajax({
			url: Url + 'manage_system/paper/papers',
			data: {
				"pageNum": pageNum,
				"pageSize": 10,
				'paperName': paperName || ''
			},
			dataType: 'json',
			Type: 'GET',
			beforeSend: function(value){
				All.setToken(value);
			},
			success: function(res) {
				if (res || res.data !== null) {
					var Html = [];
					res.data.list.forEach(function(item, index) {
						Html.push('<tr>');
						if (item.paperName.length > 9) {
							// 转义(已防有标签的样式被html识别)
							item.paperName = $('<div>').text(item.paperName).html();
							// 转码
							var newPaperName = escape(item.paperName);
							Html.push('<td class="paperName" title="' + item.paperName + '" data-paperName="' + newPaperName +
								'"><pre>' + item.paperName.substring(0, 9) + '...</pre></td>');
						} else {
							// 转义(已防有标签的样式被html识别)
							item.paperName = $('<div>').text(item.paperName).html();
							Html.push('<td class="paperName" title="' + item.paperName + '" data-paperName="' + item.paperName +
								'"><pre>' + item.paperName + '</pre></td>');
						}
						Html.push('<td style="text-align: center;">' + item.single + '</td>');
						Html.push('<td style="text-align: center;">' + item.many + '</td>');
						Html.push(
							'<td><div  class="site-demo-button"><button value="' +
							item.paperId +
							'" type="button" class="layui-btn layui-btn-primary layui-btn-sm layui-btn-normal selectPaper">选择</button></div></td>'
						);
						Html.push('</tr>');
					});
					$('#papgeContent').html(Html.join(''));
					info.paperPage(res.data.total, res.data.pageNum);
					// 选择按钮的点击事件
					$('.selectPaper').off('click').on('click', function() {
						$('.selectPapers').val($(this).val());
						var Html = [];
						// 解码并转义 转码部分：unescape(paperName)(转成HTML可以识别的代码)
						var paperName =$(this).parents().children(".paperName").text();

						paperName = $('<div>').html(unescape(paperName)).text();
						// 转义(特殊符号转成例：&lt; = (<))
						paperName = $('<div>').text(paperName).html();
						if (paperName.length > 30) {
							Html.push('：' + paperName.substring(0, 30) + '...');
						} else {
							Html.push('：' + paperName);
						}
						$('.paperAdd').html(Html.join(''));
						// $('.paperAdd').val($(this).val());
						$('.paperAdd').attr('data-id', $(this).val());
						// 转义(转成HTML可以识别的代码)
						paperName = $('<div>').html(paperName).text();
						$('.paperAdd').attr('title', paperName);

						layer.close(layer.index);
					})
				}
			},
			error: function(e) {}
		});
	},
	//查询总条数(不显示)
	selectTaskCount: function() {
		$.ajax({
			url: Url + 'manage_system/task/count',
			data: {},
			dataType: 'json',
			type: 'GET',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(res) {

			}
		})
	},
	//查询所有用户
	selectAllUser: function(userName) {
		$.ajax({
			url: Url + 'manage_system/task/users',
			data: {
				'userName': userName
			},
			dataType: 'json',
			type: 'GET',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(res) {
				if (res.code === 1) {
					var Html = [];
					res.data.forEach(function(item, index) {
						Html.push('<span class="layui-form-label" style="font-size: 16px;"><input type="checkbox" value="' + item.pkId +
							'"class="checkAll " name="Staff" lay-skin="primary" lay-filter="c_one" ><i>' + item.userName +
							'</i></span>');
					});
					$('#selectTaskUsers').html(Html.join(''));
					$("#checkAll").prop("checked", false);
					layui.use('form', function() {
						var form = layui.form;
						form.render('');
					});
				}
			}
		})
	},

	//添加任务
	addTask: function() {
		var resId = $('.radio_box .checked').attr('data-resid');
		var mistake = '';
		// var resId=$("input[name=res]:checked").val();
		var index = true;
		var userId = '';
		$.each($("[name='Staff']:checked"), function(i, val) {
			userId += ',' + val.value
		});
		if ($('#test1').val() === '') {
			mistake = '请选择开始时间!';
			index = false;
		}
		if ($('#test2').val() === '') {

			mistake = '请选择结束时间';
			index = false;
		}
		if ($('#test1').val() > $('#test2').val()) {
			mistake = '结束时间不能小于开始时间';
			index = false;
		}
		if (userId === '') {
			mistake = '请选择做任务人员';
			index = false;
		}
		if ($('#taskType').val() === '1') {
			if (resId == undefined) {
				mistake = '请选择资源！';
				index = false;
			}
			if ($('.selectPapers').val() === '') {
				mistake = '请选择试卷！';
				index = false;
			}

		} else if ($('#taskType').val() === '2') {
			if (resId == undefined) {
				mistake = '请选择资源！';
				index = false;
			}
		} else if ($('#taskType').val() === '3') {
			if ($('.selectPapers').val() === '') {
				mistake = '请选择试卷！';
				index = false;
			}
		}
		if ($('.taskName').val() === '') {
			mistake = '任务名不能为空哦！';
			index = false;
		}
		var data = {
			'resId': resId,
			'paperId': $('.paperAdd').attr('data-id'),
			'taskType': $('#taskType').val(),
			'taskName': $('.taskName').val(),
			'taskRemark': $('.taskRemark').val(),
			'status': 1,

			'startTime': dateFormata($('#test1').val()),
			'endTime': dateFormata($('#test2').val()),
			'userId': userId

		};
		if (index != false) {
			$.ajax({
				url: Url + 'manage_system/task/tasks',
				data: JSON.stringify(data),
				dataType: 'json',
				type: 'POST',
				contentType: 'application/json;charset=utf-8',
				beforeSend() {
					layer.load(2);
				},
				beforeSend: function(value){
					All.setToken(value);
				},
				success(res) {
					if (res.code == 1) {
						layer.msg('发布成功');
						setTimeout(function() {
							layer.closeAll();
						}, 3000);
						info.selectTaskType(1, '');
					}
				}
			});
		} else {
			layer.msg(mistake, {
				area: ['200px', '50px']
			});
		}
	},
	//查询资源
	selectResourceList: function(pageNum, resType, resName) {
		if (resName === undefined) {
			resName = ''
		}
		$.ajax({
			url: Url + 'manage_system/resource/resources',
			data: {
				'pageNum': pageNum || 1,
				'pageSize': 9,
				'resType': resType,
				'resName': resName
			},
			dataType: 'json',
			type: 'GET',
			contentType: 'application/json;charset=utf-8',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(res) {
				var Html = [];
				res.data.list.forEach(function(item, index) {
					Html.push('<div class="radio_box" >');
					Html.push('<div class="img-box" data-resid="' + item.resId + '" data-resName="' + item.resName + '">');
					if (item.resType === 1) {
						Html.push('<img src="http://192.168.188.109:8848/' + item.imgPath +
							'"  style="width:140px;height:140px;">')
					} else if (item.resType === 2) {
						Html.push('<img src="../imgs/yinpin.jpg.png" >')
					} else if (item.resType === 3) {
						if (item.resExt != '.txt') {
							Html.push('<img  src="../imgs/w4.jpg" >')
						} else {
							Html.push('<img src="../imgs/w2.jpg" >')
						}
					} else if (item.resType === 4) {
					Html.push('<img src="' + FileUrl + item.path +
						'"  style="width:140px;height:140px;"/>')
					}
					Html.push('</div>');
					Html.push('<p class="resName">' + item.resName + '</p>');
					Html.push('</div>');
				});
				$('#resource').html(Html.join(''));
				$('.radio_box').off('click').on('click', function() {
					$(this).find('.layui-unselect').addClass('layui-form-radioed');
					$(this).find('.layui-unselect').find('i').addClass('layui-anim-scaleSpring')
				});
				info.resPage(res.data.total, res.data.pageNum, resType);
				/***********资源选择模拟********/
				$('.img-box').off('click').on('click', function() {
					$('.img-box').removeClass('checked');
					$(this).addClass('checked');
					$('.Release_btn button').attr('data-resid', $(this).attr('data-resid'));
					$('.Release_btn button').attr('data-resname', $(this).attr('data-resname'));
				});

			}
		})
	},
	//查询任务类型
	selectTaskType: function(pageNum, search, type) {
		$.ajax({
			url: Url + 'manage_system/task/type',
			data: {},
			dataType: 'json',
			type: 'GET',
			contentType: 'application/json;charset=utf-8',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(res) {
				var Html = [];
				res.data.forEach(function(item, index) {
					var taskType = item.split(",");
					Html.push('<option value="' + taskType[0] + '">' + taskType[1] + '</option>');
				});
				$('#taskType').html(Html.join(''));
				layui.use('form', function() {
					var form = layui.form;
					form.render('');
				});
				if (type != 1) {
					info.selectTaskAll( pageNum, search);
				}

			}
		})
	},
	//查询全部
	selectTaskAll: function(pageNum, search) {
		if (search === undefined) {
			search = null
		}
		$.ajax({
			url: Url + 'manage_system/task/tasks',
			data: {
				'status': 1,
				'userId': '',
				'userType': 2,
				"pageNum": pageNum,
				"pageSize": 12,
				'taskName': search
			},
			dataType: 'json',
			type: 'GET',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(res) {
				var Html = [];
				res.data.list.forEach(function(item, index) {
					// 转义(已防有标签的样式被html识别)
					item.taskName = $('<div>').text(item.taskName).html();
					Html.push('<tr>');
					if (item.taskName.length > 14) {
						Html.push('<td class="oneselfTaskName" title="' + item.taskName + '"><pre>' + item.taskName.substring(0, 14) +
							'...</pre></td>');
					} else {
						Html.push('<td class="oneselfTaskName" title="' + item.taskName + '"><pre>' + item.taskName + '</pre></td>');
					}
					if (item.taskType == 1) {
						Html.push('<td >综合任务</td>');
					} else if (item.taskType == 2) {
						Html.push('<td >学习任务</td>');
					} else if (item.taskType == 3) {
						Html.push('<td >测试任务</td>');
					}
					Html.push('<td>' + dateFormata(item.startTime) + ' - ' + dateFormata(item.endTime) + '</td>');
					// 转码
					var newTaskName = escape(item.taskName);
					Html.push(
						'<td><button style="width: 55px;height: 25px;margin-right:20px; margin-left: 20px; background-color: #FFFFFF;border: none;float: left;" data-taskName="' +
						newTaskName + '" class="updateTaskName"value="' +
						item.taskId + '">重命名</button>' +
						'<button class="lookOver" style="width: 65px;height: 25px;margin-right:20px;border: none;background-color: #FFFFFF; margin-left: 20px; float: left;"value="' +
						item.taskId + '">完成情况</button>' +
						'<button class="deleteTask" style="width: 55px;height: 25px;margin-right:20px;border: none;background-color: #FFFFFF; margin-left: 20px; float: left;" value="' +
						item.taskId + '"><span>删除</span></button></td>'
					);
					Html.push('</tr>');
				});

				JumpPageNum = res.data.pageNum;
				JumpTotal = res.data.total;
				// if (res.data.total >= 13) {
				info.Page(res.data.total, res.data.pageNum);
				// }
				$('.search').val('');
				$('#taskContent').html(Html.join(''));
				//点击弹出重命名
				$('.updateTaskName').off('click').on('click', function() {
					// 取转码之后的值
					var taskName = $(this).attr('data-taskName');
					// 解码并转义 转码部分：unescape(rename)
					taskName = $('<div>').html(unescape(taskName)).text();
					$('.taskNameupdate').val(taskName);
					info.popupsUpdateTaskName(taskName, $(this).val());
					$('.confirmAdd').val($(this).val())
				});
				//点击删除 删除点击的任务
				$('.deleteTask').off('click').on('click', function() {
					//调用common.js公共
					All.layuiOpen({
						num: 3,
						taskId: $(this).val(),
						// JumpPageNum: JumpPageNum,
						msg: '是否删除任务？'
					});
					// info.delectTask(taskId);
				});
				$('.confirmAdd').off('click').on('click', function() {
					info.updateTaskName($(this).val());
					info.selectTaskType($('.layui-laypage-skip .layui-input').val(), $('.search').val())
				});
				$('.oneselfTaskName').off().on('click', function() {
					var taskId = $(this).parents('tr').children('td').children('.updateTaskName').val();
					var taskType = $(this).parents('tr').children('td').children('.taskTypeRecord').val();
					window.open("../TestPage/TestPage.html?value=" + taskId + "," + 1, "_blank");
				});
				$('.lookOver').off().on('click', function() {
					info.selectTaskUsers($(this).val());
					layer.open({
						type: 1,
						move: false,
						title: ['完成情况',
							'color:#fff;background-color:#279EF0;text-align: center;font-size: 20px;cursor: default;'
						],
						skin: 'myskin',
						area: ['600px', '500px'],
						content: $('#examineTask'),
						success: function() {

						}
					})
				})
				//弹出查看
			}
		})
	},
	//修改任务名根据主键
	updateTaskName: function(taskId, taskName) {

		// var taskName = $('.taskNameupdate').val();
		var data = {
			'taskName': taskName,
		};
		if (taskName != '') {

			$.ajax({
				url: Url + 'manage_system/task/task/' + taskId,
				data: data,
				dataType: 'json',
				type: 'POST',
				// contentType: 'application/json;charset=utf-8',
				beforeSend: function(value){
					All.setToken(value);
				},
				success(res) {
					layer.close(layer.index);
					if (res) {

						layer.msg('修改成功', {
							area: ['200px', '50px']
						});
						info.selectTaskType(1, '');
					}
				}
			})
		} else {
			layer.msg('不可为空', {
				area: ['200px', '50px']
			});
		}
	},
	//刪除任務 根据主键删除
	delectTask: function(taskId) {
		$.ajax({
			url: Url + 'manage_system/task/' + taskId,
			data: {},
			dataType: 'json',
			type: 'DELETE',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(res) {
				if (res) {
					if (JumpTotal % 12 == 1 && JumpPageNum == Math.ceil(JumpTotal / 12)) {
						info.selectTaskType(JumpPageNum - 1)
					} else {
						info.selectTaskType(JumpPageNum);
					}

				}
			}
		})
	}
};


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
	return year + "-" + month + "-" + day + " " + (hours) + ":" + minutes + ":" + seconds;
};

// 时间设置
var firstToday = '';
var lastToday = '';
$(document).ready(function() {
	var time = new Date();
	var day = ("0" + time.getDate()).slice(-2);
	var newDay = ("0" + (time.getDate() + 1)).slice(-2);
	var month = ("0" + (time.getMonth() + 1)).slice(-2);
	var hours = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getDay();
	firstToday = time.getFullYear() + "-" + (month) + "-" + (day) + " " + hours + ":" + minutes + ":" + seconds;
	lastToday = time.getFullYear() + "-" + (month) + "-" + (newDay) + " " + hours + ":" + minutes + ":" + seconds;
});
