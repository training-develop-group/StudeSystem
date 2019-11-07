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
    getMenu: function (options) {
        if (options && options != null) {
            var navHtml = [];
            navHtml.push('<div class="headerBox">');
            navHtml.push('<div class="logobox">');
            navHtml.push('<span>Logo</span>');
            navHtml.push('</div>');
            navHtml.push('<div class="navbox">');
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
            navHtml.push('</div>');
            navHtml.push('<div class="right">');
            navHtml.push('<img src="../imgs/HeadPortrait.jpg" class="userimg">');
            navHtml.push('<span class="username">用户名</span>');
            navHtml.push('<img src="./../imgs/et.png" class="logout">');
            navHtml.push('</div>');
            navHtml.push('<div class="left">');
            // search 搜索框是否显示
            switch (options.num) {
                case 1:
                    break;
                case 2:
                    navHtml.push('<div class="searchbox">');
                    navHtml.push('<img src="./../imgs/search.jpg" class="iconSearch">');
                    navHtml.push('<input type="text" class="search" name="" value="" />');
                    navHtml.push('</div>');
                    break;
                case 3:
                    navHtml.push('<div class="searchbox">');
                    navHtml.push('<img src="./../imgs/search.jpg" class="iconSearch">');
                    navHtml.push('<input type="text" class="search" name="" value="" />');
                    navHtml.push('</div>');
                    break;
                case 4:
                    navHtml.push('<div class="searchbox">');
                    navHtml.push('<img src="./../imgs/search.jpg" class="iconSearch">');
                    navHtml.push('<input type="text" class="search" name="" value="" />');
                    navHtml.push('</div>');
                    break;
                case 5:
                    navHtml.push('<div class="searchbox">');
                    navHtml.push('<img src="./../imgs/search.jpg" class="iconSearch">');
                    navHtml.push('<input type="text" class="search" name="" value="" />');
                    navHtml.push('</div>');
                    break;
                case 6:
                    navHtml.push('<div class="searchbox">');
                    navHtml.push('<img src="./../imgs/search.jpg" class="iconSearch">');
                    navHtml.push('<input type="text" class="search" name="" value="" />');
                    navHtml.push('</div>');
                    break;
                case 7:
                    navHtml.push('<div class="searchbox">');
                    navHtml.push('<img src="./../imgs/search.jpg" class="iconSearch">');
                    navHtml.push('<input type="text" class="search" name="" value="" />');
                    navHtml.push('</div>');
                    break;
            }
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
    navClick: function () {
        $('body').delegate('#header .navbox li', 'click', function () {
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
    logOut: function () {
        $('body').delegate('.logout', 'click', function () {
            layer.open({
                type: 1,
                skin: 'logOut',
                area: ['450px', '180px'],
                title: ['注销登陆', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
                shade: 0.6,
                closeBtn: 0,
                content: "<p class=''>是否确认注销</p><div class='btn-box'><button class='layui-btn layui-btn-sm layui-btn-normal ok'>确认</button><button class='layui-btn layui-btn-sm layui-btn-primary no'>取消</button></div>",
                success: function (res) {
                    $('.ok').off('click').on('click', function () {
                        layer.close(layer.index);
                        window.location.href = "../index.html";
                        // localStorage.removeItem('ref');
                    });
                    $('.no').off('click').on('click', function () {
                        layer.close(layer.index);
                    });
                }
            })
        })
    },
	layuiOpen: function(options) {
    console.log(options);
    if (options && options != null) {
      layer.open({
        type: 1,
        // skin:'yes',
        area: ['400px', '200px'],
        title: ['', 'background-color: #289ef0;'],
        // btn: ['确认', '取消'],
        content: '<p class="openText">'+options.msg+'</p>' +
          '<div class="btn">'+
          '<button data-id="'+ options.id +'" class="yes" >确认</button>'+
          '<button class="no">取消</button>'+
          '</div>',
        success: function() {
          
          $('.yes').off('click').on('click', function() {
            switch (options.num){
              case 1:
                info.deleteResource(options.param);
                break;
			case 3:
				 info.delectTask(options.taskId);
				break;
				
            }
			
            layer.close(layer.index);
            
          });

          $('.no').off('click').on('click', function() {
            layer.close(layer.index);
          });
        },
      });
    }
  },
};
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
    getMenu: function (options) {
        if (options && options != null) {
            var navHtml = [];
            navHtml.push('<div class="headerBox">');
            navHtml.push('<div class="logobox">');
            navHtml.push('<span>Logo</span>');
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

            $('#header').html(navHtml.join(''));

            // 导航的点击切换跳转
            All.navClick();
            // 退出登陆
            All.logOut()
        }
    },
    // 导航的点击切换跳转
    navClick: function () {
        $('body').delegate('#header .navbox li', 'click', function () {
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
    logOut: function () {
        $('body').delegate('.logout', 'click', function () {
            layer.open({
                type: 1,
                skin: 'logOut',
                area: ['450px', '180px'],
                title: ['注销登陆', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
                shade: 0.6,
                closeBtn: 0,
                content: "<p class=''>是否确认注销</p><div class='btn-box'><button class='layui-btn layui-btn-sm layui-btn-normal ok'>确认</button><button class='layui-btn layui-btn-sm layui-btn-primary no'>取消</button></div>",
                success: function (res) {
                    $('.ok').off('click').on('click', function () {
                        layer.close(layer.index);
                        window.location.href = "../index.html";
                        // localStorage.removeItem('ref');
                    });
                    $('.no').off('click').on('click', function () {
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
	        title: ['', 'background-color: #289ef0;'],
	        // btn: ['确认', '取消'],
	        content: '<p class="openText">'+options.msg+'</p>' +
	          '<div class="btn">'+
	          '<button data-id="'+ options.id +'" class="yes" >确认</button>'+
	          '<button class="no">取消</button>'+
	          '</div>',
	        success: function() {
	          
	          $('.yes').off('click').on('click', function() {
	            switch (options.num){
					case 1:
						info.deleteResource(options.resId);
						break;
					case 2:
						info.deletePaper(options.paperId);
						break;
                    case 3:
                        info.delectTask(options.taskId);
                        break;
	            }
	            layer.close(layer.index);
	          });
	
	          $('.no').off('click').on('click', function() {
	            layer.close(layer.index);
	          });
	        },
	      });
	    }
	  },

};
