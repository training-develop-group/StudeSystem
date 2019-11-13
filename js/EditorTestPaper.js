$(function() {

	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;
			
		All.getMenu({
			num: 4
		});
		$('.testQuestions').click(function() {
			console.log(1);
			// 跳转到试题
			window.location.href = "../testQuestions/testQuestions.html";
		});
		
		$('.resource').click(function() {
			console.log(2);
			// 跳转到资源
			window.location.href = "../Resource/ResourcePage.html";
		});
	});
	layui.use('form', function() {
		var form = layui.form;
		info.init();
	});
	
	$(".search").focus(function() {
		$('.searchIcon').hide();
	});
	$(".search").blur(function() {
		if ($('.search').val() == '')
		$('.searchIcon').show();
	});
	// 新建试卷
	$('#newTestPaper').click(function() {
		info.newTestPaper();
	});
	
	$('.mobileFramework').clickSort({
	    speed:500,
	　　callback:function(){
		// alert('ok');
		// 结束后的通知与方法
	　　}
	});
	// 判断是单选还是多选
	var judged = true;
	// 弹窗确认按钮
	$('#confirmAdd').click(function() {
		// true是单选,false是多选
		if (judged == true){
			var singleChoice = $("input[name='choiceItem']:checked").val();
			console.log(singleChoice);
		} else if (judged == false) {
			var multipleSelection = '';
			$("input:checkbox[name='choiceItem']:checked").each(function() { // 遍历name=standard的多选框
			    multipleSelection += ',' + $(this).val();
			});
			console.log(multipleSelection);
		}
		// layer.closeAll();		// 关闭页面
		parent.location.reload();		// 刷新页面
		// 清空选择
		layui.use('form', function () {
			var form = layui.form;
			form.render(name);
			$('input[name = selectionType]').prop('checked' , false);
			$('input[name = choiceItem]').prop('checked' , false);
			form.render('radio');
			form.render('checkbox');
		});
		// 清空输入框数据
		$('.titleInputBox').val('');
		$('.option').val('');
		$('.parseInputBox').val('');
	});
	// 添加选项
	$('.addOptions').click(function() {
		var letter = '';
		if ($('.choiceItem').html() == '' || $('.choiceItem').html() == null || $('.choiceItem').html() == undefined){
			// alert("没有选项,自动为您添加选项");
			letter = 'A';
		}
		if (letter == ''){
			// 取选项最后一个字母
			var tailLetter = ($('.choiceItem input').last()).val();
			// 转换为数字
			var transformation = (tailLetter.charCodeAt(0)) + 1;
			// 在转换为小写字母，然后在转换为大写字母
			letter = (String.fromCharCode(transformation)).toUpperCase();
		} else {
			letter = 'A';
		}
		console.log(letter);
		if (letter == '['){
			layer.msg('拒绝让你添加选项，有脾气吗？', {
			  time: 0 //不自动关闭
			  ,btn: ['有', '没有']
			  ,yes: function(index){
			    layer.close(index);
			    layer.msg('怎么？砍你好啊', {
			      icon: 6
			      ,btn: ['投降','不投降']
			    });
			  }
			});
			return false;
		}
		// true是单选,false是多选
		if (judged == true){
			$(".choiceItem").append('<p class="outerFrame"><input type="radio" name="choiceItem" value="' + letter + '" title="' + letter + '"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>');
		} else if (judged == false) {
			$(".choiceItem").append('<p class="outerFrame"><input type="checkbox" lay-skin="primary" name="choiceItem" value="' + letter + '" title="' + letter + '"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>');
		}
		// 重新渲染
		layui.use('form', function () {
			var form = layui.form;
			form.render(name);
		});
	});
	// 删除选项
	$('.deleteOptions').click(function() {
		$(".outerFrame").eq(-1).remove();
	});
	// 点击移出，删除本身
	$('.moveOut').click(function() {
		// 删除this的父级的父级
		$(this).parent().parent().remove();
	});
	
	// 弹窗里的单选题/多选题	分别调用什么事件(监听)
	layui.use('form', function () {
		var form = layui.form;
		form.on('radio(beshared)', function (data) {
			var name = '';
			var Html = [];
			Html.push('<p class="outerFrame"><input type="radio" name="choiceItem" value="A" title="A"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>');
			Html.push('<p class="outerFrame"><input type="radio" name="choiceItem" value="B" title="B"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>');
			Html.push('<p class="outerFrame"><input type="radio" name="choiceItem" value="C" title="C"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>');
			Html.push('<p class="outerFrame"><input type="radio" name="choiceItem" value="D" title="D"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>');
			var Htmls = [];
			Htmls.push('<p class="outerFrame"><input type="checkbox" lay-skin="primary" name="choiceItem" value="A" title="A"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>');
			Htmls.push('<p class="outerFrame"><input type="checkbox" lay-skin="primary" name="choiceItem" value="B" title="B"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>');
			Htmls.push('<p class="outerFrame"><input type="checkbox" lay-skin="primary" name="choiceItem" value="C" title="C"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>');
			Htmls.push('<p class="outerFrame"><input type="checkbox" lay-skin="primary" name="choiceItem" value="D" title="D"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>');
			if (data.value == '单选题'){
				$('.choiceItem').html(Html.join(''));
				name = 'radio';
				judged = true;
			} else {
				$('.choiceItem').html(Htmls.join(''));
				name = 'checkbox';
				judged = false;
			}
			// 重新渲染
			layui.use('form', function () {
				var form = layui.form;
				form.render(name);
			});
		});
	});
	// 隐藏确认完成和加入试题按钮
	$('.joinIn').hide();
	$('.confirmCompletion').hide();
	$('.totalNumberOfQuestions').hide();
	// 点击编辑
	$('.edit').click(function() {
		$('.joinIn').show();
		$('.confirmCompletion').show();
		$('.totalNumberOfQuestions').show();
		$('.fraction').hide();
		$('.edit').hide();
		$('.moveOut').hide();
		$('.moveup').hide();
		$('.movedown').hide();
		$('.fraction').hide();
	});
	
	// 点击确认完成
	$('.confirmCompletion').click(function() {
		$('.joinIn').hide();
		$('.confirmCompletion').hide();
		$('.totalNumberOfQuestions').hide();
		$('.fraction').show();
		$('.edit').show();
		$('.moveOut').show();
		$('.moveup').show();
		$('.movedown').show();
		$('.fraction').show();
	});
});

var info = {
	//页面主方法
	init: function() {
		layui.use('form', function() {
			var form = layui.form;
			form.render('select');
		});
		// info.TableDrawing();
	},
	//表格数据请求
	TableDataRequest: function() {
		$.ajax({
			url: '',
			data: {
			},
			dataType: 'json',
			Type: 'GET',
			success: function(res) {
				if (res || res.data !== null) {
					info.TableDrawing(res.data);
				}
			},
			error: function(e) {
	
			}
		});
	},
	//表格会绘制
	TableDrawing: function() {
		var Html = [];
		var data = {
			// total: data.total,
			// list: data.list,
			// pageNum: data.pageNum
		};
		
		data.list.forEach(function(item, index) {
			Html.push('<li class="sortableitem">');
			Html.push('<div class="topicFramework">');
			Html.push('<p class="num">1.单选题（2018）</p>');
			Html.push('<p class="distance">春季里开花，十四五六。这一词，出现在那个小品里（）</p>');
			Html.push('<p class="distance">A. 如此包装</p>');
			Html.push('<p class="distance">B. 打工奇遇</p>');
			Html.push('<p class="distance">C. 功夫令</p>');
			Html.push('<p class="distance">D. 追星族</p>');
			Html.push('</div>');
			Html.push('<div class="functionBox">');
			Html.push('');
			Html.push('<button class="toView"><i class="layui-icon layui-icon-search"></i>查看解析</button>');
			Html.push('<button class="fraction"><img src="../../imgs/f.png"  alt="" />设定分值</button>');
			Html.push('<button class="edit"><i class="layui-icon layui-icon-edit"></i>编辑</button>');
			Html.push('<button class="moveOut"><i class="layui-icon layui-icon-delete"></i>移出</button>');
			Html.push('<button class="moveup"><i class="layui-icon layui-icon-up"></i>上移</button>');
			Html.push('<button class="movedown"><i class="layui-icon layui-icon-down"></i>下移</button>');
			Html.push('</div>');
			Html.push('</li>');
		});
		
		$('.mobileFramework').html(Html.join(''));
		
		info.Page(); //分页
	},
	// 分页
	Page : function(){
		layui.use(['laypage', 'layer'], function() {
			var laypage = layui.laypage,
				layer = layui.layer;
			//完整功能
			laypage.render({
				elem: 'paging',
				// count: data.total,
				count: 100,
				limit: 10,
				theme: '#279ef0',
				// curr: data.pageNum,
				// groups: '5',
				// layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
				layout: ['prev', 'page', 'next' , 'count' , 'skip'],
				jump: function(item , first) {
					if (!first){
						console.log(first);
					}
				}
			});
		});
	},
	newTestPaper : function(){
		layui.use("layer", function() {
			var layer = layui.layer;
			layer.open({
				type: 1 //Page层类型
				,closeBtn: 0
				,area: ['660px', '755px']
				,title: ['新建试题', 'background-color: #279ef0;text-align: center;font-size: 16px;line-height: 50px;color:white;letter-spacing: 5px;padding: 0px;']
				// ,shade: 0.6 //遮罩透明度
				,content: $('#newlyBuild')
				// ,btn: ['确认'] //可以无限个按钮
				// ,btn1: function(index, layero){
				// 	//按钮【确认】的回调
				// 	layer.close(index);
				// }
			});
		});
	}
}