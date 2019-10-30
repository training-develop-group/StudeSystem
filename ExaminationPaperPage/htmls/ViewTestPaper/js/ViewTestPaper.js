$(function() {

	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;
			
		
	});
	layui.use('form', function() {
		var form = layui.form;
		info.init();
	});
	// 资源
	$('#resource').click(function(){
		window.location.href = "../../../ResourcePage/ResourcePage.html";
	})
	// 试卷(特殊)
	$('#actives').click(function(){
		window.location.href = "../../ExaminationPaperPage.html";
	})
	// 试题
	$('#testQuestions').click(function() {
		window.location.href = "../../../TestQuestions/TestQuestions.html";
	});
	// 任务
	$('#taskPage').click(function(){
		window.location.href = "../../../TaskPage/TaskPage.html";
	})
	// 首页
	$('#homePage').click(function(){
		window.location.href = "../../../HomePage/HomePage.html";
	})
	// 新建试卷
	$('#newTestPaper').click(function() {
		// newTestPaper();
		layer.msg("暂无此功能");
	});
	
	$('.mobileFramework').clickSort({
	    speed:500,
	　　callback:function(){
		// alert('ok');
		// 结束后的通知与方法
	　　}
	});
	// 单选取值
	// $('.distance').click(function() {
	// 	var zhi = $("input[name = 'Sketch']:checked").val();
	// 	console.log(zhi);
	// });
	// 复选框取值
	// $(".distance").click(function(){
	// 	var arr = new Array();
	// 	$(".sortableitem input:checkbox[name='Sketch']:checked").each(function(i){
	// 	arr[i] = $(this).val();
	// });
	// 	var vals = arr.join(",");
	// 	console.log(vals,222);
	// });
});

var info = {
	//页面主方法
	init: function() {
		layui.use('form', function() {
			var form = layui.form;
			form.render('select');
		});
		info.TableDataRequest();
	},
	//表格数据请求
	TableDataRequest: function() {
		var paperId = 2;
		$.ajax({
			url: MCUrl + 'manage_system/paper/' + paperId,
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
	TableDrawing: function(data) {
		var Html = [];
		data.questions.forEach(function(item, index) {
			Html.push('<li class="sortableitem">');
			Html.push('<div class="topicFramework">');
			Html.push('<input type="text" class="qusetionId" value="' + item.paperId + '" hidden="hidden"/>');
			if (item.questionType = 1){
				item.questionType = '单选题';
			} else {
				item.questionType = '多选题';
			}
			Html.push('<p class="num">'+ (index + 1) +'. ' + item.questionType + '</p>');
			Html.push('<p class="distance">' + item.content + '</p>');
			item.optionInfo.forEach(function(items, index) {
				Html.push('<p class="distance">' + items.optionType + ' ' + items.content + '</p>');
			});
			Html.push('</div>');
			Html.push('<div class="functionBox">');
			Html.push('<button class="toView"><i class="layui-icon layui-icon-search"></i>查看解析</button>');
			Html.push('</div>');
			Html.push('</li>');
		});
		$('.mobileFramework').html(Html.join(''));
		// 解析
		$('.toView').click(function() {
			info.toViewAnalysis();
		});
	},
	// 查看解析(弹窗)
	toViewAnalysis : function(){
		layui.use("layer", function() {
			var layer = layui.layer;
			layer.open({
				type: 1 //Page层类型
				,closeBtn: 0
				,area: ['790px', '300px']
				,title: ['查看解析', 'background-color: #279ef0;text-align: center;font-size: 16px;line-height: 50px;color:white;letter-spacing: 5px;padding: 0px;']
				// ,shade: 0.6 //遮罩透明度
				,content: '<div class="answerContent">'
				+ '<p>正确答案：<span class="answerOptions">A</span></p>'
				+ '<p>答案解析：</p>'
				+ '<p class="analysis">《如此包装》是由由二群执导，石林、沈永年创作，赵丽蓉、巩汉林、孟薇等表演的小品，于1995年1月30日在《1995年中央电视台春节联欢晚会》上演出。</p>'
				+ '</div>'
				,btn: ['确认'] //可以无限个按钮
				,btn1: function(index, layero){
					//按钮【确认】的回调
					layer.close(index);
				}
			});
		});
	}
	
}