/**
 * @name: 
 * @authorï¼
 */


$(function() {
	$('.resorceMore').click(function(){
		window.location.href = "../ResourcePage/ResourcePage.html";
	});
	$('.taskMore').click(function(){
		window.location.href = "../TaskPage/TaskPage.html";
	});
	$('.testPaperMore').click(function(){
window.location.href = "../ExaminationPaperPage/ExaminationPaperPage.html";
	});
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
