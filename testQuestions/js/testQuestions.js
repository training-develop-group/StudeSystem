$(document).ready(function() {
	/*分页*/
	/*上传课件*/
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



	}
}
