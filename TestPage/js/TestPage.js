/**
 * @name: common
 * @author：MengXin
 */
var urlinfo = window.location.href;
var value = urlinfo.split("?")[1].split("value=")[1];
var PaperId = decodeURI(value);
var taskId = PaperId.split(',')[0];
var taskDegreeOfCompletion = PaperId.split(',')[1];
var taskType = '';
var getExperience = '';
var paperId = '';
var resId = '';
var setTimeInterval = '';
var taskName = '';
$(function () {
    info.goBack();
    layui.use(['layer', 'form'], function () {
        var layer = layui.layer,
            form = layui.form;
        // 公共头调用渲染
        All.getMenu({
            search: 2,
            type: 2,
            num: 3
        });
    });

    $.ajax({
        url: LBUrl + 'manage_system/task/' + taskId,
        data: {},
        dataType: 'json',
        type: 'GET',
        async: false,
        contentType: 'application/json;charset=utf-8',
        success(res) {
            if (res.data != null) {
                //为任务描述赋值
                $('.taskRemarkContent').text(res.data.taskRemark);
                //记录心得分页页数
                getExperience++;
                //给任务类型赋值
                taskType = res.data.taskType;
                //试卷id
                paperId = res.data.paperId;
                //资源id
                resId = res.data.resId;
                //任务名
                taskName = res.data.taskName;
                //为任务名赋值
                $('.nav_title').text(res.data.taskName)
            } else {
                layer.msg('任务已删除')
            }
        },
    });

    if (localStorage.getItem('userType') === 1) {
        if (taskType === 1) {
            $.ajax({
                url: TDXUrl + 'manage_system/resource/' + resId,
                data: {},
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json;charset=utf-8',
                success(resc) {
                    if (resc.data != null) {
                        var pdfPath = resc.data.path.substring(0, resc.data.path.lastIndexOf('.'));
                        var extPath = resc.data.path.substring(resc.data.path.lastIndexOf('.'));
                        var myVideo = $('#myVideo').attr('id');
                        var myAudio = $("#myAudio").attr('id');
                        $('.study').removeClass('hidden');
                        $('.measurement').removeClass('hidden')
                        if (resc.data.resType === 1) {
                            $('.video').removeClass('hidden');
                            $('.video video').attr('src', 'http://192.168.188.109:8848/' + resc.data.path);
                            info.getVideoPlaybackTime(resId, myVideo);
                            $('.measurement').addClass('test');
                        } else if (resc.data.resType === 2) {
                            $('.audio').removeClass('hidden');
                            //音频地址赋值
                            $('.audio audio').attr('src', 'http://192.168.188.109:8848/' + resc.data.path);
                            info.getVideoPlaybackTime(resId, myAudio);
                            $('.measurement').addClass('test');
                        } else if (resc.data.resType === 3) {
                            $('.doc').removeClass('hidden');
                            $('.doc iframe').attr('src', 'http://192.168.188.109:8848/' + pdfPath + '.pdf');
                            $('.measurement').addClass('test');
                        }
                        $('.test').off('click').on('click', function () {
                            $('.content').addClass('hidden');
                            //隐藏掉所有
                            $('.video').addClass('hidden');
                            $('.audio').addClass('hidden');
                            $('.doc').addClass('hidden');
                            $('.active').removeClass('active');
                            $(this).addClass('active');

                            info.getPaperList(paperId);
                        });
                        $('.study').off('click').on('click', function () {
                            $('.active').removeClass('active')
                            $(this).addClass('active')
                            $('.content').addClass('hidden');
                            $('.test_content').addClass('hidden');
                            if (resc.data.resType === 1) {
                                $('.video').removeClass('hidden');
                                $('.video video').attr('src', 'http://192.168.188.109:8848/' + resc.data.path);
                                info.getVideoPlaybackTime(resId, myVideo);
                                $('.measurement').addClass('test');
                            } else if (resc.data.resType === 2) {
                                $('.audio').removeClass('hidden');
                                //音频地址赋值
                                $('.audio audio').attr('src', 'http://192.168.188.109:8848/' + resc.data.path);
                                info.getVideoPlaybackTime(resId, myAudio);
                                $('.measurement').addClass('test');
                            } else if (resc.data.resType === 3) {
                                $('.doc').removeClass('hidden');
                                if (extPath === '.txt' || extPath === '.pdf') {
                                    $('.doc iframe').attr('src', 'http://192.168.188.109:8848/' + resc, data.path + '');
                                } else {
                                    $('.doc iframe').attr('src', 'http://192.168.188.109:8848/' + pdfPath + '.pdf');
                                }
                                $('.measurement').addClass('test');
                            }
                        })
                    }
                }
            })

        } else if (taskType === 2) {
            $.ajax({
                url: TDXUrl + 'manage_system/resource/' + resId,
                data: {},
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json;charset=utf-8',
                success(resc) {
                    if (resc.data != null) {
                        var pdfPath = resc.data.path.substring(0, resc.data.path.lastIndexOf('.'));
                        var extPath = resc.data.path.substring(resc.data.path.lastIndexOf('.'));
                        var myVideo = $('#myVideo').attr('id');
                        var myAudio = $("#myAudio").attr('id');
                        $('.study').removeClass('hidden');
                        if (resc.data.resType === 1) {
                            $('.video').removeClass('hidden');
                            $('.video video').attr('src', 'http://192.168.188.109:8848/' + resc.data.path);
                            info.getVideoPlaybackTime(resId, myVideo);
                        } else if (resc.data.resType === 2) {
                            $('.audio').removeClass('hidden');
                            //音频地址赋值
                            $('.audio audio').attr('src', 'http://192.168.188.109:8848/' + resc.data.path);
                            info.getVideoPlaybackTime(resId, myAudio);
                        } else if (resc.data.resType === 3) {
                            $('.doc').removeClass('hidden');
                            if (extPath === '.txt' || extPath === '.pdf') {
                                $('.doc iframe').attr('src', 'http://192.168.188.109:8848/' + resc, data.path + '');
                            } else {
                                $('.doc iframe').attr('src', 'http://192.168.188.109:8848/' + pdfPath + '.pdf');
                            }
                        }
                        $('.experienceListBox').removeClass('hidden');
                        info.getExperienceList(1, taskId);
                        $('.add').off('click').on('click', function () {
                            // 这里替换了换行与回车
                            var Experience = $('.textExperience').val();
                            var data = {
                                'taskId': taskId,
                                'content': Experience
                            };
                            $.ajax({
                                url: LBUrl + 'manage_system/task/comment',
                                data: JSON.stringify(data),
                                dataType: 'json',
                                type: 'POST',
                                contentType: 'application/json;charset=utf-8',
                                success(res) {
                                    layer.msg('添加成功');
                                    getExperience++;
                                    $('.textExperience').val('');
                                    var textNum = $('.textExperience').val().length;
                                    $('.textNum').text(textNum);
                                    if (getExperience > 0) {
                                        info.getExperienceList(1, taskId)
                                    }
                                }
                            })
                        })
                    }
                }
            })
        } else if (taskType === 3) {
            $('.video').addClass('hidden');
            $('.audio').addClass('hidden');
            $('.doc').addClass('hidden');
            $('.content').addClass('hidden');
            info.getPaperList(paperId);
        }
    } else {
        if (taskType === 1) {
            $.ajax({
                url: TDXUrl + 'manage_system/resource/' + resId,
                data: {},
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json;charset=utf-8',
                success(resc) {
                    if (resc.data != null) {
                        var pdfPath = resc.data.path.substring(0, resc.data.path.lastIndexOf('.'));
                        var extPath = resc.data.path.substring(resc.data.path.lastIndexOf('.'));
                        var myVideo = document.getElementById('myVideo');
                        var myAudio = document.getElementById('myAudio');
                        $('.study').removeClass('hidden');
                        $('.measurement').removeClass('hidden');
                        if (resc.data.resType === 1) {
                            myVideo.loop = false;
                            // 是否看完
                            myVideo.addEventListener('ended', function () {
                                $('.measurement').addClass('test');
                                $('.test').one('click', function () {
                                    layer.open({
                                        type: 1,
                                        skin: 'testStart',
                                        area: ['450px', '180px'],
                                        move: false,
                                        title: ['开始测试', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
                                        shade: 0.5,
                                        closeBtn: 0,
                                        content: "<p class=''>准备好了吗？考试期间无法退出</p><div class='btn-box'><button class='layui-btn layui-btn-sm layui-btn-normal ok'>准备好了</button><button class='layui-btn layui-btn-sm no'>还没有</button></div>",
                                        success: function (res) {
                                            $('.testStart .ok').off('click').on('click', function () {
                                                $('.goBack').addClass('hidden');
                                                $('.content').removeClass('hidden');
                                                //隐藏掉所有
                                                $('.video').addClass('hidden');
                                                $('.audio').addClass('hidden');
                                                $('.doc').addClass('hidden');
                                                $('.active').removeClass('active');
                                                $('.test').addClass('active');
                                                $('.measurement').removeClass('test');
                                                info.getList(taskId, taskType, paperId, resId);
                                                layer.close(layer.index);
                                            });
                                            $('.no').off('click').on('click', function () {
                                                layer.close(layer.index);
                                            });
                                        }
                                    })
                                })
                            }, false);
                            $('.video').removeClass('hidden');
                            $('.video video').attr('src', 'http://192.168.188.109:8848/' + resc.data.path);
                            info.getVideoPlaybackTime(resId, myVideo);
                        } else if (resc.data.resType === 2) {
                            $('.audio').removeClass('hidden');
                            //音频地址赋值
                            $('.audio audio').attr('src', 'http://192.168.188.109:8848/' + resc.data.path);
                            info.getVideoPlaybackTime(resId, myAudio);
                            myAudio.loop = false;
                            myAudio.addEventListener('ended', function () {
                                $('.measurement').addClass('test');
                                $('.test').one('click', function () {
                                    layer.open({
                                        type: 1,
                                        skin: 'testStart',
                                        area: ['450px', '180px'],
                                        move: false,
                                        title: ['开始测试', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
                                        shade: 0.5,
                                        closeBtn: 0,
                                        content: "<p class=''>准备好了吗？考试期间无法退出</p><div class='btn-box'><button class='layui-btn layui-btn-sm layui-btn-normal ok'>准备好了</button><button class='layui-btn layui-btn-sm no'>还没有</button></div>",
                                        success: function (res) {
                                            $('.testStart .ok').off('click').on('click', function () {
                                                $('.content').removeClass('hidden');
                                                //隐藏掉所有
                                                $('.video').addClass('hidden');
                                                $('.audio').addClass('hidden');
                                                $('.doc').addClass('hidden');
                                                $('.active').removeClass('active');
                                                $('.test').addClass('active');
                                                $('.goBack').addClass('hidden');
                                                $('.measurement').removeClass('test');
                                                info.getList(taskId, taskType, paperId, resId);
                                                layer.close(layer.index);
                                            });
                                            $('.no').off('click').on('click', function () {
                                                layer.close(layer.index);
                                            });
                                        }
                                    })
                                })
                            }, false)
                        } else if (resc.data.resType === 3) {
                            $('.doc').removeClass('hidden');
                            if (extPath === '.txt' || extPath === '.pdf') {
                                $('.doc iframe').attr('src', 'http://192.168.188.109:8848/' + resc, data.path + '');
                            } else {
                                $('.doc iframe').attr('src', 'http://192.168.188.109:8848/' + pdfPath + '.pdf');
                            }
                            $('.measurement').addClass('test');
                            $('.test').one('click', function () {
                                layer.open({
                                    type: 1,
                                    skin: 'testStart',
                                    area: ['450px', '180px'],
                                    move: false,
                                    title: ['开始测试', 'background-color: #289ef0;text-align: center;font-size: 20px;color:white;'],
                                    shade: 0.5,
                                    closeBtn: 0,
                                    content: "<p class=''>准备好了吗？考试期间无法退出</p><div class='btn-box'><button class='layui-btn layui-btn-sm layui-btn-normal ok'>准备好了</button><button class='layui-btn layui-btn-sm no'>还没有</button></div>",
                                    success: function (res) {
                                        $('.testStart .ok').off('click').on('click', function () {
                                            $('.content').removeClass('hidden');
                                            //隐藏掉所有
                                            $('.goBack').addClass('hidden');
                                            $('.video').addClass('hidden');
                                            $('.audio').addClass('hidden');
                                            $('.doc').addClass('hidden');
                                            $('.active').removeClass('active');
                                            $('.measurement').removeClass('test');

                                            info.getList(taskId, taskType, paperId, resId);
                                            $(this).addClass('active');
                                            layer.close(layer.index);
                                        });
                                        $('.no').off('click').on('click', function () {
                                            layer.close(layer.index);
                                        });
                                    }
                                })

                                // info.getPaperList(paperId);
                            })
                        }
                    } else {
                        layer.msg('资源已被删除')
                    }
                }
            });
        } else if (taskType === 2) {
            if (taskDegreeOfCompletion === 1) {
                info.getExperienceList(1, taskId)
            }
            $.ajax({
                url: TDXUrl + 'manage_system/resource/' + resId,
                data: {},
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json;charset=utf-8',
                success(resc) {
                    if (resc.data != null) {
                        var pdfPath = resc.data.path.substring(0, resc.data.path.lastIndexOf('.'));
                        var extPath = resc.data.path.substring(resc.data.path.lastIndexOf('.'));
                        var myVideo = document.getElementById('myVideo');
                        var myAudio = document.getElementById('myAudio');
                        $('.study').removeClass('hidden');
                        if (resc.data.resType === 1) {
                            $('.experienceListBox').removeClass('hidden');
                            $('.video').removeClass('hidden');
                            $('.video video').attr('src', 'http://192.168.188.109:8848/' + resc.data.path);
                            info.getVideoPlaybackTime(resId, myVideo);
                        } else if (resc.data.resType === 2) {
                            $('.experienceListBox').removeClass('hidden');
                            $('.audio').removeClass('hidden');
                            //音频地址赋值
                            $('.audio audio').attr('src', 'http://192.168.188.109:8848/' + resc.data.path);
                            info.getVideoPlaybackTime(resId, myAudio);
                        } else if (resc.data.resType === 3) {
                            $('.experienceListBox').removeClass('hidden');
                            $('.doc').removeClass('hidden');
                            if (extPath === '.txt' || extPath === '.pdf') {
                                $('.doc iframe').attr('src', 'http://192.168.188.109:8848/' + resc, data.path + '');
                            } else {
                                $('.doc iframe').attr('src', 'http://192.168.188.109:8848/' + pdfPath + '.pdf');
                            }
                        }
                    } else {
                        layer.msg('资源已被删除')
                    }
                }
            })
        } else if (taskType === 3) {
            $('.measurement').removeClass('hidden');
            $('.active').removeClass('active');
            $('.measurement').addClass('active');
            $('.content').removeClass('hidden');
            //隐藏掉所有
            $('.goBack').addClass('hidden');
            $('.video').addClass('hidden');
            $('.audio').addClass('hidden');
            $('.doc').addClass('hidden');
            info.getList(taskId, taskType, paperId, resId)
        }
    }

    setTimeInterval = setInterval(info.currentTime, 30000);
    // 添加心得
    $('.add').off('click').on('click', function () {
        // 这里替换了换行与回车
        var Experience = $('.textExperience').val();
        var data = {
            'taskId': taskId,
            'content': Experience
        };
        $.ajax({
            url: LBUrl + 'manage_system/task/comment',
            data: JSON.stringify(data),
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            success(res) {
                layer.msg('添加成功');
                getExperience++;
                $('.textExperience').val('');
                var textNum = $('.textExperience').val().length;
                $('.textNum').text(textNum);
                if (getExperience > 0) {
                    info.getExperienceList(1, taskId)
                }

            }
        })
    })
})

var info = {
    recordVideoPlaybackTime: function (resId, seconds) {
        $.ajax({
            url: TDXUrl + 'manage_system/resource/view',
            data: {
                'resId': resId,
                'seconds': Math.round(seconds)
            },
            dataType: 'json',
            type: 'POST',
            success(res) {
                if (res.code === 1) {
                    console.log(res);
                } else {
                }
            },
            error(e) {
            }
        });
    },
    getVideoPlaybackTime: function (resId, myVid) {
        $.ajax({
            url: TDXUrl + 'manage_system/resource/view',
            data: {
                'resId': resId
            },
            dataType: 'json',
            type: 'GET',
            async: false,
            // contentType: 'application/json;charset=utf-8',
            success(res) {
                if (res.code === 1) {
                    console.log(res);
                    console.log('前' + myVid.currentTime);
                    myVid.currentTime = res.data;
                    console.log('后' + myVid.currentTime);
                } else {
                }
            },
            error(e) {
            }
        });
    },
    currentTime: function () {
        var myVideo = document.getElementById("myVideo"); //获取视频DOM元素
        var myAudio = document.getElementById("myAudio");
        var myVideoTime = myVideo.currentTime; //获取视频播放到的时间
        var myAudioTime = myAudio.currentTime; //获取视频播放到的时间
        // var myVid=document.getElementById("myVideo");
        // info.getVideoPlaybackTime(resId,myAudio)
        info.recordVideoPlaybackTime(resId, myAudioTime); //调用记录方法
        // info.getVideoPlaybackTime(resId,myVideo)
        info.recordVideoPlaybackTime(resId, myVideoTime); //调用记录方法
    },

    getPaperList: function (paperId) {
        $.ajax({
            url: MCUrl + 'manage_system/paper/' + paperId,
            data: {},
            Type: 'GET',
            success(res) {
                if (res || res.data !== null) {
                    var Html = [];
                    Html.push('<ul class="layui-tab tabHead layui-tab-brief clearfix">');
                    if (res.data.questionList === undefined || res.data.questionList.length === 0) {

                    } else {
                        res.data.questionList.forEach(function (item, index) {
                            Html.push('<li class="sortableitem">');
                            Html.push('<div class="topicFramework">');
                            Html.push('<input type="text" class="questionId" value="' + item.questionId + '" hidden="hidden"/>');
                            if (item.questionType === 1) {
                                item.questionType = "单选题";
                            } else {
                                item.questionType = "多选题";
                            }
                            // var newScore = res.data.questions[0].newScoreList[index].score;
                            Html.push('<p class="num">' + (index + 1) + '. ' + item.questionType + '<span>' + item.score +
                                '分</span></p>');
                            // 转义(已防有标签的样式被html识别)
                            item.content = $('<div>').text(item.content).html();
                            Html.push('<pre class="distance">' + item.content + '</pre>');
                            item.optionInfo.forEach(function (items, index) {
                                if (items.questionId === item.questionId) {
                                    // 转义(已防有标签的样式被html识别)
                                    items.content = $('<div>').text(items.content).html();
                                    Html.push('<div class="optionStyle clearfix distance"><span>' + items.optionType + '.</span><pre>' +
                                        items.content + '</pre></div>');
                                }
                            });
                            Html.push('</div>');
                            Html.push('<div class="functionBox">');
                            Html.push('<button class="toView" value=' + item.questionId +
                                '><i class="layui-icon layui-icon-search"></i>查看解析</button>');
                            Html.push('</div>');
                            Html.push('</li>');
                        });
                        Html.push('</ul>');
                    }
                    $('.test_content').html(Html.join(''));
                    $('.test_content').removeClass('hidden');
                    $('.content').css('background-color', '#fff');

                    // 解析
                    $('.toView').off('click').on('click', function () {
                        var QusetionId = $(this).val();
                        // 解析内容
                        var Analysis = '未定义';
                        // 正确答案
                        var OptionType = '未知';
                        $.ajax({
                            url: MCUrl + 'manage_system/question/answer',
                            data: {
                                'questionId': QusetionId
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
                                        type: 1,
                                        closeBtn: 1,
                                        move: false,
                                        area: ['700px', '260px'],
                                        title: ['查看解析',
                                            'background-color: #279ef0;text-align: center;font-size: 16px;line-height: 43px;color:white;letter-spacing: 5px;padding: 0px;'
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
                    });
                }
            }
        })
    },
    //  接口 ,获取页面试题
    getList: function (taskId, taskType, paperId, resId) {
        $.ajax({
            url: MCUrl + 'manage_system/paper/' + paperId,
            data: {},
            Type: 'GET',
            success: function (resb) {
                if (resb.data != null) {
                    var answerSheet = [];
                    var examContent = [];
                    resb.data.questionList.forEach(function (item, index) {
                        if ((index + 1) === 1) {
                            answerSheet.push('<li class="active"  data-type="' + (index + 1) + '">' +
                                (index + 1) + '</li>')
                        } else {
                            answerSheet.push('<li class="" data-id="' + item.questionId + '" data-type="' + (index + 1) + '">' + (
                                index + 1) + '</li>')
                        }
                        if ((index + 1) === 1) {
                            examContent.push('<li class="questionCard" data-type="' + (index + 1) + '">')
                        } else {
                            examContent.push('<li class="questionCard hidden" data-type="' + (index + 1) + '">')
                        }
                        if (item.questionType === 1) {
                            item.questionType = '单选题';
                        } else {
                            item.questionType = '多选题';
                        }
                        examContent.push('<p class="questionCard_title"><span class="num">' + (index + 1) +
                            '.</span><span class="questuon_title" data-id="' + item.questionId + '">' + item.questionType +
                            '</span>(<span class="fraction">' + item.score + '</span>分)</p>');
                        examContent.push('<p class="question_Dry">' + item.content + '</p>');
                        if (item.questionType === '单选题') {
                            examContent.push('<ul class="radio_box textBox">')
                        } else {
                            examContent.push('<ul class="checkbox_box textBox">')
                        }
                        item.optionInfo.forEach(function (itemx, index) {
                            examContent.push('<li class="clearfix"><span data-id="' + itemx.ref + '" class="option">' + itemx.optionType +
                                '</span><pre class="optionStyle">' + itemx.content + '</pre></li>')
                        });
                        examContent.push('<input type="text" value="' + item.questionId + '" class="questionId hidden">');
                        examContent.push('</ul>');
                        examContent.push('<div class="btn-box clearfix">');
                        examContent.push('<button class="layui-btn layui-btn-normal layui-btn-sm next">下一题</button>');
                        examContent.push('<button class="layui-btn layui-btn-normal layui-btn-sm previous">上一题</button>');
                        examContent.push('</div>')
                    });

                    examContent.push('</li>');
                    $('.questionCard_box').html(examContent.join(''));
                    $('.card').html(answerSheet.join(''));
                    // 下一题点击事件
                    info.nextChange();
                    // 上一题点击事件
                    info.previousChange();
                    // 最后一题不显示下一题,第一题不显示上一题
                    $('.questionCard_box .questionCard').last().find('.next').addClass('hidden');
                    $('.questionCard_box .questionCard').first().find('.previous').addClass('hidden');

                    // 单选事件
                    info.radioChange();
                    // 多选事件
                    info.checkboxChange();
                    // 提交试题内容
                    info.setList(resb);
                } else {
                    layer.msg('无效试卷');
                    $('.goBack').removeClass('hidden')
                }
            },
            error: function (e) {

            }
        });
    },
    // 单选事件
    radioChange: function () {
        $('body').delegate('.questionCard .radio_box li', 'click', function () {
            $(this).parent('.radio_box').find('li').find('span').removeClass('active');
            // $('.questionCard .radio_box li span').removeClass('active');
            $(this).find('span').addClass('active');
        });


    },

    // 多选事件
    checkboxChange: function () {
        $('body').delegate('.questionCard .checkbox_box li', 'click', function () {
            if ($(this).find('span').hasClass('active')) {
                $(this).find('span').removeClass('active');
            } else {
                $(this).find('span').addClass('active');
            }
        });

        // 下一题点击事件
        info.nextChange();
        // 上一题点击事件
        info.previousChange();
        // 点击编号跳转试题
        info.cardChange();
    },
    // 下一题点击事件
    nextChange: function () {
        $('.next').off('click').on('click', function () {
            var _thisQuestion = $(this).parents('.questionCard');
            _thisQuestion.addClass('hidden');
            _thisQuestion.next().removeClass('hidden');
            for (var i = 1; i <= $('.card li').length; i++) {
                if ($('.card li:nth-child(' + [i] + ')').attr('data-type') === _thisQuestion.attr('data-type')) {
                    $('.card li:nth-child(' + [i] + ')').removeClass('active');
                    $('.card li:nth-child(' + [i] + ')').next().addClass('active');
                }
            }
        });
    },
    // 上一题点击事件
    previousChange: function () {
        $('body').delegate('.previous', 'click', function () {
            var _thisQuestion = $(this).parents('.questionCard');
            _thisQuestion.addClass('hidden');
            _thisQuestion.prev().removeClass('hidden');
            for (var i = 1; i <= $('.card li').length; i++) {
                if ($('.card li:nth-child(' + [i] + ')').attr('data-type') === _thisQuestion.attr('data-type')) {
                    $('.card li:nth-child(' + [i] + ')').removeClass('active');
                    $('.card li:nth-child(' + [i] + ')').prev().addClass('active');
                }
            }
        });
    },
    cardChange: function () {
        $('body').delegate('.card li', 'click', function () {
            $('.card li').removeClass('active');
            $(this).addClass('active');
            for (var i = 1; i <= $('.card li').length; i++) {
                if ($('.questionCard_box .questionCard:nth-child(' + [i] + ')').attr('data-type') == $(this).attr('data-type')) {
                    $('.questionCard_box .questionCard').addClass('hidden');
                    $('.questionCard_box .questionCard:nth-child(' + [i] + ')').removeClass('hidden');
                }
            }
        });
    },
    // todo 下面是交卷的接口 ,将上方  answer[]  传给后台
    setList: function (resb) {
        //点击交卷事件
        $('.submitTest').click(function () {
            var newScore = 0;
            var sz = 0;
            var flag = true;
            var useranswerList = [];
            //获取所有多选
            $('.checkbox_box').each(function (index, item) {
                var answer = '';
                //获取所有选中的
                ($('.checkbox_box').eq(index).find('li')).each(function (_index, _item) {
                    var classOption = $(this).find(".option").attr('class');
                    if (classOption === 'option active') {
                        //进行拼
                        answer += $(this).find(".active").text() + "|";
                    }
                });
                if (answer === "") {
                    flag = false;
                }
                // 获取id
                var questionId = $(this).parent('li').find('.questionCard_title').find('.questuon_title').attr('data-id');
                // var a = $(this).parent('li').attr('data-type')
                // console.log(az)
                var data = {
                    'questionId': questionId,
                    'answer': answer
                };
                useranswerList.push(data);
            });
            $('.radio_box').each(function (index, item) {
                var answer = '';

                ($('.radio_box').eq(index).find('li')).each(function (_index, _item) {
                    var classOption = $(this).find(".option").attr('class');
                    if (classOption === 'option active') {
                        answer += $(this).find(".active").text() + "|";
                    }
                });
                if (answer === "") {
                    flag = false;
                }
                var questionId = $(this).parent('li').find('.questionCard_title').find('.questuon_title').attr('data-id');
                // var a = $(this).parent('li').attr('data-type')
                var data = {
                    'questionId': questionId,
                    'answer': answer

                };
                useranswerList.push(data);
            });
            var data = {
                'paperId': resb.data.paperId,
                'taskId': taskId,
                'jUserQuesAnswerRecord': JSON.stringify(useranswerList)
            };
            if (flag) {
                layui.use("layer", function () {
                    var layer = layui.layer;
                    layer.open({
                        type: 1,
                        closeBtn: 1,
                        area: ['400px', '200px'],
                        move: false,
                        title: ['', 'background-color: #279ef0'],
                        content: '<div class="confirmRelease">是否交卷?</div>' +
                            '<div class="CR-btn-box">' +
                            '<button type="button" class="layui-btn layui-btn-normal layui-btn-sm CR-btnConfirm">确认</button>' +
                            '<button type="button" class="layui-btn layui-btn-normal layui-btn-sm CR-btnCancel">取消</button>' +
                            '</div>',
                        success: function () {
                        }
                    });
                })
            } else {
                layui.use("layer", function () {
                    var layer = layui.layer;
                    layer.open({
                        type: 1,
                        closeBtn: 1,
                        area: ['400px', '200px'],
                        title: ['', 'background-color: #279ef0'],
                        content: '<div class="noConfirmRelease">你有题目没答 是否交卷?</div>' +
                            '<div class="CR-btn-box">' +
                            '<button type="button" class="layui-btn layui-btn-normal layui-btn-sm CR-btnConfirm">确认</button>' +
                            '<button type="button" class="layui-btn layui-btn-normal layui-btn-sm CR-btnCancel">取消</button>' +
                            '</div>'
                    });
                })
            }
            // 点击确认
            $('.CR-btnConfirm').click(function () {
                layer.closeAll();
                $.ajax({
                    url: MCUrl + 'manage_system/paper/answers',
                    data: data,
                    dataType: 'json',
                    type: 'POST',
                    success(res) {
                        if (res || res.data !== null) {
                            var Html = [];
                            Html.push('<div class="editorialContent">');
                            Html.push('<div id="title">');
                            Html.push('<div id="centered">');
                            Html.push('<span>查看答案</span>');
                            Html.push('<a href="#" class="goBack" style="float:right;margin-right:20px"><i class="layui-icon">&#xe602;</i><span style="margin-left:0;">返回</span> </a>');
                            Html.push('<span style="float:right;margin-right:20px">得分:' + res.data.userScore + '</span>');

                            Html.push('</div>');
                            Html.push('</div>');
                            Html.push('<ul class="layui-tab tabHead layui-tab-brief clearfix">');
                            res.data.questionList.forEach(function (item, index) {
                                Html.push('<li class="sortableitem" style = "background-color:#fff;">');
                                Html.push('<div class="topicFramework" style="text-align:left;line-height:1;">');
                                Html.push('<input type="text" class="qusetionId" value="' + item.questionId +
                                    '" hidden="hidden"/>');
                                if (item.questionType === 1) {
                                    item.questionType = '单选题';
                                } else {
                                    item.questionType = '多选题';
                                }
                                Html.push('<p class="num"><span data-id="' + item.questionId + '">' + (index + 1) + '</span>. ' +
                                    item.questionType + '</p>');
                                Html.push('<pre class="distance">' + item.content + '</pre>');
                                item.optionInfo.forEach(function (items, index) {
                                    var record = 0;
                                    var a = item.userAnswer.split('|');
                                    a.forEach(function (iazz, asd) {
                                        if (items.optionType === iazz) {
                                            Html.push('<div class="distance clearfix option"><span class="circular">' + items.optionType +
                                                '</span><pre class="optionStyle">' + items.content + '</pre></div>');
                                            record++;
                                            return false;
                                        }
                                    });
                                    if (record === 0) {
                                        Html.push('<div class="distance option clearfix"><span class="optionNum">' + items.optionType +
                                            '</span><pre class="optionStyle">' + items.content + '</pre></div>');
                                    }
                                });
                                Html.push('<div class="functionBox">');
                                Html.push('<button class="toView" value="' + item.questionId + '"><img src="../imgs/stf.png">查看解析</button>');
                                Html.push('</div>');
                                Html.push('</div>');
                                Html.push('</li>')
                            });
                            Html.push('</ul></div>');
                            $('.wrapper').html(Html.join(''));
                            $('.goBack *').css('color', '#fff');
                            $('.content').css('background-color', '#fff');
                            // 解析
                            $('body').css('padding', '0');
                            info.goBack();
                            $('.toView').off('click').on('click', function () {
                                var QusetionId = $(this).val();
                                // 解析内容
                                var Analysis = '未定义';
                                // 正确答案
                                var OptionType = '未知';
                                $.ajax({
                                    url: MCUrl + 'manage_system/question/answer',
                                    data: {
                                        'questionId': QusetionId
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
												shadeClose:false,
                                                shade: 0.5,
                                                content: '<div class="answerContent">' +
                                                    '<p>正确答案：<span class="answerOptions">' + OptionType + '</span></p>' +
                                                    '<p>答案解析：</p>' +
                                                    '<p class="analysis">' + Analysis + '</p>' +
                                                    '</div>'
                                            });
                                        });
                                    }
                                });
                            });
                        }
                    },
                    error: function (e) {

                    }
                });
            });
            // 点击取消
            $('.CR-btnCancel').click(function () {
                layer.closeAll();
            });
        });
    },
	// 查询心得
    getExperienceList: function (pageNum, taskId) {
        $.ajax({
            url: LBUrl + 'manage_system/task/comments',
            data: {
                'taskId': taskId,
                'pageNum': pageNum,
                'pageSize': 10
            },
            dataType: 'json',
            type: 'GET',
            contentType: 'application/json;charset=utf-8',
            success(resc) {
                var html = [];
                resc.data.list.forEach(function (item, index) {
                    html.push('<li class="List">');
                    html.push('<p class="uName">' + item.userName + '</p>');
                    html.push('<pre>' + item.content + '</pre>');
                    html.push('<p class="time"><span>' + dateFormata(item.cTime) + '</span><span></span></p>');
                    html.push('</li>');
                });
                $('.experienceList').html(html.join(''));
                $('.textExperience').keyup(function () {
                    // $('.textExperience').val().length
                    var textNum = $('.textExperience').val().length;
                    $('.textNum').text(textNum);

                });
                $('.addExperience').removeClass('hidden');
                info.Page(resc.data.total, resc.data.pageNum, taskId);
            }
        });
    },
    // 分页插件
    Page: function (total, curr, taskId) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            //执行一个laypage实例
            laypage.render({
                elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
                count: total, //数据总数，从服务端得
                limit: '10',
                theme: '#1E9FFF',
                curr: curr,
                groups: '5',
                layout: ['prev', 'page', 'next', 'limits', 'skip'],
                jump: function (item, first) {
                    if (!first) {
                        info.getExperienceList(item.curr, taskId)
                    }
                }
            });

        })
    },

    NoProgressBar: function () {
        // var myAudio = document.getElementById("myAudio"); //获取视频DOM
        // var myVideo = document.getElementById("myVideo"); //获取音频DOM
        // var nowTime = myAudio.currentTime; //获取视频当前播放时间
        // var newTime = myVideo.currentTime; //获取音频当前播放时间
        // var timeInterval = nowTime - lastTime; //用当前时间减去1秒之前的时间
        // if (timeInterval > 0.1) { //判断相差时间是否超过一秒
        // 	myVideo.pause();
        // 	myVideo.currentTime = lastTime; //返回之前的视频播放时间
        // }
        // if (timeInterval > 0.1) { //判断相差时间是否超过一秒
        // 	myAudio.pause();
        // 	myAudio.currentTime = lastTime; //返回之前的视频播放时间
        // }
        // lastTime = nowTime; //播放时间中转（全局变量）
    },
	// 返回页面【管理员/用户】
    goBack: function () {
        $('.goBack').off('click').on('click', function () {
            if (localStorage.getItem('userType') == 1) {
                window.location.href = '/StudeSystem/TaskPage/TaskPage.html'
            } else {
                window.location.href = '/StudeSystem/UserHomePage/UserHomePage.html'
            }

        });
    }
};
var dateFormata = function (time) {
    var date = new Date(time);
    var year = date.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    // 拼接
    return year + "-" + month + "-" + day + " " + (hours - 8) + ":" + minutes + ":" + seconds;
};
