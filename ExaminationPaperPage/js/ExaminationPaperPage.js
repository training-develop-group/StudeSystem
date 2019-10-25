$(function() {

	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;

		All.getMenu({
			num: 4
		});
		$('.testQuestions').click(function() {
			console.log(1);
			// 跳转到试题
			window.location.href = "../TestQuestions/TestQuestions.html";
		});
		
		$('.resource').click(function() {
			console.log(2);
			// 跳转到资源
			window.location.href = "../ResourcePage/ResourcePage.html";
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
		info.newTestPaper();
	});
	// 点击删除
	$('.delete').click(function() {
		// 删除this的父级的父级
		$(this).parent().parent().remove();
		// 删除方法
		// deletePaper();
	});
	// 点击查看
	$('.toView').click(function() {
		window.location.href = "htmls/ViewTestPaper/ViewTestPaper.html";
	});
	// 点击选题
	$('.selectedTopic').click(function() {
		window.location.href = "htmls/EditorTestPaper/EditorTestPaper.html";
	});
	// 点击编辑进行重命名
	$('.edit').click(function() {
		layui.use("layer", function() {
			var layer = layui.layer;
			layer.open({
				type: 1 //Page层类型
				,closeBtn: 0
				,area: ['789px', '210px']
				,title: ['重命名', 'background-color: #279ef0;text-align: center;font-size: 16px;line-height: 50px;color:white;letter-spacing: 5px;padding: 0px;']
				// ,shade: 0.6 //遮罩透明度
				,content: '<div class="inputLocation">'+
						'<span>重命名</span>'
						+ '<input type="text" autocomplete="off" class="layui-input acquiredValue">'
						+ '<br />'
					+ '</div>'
				,btn: ['确认' , '取消'] //可以无限个按钮
				,btn1: function(index, layero){
					//按钮【确认】的回调
					// layer.close(index);
					// 修改方法
					info.rename();
				}
			});
		});
	});
	info.Page();
	// select();
});

var info = {
	// 修改方法(重命名)
	select : function(){
		$.ajax({
			url: 'http://localhost:8888/manage_system/paper/paperId',
			data: {
				'paperId': 2,
				'questionType': 1
			},
			dataType: 'json',
			type: 'GET',
			// contentType: 'application/json;charset=utf-8',
			success(res) {
				console.log(res.data);
			},
			error (e) {
				alert("操作失败，请稍后再试");
			}
		});
	},
	//表格数据请求
	TableDataRequest : function() {
		$.ajax({
			url: '',
			data: {
				
			},
			dataType: 'json',
			Type: 'GET',
			success: function(res) {
				if (res || res.data !== null) {
					info.TableDrawing();
				}
			},
			error: function(e) {
	
			}
		});
	},
	//表格会绘制
	TableDrawing : function(){
		var index = 15;
		var Html = [];		// 选项
		// data.list.forEach(function(item, index) {
			Html.push('<tr>');
			Html.push('<td><span class="rename">微课程</span></td>');
			Html.push('<td class="middle">已发</td>');
			Html.push('<td class="middle">10</td>');
			Html.push('<td class="middle">20</td>');
			Html.push('<td>');
			Html.push('<button type="button" class="layui-btn layui-btn-primary edit">编辑</button>');
			Html.push('<button type="button" class="layui-btn layui-btn-primary selectedTopic">选题</button>');
			Html.push('<button type="button" class="layui-btn layui-btn-primary toView">查看</button>');
			Html.push('<button type="button" class="layui-btn layui-btn-primary delete">删除</button>');
			Html.push('</td>');
			Html.push('</tr>');
		// });
		$('#examinationPaperInformation').html(Html.join(''));
	},
	// 分页
	Page : function(){
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
				// layout: ['prev', 'page', 'next' , 'count' , 'skip'],
				layout: ['prev', 'page', 'next' , 'limits' , 'skip'],
				jump: function(item , first) {
					if (!first){
						console.log(first);
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
				,btn: ['确认' , '取消'] //可以无限个按钮
				,btn1: function(index, layero){
					//按钮【确认】的回调
					info.increase();		// 调用添加方法
				}
			});
		});
	},
	// 添加方法(新建试卷)
	increase : function(){
		var paperName = $('#nameOfExaminationPaper').val();
		if (paperName == ''){
			alert("试卷名不可为空");
			return false;
		}
		var data = {
			'paperName': paperName,
			'cTime': today,
			'cUser': 'mc'
		};
		$.ajax({
			url : 'http://localhost:8888/manage_system/paper/paper',
			data : JSON.stringify(data),
			dataType : 'json',
			type : 'POST',
			contentType :'application/json;charset=utf-8',
			success(res) {
				console.log(res)
				alert("操作成功");
				// parent.location.reload();	//刷新父级页面
			},
			error (e) {
				alert("操作失败，请稍后再试");
			}
		});
	},
	// 修改方法(重命名)
	rename : function(){
		var paperName = $('.acquiredValue').val();
		if (paperName == ''){
			alert("重命名不可为空");
			return false;
		}
		var data = {
			// 'paperId': paperId,
			'paperId': 4,
			'paperName': paperName,
		};
		$.ajax({
			url : 'http://localhost:8888/manage_system/paper/paper-name',
			data : JSON.stringify(data),
			dataType : 'json',
			type : 'POST',
			contentType :'application/json;charset=utf-8',
			success(res) {
				alert("操作成功");
				parent.location.reload();	//刷新父级页面
			},
			error (e) {
				alert("操作失败，请稍后再试");
			}
		});
	},
	// 修改方法(重命名)
	deletePaper : function(){
		var paperId = 4;
		$.ajax({
			url: 'http://localhost:8888/manage_system/paper/' + paperId,
			// dataType: 'json',
			type: 'DELETE',
			// contentType: 'application/json;charset=utf-8',
			success(res) {
				alert("操作成功");
				parent.location.reload();	//刷新父级页面
			},
			error (e) {
				alert("操作失败，请稍后再试");
			}
		});
	}
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
	return year+"-"+month+"-"+day;
}
// 时间设置
var today = '';
$(document).ready(function () {
	var time = new Date();
	var day = ("0" + time.getDate()).slice(-2);
	var month = ("0" + (time.getMonth() + 1)).slice(-2);
	today = time.getFullYear() + "-" + (month) + "-" + (day);
});