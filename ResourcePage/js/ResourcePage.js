$(function() {
	layui.use(['layer', 'form', 'laypage'], function() {
		var layer = layui.layer,
			form = layui.form;
			
		var laypage = layui.laypage,
			layer = layui.layer;
			
		//执行一个laypage实例
		laypage.render({
			elem: 'page',
			count: 100,
			theme: '#1E9FFF',
			// layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
			layout: ['prev', 'page', 'next' , 'limits' , 'skip'],
			jump: function(obj) {
				console.log(obj)
			}
		});
			
			
		All.getMenu({
			num: 2
		});
		
		$('.EditorTestPaper').click(function() {
			console.log(1);
			// 跳转到试题
			window.location.href = "../ExaminationPaperPage/ExaminationPaperPage.html";
		});
		
		$('.testQuestions').click(function() {
			console.log(1);
			// 跳转到试题
			window.location.href = "../TestQuestions/TestQuestions.html";
		});
		
		
		$('.delete').click(function() {
			var deletethis = this;
			layer.msg('是否删除资源', {
				time: 20000, //20s后自动关闭
				btn: ['确认', '取消'],
				yes: function() {
					// 删除this的父级的父级
					$(deletethis).parent().parent().remove();
					layer.close(layer.index);
					layer.msg('删除成功');
				}
			});
		});
		
		
		
		// info.path();
		
		//调用音频弹出层方法
		// info.viewByAudioFileName();
		
		
		
		
		info.selectResourceList();	//查看
		
		info.uploadPopup();	//上传文件
		
		
		//调用视频弹出层方法
		// info.viewByVideoFileName();

		

		// 调用文档弹出层
		// info.viewByTextFileName();
		
		
	});

});
var info = {
	
	selectResourceList: function() {
		$.ajax({
			url: TDXUrl + 'manage_system/resource/resources',
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
						html.push('<td><a href="#" class="getResource" resId="'+ item.resId +'">' + item.resName + '</a></td>');
						html.push('<td class="centerText">' + '未发布' + '</td>');
						html.push('<td class="centerText">' + item.resType + '</td>');
						html.push('<td class="centerText">' + item.resSize + 'kb</td>');
						html.push('<td><a href="#" class="editResName" resId="'+ item.resId +'" resName="'+ item.resName +'">编辑</a><a href="#" class="release">发布</a><a href="#" class="deleteList" resId="'+ item.resId +'">删除</a></td>');
						html.push('</tr>');
					})
				}
				$('#contentList').html(html.join(''));
				
				//删除资源
				$('.deleteList').off('click').on('click',function() {
					var resId = $(this).attr("resId");
					layer.msg('是否删除资源', {
						time: 20000, //20s后自动关闭
						btn: ['确认', '取消'],
						yes: function() {
							console.log(resId);
							console.log('----------------------------------------------');
							info.deleteResource(resId);
							layer.close(layer.index);
							parent.location.reload();
							layer.msg('删除成功');
						}
					});
				});
				
				//编辑资源名
				$('.editResName').off('click').on('click',function() {
					var resId = $(this).attr("resId");
					var resName = $(this).attr("resName");
					$('.rename').val(resName);
					info.updatePopup(resId);
					
				});
				
				//获取资源详情
				$('.getResource').off('click').on('click', function() {
					var resId = $(this).attr("resId");
					info.getResource(resId);
				});
				
				//发布弹窗
				$('.release').off('click').on('click', function(){
					layer.msg('是否发布资源', {
						time: 20000, //20s后自动关闭
						btn: ['确认', '取消'],
						
					});
				})
			}
		});
	},
	
	
	deleteResource: function(resId) {
		$.ajax({
			url: TDXUrl + 'manage_system/resource/' + resId,
			data: {},
			dataType: 'json',
			type: 'DELETE',
			contentType: 'application/json;charset=utf-8',
			// success(res) {
			// 	alert('删除成功');
			// }
		});
	},
	
	
	//编辑资源名弹出层
	updatePopup: function(resId) {
		layer.open({
			type: 1 ,
			area: ['790px','220px'] ,
			title: ['编辑资源名', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'] ,
			shade: 0.6 ,
			btn: ['确认','取消'] ,
			btnAlign: 'c' ,
			content: $('#editResNameBox'),
			yes: function() {
				var resName = $('.rename').val();
				info.update(resId, resName);
				layer.close(layer.index);
			}
		});
	},
	
	//根据id来修改资源名
	update: function(resId, resName) {
		var data = {
			'resId':resId,
			'resName':resName
		}
		$.ajax({
			url: TDXUrl + 'manage_system/resource/res-name',
			data: data,
			dataType: 'json',
			type: 'POST',
			success(res) {
				console.log(res);
				layer.msg('修改成功');
			}
		});
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
				console.log(res);
			}
		});
	},
	
	
	path: function() {
		$.ajax({
			url: TDXUrl + 'manage_system/resource/view',
			data: {},
			dataType: 'json',
			type: 'POST',
			contentType: 'application/json;charset=utf-8',
			success(res){
				console.log(res);
			}
		});
	},
	
	
	
	//获取资源详情弹出层
	getResourcePopup: function() {
		layer.open({
			type: 1 ,
			area: ['790px', '320px'],
			title: ['资源详情', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
			shade: 0.6,
			content: $('#hiddenAudio'),
			
		});
		// $('#hiddenAudio').innerHTML = 
	},
	
	uploadPopup: function() {
		// $('#uploadFile').click(function() {
		$(document).on('click', '#uploadFile', function() {
			layui.use("layer", function() {
				var layer = layui.layer;
				layer.open({
					type: 1 ,	//Page层类型
					area: ['790px', '320px'],
					title: ['上传资源', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
					shade: 0.6 , 	//遮罩透明度
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
									url: TDXUrl + 'manage_system/resource/resource',
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
		var myAudio = document.getElementById('suspend');
		$(document).on('click', '.videoFileName', function() {
			layer.open({
				type: 1,
				area: ['750px', '400px'],
				title: ['查看', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
				shade: 0.6,
				content: $('#hiddenVideo'),
				end : function() {
					myAudio.pause();
				}
			})
		});
	},

	viewByAudioFileName: function() {
		$(document).on('click', '.audioFileName', function() {
			layer.open({
				type: 1,
				area: ['750px', '200px'],
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
