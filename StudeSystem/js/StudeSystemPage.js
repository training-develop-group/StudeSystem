/**
 * @name: 
 * @author：
 */


$(function() {
	
  layui.use(['layer', 'form'], function () {
        var layer = layui.layer, form = layui.form;

        All.getMenu({
            num:1
        });
    });


	$(".search").focus(function() {
		$('.searchIcon').hide();
	});
	$(".search").blur(function() {
		if ($('.search').val() == '')
			$('.searchIcon').show();
	});

});
