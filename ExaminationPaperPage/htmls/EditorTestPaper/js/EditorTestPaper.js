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
	$('#resource').off('click').on('click', function() {
		window.location.href = "../../../ResourcePage/ResourcePage.html";
	});
	// 试卷(特殊)
	$('#actives').off('click').on('click', function() {
		window.location.href = "../../ExaminationPaperPage.html";
	});
	// 试题
	$('#testQuestions').off('click').on('click', function() {
		window.location.href = "../../../TestQuestions/TestQuestions.html";
	});
	// 任务
	$('#taskPage').off('click').on('click', function() {
		window.location.href = "../../../TaskPage/TaskPage.html";
	});
	// 首页
	$('#homePage').off('click').on('click', function() {
		window.location.href = "../../../HomePage/HomePage.html";
	});
	// 统计
	$('#StatisticsPage').off('click').on('click', function() {
		window.location.href = "../../../StatisticsPage/StatisticsPage.html";
	});

	$('.mobileFramework').clickSort({
		speed: 500,
		callback: function() {
			// alert('ok');
			// 结束后的通知与方法
		}
	});

	// 隐藏确认完成和加入试题按钮
	$('.joinIn').hide();
	$('.confirmCompletion').hide();
	$('.totalNumberOfQuestions').hide();
	$('.removeQuestions').hide();
	$('#saveChanges').hide();
	// 点击选择试题
	$('#newTestPaper').off('click').on('click', function() {
		$('.joinIn').show();
		$('.confirmCompletion').show();
		$('.totalNumberOfQuestions').show();
		$('.fraction').hide();
		$('.edit').hide();
		$('.moveOut').hide();
		$('.moveup').hide();
		$('.movedown').hide();
		$('.fraction').hide();
		$('#newTestPaper').attr('disabled', true);
		$('#newTestPaper').css('background-color', '#AAAAAA');
		$('#newTestPaper').css('cursor', 'not-allowed');
		info.TableDataRequest(1);
	});

	// 点击确认完成
	$('.confirmCompletion').off('click').on('click', function() {
		$('.joinIn').hide();
		$('.confirmCompletion').hide();
		$('.totalNumberOfQuestions').hide();
		$('.fraction').show();
		$('.edit').show();
		$('.moveOut').show();
		$('.moveup').show();
		$('.movedown').show();
		$('.fraction').show();
		$('.removeQuestions').hide();
		$('#saveChanges').show();
		info.viewQuestion();
		for (var i = 0; i < storageQusetionId.length; i++) {
			info.viewQuestion(storageQusetionId[i]);
		}
		// 没加入试卷就清空内容
		if (storageQusetionId.length == 0) {
			$('.mobileFramework').empty();
		}
		$('#newTestPaper').attr('disabled', false);
		$('#newTestPaper').css('background-color', '#FFFFFF');
		$('#newTestPaper').css('cursor', 'pointer');
	});
});
// 试卷ID(全局)
var PaperId;
// 储存paperId
var storageQusetionId = [];
// 用来存最后的结果(确认保存)
var storageResults = [];
// 点击完确认完成,然后往页面里添加数据的数组
var viewHtml = [];
// 储存全部试题
var allQuestions = [];
// 用来判断什么时候往页面里塞入数据
var viewChack = 0;
var judge = true;
// 储存试题成绩
var questionScore = [];
// 添加
var JPaperQuestion = [];
// 删除
var PaperQuestionPesult = [];
// 排序会用到
var sorting = [];

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
		PaperId = decodeURI(value);
		// 查该试卷下的试题
		info.TableDataRequests();
	},
	//表格数据请求
	TableDataRequests: function() {
		$.ajax({
			url: MCUrl + 'manage_system/paper/' + PaperId,
			dataType: 'json',
			Type: 'GET',
			success: function(res) {
				if (res || res.data !== null) {
					// info.TableDrawing(res.data , curr);
					info.TableDrawings(res.data, 1);
				}
			},
			error: function(e) {

			}
		});
	},
	//表格会绘制
	TableDrawings: function(data, curr) {
		if (data.questions.length == 0) {
			judge = false;
		} else {
			$('#newTestPaper').attr('disabled', true);
			$('#newTestPaper').css('background-color', '#AAAAAA');
			$('#newTestPaper').css('cursor', 'not-allowed');
		}
		var Html = [];
		data.questions.forEach(function(item, index) {
			// data.list.forEach(function(item, index) {
			Html.push('<li class="sortableitem">');
			Html.push('<div class="topicFramework" data-id="' + item.questionId + '">');
			Html.push('<input type="text" class="qusetionId" value="' + item.questionId + '" hidden="hidden"/>');
			if (item.questionType == 1) {
				item.questionType = '单选题';
			} else {
				item.questionType = '多选题';
			}
			Html.push('<p class="distanceNum"><span class="num">' + (index + 1) + '</span>. ' + item.questionType + '<span class="newScore">  ' + item.newScore + '分</span></p>');
			Html.push('<p class="distance">' + item.content + '</p>');
			item.optionInfo.forEach(function(items, index) {
				Html.push('<p class="distance">' + items.optionType + ' ' + items.content + '</p>');
			});
			Html.push('</div>');
			Html.push('<div class="functionBox">');
			Html.push('<button class="toView"><i class="layui-icon layui-icon-search"></i>查看解析</button>');
			Html.push('<button class="fraction"><img src="../../../imgs/f.png" alt="" />设定分值</button>');
			Html.push('<button class="moveOut"><i class="layui-icon layui-icon-delete"></i>移出</button>');
			Html.push('<button class="moveup"><i class="layui-icon layui-icon-up"></i>上移</button>');
			Html.push('<button class="movedown"><i class="layui-icon layui-icon-down"></i>下移</button>');
			Html.push('<button class="joinIn"><i class="layui-icon layui-icon-add-circle"></i>加入试卷</button>');
			Html.push('<button class="removeQuestions"><i class="layui-icon layui-icon-delete"></i>移出试卷</button>');
			Html.push('</div>');
			Html.push('</li>');
		});
		$('.mobileFramework').html(Html.join(''));
		$('.joinIn').hide();
		$('.removeQuestions').hide();
		// 加入试卷
		$('.joinIn').off('click').on('click', function() {
			var QusetionId = $(this).parent().parent().find('.qusetionId').val();
			storageQusetionId.push(QusetionId);
			// 显示移出试卷
			$(this).parent().find('.removeQuestions').show();
			// 隐藏加入试卷
			$(this).parent().find('.joinIn').hide();
		});
		// 设置分值
		$('.fraction').off('click').on('click', function() {
			var QusetionId = $(this).parent().parent().find('.qusetionId').val();
			info.fraction(QusetionId, this);
		});
		// 移出试卷
		$('.removeQuestions').off('click').on('click', function() {
			var QusetionId = $(this).parent().parent().find('.qusetionId').val();
			for (var i = 0; i < storageQusetionId.length; i++) {
				if (QusetionId == storageQusetionId[i]) {
					storageQusetionId.splice($.inArray(storageQusetionId[i], storageQusetionId), 1);
					break;
				}
			}
			// 显示加入试卷
			$(this).parent().find('.joinIn').show();
			// 隐藏移出试卷
			$(this).parent().find('.removeQuestions').hide();
		});
		// 解析
		$('.toView').off('click').on('click', function() {
			var QusetionId = $(this).parent().parent().find('.qusetionId').val();
			info.toViewAnalysis(QusetionId);
		});
		// 点击上移
		$('.moveup').off('click').on('click', function() {
			// 显示保存更改按钮
			$('#saveChanges').show();
			// sorting = [];
			// for (var i = 1; i <= $('.sortableitem').length; i++){
			// 	var data = {
			// 		'paperId': PaperId,
			// 		'questionId': $('.sortableitem:nth-child('+ [i] +') .topicFramework').attr('data-id'),
			// 		'score': 0,
			// 		'orderIndex': i,
			// 		'cTime': today,
			// 		'cUser': 'mc'
			// 	};
			// 	sorting.push(data);
			// }
		});
		// 点击移出，删除本身
		$('.moveOut').off('click').on('click', function() {
			var QusetionIdS = $(this).parent().parent().find('.qusetionId').val();
			allQuestions.push(QusetionIdS);
			// 删除this的父级的父级
			$(this).parent().parent().remove();
			$('#saveChanges').show();
		});
		// 点击下移
		$('.movedown').off('click').on('click', function() {
			// 显示保存更改按钮
			$('#saveChanges').show();
			// sorting = [];
			// for (var i = 1; i <= $('.sortableitem').length; i++){
			// 	var data = {
			// 		'paperId': PaperId,
			// 		'questionId': $('.sortableitem:nth-child('+ [i] +') .topicFramework').attr('data-id'),
			// 		'score': 0,
			// 		'orderIndex': i,
			// 		'cTime': today,
			// 		'cUser': 'mc'
			// 	};
			// 	sorting.push(data);
			// }
		});
		// 点击保存更改
		$('#saveChanges').off('click').on('click', function() {
			// 隐藏保存更改按钮
			$('#saveChanges').hide();
			if (judge != false) {
				for (var i = 0; i < allQuestions.length; i++) {
					var data = {
						'paperId': PaperId,
						'questionId': allQuestions[i]
					};
					PaperQuestionPesult.push(data);
				}
			}
			for (var i = 0; i < storageResults.length; i++) {
				var data = {
					'paperId': PaperId,
					'questionId': storageResults[i],
					'score': 0,
					'orderIndex': (i + 1),
					'cTime': today,
					'cUser': 'mc'
				};
				JPaperQuestion.push(data);
			}
			info.addOrRemoveRelationships();
		});
	},
	//表格数据请求
	TableDataRequest: function(curr) {
		$.ajax({
			// url: MCUrl + 'manage_system/paper/' + PaperId,
			url: MCUrl + 'manage_system/question/questions',
			data: {
				'pageNum': (curr || 1),
				'pageSize': 10,
				// 'questionType': 1,
				'content': $('.search').val()
			},
			dataType: 'json',
			Type: 'GET',
			success: function(res) {
				if (res || res.data !== null) {
					// info.TableDrawing(res.data , curr);
					info.TableDrawing(res.data, curr);
				}
			},
			error: function(e) {

			}
		});
	},
	//表格会绘制
	TableDrawing: function(data, curr) {
		var Html = [];
		// data.questions.forEach(function(item, index) {
		data.list.forEach(function(item, index) {
			Html.push('<li class="sortableitem">');
			Html.push('<div class="topicFramework" data-id="' + item.questionId + '">');
			Html.push('<input type="text" class="qusetionId" value="' + item.questionId + '" hidden="hidden"/>');
			if (item.questionType == 1) {
				item.questionType = '单选题';
			} else {
				item.questionType = '多选题';
			}
			if (item.newScore == null){
				item.newScore = 0;
			}
			// Html.push('<p class="distanceNum"><span class="num">' + (index + 1) + '</span>. ' + item.questionType + '  ' + item.newScore + '分</p>');
			Html.push('<p class="distanceNum"><span class="num">' + (index + 1) + '</span>. ' + item.questionType + '<span class="newScore">  ' + item.newScore + '分</span></p>');
			Html.push('<p class="distance">' + item.content + '</p>');
			item.optionInfo.forEach(function(items, index) {
				Html.push('<p class="distance">' + items.optionType + ' ' + items.content + '</p>');
			});
			Html.push('</div>');
			Html.push('<div class="functionBox">');
			Html.push('<button class="toView"><i class="layui-icon layui-icon-search"></i>查看解析</button>');
			Html.push('<button class="fraction"><img src="../../../imgs/f.png" alt="" />设定分值</button>');
			Html.push('<button class="moveOut"><i class="layui-icon layui-icon-delete"></i>移出</button>');
			Html.push('<button class="moveup"><i class="layui-icon layui-icon-up"></i>上移</button>');
			Html.push('<button class="movedown"><i class="layui-icon layui-icon-down"></i>下移</button>');
			Html.push('<button class="joinIn"><i class="layui-icon layui-icon-add-circle"></i>加入试卷</button>');
			Html.push('<button class="removeQuestions"><i class="layui-icon layui-icon-delete"></i>移出试卷</button>');
			Html.push('</div>');
			Html.push('</li>');
		});
		$('.mobileFramework').html(Html.join(''));
		$('.totalNumberOfQuestions').hide();
		$('.removeQuestions').hide();
		$('.fraction').hide();
		$('.moveOut').hide();
		$('.moveup').hide();
		$('.movedown').hide();
		// 加入试卷
		$('.joinIn').off('click').on('click', function() {
			var QusetionId = $(this).parent().parent().find('.qusetionId').val();
			storageQusetionId.push(QusetionId);
			// 显示移出试卷
			$(this).parent().find('.removeQuestions').show();
			// 隐藏加入试卷
			$(this).parent().find('.joinIn').hide();
		});
		// 移出试卷
		$('.removeQuestions').off('click').on('click', function() {
			var QusetionId = $(this).parent().parent().find('.qusetionId').val();
			for (var i = 0; i < storageQusetionId.length; i++) {
				if (QusetionId == storageQusetionId[i]) {
					storageQusetionId.splice($.inArray(storageQusetionId[i], storageQusetionId), 1);
					break;
				}
			}
			// 显示加入试卷
			$(this).parent().find('.joinIn').show();
			// 隐藏移出试卷
			$(this).parent().find('.removeQuestions').hide();
		});
		// 解析
		$('.toView').off('click').on('click', function() {
			var QusetionId = $(this).parent().parent().find('.qusetionId').val();
			info.toViewAnalysis(QusetionId);
		});
		// 点击上移
		$('.moveup').off('click').on('click', function() {
			// 显示保存更改按钮
			$('#saveChanges').show();
			// sorting = [];
			// for (var i = 1; i <= $('.sortableitem').length; i++){
			// 	var data = {
			// 		'paperId': PaperId,
			// 		'questionId': $('.sortableitem:nth-child('+ [i] +') .topicFramework').attr('data-id'),
			// 		'score': 0,
			// 		'orderIndex': i,
			// 		'cTime': today,
			// 		'cUser': 'mc'
			// 	};
			// 	sorting.push(data);
			// }
		});
		// 点击移出，删除本身
		$('.moveOut').off('click').on('click', function() {
			var QusetionIdS = $(this).parent().parent().find('.qusetionId').val();
			allQuestions.push(QusetionIdS);
			// 删除this的父级的父级
			$(this).parent().parent().remove();
			// for (var i = 0; i < storageResults.length; i++){
			// 	if (QusetionIdS == storageResults[i]){
			// 		storageResults.splice($.inArray(storageResults[i],storageResults),1);
			// 		break;
			// 	}
			// }
			$('#saveChanges').show();
		});
		// 点击下移
		$('.movedown').off('click').on('click', function() {
			// 显示保存更改按钮
			$('#saveChanges').show();
			// sorting = [];
			// for (var i = 1; i <= $('.sortableitem').length; i++){
			// 	var data = {
			// 		'paperId': PaperId,
			// 		'questionId': $('.sortableitem:nth-child('+ [i] +') .topicFramework').attr('data-id'),
			// 		'score': 0,
			// 		'orderIndex': i,
			// 		'cTime': today,
			// 		'cUser': 'mc'
			// 	};
			// 	sorting.push(data);
			// }
		});
		// 设置分值
		$('.fraction').off('click').on('click', function() {
			var QusetionId = $(this).parent().parent().find('.qusetionId').val();
			info.fraction(QusetionId, this);
		});
		// 点击保存更改
		$('#saveChanges').off('click').on('click', function() {
			// 隐藏保存更改按钮
			$('#saveChanges').hide();
			if (judge != false) {
				for (var i = 0; i < allQuestions.length; i++) {
					// info.deletes(allQuestions[i]);
					var data = {
						'paperId': PaperId,
						'questionId': allQuestions[i]
					};
					PaperQuestionPesult.push(data);
				}
			}
			for (var i = 0; i < storageResults.length; i++) {
				var data = {
					'paperId': PaperId,
					'questionId': storageResults[i],
					'score': 0,
					'orderIndex': (i + 1),
					'cTime': today,
					'cUser': 'mc'
				};
				JPaperQuestion.push(data);
			}
			info.addOrRemoveRelationships();
		});
	},
	viewQuestion: function(questionId) {
		if (questionId == undefined) {
			return false;
		}
		$.ajax({
			url: MCUrl + 'manage_system/question/' + questionId,
			// url: MCUrl + 'manage_system/question/questions',
			Type: 'GET',
			success: function(res) {
				if (res || res.data !== null) {
					info.viewQuestions(res.data);
				}
			},
			error: function(e) {

			}
		});
	},
	// 查询单个试题
	viewQuestions: function(data) {
		viewChack++;
		data.forEach(function(item, index) {
			viewHtml.push('<li class="sortableitem">');
			viewHtml.push('<div class="topicFramework" data-id="' + item.questionId + '">');
			viewHtml.push('<input type="text" class="qusetionId" value="' + item.questionId + '" hidden="hidden"/>');
			if (item.questionType == 1) {
				item.questionType = '单选题';
			} else {
				item.questionType = '多选题';
			}
			if (item.newScore == null){
				item.newScore = 0;
			}
			// viewHtml.push('<p class="distanceNum"><span class="num">' + (index + 1) + '</span>. ' + item.questionType +
			// 	'  ' + item.newScore + '分</p>');
				viewHtml.push('<p class="distanceNum"><span class="num">' + (index + 1) + '</span>. ' + item.questionType + '<span class="newScore">  ' + item.newScore +
				 '分</span></p>');
			viewHtml.push('<p class="distance">' + item.content + '</p>');
			item.optionInfo.forEach(function(items, index) {
				viewHtml.push('<p class="distance">' + items.optionType + ' ' + items.content + '</p>');
			});
			viewHtml.push('</div>');
			viewHtml.push('<div class="functionBox">');
			viewHtml.push('<button class="toView"><i class="layui-icon layui-icon-search"></i>查看解析</button>');
			viewHtml.push('<button class="fraction"><img src="../../../imgs/f.png" alt="" />设定分值</button>');
			viewHtml.push('<button class="moveOut"><i class="layui-icon layui-icon-delete"></i>移出</button>');
			viewHtml.push('<button class="moveup"><i class="layui-icon layui-icon-up"></i>上移</button>');
			viewHtml.push('<button class="movedown"><i class="layui-icon layui-icon-down"></i>下移</button>');
			// viewHtml.push('<button class="joinIn"><i class="layui-icon layui-icon-add-circle"></i>加入试卷</button>');
			// viewHtml.push('<button class="removeQuestions"><i class="layui-icon layui-icon-delete"></i>移出试卷</button>');
			viewHtml.push('</div>');
			viewHtml.push('</li>');
		});
		// 判断是否是最后一次的调用，如果是最后一次就往页面里塞入数据
		if (storageQusetionId.length == viewChack) {
			$('.mobileFramework').html(viewHtml.join(''));

			$('.joinIn').hide();
			$('.removeQuestions').hide();
			// 移出
			$('.moveOut').off('click').on('click', function() {
				var QusetionId = $(this).parent().parent().find('.qusetionId').val();
				for (var i = 0; i < storageQusetionId.length; i++) {
					if (QusetionId == storageQusetionId[i]) {
						storageQusetionId.splice($.inArray(storageQusetionId[i], storageQusetionId), 1);
						break;
					}
				}
				$(this).parent().parent().remove();
				$('#saveChanges').show();
			});
			$('#newTestPaper').attr('disabled', true);
			$('#newTestPaper').css('background-color', '#AAAAAA');
			$('#newTestPaper').css('cursor', 'not-allowed');
			// 点击上移
			$('.moveup').off('click').on('click', function() {
				// 显示保存更改按钮
				$('#saveChanges').show();
				// sorting = [];
				// for (var i = 1; i <= $('.sortableitem').length; i++){
				// 	var data = {
				// 		'paperId': PaperId,
				// 		'questionId': $('.sortableitem:nth-child('+ [i] +') .topicFramework').attr('data-id'),
				// 		'score': 0,
				// 		'orderIndex': i,
				// 		'cTime': today,
				// 		'cUser': 'mc'
				// 	};
				// 	sorting.push(data);
				// }
			});
			// 点击下移
			$('.movedown').off('click').on('click', function() {
				// 显示保存更改按钮
				$('#saveChanges').show();
				// sorting = [];
				// for (var i = 1; i <= $('.sortableitem').length; i++){
				// 	var data = {
				// 		'paperId': PaperId,
				// 		'questionId': $('.sortableitem:nth-child('+ [i] +') .topicFramework').attr('data-id'),
				// 		'score': 0,
				// 		'orderIndex': i,
				// 		'cTime': today,
				// 		'cUser': 'mc'
				// 	};
				// 	sorting.push(data);
				// }
			});
			// 设置分值
			$('.fraction').off('click').on('click', function() {
				var QusetionId = $(this).parent().parent().find('.qusetionId').val();
				info.fraction(QusetionId, this);
			});
			// 解析
			$('.toView').off('click').on('click', function() {
				var QusetionId = $(this).parent().parent().find('.qusetionId').val();
				info.toViewAnalysis(QusetionId);
			});
			// 点击保存更改
			$('#saveChanges').off('click').on('click', function() {
				Array.prototype.push.apply(storageResults, storageQusetionId);
				// 清空数组
				storageQusetionId = [];
				// 隐藏保存更改按钮
				$('#saveChanges').hide();
				if (judge != false) {
					for (var i = 0; i < allQuestions.length; i++) {
						var data = {
							'paperId': PaperId,
							'questionId': allQuestions[i]
						};
						PaperQuestionPesult.push(data);
					}
				}
				for (var i = 0; i < storageResults.length; i++) {
					var data = {
						'paperId': PaperId,
						'questionId': storageResults[i],
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
	$('#resource').off('click').on('click', function() {
		window.location.href = "../../../ResourcePage/ResourcePage.html";
	});
	// 试卷(特殊)
	$('#actives').off('click').on('click', function() {
		window.location.href = "../../ExaminationPaperPage.html";
	});
	// 试题
	$('#testQuestions').off('click').on('click', function() {
		window.location.href = "../../../TestQuestions/TestQuestions.html";
	});
	// 任务
	$('#taskPage').off('click').on('click', function() {
		window.location.href = "../../../TaskPage/TaskPage.html";
	});
	// 首页
	$('#homePage').off('click').on('click', function() {
		window.location.href = "../../../HomePage/HomePage.html";
	});
	$('.mobileFramework').clickSort({
		speed: 500,
		callback: function() {
			// alert('ok');
			// 结束后的通知与方法
		}
	});
	// 判断是单选还是多选
	var judged = true;
	// 隐藏选项提示语
	$('.hiddenText').hide();
	// 隐藏保存更改按钮
	$('#saveChanges').hide();
	// 弹窗确认按钮
	$('#confirmAdd').off('click').on('click', function() {
		// true是单选,false是多选
		if (judged == true) {
			var singleChoice = $("input[name='choiceItem']:checked").val();
		} else if (judged == false) {
			var multipleSelection = '';
			$("input:checkbox[name='choiceItem']:checked").each(function() { // 遍历name=standard的多选框
				multipleSelection += ',' + $(this).val();
			});
		}
		layer.closeAll();		// 关闭页面
		// parent.location.reload(); // 刷新页面
		// 清空选择
		layui.use('form', function() {
			var form = layui.form;
			form.render(name);
			$('input[name = selectionType]').prop('checked', false);
			$('input[name = choiceItem]').prop('checked', false);
			form.render('radio');
			form.render('checkbox');
		});
		// 清空输入框数据
		$('.titleInputBox').val('');
		$('.option').val('');
		$('.parseInputBox').val('');
	});
	// 添加选项
	$('.addOptions').off('click').on('click', function() {
		var letter = '';
		if ($('.choiceItem').html() == '' || $('.choiceItem').html() == null || $('.choiceItem').html() == undefined) {
			// alert("没有选项,自动为您添加选项");
			letter = 'A';
		}
		if (letter == '') {
			// 取选项最后一个字母
			var tailLetter = ($('.choiceItem input').last()).val();
			// 转换为对应code码(数字)
			var transformation = (tailLetter.charCodeAt(0)) + 1;
			// 在转换为小写字母，然后在转换为大写字母
			letter = (String.fromCharCode(transformation)).toUpperCase();
		} else {
			letter = 'A';
		}
		if (letter == '[') {
			layer.msg('拒绝让你添加选项，有脾气吗？', {
				time: 0 //不自动关闭
					,
				btn: ['有', '没有'],
				yes: function(index) {
					layer.close(index);
					layer.msg('怎么？砍你好啊', {
						icon: 6,
						btn: ['投降', '不投降']
					});
				}
			});
			return false;
		}
		// true是单选,false是多选
		if (judged == true) {
			$(".choiceItem").append('<p class="outerFrame"><input type="radio" name="choiceItem" value="' + letter +
				'" title="' + letter +
				'"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>');
			var size = $(".choiceItem").children().length;
			if (size > 1) {
				$("#confirmAdd").attr('disabled', false);
				$('#confirmAdd').removeClass("prohibit");
				$('.hiddenText').hide();
			}
		} else if (judged == false) {
			$(".choiceItem").append(
				'<p class="outerFrame"><input type="checkbox" lay-skin="primary" name="choiceItem" value="' + letter +
				'" title="' + letter +
				'"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>');
			var size = $(".choiceItem").children().length;
			if (size > 2) {
				$("#confirmAdd").attr('disabled', false);
				$('#confirmAdd').removeClass("prohibit");
				$('.hiddenText').hide();
			}
		}
		// 重新渲染
		layui.use('form', function() {
			var form = layui.form;
			form.render();
		});
	});
	// 删除选项
	$('.deleteOptions').off('click').on('click', function() {
		$(".outerFrame").eq(-1).remove();
		var size = $(".choiceItem").children().length;
		if (judged == true && size < 2) {
			$("#confirmAdd").attr('disabled', true);
			$('#confirmAdd').addClass("prohibit");
			$('.hiddenText').show();
		} else if (judged == false && size < 3) {
			$("#confirmAdd").attr('disabled', true);
			$('#confirmAdd').addClass("prohibit");
			$('.hiddenText').show();
		}
	});
	// 点击移出，删除本身
	$('.moveOut').off('click').on('click', function() {
		// 删除this的父级的父级
		$(this).parent().parent().remove();
		// 调用XXX方法
	});
	// 点击上移
	$('.moveup').off('click').on('click', function() {
		// 显示保存更改按钮
		$('#saveChanges').show();
	});
	// 点击下移
	$('.movedown').off('click').on('click', function() {
		// 显示保存更改按钮
		$('#saveChanges').show();
	});
	// 点击保存更改
	$('#saveChanges').off('click').on('click', function() {
		// 隐藏保存更改按钮
		$('#saveChanges').hide();
		// 调用XXX方法
	});
	// 弹窗里的单选题/多选题	分别调用什么事件(监听)
	layui.use('form', function() {
		var form = layui.form;
		form.on('radio(beshared)', function(data) {
			var Html = [];
			Html.push(
				'<p class="outerFrame"><input type="radio" name="choiceItem" value="A" title="A"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>'
			);
			Html.push(
				'<p class="outerFrame"><input type="radio" name="choiceItem" value="B" title="B"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>'
			);
			Html.push(
				'<p class="outerFrame"><input type="radio" name="choiceItem" value="C" title="C"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>'
			);
			Html.push(
				'<p class="outerFrame"><input type="radio" name="choiceItem" value="D" title="D"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>'
			);
			var Htmls = [];
			Htmls.push(
				'<p class="outerFrame"><input type="checkbox" lay-skin="primary" name="choiceItem" value="A" title="A"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>'
			);
			Htmls.push(
				'<p class="outerFrame"><input type="checkbox" lay-skin="primary" name="choiceItem" value="B" title="B"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>'
			);
			Htmls.push(
				'<p class="outerFrame"><input type="checkbox" lay-skin="primary" name="choiceItem" value="C" title="C"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>'
			);
			Htmls.push(
				'<p class="outerFrame"><input type="checkbox" lay-skin="primary" name="choiceItem" value="D" title="D"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>'
			);
			if (data.value == '单选题') {
				$('.choiceItem').html(Html.join(''));
				judged = true;
			} else {
				$('.choiceItem').html(Htmls.join(''));
				judged = false;
			}
			// 重新渲染
			layui.use('form', function() {
				var form = layui.form;
				form.render();
			});
		});
	});
	// 隐藏确认完成和加入试题按钮
	$('.joinIn').hide();
	$('.confirmCompletion').hide();
	$('.totalNumberOfQuestions').hide();
	$('.removeQuestions').hide();
	// 点击选择试题
	$('#newTestPaper').off('click').on('click', function() {
		$('.joinIn').show();
		$('.confirmCompletion').show();
		$('.totalNumberOfQuestions').show();
		$('.fraction').hide();
		$('.edit').hide();
		$('.moveOut').hide();
		$('.moveup').hide();
		$('.movedown').hide();
		$('.fraction').hide();
		$('#newTestPaper').attr('disabled', true);
		$('#newTestPaper').css('background-color', '#AAAAAA');
		$('#newTestPaper').css('cursor', 'not-allowed');
		info.TableDataRequest(1);
	});

	// 点击确认完成
	$('.confirmCompletion').off('click').on('click', function() {
		$('.joinIn').hide();
		$('.confirmCompletion').hide();
		$('.totalNumberOfQuestions').hide();
		$('.fraction').show();
		$('.edit').show();
		$('.moveOut').show();
		$('.moveup').show();
		$('.movedown').show();
		$('.fraction').show();
		$('.removeQuestions').hide();
		info.viewQuestion();
		for (var i = 0; i < storageQusetionId.length; i++){
			info.viewQuestion(storageQusetionId[i]);
		};
		$('#newTestPaper').attr('disabled', false);
		$('#newTestPaper').css('background-color', '#FFFFFF');
		$('#newTestPaper').css('cursor', 'pointer');
	});
});
// 试卷ID(全局)
var PaperId;
// 储存paperId
var storageQusetionId = [];
// 用来存最后的结果(确认保存)
var storageResults = [];
// 点击完确认完成,然后往页面里添加数据的数组
var viewHtml = [];
// 储存全部试题
var allQuestions = [];
// 用来判断什么时候往页面里塞入数据
var viewChack = 0;
var judge = true;
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
		PaperId = decodeURI(value);
		info.TableDataRequests();
		// 查全部试题
		// info.TableDataRequest(1);
	},
	//表格数据请求
	TableDataRequests: function() {
		$.ajax({
			url: MCUrl + 'manage_system/paper/' + PaperId,
			// url: MCUrl + 'manage_system/question/questions',
			// data: {
			// 	'pageNum': (curr || 1),
			// 	'pageSize': 10,
			// 	// 'questionType': 1,
			// 	'content': $('.search').val()
			// },
			dataType: 'json',
			Type: 'GET',
			success: function(res) {
				if (res || res.data !== null) {
					// info.TableDrawing(res.data , curr);
					info.TableDrawings(res.data , 1);
				}
			},
			error: function(e) {

			}
		});
	},
	//表格会绘制
	TableDrawings: function(data , curr) {
		if (data.questions.length == 0){
			judge = false;
		}
		var Html = [];
		data.questions.forEach(function(item, index) {
			// data.list.forEach(function(item, index) {
			Html.push('<li class="sortableitem">');
			Html.push('<div class="topicFramework">');
			Html.push('<input type="text" class="qusetionId" value="' + item.questionId + '" hidden="hidden"/>');
			allQuestions.push(item.questionId);
			if (item.questionType == 1) {
				item.questionType = '单选题';
			} else {
				item.questionType = '多选题';
			}
			Html.push('<p class="num">' + (index + 1) + '. ' + item.questionType + '</p>');
			Html.push('<p class="distance">' + item.content + '</p>');
			item.optionInfo.forEach(function(items, index) {
				Html.push('<p class="distance">' + items.optionType + ' ' + items.content + '</p>');
			});
			Html.push('</div>');
			Html.push('<div class="functionBox">');
			Html.push('<button class="toView"><i class="layui-icon layui-icon-search"></i>查看解析</button>');
			Html.push('<button class="fraction"><img src="../../../imgs/f.png" alt="" />设定分值</button>');
			// Html.push('<button class="edit"><i class="layui-icon layui-icon-edit"></i>编辑</button>');
			Html.push('<button class="moveOut"><i class="layui-icon layui-icon-delete"></i>移出</button>');
			Html.push('<button class="moveup"><i class="layui-icon layui-icon-up"></i>上移</button>');
			Html.push('<button class="movedown"><i class="layui-icon layui-icon-down"></i>下移</button>');
			Html.push('<button class="joinIn"><i class="layui-icon layui-icon-add-circle"></i>加入试卷</button>');
			Html.push('<button class="removeQuestions"><i class="layui-icon layui-icon-delete"></i>移出试卷</button>');
			Html.push('</div>');
			Html.push('</li>');
		});
		$('.mobileFramework').html(Html.join(''));
		$('.joinIn').hide();
		$('.removeQuestions').hide();
		// 加入试卷
		$('.joinIn').off('click').on('click', function() {
			var QusetionId = $(this).parent().parent().find('.qusetionId').val();
			storageQusetionId.push(QusetionId);
			// 显示移出试卷
			$(this).parent().find('.removeQuestions').show();
			// 隐藏加入试卷
			$(this).parent().find('.joinIn').hide();
		});
		// 移出试卷
		$('.removeQuestions').off('click').on('click', function() {
			var QusetionId = $(this).parent().parent().find('.qusetionId').val();
			for (var i = 0; i < storageQusetionId.length; i++){
				if (QusetionId == storageQusetionId[i]){
					storageQusetionId.splice($.inArray(storageQusetionId[i],storageQusetionId),1);
					break;
				}
			}
			// 显示加入试卷
			$(this).parent().find('.joinIn').show();
			// 隐藏移出试卷
			$(this).parent().find('.removeQuestions').hide();
		});
		// 编辑
		// $('.edit').off('click').on('click', function() {
		// 	info.newTestPaper();
		// });
		// 解析
		$('.toView').off('click').on('click', function() {
			info.toViewAnalysis();
		});
		// 点击上移
		$('.moveup').off('click').on('click', function() {
			// 显示保存更改按钮
			$('#saveChanges').show();
		});
		// 点击移出，删除本身
		$('.moveOut').off('click').on('click', function() {
			// 删除this的父级的父级
			$(this).parent().parent().remove();
			var QusetionIdS = $(this).parent().parent().find('.qusetionId').val();
			for (var i = 0; i < storageResults.length; i++){
				if (QusetionIdS == storageResults[i]){
					storageResults.splice($.inArray(storageResults[i],storageResults),1);
					break;
				}
			}
			// 调用XXX方法
		});
		// 点击下移
		$('.movedown').off('click').on('click', function() {
			// 显示保存更改按钮
			$('#saveChanges').show();
		});
		// 点击保存更改
		$('#saveChanges').off('click').on('click', function() {
			// 隐藏保存更改按钮
			$('#saveChanges').hide();
		});
		// 分页
		if (data.total > 10){
			info.Page(data , curr);
		}
		
	},
	//表格数据请求
	TableDataRequest: function(curr) {
		$.ajax({
			// url: MCUrl + 'manage_system/paper/' + PaperId,
			url: MCUrl + 'manage_system/question/questions',
			data: {
				'pageNum': (curr || 1),
				'pageSize': 10,
				// 'questionType': 1,
				'content': $('.search').val()
			},
			dataType: 'json',
			Type: 'GET',
			success: function(res) {
				if (res || res.data !== null) {
					// info.TableDrawing(res.data , curr);
					info.TableDrawing(res.data , curr);
				}
			},
			error: function(e) {
	
			}
		});
	},
	//表格会绘制
	TableDrawing: function(data , curr) {
		var Html = [];
		// data.questions.forEach(function(item, index) {
			data.list.forEach(function(item, index) {
			Html.push('<li class="sortableitem">');
			Html.push('<div class="topicFramework">');
			Html.push('<input type="text" class="qusetionId" value="' + item.questionId + '" hidden="hidden"/>');
			allQuestions.push(item.questionId);
			if (item.questionType == 1) {
				item.questionType = '单选题';
			} else {
				item.questionType = '多选题';
			}
			Html.push('<p class="num">' + (index + 1) + '. ' + item.questionType + '</p>');
			Html.push('<p class="distance">' + item.content + '</p>');
			item.optionInfo.forEach(function(items, index) {
				Html.push('<p class="distance">' + items.optionType + ' ' + items.content + '</p>');
			});
			Html.push('</div>');
			Html.push('<div class="functionBox">');
			Html.push('<button class="toView"><i class="layui-icon layui-icon-search"></i>查看解析</button>');
			Html.push('<button class="joinIn"><i class="layui-icon layui-icon-add-circle"></i>加入试卷</button>');
			Html.push('<button class="removeQuestions"><i class="layui-icon layui-icon-delete"></i>移出试卷</button>');
			Html.push('</div>');
			Html.push('</li>');
		});
		$('.mobileFramework').html(Html.join(''));
		
		$('.removeQuestions').hide();
		// 加入试卷
		$('.joinIn').off('click').on('click', function() {
			var QusetionId = $(this).parent().parent().find('.qusetionId').val();
			storageQusetionId.push(QusetionId);
			// 显示移出试卷
			$(this).parent().find('.removeQuestions').show();
			// 隐藏加入试卷
			$(this).parent().find('.joinIn').hide();
		});
		// 移出试卷
		$('.removeQuestions').off('click').on('click', function() {
			var QusetionId = $(this).parent().parent().find('.qusetionId').val();
			for (var i = 0; i < storageQusetionId.length; i++){
				if (QusetionId == storageQusetionId[i]){
					storageQusetionId.splice($.inArray(storageQusetionId[i],storageQusetionId),1);
					break;
				}
			}
			// 显示加入试卷
			$(this).parent().find('.joinIn').show();
			// 隐藏移出试卷
			$(this).parent().find('.removeQuestions').hide();
		});
		// 编辑
		// $('.edit').off('click').on('click', function() {
		// 	info.newTestPaper();
		// });
		// 解析
		$('.toView').off('click').on('click', function() {
			info.toViewAnalysis();
		});
		// 点击上移
		$('.moveup').off('click').on('click', function() {
			// 显示保存更改按钮
			$('#saveChanges').show();
		});
		// 点击移出，删除本身
		$('.moveOut').off('click').on('click', function() {
			// 删除this的父级的父级
			$(this).parent().parent().remove();
			var QusetionIdS = $(this).parent().parent().find('.qusetionId').val();
			for (var i = 0; i < storageResults.length; i++){
				if (QusetionIdS == storageResults[i]){
					storageResults.splice($.inArray(storageResults[i],storageResults),1);
					break;
				}
			}
			// 调用XXX方法
		});
		// 点击下移
		$('.movedown').off('click').on('click', function() {
			// 显示保存更改按钮
			$('#saveChanges').show();
		});
		// 点击保存更改
		$('#saveChanges').off('click').on('click', function() {
			// 隐藏保存更改按钮
			$('#saveChanges').hide();
			if (judge != false){
				for(var i = 0; i < allQuestions.length; i++){
					info.deletes(allQuestions[i]);
				}
			}
			for(var i = 0; i < storageResults.length; i++){
				info.joinIn(storageResults[i]);
			}
			// 调用XXX方法
		});
		// 分页
		info.Page(data , curr);
	},
	// 加入试卷
	joinIn: function(questionId) {
		var data = {
			'paperId': PaperId,
			'questionId': questionId,
			'score': 66,
			'orderIndex': 1,
			'cTime': today,
			'cUser': 'mc'
		};
		$.ajax({
			url: MCUrl + 'manage_system/paper/question',
			data: JSON.stringify(data),
			dataType: 'json',
			type: 'POST',
			contentType: 'application/json;charset=utf-8',
			success(res) {
				console.log("操作成功");
				// parent.location.reload(); //刷新父级页面
			},
			error(e) {
				layer.msg("操作失败，请稍后再试");
			}
		});
	},
	// 删除关系
	deletes: function(questionId) {
		var data = {
			'paperId': PaperId,
			'questionId': questionId
		};
		$.ajax({
			url: MCUrl + 'manage_system/paper/question',
			data : data,
			dataType: 'json',
			type: 'DELETE',
			success(res) {
				console.log("操作成功");
			},
			error (e) {
				layer.msg("操作失败，请稍后再试");
			}
		});
	},
	// 分页
	Page: function(data , curr) {
		layui.use(['laypage', 'layer'], function() {
			var laypage = layui.laypage,
				layer = layui.layer;
			//完整功能
			laypage.render({
				elem: 'paging',
				count: data.total,
				// limit: 10,
				theme: '#279ef0',
				// curr: curr,
				// groups: '5',
				// layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
				layout: ['prev', 'page', 'next', 'count', 'skip'],
				jump: function(item, first) {
					if (!first) {
						info.TableDataRequest(item.curr);
					}
				}
			});
						'score': 0,
						'orderIndex': (i + 1),
						'cTime': today,
						'cUser': 'mc'
					};
					JPaperQuestion.push(data);
				}
				info.addOrRemoveRelationships();
			});
		}
	},
	// 修改试卷
	addOrRemoveRelationships: function() {
		sorting = [];
		for (var i = 1; i <= $('.sortableitem').length; i++){
			var data = {
				'paperId': PaperId,
				'questionId': $('.sortableitem:nth-child('+ [i] +') .topicFramework').attr('data-id'),
				'score': 0,
				'orderIndex': i,
				'cTime': today,
				'cUser': 'mc'
			};
			sorting.push(data);
		}
		if (JPaperQuestion.length == 0 && PaperQuestionPesult == 0 && questionScore.length == 0 && sorting.length == 0) {
			console.log("四个数组为空");
			return false;
		}
		if (PaperQuestionPesult == 0) {
			PaperQuestionPesult = [];
		}
		var data = {
			'JPaperQuestion': JSON.stringify(JPaperQuestion),
			'PaperQuestionPesult': JSON.stringify(PaperQuestionPesult),
			'questionScore': JSON.stringify(questionScore),
			'sorting': JSON.stringify(sorting)
		};
		$.ajax({
			url: MCUrl + 'manage_system/paper/paper/paper',
			data: data,
			dataType: 'json',
			type: 'POST',
			success(res) {
				console.log(res.msg);
				JPaperQuestion = [];
				PaperQuestionPesult = [];
				questionScore = [];
			}
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
	},
	// 分页
	Page: function(data, curr) {
		layui.use(['laypage', 'layer'], function() {
			var laypage = layui.laypage,
				layer = layui.layer;
			//完整功能
			laypage.render({
				elem: 'paging',
				count: data.total,
				// limit: 10,
				theme: '#279ef0',
				// curr: curr,
				// groups: '5',
				// layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
				layout: ['prev', 'page', 'next', 'count', 'skip'],
				jump: function(item, first) {
					if (!first) {
						info.TableDataRequest(item.curr);
					}
				}
			});
		});
	},
	// 设置分值方法
	fraction: function(QusetionId, newThis) {
		layui.use("layer", function() {
			var layer = layui.layer;
			layer.open({
				type: 1 ,//Page层类型
				area: ['789px', '210px'],
				title: ['设置分值',
						'background-color: #279ef0;text-align: center;font-size: 16px;line-height: 43px;color:white;letter-spacing: 5px;padding: 0px;'
					],
					closeBtn: 0,
				content: '<div class="inputLocation">' +
					'<div class="input-box">' +
					' <label class="layui-form-label">设置分值</label>' +
					'<input type="text" autocomplete="off" id="nameOfExaminationPaper" class="layui-input">' +
					'<div>' +
					'<br />' +
					'<br />' +
					'<button type="button" class="layui-btn layui-btn-normal layui-btn-sm newTestPaperConfirm">确认</button>'
					// + '<button type="button" class="layui-btn layui-btn-primary newTestPaperCancel">取消</button>'
					+
					'</div>'
			});
			// 点击确认
			$('.newTestPaperConfirm').click(function() {
				var score = $('#nameOfExaminationPaper').val();
				// 验证是否是数字
				var reg = /^\d+((\.\d+|\/[1-9]+))?$/;
				if (!reg.test(score) && score != '') {
					layer.msg('只能输入数字');
					return false;
				}
				if (score != '') {
					var data = {
						'paperId': PaperId,
						'questionId': QusetionId,
						'score': score
					}
					// 给对应的题赋分数
					$(newThis).parent().parent().find('.newScore').text("  " + score + "分");
					// 添加到数组
					questionScore.push(data);
				}
				// 关闭弹窗
				layer.closeAll();
			});
		});
	}
}
// 时间设置
var today = '';
$(document).ready(function() {
	var time = new Date();
	var day = ("0" + time.getDate()).slice(-2);
	var month = ("0" + (time.getMonth() + 1)).slice(-2);
	today = time.getFullYear() + "-" + (month) + "-" + (day);
});
