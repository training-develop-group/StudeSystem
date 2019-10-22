$(document).ready(function() {
	/*分页*/
	/*上传课件*/
	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;
			
		All.getMenu({
			num: 5
		});
		$('.EditorTestPaper').click(function() {
			console.log(1);
			// 跳转到试题
			window.location.href = "../TestPaper/TestPaper.html";
		});
		
		$('.resource').click(function() {
			console.log(2);
			// 跳转到资源
			window.location.href = "../Resource/ResourcePage.html";
		});
		
	});
	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;

		// layer.msg('Hello World'); 

		info.popup();
	});
})

var info = {
	popup: function() {
		$('.NewTestQuestion').off('click').on('click', function() {

			layer.open({
				type: 1,
				title: false,
				title: ['新建试题',
					'background-color: #279ef0;text-align: center;font-size: 16px;line-height: 50px;color:white;letter-spacing: 5px;padding: 0px;'
				],
				area: ['660px', '755px'],
				resize: false,
				move: false,
				content: $('#newlyBuild')
			});
		});
		$('.questions .operation .view').off('click').on('click', function() {
			layer.open({
				type: 1,
				title: false,
				area: ['600px', '300px'],
				closeBtn: 0,
				resize: false,
				move: false,
				content: $('.PopupAnalysis'),
				btn: '确认',
				btnAlign: 'c',
			});
		});
		$('.questions .operation .edit').off('click').on('click', function() {
			layer.open({
				type: 1,
				title: false,
				title: ['编辑试题',
					'background-color: #279ef0;text-align: center;font-size: 16px;line-height: 50px;color:white;letter-spacing: 5px;padding: 0px;'
				],
				area: ['660px', '755px'],
				resize: false,
				move: false,
				content: $('#newlyBuild')
			});
		});
		$('.sort em').off('click').on('click', function() {
			$('em').removeClass('emColor');
			$(this).addClass('emColor');
		});
		layui.use('form', function() {
			var form = layui.form;
			form.on('radio(beshared)', function(data) {
				var name = '';
				var Html = [];
				Html.push(
					'<input type="radio" name="choiceItem" value="A" title="A"><textarea name="" required lay-verify="required" class="layui-textarea optionA option"></textarea>'
				);
				Html.push(
					'<br /><input type="radio" name="choiceItem" value="B" title="B"><textarea name="" required lay-verify="required" class="layui-textarea optionB option"></textarea>'
				);
				Html.push(
					'<br /><input type="radio" name="choiceItem" value="C" title="C"><textarea name="" required lay-verify="required" class="layui-textarea optionC option"></textarea>'
				);
				Html.push(
					'<br /><input type="radio" name="choiceItem" value="D" title="D"><textarea name="" required lay-verify="required" class="layui-textarea optionD option"></textarea>'
				);
				var Htmls = [];
				Htmls.push(
					'<input type="checkbox" lay-skin="primary" name="choiceItem" value="A" title="A"><textarea name="" required lay-verify="required" class="layui-textarea optionA option"></textarea>'
				);
				Htmls.push(
					'<br /><input type="checkbox" lay-skin="primary" name="choiceItem" value="B" title="B"><textarea name="" required lay-verify="required" class="layui-textarea optionB option"></textarea>'
				);
				Htmls.push(
					'<br /><input type="checkbox" lay-skin="primary" name="choiceItem" value="C" title="C"><textarea name="" required lay-verify="required" class="layui-textarea optionC option"></textarea>'
				);
				Htmls.push(
					'<br /><input type="checkbox" lay-skin="primary" name="choiceItem" value="D" title="D"><textarea name="" required lay-verify="required" class="layui-textarea optionD option"></textarea>'
				);
				if (data.value == '单选题') {
					$('.choiceItem').html(Html.join(''));
					name = 'radio';
					judged = true;
				} else {
					$('.choiceItem').html(Htmls.join(''));
					name = 'checkbox';
					judged = false;
				}
				// 重新渲染
				layui.use('form', function() {
					var form = layui.form;
					form.render(name);
				});
			});
		});
		var judged = true;
		$('.addOptions').click(function() {
			var letter = '';
			if ($('.choiceItem').html() == '' || $('.choiceItem').html() == null || $('.choiceItem').html() == undefined) {
				alert("没有选项,自动为您添加选项");
				letter = 'A';
			}
			if (letter == '') {
				// 取选项最后一个字母
				var tailLetter = ($('.choiceItem input').last()).val();
				// 转换为数字
				var transformation = (tailLetter.charCodeAt(0)) + 1;
				// 在转换为小写字母，然后在转换为大写字母
				letter = (String.fromCharCode(transformation)).toUpperCase();
			} else {
				letter = 'A';
			}
			// true是单选,false是多选
			if (judged == true) {
				$(".choiceItem").append('<p class="outerFrame"><input type="radio" name="choiceItem" value="' + letter +
					'" title="' + letter +
					'"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>');
			} else if (judged == false) {
				$(".choiceItem").append(
					'<p class="outerFrame"><input type="checkbox" lay-skin="primary" name="choiceItem" value="' + letter +
					'" title="' + letter +
					'"><textarea name="" required lay-verify="required" class="layui-textarea option"></textarea></p>');
			}
			// 重新渲染
			layui.use('form', function() {
				var form = layui.form;
				form.render(name);
			});
		});
		$('.deleteOptions').click(function() {
			$(".outerFrame").eq(-1).remove();
		});
		$('#confirmAdd').off('click').on('click', function() {
			var content = $('#content').val();
			var optionContent = [];
			var optionIsRight = [];
			$('.outerFrame').each(function() {
				optionContent.push($(this).find('.option').val());
				
			})
			var analysis = $('#analysis').val();
			console.log(optionContent);


		});



	}
}
