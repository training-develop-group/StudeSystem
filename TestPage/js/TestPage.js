/**
 * @name: common
<<<<<<< HEAD
 * @authorï¼šMengXin
 */
$(function() {
	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;


		// å…¬å…±å¤´è°ƒç”¨æ¸²æŸ“
		All.getMenu({
			num: 3
		});

		// è·å–æµ‹è¯•é¢˜å†…å®¹
		info.getList();
	});
=======
 * @author£ºMengXin
 */
$(function () {
    layui.use(['layer', 'form'], function () {
        var layer = layui.layer,
            form = layui.form;


        // ¹«¹²Í·µ÷ÓÃäÖÈ¾
        All.getMenu({
            num: 3
        });

        // »ñÈ¡²âÊÔÌâÄÚÈİ
        info.getList();
    });
>>>>>>> remotes/origin/dev-MX
});

var answer = [];

var info = {
<<<<<<< HEAD
	//  todo  æ¥å£ ,è·å–é¡µé¢è¯•é¢˜
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
							item.questionType = 'å•é€‰é¢˜';
						} else {
							item.questionType = 'å¤šé€‰é¢˜';
						}
						examContent.push(' <p class="questionCard_title"><span class="num">' + (index + 1) +
							'.</span><span class="questuon_title" data-id="' + item.questionId + '">' + item.questionType +
							'</span>(<span class="fraction"> ' + item.score + '</span>åˆ†)</p>')
						examContent.push('<p class="question_Dry">' + item.content + '</p>');
						if (item.questionType == 'å•é€‰é¢˜') {
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
						examContent.push('<button class="layui-btn layui-btn-normal layui-btn-sm next">ä¸‹ä¸€é¢˜</button>')
						examContent.push(' <button class="layui-btn layui-btn-normal layui-btn-sm previous">ä¸Šä¸€é¢˜</button>')
						examContent.push('</div>')
					})

					examContent.push('</li>')
					$('.questionCard_box').html(examContent.join(''))
					$('.card').html(answerSheet.join(''))
					// ä¸‹ä¸€é¢˜ç‚¹å‡»äº‹ä»¶
					info.nextChange();
					// ä¸Šä¸€é¢˜ç‚¹å‡»äº‹ä»¶
					info.previousChange();
					// æœ€åä¸€é¢˜ä¸æ˜¾ç¤ºä¸‹ä¸€é¢˜,ç¬¬ä¸€é¢˜ä¸æ˜¾ç¤ºä¸Šä¸€é¢˜
					$('.questionCard_box .questionCard').last().find('.next').addClass('hidden');
					$('.questionCard_box .questionCard').first().find('.previous').addClass('hidden');

					// å•é€‰äº‹ä»¶
					info.radioChange();
					// å¤šé€‰äº‹ä»¶
					info.checkboxChange();
					// æäº¤è¯•é¢˜å†…å®¹
					info.setList(resb);

					// TableDrawing(resb, res);
				}
			},
			error: function(e) {

			}
		});


	},
	// å•é€‰äº‹ä»¶
	radioChange: function() {
		$('body').delegate('.questionCard .radio_box li span', 'click', function() {
			$(this).parent('li').parent('.radio_box').find('li').find('span').removeClass('active');
			// $('.questionCard .radio_box li span').removeClass('active');
			$(this).addClass('active');
		});



	},
	submitTest: function() {

	},
	// å¤šé€‰äº‹ä»¶
	checkboxChange: function() {
		$('body').delegate('.questionCard .checkbox_box li span', 'click', function() {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}
		});

		// ä¸‹ä¸€é¢˜ç‚¹å‡»äº‹ä»¶
		info.nextChange();
		// ä¸Šä¸€é¢˜ç‚¹å‡»äº‹ä»¶
		info.previousChange();
		// ç‚¹å‡»ç¼–å·è·³è½¬è¯•é¢˜
		info.cardChange();


	},
	// ä¸‹ä¸€é¢˜ç‚¹å‡»äº‹ä»¶
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

			// todo è·å–ç”¨æˆ·é€‰æ‹©çš„å€¼ æ·»åŠ åˆ°ä¸Šæ–¹ç©ºæ•°ç»„ä¸­ä¿å­˜
		});

	},
	// ä¸Šä¸€é¢˜ç‚¹å‡»äº‹ä»¶
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

			// todo è·å–ç”¨æˆ·é€‰æ‹©çš„å€¼ æ·»åŠ åˆ°ä¸Šæ–¹ç©ºæ•°ç»„ä¸­ä¿å­˜
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
	// todo ä¸‹é¢æ˜¯äº¤å·çš„æ¥å£ ,å°†ä¸Šæ–¹  answer[]  ä¼ ç»™åå°
	setList: function(resb) {
	//ç‚¹å‡»äº¤å·äº‹ä»¶
		$('.submitTest').click(function() {
			var newScore = 0;
			var sz = 0;
			
			var useranswerList = [];
			//è·å–æ‰€æœ‰å¤šé€‰
			$('.checkbox_box').each(function(index, item) {
				var mistake = '';
				//è·å–æ‰€æœ‰é€‰ä¸­çš„
				($('.checkbox_box').eq(index).find('li')).each(function(_index, _item) {
					var classOption = $(this).find(".option").attr('class');
					if (classOption == 'option active') {
						//è¿›è¡Œæ‹¼
						mistake += $(this).find(".active").text() + "|";
					}
				})
				// è·å–id
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
						type: 1 //Pageå±‚ç±»å‹
							,
						closeBtn: 1,
						area: ['400px', '200px'],
						title: ['', 'background-color: #279ef0']
							// ,shade: 0.6 //é®ç½©é€æ˜åº¦
							,
						content: '<div class="confirmRelease">æ˜¯å¦äº¤å·?</div>' +
							'<div class="CR-btn-box">' +
							'<button type="button" class="layui-btn layui-btn-normal layui-btn-sm CR-btnConfirm">ç¡®è®¤</button>' +
							'<button type="button" class="layui-btn layui-btn-normal layui-btn-sm CR-btnCancel">å–æ¶ˆ</button>' +
							'</div>'
					});
					// ç‚¹å‡»ç¡®è®¤
					$('.CR-btnConfirm').click(function() {
						layer.closeAll();
						$.ajax({
							url: LBUrl + 'manage_system/paper/answers',
							data: data,
							dataType: 'json',
							type: 'POST',
							// contentType :'application/json;charset=utf-8',
							success(res) {
								console.log("æ“ä½œæˆåŠŸ");
								// alert("æ“ä½œæˆåŠŸ");

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
										'<span>æŸ¥çœ‹è¯•å·</span>'
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
											item.questionType = 'å•é€‰é¢˜';
										} else {
											item.questionType = 'å¤šé€‰é¢˜';
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
											'"><i class="layui-icon layui-icon-search"></i>æŸ¥çœ‹è§£æ</button>');
										Html.push('</div>');
										Html.push('</div>');
										Html.push(' </li> ')
									})

									Html.push('</ul></div>')
									console.log('asdasdasd')

									$('.wrapper').html(Html.join(''))
									
									$('.content').css('background-color', '#fff')
									// è§£æ
									
									$('.toView').off('click').on('click', function() {
										var QusetionId = $(this).val();
										// è§£æå†…å®¹
										var Analysis = 'æœªå®šä¹‰';
										// æ­£ç¡®ç­”æ¡ˆ
										var OptionType = 'æœªçŸ¥';
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
														type: 1 //Pageå±‚ç±»å‹
															,
														closeBtn: 1,
														area: ['790px', '300px'],
														title: ['æŸ¥çœ‹è§£æ',
																'background-color: #279ef0;text-align: center;font-size: 16px;line-height: 43px;color:white;letter-spacing: 5px;padding: 0px;'
															]
															// ,shade: 0.6 //é®ç½©é€æ˜åº¦
															,
														content: '<div class="answerContent">' +
															'<p>æ­£ç¡®ç­”æ¡ˆï¼š<span class="answerOptions">' + OptionType + '</span></p>' +
															'<p>ç­”æ¡ˆè§£æï¼š</p>' +
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
						// parent.location.reload();	//åˆ·æ–°çˆ¶çº§é¡µé¢

						console.log("è°ƒç”¨æ–¹æ³•")
					});
					// ç‚¹å‡»å–æ¶ˆ
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
			// æŸ¥çœ‹è§£æ(å¼¹çª—)
			// æŸ¥çœ‹è§£æ(å¼¹çª—)
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
=======
    //  todo  ½Ó¿Ú ,»ñÈ¡Ò³ÃæÊÔÌâ
    getList:function(){



        // µ¥Ñ¡ÊÂ¼ş
        info.radioChange();
        // ¶àÑ¡ÊÂ¼ş
        info.checkboxChange();
        // Ìá½»ÊÔÌâÄÚÈİ
        info.setList();
    },
    // µ¥Ñ¡ÊÂ¼ş
    radioChange: function () {
        $('body').delegate('.questionCard .radio_box li span', 'click', function () {
            $('.questionCard .radio_box li span').removeClass('active');
            $(this).addClass('active');
        });

        // ÏÂÒ»Ìâµã»÷ÊÂ¼ş
        info.nextChange();
        // ÉÏÒ»Ìâµã»÷ÊÂ¼ş
        info.previousChange();
        // ×îºóÒ»Ìâ²»ÏÔÊ¾ÏÂÒ»Ìâ,µÚÒ»Ìâ²»ÏÔÊ¾ÉÏÒ»Ìâ
        $('.questionCard_box .questionCard').last().find('.next').addClass('hidden');
        $('.questionCard_box .questionCard').first().find('.previous').addClass('hidden');
    },
    // ¶àÑ¡ÊÂ¼ş
    checkboxChange: function () {
        $('body').delegate('.questionCard .checkbox_box li span', 'click', function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
        });

        // ÏÂÒ»Ìâµã»÷ÊÂ¼ş
        info.nextChange();
        // ÉÏÒ»Ìâµã»÷ÊÂ¼ş
        info.previousChange();
        // µã»÷±àºÅÌø×ªÊÔÌâ
        info.cardChange();


    },
    // ÏÂÒ»Ìâµã»÷ÊÂ¼ş
    nextChange: function () {
        $('.next').off('click').on('click', function () {
            var _thisQuestion = $(this).parents('.questionCard');
            _thisQuestion.addClass('hidden');
            _thisQuestion.next().removeClass('hidden');
            for (var i = 1; i <= $('.card li').length; i++) {
                if ($('.card li:nth-child(' + [i] + ')').attr('data-type') == _thisQuestion.attr('data-type')) {
                    $('.card li:nth-child(' + [i] + ')').removeClass('active');
                    $('.card li:nth-child(' + [i] + ')').next().addClass('active');
                }
            }

            // todo »ñÈ¡ÓÃ»§Ñ¡ÔñµÄÖµ Ìí¼Óµ½ÉÏ·½¿ÕÊı×éÖĞ±£´æ
        });

    },
    // ÉÏÒ»Ìâµã»÷ÊÂ¼ş
    previousChange: function () {
        $('body').delegate('.previous', 'click', function () {
            var _thisQuestion = $(this).parents('.questionCard');
            _thisQuestion.addClass('hidden');
            _thisQuestion.prev().removeClass('hidden');

            for (var i = 1; i <= $('.card li').length; i++) {
                if ($('.card li:nth-child(' + [i] + ')').attr('data-type') == _thisQuestion.attr('data-type')) {
                    $('.card li:nth-child(' + [i] + ')').removeClass('active');
                    $('.card li:nth-child(' + [i] + ')').prev().addClass('active');
                }
            }

            // todo »ñÈ¡ÓÃ»§Ñ¡ÔñµÄÖµ Ìí¼Óµ½ÉÏ·½¿ÕÊı×éÖĞ±£´æ
        });
    },
    cardChange:function () {
        $('body').delegate('.card li', 'click', function () {
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
    // todo ÏÂÃæÊÇ½»¾íµÄ½Ó¿Ú ,½«ÉÏ·½  answer[]  ´«¸øºóÌ¨
    setList:function () {

    }
};
>>>>>>> remotes/origin/dev-MX
