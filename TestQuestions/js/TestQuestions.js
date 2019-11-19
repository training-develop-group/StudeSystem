var leng_max_tweet = 200; // 160个字符
$(document).ready(function() {
	$(document).keyup(function(event) {
		if (event.keyCode == 13) {
			info.selectQuestion(1);
		}
	});
	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;

		All.getMenu({
			search: 1,
			type: 1,
			num: 5
		});
		info.selectQuestion();
		info.addPopup();
		info.operation();
	});

});
var type = 1;
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
	// 查看试题
	selectQuestion: function(curr) {
		$.ajax({
			url: WTQUrl + 'manage_system/question/questions',
			data: {
				'pageNum': (curr || 1),
				'pageSize': 10,
				'questionType': type,
				'content': $.trim($('.search').val())
			},
			dataType: 'json',
			type: 'GET',
			success(res) {
				var Html = [];
				res.data.list.forEach(function(item, index) {
					index++;
					Html.push('<li class="questions">');
					if (item.questionType == 1) {
						Html.push('<p class="Q-question"><span class="num">' + index +
							'. </span>单选题</p>');
					} else {
						Html.push('<p class="Q-question"><span class="num">' + index +
							'. </span>多选题</p>');
					}
					Html.push('<span>');
					Html.push('<pre class="QuestionContent">' + item.content + '</pre>');
					item.optionInfo.forEach(function(optionItem) {
						Html.push('<div class="optionStyle clearfix"><span>' + optionItem.optionType + '.</span><pre>' + optionItem.content + '</pre></div>');
					});
					Html.push('</span>');
					Html.push('<div class="operation functionBox">');
					Html.push('<input type="hidden"  value="' + item.questionId + '">');
					Html.push('<p  class="distance " style="display:none;">' + item.status + '</p>');
					if (item.status == 1){
						Html.push('<button class="view"><img src="../imgs/stf.png" />查看解析</button>');
					} else {
                        Html.push('<button class="view"><img src="../imgs/stf.png" />查看解析</button>');
						Html.push('<button class="edit"><img src="../imgs/stb.png" />编辑试题</button>');
						Html.push('<button class="deleteQuestions" data-id="'+item.questionId+'"><img src="../imgs/stt.png" />删除试题</button>');
						Html.push('</div>');
					}
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
					var questionId = $(this).attr('data-id');
					var status = $(this).parents('.operation').find('p').text();
					All.layuiOpen({
						num: 5,
						status: status,
						questionId: questionId,
						msg: '是否删除该试题'
					})
				});
				$('.Content .TestQuestionsBrowse .Statistics .num').text(res.data.total);
				if (res.data.total > 10){
					info.page(res.data, curr);
					// 判断paging里是否有内容↓
				} else if ($('#test1').is(':empty') == false) {
					// 清空#paging里的内容与标签
					$('#test1').empty();
				}
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
	// 删除试题
	deleteQuestions: function(questionId, status) {
		// status 试题的状态 如果为1 则不可删除
		if (status == 0) {
			$.ajax({
				url: WTQUrl + 'manage_system/question/' + questionId,
				data: '',
				dataType: 'json',
				type: 'DELETE',
				success(res) {
					if(res.code  === 1){
                        layer.msg('删除成功');
                        info.selectQuestion(1);
					}
				},
				error(e) {

				}
			})
		} else {
			layer.msg('删除失败');
		}
	},

	//查看解析
	viewAnswer: function(questionId) {
		$.ajax({
			url: WTQUrl + 'manage_system/question/answer',
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
			if ($('#newlyBuild .choiceItem').html() === '' || $('#newlyBuild .choiceItem').html() == null || $( '#newlyBuild .choiceItem').html() === undefined ) {
				letter = 'A';
			}
			if (letter === '') {
				// 取选项最后一个字母
				var tailLetter = ($('#newlyBuild .choiceItem input').last()).val();
				// 转换为数字
				var transformation = (tailLetter.charCodeAt(0)) + 1;
				// 在转换为小写字母，然后在转换为大写字母
				letter = (String.fromCharCode(transformation)).toUpperCase();
			} else {
				letter = 'A';
			}
			if (letter === '['){
				layer.msg('选项只能到Z');
				return false;
			}
			// true是单选,false是多选

			if (judged === true) {
				$("#newlyBuild .choiceItem").append(
					'<p class="outerFrame"><input type="radio" lay-skin="primary" name="choiceItem" value="' + letter + '" title="' + letter + '">' +
					'<textarea name="" required lay-verify="required" maxlength="500" class="layui-textarea option" style="margin-left: 4px"></textarea>' +
					'</p>');
			} else if (judged === false) {
				$("#newlyBuild .choiceItem").append(
					'<p class="outerFrame">' +
					'<input type="checkbox" lay-skin="primary" name="choiceItem" value="' + letter + '" title="' + letter + '">' +
					'<textarea name="" required lay-verify="required" maxlength="500" class="layui-textarea option" style="margin-left: 4px"></textarea>' +
					'</p>');
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
					person.content = $(this).find('.option').val().replace('<','&lt;') .replace('>','&gt;');
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
				'status': 0,
			};

			var data = {
				'question': JSON.stringify(question),
				'questionOption': JSON.stringify(option)
			};
			$.ajax({
				url: WTQUrl + 'manage_system/question/question',
				data: data,
				dataType: 'json',
				type: 'POST',
				success(res) {
					location.reload(); // 刷新页面
                    layer.msg('添加成功(弹窗待样式)');
				}
			});
		});
	},
	// 编辑试题
	editQuestion: function(questionId) {
		$('#editBuild .choiceItem').html('');
		$('#editBuild .optionErrorMsg').hide();
		var Html = [];
		var letter = '';
		var questionRes = {};
		$.ajax({
			url: WTQUrl + 'manage_system/question/' + questionId,
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
								$("#editBuild .choiceItem").append('<p class="outerFrame">' +
									'<input class="ref" type="hidden" value = "' + item.ref + '"/>' +
									'<input type="radio" name="choiceItem" value="' + item.optionType + '" title="' + item.optionType + '" checked>' +
									'<textarea name="" required lay-verify="required" maxlength="300" class="layui-textarea option"style="margin-left: 6px">' + item.content + '</textarea>'+
									'</p>');
							} else {
								$("#editBuild .choiceItem").append(
									'<p class="outerFrame">' +
									'<input class="ref" type="hidden" value = "' + item.ref + '"/>' +
									'<input type="radio" name="choiceItem" value="' + item.optionType + '" title="' + item.optionType + '">' +
									'<textarea name="" required lay-verify="required" maxlength="300" class="layui-textarea option"style="margin-left: 6px">' + item.content + '</textarea>'+
									'</p>');
							}
						} else {
							type = 2;
							if (item.isRight == 1) {
								$("#editBuild .choiceItem").append(
									'<p class="outerFrame">' +
									'<input class="ref" type="hidden" value = "' + item.ref + '"/>' +
									'<input type="checkbox" lay-skin="primary" name="choiceItem" value="' + item.optionType + '" title="' + item.optionType + '" checked>' +
									'<textarea name="" required lay-verify="required" maxlength="300" class="layui-textarea option"style="margin-left: 6px">' + item.content + '</textarea>' +
									'</p>');
							} else {
								$("#editBuild .choiceItem").append(
									'<p class="outerFrame">' +
									'<input class="ref" type="hidden" value = "' + item.ref + '"/>' +
									'<input type="checkbox" lay-skin="primary" name="choiceItem" value="' + item.optionType + '" title="' + item.optionType + '">' +
									'<textarea name="" required lay-verify="required" maxlength="300" class="layui-textarea option"style="margin-left: 6px">' + item.content + '</textarea>'+
									'</p>');
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
											'<p class="outerFrame">' +
											'<input class="ref" type="hidden" value = "' + item.ref + '"/>' +
											'<input type="radio" name="choiceItem" value="' + item.optionType + '" title="' + item.optionType + '" checked>' +
											'<textarea name="" required lay-verify="required" maxlength="300" class="layui-textarea option"style="margin-left: 6px">' + item.content + '</textarea>'+
											'</p>');
									} else {
										$("#editBuild .choiceItem").append(
											'<p class="outerFrame">' +
											'<input class="ref" type="hidden" value = "' + item.ref + '"/>' +
											'<input type="radio" name="choiceItem" value="' + item.optionType + '" title="' + item.optionType + '">' +
											'<textarea name="" required lay-verify="required" maxlength="300" class="layui-textarea option"style="margin-left: 6px">' + item.content + '</textarea>'+
											'</p>');
									}
									type = 1;
									form.render();
								} else {
									if (item.isRight == 1) {
										$("#editBuild .choiceItem").append(
											'<p class="outerFrame"><input class="ref" type="hidden" value = "' + item.ref +'"/>' +
											'<input type="checkbox" lay-skin="primary" name="choiceItem" value="' +item.optionType +'" title="' + item.optionType +'" checked>' +
											'<textarea name="" required lay-verify="required" maxlength="300" class="layui-textarea option"style="margin-left: 6px">' +item.content +'</textarea>' +
											'</p>');
									} else {
										$("#editBuild .choiceItem").append(
											'<p class="outerFrame">' +
											'<input class="ref" type="hidden" value = "' + item.ref +'"/>' +
											'<input type="checkbox" lay-skin="primary" name="choiceItem" value="' +item.optionType +'" title="' + item.optionType +'">' +
											'<textarea name="" required lay-verify="required" maxlength="300" class="layui-textarea option"style="margin-left: 6px">' + item.content + '</textarea>' +
											'</p>');
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
					if (letter == '['){
						layer.msg('选项只能到Z');
						return false;
					}
					if (type == 1) {
						$("#editBuild .choiceItem").append(
							'<p class="outerFrame">' +
							'<input type="radio" name="choiceItem" value="' +letter +'" title="' + letter +'">' +
							'<textarea name="" required lay-verify="required" maxlength="500" class="layui-textarea option"  style="margin-left: 6px"></textarea>' +
							'</p>');
					} else if (type = 2) {
						$("#editBuild .choiceItem").append(
							'<p class="outerFrame">' +
							'<input type="checkbox" lay-skin="primary" name="choiceItem" value="' + letter +'" title="' + letter +'">' +
							'<textarea name="" required lay-verify="required" maxlength="500" class="layui-textarea option" style="margin-left: 6px"></textarea>' +
							'</p>');
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
					var status = 0;
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
							person.content = $(this).find('.option').val().replace('<','&lt;') .replace('>','&gt;');
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
						url: WTQUrl + 'manage_system/question/' + questionId,
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
	// 添加试题弹窗
	addPopup: function() {
		$('.NewTestQuestion').off('click').on('click', function() {
			layer.open({
				type: 1,
				title: ['新建试题',
					'background-color: #279ef0;text-align: center;font-size: 16px;line-height: 43px;color:white;padding: 0px;font-size: 20px;'
				],
                skin:'addTestQuestion',
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
	// 查看解析弹窗
	viewPopup: function(questionId) {
		layer.open({
			type: 1,
			area: ['660px', '300px'],
			closeBtn: 1,
			resize: false,
			move: false,
			title: ['查看解析',
				'background-color: #279ef0;text-align: center;border-radius: 5px 5px 0 0;font-size: 16px;line-height: 43px;color:white;padding: 0px;font-size: 20px;'
			],
			content: $('.PopupAnalysis'),
			// btn: '确认',
			btnAlign: 'c',
			success: function() {
				info.viewAnswer(questionId);
			}
		});

	},
	// 编辑试题弹窗
	editPopup: function(questionId) {
		layer.open({
			type: 1,
			title: ['编辑试题',
				'background-color: #279ef0;text-align: center;font-size: 16px;line-height: 43px;color:white;padding: 0px;font-size: 20px;'
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
