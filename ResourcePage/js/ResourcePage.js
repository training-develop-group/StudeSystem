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

		});
		//选择任务人员全选反选-------------------------------------------------------------------------


		//layui 日期渲染--------------------------------------------------------------------------------------
		laydate = layui.laydate;
		//执行一个laydate实例
		laydate.render({
			elem: '#test1', //指定元素,
			theme: '#279EF0',
			type: 'datetime',

		});
		laydate.render({
			elem: '#test2', //指定元素,
			theme: '#279EF0',
			type: 'datetime',
		});
		//layui 日期渲染--------------------------------------------------------------------------------------


		//调用common.js的公共方法
		All.getMenu({
			search: 1,
			type: 1,
			num: 2
		});

		info.selectResourceList(1); //获取资源列表

		info.uploadPopup(); //上传文件

		/**
		 * 检索关键词resName
		 * 用回车检索
		 */
		$('.search').keypress(function(e) {
			if (e.which == 13) {
				var searchKey = $('.search').val();
				info.selectResourceList(1, searchKey)
			}
		});
	});
});

var total = ''; //分页总数量
var JumpPageNum = 1; //全局变量分页页数初始值
var resId = ''; //发布任务所需resId
var resName = ''; // 资源文件名
var deleteResId = '';
var a = 0;
var b = 0;
var lastTime = 0;

/**
 * 主方法
 */
var info = {
	//获取资源列表
	selectResourceList: function(pageNum, resName, resType) {

		$.ajax({
			url: Url + 'manage_system/resource/resources',
			data: {
				'pageNum': pageNum,
				'pageSize': 12,
				'resName': resName,
				'resType': resType
			},
			dataType: 'json',
			type: 'GET',
			// contentType: 'application/json;charset=utf-8',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(res) {
				var html = [];
				if (res.code == 1) {
					res.data.list.forEach(function(item) {
						item.resName = $('<div>').text(item.resName).html();
						html.push('<tr>');
						if (item.resName.length > 20) {
							html.push('<td class="getResource" resId="' + item.resId + '" title="' + item.resName + item.resExt +
								'"><pre title="' + item.resName + item.resExt +
								'"><span class="hidden">'+ item.resName +'</span>' + item.resName.substring(0, 20) + '...</pre></td>');
						} else {
							html.push('<td class="getResource" resId="' + item.resId + '"><pre title="' + item.resName + item.resExt +
								'">' + item.resName + '<span>' + item.resExt + '</span></pre>' + '</td>');
						}
						if (item.status == 0) {
							item.status = '未发布';
						} else if (item.status == 1) {
							item.status = '已发布';

						}
						html.push('<td class="centerText">' + item.status + '</td>');
						if (item.resType == 1) { //判断资源类型
							item.resType = '视频'
						} else if (item.resType == 2) {
							item.resType = '音频'
						} else if (item.resType == 3) {
							item.resType = '文档'
						} else if (item.resType == 4) {
							item.resType = '图片'
						}else {
							item.resType = '未知'
						}
						html.push('<td class="centerText">' + item.resType + '</td>');
						html.push('<td class="centerText">' + getFileSize(item.resSize) + '</td>');
						// 转码
						var newResName = escape(item.resName);
						if (item.status == '已发布') {
							html.push('<td><button class="editResName" resId="' + item.resId + '" resName="' + newResName +
								'">重命名</button>' + '<button class="download" resId="' + item.resId + '" resName="' + item.resName + item.resExt + '">' +
								'下载</button><a/></td>');
							html.push('</tr>');
						} else if (item.status == '未发布') {
							html.push('<td><button class="editResName" resId="' + item.resId + '" resName="' + newResName +
								'">重命名</button><button class="release" resName="' + newResName + '" resId="' + item.resId +
								'">发布</button><button class="deleteList" resId="' + item.resId +
								'">删除</button>' +
							'<button class="download" resId="' + item.resId + '" resName="' + item.resName + item.resExt + '">' +
								'下载</button><a/></td>');
							html.push('</tr>');
						}
					});
					$('#contentList').html(html.join(''));

					total = res.data.total; //分页总数量
					JumpPageNum = res.data.pageNum; //下一页复制为了时删除或者修改完事后停留在原本的页数

					$('.search').val('');
					info.Pagination(total, pageNum); //调用分页方法（总条数，页数）

					//获取资源详情点击事件
					$('.getResource').off('click').on('click', function() {
						var resId = $(this).attr("resId");
						info.getResource(resId);
					});

					//编辑资源名点击事件
					$('.editResName').off('click').on('click', function() {
						var resId = $(this).attr("resId"); //点击后获取获取到按钮属性
						var resName = $(this).attr("resName");
						// var resName = this.parentElement.parentElement.firstElementChild;
						// $('.rename').val(resName); //编辑资源名返回值
						// 解码并转义 转码部分：unescape(rename)
						resName = $('<div>').html(unescape(resName)).text();
						info.updateResNamePopup(resId, resName); //调用修改弹出层传参（resId）
					});

					//-------------------------------------------------------------------------------------------------------------------------------------------------

					//发布弹窗
					$('.release').off('click').on('click', function() {

						//任务类型赋值学习任务
						var Html = [];
						Html.push('<option value="2">学习任务</option>');
						$('#taskType').html(Html.join(''));

						info.selectAllUser(''); //查询所有用户

						info.openAddRolePage(); //发布任务弹窗

						resId = $(this).attr("resId"); //给全局变量resId赋值（添加任务取到resId）

						//发布弹出层中显示被选中的资源名
						var resName = $(this).attr("resName");
						// 解码并转义 转码部分：unescape(rename)
						var titleResName = $('<div>').html(unescape(resName)).text();
						resName = $('<div>').text(titleResName).html();
						if (resName.length > 30) {
							$('.resAdd').html('：' + resName.substring(0, 30) + '...');
						} else {
							$('.resAdd').html('：' + resName);
						}
						$('.resAdd').attr('title', titleResName);
					});


					//弹出选择人员
					$('.selectPersonnel').off('click').on('click', function() {
						layer.open({
							type: 1,
							title: ['选择人员', 'color:#fff;background-color:#279EF0;text-align: center;font-size:20px'],
							skin: 'myskin',
							area: ['600px', '500px'],
							move: false,
							content: $('#selectPersonnel'),
							success: function() {
							}
						});
					});


					//选择人员确认按钮点击事件
					$('.usersSelectOk').click(function() {
						var Html = [];
						$.each($("[name='Staff']:checked"), function(i, val) {
							Html.push('<p>' + $(this).siblings('i').text() + '<input type="text"  hidden="" id="" value="' + $(this)
								.val() +
								'" />  <i  data-id="' + $(this).val() +
								'" class="layui-icon layui-icon-close deleteUserName" style="font-size: 20px;"></i></p>'
							)
						});
						$('.taskUsers').html(Html.join(''));


						//点击“ × ”删除被选择的指定人员
						$('.deleteUserName').click(function() {
							$(this).parents('p').remove();
							var userId = $(this).attr('data-id');
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
						});
						layer.close(layer.index);
					});


					//回车点击事件（模糊查询）
					$(".userNameRetrieval").keypress(function(e) {
						if (e.which == 13) {
							var userNameRetrieval = $('.userNameRetrieval').val()
							info.selectAllUser(userNameRetrieval);
						}
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

					// 下载资源
					$('.download').off('click').on('click', function() {
						var resId = $(this).attr("resId");
						if (!resId) {
							layer.msg('下载资源失败');
						}
						var resName = $(this).attr("resName");
						let xhr = new XMLHttpRequest();
						var url = Url + 'manage_system/resource/download?resId=' + resId;
						xhr.open('POST', url, true)
						xhr.responseType = 'arraybuffer'
						xhr.setRequestHeader('token', window.sessionStorage.getItem("_token")) // 请求头中的验证信息等（如果有）
						xhr.onload = function() {
							if (this.status === 200) {
								let type = xhr.getResponseHeader('Content-Type')
								let blob = new Blob([this.response], {type: type})
								if (typeof window.navigator.msSaveBlob !== 'undefined') {
									window.navigator.msSaveBlob(blob, resName)
								} else {
									let URL = window.URL || window.webkitURL
									let objectUrl = URL.createObjectURL(blob)
									if (resName) {
										var a = document.createElement('a')
										// safari doesn't support this yet
										if (typeof a.download === 'undefined') {
											window.location = objectUrl
										} else {
											a.href = objectUrl
											a.download = resName
											document.body.appendChild(a)
											a.click()
											a.remove()
										}
									} else {
										window.location = objectUrl
									}
								}
							}
						}
						xhr.send();
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

	/**
	 * 分页
	 * @param {Object} total 数据总条数
	 * @param {Object} pageNum 页数
	 */
	Pagination: function(total, pageNum) {
		if (total < 13) {
			$('#page').css('display', 'none');
		} else {
			$('#page').css('display', '');
		}
		//执行一个laypage实例
		layui.use('laypage', function() {
			var laypage = layui.laypage;
			laypage.render({
				elem: 'page',
				count: total,
				limit: '12',
				theme: '#279EF0',
				curr: pageNum,
				group: '5',
				layout: ['prev', 'page', 'next', 'limits', 'skip'],
				jump: function(item, first) {
					if (!first) {
						info.selectResourceList(item.curr); //下一页
					}
				}
			});
		})
	},

	/**
	 * 根据resId获取资源详情
	 * @param {Object} resId 获取资源详情的条件
	 */
	getResource: function(resId) {
		$.ajax({
			url: Url + 'manage_system/resource/' + resId,
			data: {},
			dataType: 'json',
			type: 'GET',
			contentType: 'application/json;charset=utf-8',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(res) {
				if (res.code == 1) {
					if (res.data.resType == 1) {
						info.videoPopup(res.data.path, res.data.resType);

					} else if (res.data.resType == 2) {
						info.audioPopup(res.data.path, res.data.resType);

					} else if (res.data.resType == 3) {
						info.documentPopup(res.data.path, res.data.resType);

					} else if (res.data.resType == 4) {
						info.imagePopup(res.data.path, res.data.resType);

					}
				} else {
					layer.msg('获取资源详情失败');
				}
			},
			error(e) {
				layer.msg('获取资源详情错误');
			}
		});
	},

	/**
	 * 视频弹出层
	 * @param {Object} path 资源路径
	 * @param {Object} resType 资源类型
	 */
	videoPopup: function(path, resType) {
		var setTimeInterval = '';
		layer.open({
			type: 1,
			area: ['1296px', '774px'],
			title: ['查看', 'background-color: #279EF0;text-align: center;font-size: 20px;color:white;'],
			move: false,
			content: $('#viewResourceBox'),
			success: function() {
				// window.open('http://192.168.188.109:8848/0625ae7ec85c4b94bf1cde70d2692b67.mp4');
				//计时器每3秒经行一次方法
				// setTimeInterval = setInterval(info.currentTime, 30000);
				// setTimeInterval2 = setInterval(info.NoProgressBar, 1000);
				var html = [];
				html.push('<video src="'+ FileUrl + path +
					'" controls="controls" preload="auto" width="1280px" height="720px" id="myVideo"></video>');
				$('#viewResourceBox').html(html.join(''));

			},
			end: function() {
				//关闭弹窗后关闭计时
				clearInterval(setTimeInterval);
				myVideo.pause();	//暂停音频
			}
		})
	},

	NoProgressBar: function() {
		var myVideo = document.getElementById("myVideo"); //获取视频DOM
		var nowTime = myVideo.currentTime; //获取视频播放时间
		var timeInterval = nowTime - lastTime; //
		if (timeInterval > 2) {
			// myVideo.pause();
			myVideo.currentTime = lastTime;
		}
		lastTime = nowTime; //播放时间中转（全局变量）
	},

	/**
	 * 音频弹出层
	 * @param {Object} path 资源路径
	 * @param {Object} resType 资源类型
	 */
	audioPopup: function(path, resType) {
		layer.open({
			type: 1,
			area: ['800px', '300px'],
			title: ['查看', 'background-color:#279EF0;text-align: center;font-size: 20px;color:white;'],
			move: false,
			content: $('#viewResourceBox'),
			success: function() {
				var html = [];
				html.push('<audio src="' +FileUrl + path +
					'" controls="controls" preload="auto" id="myAudio"></audio>');
				$('#viewResourceBox').html(html.join(''));

			},
			end: function() {
				myAudio.pause();	//暂停音频
			}
		});
	},

	/**
	 * office类型文档弹出层
	 * @param {Object} path 资源路径
	 * @param {Object} resType 资源类型
	 */
	documentPopup: function(path, resType) {
		layer.open({
			type: 1,
			area: ['850px', '900px'],
			title: ['查看', 'background-color: #279EF0;text-align: center;font-size: 20px;color:white;'],
			move: false,
			content: $('#viewResourceBox'),
			success: function() {
				var extPath = path.substring(path.lastIndexOf('.'));
				if (extPath == '.txt' || extPath == '.pdf') {
					var html = [];
					html.push('<iframe src="' + FileUrl + path + '" width="800px" height="800px"></iframe>');
					$('#viewResourceBox').html(html.join(''));
				} else {
					var pdfPath = path.substring(0, path.lastIndexOf('.'));
					var html = [];
					html.push('<iframe src="' + FileUrl + pdfPath +
						'.pdf" width="800px" height="800px"></iframe>');
					$('#viewResourceBox').html(html.join(''));
				}

			}
		});
	},

	/**
	 * 图片弹出层
	 * @param {Object} path 资源路径
	 * @param {Object} resType 资源类型
	 */
	imagePopup: function(path, resType) {
		var setTimeInterval = '';
		layer.open({
			type: 1,
			area: ['1296px', '774px'],
			title: ['查看', 'background-color: #279EF0;text-align: center;font-size: 20px;color:white;'],
			move: false,
			content: $('#viewResourceBox'),
			success: function() {
				var html = [];
				html.push('<image src="'+ FileUrl + path +
					'" controls="controls" preload="auto" width="1280px" height="720px"/>');
				$('#viewResourceBox').html(html.join(''));

			}
		})
	},

	//获取视频播放到的时间然后记录
	currentTime: function() {
		var myVideo = document.getElementById("myVideo"); //获取视频DOM元素
		var currentTime = myVideo.currentTime; //获取视频播放到的时间
		info.recordVideoPlaybackTime(currentTime); //调用记录方法
	},


	/**
	 * 记录视频播放的时间
	 * @param {Object} seconds
	 */
	recordVideoPlaybackTime: function(seconds) {
		$.ajax({
			url: Url + 'manage_system/resource/view',
			data: {
				'resId': 1,
				'seconds': Math.round(seconds)
			},
			dataType: 'json',
			type: 'POST',
			// contentType: 'application/json;charset=utf-8',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(res) {
				if (res.code == 1) {
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
			url: Url + 'manage_system/resource/view',
			data: {
				'resId': 1
			},
			dataType: 'json',
			type: 'GET',
			// contentType: 'application/json;charset=utf-8',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(res) {
				if (res.code == 1) {
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


	/**
	 * 编辑资源名称弹出层
	 * @param {Object} resId
	 */
	updateResNamePopup: function(resId, resName) {
		All.layuiOpenRename({
			num: 2,
			id: resId,
			returnValue: resName,
			msg: '资源名称'
		})
	},
	//根据Id来修改资源名
	updateResName: function(resId, resName) {
		var data = {
			'resId': resId,
			'resName': resName,
		};

		$.ajax({
			url: Url + 'manage_system/resource/res-name',
			data: data,
			dataType: 'json',
			type: 'POST',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(res) {
				if (res.code == 1) {
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
	deleteResource: function(resId, index) {
		$.ajax({
			url: Url + 'manage_system/resource/' + resId,
			data: {},
			dataType: 'json',
			type: 'DELETE',
			contentType: 'application/json;charset=utf-8',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(res) {
				layer.msg('删除资源成功');
				if (index != 1) {
					if (total % 12 == 1 && JumpPageNum == Math.ceil(total / 12)) {
						var pageNum = JumpPageNum - 1;
						info.selectResourceList(pageNum);
					} else {
						info.selectResourceList(JumpPageNum);
					}
				}
			},
			error(e) {
				layer.msg('删除资源错误');
			}
		});
	},


	//上传资源
	uploadPopup: function() {
		// $('#uploadFile').click(function() {
		$(document).on('click', '#uploadFile', function() {

			$('.upMsg').hover(function() {
				$('.upMsgContent').slideDown("slow");
			}, function() {
				$('.upMsgContent').slideUp("slow");
			});

			layui.use("layer", function() {
				var layer = layui.layer;
				layer.open({
					type: 1, //Page层类型
					area: ['790px', '550px'],
					title: ['上传资源', 'background-color: #279EF0;text-align: center;font-size: 20px;color:white;'],
					// closeBtn: 0,
					btn: ["确认"],
					btnAlign: 'c',
					move: false,
					content: $('#popup'),
					end: function() {
						// 刷新列表
						info.selectResourceList(1);
						//清空上传文件缓存
						var file = $("#testList");
						file.after(file.clone().val(""));
						file.remove();
						//清空上传文件表格
						var html = [];
						$('#demoList').html(html.join(''));
					},
					success: function() {
						var resIdList = [];
						layui.use('upload', function() {
							var $ = layui.jquery,
								upload = layui.upload;
							// 多文件列表示例
							var demoListView = $('#demoList'), //上传文件显示的数据表格
								uploadListIns = upload.render({
									elem: '#testList', //选择文件按钮
									url:Upload + 'manage_system/resource/resource',
									headers: {"token":window.sessionStorage.getItem("_token")},
									accept: 'file', //上传文件类型
									multiple: true, //允许上传多个文件
									exts: 'mp4|avi|mov|rmvb|rm|flv|wma|mp3|ogv|wav|aiff|aac|midi|docx|doc|xls|xlsx|pdf|txt|ppt|pptx|bmp|jpg|wbmp|jpeg|png|gif',

									choose: function(obj) {
										var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
										//读取本地文件
										obj.preview(function(index, file, result) {
											if (file.size == 0) {
												layer.msg('不能上传空文件');
												return false;
											}
											if (file.name.length >= 50) {
												layer.msg('文件名过长不可上传');
												return false;
											}
											var fileType = '';
											// var fileNameArr = file.name.split(".");
											// var fileName = fileNameArr[fileNameArr.length - 1]; //获取后缀名字符串
											if (file.name.length > 8) {
												var tr = $(['<tr id="upload-' + index + '" class="uploadTd">',
													'<td style="width:20px;" title="' + file.name + '"><pre>' + file.name.substring(0, 8) +
													'...</pre></td>',
													'<td class="centerText">' + fileType + '</td>',
													'<td class="centerText">' + getFileSize(file.size) + '</td>',
													'<td class="centerText">' + '--' + '</td>',
													'<td>',
													// '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>',
													'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete hidden">删除</button>',
													'</td>',
													'</tr>'
												].join(''));
											} else {
												var tr = $(['<tr id="upload-' + index + '" class="uploadTd">',
													'<td style="width:20px;" title="' + file.name + '"><pre>' + file.name + '</pre></td>',
													'<td class="centerText">' + fileType + '</td>',
													'<td class="centerText">' + getFileSize(file.size) + '</td>',
													'<td class="centerText">' + '--' + '</td>',
													'<td>',
													// '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>',
													'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete hidden">删除</button>',
													'</td>',
													'</tr>'
												].join(''));
											}

											//单个重传
											tr.find('.demo-reload').on('click', function() {
												obj.upload(index, file);
											});
											
											demoListView.append(tr);
										});
									},
									done: function(res, index, upload) {
										deleteResId = res.data.resId;
										if (res.code == 1) { //上传成功
											var resType = '';
											if (res.data.resType == 1) {
												resType = '视频';
											} else if (res.data.resType == 2) {
												resType = '音频';
											} else if (res.data.resType == 3) {
												resType = '文档';
											}
											var tr = demoListView.find('tr#upload-' + index),
												tds = tr.children();
											tds.eq(3).html('<span style="color: #5FB878;" class="centerText">上传成功</span>');
											tds.eq(1).html('<span>' + resType + '</span>');
											tds.eq(4).find('button').removeClass('hidden');
											// tds.eq(4).html(''); //清空操作
											tds.eq(4).attr('resId', deleteResId)

											//删除
											$('.demo-delete').off('click').on('click', function() {
												$(this).attr('disabled');
												var resId = $(this).parent('td').attr('resId');
												var deleteThis = $(this).parent('td').parent('tr')
												//调用common.js公共
												All.layuiOpen({
													num: 1,
													resId: resId,
													index: 1,
													deleteThis: deleteThis,
													msg: '是否删除资源?'
												});
											});
											$('.demo-delete').removeAttr('disabled');
											return delete this.files[index]; //删除文件队列已经上传成功的文件
											// this.error(index, upload);
										}
									},
									error: function(index, upload) {
										var tr = demoListView.find('tr#upload-' + index),
											tds = tr.children();
										tds.eq(3).html('<span style="color: #FF5722;">上传失败</span>');
										tds.eq(4).find('.demo-reload').removeClass('layui-hide'); //显示重传
										return delete this.files[index]; //删除文件队列已经上传成功的文件
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


	/**
	 * 发布任务弹出层
	 * @param {Object} userId
	 */
	openAddRolePage: function(userId) {

		var layer = layui.layer,
			form = layui.form;
		$(".checkAll").prop("checked", false);
		$("#checkAll").prop("checked", false);
		form.render('checkbox');
		// 清空输入框
		$('.taskName').val('');
		$('.taskRemark').val('');
		$('.taskUsers').empty();
		// 清空试卷名
		$('.paperAdd').text('');
		$('#test1').val(firstToday);
		$('#test2').val(lastToday);
		layer.open({
			type: 1,
			title: ['发布任务', 'color:#fff;background-color:#279EF0;text-align: center; font-size: 20px;'],
			skin: 'myskin',
			area: ['700px', '730px'],
			move: false,
			content: $('#addTaskPage'),
			success: function(index) {
				layui.use('form', function() {
					var form = layui.form;
					form.render('select');
				});

				//发布任务
				$('.okbtn').click(function() {
					$(this).attr('disabled', 'disabled');
					info.addTask();
				});

			},
		});
	},


	//查询所有用户
	selectAllUser: function(userName) {
		$.ajax({
			url: Url + 'manage_system/task/users',
			data: {
				'userName': userName
			},
			dataType: 'json',
			type: 'GET',
			beforeSend: function(value){
				All.setToken(value);
			},
			success(res) {
				var Html = [];
				res.data.forEach(function(item, index) {
					Html.push('<span class="layui-form-label" style="font-size: 16px;"><input type="checkbox" value="' + item.pkId +
						'"class="checkAll " name="Staff" lay-skin="primary" lay-filter="c_one" ><i>' + item.userName +
						'</i></span>')
				});
				$('#selectTaskUsers').html(Html.join(''));
				$("#checkAll").prop("checked", false);
				layui.use('form', function() {
					var form = layui.form;
					form.render('');
				});
			}
		})
	},


	//发布任务
	addTask: function() {
		var mistake = '';
		var index = true;
		var userId = '';
		$.each($("[name='Staff']:checked"), function(i, val) {
			userId += ',' + val.value
		})
		if ($('#test1').val() == '') {
			mistake = '请选择开始时间!';
			index = false;
		}
		if ($('#test2').val() == '') {

			mistake = '请选择结束时间';
			index = false;
		}
		if ($('#test1').val() > $('#test2').val()) {
			mistake = '结束时间不能小于开始时间';
			index = false;
		}
		if (userId == '') {
			mistake = '请选择做任务人员';
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

		};
		if (index != false) {
			$.ajax({
				url: Url + 'manage_system/task/tasks',
				data: JSON.stringify(data),
				dataType: 'json',
				type: 'POST',
				contentType: 'application/json;charset=utf-8',
				beforeSend() {
					layer.load(2);
				},
				beforeSend: function(value){
					All.setToken(value);
				},
				success(res) {
					if (res.code == 1) {
						layer.msg('发布成功');
						setTimeout(function() {
							layer.closeAll();
						}, 1000);
						info.selectResourceList(JumpPageNum);
					}
				}
			});
		} else {
			layer.msg(mistake);
			$('.addOk').removeAttr('disabled');
		}
	},
};


/**
 * 资源size格式化
 * @param {Object} fileByte 文件size格式化的参数
 */
var getFileSize = function(fileByte) {
	var fileSizeByte = fileByte;
	var fileSizeMsg = "";
	if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
	else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
	else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(
		2) + "MB";
	else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1GB";
	else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 *
		1024)).toFixed(2) + "GB";
	else fileSizeMsg = "文件超过1TB";
	return fileSizeMsg;
}


/**
 * 日期格式化
 * @param {Object} time 事件格式化参数
 */
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
// 时间设置
var today = '';
var firstToday = '';
var lastToday = '';
$(document).ready(function() {
	var time = new Date();
	var day = ("0" + time.getDate()).slice(-2);
	var newDay = ("0" + (time.getDate() + 1)).slice(-2);
	var month = ("0" + (time.getMonth() + 1)).slice(-2);
	var hours = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getDay();
	// today = time.getFullYear() + "-" + (month) + "-" + (day);
	firstToday = time.getFullYear() + "-" + (month) + "-" + (day) + " " + hours + ":" + minutes + ":" + seconds;
	lastToday = time.getFullYear() + "-" + (month) + "-" + (newDay) + " " + hours + ":" + minutes + ":" + seconds;
});
