$(function() {

	// 评论区js
    $('#btnComment').click(function(){

            var content= $("#contentOne").val();
            var time = new Date(); 
            var year = time.getFullYear(); 
            var mouth = time.getMonth() + 1;
            var day = time.getDate();
            var hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
            var minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
            var second = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
            var weekIndex = time.getDay();   
            var newTime=year+"-"+mouth+"-"+day+"    "+hour+":"+minutes+":"+second
            if(content === ""){
                alert("请输入评论内容");
            }else{
        
                $("#contentList").append("<li>"+content+"<p>"+newTime+"</p>"+"</li>");
                 document.getElementById("contentOne").value = ""
             
            }

           
          

    })

     // 评论区js-end

	$(".search").focus(function() {
		$('.searchIcon').hide();
	});
	$(".search").blur(function() {
		if ($('.search').val() == '')
			$('.searchIcon').show();
	});
	 layui.use(['layer', 'form'], function () {
	        var layer = layui.layer, form = layui.form;
	
	        All.getMenu({
	            num:2
	        });
	    });
});