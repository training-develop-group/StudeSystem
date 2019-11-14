(function($) {
	$.fn.clickSort = function(opts) {
		var defaults = {
			speed: 200
		}
		var option = $.extend(defaults, opts);
		this.each(function() {
			var _this = $(this);
			_this.on('click', '.moveup', function() {
				//两个要交换的对象
				var parent = $(this).parents('.sortableitem');
				var prevItem = parent.prev('.sortableitem');
				parent.css('width',parent.width());
				prevItem.css('width',parent.width());
				//要交换对象的值
				var parentnum = parent.find('.num').text();
				var prevItemnum = prevItem.find('.num').text();
				//需要被赋值的对象
				var parentnumNew = parent.find('.num');
				var prevItemnumNew = prevItem.find('.num');
				if (prevItem.length == 0) return;
				var parentTop = parent.position().top;
				var prevItemTop = prevItem.position().top;
				parent.css('visibility', 'hidden');
				prevItem.css('visibility', 'hidden');
				//重新赋值
				parentnumNew.text(prevItemnum);
				prevItemnumNew.text(parentnum);
				parent.clone().insertAfter(parent).css({
					position: 'absolute',
					visibility: 'visible',
					top: parentTop
				}).animate({
					top: prevItemTop
				}, option.speed, function() {
					$(this).remove();
					parent.insertBefore(prevItem).css('visibility', 'visible');
					option.callback();
				});
				prevItem.clone().insertAfter(prevItem).css({
					position: 'absolute',
					visibility: 'visible',
					top: prevItemTop
				}).animate({
					top: parentTop
				}, option.speed, function() {
					$(this).remove();
					prevItem.css('visibility', 'visible');
				});

				parent.css('width','calc(100% - 60px)');
				prevItem.css('width','calc(100% - 60px)');

			});
			_this.on('click', '.movedown', function() {
				//两个要交换的对象
				var parent = $(this).parents('.sortableitem');
				var nextItem = parent.next('.sortableitem');
				parent.css('width',parent.width());
				nextItem.css('width',parent.width());
				//要交换对象的值
				var parentnum = parent.find('.num').text();
				var nextItemnum = nextItem.find('.num').text();
				//需要被赋值的对象
				var parentnumNew = parent.find('.num');
				var nextItemnumNew = nextItem.find('.num');
				if (nextItem.length == 0) return;
				var parentTop = parent.position().top;
				var nextItemTop = nextItem.position().top;
				parent.css('visibility', 'hidden');
				nextItem.css('visibility', 'hidden');
				//重新赋值
				parentnumNew.text(nextItemnum);
				nextItemnumNew.text(parentnum);
				parent.clone().insertAfter(parent).css({
					position: 'absolute',
					visibility: 'visible',
					top: parentTop
				}).animate({
					top: nextItemTop
				}, option.speed, function() {
					$(this).remove();
					parent.insertAfter(nextItem).css('visibility', 'visible');
					option.callback();
				});
				nextItem.clone().insertAfter(nextItem).css({
					position: 'absolute',
					visibility: 'visible',
					top: nextItemTop
				}).animate({
					top: parentTop
				}, option.speed, function() {
					$(this).remove();
					nextItem.css('visibility', 'visible');
				});
				parent.css('width','calc(100% - 60px)');
				nextItem.css('width','calc(100% - 60px)');
			});

		});
	}
})(jQuery)


$('#changeBox').clickSort({
	speed: 500,
	callback: function() {
		// 　　　　alert('ok');
		//结束后的通知与方法

	}
});
