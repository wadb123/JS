$(document).ready(function () {
    //获取本地储存的数组
    var sh = sessionStorage.getItem("shu");
    var shu = sh.split(",");

    //第一次进入此页面时间计时
    if (sessionStorage.getItem("stepTime") != null) {
        var aTime = sessionStorage.getItem("stepTime");
        var stepTime = aTime.split(",");
    }
    else {
        var stepTime = [];
        stepTime[0] = parseInt(sessionStorage.getItem("startTime"));
    } console.log(stepTime);

    //结束游戏按钮
    $("#btnle").click(function () {
        var flag = confirm("结束当前游戏？");
        if (flag == true) {
            sessionStorage.clear();//新游戏删除之前储存数据
            window.location.href = "../task2/shou.html";
        }
    });
    //法官日志查看
    $("#btnrig").click(function () {
        var b = [0];
        sessionStorage.setItem("taiBen", b);
        window.location.href = "../task3/fa.html";
    });

    //判定游戏是否可以结束
    if (parseInt(sessionStorage.getItem("orlmNumber")) < parseInt(sessionStorage.getItem("killerNumber"))) {
        var a = new Date();
        var time = a.getTime();
        sessionStorage.setItem("endTime", time);
        stepTime.push(time);
        sessionStorage.setItem("stepTime", stepTime);
        voteRtn();
        window.location.href = "result.html";
    }
    else if (parseInt(sessionStorage.getItem("killerNumber")) == 0) {
        var a = new Date();
        var time = a.getTime();
        sessionStorage.setItem("endTime", time);
        stepTime.push(time);
        sessionStorage.setItem("stepTime", stepTime);
        voteRtn();
        window.location.href = "result.html";
    }
    else if (sessionStorage.getItem("day") != null) {
        var z = sessionStorage.getItem("day");
        var day = new Array;
        day = z.split(",");
        if (sessionStorage.getItem("vote") != null) {
            var a = new Date();
            var time = a.getTime();
            stepTime.push(time);
            sessionStorage.setItem("stepTime", stepTime);
        }
    };
    //判断游戏所进行的天数，进行调整
    function voteRtn() {
        if (sessionStorage.getItem("vote") != null) {
            var a = sessionStorage.getItem("day");
            var day = a.split(",");
            day.splice(0, 1);
            sessionStorage.setItem("day", day);
        }
    }

    //每次进入刷新杀人按钮及投票按钮
    sessionStorage.removeItem("kill");
    sessionStorage.removeItem("vote");

    //游戏进行时间统计
    if (sessionStorage.getItem("day") != null) {
        var day = sessionStorage.getItem("day").split(",").length;
        if (sessionStorage.getItem("vote") != null) {
            var a = new Date();
            var time = a.getTime();
            stepTime.push(time);
            sessionStorage.setItem("stepTime", stepTime);
        }
    }

    //获得被淘汰的平民玩家和杀手玩家编号
    if (sessionStorage.getItem("beKill") != null) {
        var beKill = sessionStorage.getItem("beKill").split(",");//被淘汰杀手编号
    }
    if (sessionStorage.getItem("beVote") != null) {
        var beVote = sessionStorage.getItem("beVote").split(",");//被淘汰平民编号
    }
    //根据天数创建步骤
    //进行的天数
    if (sessionStorage.getItem("day") != null) {
        var day = sessionStorage.getItem("day").split(",")//此数组的长度为进行的天数
    }
    else {
        var day = [0];
    };
    for (var o = 0; o < day.length; o++) {
        var number = o + 1;
        $("main").append('<div class="m-ben">' +
            '<div class="benT">' + '<h1>第' + number + '天</h1>' + '</div>' +
            '<div class="benR">' +
            '<div class="moon">' +
            '<button class="step kill left">杀手杀人</button>' + '</div>' +
            '<h5 class="killP"></h5>' +
            '<div class="sun">' +
            '<button class="step Wling left">亡灵发表遗言</button>' +
            '<button class="step Fyan left">玩家依次发言</button>' +
            '<button class="step Tpiao left">投票</button>' +
            '<h5 class="voteP"></h5>' +
            '</div>' +
            '</div>' +
            '</div>')
        //展示被淘汰的玩家，判定
        if (sessionStorage.getItem("beKill") != null && beKill[o] != undefined) {//被杀手杀死的玩家
            $(".killP").eq(o).text((parseInt(beKill[o]) + 1) + "号被杀死，身份是" + shu[beKill[o]]);
        };
        if (sessionStorage.getItem("beVote") != null && beVote[o] != undefined) {//被全民投票投死的玩家
            $(".voteP").eq(o).text((parseInt(beVote[o]) + 1) + "号被投死，身份是" + shu[beVote[o]]);
        };
    };

    //进行第二天时，上一天隐藏至下拉框
    if (day.length > 1) {
        for (let i = 0, len = day.length - 1; i < len; i++) {
            $(".benR").eq(i).hide();
        };
        for (let i = 0; i < day.length; i++) {
            $(".benT").eq(i).click(function () {
                $(".benR").eq(i).toggle();
            });
        };
    };

    //进行到第几步，进行记录
    if (sessionStorage.getItem("step") != null) {
        var a = sessionStorage.getItem("step");
        var x = a.split(",");
        $(".Wling").attr("disabled", false);
    }
    else {
        var x = [];
    };
    //完成步骤按钮变色，及禁止点击
    function disable() {
        for (var i = 0; i < x.length; i++) {
            $(".step").eq(i).css("background-color", "grey");
            $(".step").eq(i).addClass("step-chance");
            $(".step").eq(i).attr("disabled", true);
        };
    };
    disable();

    //杀手杀人按钮
    $(".kill").click(function () {
        x.push(0);
        sessionStorage.setItem("step", x);
        sessionStorage.setItem("kill", 1);
        alert("天黑请闭眼。")
        window.location.href = "../task3/kill.html";
    });
    //亡灵发言按钮
    $(".Wling").click(function () {
        if (x.length % 4 != 1) {
            alert("请按顺序进行！")
        }
        else {
            x.push(0);
            sessionStorage.setItem("step", x);
            disable();
            alert("请死者亮明身份，并发表遗言")
        }
    });
    //玩家依次发言按钮
    $(".Fyan").click(function () {
        if (x.length % 4 != 2) {
            alert("请按顺序进行！")
        }
        else {
            x.push(0);
            sessionStorage.setItem("step", x);
            disable();
            alert("玩家依次发言讨论")
        }
    });
    //投票按钮
    $(".Tpiao").click(function () {
        if (x.length % 4 != 3) {
            alert("请按顺序进行!")
        }
        else {
            day.push(0);
            sessionStorage.setItem("day", day);//最后一步,天数增加
            x.push(0);
            sessionStorage.setItem("step", x);
            sessionStorage.setItem("vote", 1);
            window.location.href = "../task3/kill.html";
        }
    });

    var m = parseInt(sessionStorage.getItem("orlmNumber"));
    var k = parseInt(sessionStorage.getItem("killerNumber"));
    console.log(m);//杀手剩余人数
    console.log(k);//平民剩余人数
});