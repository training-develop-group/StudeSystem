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
	info.Page();
	info.TableDataRequest();
});

var info = {
	//表格数据请求
	TableDataRequest : function() {
		$.ajax({
			url: MCUrl + 'manage_system/paper/papers',
			// data: {
				
			// },
			dataType: 'json',
			Type: 'GET',
			success: function(res) {
				if (res || res.data !== null) {
					info.TableDrawing(res.data);
				}
			},
			error: function(e) {
	
			}
		});
	},
	//表格会绘制
	TableDrawing : function(data){
		var Html = [];		// 选项
		// var data = {
		// 	total: data.total,
		// 	list: data.list,
		// 	pageNum: data.pageNum
		// };
		data.forEach(function(item, index) {
			if (item.status == 0){
				item.status = '失效';
			} else {
				item.status = '正常';
			}
			Html.push('<tr>');
			Html.push('<td hidden="hidden"><span class="paperId">' + item.paperId + '</span></td>');
			Html.push('<td><span class="rename">' + item.paperName + '</span></td>');
			Html.push('<td class="middle">' + item.status + '</td>');
			Html.push('<td class="middle">' + item.single + '</td>');
			Html.push('<td class="middle">' + item.many + '</td>');
			Html.push('<td>');
			Html.push('<button type="button" class="layui-btn layui-btn-primary edit">编辑</button>');
			Html.push('<button type="button" class="layui-btn layui-btn-primary selectedTopic">选题</button>');
			Html.push('<button type="button" class="layui-btn layui-btn-primary toView">查看</button>');
			Html.push('<button type="button" class="layui-btn layui-btn-primary delete">删除</button>');
			Html.push('</td>');
			Html.push('</tr>');
		});
		$('#examinationPaperInformation').html(Html.join(''));
		// 点击删除
		$('.delete').click(function() {
			// var thiss = this;
			var paperId = $(this).parent().parent().find('.paperId').text();
			layer.msg('是否删除', {
				time: false, //20s后自动关闭
				btn: ['确认', '取消'],
				yes: function(){ 
					// 删除this的父级的父级
					// $(thiss).parent().parent().remove();
					// 删除方法
					info.deletePaper(paperId);
					// 关闭提示框
					layer.closeAll();
				}
			});
		});
		// 点击查看
		$('.toView').click(function() {
			// window.location.href = "htmls/ViewTestPaper/ViewTestPaper.html";
			window.open("htmls/ViewTestPaper/ViewTestPaper.html" , "_blank");
		});
		// 点击选题
		$('.selectedTopic').click(function() {
			// window.location.href = "htmls/EditorTestPaper/EditorTestPaper.html";
			window.open("htmls/EditorTestPaper/EditorTestPaper.html" , "_blank");
			// window.open("../TestQuestions/TestQuestions.html" , "_blank");
		});
		// 点击编辑进行重命名
		$('.edit').click(function() {
			var rename = $(this).parent().parent().find('.rename').text();
			var paperId = $(this).parent().parent().find('.paperId').text();
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
							+ '<button type="button" class="layui-btn layui-btn-primary renameConfirm">确认</button>'
							+ '<button type="button" class="layui-btn layui-btn-primary renameCancel">取消</button>'
						+ '</div>'
				});
				$('.acquiredValue').val(rename);
				// 点击确认
				$('.renameConfirm').click(function() {
					// 修改方法
					info.rename(paperId);
				});
				// 点击取消
				$('.renameCancel').click(function() {
					layer.closeAll();
				});
			});
		});
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
						+ '<button type="button" class="layui-btn layui-btn-primary newTestPaperConfirm">确认</button>'
						+ '<button type="button" class="layui-btn layui-btn-primary newTestPaperCancel">取消</button>'
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
			alert("试卷名不可为空");
			return false;
		}
		var data = {
			'paperName': paperName,
			'cTime': today,
			'cUser': 'mc'
		};
		$.ajax({
			url : MCUrl + 'manage_system/paper/paper',
			data : JSON.stringify(data),
			dataType : 'json',
			type : 'POST',
			contentType :'application/json;charset=utf-8',
			success(res) {
				console.log("操作成功");
				// alert("操作成功");
				parent.location.reload();	//刷新父级页面
			},
			error (e) {
				alert("操作失败，请稍后再试");
			}
		});
	},
	// 修改方法(重命名)
	rename : function(paperId){
		var paperName = $('.acquiredValue').val();
		if (paperName == ''){
			alert("重命名不可为空");
			return false;
		}
		var data = {
			// 'paperId': paperId,
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
				parent.location.reload();	//刷新父级页面
			},
			error (e) {
				alert("操作失败，请稍后再试");
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
				// $(thiss).parent().parent().remove();
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