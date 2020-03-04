$(function() {
	
	layui.use(['layer', 'form', 'laypage', 'laydate'], function() {
		var layer = layui.layer,
			form = layui.form;
		var laypage = layui.laypage,
			layer = layui.layer;

		//选择任务人员全选反选-------------------------------------------------------------------------
		form.on('checkbox(Staff)', function(data) {
			var a = data.elem.checked;
			if (a == true) {
				$(".checkAll").prop("checked", true);
				form.render('checkbox');
			} else {
				$(".checkAll").prop("checked", false);
				form.render('checkbox');
			}
		});
		form.on('checkbox(c_one)', function(data) {
			var item = $(".checkAll");
			for (var i = 0; i < item.length; i++) {
				if (item[i].checked == false) {
					$("#checkAll").prop("checked", false);
					form.render('checkbox');
					break;
				}
			}
			//如果都勾选了  勾上全选
			var all = item.length;
			for (var i = 0; i < item.length; i++) {
				if (item[i].checked == true) {
					all--;
				}
			}
			if (all == 0) {
				$("#checkAll").prop("checked", true);
				form.render('checkbox');
			}
		
		})
		//选择任务人员全选反选-------------------------------------------------------------------------


		
		//layui 日期渲染--------------------------------------------------------------------------------------
		laydate = layui.laydate;
		//执行一个laydate实例
		laydate.render({
			elem: '#test1', //指定元素,
			theme: '#40AFFE',
			type: 'datetime',
			
		});
		laydate.render({
			elem: '#test2', //指定元素,
			theme: '#40AFFE',
			type: 'datetime',
		});
		//layui 日期渲染--------------------------------------------------------------------------------------
		
		
		//根据选择的任务类型来显示或隐藏--------------------------------------------------------------------
		//新加 清空操作
		// form.on('select(fangxiang)', function(data) {
		// 	var value = data.value;
		// 	if (value == '1') {
		// 		$('.selectPapers').show();
		// 		$('.selectResource').show();
		// 		$('.resAdd').text('');
		// 		$('.paperAdd').text('');
		// 	} else if (value == '2') {
		// 		$('.selectResource').show();
		// 		$('.selectPapers').hide();
		// 		$('.resAdd').text('');
		// 		$('.paperAdd').text('');
		// 	} else if (value == '3') {
		// 		$('.selectPapers').show();
		// 		$('.selectResource').hide();
		// 		$('.resAdd').text('');
		// 		$('.paperAdd').text('');
		// 	}
		// })
		// form.render('select');
		// form.render('checkbox');
		//根据选择的任务类型来显示或隐藏--------------------------------------------------------------------


		//调用common.js的公共方法
		All.getMenu({
			num: 2
		});

		
		// info.docx();

		//调用音频弹出层方法
		// info.viewByAudioFileName();

		// info.getVideoPlaybackTime();

		info.selectResourceList(1); //查看

		info.uploadPopup(); //上传文件

		// 调用文档弹出层
		// info.viewByTextFileName();
		
		/**
		 * 检索关键词resName
		 * 用回车检索
		 */
		$('.search').keypress(function(e) {
			if (e.which == 13) {
				var searchKey = $('.search').val()
				info.selectResourceList(1,searchKey)
			}
		});
	});
});

var total = '';
var JumpPageNum = 1; //全局变量分页页数初始值
var resId = '';
var info = {
	//获取资源列表
	selectResourceList: function(pageNum, resName, resType) {
		// console.log(resName);
		$.ajax({
			url: TDXUrl + 'manage_system/resource/resources',
			data: {
				'pageNum': pageNum,
				'pageSize': 12,
				'resName': resName,
				'resType': resType
			},
			dataType: 'json',
			type: 'GET',
			// contentType: 'application/json;charset=utf-8',
			success(res) {
				var html = [];
				if (res.code == 1) {
					res.data.list.forEach(function(item) {
						// console.log(item.resId);
						// console.log(res);
						// console.log(res.data);
						html.push('<tr>');
						html.push('<td><a href="#" class="getResource" resId="' + item.resId + '">' + item.resName + '</a></td>');
						html.push('<td class="centerText">' + '未发布' + '</td>');
						if (item.resType == 1) { //判断资源类型
							item.resType = '视频'
						} else if (item.resType == 2) {
							item.resType = '音频'
						} else if (item.resType == 3) {
							item.resType = '文档'
						} else {
							item.resType = '未知'
						}
						html.push('<td class="centerText">' + item.resType + '</td>');
						html.push('<td class="centerText">' + info.getFileSize(item.resSize) + '</td>');
						html.push('<td><button class="editResName" resId="' + item.resId + '" resName="' + item.resName +
							'">编辑</button><button class="release" resName="' + item.resName + '" resId="' + item.resId + '">发布</button><button class="deleteList" resId="' + item.resId +
							'">删除</button></td>');
						html.push('</tr>');
					})
					$('#contentList').html(html.join(''));

					// console.log(res)
					total = res.data.total; //分页总数量
					JumpPageNum = res.data.pageNum; //下一页复制为了时删除或者修改完事后停留在原本的页数

					info.Pagination(total, pageNum); //调用分页方法（总条数，页数）
					
					

					//获取资源详情
					$('.getResource').off('click').on('click', function() {
						var resId = $(this).attr("resId");
						info.getResource(resId);

					});


					//编辑资源名
					$('.editResName').off('click').on('click', function() {
						var resId = $(this).attr("resId"); //点击后获取获取到按钮属性
						var resName = $(this).attr("resName");
						$('.rename').val(resName); //编辑资源名返回值
						info.updatePopup(resId); //调用修改弹出层传参（resId）

					});





//-------------------------------------------------------------------------------------------------------------------------------------------------




					//发布弹窗
					$('.release').off('click').on('click', function() {
						
						//查询任务类型
						var Html = [];
						Html.push('<option value="2">学习任务</option>');
						$('#taskType').html(Html.join(''));
						
						
						info.selectAllUser('') //查询所有用户
						
						info.openAddRolePage();	//发布任务弹窗
						resId = $(this).attr("resId");	//给全局变量赋值
						var Html = [];
						var resName = $(this).attr("resName");
						Html.push(' : ' + resName)
						$('.resAdd').html(Html.join(''));
						
					});
					
					//资源单选--------------------------------------------------------------------------------------------
					// $('.resourceSelection').click(function() {
					// 	var resId = $('input:radio:checked').siblings('.resName').text();
					// 	var Html = [];
					// 	Html.push(' : ' + resId)
					// 	$('.resAdd').html(Html.join(''))
					// 	layer.close(layer.index);
					// })
					//资源单选--------------------------------------------------------------------------------------------
					
					// // 选择资源
					// $('.selectResource').click(function() {
					// 	info.taskSelectResourceList(1);
					// 	info.selectResources();
					// });
					
					//查找资源类型----------------------------------------
					$('.selectRes').click(function() {
						info.taskSelectResourceList($(this).val())
					});
					//查找资源类型----------------------------------------

					
					
					//弹出选择人员
					$('.selectPersonnel').click(function() {
						layer.open({
							type: 1,
							title: ['选择人员','color:#fff;background-color:#40AFFE;;border-radius: 7px ; text-align: center;font-size:20px'],
							shadeClose: true,
							skin: 'myskin',
							area: ['600px', '450px'],
							content: $('#selectPersonnel'),
							success: function() {
					
							}
						});
					});
					
					
					//选择人员确认按钮点击事件-------------------------------------------------------------------------------------
					$('.usersSelectOk').click(function() {
						var Html = [];
						$.each($("[name='Staff']:checked"), function(i, val) {
							Html.push('<p >' + $(this).siblings('i').text() + '<input type="text"  hidden="" id="" value="' + $(this).val() +
								'" />  <i  data-id="' + $(this).val() +
								'" class="layui-icon layui-icon-close deleteUserName" style="font-size: 20px; margin-left:150px 	"></i></p>'
							)
						})
						$('.taskUsers').html(Html.join(''));
					
						//新，
						//点击× 进行处理
						$('.deleteUserName').click(function() {
							$(this).parents('p').remove();
							var userId = $(this).attr('data-id');
							console.log(userId)
							$.each($("[name='Staff']:checked"), function(i, val) {
								if (val.value == userId) {
									$("#checkAll").prop("checked", false);
									$(this).prop("checked", false);
									layui.use('form', function() {
										var form = layui.form;
										form.render('');
									});
								}
							})
						})
						layer.close(layer.index);
					})
					//选择人员确认按钮点击事件-------------------------------------------------------------------------------------
					
					
					//用户模糊查询 回车
					$(".userNameRetrieval").keypress(function(e) {
						if (e.which == 13) {
							var userNameRetrieval = $('.userNameRetrieval').val()
							info.selectAllUser(userNameRetrieval);
						}
					});
					
					
					//添加任务
					$('.addOk').click(function() {
						info.addTask();
					
					});
					



//-------------------------------------------------------------------------------------------------------------------------------------------------





					//删除资源
					$('.deleteList').off('click').on('click', function() {
						var resId = $(this).attr("resId");
						//调用common.js公共
						All.layuiOpen({
							num: 1,
							resId: resId,
							msg: '是否删除资源？'
						});
					});
					
				} else {
					layer.msg('获取资源列表操作失败');
				}
			},
			error(e) {
				layer.msg('获取资源列表错误')
			}
		});
	},


	//分页
	Pagination: function(total, pageNum) {
		//执行一个laypage实例
		layui.use('laypage', function() {
			var laypage = layui.laypage
			laypage.render({
				elem: 'page',
				count: total,
				limit: '12',
				theme: '#1E9FFF',
				curr: pageNum,
				group: '5',
				layout: ['prev', 'page', 'next', 'limits', 'skip'],
				jump: function(item, first) {
					if (!first) {
						// console.log(item);
						info.selectResourceList(item.curr); //下一页
					}
				}
			});
		})
	},



	//获取资源详情
	getResource: function(resId) {
		$.ajax({
			url: TDXUrl + 'manage_system/resource/' + resId,
			data: {},
			dataType: 'json',
			type: 'GET',
			contentType: 'application/json;charset=utf-8',
			success(res) {
				// info.docx(res.data.path);
				// console.log();
				if (res.code == 1) {
					console.log(res.data.path);
					if (res.data.resType == 1) {
						info.viewByVideoFileName(res.data.path);
					}
					if (res.data.resType == 2) {
						info.viewByVideoFileName(res.data.path);
					}
					console.log(res);
					console.log(res.data.path);
					layer.msg('获取资源详情成功');
				} else {
					layer.msg('获取资源详情失败');
				}
			},
			error(e) {
				layer.msg('获取资源详情错误');
			}
		});
	},


	//视频弹出层
	viewByVideoFileName: function(path) {
		var setTimeInterval = '';
		layer.open({
			type: 1,
			area: ['750px', '400px'],
			title: ['查看', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
			shade: 0.6,
			content: $('#hiddenVideo'),
			success: function() {
				setTimeInterval = setInterval(info.currentTime, 30000);
				// var videoContent = document.getElementById("hiddenVideo");
				// console.log(videoContent);
				var html = [];
				html.push('<video src="http://192.168.188.114:88/' + path +
					'" controls="controls" preload="auto" width="600px" height="250px" id="myVideo"></video>');
				$('#hiddenVideo').html(html.join(''));

			},
			end: function() {
				clearInterval(setTimeInterval);
			}
		})
	},


	//每30秒获取
	currentTime: function() {
		var myVideo = document.getElementById("myVideo");
		var currentTime = myVideo.currentTime;
		console.log(myVideo.currentTime);
		info.recordVideoPlaybackTime(currentTime);
	},


	//30秒记录一次视频播放时长
	recordVideoPlaybackTime: function(seconds) {
		$.ajax({
			url: TDXUrl + 'manage_system/resource/view',
			data: {
				'resId': 1,
				'seconds': Math.round(seconds)
			},
			dataType: 'json',
			type: 'POST',
			// contentType: 'application/json;charset=utf-8',
			success(res) {
				if(res.code == 1) {
					console.log(res);
					layer.msg('获取视频播放时长成功');
				} else {
					layer.msg('获取视频播放时长失败');
				}
			},
			error(e) {
				layer.msg('获取视频播放时长错误');
			}
		});
	},
	
	
	//获取视频播放时长
	getVideoPlaybackTime: function() {
		$.ajax({
			url: TDXUrl + 'manage_system/resource/view',
			data: {
				'resId': 1
			},
			dataType: 'json',
			type: 'GET',
			// contentType: 'application/json;charset=utf-8',
			success(res) {
				if(res.code == 1) {
					console.log(res);
					console.log(res.data);
					layer.msg('获取视频播放时长成功');
				} else {
					layer.msg('获取视频播放时长失败');
				}
			},
			error(e) {
				layer.msg("获取视频播放时长错误");
			}
		});
	},
	
	
	//音频弹出层
	viewByAudioFileName: function() {
		layer.open({
			type: 1,
			area: ['750px', '200px'],
			title: ['查看', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
			shade: 0.6,
			content: $('#hiddenAudio'),
	
		})
	},
	
	
	//文档弹出层
	docx : function(path) {
		layer.open({
			type: 1,
			area: ['750px', '400'],
			title:[],
			shade: 0.6,
			content: $('#Doc'),
			success: function() {
				var html = [];
				console.log("http://192.168.188.114:88/" + path);
				html.push('<iframe src="https://view.officeapps.live.com/op/view.aspx?src=http://192.168.188.114:88/'+path+'"></iframe>');
				$('#Doc').html(html.join(''));
				
			}
		});
	},


	//编辑资源名弹出层
	updatePopup: function(resId) {
		console.log(JumpPageNum);
		// return false;
		layer.open({
			type: 1,
			area: ['790px', '220px'],
			title: ['编辑资源名', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
			shade: 0.6,
			btn: ['确认', '取消'],
			btnAlign: 'c',
			content: $('#editResNameBox'),
			yes: function() {
				var resName = $('.rename').val();
				if (resName == '') {
					layer.msg('文件名称不能为空');
					return false;
				}
				info.update(resId, resName);
				layer.close(layer.index);
			}
		});
	},


	//根据Id来修改资源名
	update: function(resId, resName) {
		var data = {
			'resId': resId,
			'resName': resName
		}
		$.ajax({
			url: TDXUrl + 'manage_system/resource/res-name',
			data: data,
			dataType: 'json',
			type: 'POST',
			success(res) {
				if (res.code == 1) {
					console.log(res);
					layer.msg('编辑资源名成功');
					info.selectResourceList(JumpPageNum);
				} else {
					layer.msg('编辑资源名失败')
				}
			},
			error(e) {
				layer.msg('修改资源名错误');
			}
		});
	},


	//根据Id删除资源
	deleteResource: function(resId) {
		// $('.Allclass').attr('data-id')
		$.ajax({
			url: TDXUrl + 'manage_system/resource/' + resId,
			data: {},
			dataType: 'json',
			type: 'DELETE',
			contentType: 'application/json;charset=utf-8',
			success(res) {
				// if(res.code == 1) {
				// 	
				// } else {
				// 	layer.msg('删除资源失败');
				// }
				console.log(res);
				layer.msg('删除资源成功');
				// console.log(12);
				if(total % 12 == 1) {
					var a = JumpPageNum - 1;
					info.selectResourceList(a);
				} else {
					info.selectResourceList(JumpPageNum);
				}
			},
			error(e) {
				layer.msg('删除资源错误');
			}
		});
	},


	//获取资源详情弹出层
	// getResourcePopup: function() {
	// 	layer.open({
	// 		type: 1 ,
	// 		area: ['790px', '320px'],
	// 		title: ['资源详情', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
	// 		shade: 0.6,
	// 		content: $('#hiddenAudio'),
	// 		
	// 	});
	// 	
	// },


	//上传文件
	uploadPopup: function() {
		// $('#uploadFile').click(function() {
		$(document).on('click', '#uploadFile', function() {
			layui.use("layer", function() {
				var layer = layui.layer;
				layer.open({
					type: 1, //Page层类型
					area: ['790px', '320px'],
					title: ['上传资源', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
					shade: 0.6, //遮罩透明度
					// closeBtn: 0,
					btn: ["确认"],
					btnAlign: 'c',
					content: $('#popup'),
					yes: function() {
						layer.close(layer.index);
						info.selectResourceList(JumpPageNum);
					},
					end: function() {
						var file = $("#testList") 
						file.after(file.clone().val("")); 
						file.remove();
						var html = [];
						$('#demoList').html(html.join(''));
						
					},
					success: function() {
						console.log('-----成功1----');
						layui.use('upload', function() {
							var $ = layui.jquery,
								upload = layui.upload;
							// 多文件列表示例
							var demoListView = $('#demoList'), //上传文件显示的数据表格
								uploadListIns = upload.render({
									elem: '#testList', //选择文件按钮
									url: TDXUrl + 'manage_system/resource/resource',
									accept: 'file', //上传文件类型
									multiple: true,	//允许上传多个文件
									exts: 'mp4|avi|mov|rmvb|rm|flv|wma|mp3|ogv|cd|wav|aiff|ogg|aac|midi|docx|doc|xls|xlsx|pdf|txt',
									// size: 1024*20,
									// auto: false,	不用按钮点击执行
									// bindAction: '#testListAction',
									choose: function(obj) {
										var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
										//读取本地文件
										obj.preview(function(index, file, result) {
											var fileType = '';
											var fileNameArr = file.name.split(".");
											var fileName = fileNameArr[fileNameArr.length - 1]; //获取后缀名字符串
											console.log(fileNameArr);
											console.log(fileNameArr[fileNameArr.length - 1]);
											var tr = $(['<tr id="upload-' + index + '">', '<td style="width:20px;">' + file.name +
												'</td>', '<td>' + fileType + '</td>',
												'<td>' + info.getFileSize(file.size) + '</td>', '<td>' + '--' + '</td>',
												'<td>',
												'<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>',
												'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>',
												'</td>',
												'</tr>'
											].join(''));

											//单个重传
											tr.find('.demo-reload').on('click', function() {
												obj.upload(index, file);
											});

											//删除
											tr.find('.demo-delete').on('click', function() {
												delete files[index]; //删除对应的文件
												tr.remove();
												uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
											});

											demoListView.append(tr);
										});
									},
									done: function(res, index, upload) {
										console.log('-----成功----');
										console.log(res);
										if (res.code == 1) { //上传成功
										var tr = demoListView.find('tr#upload-' + index),
											tds = tr.children();
										tds.eq(3).html('<span style="color: #5FB878;">上传成功</span>');
										tds.eq(4).html(''); //清空操作
										return delete this.files[index]; //删除文件队列已经上传成功的文件
										}
										// this.error(index, upload);
									},
									error: function(index, upload) {
										console.log('-----失败----');
										var tr = demoListView.find('tr#upload-' + index),
											tds = tr.children();
										tds.eq(3).html('<span style="color: #FF5722;">上传失败</span>');
										tds.eq(4).find('.demo-reload').removeClass('layui-hide'); //显示重传
										
									}
								});
						});
					},
					error(e) {
						layer.msg('上传资源错误');
						layer.close(layer.index);
						var html = [];
						$('#demoList').html(html.join(''));
						info.selectResourceList(JumpPageNum);
					}
				});
			});
		})
	},


	getFileSize: function(fileByte) {
		var fileSizeByte = fileByte;
		var fileSizeMsg = "";
		if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
		else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
		else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + "MB";
		else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1GB";
		else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + "GB";
		else fileSizeMsg = "文件超过1TB";
		return fileSizeMsg;
	},



	//查询任务类型
	// selectTaskType: function() {
		// $.ajax({
		// 	url: LBUrl + 'manage_system/task/type',
		// 	data: {},
		// 	dataType: 'json',
		// 	type: 'GET',
		// 	success(res) {
		// 		console.log(res)
				// var Html = [];
		// 		res.forEach(function(item, index) {
		// 			var aa = item.split(",");
		// 			console.log(aa);
					// Html.push('<option value="' + aa[0] + '">' + aa[1] + '</option>');
					// Html.push('<option value="2">学习任务</option>');
		// 		})
				// $('#taskType').html(Html.join(''));
		// 		layui.use('form', function() {
		// 			var form = layui.form;
		// 			form.render('');
		// 		});
		// 	}
		// })
	// },
	

	
	
	
	//查询资源-----------------------------------------------------------------------------------------
	taskSelectResourceList: function(resType) {
		$.ajax({
			url: TDXUrl + 'manage_system/resource/resources',
			data: {
				'pageNum': 1,
				'pageSize': 100000,
				'resType': resType
			},
			dataType: 'json',
			type: 'GET',
			contentType: 'application/json;charset=utf-8',
			success(res) {
				console.log(res)
				var Html = [];
				res.data.list.forEach(function(item, index) {
					Html.push('<div class="layui-input-inline radio_box" >')
					Html.push(
						'  <input type="radio" name="res" name="Staff" lay-skin="primary" lay-filter="Staff"  value="' +
						item.resId + '">')
					Html.push('<div class="img-box">')
					Html.push('		<img src="' + item.path + '" >')
					Html.push('</div>')
					Html.push('<p class="resName">' + item.resName + '</p>')
					Html.push('</div>')
				})
				$('#resource').html(Html.join(''));
	
				// 重新渲染
				layui.use('form', function() {
					var form = layui.form;
					form.render('');
				});
			}
		})
	},
	//查询资源-----------------------------------------------------------------------------------------



	//发布任务弹出层
	openAddRolePage: function(userId) {
		layer.open({
			type: 1,
			title: ['发布任务', 'color:#fff;background-color:#40AFFE;border-radius: 7px;text-align: center; font-size: 20px;'],
			shadeClose: true,
			shade: 0.8,
			skin: 'myskin',
			area: ['700px', '750px'],
			content: $('#addTaskPage'),
			success: function() {
				layui.use('form', function() {
					var form = layui.form;
					form.render('select');
				});
			
			},
		});
	},
	
	
	
	
	//弹出选择资源
	selectResources: function() {
	
		layer.open({
			type: 1,
			title: ['选择资源', 'color:#fff;background-color:#40AFFE;border-radius: 7px;text-align: center; font-size: 20px; '],
			shadeClose: true,
			shade: 0,
			skin: 'myskin',
			area: ['700px', '80%'],
			content: $('#selectResource'),
			success: function() {
				
			}
		})
	},
	
	//弹出编辑任务
	popupsUpdateTaskName: function() {
		layer.open({
			type: 1,
			title: ['编辑任务', 'color:#fff;background-color:#40AFFE;;border-radius: 7px'],
			shadeClose: true,
			shade: 0.8,
			skin: 'myskin',
			area: ['700px', '200px'],
			content: $('#updateTaskName'),
			success: function() {
	
			}
		})
	},
	
	
	//查询所有用户
	selectAllUser: function(userName) {
		$.ajax({
			url: LBUrl + 'manage_system/task/users',
			data: {
				'userName': userName
			},
			dataType: 'json',
			type: 'GET',
			success(res) {
				var Html = []
				res.data.forEach(function(item, index) {
					Html.push('<span class="layui-form-label" style="font-size: 16px;"><input type="checkbox" value="' + item.userId +
						'"class="checkAll " name="Staff" lay-skin="primary" lay-filter="c_one" ><i>' + item.userName +
						'</i></span>')
				})
				$('#selectTaskUsers').html(Html.join(''));
				layui.use('form', function() {
					var form = layui.form;
					form.render('');
				});
			}
		})
	},
	
	
	//发布任务-----------------------------------------------------------------------------------------
	addTask: function() {
		// var resId = $('input:radio:checked').val();
		// var resId = resId;
		console.log(resId);
		var mistake = '';
		// var resId=$("input[name=res]:checked").val();
		var index = true;
		var userId = ''
		$.each($("[name='Staff']:checked"), function(i, val) {
			userId += ',' + val.value
		})
		if ($('#test1').val() == '') {
			mistake = '请选择开始时间!';
			index = false;
		}
		if ($('#test2').val() == '') {
	
			mistake = '请选择结束时间'
			index = false;
		}
		if ($('#test1').val() > $('#test2').val()) {
			mistake = '结束时间不能小于开始时间'
			index = false;
		}
		if (userId == '') {
			mistake = '请选择做任务人员'
			index = false;
		}
		if ($('#taskType').val() == '1') {
			if (resId == undefined) {
				mistake = '请选择资源！';
				index = false;
			}
			if ($('.selectPapers').val() == '') {
				mistake = '请选择试卷！';
				index = false;
			}
	
		} else if ($('#taskType').val() == '2') {
			if (resId == undefined) {
				mistake = '请选择资源！';
				index = false;
			}
		} else if ($('#taskType').val() == '3') {
			if ($('.selectPapers').val() == '') {
				mistake = '请选择试卷！';
				index = false;
			}
		}
		if ($('.taskName').val() == '') {
			mistake = '任务名不能为空哦！';
			index = false;
		}
		var data = {
			'resId': resId,
			'paperId': 1,
			'taskType': $('#taskType').val(),
			'taskName': $('.taskName').val(),
			'taskRemark': $('.taskRemark').val(),
			'status': 1,
			'startTime': dateFormata($('#test1').val()),
			'endTime': dateFormata($('#test2').val()),
			'userId': userId
	
		}
		console.log(data.startTime)
		if (index != false) {
	
			console.log(data)
			$.ajax({
				url: LBUrl + 'manage_system/task/tasks',
				data: JSON.stringify(data),
				dataType: 'json',
				type: 'POST',
				contentType: 'application/json;charset=utf-8',
				success(res) {
					// console.log(res)
				}
			})
			layer.msg('添加成功');
			// layer.close(layer.index);
			location.replace(document.referrer);
		} else {
			layer.msg(mistake);
		}
	},
	
	//发布任务-----------------------------------------------------------------------------------------


	
}



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
	return year + "-" + month + "-" + day + " " + (hours) + ":" + minutes + ":" + seconds;
}