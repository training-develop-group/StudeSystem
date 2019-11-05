/**
 * @name: common
 * @author：MengXin
 */
$(function() {
	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;


		// 公共头调用渲染
		All.getMenu({
			num: 3
		});

		// 获取测试题内容
		info.getList();
	});
});

var answer = [];

var info = {
	//  todo  接口 ,获取页面试题
	getList: function() {
		$.ajax({
			url: MCUrl + 'manage_system/paper/' + 3,
			data: {

			},
			Type: 'GET',
			success: function(resb) {
				if (resb || resb.data !== null) {
					console.log(resb)
					var answerSheet = [];
					var examContent = [];
					resb.data.questions.forEach(function(item, index) {
						if ((index + 1) == 1) {
							answerSheet.push('<li class="active" data-type="' + (index + 1) + '">' + (index + 1) + '</li>')
						} else {
							answerSheet.push('<li class="" data-type="' + (index + 1) + '">' + (index + 1) + '</li>')
						}
						if ((index + 1) == 1) {
							examContent.push('<li class="questionCard" data-type="' + (index + 1) + '">')
						} else {
							examContent.push('<li class="questionCard hidden" data-type="' + (index + 1) + '">')
						}
						if (item.questionType == 1) {
							item.questionType = '单选题';
						} else {
							item.questionType = '多选题';
						}
						examContent.push(' <p class="questionCard_title"><span class="num">' + (index + 1) +
							'.</span><span class="questuon_title">' + item.questionType +
							'</span>(<span class="fraction">10</span>分)</p>')
						examContent.push('<p class="question_Dry">' + item.content + '</p>');
						if (item.questionType == '单选题') {
							examContent.push(' <ul class="radio_box">')
						} else {
							examContent.push(' <ul class="checkbox_box">')
						}
						// examContent.push(' <ul class="checkbox_box">')
						item.optionInfo.forEach(function(itemx, index) {
							// console.log('asdasd')
							examContent.push(' <li><span data-id="' + itemx.ref + '">' + itemx.optionType + '</span><span>' + itemx
								.content + '</span></li>')
						})
						examContent.push('<input type="text" value="' + item.questionId + '" class="questionId hidden">')
						examContent.push(' </ul>')
						examContent.push('<div class="btn-box clearfix">')
						examContent.push('<button class="layui-btn layui-btn-normal layui-btn-sm next">下一题</button>')
						examContent.push(' <button class="layui-btn layui-btn-normal layui-btn-sm previous">上一题</button>')
						examContent.push('</div>')
					})

					examContent.push('</li>')
					$('.questionCard_box').html(examContent.join(''))
					$('.card').html(answerSheet.join(''))
					// 下一题点击事件
					info.nextChange();
					// 上一题点击事件
					info.previousChange();
					// 最后一题不显示下一题,第一题不显示上一题
					$('.questionCard_box .questionCard').last().find('.next').addClass('hidden');
					$('.questionCard_box .questionCard').first().find('.previous').addClass('hidden');

					// 单选事件
					info.radioChange();
					// 多选事件
					info.checkboxChange();
					// 提交试题内容
					info.setList(resb);

					// TableDrawing(resb, res);
				}
			},
			error: function(e) {

			}
		});


	},
	// 单选事件
	radioChange: function() {
		$('body').delegate('.questionCard .radio_box li span', 'click', function() {
			$('.questionCard .radio_box li span').removeClass('active');
			$(this).addClass('active');
		});



	},
	submitTest: function() {

	},
	// 多选事件
	checkboxChange: function() {
		$('body').delegate('.questionCard .checkbox_box li span', 'click', function() {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}
		});

		// 下一题点击事件
		info.nextChange();
		// 上一题点击事件
		info.previousChange();
		// 点击编号跳转试题
		info.cardChange();


	},
	// 下一题点击事件
	nextChange: function() {
		$('.next').off('click').on('click', function() {
			var _thisQuestion = $(this).parents('.questionCard');
			_thisQuestion.addClass('hidden');
			_thisQuestion.next().removeClass('hidden');
			for (var i = 1; i <= $('.card li').length; i++) {
				if ($('.card li:nth-child(' + [i] + ')').attr('data-type') == _thisQuestion.attr('data-type')) {
					$('.card li:nth-child(' + [i] + ')').removeClass('active');
					$('.card li:nth-child(' + [i] + ')').next().addClass('active');
				}
			}

			// todo 获取用户选择的值 添加到上方空数组中保存
		});

	},
	// 上一题点击事件
	previousChange: function() {
		$('body').delegate('.previous', 'click', function() {
			var _thisQuestion = $(this).parents('.questionCard');
			_thisQuestion.addClass('hidden');
			_thisQuestion.prev().removeClass('hidden');

			for (var i = 1; i <= $('.card li').length; i++) {
				if ($('.card li:nth-child(' + [i] + ')').attr('data-type') == _thisQuestion.attr('data-type')) {
					$('.card li:nth-child(' + [i] + ')').removeClass('active');
					$('.card li:nth-child(' + [i] + ')').prev().addClass('active');
				}
			}

			// todo 获取用户选择的值 添加到上方空数组中保存
		});
	},
	cardChange: function() {
		$('body').delegate('.card li', 'click', function() {
			$('.card li').removeClass('active');
			$(this).addClass('active');

			for (var i = 1; i <= $('.card li').length; i++) {
				if ($('.questionCard_box .questionCard:nth-child(' + [i] + ')').attr('data-type') == $(this).attr('data-type')) {
					$('.questionCard_box .questionCard').addClass('hidden');
					$('.questionCard_box .questionCard:nth-child(' + [i] + ')').removeClass('hidden');
				}
			}
		});
	},
	// todo 下面是交卷的接口 ,将上方  answer[]  传给后台
	setList: function(resb) {
		console.log(resb)
		$('.submitTest').click(function() {
			var newScore = 0;
			var sz = 0;
			$.each($(".checkbox_box .active"), function(i, val) {
			var  data = {
				'questionId' : questionId,
			}
			
			
			var questionId = $(this).parent('li').parent('ul').find('.questionId').val();
			
			
			
			
			
			
			
			})
			var questionId = []
			$.each($(".checkbox_box .active"), function(i, val) {
				var sss = true;
				var dataId = $(this).attr('data-id')
				var dataNAme = $(this).parent('li').parent('ul').find('.questionId').val();
				var data = $(this).parent('li').parent('ul').parent('li').find('.questionCard_title').find('.fraction').text();
				if (i == 0) {
					sz = dataNAme
				}
				if (i + 1 == $(".checkbox_box .active").length) {
					sz = 0;
				}
				resb.data.questions.forEach(function(item, index) {
					if (dataNAme == item.questionId) {
						item.optionInfo.forEach(function(items, index) {
							if (dataId == items.ref && items.isRight == 1 && sss == true) {
							} else if (dataId == items.ref) {
								sss = false;
								return false;
							}
						})
					}
				})
				if (sz != dataNAme && sss == true) {
					newScore += parseInt(data);
					questionId.push(sz)
				}
				sz = dataNAme
			})
			$.each($(".radio_box .active"), function(i, val) {
				var sss = true;
				var dataId = $(this).attr('data-id')
				var dataNAme = $(this).parent('li').parent('ul').find('.questionId').val();
				var data = $(this).parent('li').parent('ul').parent('li').find('.questionCard_title').find('.fraction').text();
				if (i == 0) {
					sz = dataNAme
				}
				if (i + 1 == $(".radio_box .active").length) {
					sz = 0;
				}
				resb.data.questions.forEach(function(item, index) {
					if (dataNAme == item.questionId) {
						item.optionInfo.forEach(function(items, index) {
							if (dataId == items.ref && items.isRight == 1 && sss == true) {
							} else if (dataId == items.ref) {
								sss = false;
								return false;
							}
						})
					}
				})
				if (sz != dataNAme && sss == true) {
					newScore += parseInt(data);
					questionId.push(sz)
				}
				sz = dataNAme
			})
			console.log(newScore)
		
			
			
			
		})

	},
}
