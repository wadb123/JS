
function back() {//返回命令
    window.history.go(-1);
}
$(document).ready(function () {
    //获取各玩家身份及编号，用于创建格子
    var a = sessionStorage.getItem("shu");
    var shu = a.split(",");
    //创建数组用于后面判定格子变色
    if (sessionStorage.getItem("person") != null) {
        var person = JSON.parse(sessionStorage.getItem("person"));
    }
    else {
        var person = [];
        for (let i = 0; i < shu.length; i++) {
            person[i] = {
                number: (i + 1) + "号",
                shu: shu[i],
                condition: "alive",
                beVote: 0,
                beKill: 0
            };
        }
        sessionStorage.setItem("person", JSON.stringify(person));
    }
    //创建玩家格子
    for (var i = 0; i < shu.length; i++) {
        $(".fa-top").append('<div class="block">' +
            '<div class="blockT">' +
            '<div class="block-t">' + shu[i] + '</div>' +
            '<div class="block-b">' + (i + 1) + '号</div>' +
            '</div>' +
            '</div>')
    };
    //判定，当从游戏开始页面进来时，定义实时样式
    if (sessionStorage.getItem("taiBen") != null) {
        $("#bton").hide();//开始按钮隐藏
        //获取被淘汰玩家数据，将其格子变色
        if (sessionStorage.getItem("beKill") != null) {//杀死的
            var k = sessionStorage.getItem("beKill").split(",");
            var bek = k.length;
            for (var i = 0; i < bek; i++) {
                $(".block-t").eq(k[i]).css("background-color", "#83b09a");
            };
        };
        if (sessionStorage.getItem("beVote") != null) {//投死的
            var v = sessionStorage.getItem("beVote").split(",");
            var bev = v.length;
            for (var i = 0; i < bev; i++) {
                $(".block-t").eq(v[i]).css("background-color", "#83b09a");
            };
        };
    }
});
//开始游戏
function bton() {
    window.location.href = '../task4/rizhi.html';
}