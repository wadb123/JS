$(document).ready(function () {
    //获取资源
    var a = sessionStorage.getItem("day");//游戏所进行的天数
    var day = a.split(",").length;
    var startTime = parseInt(sessionStorage.getItem("startTime"));//游戏开始时间
    var endTime = parseInt(sessionStorage.getItem("endTime"));//游戏结束时间
    var x = sessionStorage.getItem("stepTime").split(",");
    var beKill = sessionStorage.getItem("beKill").split(",");//被杀死淘汰的玩家
    var beVote = sessionStorage.getItem("beVote").split(",");//被投票淘汰的玩家
    var shu = sessionStorage.getItem("shu").split(",");//总人数编号及身份数组
    var r = shu.length;//获取人数量
    console.log(r);

    //创建空时间数组，用于储存游戏每天进行的准确时间
    var stepTime = [];
    var minuteTime = [];
    var secondTime = [];
    //获取游戏时间
    for (var l = 0; l < x.length; l++) {
        stepTime[l] = parseInt(x[l]);
    }
    for (var i = 0; i < day; i++) {
        minuteTime[i] = Math.floor((stepTime[i + 1] - stepTime[i]) / 1000 / 60);
        secondTime[i] = Math.floor((stepTime[i + 1] - stepTime[i]) / 1000 % 60);
    }

    //根据胜利方，创建对应的样式
    if (parseInt(sessionStorage.getItem("killerNumber")) == 0) {
        $("h2").text("平民胜利");
        $("h3").text("本轮游戏中共抓住" + Math.floor(r / 4) + "名杀手，存活" + 
        (r - beVote.length - beKill.length) + 
        "名平民，共经历了" + day + "次夜晚，在杀人游戏中击败了67%的玩家！");
    }
    else {
        $("h2").text("杀手胜利");
        $("h3").text("太棒了！在杀人游戏中只有20%的杀手才能获得游戏的胜利！");
    }

    //展现总时间，及各类玩家人数和词汇
    var orlm = sessionStorage.getItem("orlm");//平民词汇
    var killer = sessionStorage.getItem("killer");//杀手词汇
    $(".Yshi").text("本次游戏总计用时 " + Math.round((endTime - startTime) / 1000 / 60) + " 分钟");
    $(".left").text("杀 手 " + Math.floor(r / 4) + " 人");
    $(".right").text("平 民 " + (r - Math.floor(r / 4)) + " 人");
    $(".orlm").text("平民词汇：" + orlm);
    $(".killer").text("杀手词汇：" + killer);

    //循环展示游戏每天的游戏进度
    for (var i = 0; i < day; i++) {
        $(".main").append('<div class="main-t">' +
            '<div class="box">' +
            '<div class="box-l">第 ' + (i + 1) + ' 天</div>' +
            '<div class="box-r">' + minuteTime[i] + ' 分 ' + secondTime[i] + ' 秒 ' + '</div>' +
            '</div>' +
            '<h6>' + "晚上：" + (parseInt(beKill[i]) + 1) + "号被杀死，身份是" + shu[beKill[i]] + '</h6>' +
            '<h6 class="day"></h6>' +
            '</div>'
        )
        if (beVote[i] != undefined) {
            $(".day").eq(i).text("白天：" + (parseInt(beVote[i]) + 1) + "号玩家被全民投死，身份是" + shu[beVote[i]])
        }
    }
});
//再来一局，不能忘了原生JS？？虽然就一条。(/wul)Q
function btnLe() {
    sessionStorage.clear();//新游戏删除之前储存数据
    window.location.href = "../shou.html";
}
