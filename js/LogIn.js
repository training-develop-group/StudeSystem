$(function() {
	$('.logIn').off('click').on('click', function() {
		var data = {
			userName: $('#user').val(),
			password: $('#pwd').val()
		};
		if (data.userName == '' || data.password == '') {
			layer.msg('用户名或者密码不能为空');
			return false;
		}
		$.ajax({
			url: MCUrl + 'manage_system/login',
			data:data,
			dataType:'json',
			type: "GET",
			success: function (res) {
				console.log(res);
				if(res.code == 1){
					// window.location.href = 'HomePage/HomePage.html'
					console.log(res.msg);
				}else {
					layer.msg(res.msg);
				}
			},
			error: function (e) {
		
			}
		})
		
	})
});
