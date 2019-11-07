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
			url: LBUrl + 'manage_system/paper/' + 2,
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
							answerSheet.push('<li class="active"  data-type="' + (index + 1) + '">' +
								(index + 1) + '</li>')
						} else {
							answerSheet.push('<li class="" data-id="' + item.questionId + '" data-type="' + (index + 1) + '">' + (
								index + 1) + '</li>')
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
							'.</span><span class="questuon_title" data-id="' + item.questionId + '">' + item.questionType +
							'</span>(<span class="fraction"> ' + item.score + '</span>分)</p>')
						examContent.push('<p class="question_Dry">' + item.content + '</p>');
						if (item.questionType == '单选题') {
							examContent.push(' <ul class="radio_box textBox">')
						} else {
							examContent.push(' <ul class="checkbox_box textBox">')
						}
						// examContent.push(' <ul class="checkbox_box">')
						item.optionInfo.forEach(function(itemx, index) {
							// console.log('asdasd')
							examContent.push(' <li><span data-id="' + itemx.ref + '" class="option">' + itemx.optionType +
								'</span><span>' + itemx
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
			$(this).parent('li').parent('.radio_box').find('li').find('span').removeClass('active');
			// $('.questionCard .radio_box li span').removeClass('active');
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
	//点击交卷事件
		$('.submitTest').click(function() {
			var newScore = 0;
			var sz = 0;
			
			var useranswerList = [];
			//获取所有多选
			$('.checkbox_box').each(function(index, item) {
				var mistake = '';
				//获取所有选中的
				($('.checkbox_box').eq(index).find('li')).each(function(_index, _item) {
					var classOption = $(this).find(".option").attr('class');
					if (classOption == 'option active') {
						//进行拼
						mistake += $(this).find(".active").text() + "|";
					}
				})
				// 获取id
				var az = $(this).parent('li').find('.questionCard_title').find('.questuon_title').attr('data-id')
				var a = $(this).parent('li').attr('data-type')
				console.log(az)
				var data = {
					'questionId': az,
					'answer': mistake
				}
				useranswerList.push(data);
			});
			$('.radio_box').each(function(index, item) {
				var mistake = '';

				($('.radio_box').eq(index).find('li')).each(function(_index, _item) {
					var classOption = $(this).find(".option").attr('class');
					if (classOption == 'option active') {
						mistake += $(this).find(".active").text() + "|";
					}
				})

				var az = $(this).parent('li').find('.questionCard_title').find('.questuon_title').attr('data-id')
				var a = $(this).parent('li').attr('data-type')
				var data = {
					'questionId': az,
					'answer': mistake

				}
				useranswerList.push(data);
			});
			var data = {
				'userId': "1",
				'paperId': resb.data.paperId,
				'taskId': 3,
				'jUserQuesAnswerRecord': JSON.stringify(useranswerList)
			}
			var aaa = true;
			$('.textBox').each(function(index, item) {
				($('.textBox').eq(index).find('li')).each(function(aindex, aitem) {
					var classOption = $(this).find(".active").attr('class');
					if (classOption == undefined) {
						aaa = false
					}
				})

			})
			if (aaa == true) {

			} else {
				layui.use("layer", function() {
					var layer = layui.layer;
					layer.open({
						type: 1 //Page层类型
							,
						closeBtn: 1,
						area: ['400px', '200px'],
						title: ['', 'background-color: #279ef0']
							// ,shade: 0.6 //遮罩透明度
							,
						content: '<div class="confirmRelease">是否交卷?</div>' +
							'<div class="CR-btn-box">' +
							'<button type="button" class="layui-btn layui-btn-normal layui-btn-sm CR-btnConfirm">确认</button>' +
							'<button type="button" class="layui-btn layui-btn-normal layui-btn-sm CR-btnCancel">取消</button>' +
							'</div>'
					});
					// 点击确认
					$('.CR-btnConfirm').click(function() {
						layer.closeAll();
						$.ajax({
							url: LBUrl + 'manage_system/paper/answers',
							data: data,
							dataType: 'json',
							type: 'POST',
							// contentType :'application/json;charset=utf-8',
							success(res) {
								console.log("操作成功");
								// alert("操作成功");

								if (res || res.data !== null) {
									console.log(res)
									var Html = [];
									// Html.push('<div class="Testing">' + res.data.taskName + '</div>')
									Html.push(
										'<div class="editorialContent">'
									)
									Html.push(
										'<div id="title">'
									)
									Html.push(
										'<div id="centered">'
									)
									Html.push(
										'<span>查看试卷</span>'
									)
									Html.push(
										'</div>'
									)
									Html.push(
										'</div>'
									)
									Html.push(
										'<ul class="layui-tab tabHead layui-tab-brief">'
									)

									res.data.questions.forEach(function(item, index) {
										console.log(res)
										Html.push('<li class="sortableitem" style = "background-color: #fff;">');
										Html.push('<div class="topicFramework" style="text-align: left;line-height: 1;">');
										Html.push('<input type="text" class="qusetionId" value="' + item.questionId +
											'" hidden="hidden"/>');
										if (item.questionType == 1) {
											item.questionType = '单选题';
										} else {
											item.questionType = '多选题';
										}
										Html.push('<p class="num"><span data-id="' + item.questionId + '">' + (index + 1) +
											'</span>. ' + item.questionType + '</p>');
										Html.push('<p class="distance">' + item.content + '</p>');
										item.optionInfo.forEach(function(items, index) {
											var record = 0;
											var a = item.userAnswer.split('|');
											a.forEach(function(iazz, asd) {

												if (items.optionType == iazz) {
													Html.push('<p class="distance option"><span class="circular	 aaxzv">' + items.optionType +
														' </span>' +
														items.content + '</p>');
													record++;
													return false;
												}
											})
											if (record == 0) {
												Html.push('<p class="distance option"><span class="	 aaxzv">' + items.optionType +
													' </span>' +
													items.content + '</p>');
											}


										});
										Html.push('<div class="functionBox">');
										Html.push('<button class="toView" value="' + item.questionId +
											'"><i class="layui-icon layui-icon-search"></i>查看解析</button>');
										Html.push('</div>');
										Html.push('</div>');
										Html.push(' </li> ')
									})

									Html.push('</ul></div>')
									console.log('asdasdasd')

									$('.wrapper').html(Html.join(''))
									
									$('.content').css('background-color', '#fff')
									// 解析
									
									$('.toView').off('click').on('click', function() {
										var QusetionId = $(this).val();
										// 解析内容
										var Analysis = '未定义';
										// 正确答案
										var OptionType = '未知';
										$.ajax({
											url: MCUrl + 'manage_system/question/answer',
											data: {
												'questionId': QusetionId
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
									});
								}
							},
							error: function(e) {

							}
						});
						// parent.location.reload();	//刷新父级页面

						console.log("调用方法")
					});
					// 点击取消
					$('.CR-btnCancel').click(function() {
						layer.closeAll();
					});
				});
				return false;
			}




			var tableAjax = function(paperId) {


			}
			var TableDrawing = function(resb) {
				console.log(resb)


			}
			// 查看解析(弹窗)
			// 查看解析(弹窗)
			var toViewAnalysis = function(questionId) {

			}

			// var questionId = []
			// $.each($(".checkbox_box .active"), function(i, val) {
			// 	var sss = true;
			// 	var dataId = $(this).attr('data-id')
			// 	var dataNAme = $(this).parent('li').parent('ul').find('.questionId').val();
			// 	var data = $(this).parent('li').parent('ul').parent('li').find('.questionCard_title').find('.fraction').text();
			// 	if (i == 0) {
			// 		sz = dataNAme
			// 	}
			// 	if (i + 1 == $(".checkbox_box .active").length) {
			// 		sz = 0;
			// 	}
			// 	resb.data.questions.forEach(function(item, index) {
			// 		if (dataNAme == item.questionId) {
			// 			item.optionInfo.forEach(function(items, index) {
			// 				if (dataId == items.ref && items.isRight == 1 && sss == true) {} else if (dataId == items.ref) {
			// 					sss = false;
			// 					return false;
			// 				}
			// 			})
			// 		}
			// 	})
			// 	if (sz != dataNAme && sss == true) {
			// 		newScore += parseInt(data);
			// 		questionId.push(sz)
			// 	}
			// 	sz = dataNAme
			// })
			// // $.each($(".checkbox_box"), function(i, val) {
			// // 	console.log(val)
			// // 	$.each($(".checkbox_box:nth-child("+i+") li"), function(ai, vala) {
			// // 			console.log(vala)
			// // 	})	
			// // }) 
			// $('.questionCard_box .questionCard .checkbox').each(function(index, item) {
			// 	console.log(index, item);
			// });
			// $.each($(".radio_box .active"), function(i, val) {
			// 	var sss = true;
			// 	var dataId = $(this).attr('data-id')
			// 	var dataNAme = $(this).parent('li').parent('ul').find('.questionId').val();
			// 	var data = $(this).parent('li').parent('ul').parent('li').find('.questionCard_title').find('.fraction').text();
			// 	if (i == 0) {
			// 		sz = dataNAme
			// 	}
			// 	if (i + 1 == $(".radio_box .active").length) {
			// 		sz = 0;
			// 	}
			// 	resb.data.questions.forEach(function(item, index) {
			// 		if (dataNAme == item.questionId) {
			// 			item.optionInfo.forEach(function(items, index) {
			// 				if (dataId == items.ref && items.isRight == 1 && sss == true) {} else if (dataId == items.ref) {
			// 					sss = false;
			// 					return false;
			// 				}
			// 			})
			// 		}
			// 	})
			// 	if (sz != dataNAme && sss == true) {
			// 		newScore += parseInt(data);
			// 		questionId.push(sz)
			// 	}
			// 	sz = dataNAme
			// })
			// console.log(newScore)
		})

	},
}
