<<<<<<< HEAD
$(function() {
	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;
		All.getMenu({
			num: 6
		});
		layui.use(['layer', 'form', 'laypage'], function() {
			var layer = layui.layer,
				form = layui.form;

			var laypage = layui.laypage,
				layer = layui.layer;

			//执行一个laypage实例
			laypage.render({
				elem: 'page',
				count: 100,
				theme: '#1E9FFF',
				// layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
				layout: ['prev', 'page', 'next', 'limits', 'skip'],
				jump: function(obj) {
					console.log(obj);
=======
$(document).ready(function(){
	var first = 0;
	var second = 0;
	var third = 0;
	var fourth = 0;
	$.ajax({
		url: 'http://localhost:8888/manage_system/stat/task-type',
		data: {},
		dataType: 'json',
		type: 'GET',
		contentType: 'application/json;charset=utf-8',
		success(res) {
			console.log(res.data);
			res.data.forEach(function(item){
				console.log(item.taskType);
				first = first+1
				if(item.taskType == 1) {
					second = second+1
				}
				if(item.taskType == 2) {
					third = third+1
				}
				if(item.taskType == 3){
					fourth = fourth+1
				}
			})
			console.log(first);
			// toFixed
			var fifth = second / first * 100;
			var num1 = new Number(fifth);
			var sixth = third / first * 100;
			var num2 = new Number(sixth);
			var seventh = fourth / first * 100;
			var num3 = new Number(seventh);
			console.log(num1.toFixed(0) + "%");
			console.log(num2.toFixed(0) + "%");
			console.log(num3.toFixed(0) + "%");
			console.log(res.data);
			
		}
	});
});

$(function(){
	layui.use(['layer','form'],function(){
		var layer = layui.layer,
			form = layui.form;
		All.getMenu({
			num:2
		});
		layui.use(['layer','form','laypage'],function(){
			var layer = layui.layer,
				form = layui.form;
			var laypage = layui.laypage,
				layer = layui.layer;
			laypage.render({
				elem:'page',
				count:100,
				theme:'#1E9FFF',
				layout:['prev','page','next','limits','skip'],
				jump:function(obj){
					console.log(obj)
>>>>>>> remotes/origin/dev-MX
				}
			});
		});
	});
});

<<<<<<< HEAD
=======

>>>>>>> remotes/origin/dev-MX
layui.use(['laypage', 'layer'], function() {
	var laypage = layui.laypage,
		layer = layui.layer;
	//执行一个laypage实例
	laypage.render({
		elem: 'page',
		count: 100,
		theme: '#1E9FFF',
		layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
		jump: function(obj) {
<<<<<<< HEAD
			console.log(obj);
=======
			console.log(obj)
>>>>>>> remotes/origin/dev-MX
		}
	});
});
