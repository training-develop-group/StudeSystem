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
		userName: $('#user').val(),
		password: $('#pwd').val()
	};
	if (data.userName == '' || data.password == '') {
		$('.PasswordError').text('*用户名、密码不可为空');
		$('.PasswordError').removeClass('hidden');
		return false;
	}
	$.ajax({
		url: MCUrl + 'manage_system/login',
		data: data,
		dataType: 'json',
		type: "GET",
		success: function(res) {
			console.log(res);
			if (res.code == 1) {
				if (res.data.stRoleId == 1) {
					$('.PasswordError').addClass('hidden');
					window.location.href = 'HomePage/HomePage.html'
				} else if (res.data.stRoleId == 2) {
					$('.PasswordError').addClass('hidden');
					window.location.href = 'UserHomePage/UserHomePage.html?value=' + res.data.userId
				}
			} else if (res.data == null) {
				$('.PasswordError').text('*用户名或密码错误');
				$('.PasswordError').removeClass('hidden');
			}
		},
		error: function(e) {

		}
	})
}
