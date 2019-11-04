$(function() {
	var key = '';
	$(".search").focus(function() {
		$('.searchIcon').hide();
	});
	$(".search").blur(function() {
		if ($('.search').val() == '')
			$('.searchIcon').show();
	});
	TableDrawing();
	// $('.titleNumber').off('click').on('click', function() {
	// 	$(this).addClass("Discoloration").siblings().removeClass("Discoloration");	// 选中变色
	// });
	// $('.option').off('click').on('click', function() {
	// 	$('.option').removeClass("Discoloration");
	// 	$(this).addClass("Discoloration");	// 选中变色
	// 	key = $(this).val();
	// 	console.log(key);
	// });
	$('#videoLearning').click(function() {
		alert("暂无此功能");
		return false;		// 为了不变换选择条
	});
	
});
//表格数据请求
TableDataRequest = function() {
	$.ajax({
		url: '',
		data: {
			
		},
		dataType: 'json',
		Type: 'GET',
		success: function(res) {
			if (res || res.data !== null) {
				TableDrawing();
			}
		},
		error: function(e) {

		}
	});
};
//表格会绘制
var TableDrawing = function(){
	var index = 15;
	var Html = [];		// 选项
	var HtmlOne = [];		// 选项题目
	var HtmlTwo = [];		// 选项题号
	HtmlTwo.push('<br/>');
	HtmlTwo.push('<p>【答题卡】</p>');
	HtmlOne.push('<p class="bigQuestion"><b>1. 单选题 (10分)</b></p>');
	// data.list.forEach(function(item, index) {
		HtmlOne.push('<p class="minorTopic">' + "单选题001" + '</p>');
		Html.push('<p class="optionContent"><button class="option" style="margin-top: ' + (index + 5) + 'px;" value="'+ "A" + '">A</button><label>' + "正确" + '</label></p>');
		Html.push('<p class="optionContent"><button class="option" style="margin-top: ' + (index + 5) + 'px;" value="'+ "B" + '">B</button><label>' + "错误" + '</label></p>');
		
		HtmlTwo.push('<div class="titleNumber"><p>' + "1" + '</p></div>');
		HtmlTwo.push('<div class="titleNumber"><p>' + "2" + '</p></div>');
	// });
	HtmlTwo.push('<button class="submit">交卷</button>');
	$('.optionFramework').html(Html.join(''));
	$('.choiceQuestion').html(HtmlOne.join(''));
	
	$('.answerCard').html(HtmlTwo.join(''));
	// 可用
	// $('.option').off('click').on('click', function() {
	// 	$('.option').removeClass("Discoloration");
	// 	$(this).addClass("Discoloration");	// 选中变色
	// 	key = $(this).val();
	// 	console.log(key);
	// });
	var Answer = [];
	// 可用(理想型)
	$('.titleNumber').off('click').on('click', function() {
		
		$(this).addClass("Discoloration").siblings().removeClass("Discoloration");	// 选中变色
		$('.option').removeClass("Discoloration");
		$('.option').off('click').on('click', function() {
			if (Answer.length){
				$('.submit').addClass("Discoloration");	// 选中变色
				layui.use("layer", function() {
					var layer = layui.layer;
					layer.open({
						type: 1 //Page层类型
						,closeBtn: 0
						,area: ['500px', '200px']
						,title: ['提示', 'background-color: #279ef0;text-align: center;font-size: 16px;line-height: 50px;color:white;letter-spacing: 5px;padding: 0px;']
						// ,shade: 0.6 //遮罩透明度
						// ,content: '<span style="margin-left: 188px; position: absolute; top: 35px;">确定要提交答案吗？</span>'
						,content: '<span style="margin-left: 146px; position: absolute; top: 35px;">最后一题了，确定要提交答案吗？</span>'
						,btn: ['在检查下' , '交卷'] //可以无限个按钮
						,btn1: function(index, layero){
							//按钮【在检查下】的回调
							layer.close(index);
							Answer = [];
						}
						,btn2: function(index, layero){
							//按钮【交卷】的回调
							layer.close(index);
							Answer = [];
						}
					});
				});
			}
			$('.option').removeClass("Discoloration");
			$(this).addClass("Discoloration");	// 选中变色
			Answer.push($(this).val());
		});
		console.log(Answer)
	});
	
	$('.submit').click(function() {
		layui.use("layer", function() {
			var layer = layui.layer;
			layer.open({
				type: 1 //Page层类型
				,closeBtn: 0
				,area: ['500px', '200px']
				,title: ['提示', 'background-color: #279ef0;text-align: center;font-size: 16px;line-height: 50px;color:white;letter-spacing: 5px;padding: 0px;']
				// ,shade: 0.6 //遮罩透明度
				,content: '<span style="margin-left: 188px; position: absolute; top: 35px;">确定要提交答案吗？</span>'
				// ,content: '<span style="margin-left: 146px; position: absolute; top: 35px;">最后一题了，确定要提交答案吗？</span>'
				,btn: ['在检查下' , '交卷'] //可以无限个按钮
				,btn1: function(index, layero){
					//按钮【在检查下】的回调
					layer.close(index);
				}
				,btn2: function(index, layero){
					//按钮【交卷】的回调
					layer.close(index);
				}
			});
		});
	});
};