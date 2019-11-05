$(function() {
	layui.use(['layer', 'form', 'laypage'], function() {
		var layer = layui.layer,
			form = layui.form;
		var laypage = layui.laypage,
			layer = layui.layer;




		//调用common.js的公共方法
		All.getMenu({
			num: 2
		});




		//调用音频弹出层方法
		// info.viewByAudioFileName();

		info.getVideoPlaybackTime();

		info.selectResourceList(1); //查看

		info.uploadPopup(); //上传文件

		// 调用文档弹出层
		// info.viewByTextFileName();
		


	});

});
var JumpPageNum = 1; //全局变量分页页数初始值
var info = {
	//获取资源列表
	selectResourceList: function(pageNum) {
		$.ajax({
			url: TDXUrl + 'manage_system/resource/resources',
			data: {
				'pageNum': pageNum,
				'pageSize': 12
			},
			dataType: 'json',
			type: 'GET',
			contentType: 'application/json;charset=utf-8',
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
						html.push('<td class="centerText">' + item.resSize + 'kb</td>');
						html.push('<td><a href="#" class="editResName" resId="' + item.resId + '" resName="' + item.resName +
							'">编辑</a><a href="#" class="release">发布</a><a href="#" class="deleteList" resId="' + item.resId +
							'">删除</a></td>');
						html.push('</tr>');
					})
					$('#contentList').html(html.join(''));

					// console.log(res)
					var total = res.data.total; //分页总数量
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


					//发布弹窗
					$('.release').off('click').on('click', function() {


					})


					//删除资源
					$('.deleteList').off('click').on('click', function() {
						var resId = $(this).attr("resId");
						//调用common.js公共
						All.layuiOpen({
							num: 1,
							resId: resId,
							// JumpPageNum: JumpPageNum,
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


	//每30秒获取
	currentTime: function() {
		var myVideo = document.getElementById("myVideo");
		var currentTime = myVideo.currentTime;
		console.log(myVideo.currentTime);
		info.recordVideoPlaybackTime(currentTime)
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
				info.update(resId, resName);
				// layer.close(index);
				layer.closeAll();
				info.selectResourceList(JumpPageNum);

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
				info.selectResourceList(JumpPageNum);
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
									multiple: true,
									method: 'GET',
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
												'<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>' + '--' + '</td>',
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
										// if (res.code == 0) { //上传成功
										var tr = demoListView.find('tr#upload-' + index),
											tds = tr.children();
										tds.eq(3).html('<span style="color: #5FB878;">上传成功</span>');
										tds.eq(4).html(''); //清空操作
										return delete this.files[index]; //删除文件队列已经上传成功的文件
										// }
										this.error(index, upload);
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
					}
				});
			});
		})
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
}
