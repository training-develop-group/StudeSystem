$(function() {
	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;
			
			
		All.getMenu({
			num: 2
		});
		
		$('.EditorTestPaper').click(function() {
			// 跳转到试题
			window.location.href = "../EditorTestPaper/EditorTestPaper.html";
		});
		
		$('.testQuestions').click(function() {
			// 跳转到试题
			window.location.href = "../testQuestions/testQuestions.html";
		});

		// info.add();	//已经好用
		
// 		info.select();	////已经好用
// 		
		// info.delete();	////已经好用

		info.uploadpopup();
		
		//调用视频弹出层方法
		info.viewByVideoFileName();

		//调用音频弹出层方法
		info.viewByAudioFileName();

		//调用文档弹出层
		// info.viewByTextFileName();
	});



});
var info = {
	
	add: function() {
		var data = {
			'resId':'45454545',
			'resName': 'hh',
			'resType': 2,
			'path': '1223',
			'resExt': '121',
			'resSize': 3,
			'status': 4,
			'cTime': '2019-08-01',
			'mTime': '2019-08-02',
			'cUser': '123',
			'mUser': '456'
		}
		$.ajax({
			url: 'http://localhost:8484/manage_system/resource/resource',
			data: JSON.stringify(data),
			dataType: 'json',
			type: 'POST',
			contentType: 'application/json;charset=utf-8',
			success(res) {
				console.log(res);
				console.log(JSON.stringify(data));
			}
		});
	},
	
	
	select: function() {
		$.ajax({
			url: 'http://localhost:8484/manage_system/resource/resources',
			data: {},
			dataType: 'json',
			type: 'GET',
			contentType: 'application/json;charset=utf-8',
			success(res) {
				var html = [];
				if(res){
					res.data.forEach(function(item){
						console.log(item.resId);
						html.push('<tr>');
						html.push('<td>' + item.resName + '</td>');
						html.push('<td>' + '未发布' + '</td>');
						html.push('<td>' + item.resType + '</td>');
						html.push('<td>' + item.resSize + 'kb</td>');
						html.push('<td><a href="#">编辑</a><a href="#">发布</a><a href="#">删除</a></td>');
						html.push('</tr>');
					})
				}
				$('#contentList').html(html.join(''));
			}
		});
	},
	
	
	delete: function() {
		var resId = 45454545;
		$.ajax({
			url: 'http://localhost:8484/manage_system/resource/' + resId,
			data: {},
			dataType: 'json',
			type: 'DELETE',
			contentType: 'application/json;charset=utf-8',
			success(res) {
				alert('删除成功');
			}
		});
	},
	
	
	uploadpopup: function() {
		// $('#uploadFile').click(function() {
		$(document).on('click', '#uploadFile', function() {
			layui.use("layer", function() {
				var layer = layui.layer;
				layer.open({
					type: 1 //Page层类型
						,
					area: ['790px', '320px'],
					title: ['上传资源', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
					shade: 0.6 //遮罩透明度
						,
					// closeBtn: 0,
					btn: ["确认"],
					btnAlign: 'c',
					content: $('#popup'),
					yes:function(){
						parent.location.reload();
					},
					success: function() {
						console.log('-----成功1----');
						layui.use('upload', function() {
							var $ = layui.jquery,
								upload = layui.upload;
							// 多文件列表示例
							var demoListView = $('#demoList'),//上传文件显示的数据表格
								uploadListIns = upload.render({
									elem: '#testList',//选择文件按钮
									url: 'http://localhost:8484/manage_system/resource/resource',
									accept: 'file',//上传文件类型
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
											if (fileName == 'doc' || fileName == 'docx') {
												fileType = '文档';
											}
											if (fileName == 'wmv' || fileName == 'mp4') {
												fileType = '视频';
											}
											if (fileName == 'wmv' || fileName == 'mp3' || fileName == 'mpg' || fileName == 'mov' ||
												fileName == 'avi' || fileName == 'wma') {
												fileType = '音频';
											}
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
	viewByVideoFileName: function() {
		$(document).on('click', '.videoFileName', function() {
			layer.open({
				type: 1,
				area: ['750px', '400px'],
				title: ['查看', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
				shade: 0.6,
				content: $('#hiddenVideo'),

			})
		});
	},

	viewByAudioFileName: function() {
		$(document).on('click', '.audioFileName', function() {
			layer.open({
				type: 1,
				area: ['750px', '400px'],
				title: ['查看', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
				shade: 0.6,
				content: $('#hiddenAudio'),

			})
		});
	},

// 	viewByTextFileName: function() {
// 		$(document).on('click', '.textFileName', function() {
// 			layer.open({
// 				type: 1,
// 				area: ['750px', '400px'],
// 				title: ['查看', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
// 				shade: 0.6,
// 				content: $('#Doc'),
// 				success: function() {
// 					var filepath = "\world.doc"
// 					//文档控制
// 					if (filepath && filepath.length > 0) {
// 						var html = [];
// 						html.push('<iframe src="\\CLOUDEASY-PC\share\新建文件夹\world.docx"  width="500" height="500"></iframe>');
// 						// html.push('<div class="FullScreen" id="Full">');
// 						// html.push('<div >');
// 						// html.push('<img src="../images/FullScreen.png"/>');
// 						// html.push('<span>全屏</span>');
// 						// html.push('</div>');
// 						// html.push('</div>');
// 						
// 						// $('#Doc').append(html.join(''));
// 					}
// 				}
// 
// 			})
// 		});
// 	}
}
layui.use(['laypage', 'layer'], function() {
	var laypage = layui.laypage,
		layer = layui.layer;
	//执行一个laypage实例
	laypage.render({
		elem: 'page',
		count: 100,
		theme: '#1E9FFF',
		layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
		jump: function(obj) {
			console.log(obj)
		}
	});
});



























// var layuiWindowuploadFile = function(){
// 	layui.use("layer",function(){
// 		var layer = layui.layer;
// 		layer.open({
// 			type: 1 //Page层类型
// 			,area: ['790px', '920px']
// 			,title: ['上传资源','background-color: #289ef0;text-align: center;font-size: 20px;color:white;']
// 			,shade: 0.6 //遮罩透明度
// 			,closeBtn:0
// 			,btn: ["确认"]
// 			,btnAlign: 'c'
// 			,content: 
// 			'<div class="layui-upload">'+
// 				'<button type="button" class="layui-btn layui-btn-normal" id="testList">选择多文件</button>'+
// 				'<div class="layui-upload-list">'+
// 					'<table class="layui-table">'+
// 						'<thead>'+
// 						'<tr>'+
// 						'<th>文件名</th>'+
// 						'<th>大小</th>'+
// 						'<th>状态</th>'+
// 						'<th>操作</th>'+
// 						'</tr>'+
// 						'</thead>'+
// 						'<tbody id="demoList"></tbody>'+
// 					'</table>'+
// 				'</div>'+
// 				'<button type="button" class="layui-btn" id="testListAction">开始上传</button>'+
// 			'</div>'
// 			// '<button class="changeFile layui-btn layui-btn-primary">选择文件</button>'+
// 			// '<table class="uploadFile-table">'+
// 			// '<colgroup>'+
// 			// 	'<col width="4.5%">'+
// 			// 	'<col width="2%">'+
// 			// 	'<col width="2%">'+
// 			// 	'<col width="2%">'+
// 			// 	'<col width="2%">'+
// 			// '</colgroup>'+
// 			// '<tr>'+
// 			// 	'<td>文件名</td>'+
// 			// 	'<td align="center">类型</td>'+
// 			// 	'<td align="center">大小</td>'+
// 			// 	'<td align="center">状态</td>'+
// 			// 	'<td align="center">操作</td>'+
// 			// '</tr>'+
// 			// '<tr>'+
// 			// 	'<td>资源1</td>'+
// 			// 	'<td align="center">文档</td>'+
// 			// 	'<td align="center">10MB</td>'+
// 			// 	'<td align="center">上传成功</td>'+
// 			// 	'<td align="center">删除</td>'+
// 			// '</tr>'+
// 			// '<tr>'+
// 			// 	'<td>资源2</td>'+
// 			// 	'<td align="center">音频</td>'+
// 			// 	'<td align="center">10MB</td>'+
// 			// 	'<td align="center">上传成功</td>'+
// 			// 	'<td align="center">删除</td>'+
// 			// '</tr>'+
// 			// '</table>'
// 		});
// 		layui.use('upload', function(){
// 		var upload = layui.upload;
// 
// });
// 	});
// }
