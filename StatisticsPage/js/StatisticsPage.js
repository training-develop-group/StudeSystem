$(function () {
    layui.use(['layer', 'form'], function() {
        var layer = layui.layer,
            form = layui.form;

        All.getMenu({
            num: 6
        });
    });
});

