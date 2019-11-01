var leng_max_tweet = 200; // 160个字符
$(document).ready(function() {
	$(document).keyup(function(event) {
		if (event.keyCode == 13) {
			info.selectQuestion(1);
		}
	});

	/*分页*/
	/*上传课件*/
	// $.ajax({
	// 	url:'http://192.168.188.131:8888/manage_system/question/question',
	// 	data:{
	// 		
	// 	},
	// 	dataType:'json',
	// 	type:'POST',
	// 	success(res){
	// 			console.log(res);
	// 	}
	// });
	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;

		All.getMenu({
			num: 5
		});
		info.selectQuestion();
		info.addPopup();
		info.operation();
	});

})
var type = 1;
var questionIdLast = 0;
var info = {
	addInputTotal: function() {
		info.inputTotal('#newlyBuild #analysis', '#newlyBuild .num');
		$('#newlyBuild #analysis').keyup(function() {
			info.inputTotal(this, '#newlyBuild .num');
		})
	},
	editInputTotal: function() {
		info.inputTotal('#editBuild #analysis', '#editBuild .num');
		$('#editBuild #analysis').keyup(function() {
			info.inputTotal(this, '#editBuild .num');
		})
	},
	inputTotal: function(ipt, msg) {
		leng_now = $(ipt).val().length; // 获取当前字数
		leng_msg = leng_max_tweet - leng_now; // 计算出剩余字数
		if (leng_msg < 0) {
			str = $(ipt).val(); // 获取内容
			$(ipt).val(str.substr(0, leng_now + leng_msg)); // 删除超出的字符
		} else {
			$(msg).html(leng_msg);
		}
	},
	selectQuestion: function(curr) {
		$.ajax({
			url: 'http://192.168.188.102:8888/manage_system/question/questions',
			data: {
				'pageNum': (curr || 1),
				'pageSize': 10,
				'questionType': type,
				'content': $('.search').val()
			},
			dataType: 'json',
			type: 'GET',
			success(res) {
				var Html = [];
				res.data.list.forEach(function(item, index) {
					index++;
					Html.push('<li class="questions">');
					if (item.questionType == 1) {
						Html.push('<span class="Q-question"><span class="num">' + index +
							'.</span>单选题（2018）<span>(10分)</span></span>');
					} else {
						Html.push('<span class="Q-question"><span class="num">' + index +
							'.</span>多选题（2018）<span>(10分)</span></span>');
					}
					Html.push('<span>');
					Html.push('<p>' + item.content + '</p>');
					item.optionInfo.forEach(function(optionItem, optionIndex) {
						Html.push('<p>' + optionItem.optionType + '.' + optionItem.content + '</p>');
					});
					Html.push('</span>');
					Html.push('<div class="operation">');
					Html.push('<input type="hidden"  value="' + item.questionId + '">')
					Html.push('<p style="display:none;">' + item.status + '</p>')
					Html.push('<span class="view"><i class="layui-icon">&#xe615;</i>查看解析</span>');
					Html.push('<span class="edit"><i style="color: #009688;" class="layui-icon">&#xe642;</i>编辑试题</span>');
					Html.push(
						'<span class="deleteQuestions"><i style="color:#FF0000;" class="layui-icon">&#xe640;</i>删除试题</span>');
					Html.push('</div>');
					Html.push('</li>');
				});
				$('.C-Content ul').html(Html.join(''));
				$('.questions .operation .edit').off('click').on('click', function() {
					info.editPopup($(this).parents('.operation').find('input').val());
				});
				$('.questions .operation .view').off('click').on('click', function() {
					info.viewPopup($(this).parents('.operation').find('input').val());
				});
				$('.questions .operation .deleteQuestions').off('click').on('click', function() {
					info.deleteQuestions($(this).parents('.operation').find('input').val(), $(this).parents('.operation').find(
						'p').text());

				});
				$('.Content .TestQuestionsBrowse .Statistics .num').text(res.data.total);
				info.page(res.data, curr);
			}
		});
	},

	//分页
	page: function(data, curr) {
		layui.use('laypage', function() {
			var laypage = layui.laypage;
			//执行一个laypage实例
			laypage.render({
				elem: 'test1',
				theme: '#279ef0',
				layout: ['prev', 'page', 'next', 'limits', 'skip'],
				count: data.total,
				curr: curr,
				jump: function(obj, first) {
					console.log(obj.curr);
					if (!first) {
						info.selectQuestion(obj.curr);
					}
				}
			});

		});

	},
	deleteQuestions: function(questionId, status) {
		if (status == 1) {
			$.ajax({
				url: 'http://192.168.188.102:8888/manage_system/question/' + questionId,
				data: '',
				dataType: 'json',
				type: 'DELETE',
				success(res) {
					layer.msg('删除成功(弹窗待样式)');
					location.reload();
				},
				error(e) {

				}
			})
		} else {

		}
	},

	//查看解析
	viewAnswer: function(questionId) {
		$.ajax({
			url: 'http://192.168.188.102:8888/manage_system/question/answer',
			data: {
				'questionId': questionId
			},
			dataType: 'json',
			type: 'GET',
			success(res) {
				var answer = '';
				res.data.forEach(function(item, index) {
					$('.PopupAnalysis .ViewParsing .analysis').text(item.analysis);
					if (answer == '') {
						answer = item.optionType;
					} else {
						answer = answer + ',' + item.optionType;
					}
					$('.PopupAnalysis .ViewParsing .answer').text('故选:' + answer + '.');
					$('.PopupAnalysis .ViewParsing span').text(answer);
				});
			}
		});
	},
	//添加
	addQuestion: function() {
		$('#newlyBuild .optionErrorMsg').hide();
		layui.use('form', function() {
			var form = layui.form;
			form.on('radio(beshared)', function(data) {
				var name = '';
				if (data.value == '单选题') {
					$('#newlyBuild .outerFrame input').prop('type', 'radio');
					$('#newlyBuild .outerFrame .layui-unselect').remove();
					name = 'radio';
					judged = true;
				} else {
					$('#newlyBuild .outerFrame input').prop('type', 'checkbox');
					$('#newlyBuild .outerFrame .layui-unselect').remove();
					$('#newlyBuild .outerFrame input').prop('lay-skin', 'primary');
					name = 'checkbox';
					judged = false;
				}
				if (judged) {
					if ($('#newlyBuild .choiceItem p').length <= 1) {
						$("#newlyBuild #confirmAdd").attr('disabled', true);
						$("#newlyBuild #confirmAdd").css('background-color', '#AAAAAA');
						$("#newlyBuild #confirmAdd").css('cursor', 'not-allowed');
						$('#newlyBuild .optionErrorMsg').show();
					} else {
						$("#newlyBuild #confirmAdd").attr('disabled', false);
						$("#newlyBuild #confirmAdd").css('background-color', '#279ef0');
						$("#newlyBuild #confirmAdd").css('cursor', 'pointer');
						$('#newlyBuild .optionErrorMsg').hide();
					}
				} else {
					if ($('#newlyBuild .choiceItem p').length <= 2) {
						$("#newlyBuild #confirmAdd").attr('disabled', true);
						$("#newlyBuild #confirmAdd").css('background-color', '#AAAAAA');
						$("#newlyBuild #confirmAdd").css('cursor', 'not-allowed');
						$('#newlyBuild .optionErrorMsg').show();
					} else {
						$("#newlyBuild #confirmAdd").attr('disabled', false);
						$("#newlyBuild #confirmAdd").css('background-color', '#279ef0');
						$("#newlyBuild #confirmAdd").css('cursor', 'pointer');
						$('#newlyBuild .optionErrorMsg').hide();
					}
				}


				// 重新渲染
				layui.use('form', function() {
					var form = layui.form;
					form.render(name);
				});
			});
		});
		var judged = true;
		info.addInputTotal();
		$('#newlyBuild .addOptions').off('click').on('click', function() {
			if (judged) {
				if ($('#newlyBuild .choiceItem p').length > 0) {
					$("#newlyBuild #confirmAdd").attr('disabled', false);
					$("#newlyBuild #confirmAdd").css('background-color', '#279ef0');
					$("#newlyBuild #confirmAdd").css('cursor', 'pointer');
					$('#newlyBuild .optionErrorMsg').hide();
				}
			} else {
				if ($('#newlyBuild .choiceItem p').length > 1) {
					console.log($('#newlyBuild .choiceItem p').length);
					$("#newlyBuild #confirmAdd").attr('disabled', false);
					$("#newlyBuild #confirmAdd").css('background-color', '#279ef0');
					$("#newlyBuild #confirmAdd").css('cursor', 'pointer');
					$('#newlyBuild .optionErrorMsg').hide();
				}
			}
			var letter = '';
			if ($('#newlyBuild .choiceItem').html() == '' || $('#newlyBuild .choiceItem').html() == null || $(
					'#newlyBuild .choiceItem').html() == undefined) {
				letter = 'A';
			}
			if (letter == '') {
				// 取选项最后一个字母
				var tailLetter = ($('#newlyBuild .choiceItem input').last()).val();
				// 转换为数字
				var transformation = (tailLetter.charCodeAt(0)) + 1;
				// 在转换为小写字母，然后在转换为大写字母
				letter = (String.fromCharCode(transformation)).toUpperCase();
			} else {
				letter = 'A';
			}
			// true是单选,false是多选

			if (judged == true) {
				$("#newlyBuild .choiceItem").append(
					'<p class="outerFrame"><input type="radio" lay-skin="primary" name="choiceItem" value="' +
					letter +
					'" title="' + letter +
					'"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>');
			} else if (judged == false) {
				$("#newlyBuild .choiceItem").append(
					'<p class="outerFrame"><input type="checkbox" lay-skin="primary" name="choiceItem" value="' + letter +
					'" title="' + letter +
					'"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>');
			}
			// 重新渲染
			layui.use('form', function() {
				var form = layui.form;
				form.render(name);
			});
		});
		$('#newlyBuild .deleteOptions').off('click').on('click', function() {
			if ($('#newlyBuild .choiceItem p').length != 1) {
				$("#newlyBuild .outerFrame").eq(-1).remove();
			}
			if (judged) {
				if ($('#newlyBuild .choiceItem p').length <= 1) {
					$("#newlyBuild #confirmAdd").attr('disabled', true);
					$("#newlyBuild #confirmAdd").css('background-color', '#AAAAAA');
					$("#newlyBuild #confirmAdd").css('cursor', 'not-allowed');
					$('#newlyBuild .optionErrorMsg').show();
				}
			} else {
				if ($('#newlyBuild .choiceItem p').length <= 2) {
					$("#newlyBuild #confirmAdd").attr('disabled', true);
					$("#newlyBuild #confirmAdd").css('background-color', '#AAAAAA');
					$("#newlyBuild #confirmAdd").css('cursor', 'not-allowed');
					$('#newlyBuild .optionErrorMsg').show();
				}
			}
		});
		$('#newlyBuild #confirmAdd').off('click').on('click', function() {
			var content = $('#newlyBuild #content').val();
			var questionType = 0;
			var option = [];
			var score = 10;
			var difficulty = 2;
			var status = 1;
			var analysis = $('#newlyBuild #analysis').val();
			if (content == '') {
				layer.msg('题目为空！');
				return false;
			}
			if (analysis == '') {
				layer.msg('解析为空！');
				return false;
			}

			var checkRadioSelect = false;
			var checkInputContent = false;
			var checkCheckbox = '';
			$('#newlyBuild .outerFrame').each(function() {
				var person = {};
				if ($(this).find('.option').val() == '') {
					checkInputContent = true;
				} else {
					person.content = $(this).find('.option').val();
				}
				if (judged) {
					person.optionType = $(this).find('.layui-unselect div').text();
					if ($(this).find('.layui-form-radio').is('.layui-form-radioed')) {
						console.log('有对的');
						checkRadioSelect = true;
						person.isRight = 1;
					} else {
						person.isRight = 0;
					}
				} else {
					person.optionType = $(this).find('.layui-unselect span').text();
					if ($(this).find('.layui-form-checkbox').is('.layui-form-checked')) {
						person.isRight = 1;
						if (checkCheckbox == '') {
							checkCheckbox = '1';
						} else {
							checkCheckbox = checkCheckbox + ',' + '1';
						}

					} else {
						person.isRight = 0;
					}
				}
				option.push(person);
			});
			if (checkInputContent) {
				layer.msg('有选项内容为空！');
				return false;
			}

			if (judged) {
				if (!checkRadioSelect) {
					layer.msg('请选择一个正确答案！');
					return false;
				}
			} else {
				var sear = new RegExp(',');
				if (!sear.test(checkCheckbox)) {
					layer.msg('请选择至少两个答案！');
					return false;
				}
			}



			if (judged) {
				questionType = 1;
			} else {
				questionType = 2;
			}
			var question = {
				'questionType': questionType,
				'content': content,
				'score': score,
				'analysis': analysis,
				'difficulty': difficulty,
				'status': status,
			};

			var data = {
				'question': JSON.stringify(question),
				'questionOption': JSON.stringify(option)
			};
			$.ajax({
				url: 'http://192.168.188.102:8888/manage_system/question/question',
				data: data,
				dataType: 'json',
				type: 'POST',
				success(res) {
					layer.msg('添加成功(弹窗待样式)');
					location.reload();

				}
			});
		});
	},
	//修改
	editQuestion: function(questionId) {
		$('#editBuild .choiceItem').html('');
		$('#editBuild .optionErrorMsg').hide();
		var Html = [];
		var letter = '';
		var questionRes = {};
		$.ajax({
			url: 'http://192.168.188.102:8888/manage_system/question/' + questionId,
			data: '',
			dataType: 'json',
			type: 'GET',
			success(res) {
				questionRes = res;
				res.data.forEach(function(questionItem, questionIndex) {
					$('#editBuild .parseInputBox').val(questionItem.analysis);
					$('#editBuild .titleInputBox').val(questionItem.content);
					questionItem.optionInfo.forEach(function(item, index) {
						if (questionItem.questionType == 1) { //1单选 2多选
							type = 1;
							$('#editBuild .singleChoiceQuestion').prop('checked', true);
							if (item.isRight == 1) {
								$("#editBuild .choiceItem").append('<p class="outerFrame"><input class="ref" type="hidden" value = "' +
									item.ref + '"/><input type="radio" name="choiceItem" value="' +
									item.optionType +
									'" title="' + item.optionType +
									'" checked><textarea name="" required lay-verify="required" class="layui-textarea option">' + item.content +
									'</textarea></p>');
							} else {
								$("#editBuild .choiceItem").append('<p class="outerFrame"><input class="ref" type="hidden" value = "' +
									item.ref + '"/><input type="radio" name="choiceItem" value="' +
									item.optionType +
									'" title="' + item.optionType +
									'"><textarea name="" required lay-verify="required" class="layui-textarea option">' + item.content +
									'</textarea></p>');
							}


						} else {
							type = 2;
							if (item.isRight == 1) {
								$("#editBuild .choiceItem").append(
									'<p class="outerFrame"><input class="ref" type="hidden" value = "' + item.ref +
									'"/><input type="checkbox" lay-skin="primary" name="choiceItem" value="' + item.optionType +
									'" title="' + item.optionType +
									'" checked><textarea name="" required lay-verify="required" class="layui-textarea option">' + item.content +
									'</textarea></p>');
							} else {
								$("#editBuild .choiceItem").append(
									'<p class="outerFrame"><input class="ref" type="hidden" value = "' + item.ref +
									'"/><input type="checkbox" lay-skin="primary" name="choiceItem" value="' + item.optionType +
									'" title="' + item.optionType +
									'"><textarea name="" required lay-verify="required" class="layui-textarea option">' + item.content +
									'</textarea></p>');
							}

							$('#editBuild .multipleChoiceQuestions').prop('checked', true);
						}
					});
				});
				layui.use('form', function() {
					var form = layui.form;
					form.on('radio(beshared)', function(data) {
						$("#editBuild .choiceItem").html('');
						$("#editBuild #confirmAdd").attr('disabled', false);
						$("#editBuild #confirmAdd").css('background-color', '#279ef0');
						$("#editBuild #confirmAdd").css('cursor', 'pointer');
						$('#editBuild .optionErrorMsg').hide();
						questionRes.data.forEach(function(questionItem, questionIndex) {
							questionItem.optionInfo.forEach(function(item, index) {
								if (data.value == '单选题') {
									if (item.isRight == 1) {
										$("#editBuild .choiceItem").append(
											'<p class="outerFrame"><input class="ref" type="hidden" value = "' + item.ref +
											'"/><input type="radio" name="choiceItem" value="' +
											item.optionType +
											'" title="' + item.optionType +
											'"checked><textarea name="" required lay-verify="required" class="layui-textarea option">' +
											item.content +
											'</textarea></p>');
									} else {
										$("#editBuild .choiceItem").append(
											'<p class="outerFrame"><input class="ref" type="hidden" value = "' + item.ref +
											'"/><input type="radio" name="choiceItem" value="' +
											item.optionType +
											'" title="' + item.optionType +
											'"><textarea name="" required lay-verify="required" class="layui-textarea option">' + item.content +
											'</textarea></p>');
									}
									type = 1;
									form.render();
								} else {
									if (item.isRight == 1) {
										$("#editBuild .choiceItem").append(
											'<p class="outerFrame"><input class="ref" type="hidden" value = "' + item.ref +
											'"/><input type="checkbox" lay-skin="primary" name="choiceItem" value="' +
											item.optionType +
											'" title="' + item.optionType +
											'"checked><textarea name="" required lay-verify="required" class="layui-textarea option">' +
											item.content +
											'</textarea></p>');
									} else {
										$("#editBuild .choiceItem").append(
											'<p class="outerFrame"><input class="ref" type="hidden" value = "' + item.ref +
											'"/><input type="checkbox" lay-skin="primary" name="choiceItem" value="' +
											item.optionType +
											'" title="' + item.optionType +
											'"><textarea name="" required lay-verify="required" class="layui-textarea option">' + item.content +
											'</textarea></p>');
									}

									type = 2;
									form.render();
								}
							});
						});
					});
					form.render();
				});
				info.editInputTotal();
				$('#editBuild .addOptions').off('click').on('click', function() {
					if (type == 1) {
						if ($('#editBuild .choiceItem p').length > 0) {
							$("#editBuild #confirmAdd").attr('disabled', false);
							$("#editBuild #confirmAdd").css('background-color', '#279ef0');
							$("#editBuild #confirmAdd").css('cursor', 'pointer');
							$('#editBuild .optionErrorMsg').hide();
						}
					} else {
						if ($('#editBuild .choiceItem p').length > 1) {
							$("#editBuild #confirmAdd").attr('disabled', false);
							$("#editBuild #confirmAdd").css('background-color', '#279ef0');
							$("#editBuild #confirmAdd").css('cursor', 'pointer');
							$('#editBuild .optionErrorMsg').hide();
						}
					}
					var letter = '';
					if (letter == '') {
						// 取选项最后一个字母
						var tailLetter = ($('#editBuild .choiceItem input').last()).val();
						// 转换为数字
						var transformation = (tailLetter.charCodeAt(0)) + 1;
						// 在转换为小写字母，然后在转换为大写字母
						letter = (String.fromCharCode(transformation)).toUpperCase();
					} else {
						letter = 'A';
					}
					if (type == 1) {
						$("#editBuild .choiceItem").append('<p class="outerFrame"><input type="radio" name="choiceItem" value="' +
							letter +
							'" title="' + letter +
							'"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>');
					} else if (type = 2) {
						$("#editBuild .choiceItem").append(
							'<p class="outerFrame"><input type="checkbox" lay-skin="primary" name="choiceItem" value="' + letter +
							'" title="' + letter +
							'"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>');
					}
					// 重新渲染
					layui.use('form', function() {
						var form = layui.form;
						form.render(name);
					});

				});
				$('#editBuild .deleteOptions').off('click').on('click', function() {
					if (type == 1) {
						if ($('#editBuild .choiceItem p').length <= 2) {
							$("#editBuild #confirmAdd").attr('disabled', true);
							$("#editBuild #confirmAdd").css('background-color', '#AAAAAA');
							$("#editBuild #confirmAdd").css('cursor', 'not-allowed');
							$('#editBuild .optionErrorMsg').show();
						}
					} else {
						if ($('#editBuild .choiceItem p').length <= 3) {
							$("#editBuild #confirmAdd").attr('disabled', true);
							$("#editBuild #confirmAdd").css('background-color', '#AAAAAA');
							$("#editBuild #confirmAdd").css('cursor', 'not-allowed');
							$('#editBuild .optionErrorMsg').show();
						}
					}
					if ($('#editBuild .choiceItem p').length != 1) {
						$("#editBuild .outerFrame").eq(-1).remove();
					}
				});
				$('#editBuild #confirmAdd').off('click').on('click', function() {
					var content = $('#editBuild #content').val();
					var option = [];
					var score = 10;
					var difficulty = 2;
					var status = 1;
					var analysis = $('#editBuild #analysis').val();
					if (content == '') {
						layer.msg('题目为空！');
						return false;
					}
					if (analysis == '') {
						layer.msg('解析为空！');
						return false;
					}
					var checkRadioSelect = false;
					var checkCheckbox = '';
					var checkInputContent = false;
					$('#editBuild .outerFrame').each(function() {
						var person = {};
						person.ref = $(this).find('.ref').val();
						if ($(this).find('.option').val() == '') {
							checkInputContent = true;
							return false;
						} else {
							person.content = $(this).find('.option').val();
						}
						if (type == 1) {
							person.optionType = $(this).find('.layui-unselect div').text();
							if ($(this).find('.layui-form-radio').is('.layui-form-radioed')) {
								person.isRight = 1;
								checkRadioSelect = true;
							} else {
								person.isRight = 0;
							}
						} else {
							person.optionType = $(this).find('.layui-unselect span').text();
							if ($(this).find('.layui-form-checkbox').is('.layui-form-checked')) {
								if (checkCheckbox == '') {
									checkCheckbox = '1';
								} else {
									checkCheckbox = checkCheckbox + ',' + '1';
								}
								person.isRight = 1;
							} else {
								person.isRight = 0;
							}
						}
						option.push(person);
					});
					if (checkInputContent) {
						layer.msg('有选项内容为空！');
						return false;
					}
					if (type == 1) {
						if (!checkRadioSelect) {
							layer.msg('请选择一个正确答案！');
							return false;
						}
					} else {
						var sear = new RegExp(',');
						if (!sear.test(checkCheckbox)) {
							layer.msg('请选择至少两个答案！');
							return false;
						}
					}


					var question = {
						'questionId': questionId,
						'questionType': type,
						'content': content,
						'score': score,
						'analysis': analysis,
						'difficulty': difficulty,
						'status': status,
					};



					var data = {
						'question': JSON.stringify(question),
						'questionOption': JSON.stringify(option),
					};

					$.ajax({
						url: 'http://192.168.188.102:8888/manage_system/question/' + questionId,
						data: data,
						dataType: 'json',
						type: 'POST',
						success(res) {
							layer.msg('修改成功(弹窗待样式)');
							location.reload();
						},
						error(e) {

						}

					});
				});

			}
		});

	},
	//---------------------
	//操作
	operation: function() {
		$('.sort span').off('click').on('click', function() {
			$('span').removeClass('emColor');
			$(this).addClass('emColor');
			if ($(this).text() == '单选题') {
				type = 1;
				info.selectQuestion(1);
			} else {
				type = 2;
				info.selectQuestion(1);
			}
		});
		


		//---------------------修改

	},
	//弹窗
	addPopup: function() {
		$('.NewTestQuestion').off('click').on('click', function() {
			layer.open({
				type: 1,
				title: ['新建试题',
					'background-color: #279ef0;text-align: center;font-size: 16px;line-height: 50px;color:white;letter-spacing: 5px;padding: 0px;'
				],
				area: ['660px', '755px'],
				resize: false,
				move: false,
				content: $('#newlyBuild'),
				success: function(res) {
					info.addQuestion();
				}
			});

		});



	},
	viewPopup: function(questionId) {
		layer.open({
			type: 1,
			title: false,
			area: ['600px', '300px'],
			closeBtn: 0,
			resize: false,
			move: false,
			content: $('.PopupAnalysis'),
			btn: '确认',
			btnAlign: 'c',
			success: function() {
				info.viewAnswer(questionId);
			}
		});

	},
	editPopup: function(questionId) {
		layer.open({
			type: 1,
			title: ['编辑试题',
				'background-color: #279ef0;text-align: center;font-size: 16px;line-height: 50px;color:white;letter-spacing: 5px;padding: 0px;'
			],
			area: ['660px', '755px'],
			resize: false,
			move: false,
			content: $('#editBuild'),
			success: function(res) {
				info.editQuestion(questionId);
			}
		});

	}

}
