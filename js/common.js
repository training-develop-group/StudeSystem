/**
 * @name: common
 * @author：
 */
$(function() {
	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;


		All.getMenu();
	});
});

var All = {
	getMenu: function(options) {
		if (options && options != null) {
			var navHtml = [];
			navHtml.push('<div class="headerBox">');
			navHtml.push('<div class="logobox">');
			// navHtml.push('<span>logo</span>');
			navHtml.push('<img src="../imgs/logo.png" alt="logo" class="logo"/>');
			navHtml.push('</div>');
			navHtml.push('<div class="navbox">');
			switch (options.type) {
				case 1:
					navHtml.push('<ul>');
					switch (options.num) {
						case 1:
							navHtml.push('<li class="active" data-page="homePage">首页</li>');
							navHtml.push('<li data-page="resource">资源</li>');
							navHtml.push('<li data-page="taskPage">任务</li>');
							navHtml.push('<li data-page="EditorTestPaper">试卷</li>');
							navHtml.push('<li data-page="testQuestions">试题</li>');
							navHtml.push('<li data-page="StatisticsPage">统计</li>');
							// navHtml.push('<li data-page="userManagement">用户管理</li>')
							break;
						case 2:
							navHtml.push('<li data-page="homePage">首页</li>');
							navHtml.push('<li class="active" data-page="resource">资源</li>');
							navHtml.push('<li data-page="taskPage">任务</li>');
							navHtml.push('<li data-page="EditorTestPaper">试卷</li>');
							navHtml.push('<li data-page="testQuestions">试题</li>');
							navHtml.push('<li data-page="StatisticsPage">统计</li>');
							// navHtml.push('<li data-page="userManagement">用户管理</li>')
							break;
						case 3:
							navHtml.push('<li  data-page="homePage">首页</li>');
							navHtml.push('<li data-page="resource">资源</li>');
							navHtml.push('<li class="active" data-page="taskPage">任务</li>');
							navHtml.push('<li data-page="EditorTestPaper">试卷</li>');
							navHtml.push('<li data-page="testQuestions">试题</li>');
							navHtml.push('<li data-page="StatisticsPage">统计</li>');
							// navHtml.push('<li data-page="userManagement">用户管理</li>')
							break;
						case 4:
							navHtml.push('<li id="homePage"  data-page="homePage">首页</li>');
							navHtml.push('<li id="resource"  data-page="resource">资源</li>');
							navHtml.push('<li id="taskPage" data-page="taskPage">任务</li>');
							navHtml.push('<li class="active"  data-page="EditorTestPaper">试卷</li>');
							navHtml.push('<li id="testQuestions" data-page="testQuestions">试题</li>');
							navHtml.push('<li data-page="StatisticsPage">统计</li>');
							// navHtml.push('<li data-page="userManagement">用户管理</li>')
							break;
						case 5:
							navHtml.push('<li data-page="homePage">首页</li>');
							navHtml.push('<li data-page="resource">资源</li>');
							navHtml.push('<li data-page="taskPage">任务</li>');
							navHtml.push('<li data-page="EditorTestPaper">试卷</li>');
							navHtml.push('<li class="active" data-page="testQuestions">试题</li>');
							navHtml.push('<li data-page="StatisticsPage">统计</li>');
							// navHtml.push('<li data-page="userManagement">用户管理</li>')
							break;
						case 6:
							navHtml.push('<li data-page="homePage">首页</li>');
							navHtml.push('<li data-page="resource">资源</li>');
							navHtml.push('<li data-page="taskPage">任务</li>');
							navHtml.push('<li data-page="EditorTestPaper">试卷</li>');
							navHtml.push('<li data-page="testQuestions">试题</li>');
							navHtml.push('<li class="active" data-page="StatisticsPage">统计</li>');
							// navHtml.push('<li data-page="userManagement">用户管理</li>')
							break;
						case 7:
							navHtml.push('<li data-page="homePage">首页</li>');
							navHtml.push('<li data-page="resource">资源</li>');
							navHtml.push('<li data-page="taskPage">任务</li>');
							navHtml.push('<li data-page="EditorTestPaper">试卷</li>');
							navHtml.push('<li data-page="testQuestions">试题</li>');
							navHtml.push('<li data-page="StatisticsPage">统计</li>');
							// navHtml.push('<li class="active" data-page="userManagement">用户管理</li>')
							break;
					}
					navHtml.push('</ul>');
					break;
				case 2:
					break;
			}
			navHtml.push('</div>');
			navHtml.push('<div class="rightBox">');
			navHtml.push('<div class="right">');
			navHtml.push('<img src="../imgs/HeadPortrait.jpg" class="userimg">');
			navHtml.push('<span class="username">用户名</span>');
			navHtml.push('<img src="./../imgs/et.png" class="logout">');
			navHtml.push('</div>');
			navHtml.push('<div class="left">');
			// search 搜索框是否显示
			switch (options.search) {
				case 1:
					navHtml.push('<div class="searchbox">');
					navHtml.push('<img src="./../imgs/search.jpg" class="iconSearch">');
					navHtml.push('<input type="text" class="search" name="" value="" />');
					navHtml.push('</div>');
					break;
				case 2:
					break;
			}
			navHtml.push('</div>');
			navHtml.push('</div>');
			navHtml.push('</div>');

			$('#header').html(navHtml.join(''));

			// 导航的点击切换跳转
			All.navClick();
			// 退出登陆
			All.logOut()
		}
	},
	// 导航的点击切换跳转
	navClick: function() {
		$('body').delegate('#header .navbox li', 'click', function() {
			// $('.header .navbox li').click(function () {
			console.log('111');
			if ($(this).hasClass('active')) {
				return false;
			} else {
				$(this).attr('data-page')
				switch ($(this).attr('data-page')) {
					case 'homePage':
						window.location.href = "../HomePage/HomePage.html";
						break;
					case 'resource':
						window.location.href = "../ResourcePage/ResourcePage.html";
						break;
					case 'taskPage':
						window.location.href = "../TaskPage/TaskPage.html";
						break;
					case 'EditorTestPaper':
						window.location.href = "../ExaminationPaperPage/ExaminationPaperPage.html";
						break;
					case 'testQuestions':
						window.location.href = "../TestQuestions/TestQuestions.html";
						break;
					case 'StatisticsPage':
						window.location.href = "../StatisticsPage/StatisticsPage.html";
						break;
					case 'userManagement':
						break;
				}
			}
		});

	},
	// 退出登陆
	logOut: function() {
		$('body').delegate('.logout', 'click', function() {
			layer.open({
				type: 1,
				skin: 'logOut',
				area: ['450px', '180px'],
				move: false,
				title: ['注销登陆', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
				shade: 0.6,
				closeBtn: 0,
				content: "<p class=''>是否确认注销</p><div class='btn-box'><button class='layui-btn layui-btn-sm layui-btn-normal ok'>确认</button><button class='layui-btn layui-btn-sm no'>取消</button></div>",
				success: function(res) {
					$('.ok').off('click').on('click', function() {
						$(this).attr('disabled', 'disabled');
						layer.close(layer.index);
						window.location.href = "../index.html";
						localStorage.removeItem('userType');
						$('.ok').remove('disabled');
					});
					$('.no').off('click').on('click', function() {
						layer.close(layer.index);
					});
				}
			})
		})
	},
	// 删除方法
	layuiOpen: function(options) {
		if (options && options != null) {
			layer.open({
				type: 1,
				// skin:'yes',
				area: ['400px', '200px'],
				move: false,
				title: ['', 'background-color: #289ef0;'],
				// btn: ['确认', '取消'],
				content: '<p class="openText">' + options.msg + '</p>' +
					'<div class="btn">' +
					'<button data-id="' + options.id + '" class="yes" >确认</button>' +
					'<button class="no">取消</button>' +
					'</div>',
				success: function() {

					$('.yes').off('click').on('click', function() {
						$(this).attr('disabled', 'disabled');
						switch (options.num) {
							case 1:
								info.deleteResource(options.resId, options.index);
								$(options.deleteThis).remove();
								layer.close(layer.index);
								layer.msg('删除成功');
								break;
							case 2:
								// 试卷
								info.deletePaper(options.paperId);
								layer.close(layer.index);
								layer.msg('删除成功');
								break;
							case 3:
								info.delectTask(options.taskId);
								layer.close(layer.index);
								layer.msg('删除成功');
								break;
							case 4:
								// 试卷
								layer.close(layer.index);
								info.releaseTask();
								break;
							case 5:
								// 试题删除
								info.deleteQuestions(options.questionId, options.status);
								layer.close(layer.index);
								layer.msg('删除成功');
								break;
						}

					});

					$('.no').off('click').on('click', function() {
						layer.close(layer.index);
					});
				},
			});
		}
	},
	// 修改方法
	layuiOpenRename: function(options) {
		if (options && options != null) {
			// layui.use("layer", function() {
			// 	var layer = layui.layer;
			layer.open({
				type: 1 //Page层类型
					,
				closeBtn: 1,
				move: false,
				area: ['780px', '210px'],
				title: ['重命名',
						'background-color: #279ef0;text-align: center;font-size: 20px;line-height: 42px;color:white;padding: 0px;cursor: default;'
					]
					// ,shade: 0.6 //遮罩透明度
					,
				content: '<div class="common-inputLocation">' +
					'<span maxlength="60">' + options.msg + '</span>' +
					'<input type="text" autocomplete="off" class="layui-input common-acquiredValue">' +
					'</div>' +
					'<div class="common-btn-box">' +
					'<button type="button" data-id="' + options.id +
					'" class="layui-btn layui-btn-primary common-confirm">确认</button>' +
					'<button type="button" class="layui-btn layui-btn-primary common-cancel">取消</button>' +
					'</div>',
				success: function() {
					$('.common-acquiredValue').val(options.returnValue);
					// 点击确认
					$('.common-confirm').off('click').on('click', function() {

						console.log('1');
						var name = $('.common-acquiredValue').val();
						if (name == '') {
							layer.msg("重命名不可为空");
							return false;
						}
						var blank = /^[\s]*$/; //空白符和字符串，字符串
						if (blank.test(name)) {
							layer.msg("重命名不可全是空格");
							return false;
						}
						$(this).attr('disabled', 'disabled');
						switch (options.num) {
							case 1:
								// 修改方法(试卷)
								info.rename(options.id, name);
								break;
							case 2:
								// 修改方法(资源)
								info.updateResName(options.id, name);
								break;
							case 3:
								// 修改方法(任务)
								info.updateTaskName(options.id, name);
								break;
						}

                        layer.closeAll();

                        $('.common-confirm').removeAttr('disabled');
					});

					// 点击取消
					$('.common-cancel').off('click').on('click', function() {
						layer.closeAll();
					});
				}
			});
		};
	},
};
