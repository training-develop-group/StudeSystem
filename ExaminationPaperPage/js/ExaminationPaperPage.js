$(function() {

	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;

		All.getMenu({
			search: 1,
			type: 1,
			num: 4
		});
		// 点击回车
		$('.search').keypress(function(e) {
			if (e.which == 13) {
				info.TableDataRequest(1)
			}
		})
	});
	info.selectAllUser('');
	//用户模糊查询 回车
	$(".userNameRetrieval").keypress(function(e) {
		if (e.which == 13) {
			var userNameRetrieval = $.trim($('.userNameRetrieval').val());
			info.selectAllUser(userNameRetrieval);
		}
	});
	
	layui.use(['layer', 'form', 'laydate'], function() {
		var layer = layui.layer,
		form = layui.form;
	form.on('checkbox(Staff)', function(data) {
		var a = data.elem.checked;
		if (a == true) {
			$(".checkAll").prop("checked", true);
			form.render('checkbox');
		} else {
			$(".checkAll").prop("checked", false);
			form.render('checkbox');
		}
	});
	form.on('checkbox(c_one)', function (data) {
      var item = $(".checkAll");
      for (var i = 0; i < item.length; i++) {
          if (item[i].checked == false) {
              $("#checkAll").prop("checked", false);
              form.render('checkbox');
              break;
          }
      }
      //如果都勾选了  勾上全选
      var  all=item.length;
      for (var i = 0; i < item.length; i++) {
          if (item[i].checked == true) {
              all--;
          }
      }
	if(all==0){
		$("#checkAll").prop("checked", true);
		form.render('checkbox');
	}
	
	})
	// 点击确认(选择人员)
	$('.usersSelectOk').click(function() {
		var Html = [];
		$.each($("[name='Staff']:checked"), function(i, val) {
			Html.push('<p>' + $(this).siblings('i').text() + '<input type="text"  hidden="" id="" value="' + $(this).val() +
				'" />  <i  data-id="' + $(this).val() +
				'" class="layui-icon layui-icon-close deleteUserName"></i></p>'
			)
		})
		$('.taskUsers').html(Html.join(''));
		$('.deleteUserName').click(function() {
			$(this).parents('p').remove();
			var userId = $(this).attr('data-id');
			$.each($("[name='Staff']:checked"), function(i, val) {
				if (val.value == userId) {
					$("#checkAll").prop("checked", false);
					$(this).prop("checked", false);
					layui.use('form', function() {
						var form = layui.form;
						form.render('');
					});
				}
			})
		})
		layer.close(layer.index);
	});
	$('.search').keypress(function(e) {
		if (e.which == 13) {
			var search = $('.search').val();
			info.TableDataRequest(1, search);
		}
	});
	var laydate = layui.laydate;
	//执行一个laydate实例
	laydate.render({
		elem: '#test1', //指定元素,
		theme: '#40AFFE',
		type: 'datetime'
	});
	laydate.render({
		elem: '#test2', //指定元素,
		theme: '#40AFFE',
		type: 'datetime'
	});
	form.render('select');
	form.render('checkbox');
});
	// 点击确认(发布)
	$('.addOk').click(function() {
		info.addTask();
	});
	//弹出选择人员
	$('.selectPersonnel').click(function() {
		layer.open({
			type: 1,
			title: ['选择人员', 'color:#fff;background-color:#40AFFE;border-radius: 7px 7px 0 0;overflow-x: hidden;font-size: 20px;text-align: center; padding: 0;'],
			shadeClose: true,
			move: false,
			shade: 0.5,
			skin: 'myskin',
			area: ['600px', '474px'],
			content: $('#selectPersonnel'),
			success: function() {
				
			}
		})
	});
	// 新建试卷
	$('#newTestPaper').click(function() {
		info.newTestPaper();
	});
	info.TableDataRequest(1);
});
var newPaperId;
var newPaperName = '';
var PNum = 1;
var info = {
	//表格数据请求
	TableDataRequest : function(pageNum) {
		var paperName = $.trim($('.search').val());
		if (paperName == undefined){
			paperName = '';
		}
		var data = {
			"pageNum": pageNum,
			"pageSize": 12,
			'paperName' : paperName
		}
		$.ajax({
			url: MCUrl + 'manage_system/paper/papers',
			data: data,
			dataType: 'json',
			Type: 'GET',
			success: function(res) {
				if (res || res.data != null) {
					info.TableDrawing(res.data);
				}
			},
			error: function(e) {
	
			}
		});
	},
	//表格会绘制
	TableDrawing : function(param){
		var Html = [];		// 选项
		var data = {
			total: param.total,
			list: param.list,
			pageNum: param.pageNum
		};
		PNum = data.pageNum;
		data.list.forEach(function(item, index) {
			if (item.status == 0){
				item.status = '未发布';
			} else {
				item.status = '已发布';
			}
			// 转义(已防有标签的样式被html识别)
			item.paperName = $('<div>').text(item.paperName).html();
			Html.push('<tr>');
			Html.push('<td><span class="rename" title="' + item.paperName + '">' + item.paperName + '</span></td>');
			Html.push('<td class="middle">' + item.status + '</td>');
			Html.push('<td class="middle">' + item.single + '</td>');
			Html.push('<td class="middle">' + item.many + '</td>');
			Html.push('<td>');
			if(item.status == '已发布'){
				Html.push('<button type="button" class="layui-btn layui-btn-primary edit" data-id="' + item.paperId + '">重命名</button>');
				Html.push('<button type="button" class="layui-btn layui-btn-primary publish" data-id="' + item.paperId + '">发布</button>');
				Html.push('<button type="button" class="layui-btn layui-btn-primary toView" data-id="' + item.paperId + '">查看</button>');
			} else {
				Html.push('<button type="button" class="layui-btn layui-btn-primary edit" data-id="' + item.paperId + '">重命名</button>');
				Html.push('<button type="button" class="layui-btn layui-btn-primary selectedTopic" data-id="' + item.paperId + '">编辑</button>');
				Html.push('<button type="button" class="layui-btn layui-btn-primary publish" data-id="' + item.paperId + '">发布</button>');
				Html.push('<button type="button" class="layui-btn layui-btn-primary toView" data-id="' + item.paperId + '">查看</button>');
				Html.push('<button type="button" class="layui-btn layui-btn-primary delete" data-id="' + item.paperId + '">删除</button>');
			}
			Html.push('</td>');
			Html.push('</tr>');
		});
		$('#examinationPaperInformation').html(Html.join(''));
		// 点击删除
		$('.delete').click(function() {
			var paperId = $(this).attr('data-id');
			All.layuiOpen({
				num: 2,
				paperId: paperId,
				msg: '是否删除该试卷'
			})
		});
		// 点击发布
		$('.publish').click(function() {
			newPaperId = $(this).attr('data-id');
			newPaperName = $(this).parent().parent().find('.rename').text();
			// 单选题数
			var single = $(this).parent().parent().find("td:nth-child(3)").text();
			// 多选题数
			var many = $(this).parent().parent().find("td:nth-child(4)").text();
			if (single == 0 && many == 0){
				// (待改)
				All.layuiOpen({
					num: 4,
					msg: '此试卷没有试题，确认发布？'
				})
			} else {
				info.releaseTask();
			}
		});
		// 点击查看
		$('.toView').click(function() {
			var paperId = $(this).attr('data-id');
			window.open("../ViewTestPaper/ViewTestPaper.html?value=" + paperId + "" , "_blank");
		});
		// 点击选题
		$('.selectedTopic').click(function() {
			var paperId = $(this).attr('data-id');
			window.open("../EditorTestPaper/EditorTestPaper.html?value=" + paperId + "" , "_blank");
		});
		// 点击编辑进行重命名
		$('.edit').click(function() {
			var rename = $(this).parent().parent().find('.rename').text();
			var paperId =$(this).attr('data-id');
			// 公共修改弹出框
			All.layuiOpenRename({
				num: 1,
				id: paperId,
				returnValue: rename,
				msg: '试卷名称'
			})
		});
		if (data.total > 12){
			info.Page(data.total , data.pageNum);
			// 判断paging里是否头内容↓
		} else if ($('#paging').is(':empty') == false) {
			// 清空#paging里的内容与标签
			$('#paging').empty();
		}
	},
	// 分页
	Page : function(total , pageNum){
		layui.use(['laypage', 'layer'], function() {
			var laypage = layui.laypage,
				layer = layui.layer;
			//完整功能
			laypage.render({
				elem: 'paging'
				, count: total
				, limit: 12
				, theme: '#279ef0'
				, curr: pageNum
				, groups: '5'
				, layout: ['prev', 'page', 'next' , 'limits' , 'skip']
				, jump: function(item , first) {
					if (!first){
						info.TableDataRequest(item.curr);
					}
				}
			});
		});
			layui.use('laypage', function() {
				var laypage = layui.laypage;
		
				laypage.render({
					elem: 'test1',
					count: 30,
					theme: '#279ef0',
					layout:['prev','page','next','limits','skip']
				});
			});
	},
	// 新建试卷
	newTestPaper : function() {
		layui.use("layer", function() {
			var layer = layui.layer;
			layer.open({
				type: 1 //Page层类型
				,closeBtn: 1
				,move: false
				,area: ['789px', '210px']
				,title: ['新建试卷', 'background-color: #279ef0;text-align: center;font-size: 20px;line-height: 42px;color:white; cursor: default; padding: 0']
				// ,shade: 0.6 //遮罩透明度
				,content: '<div class="inputLocation">'+
						'<span style="cursor: default;">试卷名称</span>'
						+ '<input type="text" autocomplete="off" id="nameOfExaminationPaper" class="layui-input">'
						+ '<div class="btn-box">'
						+ '<button type="button" class="layui-btn layui-btn-primary newTestPaperConfirm">确认</button>'
						+ '<button type="button" class="layui-btn layui-btn-primary newTestPaperCancel">取消</button>'
						+ '</div>'
					+ '</div>'
			});
			// 点击确认
			$('.newTestPaperConfirm').click(function() {
				// 调用添加方法
				info.increase();
			});
			// 点击取消
			$('.newTestPaperCancel').click(function() {
				layer.closeAll();
			});
		});
	},
	// 添加方法(新建试卷)
	increase : function(){
		var paperName = $('#nameOfExaminationPaper').val();
		if (paperName == ''){
			layer.msg("试卷名不可为空");
			return false;
		}
		var blank = /^[\s]*$/;		//空白符和字符串，字符串
		if (blank.test(paperName)){
			layer.msg("重命名不可全是空格");
			return false;
		}
		$.ajax({
			url : MCUrl + 'manage_system/paper/paper',	
			data: {
				'paperName': paperName
			},
			dataType : 'json',
			type : 'POST',
			success(res) {
				console.log("操作成功");
				// parent.location.reload();	//刷新父级页面
				layer.closeAll();
				info.TableDataRequest(1);
			},
			error (e) {
				layer.msg("操作失败，请稍后再试");
			}
		});
	},
	// 修改方法(重命名)
	rename : function(paperId , paperName){
		var data = {
			'paperId': paperId,
			'paperName': paperName,
		};
		$.ajax({
			url : MCUrl + 'manage_system/paper/paper-name',
			data : JSON.stringify(data),
			dataType : 'json',
			type : 'POST',
			contentType :'application/json;charset=utf-8',
			success(res) {
				console.log("操作成功");
				// parent.location.reload();	//刷新父级页面
				layer.closeAll();
				layer.msg("操作成功");
				info.TableDataRequest(PNum);
				
			},
			error (e) {
				layer.msg("操作失败，请稍后再试");
			}
		});
	},
	// 删除方法(删除)
	deletePaper : function(paperId){
		$.ajax({
			url: MCUrl + 'manage_system/paper/' + paperId,
			// dataType: 'json',
			type: 'DELETE',
			// contentType: 'application/json;charset=utf-8',
			success(res) {
				// alert("操作成功");
				console.log("操作成功");
				layer.msg("操作成功");
				// parent.location.reload();	//刷新父级页面
				layer.closeAll();
				info.TableDataRequest(PNum);
			},
			error (e) {
				layer.msg("操作失败，请稍后再试");
			}
		});
	},
	// 发布任务弹窗
	releaseTask : function() {
		// 清空输入框
		$('.taskName').val('');
		$('.taskRemark').val('');
		$('.taskUsers').empty();
		// 清空试卷名
		$('.paperAdd').text('');
		// 试卷名赋值(赋当前试卷)
		$('.paperAdd').text(newPaperName);
		// 赋值今天时间(开始)
		$('#test1').val(firstToday);
		// 赋值明天时间(结束)
		$('#test2').val(lastToday);
		layer.open({
			type: 1,
			title: ['发布任务', 'color:#fff;background-color:#40AFFE;border-radius: 7px 7px 0 0;text-align: center; font-size: 20px; padding: 0;'],
			shadeClose: true,
			shade: 0.8,
			move: false,
			skin: 'myskin',
			area: ['700px', '748px'],
			content: $('#addTaskPage'),
			success: function() {
				layui.use('form', function() {
					var form = layui.form;
					form.render('select');
				});
			},
		});
	},
	//添加任务
	addTask: function() {
		var mistake = '';
		var resId = $("input[name=res]:checked").val();
		var index = true;
		var userId = ''
		$.each($("[name='Staff']:checked"), function(i, val) {
			userId += ',' + val.value
		})
		if ($('#test1').val() == '') {
			mistake = '请选择开始时间!';
			index = false;
		}
		if ($('#test2').val() == '') {
			mistake = '请选择结束时间'
			index = false;
		}
		if ($('#test1').val() > $('#test2').val()) {
			mistake = '结束时间不能小于开始时间'
			index = false;
		}
		if (userId == '') {
			mistake = '请选择做任务人员'
			index = false;
		}
		if ($('.taskName').val() == '') {
			mistake = '任务名不能为空哦！';
			index = false;
		}
		var data = {
			'resId': resId,
			'paperId': newPaperId,
			'taskType': $('#taskType').val(),
			'taskName': $('.taskName').val(),
			'taskRemark': $('.taskRemark').val(),
			'status': 1,
			'startTime': dateFormat($('#test1').val()),
			'endTime': dateFormat($('#test2').val()),
			'userId': userId
		}
		
		if (index != false) {
			console.log(data)
			$.ajax({
				url: LBUrl + 'manage_system/task/tasks',
				data: JSON.stringify(data),
				dataType: 'json',
				type: 'POST',
				contentType: 'application/json;charset=utf-8',
				success(res) {
					console.log(res.msg);
					layer.msg(res.msg);
					layer.closeAll();
					window.location.href = "../TaskPage/TaskPage.html";
					// 刷新页面
					// parent.location.reload();
					
				}
			})
		} else {
			layer.msg(mistake);
		}
	},
	//查询所有用户
	selectAllUser: function(userName) {
	
		$.ajax({
			url: LBUrl + 'manage_system/task/users',
			data: {
				'userName': userName
			},
			dataType: 'json',
			type: 'GET',
			success(res) {
				var Html = []
				res.data.forEach(function(item, index) {
					Html.push('<span class="layui-form-label" style="font-size: 16px;"><input type="checkbox" value="' + item.userId +
						'"class="checkAll " name="Staff" lay-skin="primary" lay-filter="c_one" ><i>' + item.userName +
						'</i></span>')
				})
				$('#selectTaskUsers').html(Html.join(''));
				layui.use('form', function(){
					var form = layui.form;
					form.render('checkbox');
					//各种基于事件的操作，下面会有进一步介绍
					});	
				}
			})
		},
}
// 格式化日期
var dateFormat =function(time) {
	var date=new Date(time);
	var year=date.getFullYear();
	/* 在日期格式中，月份是从0开始的，因此要加0
	* 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
	* */
	var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
	var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
	var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
	var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
	var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
	// 拼接	
	return year+"-"+month+"-"+day + " " + (hours) + ":" + minutes + ":" + seconds;
}
// 时间设置
var today = '';
var firstToday = '';
var lastToday = '';
$(document).ready(function () {
	var time = new Date();
	var day = ("0" + time.getDate()).slice(-2);
	var newDay = ("0" + (time.getDate() + 1)).slice(-2);
	var month = ("0" + (time.getMonth() + 1)).slice(-2);
	var hours = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getDay();
	// today = time.getFullYear() + "-" + (month) + "-" + (day);
	firstToday = time.getFullYear() + "-" + (month) + "-" + (day) + " " + hours + ":" + minutes + ":" + seconds;
	lastToday = time.getFullYear() + "-" + (month) + "-" + (newDay) + " " + hours + ":" + minutes + ":" + seconds;
});