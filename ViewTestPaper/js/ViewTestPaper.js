$(function() {

	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;
			
		All.getMenu({
			num: 1
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
		// newTestPaper();
		alert("暂无此功能");
	});
	
	$('.mobileFramework').clickSort({
	    speed:500,
	　　callback:function(){
		// alert('ok');
		// 结束后的通知与方法
	　　}
	});
	// 单选取值
	// $('.distance').click(function() {
	// 	var zhi = $("input[name = 'Sketch']:checked").val();
	// 	console.log(zhi);
	// });
	// 复选框取值
	// $(".distance").click(function(){
	// 	var arr = new Array();
	// 	$(".sortableitem input:checkbox[name='Sketch']:checked").each(function(i){
	// 	arr[i] = $(this).val();
	// });
	// 	var vals = arr.join(",");
	// 	console.log(vals,222);
	// });
	// 单选取值
	$('.toView').click(function() {
		info.toViewAnalysis();
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
		
		// data.list.forEach(function(item, index) {
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
			// Html.push('<button class="fraction"><img src="../imgs/f.png"  alt="" />设定分值</button>');
			// Html.push('<button class="edit"><i class="layui-icon layui-icon-edit"></i>编辑</button>');
			// Html.push('<button class="moveOut"><i class="layui-icon layui-icon-delete"></i>移出</button>');
			// Html.push('<button class="moveup"><i class="layui-icon layui-icon-up"></i>上移</button>');
			// Html.push('<button class="movedown"><i class="layui-icon layui-icon-down"></i>下移</button>');
			Html.push('</div>');
			Html.push('</li>');
		// });
		
		$('.mobileFramework').html(Html.join(''));
		
		info.Page(); //分页
	},
	// 查看解析(弹窗)
	toViewAnalysis : function(){
		layui.use("layer", function() {
			var layer = layui.layer;
			layer.open({
				type: 1 //Page层类型
				,closeBtn: 0
				,area: ['790px', '300px']
				,title: ['查看解析', 'background-color: #279ef0;text-align: center;font-size: 16px;line-height: 50px;color:white;letter-spacing: 5px;padding: 0px;']
				// ,shade: 0.6 //遮罩透明度
				,content: '<div class="answerContent">'
				+ '<p>正确答案：<span class="answerOptions">A</span></p>'
				+ '<p>答案解析：</p>'
				+ '<p class="analysis">《如此包装》是由由二群执导，石林、沈永年创作，赵丽蓉、巩汉林、孟薇等表演的小品，于1995年1月30日在《1995年中央电视台春节联欢晚会》上演出。</p>'
				+ '</div>'
				,btn: ['确认'] //可以无限个按钮
				,btn1: function(index, layero){
					//按钮【确认】的回调
					layer.close(index);
				}
			});
		});
	}
	
}