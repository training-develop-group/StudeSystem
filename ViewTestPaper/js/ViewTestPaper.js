$(function() {

	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;
			
		All.getMenu({
			search: 1,
			type: 1,
			num: 4
		});
	});
	layui.use('form', function() {
		var form = layui.form;
		info.init();
	});
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
});

var info = {
	//页面主方法
	init: function() {
		layui.use('form', function() {
			var form = layui.form;
			form.render('select');
		});
		// 获取URL里的参数
		var urlinfo = window.location.href;
		value = urlinfo.split("?")[1].split("value=")[1];
		var PaperId = decodeURI(value);
		
		info.TableDataRequest(PaperId);
	},
	//表格数据请求
	TableDataRequest: function(PaperId) {
		// var paperId = 2;
		$.ajax({
			url: MCUrl + 'manage_system/paper/' + PaperId,
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
		console.log(data);
		data.questions.forEach(function(item, index) {
			Html.push('<li class="sortableitem">');
			Html.push('<div class="topicFramework">');
			Html.push('<input type="text" class="questionId" value="' + item.questionId + '" hidden="hidden"/>');
			if (item.questionType == 1){
				item.questionType = '单选题';
			} else {
				item.questionType = '多选题';
			}
			Html.push('<p class="num">'+ (index + 1) +'. ' + item.questionType + '<span>  ' + item.newScore + '分</span></p>');
			// 转义(已防有标签的样式被html识别)
			item.paperName = $('<div>').text(item.paperName).html();
			Html.push('<p class="distance">' + item.content + '</p>');
			item.optionInfo.forEach(function(items, index) {
				// 转义(已防有标签的样式被html识别)
				items.paperName = $('<div>').text(items.paperName).html();
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
			var QusetionId = $(this).parent().parent().find('.questionId').val();
			info.toViewAnalysis(QusetionId);
		});
	},
	// 查看解析(弹窗)
	toViewAnalysis: function(questionId) {
		// 解析内容
		var Analysis = '未定义';
		// 正确答案
		var OptionType = '未知';
		$.ajax({
			url: MCUrl + 'manage_system/question/answer',
			data: {
				'questionId': questionId
			},
			dataType: 'json',
			type: 'GET',
			success(res) {
				res.data.forEach(function(item, index) {
					Analysis = item.analysis;
					OptionType = item.optionType;
				});
				layui.use("layer", function() {
					var layer = layui.layer;
					layer.open({
						type: 1 //Page层类型
							,
						closeBtn: 1,
						area: ['790px', '300px'],
						title: ['查看解析',
								'background-color: #279ef0;text-align: center;font-size: 16px;line-height: 43px;color:white;letter-spacing: 5px;padding: 0px;'
							]
							// ,shade: 0.6 //遮罩透明度
							,
						content: '<div class="answerContent">' +
							'<p>正确答案：<span class="answerOptions">' + OptionType + '</span></p>' +
							'<p>答案解析：</p>' +
							'<p class="analysis">' + Analysis + '</p>' +
							'</div>'
					});
				});
			}
		});
	}
}