$(document).ready(function() {
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
		info.link();
	});

})
var type = 1;
var info = {
	selectQuestion: function(curr) {
		console.log(curr);
		$.ajax({
			url: 'http://localhost:8888/manage_system/question/questions',
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

				info.page(res.data);
			}
		});
	},

	//分页
	page: function(data) {
		console.log(data);
		layui.use('laypage', function() {
			var laypage = layui.laypage;
			//执行一个laypage实例
			laypage.render({
				elem: 'test1',
				theme: '#279ef0',
				layout: ['prev', 'page', 'next', 'limits', 'skip'],
				count: data.total,
				jump: function(obj, first) {
					console.log(obj.curr);
					if (!first) {
						info.selectQuestion(obj.curr);
					}
				}
			});

		});

	},
	//查看解析
	viewAnswer: function(questionId) {
		$.ajax({
			url: 'http://localhost:8888/manage_system/question/answer',
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
					$('.PopupAnalysis .ViewParsing .answer').text('故选:'+answer+'.');
					$('.PopupAnalysis .ViewParsing span').text(answer);
				});
			}


		});
	},
	//添加
	addQuestion: function() {
		layui.use('form', function() {
			var form = layui.form;
			form.on('radio(beshared)', function(data) {
				var name = '';
				var Html = [];
				Html.push(
					'<p class="outerFrame"><input type="radio" name="choiceItem" value="A" title="A"><textarea name="" required lay-verify="required" class="layui-textarea optionA option"></textarea></p>'
				);
				Html.push(
					'<p class="outerFrame"><input type="radio" name="choiceItem" value="B" title="B"><textarea name="" required lay-verify="required" class="layui-textarea optionB option"></textarea></p>'
				);
				Html.push(
					'<p class="outerFrame"><input type="radio" name="choiceItem" value="C" title="C"><textarea name="" required lay-verify="required" class="layui-textarea optionC option"></textarea></p>'
				);
				Html.push(
					'<p class="outerFrame"><input type="radio" name="choiceItem" value="D" title="D"><textarea name="" required lay-verify="required" class="layui-textarea optionD option"></textarea></p>'
				);
				var Htmls = [];
				Htmls.push(
					'<p class="outerFrame"><input type="checkbox" lay-skin="primary" name="choiceItem" value="A" title="A"><textarea name="" required lay-verify="required" class="layui-textarea optionA option"></textarea></p>'
				);
				Htmls.push(
					'<p class="outerFrame"><input type="checkbox" lay-skin="primary" name="choiceItem" value="B" title="B"><textarea name="" required lay-verify="required" class="layui-textarea optionB option"></textarea></p>'
				);
				Htmls.push(
					'<p class="outerFrame"><input type="checkbox" lay-skin="primary" name="choiceItem" value="C" title="C"><textarea name="" required lay-verify="required" class="layui-textarea optionC option"></textarea></p>'
				);
				Htmls.push(
					'<p class="outerFrame"><input type="checkbox" lay-skin="primary" name="choiceItem" value="D" title="D"><textarea name="" required lay-verify="required" class="layui-textarea optionD option"></textarea></p>'
				);
				if (data.value == '单选题') {
					$('#newlyBuild .choiceItem').html(Html.join(''));
					name = 'radio';
					judged = true;
				} else {
					$('#newlyBuild .choiceItem').html(Htmls.join(''));
					name = 'checkbox';
					judged = false;
				}
				// 重新渲染
				layui.use('form', function() {
					var form = layui.form;
					form.render(name);
				});
			});
		});
		var judged = true;
		$('#newlyBuild .addOptions').click(function() {
			var letter = '';
			if ($('#newlyBuild .choiceItem').html() == '' || $('#newlyBuild .choiceItem').html() == null || $(
					'#newlyBuild .choiceItem').html() == undefined) {
				alert("没有选项,自动为您添加选项");
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
				$("#newlyBuild .choiceItem").append('<p class="outerFrame"><input type="radio" name="choiceItem" value="' +
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
		$('#newlyBuild .deleteOptions').click(function() {
			$("#newlyBuild .outerFrame").eq(-1).remove();
		});
		$('#newlyBuild #confirmAdd').off('click').on('click', function() {
			var content = $('#newlyBuild #content').val();
			var questionType = 0;
			var option = [];
			var score = 10;
			var difficulty = 2;
			var status = 1;
			$('#newlyBuild .outerFrame').each(function() {
				var person = {};
				person.content = $(this).find('.option').val();
				if (judged) {
					person.optionType = $(this).find('.layui-unselect div').text();
					if ($(this).find('.layui-form-radio').is('.layui-form-radioed')) {
						person.isRight = 1;
					} else {
						person.isRight = 0;
					}
				} else {
					person.optionType = $(this).find('.layui-unselect span').text();
					if ($(this).find('.layui-form-checkbox').is('.layui-form-checked')) {
						person.isRight = 1;
					} else {
						person.isRight = 0;
					}
				}
				option.push(person);

			});
			var analysis = $('#newlyBuild #analysis').val();
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
				url: 'http://localhost:8888/manage_system/question/question',
				data: data,
				dataType: 'json',
				type: 'POST',
				success(res) {


				}
			});
		});
	},
	//修改
	editQuestion: function(questionId) {
		var Html = [];
		var letter = '';
		var questionRes = {};
		var count = 0;
		$.ajax({
			url: 'http://localhost:8888/manage_system/question/' + questionId,
			data: '',
			dataType: 'json',
			type: 'GET',
			success(res) {
				console.log(res);
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
						questionRes.data.forEach(function(questionItem, questionIndex) {
							questionItem.optionInfo.forEach(function(item, index) {
								if (data.value == '单选题') {
									$("#editBuild .choiceItem").append(
										'<p class="outerFrame"><input class="ref" type="hidden" value = "' + item.ref +
										'"/><input type="radio" name="choiceItem" value="' +
										item.optionType +
										'" title="' + item.optionType +
										'"><textarea name="" required lay-verify="required" class="layui-textarea option">' + item.content +
										'</textarea></p>');
									type = 1;
									form.render();
								} else {
									$("#editBuild .choiceItem").append(
										'<p class="outerFrame"><input class="ref" type="hidden" value = "' + item.ref +
										'"/><input type="checkbox" lay-skin="primary" name="choiceItem" value="' +
										item.optionType +
										'" title="' + item.optionType +
										'"><textarea name="" required lay-verify="required" class="layui-textarea option">' + item.content +
										'</textarea></p>');
									type = 2;
									form.render();
								}
							});
						});
					});
					form.render();
				});
				$('#editBuild .addOptions').click(function() {
					var letter = '';
					if ($('#editBuild .choiceItem').html() == '' || $('#editBuild .choiceItem').html() == null || $(
							'#editBuild .choiceItem').html() == undefined) {
						alert("没有选项,自动为您添加选项");
						letter = 'A';
					}
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
					// true是单选,false是多选
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
				$('#editBuild .deleteOptions').click(function() {
					$("#editBuild .outerFrame").eq(-1).remove();
				});
				$('#editBuild #confirmAdd').off('click').on('click', function() {
					var content = $('#editBuild #content').val();
					var option = [];
					var score = 10;
					var difficulty = 2;
					var status = 1;
					$('#editBuild .outerFrame').each(function() {
						var person = {};
						person.ref = $(this).find('.ref').val();
						person.content = $(this).find('.option').val();
						if (type == 1) {
							person.optionType = $(this).find('.layui-unselect div').text();
							if ($(this).find('.layui-form-radio').is('.layui-form-radioed')) {
								person.isRight = 1;
							} else {
								person.isRight = 0;
							}
						} else {
							person.optionType = $(this).find('.layui-unselect span').text();
							if ($(this).find('.layui-form-checkbox').is('.layui-form-checked')) {
								person.isRight = 1;
							} else {
								person.isRight = 0;
							}
						}

						option.push(person);
					});

					var analysis = $('#editBuild #analysis').val();
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
						url: 'http://localhost:8888/manage_system/question/' + questionId,
						data: data,
						dataType: 'json',
						type: 'POST',
						success(res) {}
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
	//跳转
	link: function() {
		$('.EditorTestPaper').click(function() {
			// 跳转到试题
			window.location.href = "../EditorTestPaper/EditorTestPaper.html";
		});
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
