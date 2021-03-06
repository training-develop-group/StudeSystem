/**
 * @name: common
 * @author：MengXin
 */
var urlinfo = window.location.href;
var value = urlinfo.split("?")[1].split("value=")[1];
var PaperId = decodeURI(value);
var taskId = PaperId.split(',')[0];
var taskDegreeOfCompletion = '';
var taskType = '';
var getExperience = '';
var paperId = '';
var resId = '';
var setTimeInterval = '';
var taskName = '';
var endTime = new Date();
$(function() {
	
	//清空
	$('.textExperience').val('');
	// 记录字数
	var textNum = $('.textExperience').val().length;
	$('.textNum').text(textNum);
	// 点击返回
	info.goBack();
	$('.add').off('click').on('click', function() {
		info.addExperience();
	});

	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;
		// 公共头调用渲染
		All.getMenu({
			search: 2,
			type: 2,
			num: 3
		});
	});
	// setTimeInterval = setInterval(info.currentTime, 3000);
	// 查看任务信息
	$.ajax({
		url: Url + 'manage_system/task/' + taskId,
		data: {},
		dataType: 'json',
		type: 'GET',
		async: false,
		contentType: 'application/json;charset=utf-8',
		beforeSend: function(value){
			All.setToken(value);
		},
		success(res) {
			if (res.data != null) {
				//为任务描述赋值
				$('.taskRemarkContent').text(res.data.taskRemark);
				//记录心得分页页数
				getExperience++;
				//给任务类型赋值
				taskType = res.data.taskType;
				//试卷id
				paperId = res.data.paperId;
				//资源id
				resId = res.data.resId;
				//任务名
				taskName = res.data.taskName;
				//用户完成情况
				taskDegreeOfCompletion = res.data.status;

				endTime = res.data.endTime;
				//为任务名赋值
				$('.nav_title').text(res.data.taskName)
			} else {
				layer.msg('任务已删除')
			}
		},
	});
	// 用户判断
	// 管理员
	if (localStorage.getItem('userType') == 1) {
		$('.goBack').addClass('hidden')
		if (taskType == 1) {
			// 综合任务
			$('.common').removeClass('hidden');
			$('.measurement').removeClass('hidden');
			$('.measurement').addClass('test');
			info.administratorResEntirety();

			$('.test').off('click').on('click', function() {
				$('.content').addClass('hidden');
				//隐藏掉所有
				$('.video').addClass('hidden');
				$('.audio').addClass('hidden');
				$('.doc').addClass('hidden');
				$('.active').removeClass('active');
				$(this).addClass('active');
				info.getPaperList(paperId);
			});
			$('.study').off('click').on('click', function() {
				$('.active').removeClass('active');
				$(this).addClass('active');
				$('.content').addClass('hidden');
				$('.test_content').addClass('hidden');
				info.administratorResEntirety();
				$('.measurement').addClass('test');
			})
		} else if (taskType == 2) {
			// 学习任务
			$('.study').removeClass('hidden');
			info.administratorResEntirety();
			$('.experienceListBox').removeClass('hidden');
			info.getExperienceList(1, taskId);
			$('.addExperience').removeClass('hidden');
			$('.measurement').addClass('test');
			$('.add').off('click').on('click', function() {
				var thisTime = new Date();
				endTime =  Date.parse(endTime.replace(/-/g,"/"));
				if (thisTime > endTime) {
					layer.msg('任务已超时', {
						icon: 5,
						time: 2000 //2秒关闭（如果不配置，默认是3秒）
					}, function(){
						location.reload();
					});
				}else {
					info.addExperience();
					location.reload();
				}
			})
		} else if (taskType == 3) {
			// 测试任务
			$('.TotalScoreBox').addClass('hidden');
			$('.video').addClass('hidden');
			$('.audio').addClass('hidden');
			$('.doc').addClass('hidden');
			$('.content').addClass('hidden');
			info.getPaperList(paperId);
			$('.goBack').addClass('hidden');

		}
	} else {
		// 用户
		// 综合任务
		if (taskType == 1) {
			info.userResEntirety();
			$('.measurement').addClass('test');
			$('.test').off('click').on('click', function() {
				$('.TotalScoreBox').addClass('hidden');
				$('.video').addClass('hidden');
				$('.audio').addClass('hidden');
				$('.doc').addClass('hidden');
				$('.content').addClass('hidden');
				info.getPaperList(paperId);
				$('.goBack').addClass('hidden');

			});
			// 测试任务
			$('.measurement').removeClass('hidden');
			$('.active').removeClass('active');
			$('.measurement').addClass('active');
			$('.content').removeClass('hidden');
			//隐藏掉所有
			$('.goBack').addClass('hidden');
			$('.video').addClass('hidden');
			$('.audio').addClass('hidden');
			$('.doc').addClass('hidden');
			if (taskDegreeOfCompletion == 0) {
				layer.open({
					type: 1,
					skin: 'testStart',
					area: ['450px', '180px'],
					move: false,
					title: ['开始测试', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
					closeBtn: 0,
					content: "<p class=''>准备好了吗？考试期间无法退出</p><div class='btn-box'><button class='layui-btn layui-btn-sm layui-btn-normal ok'>准备好了</button><button class='layui-btn layui-btn-sm no'>还没有</button></div>",
					success: function(res) {
						$('.testStart .ok').off('click').on('click', function() {
							layer.close(layer.index);
							info.getList(taskId, taskType, paperId, resId);
						});
						$('.no').off('click').on('click', function() {
							layer.close(layer.index);
							if (localStorage.getItem('userType') == 1) {
								window.location.href = '../TaskPage/TaskPage.html'
							} else {
								window.location.href = '../UserHomePage/UserHomePage.html'
							}
						});
					}
				});81
			} else {
				info.getUserPaperList();
				$('.content').addClass('hidden');
				$('.goBack').removeClass('hidden');
				$('.goBack *').css('color', '#2ba0e3');
			}

		} else if (taskType == 2) {

			if (taskDegreeOfCompletion == 1) {
				$('.addExperience').addClass('hidden');
				$('.experienceListBox').removeClass('hidden');
				info.getExperienceList(1, taskId)
			} else {
				// 添加心得
				var thisTime = new Date();
				endTime =  Date.parse(endTime.replace(/-/g,"/"));
				if (thisTime > endTime) {
					layer.msg('任务已超时', {
						icon: 5,
						time: 1000 //1秒关闭（如果不配置，默认是3秒）
					});

					$('.addExperience').addClass('hidden');
					info.getExperienceList(1, taskId);
				} else {
					$('.addExperience').removeClass('hidden');
				}

			}
			info.userResEntirety();
		} else if (taskType == 3) {
			// 测试任务
			$('.measurement').removeClass('hidden');
			$('.active').removeClass('active');
			$('.measurement').addClass('active');
			$('.content').removeClass('hidden');
			//隐藏掉所有
			$('.goBack').addClass('hidden');
			$('.video').addClass('hidden');
			$('.audio').addClass('hidden');
			$('.doc').addClass('hidden');
			if (taskDegreeOfCompletion == 0) {
				layer.open({
					type: 1,
					skin: 'testStart',
					area: ['450px', '180px'],
					move: false,
					title: ['开始测试', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
					closeBtn: 0,
					content: "<p class=''>准备好了吗？考试期间无法退出</p><div class='btn-box'><button class='layui-btn layui-btn-sm layui-btn-normal ok'>准备好了</button><button class='layui-btn layui-btn-sm no'>还没有</button></div>",
					success: function(res) {
						$('.testStart .ok').off('click').on('click', function() {
							layer.close(layer.index);
							info.getList(taskId, taskType, paperId, resId);
						});
						$('.no').off('click').on('click', function() {
							layer.close(layer.index);
							if (localStorage.getItem('userType') == 1) {
								window.location.href = '../TaskPage/TaskPage.html'
							} else {
								window.location.href = '../UserHomePage/UserHomePage.html'
							}
						});
					}
				});
			} else {
				info.getUserPaperList();
				$('.content').addClass('hidden');
				$('.goBack').removeClass('hidden');
				$('.goBack *').css('color', '#2ba0e3');
			}
		}
		$('.study').off('click').on('click', function() {
			// 已完成不弹出
			if ($('.test').hasClass('active') && taskDegreeOfCompletion == 0) {
				layer.open({
					type: 1,
					skin: 'comeback',
					area: ['450px', '180px'],
					move: false,
					title: ['返回资源', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
					closeBtn: 0,
					content: "<p class=''>进入测试就不能回去啦！</p><div class='btn-box'><button class='layui-btn layui-btn-sm layui-btn-normal ok'>我知道了</button></div>",
					success: function(res) {
						$('.comeback .ok').off('click').on('click', function() {
							layer.close(layer.index);
						});
					}
				});
			}
		});
	}
});

var info = {
	//添加心得方法
	addExperience: function() {
		var textExperience = $('.textExperience').val();
		if (textExperience === '' || textExperience === null || textExperience === undefined) {
			layer.msg('心得为空不可提交');
		} else {
			// 这里替换了换行与回车
			var Experience = $('.textExperience').val();
			var data = {
				'taskId': taskId,
				'content': Experience
			};
			$.ajax({
				url: Url + 'manage_system/task/comment',
				data: JSON.stringify(data),
				dataType: 'json',
				type: 'POST',
				contentType: 'application/json;charset=utf-8',
				beforeSend: function(value){
					All.setToken(value);
				},
				success(res) {
					layer.msg('添加成功');
					getExperience++;
					// 清空
					$('.textExperience').val('');
					// 记录字数
					var textNum = $('.textExperience').val().length;
					$('.textNum').text(textNum);
					//第一次不显示
					if (getExperience > 0) {
						info.getExperienceList(1, taskId)
					}
					$('.addExperience').addClass('hidden');

				}
			})
		}
	},
	administratorResEntirety: function() {
		$.ajax({
			url: Url + 'manage_system/resource/' + resId,
			data: {},
			dataType: 'json',
			type: 'GET',
			contentType: 'application/json;charset=utf-8',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(resc) {
				if (resc.data != null) {
					var pdfPath = resc.data.path.substring(0, resc.data.path.lastIndexOf('.'));
					var extPath = resc.data.path.substring(resc.data.path.lastIndexOf('.'));
					var myVideo = $('#myVideo').attr('id');
					var myAudio = $("#myAudio").attr('id');
					if (resc.data.resType == 1) {
						$('.video').removeClass('hidden');
						$('.video video').attr('src', FileUrl + resc.data.path);
						$('.study').text('视频学习')
					} else if (resc.data.resType == 2) {
						$('.audio').removeClass('hidden');
						//音频地址赋值
						$('.audio audio').attr('src', FileUrl + resc.data.path);
						$('.study').text('音频学习')
					} else if (resc.data.resType == 3) {
						$('.doc').removeClass('hidden');
						if (extPath == '.txt' || extPath == '.pdf') {
							$('.doc iframe').attr('src', FileUrl + resc.data.path + '');
						} else {
							$('.doc iframe').attr('src', FileUrl + pdfPath + '.pdf');
						}
						$('.study').text('文档学习')
					} else if (resc.data.resType == 4) {
						//图片地址赋值
						$('.imageStudy').removeClass('hidden');
						$('.imageStudy img').attr('src', FileUrl + resc.data.path);
						$('.study').text('图片学习')
					}
					if (resc.data.resType != 3) {
						setTimeInterval = setInterval(info.currentTime, 30000);
					}

					info.getVideoPlaybackTime(resId, myVideo);

				}
			}
		})
	},
	beginTesting: function(resType) {
		if ($(this).hasClass('active')) {
			return false;
		}
		// 未完成
		if (taskDegreeOfCompletion == 0) {
			layer.open({
				type: 1,
				skin: 'testStart',
				area: ['450px', '180px'],
				move: false,
				title: ['开始测试', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
				closeBtn: 0,
				content: "<p class=''>准备好了吗？考试期间无法退出</p><div class='btn-box'><button class='layui-btn layui-btn-sm layui-btn-normal ok'>准备好了</button><button class='layui-btn layui-btn-sm no'>还没有</button></div>",
				success: function(res) {
					//暂停
					myVideo.pause();
					$('.testStart .ok').off('click').on('click', function() {
						$('.goBack').addClass('hidden');

						//隐藏掉所有
						$('.video').addClass('hidden');
						$('.audio').addClass('hidden');
						$('.doc').addClass('hidden');
						$('.active').removeClass('active');
						$('.test').addClass('active');
						$('.measurement').removeClass('test');
						layer.close(layer.index);
						$('.content').removeClass('hidden');
						info.getList(taskId, taskType, paperId, resId);
					});
					$('.no').off('click').on('click', function() {
						layer.close(layer.index);
						//开始
						myVideo.play();
					});
				}
			})
		} else {
			var $this = $(this);
			$('.active').removeClass('active');
			$this.addClass('active');
			$('.video').addClass('hidden');
			info.getUserPaperList();
			$('.study').off('click').on('click', function() {
				$('.nav_list li').removeClass('active');
				$(this).addClass('active');
				$('.test_content').addClass('hidden');

				if (resType == 1) {
					$('.video').removeClass('hidden');
				} else if (resType == 2) {
					$('.audio').removeClass('hidden');
				} else if (resType == 3) {
					$('.doc').removeClass('hidden');
				} else if (resType == 4) {
					$('.imageStudy').removeClass('hidden');
				}

			});
		}
	},
	userResEntirety: function() {
		$.ajax({
			//请求资源详情接口
			url: Url + 'manage_system/resource/' + resId,
			data: {},
			dataType: 'json',
			type: 'GET',
			contentType: 'application/json;charset=utf-8',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(resc) {
				if (resc.data != null) {
					var pdfPath = resc.data.path.substring(0, resc.data.path.lastIndexOf('.'));
					var extPath = resc.data.path.substring(resc.data.path.lastIndexOf('.'));
					var myVideo = document.getElementById('myVideo');
					var myAudio = document.getElementById('myAudio');
					// 视频
					if (taskType == 1) {
						$('.study').removeClass('hidden');
						$('.measurement').removeClass('hidden');
					} else if (taskType == 2) {
						$('.study').removeClass('hidden');
						$('.experienceListBox').removeClass('hidden')
					} else if (taskType == 3) {
						$('.measurement').removeClass('hidden');
					}

					if (resc.data.resType == 1) {

						$('.video').removeClass('hidden');
						$('.study').text('视频学习');
						$('.video video').attr('src', FileUrl + resc.data.path);
						info.getVideoPlaybackTime(resId, myVideo);
						myVideo.loop = false;
						// 是否看完
						myVideo.addEventListener('ended', function() {
							$('.measurement').addClass('test');
							$('.test').off('click').on('click', function() {
								info.beginTesting(resc.data.resType);
								$('.test').addClass('active');
							})
						}, false);

						//音频
					} else if (resc.data.resType == 2) {
						$('.audio').removeClass('hidden');
						//音频地址赋值
						$('.study').text('音频学习');
						$('.audio audio').attr('src', FileUrl + resc.data.path);
						info.getVideoPlaybackTime(resId, myAudio);
						myAudio.loop = false;
						myAudio.addEventListener('ended', function() {
							$('.measurement').addClass('test');
							$('.test').off('click').on('click', function() {
								info.beginTesting(resc.data.resType);

								$('.test').addClass('active');
							})
						}, false);
						//文档
					} else if (resc.data.resType == 3) {
						$('.doc').removeClass('hidden');
						// txt和pdf可以直接显示所以加一层判断
						$('.study').text('文档学习');
						if (extPath == '.txt' || extPath == '.pdf') {
							$('.doc iframe').attr('src', FileUrl + resc.data.path + '');
						} else {
							$('.doc iframe').attr('src', FileUrl + pdfPath + '.pdf');
						}
						$('.measurement').addClass('test');
						$('.test').off('click').on('click', function() {

							info.beginTesting(resc.data.resType);
							$('.test').addClass('active');
						})
					} else if (resc.data.resType == 4) {
						// 图片
						$('.imageStudy').removeClass('hidden');
						$('.imageStudy img').attr('src', FileUrl + resc.data.path);
						$('.study').text('图片学习');
						$('.test').off('click').on('click', function() {
							info.beginTesting(resc.data.resType);
							$('.test').addClass('active');
						})
					}
					if (resc.data.resType != 3) {
						setTimeInterval = setInterval(info.currentTime, 30000);
					}

				} else {
					layer.msg('资源已被删除')
				}
			}
		});
	},
	// 储存视频播放时长
	recordVideoPlaybackTime: function(resId, seconds) {
		$.ajax({
			url: Url + 'manage_system/resource/view',
			data: {
				'resId': resId,
				'seconds': Math.round(seconds)
			},
			beforeSend: function(value){
				All.setToken(value);
			},
			dataType: 'json',
			type: 'POST',
			success(res) {
				if (res.code == 1) {} else {}
			},
			error(e) {}
		});
	},
	// 获取视频时长并赋值
	getVideoPlaybackTime: function(resId, myVid) {
		$.ajax({
			url: Url + 'manage_system/resource/view',
			data: {
				'resId': resId
			},
			dataType: 'json',
			type: 'GET',
			async: false,
			// contentType: 'application/json;charset=utf-8',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(res) {
				if (res.code == 1) {
					myVid.currentTime = res.data;
				} else {
					myVid.currentTime = 0;
				}
			},
			error(e) {}
		});
	},
	//获取视频观看时间
	currentTime: function() {
		var myVideo = document.getElementById("myVideo"); //获取视频DOM元素
		var myAudio = document.getElementById("myAudio");
		var myVideoTime = myVideo.currentTime; //获取视频播放到的时间
		var myAudioTime = myAudio.currentTime; //获取视频播放到的时间
		// var myVid=document.getElementById("myVideo");
		// info.getVideoPlaybackTime(resId,myAudio)
		info.recordVideoPlaybackTime(resId, myAudioTime); //调用记录方法
		// info.getVideoPlaybackTime(resId,myVideo)
		info.recordVideoPlaybackTime(resId, myVideoTime); //调用记录方法
	},
	// 管理员获取试卷列表
	getPaperList: function(paperId) {
		$.ajax({
			url: Url + 'manage_system/paper/' + paperId,
			data: {},
			Type: 'GET',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(res) {
				if (res || res.data !== null) {
					var Html = [];
					//绘制页面
					Html.push('<ul class="layui-tab tabHead layui-tab-brief clearfix">');
					res.data.questionList.forEach(function(item, index) {
						Html.push('<li class="sortableitem">');
						Html.push('<div class="topicFramework clearfix">');
						Html.push('<input type="text" class="questionId" value="' + item.questionId + '" hidden="hidden"/>');
						if (item.questionType == 1) {
							item.questionType = "单选题";
						} else {
							item.questionType = "多选题";
						}
						Html.push('<p class="num">' + (index + 1) + '. ' + item.questionType + '<span>  ' + item.score +
							'分</span></p>');
						// 转义(已防有标签的样式被html识别)
						item.content = $('<div>').text(item.content).html();
						Html.push('<pre class="distance">' + item.content + '</pre>');
						item.optionInfo.forEach(function(items, index) {
							if (items.questionId == item.questionId) {
								// 转义(已防有标签的样式被html识别)
								items.content = $('<div>').text(items.content).html();
								Html.push('<div class="optionStyle clearfix distance"><span>' + items.optionType + '.</span><pre>' +
									items.content + '</pre></div>');
							}
						});
						Html.push('</div>');
						Html.push('<div class="functionBox">');
						Html.push('<button class="toView" value=' + item.questionId + '><img src="../imgs/stf.png" style="width: 30px">查看解析</button>');
						Html.push('</div>');
						Html.push('</li>');
					});
					Html.push('</ul>');
					$('.test_content').html(Html.join(''));
					$('.test_content').removeClass('hidden');
					$('.content').css('background-color', '#fff');
					// 调用点击返回事件
					info.goBack();
					// 解析
					$('.toView').off('click').on('click', function() {
						var QusetionId = $(this).val();
						// 解析内容
						var Analysis = '未定义';
						// 正确答案
						var OptionType = '未知';
						$.ajax({
							url: Url + 'manage_system/question/answer',
							beforeSend: function(value){
								All.setToken(value);
							},
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
								// 转义(已防有标签的样式被html识别)
								Analysis = $('<div>').text(Analysis).html();
								// 解析弹窗
								layui.use("layer", function() {
									var layer = layui.layer;
									layer.open({
										type: 1,
										closeBtn: 1,
										move: false,
										area: ['700px', '260px'],
										title: ['查看解析',
											'background-color: #279ef0;text-align: center;font-size: 20px;line-height: 43px;color:white;letter-spacing: 2px;padding: 0px;'
										],
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
			}
		})
	},
	//  接口 ,获取页面试题 ，做题页面
	getList: function(taskId, taskType, paperId, resId) {
		$.ajax({
			url: Url + 'manage_system/paper/' + paperId,
			data: {},
			Type: 'GET',
			beforeSend: function(value){
				All.setToken(value);
			},
			success: function(resb) {
				if (resb.data != null) {
					var answerSheet = [];
					var examContent = [];
					//绘制答题页面
					resb.data.questionList.forEach(function(item, index) {
						index++;
						if (index == 1) {
							answerSheet.push('<li class="active"  data-type="' + index + '">' + index + '</li>')
						} else {
							answerSheet.push('<li class="" data-id="' + item.questionId + '" data-type="' + index + '">' + index +
								'</li>')
						}
						if (index == 1) {
							examContent.push('<li class="questionCard" data-type="' + index + '">')
						} else {
							examContent.push('<li class="questionCard hidden" data-type="' + index + '">')
						}
						if (item.questionType == 1) {
							item.questionType = '单选题';
						} else {
							item.questionType = '多选题';
						}
						examContent.push(' <p class="questionCard_title"><span class="num">' + index +
							'.</span><span class="questuon_title" data-id="' + item.questionId + '">' + item.questionType +
							'</span>(<span class="fraction"> ' + item.score + '</span>分)</p>');
						// 转义(已防有标签的样式被html识别)
						item.content = $('<div>').text(item.content).html();
						examContent.push('<p class="question_Dry">' + item.content + '</p>');
						if (item.questionType == '单选题') {
							examContent.push('<ul class="radio_box textBox">')
						} else {
							examContent.push('<ul class="checkbox_box textBox">')
						}
						item.optionInfo.forEach(function(itemx, index) {
							// 转义(已防有标签的样式被html识别)
							itemx.content = $('<div>').text(itemx.content).html();
							examContent.push('<li class="clearfix"><span data-id="' + itemx.ref + '" class="option">' + itemx.optionType +
								'</span><pre class="optionStyle">' + itemx.content + '</pre></li>')
						});
						examContent.push('<input type="text" value="' + item.questionId + '" class="questionId hidden">');
						examContent.push('</ul>');
						examContent.push('<div class="btn-box clearfix">');
						examContent.push('<button class="layui-btn layui-btn-normal layui-btn-sm next">下一题</button>');
						examContent.push('<button class="layui-btn layui-btn-normal layui-btn-sm previous">上一题</button>');
						examContent.push('</div>')
					});

					examContent.push('</li>');
					$('.questionCard_box').html(examContent.join(''));
					$('.card').html(answerSheet.join(''));
					$('.card li').eq(0).click();
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
				} else {
					layer.msg('无效试卷');
					//返回 2秒后
					setTimeout(function() {
						if (localStorage.getItem('userType') == 1) {
							window.location.href = '../TaskPage/TaskPage.html'
						} else {
							window.location.href = '../UserHomePage/UserHomePage.html'
						}
					}, 2000);
				}
			},
			error: function(e) {

			}
		});
	},
	// 单选事件
	radioChange: function() {
		$('body').delegate('.questionCard .radio_box li', 'click', function() {
			$(this).parent('.radio_box').find('li').find('span').removeClass('active');
			// $('.questionCard .radio_box li span').removeClass('active');
			$(this).find('span').addClass('active');
		});
	},
	// 多选事件
	checkboxChange: function() {
		$('body').delegate('.questionCard .checkbox_box li', 'click', function() {
			if ($(this).find('span').hasClass('active')) {
				$(this).find('span').removeClass('active');
			} else {
				$(this).find('span').addClass('active');
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
		});
	},
	// 卡片切换
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
	// 交卷事件
	setList: function(resb) {
		//点击交卷事件
		$('.submitTest').off('click').on('click', function() {
			var newScore = 0;
			var sz = 0;
			var flag = true;
			var useranswerList = [];
			//获取所有多选
			$('.checkbox_box').each(function(index, item) {
				var answer = '';
				//获取所有选中的
				($('.checkbox_box').eq(index).find('li')).each(function(_index, _item) {
					var classOption = $(this).find(".option").attr('class');
					if (classOption == 'option active') {
						//进行拼
						answer += $(this).find(".active").text() + "|";
					}
				});
				if (answer == "") {
					flag = false;
				}
				// 获取id
				var questionId = $(this).parent('li').find('.questionCard_title').find('.questuon_title').attr('data-id')
				// var a = $(this).parent('li').attr('data-type')
				var data = {
					'questionId': questionId,
					'answer': answer
				};
				useranswerList.push(data);
			});
			// 获取单选
			$('.radio_box').each(function(index, item) {
				var answer = '';

				($('.radio_box').eq(index).find('li')).each(function(_index, _item) {
					var classOption = $(this).find(".option").attr('class');
					if (classOption == 'option active') {
						answer += $(this).find(".active").text() + "|";
					}
				});
				if (answer == "") {
					flag = false;
				}
				var questionId = $(this).parent('li').find('.questionCard_title').find('.questuon_title').attr('data-id')
				// var a = $(this).parent('li').attr('data-type')
				var data = {
					'questionId': questionId,
					'answer': answer

				};
				useranswerList.push(data);
			});
			var data = {
				'paperId': resb.data.paperId,
				'taskId': taskId,
				'jUserQuesAnswerRecord': JSON.stringify(useranswerList)
			};
			if (flag) {
				layui.use("layer", function() {
					var layer = layui.layer;
					layer.open({
						type: 1,
						closeBtn: 1,
						area: ['400px', '200px'],
						move: false,
						title: ['', 'background-color: #279ef0'],
						content: '<div class="confirmRelease">是否交卷?</div>' +
							'<div class="CR-btn-box">' +
							'<button type="button" class="layui-btn layui-btn-normal layui-btn-sm CR-btnConfirm">确认</button>' +
							'<button type="button" class="layui-btn layui-btn-primary layui-btn-sm CR-btnCancel">取消</button>' +
							'</div>',
						success: function() {}
					});
				})
			} else {
				layui.use("layer", function() {
					var layer = layui.layer;
					layer.open({
						type: 1,
						move: false,
						closeBtn: 1,
						area: ['400px', '200px'],
						title: ['', 'background-color: #279ef0'],
						content: '<div class="noConfirmRelease">你有题目没答 是否交卷?</div>' +
							'<div class="CR-btn-box">' +
							'<button type="button" class="layui-btn layui-btn-normal layui-btn-sm CR-btnConfirm">确认</button>' +
							'<button type="button" class="layui-btn layui-btn-primary layui-btn-sm CR-btnCancel">取消</button>' +
							'</div>'
					});
				})
			}
			// 点击确认
			$('.CR-btnConfirm').click(function() {
				layer.closeAll();
				$.ajax({
					url: Url + 'manage_system/paper/answers',
					data: data,
					dataType: 'json',
					type: 'POST',
					beforeSend: function(value){
						All.setToken(value);
					},
					success(res) {
						if (res || res.data !== null) {
							$('.TotalScoreBox .TotalScore').html('总得分：' + res.data.userScore);
							$('.TotalScoreBox .TaskScore').html('总分：' + res.data.score);
							var Html = [];
							Html.push('<div class="editorialContent">');
							Html.push('<div id="title">');
							Html.push('<div id="centered">');
							Html.push('<span>查看答案</span>');
							Html.push(
								'<a href="#" class="goBack" style="float: right; margin-right:20px"><i class="layui-icon">&#xe602;</i><span style="margin-left : 0px;">返回</span> </a>'
							);
							Html.push('<span style="float: right; margin-right:20px">得分:' + res.data.userScore + '</span>');
							Html.push('</div>');
							Html.push('</div>');
							Html.push('<ul class="layui-tab tabHead layui-tab-brief clearfix">');
							res.data.questionList.forEach(function(item, index) {
								Html.push('<li class="sortableitem" style = "background-color: #fff;">');
								Html.push('<div class="topicFramework" style="text-align: left;line-height: 1;">');
								Html.push('<input type="text" class="qusetionId" value="' + item.questionId +
									'" hidden="hidden"/>');
								if (item.questionType == 1) {
									item.questionType = '单选题';
								} else {
									item.questionType = '多选题';
								}
								Html.push('<p class="num"><span data-id="' + item.questionId + '">' + (index + 1) + '</span>. ' +
									item.questionType + '</p>');
								// 转义(已防有标签的样式被html识别)
								item.content = $('<div>').text(item.content).html();
								Html.push('<pre class="distance">' + item.content + '</pre>');
								item.optionInfo.forEach(function(items, index) {
									var record = 0;
									var a = item.userAnswer.split('|');
									a.forEach(function(iazz, asd) {
										if (items.optionType == iazz) {
											// 转义(已防有标签的样式被html识别)
											items.content = $('<div>').text(items.content).html();
											Html.push('<div class="distance clearfix option"><span class="circular">' + items.optionType +
												'</span><pre class="optionStyle">' + items.content + '</pre></div>');
											record++;
											return false;
										}
									});
									if (record == 0) {
										// 转义(已防有标签的样式被html识别)
										items.content = $('<div>').text(items.content).html();
										Html.push('<div class="distance option clearfix"><span class="optionNum">' + items.optionType +
											'.</span><pre class="optionStyle">' + items.content + '</pre></div>');
									}
								});
								Html.push('<div class="functionBox">');
								Html.push('<button class="toView" value="' + item.questionId +
									'"><img src="../imgs/stf.png" style="width: 30px">查看解析</button>');
								Html.push('</div>');
								Html.push('</div>');
								Html.push('</li>')
							});
							Html.push('</ul></div>');
							$('.wrapper').html(Html.join(''));
							$('.goBack *').css('color', '#fff');
							// 调用点击返回事件
							info.goBack();
							$('.content').css('background-color', '#fff');
							// 解析
							$('body').css('padding', '0');
							$('.toView').off('click').on('click', function() {
								var QusetionId = $(this).val();
								// 解析内容
								var Analysis = '';
								// 正确答案
								var OptionType = '';
								$.ajax({
									url: Url + 'manage_system/question/answer',
									data: {
										'questionId': QusetionId
									},
									dataType: 'json',
									type: 'GET',
									beforeSend: function(value){
										All.setToken(value);
									},
									success(res) {
										res.data.forEach(function(item, index) {
											if (OptionType == '') {
												OptionType = item.optionType;
											} else {
												OptionType = OptionType + ',' + item.optionType;
											}
											Analysis = item.analysis;
										});
										// 转义(已防有标签的样式被html识别)
										Analysis = $('<div>').text(Analysis).html();
										layui.use("layer", function() {
											var layer = layui.layer;
											layer.open({
												type: 1, //Page层类型
												closeBtn: 1,
												move: false,
												area: ['660px', '300px'],
												title: ['查看解析',
													'background-color: #279ef0;text-align: center;font-size: 20px;line-height: 43px;color:white;padding: 0px;'
												],
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
					error: function(e) {}
				});
			});
			// 点击取消
			$('.CR-btnCancel').click(function() {
				layer.closeAll();
			});
		});
	},
	// 用户获取试卷列表(已答完)
	getUserPaperList: function() {
		$.ajax({
			url: Url + 'manage_system/paper/question-answer',
			data: {
				'taskId': taskId,
				'paperId': paperId
			},
			dataType: 'json',
			type: 'GET',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(res) {
				if (res.data != null) {
					var Html = [];
					$('.TotalScoreBox .TotalScore').html('总得分：' + res.data.userScore);
					$('.TotalScoreBox .TaskScore').html('总分：' + res.data.score);
					Html.push('<ul class="layui-tab tabHead layui-tab-brief clearfix">');
					res.data.questionList.forEach(function(item, index) {
						Html.push('<li class="sortableitem">');
						Html.push('<div class="topicFramework">');
						Html.push('<input type="text" class="questionId" value="' + item.questionId + '" hidden="hidden"/>');
						if (item.questionType == 1) {
							item.questionType = "单选题";
						} else {
							item.questionType = "多选题";
						}
						// var newScore = res.data.questions[0].newScoreList[index].score;
						Html.push('<p class="num">' + (index + 1) + '. ' + item.questionType + '<span>  ' + item.score +
							'分</span></p>');
						// 转义(已防有标签的样式被html识别)
						item.content = $('<div>').text(item.content).html();
						Html.push('<pre class="distance">' + item.content + '</pre>');
						item.optionInfo.forEach(function(items, index) {
							var record = 0;
							if (item.userAnswer != null) {
								var a = item.userAnswer.split('|');
								a.forEach(function(iazz, asd) {
									if (items.optionType == iazz) {
										// 转义(已防有标签的样式被html识别)
										items.content = $('<div>').text(items.content).html();
										Html.push('<div class="distance clearfix option"><span class="circular">' + items.optionType +
											'</span><pre class="optionStyle">' + items.content + '</pre></div>');
										record++;
										return false;
									}
								});
							}
							if (record == 0) {
								// 转义(已防有标签的样式被html识别)
								items.content = $('<div>').text(items.content).html();
								Html.push('<div class="distance option clearfix"><span class="optionNum">' + items.optionType +
									'</span><pre class="optionStyle">' + items.content + '</pre></div>');
							}
						});
						Html.push('</div>');
						Html.push('<div class="functionBox">');
						Html.push('<button class="toView" value=' + item.questionId + '><img src="../imgs/stf.png" style="width: 30px">查看解析</button>');
						Html.push('</div>');
						Html.push('</li>');
					});
					Html.push('</ul>');

					$('.test_content').removeClass('hidden');


					$('.test_content').html(Html.join(''));
					// $('.goBack *').css('color', '#fff');
					// $('.content').css('background-color', '#fff');
					// 返回事件调用
					info.goBack();
					// 解析
					$('body').css('padding', '0');
					// 查看解析
					$('.toView').off('click').on('click', function() {
						var QusetionId = $(this).val();
						// 解析内容
						var Analysis = '';
						// 正确答案
						var OptionType = '';
						$.ajax({
							url: Url + 'manage_system/question/answer',
							data: {
								'questionId': QusetionId
							},
							dataType: 'json',
							type: 'GET',
							beforeSend: function(value){
								All.setToken(value);
							},
							success(res) {
								res.data.forEach(function(item, index) {
									if (OptionType == '') {
										OptionType = item.optionType;
									} else {
										OptionType = OptionType + ',' + item.optionType;
									}
									Analysis = item.analysis;
								});
								// 转义(已防有标签的样式被html识别)
								Analysis = $('<div>').text(Analysis).html();
								layui.use("layer", function() {
									var layer = layui.layer;
									layer.open({
										type: 1, //Page层类型
										closeBtn: 1,
										move: false,
										area: ['660px', '300px'],
										title: ['查看解析',
											'background-color: #279ef0;text-align: center;font-size: 20px;line-height: 43px;color:white;padding: 0px;'
										],
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
			}
		})
	},
	// 查询心得
	getExperienceList: function(pageNum, taskId) {
		$.ajax({
			url: Url + 'manage_system/task/comments',
			data: {
				'taskId': taskId,
				'pageNum': pageNum,
				'pageSize': 10
			},
			dataType: 'json',
			type: 'GET',
			contentType: 'application/json;charset=utf-8',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(resc) {
				var html = [];
				resc.data.list.forEach(function(item, index) {
					html.push('<li class="List">');
					html.push('<p class="uName">' + item.userName + '</p>');
					item.content = $('<div>').text(item.content).html();
					html.push('<pre>' + item.content + '</pre>');
					html.push('<p class="time"><span>' + dateFormata(item.cTime) + '</span><span></span></p>');
					html.push('</li>');
				});
				$('.experienceList').html(html.join(''));
				$('.textExperience').keyup(function() {
					var textNum = $('.textExperience').val().length;
					$('.textNum').text(textNum);
				});

				info.Page(resc.data.total, resc.data.pageNum, taskId);
				info.textNum();
			}
		});
	},
	// 分页插件
	Page: function(total, curr, taskId) {
		if (total < 10) {
			return false;
		}
		layui.use('laypage', function() {
			var laypage = layui.laypage;
			//执行一个laypage实例
			laypage.render({
				elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
				count: total, //数据总数，从服务端得
				limit: '10',
				theme: '#1E9FFF',
				curr: curr,
				groups: '5',
				layout: ['prev', 'page', 'next', 'limits', 'skip'],
				jump: function(item, first) {
					if (!first) {
						info.getExperienceList(item.curr, taskId)
					}
				}
			});

		})
	},
	NoProgressBar: function() {
		// var myAudio = document.getElementById("myAudio"); //获取视频DOM
		// var myVideo = document.getElementById("myVideo"); //获取音频DOM
		// var nowTime = myAudio.currentTime; //获取视频当前播放时间
		// var newTime = myVideo.currentTime; //获取音频当前播放时间
		// var timeInterval = nowTime - lastTime; //用当前时间减去1秒之前的时间
		// if (timeInterval > 0.1) { //判断相差时间是否超过一秒
		// 	myVideo.pause();
		// 	myVideo.currentTime = lastTime; //返回之前的视频播放时间
		// }
		// if (timeInterval > 0.1) { //判断相差时间是否超过一秒
		// 	myAudio.pause();
		// 	myAudio.currentTime = lastTime; //返回之前的视频播放时间
		// }
		// lastTime = nowTime; //播放时间中转（全局变量）
	},
	goBack: function() {
		$('.goBack').off('click').on('click', function() {
			if (localStorage.getItem('userType') == 1) {
				window.location.href = '../TaskPage/TaskPage.html'
			} else {
				window.location.href = '../UserHomePage/UserHomePage.html'
			}
		});
	},
	// 获取心得字数
	textNum: function() {
		$('.textExperience').keyup(function() {
			var textNum = $('.textExperience').val().length;
			$('.textNum').text(textNum);
		})
	},
};
var dateFormata = function(time) {
	var date = new Date(time);
	var year = date.getFullYear();
	/* 在日期格式中，月份是从0开始的，因此要加0
	 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
	 * */
	var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	// 拼接
	return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
};
