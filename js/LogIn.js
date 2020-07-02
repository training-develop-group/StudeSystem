$(function() {
	$('.inputBox').keypress(function(e) {
		if (e.which == 13) {
			logIn();
		}
	});
	$('.logIn').off('click').on('click', function() {
		logIn();
	});

});
var logIn = function() {
	var data = {
		 companyId:$('#companyId').val(),
		 userName: $('#user').val(),
		 password: $('#pwd').val(),
		 type:1

	};
	if (data.userName == '' || data.password == ''||data.companyId=='') {
		$('.PasswordError').text('！用户名、密码、公司id不可为空');
		$('.PasswordError').removeClass('hidden');
		return false;
	}

	$.ajax({
		url: LoginUrl +'/emplogin',
		data: data,
		dataType: 'json',
		type: "POST",
		success: function(res) {

			if (res.code == 0) {
				// 写入token
				window.sessionStorage.setItem("_token", res.message.token);

				if (res.message.userInfo.stRoleId == 1) {
					localStorage.setItem('userName', res.message.userInfo.userName);
					localStorage.setItem('userType', res.message.userInfo.stRoleId);
					$('.PasswordError').addClass('hidden');
					window.location.href = './HomePage/HomePage.html'
				} else if (res.message.userInfo.stRoleId == 2) {
					localStorage.setItem('userName', res.message.userInfo.userName);
					localStorage.setItem('userType', res.message.userInfo.stRoleId);
					$('.PasswordError').addClass('hidden');
					window.location.href = './UserHomePage/UserHomePage.html?value=' + res.message.userInfo.pkId + "," + 2
				}

			} else if (res.code == 902) {
				$('.PasswordError').text('！用户名或密码错误');
				$('.PasswordError').removeClass('hidden');
			} else {
				layer.msg(res.message);
			}
		},
		error: function(e) {

		}
	})
};
