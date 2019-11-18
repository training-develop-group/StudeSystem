$(function () {

    layui.use(['layer', 'form'], function () {
        var layer = layui.layer,
            form = layui.form;

        All.getMenu({
            search: 1,
            type: 1,
            num: 4
        });
    });
    layui.use('form', function () {
        var form = layui.form;
        info.init();
    });
    $('.mobileFramework').clickSort({
        speed: 500,
        callback: function () {
            // alert('ok');
            // 结束后的通知与方法
        }
    });

    // 隐藏确认完成和加入试题按钮
    $('.joinIn').hide();
    $('.confirmCompletion').hide();
    $('.totalNumberOfQuestions').hide();
    $('.removeQuestions').hide();
    $('#saveChanges').hide();
    // 点击选择试题
    $('#newTestPaper').off('click').on('click', function () {
        // 显示分页
        $('#paging').show();
        numberOfQuestions = 0;
        $('.red').text(numberOfQuestions);

        $('.joinIn').show();
        $('.confirmCompletion').show();
        $('.totalNumberOfQuestions').show();
        $('.fraction').hide();
        $('.edit').hide();
        $('.moveOut').hide();
        $('.moveup').hide();
        $('.movedown').hide();
        $('.fraction').hide();
        $('#saveChanges').hide();
        $('#newTestPaper').hide();
        $('#goBack').hide();
        // 记录已选择试题和试题分值

        for (var i = 0; i < $('.mobileFramework .sortableitem').length; i++) {
            // 获取试题ID和试题分值
            var getQuestionId = $('.mobileFramework  .sortableitem').eq(i).find('.topicFramework').attr('data-id');
            var getQuestionScore = $('.mobileFramework  .sortableitem').eq(i).find('.newScore').text();
            console.log(getQuestionId, getQuestionScore);
            // 将试题id和试题分值保存到对象中
            var questionData = {
                questionId: getQuestionId,
                questionScore: getQuestionScore
            };
            // 将保存好的对象添加到数组中
            backSelectQuestions.push(questionData);
        }
        info.TableDataRequest(1);
    });

    // 点击确认完成
    $('.confirmCompletion').off('click').on('click', function () {
        $('.joinIn').hide();
        $('.confirmCompletion').hide();
        $('.totalNumberOfQuestions').hide();
        $('.fraction').show();
        $('.edit').show();
        $('.moveOut').show();
        $('.moveup').show();
        $('.movedown').show();
        $('.fraction').show();
        $('.removeQuestions').hide();
        $('#saveChanges').show();
        $('#newTestPaper').show();
        // 隐藏分页
        $('#paging').hide();
        info.viewQuestion();
        // 没加入试卷就清空内容
        if (storageQusetionId.length == 0) {
            $('.mobileFramework').empty();
            $('#newTestPaper').removeClass('hidden');
        }

    });

    $('#goBack').off('click').on('click', function () {
        window.location.href = "../ExaminationPaperPage/ExaminationPaperPage.html?";
    });
});
// 试卷ID(全局)
var PaperId;
// 储存paperId
var storageQusetionId = [];
// 用来存最后的结果(确认保存)
var storageResults = [];
// 点击完确认完成,然后往页面里添加数据的数组
var viewHtml = [];
// 储存全部试题
var allQuestions = [];
// 用来判断什么时候往页面里塞入数据
var viewChack = 0;
var judge = true;
// 储存试题成绩
var questionScore = [];
// 添加
var JPaperQuestion = [];
// 删除
var PaperQuestionPesult = [];
// 排序会用到
var sorting = [];
// 选题数量
var numberOfQuestions = 0;
// 试卷下有题就存到数组(回填用)
var questionIdBackfilling = [];
//  存储返回选择试题的数组对象
var backSelectQuestions = [];


var info = {
    //页面主方法
    init: function () {
        layui.use('form', function () {
            var form = layui.form;
            form.render('select');
        });
        // 获取URL里的参数
        var urlinfo = window.location.href;
        value = urlinfo.split("?")[1].split("value=")[1];
        PaperId = decodeURI(value);
        // 查该试卷下的试题
        info.TableDataRequests();
    },
    //表格数据请求
    TableDataRequests: function () {
        $.ajax({
            url: MCUrl + 'manage_system/paper/' + PaperId,
            dataType: 'json',
            Type: 'GET',
            success: function (res) {
                if (res || res.data !== null) {
                    //表格会绘制
                    info.TableDrawings(res.data);
                }
            },
            error: function (e) {

            }
        });
    },
    //表格会绘制
    TableDrawings: function (data) {
        if (data.questionList.length == 0) {
            judge = false;
        }
        var Html = [];
        data.questionList.forEach(function (item, index) {
            // 储存试题ID(用来回填)
            storageQusetionId.push(item.questionId);

            Html.push('<li class="sortableitem">');
            Html.push('<div class="topicFramework" data-id="' + item.questionId + '">');
            Html.push('<input type="text" class="qusetionId" value="' + item.questionId + '" hidden="hidden"/>');
            if (item.questionType == 1) {
                item.questionType = '单选题';
            } else {
                item.questionType = '多选题';
            }
            Html.push('<p class="distanceNum"><span class="num">' + (index + 1) + '</span>. ' + item.questionType + '  （<span class="newScore">' + item.score + '</span> 分）</p>');
            // 转义(已防有标签的样式被html识别)
            item.content = $('<div>').text(item.content).html();
            Html.push('<pre class="distance title">' + item.content + '</pre>');
            item.optionInfo.forEach(function (items, index) {
                // 转义(已防有标签的样式被html识别)
                items.content = $('<div>').text(items.content).html();
                Html.push('<div class="optionStyle clearfix"><span>' + items.optionType + '.</span><pre>' + items.content + '</pre></div>');
            });
            Html.push('</div>');
            Html.push('<div class="functionBox">');
            Html.push('<button class="toView"><img src="../imgs/stf.png" alt="" />查看解析</button>');
            Html.push('<button class="fraction"><img src="../imgs/stz.png" alt="" />设定分值</button>');
            Html.push('<button class="moveOut"><img src="../imgs/stt.png" alt="" />移出</button>');
            Html.push('<button class="moveup"><img src="../imgs/sts.png" alt="" /></i>上移</button>');
            Html.push('<button class="movedown"><img src="../imgs/stx.png" alt="" />下移</button>');
            Html.push('</div>');
            Html.push('</li>');
        });
        $('.mobileFramework').html(Html.join(''));
        // 设置分值
        $('.fraction').off('click').on('click', function () {
            var QusetionId = $(this).parent().parent().find('.qusetionId').val();
            info.fraction(QusetionId, this);
            $('#goBack').hide();
        });
        // 解析
        $('.toView').off('click').on('click', function () {
            var QusetionId = $(this).parent().parent().find('.qusetionId').val();
            info.toViewAnalysis(QusetionId);
        });
        // 点击上移
        $('.moveup').off('click').on('click', function () {
            // 显示保存更改按钮
            $('#saveChanges').show();
            $('#goBack').hide();
        });
        // 点击移出，删除本身
        $('.moveOut').off('click').on('click', function () {
            var QusetionIdS = $(this).parent().parent().find('.qusetionId').val();
            allQuestions.push(QusetionIdS);
            var $that = $(this);
            // 删除this的父级的父级
            layer.open({
                type: 1,
                skin: 'removeQusetion',
                area: ['450px', '180px'],
                move: false,
                title: ['确认移除', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;padding:0 20px;'],
                shade: 0.6,
                closeBtn: 1,
                content: "<p class=''>确认移除该选择题？</p><div class='btn-box'><button class='layui-btn layui-btn-sm layui-btn-normal ok'>确认</button><button class='layui-btn layui-btn-sm layui-btn-primary close'>取消</button></div>",
                success: function (res) {
                    $('.ok').off('click').on('click', function () {
                        layer.close(layer.index);
                        $that.parent().parent().remove();
                        layer.msg('移除成功');
                        console.log($('.mobileFramework .sortableitem').length);
                        for (var i = 0; i <= $('.mobileFramework .sortableitem').length; i++) {
                            $('.mobileFramework .sortableitem .num').eq(i).text(i + 1);
                        }
                    });
                    $('.close').off('click').on('click', function () {
                        layer.close(layer.index);
                    });
                }
            });
            var a = $(".mobileFramework").find('.sortableitem').length;
            if (a == 0) {
                $('#saveChanges').hide();
            } else {
                $('#saveChanges').show();
            }
            $('#goBack').hide();
        });
        // 点击下移
        $('.movedown').off('click').on('click', function () {
            // 显示保存更改按钮
            $('#saveChanges').show();
            $('#goBack').hide();
        });
        // 点击保存更改
        $('#saveChanges').off('click').on('click', function () {
            // 修改试卷方法
            info.addOrRemoveRelationships();
        });
    },
    //查询全部试题
    TableDataRequest: function (curr) {
        $.ajax({
            url: MCUrl + 'manage_system/question/questions',
            data: {
                'pageNum': (curr || 1),
                'pageSize': 10,
                // 'questionType': 1,
                'content': $('.search').val()
            },
            dataType: 'json',
            Type: 'GET',
            success: function (res) {
                if (res || res.data != null) {
                    // info.TableDrawing(res.data , curr);
                    info.TableDrawing(res.data, curr);
                }
            },
            error: function (e) {

            }
        });
    },
    // 试题列表绘制
    TableDrawing: function (data, curr) {
        var Html = [];
        data.list.forEach(function (item, index) {
            Html.push('<li class="sortableitem">');
            Html.push('<div class="topicFramework" data-id="' + item.questionId + '">');
            Html.push('<input type="text" class="qusetionId" value="' + item.questionId + '" hidden="hidden"/>');
            if (item.questionType == 1) {
                item.questionType = '单选题';
            } else {
                item.questionType = '多选题';
            }
            if (item.newScore == null) {
                item.newScore = 0;
            }
            // Html.push('<p class="distanceNum"><span class="num">' + (index + 1) + '</span>. ' + item.questionType + '<span class="newScore">  ' + item.newScore + '分</span></p>');
            Html.push('<p class="distanceNum"><span class="num">' + (index + 1) + '</span>. ' + item.questionType + '</p>');
            // 转义(已防有标签的样式被html识别)
            item.content = $('<div>').text(item.content).html();
            Html.push('<pre class="distance title">' + item.content + '</pre>');
            item.optionInfo.forEach(function (items, index) {
                // 转义(已防有标签的样式被html识别)
                items.content = $('<div>').text(items.content).html();
                Html.push('<div class="optionStyle clearfix"><span>' + items.optionType + '.</span><pre>' + items.content + '</pre></div>');
            });
            Html.push('</div>');
            Html.push('<div class="functionBox">');
            Html.push('<button class="toView"><img src="../imgs/stf.png" alt="查看解析" />查看解析</button>');
            Html.push('<button class="fraction"><img src="../imgs/stz.png" alt="设定分值" />设定分值</button>');
            Html.push('<button class="moveOut"><img src="../imgs/stt.png" alt="移出" />移出</button>');
            Html.push('<button class="moveup"><img src="../imgs/sts.png" alt="上移" /></i>上移</button>');
            Html.push('<button class="movedown"><img src="../imgs/stx.png" alt="下移" />下移</button>');
            Html.push('<button class="joinIn" id="data-joinIn-' + index + '"><img src="../imgs/xjz.png" alt="" />加入试卷</button>');
            Html.push('<button class="removeQuestions" id="data-remove-' + index + '"><img src="../imgs/xjs.png" alt="" />移出试卷</button>');
            Html.push('</div>');
            Html.push('</li>');
        });
        $('.mobileFramework').html(Html.join(''));
        $('.removeQuestions').addClass('hidden');
        // 循环储存试题的数组  storageQusetionId 已选择的试题ID列表
        for (var j = 0; j < data.list.length; j++) {
            for (var i = 0; i < storageQusetionId.length; i++) {
                if (storageQusetionId[i] == data.list[j].questionId) {
                    $('#data-joinIn-' + j).addClass('hidden');
                    $('#data-remove-' + j).removeClass('hidden');
                    break;
                }
            }
        }
        numberOfQuestions = storageQusetionId.length;
        $('.red').text(numberOfQuestions);
        $('.fraction').hide();
        $('.moveOut').hide();
        $('.moveup').hide();
        $('.movedown').hide();
        // 加入试卷
        $('.joinIn').off('click').on('click', function () {
            var QusetionId = $(this).parent().parent().find('.qusetionId').val();
            storageQusetionId.push(QusetionId);
            // 显示移出试卷
            $(this).parent().find('.removeQuestions').show();
            // 隐藏加入试卷
            $(this).parent().find('.joinIn').hide();
            numberOfQuestions += 1;
            $('.red').text(numberOfQuestions);
        });
        // 移出试卷
        $('.removeQuestions').off('click').on('click', function () {
            var QusetionId = $(this).parent().parent().find('.qusetionId').val();
            for (var i = 0; i < storageQusetionId.length; i++) {
                if (QusetionId == storageQusetionId[i]) {
                    storageQusetionId.splice($.inArray(storageQusetionId[i], storageQusetionId), 1);
                    break;
                }
            }
            numberOfQuestions -= 1;
            $('.red').text(numberOfQuestions);
            // 显示加入试卷
            $(this).parent().find('.joinIn').show();
            // 隐藏移出试卷
            $(this).parent().find('.removeQuestions').hide();
        });
        // 解析
        $('.toView').off('click').on('click', function () {
            var QusetionId = $(this).parent().parent().find('.qusetionId').val();
            info.toViewAnalysis(QusetionId);
        });
        // 点击上移
        $('.moveup').off('click').on('click', function () {
            // 显示保存更改按钮
            $('#saveChanges').show();
            $('#goBack').hide();
        });
        // 点击移出，删除本身
        $('.moveOut').off('click').on('click', function () {
            var QusetionIdS = $(this).parent().parent().find('.qusetionId').val();
            allQuestions.push(QusetionIdS);
            var $that = $(this);
            // 删除this的父级的父级
            layer.open({
                type: 1,
                skin: 'removeQusetion',
                area: ['450px', '180px'],
                move: false,
                title: ['确认移除', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;padding:0 20px;'],
                shade: 0.6,
                closeBtn: 1,
                content: "<p class=''>确认移除该选择题？</p><div class='btn-box'><button class='layui-btn layui-btn-sm layui-btn-normal ok'>确认</button><button class='layui-btn layui-btn-sm layui-btn-primary close'>取消</button></div>",
                success: function (res) {
                    $('.ok').off('click').on('click', function () {
                        layer.close(layer.index);
                        $that.parent().parent().remove();
                        layer.msg('移除成功');
                        console.log($('.mobileFramework .sortableitem').length);
                        for (var i = 0; i <= $('.mobileFramework .sortableitem').length; i++) {
                            $('.mobileFramework .sortableitem .num').eq(i).text(i + 1);
                        }
                    });
                    $('.close').off('click').on('click', function () {
                        layer.close(layer.index);
                    });
                }
            });
            $('#saveChanges').show();
            $('#goBack').hide();
        });
        // 点击下移
        $('.movedown').off('click').on('click', function () {
            // 显示保存更改按钮
            $('#saveChanges').show();
            $('#goBack').hide();
        });
        // 设置分值
        $('.fraction').off('click').on('click', function () {
            var QusetionId = $(this).parent().parent().find('.qusetionId').val();
            info.fraction(QusetionId, this);
            $('#goBack').hide();
        });
        // 点击保存更改
        $('#saveChanges').off('click').on('click', function () {
            // 修改试卷方法
            info.addOrRemoveRelationships();
        });
        if (data.total > 10) {
            info.page(data, curr);
            // 判断paging里是否头内容↓
        } else if ($('#paging').is(':empty') == false) {
            // 清空#paging里的内容与标签
            $('#paging').empty();
        }
    },
    // 查询部分试题的请求
    viewQuestion: function () {
        $.ajax({
            url: MCUrl + 'manage_system/paper/questions',
            data: {'questionIdList': JSON.stringify(storageQusetionId)},
            Type: 'GET',
            success: function (res) {
                if (res || res.data !== null) {
                    info.viewQuestions(res.data);
                }
            },
            error: function (e) {

            }
        });
    },
    // 查询部分试题
    viewQuestions: function (data) {
        data.forEach(function (item, index) {
            viewHtml.push('<li class="sortableitem">');
            viewHtml.push('<div class="topicFramework" data-id="' + item.questionId + '">');
            viewHtml.push('<input type="text" class="qusetionId" value="' + item.questionId + '" hidden="hidden"/>');
            if (item.questionType == 1) {
                item.questionType = '单选题';
            } else {
                item.questionType = '多选题';
            }
            if (item.newScore == null) {
                item.newScore = 0;
            }
            viewHtml.push('<p class="distanceNum"><span class="num">' + (index + 1) + '</span>. ' + item.questionType + '  （<span class="newScore"  id="data-score-' + index + '">' + item.newScore + '</span> 分）</p>');
            // 转义(已防有标签的样式被html识别)
            item.content = $('<div>').text(item.content).html();
            viewHtml.push('<pre class="distance title">' + item.content + '</pre>');
            item.optionInfo.forEach(function (items, index) {
                // 转义(已防有标签的样式被html识别)
                items.content = $('<div>').text(items.content).html();
                viewHtml.push('<div class="optionStyle clearfix"><span>' + items.optionType + '.</span><pre>' + items.content + '</pre></div>');
            });
            viewHtml.push('</div>');
            viewHtml.push('<div class="functionBox">');
            viewHtml.push('<button class="toView"><img src="../imgs/stf.png" alt="" />查看解析</button>');
            viewHtml.push('<button class="fraction"><img src="../imgs/stz.png" alt="" />设定分值</button>');
            viewHtml.push('<button class="moveOut"><img src="../imgs/stt.png" alt="" />移出</button>');
            viewHtml.push('<button class="moveup"><img src="../imgs/sts.png" alt="" /></i>上移</button>');
            viewHtml.push('<button class="movedown"><img src="../imgs/stx.png" alt="" />下移</button>');
            viewHtml.push('</div>');
            viewHtml.push('</li>');
        });
        console.log("重回");
        // 判断是否是最后一次的调用，如果是最后一次就往页面里塞入数据
        $('.mobileFramework').html(viewHtml.join(''));
        // 循环储存试题的数组  storageQusetionId 已选择的试题ID列表
        for (var j = 0; j < data.length; j++) {
            console.log(backSelectQuestions.length);
            for (var i = 0; i < backSelectQuestions.length; i++) {
                if (backSelectQuestions[i].questionId == data[j].questionId) {
                    $('#data-score-' + j).text(backSelectQuestions[i].questionScore);
                }
            }
        }
        // 清空数组
        viewHtml = [];
        // 移出
        $('.moveOut').off('click').on('click', function () {
            var QusetionId = $(this).parent().parent().find('.qusetionId').val();
            for (var i = 0; i < storageQusetionId.length; i++) {
                if (QusetionId == storageQusetionId[i]) {
                    storageQusetionId.splice($.inArray(storageQusetionId[i], storageQusetionId), 1);
                    break;
                }
            }
            if (storageQusetionId.length == 0) {
                // 有问题
                $('#saveChanges').hide();
                viewChack = 0;
            } else {
                $('#saveChanges').show();
            }
            var $that = $(this);
            // 删除this的父级的父级
            layer.open({
                type: 1,
                skin: 'removeQusetion',
                area: ['450px', '180px'],
                move: false,
                title: ['确认移除', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;padding:0 20px;'],
                shade: 0.6,
                closeBtn: 1,
                content: "<p class=''>确认移除该选择题？</p><div class='btn-box'><button class='layui-btn layui-btn-sm layui-btn-normal ok'>确认</button><button class='layui-btn layui-btn-sm layui-btn-primary close'>取消</button></div>",
                success: function (res) {
                    $('.ok').off('click').on('click', function () {
                        layer.close(layer.index);
                        $that.parent().parent().remove();
                        layer.msg('移除成功');
                        console.log($('.mobileFramework .sortableitem').length);
                        for (var i = 0; i <= $('.mobileFramework .sortableitem').length; i++) {
                            $('.mobileFramework .sortableitem .num').eq(i).text(i + 1);
                        }
                    });
                    $('.close').off('click').on('click', function () {
                        layer.close(layer.index);
                    });
                }
            });
            $('#goBack').hide();
        });
        // 点击上移
        $('.moveup').off('click').on('click', function () {
            // 显示保存更改按钮
            $('#saveChanges').show();
            $('#goBack').hide();
        });
        // 点击下移
        $('.movedown').off('click').on('click', function () {
            // 显示保存更改按钮
            $('#saveChanges').show();
            $('#goBack').hide();
        });
        // 设置分值
        $('.fraction').off('click').on('click', function () {
            var QusetionId = $(this).parent().parent().find('.qusetionId').val();
            info.fraction(QusetionId, this);
            $('#goBack').hide();
        });
        // 解析
        $('.toView').off('click').on('click', function () {
            var QusetionId = $(this).parent().parent().find('.qusetionId').val();
            info.toViewAnalysis(QusetionId);
        });
        // 点击保存更改
        $('#saveChanges').off('click').on('click', function () {
            Array.prototype.push.apply(storageResults, storageQusetionId);
            // 清空数组
            storageQusetionId = [];
            // 修改试卷方法
            info.addOrRemoveRelationships();
        });
    },
    // 修改试卷
    addOrRemoveRelationships: function () {
        if (judge != false) {
            for (var i = 0; i < allQuestions.length; i++) {
                var data = {
                    'paperId': PaperId,
                    'questionId': allQuestions[i]
                };
                PaperQuestionPesult.push(data);
            }
        }
        for (var i = 0; i < storageResults.length; i++) {
            var data = {
                'paperId': PaperId,
                'questionId': storageResults[i],
                'score': 0,
                'orderIndex': (i + 1),
                'cTime': today,
                'cUser': 'mc'
            };
            JPaperQuestion.push(data);
        }
        var chack = true;
        $(".newScore").each(function () {
            var NScore = $(this).text();
            if (NScore == '' || NScore == null || NScore == undefined) {
                layer.open({
                    type: 1,
                    skin: 'errorMsg',
                    area: ['450px', '180px'],
                    move: false,
                    title: [' ', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;padding:0 20px;'],
                    shade: 0.6,
                    closeBtn: 1,
                    content: "<p class=''>有试题未设置分数，请设置分数</p><div class='btn-box'><button class='layui-btn layui-btn-sm layui-btn-normal ok'>确认</button></div>",
                    success: function (res) {
                        $('.ok').off('click').on('click', function () {
                            layer.close(layer.index);
                        });
                    }
                });
                chack = false;
                return false;
            } else if (NScore == 0) {
                layer.open({
                    type: 1,
                    skin: 'errorMsg',
                    area: ['450px', '180px'],
                    move: false,
                    title: [' ', 'background-color: #279ef0;text-align: center;font-size: 20px;color:white;padding:0 20px;'],
                    shade: 0.5,
                    closeBtn: 1,
                    content: "<p class=''>分数不能为0</p><div class='btn-box'><button class='layui-btn layui-btn-sm layui-btn-normal ok'>确认</button></div>",
                    success: function (res) {
                        $('.ok').off('click').on('click', function () {
                            layer.close(layer.index);
                        });
                    }
                });
                chack = false;
                return false;
            }
        });
        if (chack == false) {
            return false;
        }
        $('#goBack').show();
        sorting = [];
        for (var i = 1; i <= $('.sortableitem').length; i++) {
            var data = {
                'paperId': PaperId,
                'questionId': $('.sortableitem:nth-child(' + [i] + ') .topicFramework').attr('data-id'),
                'score': $('.sortableitem:nth-child(' + [i] + ') .newScore').text(),
                'orderIndex': i,
                'cTime': today,
                'cUser': 'mc'
            };
            sorting.push(data);
        }
        if (JPaperQuestion.length == 0 && PaperQuestionPesult == 0 && questionScore.length == 0 && sorting.length == 0) {
            console.log("四个数组为空");
            return false;
        }
        if (PaperQuestionPesult == 0) {
            PaperQuestionPesult = [];
        }
        var data = {
            'JPaperQuestion': JSON.stringify(JPaperQuestion),
            'PaperQuestionPesult': JSON.stringify(PaperQuestionPesult),
            'questionScore': JSON.stringify(questionScore),
            'sorting': JSON.stringify(sorting)
        };
        $.ajax({
            url: MCUrl + 'manage_system/paper/paper/paper',
            data: data,
            dataType: 'json',
            type: 'POST',
            success(res) {
                // 隐藏保存更改按钮
                $('#saveChanges').hide();
                layer.msg(res.msg);
                JPaperQuestion = [];
                PaperQuestionPesult = [];
                questionScore = [];
                // 覆盖当前页
                setTimeout(function () {
                    window.location.href = "../ViewTestPaper/ViewTestPaper.html?value=" + PaperId;
                }, 2000);
            }
        });
    },
    // 查看解析(弹窗)
    toViewAnalysis: function (questionId) {
        // 解析内容
        var Analysis = '未定义';
        // 正确答案
        var OptionType = '未知';
        $.ajax({
            url: MCUrl + 'manage_system/question/answer',
            data: {
                'questionId': questionId
            },
            dataType: 'json',
            type: 'GET',
            success(res) {
                res.data.forEach(function (item, index) {
                    Analysis = item.analysis;
                    OptionType = item.optionType;
                });
                layui.use("layer", function () {
                    var layer = layui.layer;
                    layer.open({
                        type: 1, //Page层类型
                        closeBtn: 1,
                        move: false,
                        area: ['660px', '300px'],
                        title: ['查看解析',
                            'background-color: #279ef0;text-align: center;font-size: 20px;line-height: 43px;color:white;padding: 0px;'
                        ],
                        content: '<div class="answerContent">' +
                            '<p>正确答案：<span class="answerOptions">' + OptionType + '</span></p>' +
                            '<p>答案解析：</p>' +
                            '<p class="analysis">' + Analysis + '</p>' +
                            '</div>'
                    });
                });
            }
        });
    },
    // 设置分值方法
    fraction: function (QusetionId, newThis) {
        // 取当前的分数
        var oldScores = $(newThis).parent().parent().find('.newScore').text();
        layui.use("layer", function () {
            var layer = layui.layer;
            layer.open({
                type: 1,//Page层类型
                area: ['789px', '210px'],
                closeBtn: 0,
                move: false,
                title: ['设置分值',
                    'background-color: #279ef0;text-align: center;font-size: 20px;line-height: 43px;color:white;padding: 0px;'
                ],
                content: '<div class="inputLocation">' +
                    '<div class="input-box">' +
                    ' <label class="layui-form-label">设置分值</label>' +
                    '<input type="text" autocomplete="off" id="nameOfExaminationPaper" class="layui-input">' +
                    '<div class="btn-box">' +
                    '<button type="button" class="layui-btn layui-btn-normal layui-btn-sm newTestPaperConfirm">确认</button>'
                    + '<button type="button" class="layui-btn layui-btn-primary layui-btn-sm newTestPaperCancel">取消</button>'
                    + '</div>'
            });
            // 给输入框赋值
            $('#nameOfExaminationPaper').val(oldScores);
            // 点击确认
            $('.newTestPaperConfirm').off('click').on('click', function () {
                var score = $('#nameOfExaminationPaper').val();
                // 验证是否是数字
                var reg = /^\d+((\.\d+|\/[1-9]+))?$/;
                // var reg = /[1-9]\d*.\d*|0\.\d*[1-9]\d*/;
                if (!reg.test(score) && score != '') {
                    layer.msg('分数不正确');
                    return false;
                }
                score = parseFloat(score);
                if (score != '' && score != 0) {
                    var data = {
                        'paperId': PaperId,
                        'questionId': QusetionId,
                        'score': score
                    }
                    // 给对应的题赋分数
                    $(newThis).parent().parent().find('.newScore').text(score);
                    // 添加到数组
                    questionScore.push(data);
                }
                // 关闭弹窗
                layer.closeAll();
                // 显示保存更改按钮
                $('#saveChanges').show();
            });
            // 点击取消
            $('.newTestPaperCancel').off('click').on('click', function () {
                // 关闭弹窗
                layer.closeAll();
            });
        });
    },
    //分页
    page: function (data, curr) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            //执行一个laypage实例
            laypage.render({
                elem: 'paging',
                theme: '#279ef0',
                layout: ['prev', 'page', 'next', 'limits', 'skip'],
                count: data.total,
                curr: curr,
                jump: function (obj, first) {
                    console.log(obj.curr);
                    if (!first) {
                        info.TableDataRequest(obj.curr);
                    }
                }
            });

        });

    },
};
// 时间设置
var today = '';
$(document).ready(function () {
    var time = new Date();
    var day = ("0" + time.getDate()).slice(-2);
    var month = ("0" + (time.getMonth() + 1)).slice(-2);
    today = time.getFullYear() + "-" + (month) + "-" + (day);
});