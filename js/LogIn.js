$(function() {
    $('.logIn').off('click').on('click', function() {
    	var data = {
    		userName: $('#user').val(),
    		password: $('#pwd').val()
    	};
    	if (data.userName == '' || data.password == '') {
    		layer.msg('用户名或者密码不能为空');
    		return;
    	}
    	// $.ajax({
    	//     url: loginUrl + 'manage_system/login',
    	//     data:data,
    	//     dataType:'json',
    	//     type: "get",
    	//     success: function (res) {
    	// if(res.code == 1){
    	window.location.href = 'HomePage/HomePage.html'
    	// }else {
    	//     layer.msg(res.msg);
    	// }
    	//     },
    	//     error: function (e) {
    	//
    	//     }
    	// })
    })
});
