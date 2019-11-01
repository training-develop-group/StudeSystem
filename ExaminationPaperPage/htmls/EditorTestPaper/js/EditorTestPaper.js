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

// 添加
var JPaperQuestion = [];
// 删除
var PaperQuestionPesult = [];


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
		} else {
			$('#newTestPaper').attr('disabled', true);
			$('#newTestPaper').css('background-color', '#AAAAAA');
			$('#newTestPaper').css('cursor', 'not-allowed');
		}
		var Html = [];
		data.questions.forEach(function(item, index) {
			// data.list.forEach(function(item, index) {
			Html.push('<li class="sortableitem">');
			Html.push('<div class="topicFramework">');
			Html.push('<input type="text" class="qusetionId" value="' + item.questionId + '" hidden="hidden"/>');
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
		// 解析
		$('.toView').off('click').on('click', function() {
			var QusetionId = $(this).parent().parent().find('.qusetionId').val();
			info.toViewAnalysis(QusetionId);
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
			// for (var i = 0; i < allQuestions.length; i++){
			// 	if (QusetionIdS == allQuestions[i]){
			// 		allQuestions.splice($.inArray(allQuestions[i],allQuestions),1);
			// 		break;
			// 	}
			// }
			allQuestions.push(QusetionIdS);
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
			if (judge != false){
				for(var i = 0; i < allQuestions.length; i++){
					// info.deletes(allQuestions[i]);
					var data = {
						'paperId': PaperId,
						'questionId': allQuestions[i]
					};
				}
				PaperQuestionPesult.push(data);
			}
			for(var i = 0; i < storageResults.length; i++){
				// info.joinIn(storageResults[i]);
				var data = {
					'paperId': PaperId,
					'questionId': storageResults[i],
					'score': 66,
					'orderIndex': 1,
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
		// 解析
		$('.toView').off('click').on('click', function() {
			var QusetionId = $(this).parent().parent().find('.qusetionId').val();
			info.toViewAnalysis(QusetionId);
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
			if (judge != false){
				for(var i = 0; i < allQuestions.length; i++){
					// info.deletes(allQuestions[i]);
					var data = {
						'paperId': PaperId,
						'questionId': allQuestions[i]
					};
				}
				PaperQuestionPesult.push(data);
			}
			for(var i = 0; i < storageResults.length; i++){
				// info.joinIn(storageResults[i]);
				var data = {
					'paperId': PaperId,
					'questionId': storageResults[i],
					'score': 66,
					'orderIndex': 1,
					'cTime': today,
					'cUser': 'mc'
				};
				JPaperQuestion.push(data);
			}
			info.addOrRemoveRelationships();
		});
	},
	viewQuestion: function(questionId){
		if (questionId == undefined){
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
	viewQuestions: function(data){
		viewChack++;
		data.forEach(function(item, index) {
			viewHtml.push('<li class="sortableitem">');
			viewHtml.push('<div class="topicFramework">');
			viewHtml.push('<input type="text" class="qusetionId" value="' + item.questionId + '" hidden="hidden"/>');
			if (item.questionType == 1) {
				item.questionType = '单选题';
			} else {
				item.questionType = '多选题';
			}
			viewHtml.push('<p class="num">' + (index + 1) + '. ' + item.questionType + '</p>');
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
			viewHtml.push('<button class="joinIn"><i class="layui-icon layui-icon-add-circle"></i>加入试卷</button>');
			viewHtml.push('<button class="removeQuestions"><i class="layui-icon layui-icon-delete"></i>移出试卷</button>');
			viewHtml.push('</div>');
			viewHtml.push('</li>');
		});
		// 判断是否是最后一次的调用，如果是最后一次就往页面里塞入数据
		if (storageQusetionId.length == viewChack){
			$('.mobileFramework').html(viewHtml.join(''));
			
			$('.joinIn').hide();
			$('.removeQuestions').hide();
			Array.prototype.push.apply(storageResults , storageQusetionId);
			// 清空数组
			storageQusetionId = [];
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
			$('#newTestPaper').attr('disabled', true);
			$('#newTestPaper').css('background-color', '#AAAAAA');
			$('#newTestPaper').css('cursor', 'not-allowed');
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
				$('#saveChanges').show();
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
			// 解析
			$('.toView').off('click').on('click', function() {
				var QusetionId = $(this).parent().parent().find('.qusetionId').val();
				info.toViewAnalysis(QusetionId);
			});
			// 点击保存更改
			$('#saveChanges').off('click').on('click', function() {
				// 隐藏保存更改按钮
				$('#saveChanges').hide();
				if (judge != false){
					for(var i = 0; i < allQuestions.length; i++){
						// info.deletes(allQuestions[i]);
						var data = {
							'paperId': PaperId,
							'questionId': allQuestions[i]
						};
					}
					PaperQuestionPesult.push(data);
				}
				for(var i = 0; i < storageResults.length; i++){
					// info.joinIn(storageResults[i]);
					var data = {
						'paperId': PaperId,
						'questionId': storageResults[i],
						'score': 66,
						'orderIndex': 1,
						'cTime': today,
						'cUser': 'mc'
					};
					JPaperQuestion.push(data);
				}
				info.addOrRemoveRelationships();
			});
		}
	},
	// // 加入试卷
	// joinIn: function(questionId) {
	// 	var data = {
	// 		'paperId': PaperId,
	// 		'questionId': questionId,
	// 		'score': 66,
	// 		'orderIndex': 1,
	// 		'cTime': today,
	// 		'cUser': 'mc'
	// 	};
	// },
	// // 删除关系
	// deletes: function(questionId) {
	// 	console.log(2);
	// 	var data = {
	// 		'paperId': PaperId,
	// 		'questionId': questionId
	// 	};
	// 	$.ajax({
	// 		url: MCUrl + 'manage_system/paper/question',
	// 		data : data,
	// 		dataType: 'json',
	// 		type: 'DELETE',
	// 		success(res) {
	// 			console.log("操作成功");
	// 		},
	// 		error (e) {
	// 			layer.msg("操作失败，请稍后再试");
	// 		}
	// 	});
	// },
	// 修改试卷
	addOrRemoveRelationships: function(){
		console.log(JPaperQuestion);
		console.log(PaperQuestionPesult);
		var data = {
			'JPaperQuestion': JSON.stringify(JPaperQuestion),
			'PaperQuestionPesult': JSON.stringify(PaperQuestionPesult)
		};
		$.ajax({
			url: MCUrl + 'manage_system/paper/paper/paper',
			data: data,
			dataType: 'json',
			type: 'POST',
			success(res) {
				console.log(res);
				JPaperQuestion = [];
				PaperQuestionPesult = [];
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
		});
	},
	
}
// 时间设置
var today = '';
$(document).ready(function() {
	var time = new Date();
	var day = ("0" + time.getDate()).slice(-2);
	var month = ("0" + (time.getMonth() + 1)).slice(-2);
	today = time.getFullYear() + "-" + (month) + "-" + (day);
});
