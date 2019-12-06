$(function() {

	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;
		All.getMenu({
			search: 2,
			type: 2
		});

		info.Back();
		info.Verifiers();
	});
});

var info = {

	// 返回主页面
	Back: function() {
		$('#Back').off('click').on('click', function() {
			layer.open({
				type: 1,
				title: ['', 'color:#fff;background-color:#279EF0;text-align: center; font-size: 20px;'],
				move: false,
				skin: 'myskin',
				area: ['450px', '140px'],
				content: $('.back'),
				success: function() {
					$('.yes').off('click').on('click', function() {
						if (localStorage.getItem('userType') == 1) {
						    window.location.href = '../HomePage/HomePage.html'
						} else {
						    window.location.href = '../UserHomePage/UserHomePage.html'
						}
					});
					$('.no').off('click').on('click', function() {
						layer.closeAll();
					});
				},
			});
		});
	},
	// 密码校验
	Verifiers: function() {
		
		// 修改点击事件
		
		$('.confirm').off('click').on('click', function() {
			// 获取输入框内容
			var OriginalPassword = $('.layui-input-block .OriginalPassword').val();
			var NewPassWord = $('.NewPassWord').val();
			var ConfirmPassWord = $('.ConfirmPassWord').val();
			var reg = /[^\x00-\xff]/;
			// 非空校验/密码重复校验
			if (OriginalPassword == '' || OriginalPassword == null || OriginalPassword == undefined) {
				layer.msg('请输入原密码');
			} else if (NewPassWord == '' || NewPassWord == null || NewPassWord == undefined) {
				layer.msg('请输入新密码');
			} else if (ConfirmPassWord == '' || ConfirmPassWord == null || ConfirmPassWord == undefined) {
				layer.msg('请再次输入新密码进行确认');
			} else if (reg.test(OriginalPassword) || reg.test(NewPassWord) || reg.test(ConfirmPassWord)){
				layer.msg('输入框中不允许出现汉字，或全角符号');
			} else if (OriginalPassword == NewPassWord) {
				$('.NewWord').removeClass('hidden');
			} else if (NewPassWord != ConfirmPassWord) {
				$('.confirmWord').addClass('hidden');
				$('.wrongPassWord').removeClass('hidden');
			} else if (NewPassWord.length < 6) {
				layer.msg('密码最少设置6位');
			} else if (NewPassWord.length > 20) {
				layer.msg('密码最多设置20位');
			} else {
				// 获取现账户用户名和密码
				$.ajax({
					url: LBUrl + 'manage_system/user/password',
					data: {
						'originalPassword': OriginalPassword,
						'newPassWord': NewPassWord,
						'passwordValidation': ConfirmPassWord
					},
					dataType: 'json',
					type: 'POST',
					success(res) {
						if (res.data == '修改成功') {
							layer.msg(res.data+'！', function() {
								window.location.href = "../index.html";
							});
						} else {
							layer.msg(res.data+'！', function() {
							});
						}
					},
					error(fil) {
						console.log('请求接口失败');
					}
				});
			}
		});
	},

};
