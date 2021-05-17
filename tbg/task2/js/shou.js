
$(document).ready(function () {
    //获取DOM节点
    var item = document.getElementById("item");
    var top = document.getElementById("pTop");
    var center = document.getElementById("pCenter");
    var bottom = document.getElementById("pBottom");
    //跳转页面，开始游戏
    item.onclick = function () {
        if (top.innerHTML != "警察版") {
            window.location.href = 'array.html';
        };
    };
    $(".main-top").click(function () {
        window.location.href = "array.html";
    });
    //游戏分类切换；
    $(".icon-l").hide();//初始隐藏；
    $(".icon2").click(function () {
        top.innerHTML = "警察版";
        center.innerHTML = "3.0版";
        bottom.innerHTML = "精英版";
        $(".icon2").hide();
        $(".icon-l").show();
        $(".active").css("background-color", "#d2d2d2");
        $(".active-r").css("background-color", "#69d2eb");
    });
    $(".active-r").click(function () {
        top.innerHTML = "警察版";
        center.innerHTML = "3.0版";
        bottom.innerHTML = "精英版";
        $(".icon2").hide();
        $(".icon-l").show();
        $(".active").css("background-color", "#d2d2d2");
        $(".active-r").css("background-color", "#69d2eb");
    });

    $(".icon-l").click(function () {
        top.innerHTML = "杀手版";
        center.innerHTML = "猜词版";
        bottom.innerHTML = "白痴版";
        $(".icon2").show();
        $(".icon-l").hide();
        $(".active").css("background-color", "#69d2eb");
        $(".active-r").css("background-color", "#d2d2d2");
    });
    $(".active").click(function () {
        top.innerHTML = "杀手版";
        center.innerHTML = "猜词版";
        bottom.innerHTML = "白痴版";
        $(".icon2").show();
        $(".icon-l").hide();
        $(".active").css("background-color", "#69d2eb");
        $(".active-r").css("background-color", "#d2d2d2");
    });
    //侧边隐藏栏
    $(".top-r").hide();
    $(".top-l").click(function () {
        $(".top-l").hide();
        $(".top-r").show();
        $("aside").css("left", "0");
    });
    $(".top-r").click(function () {
        $(".top-r").hide();
        $(".top-l").show();
        $("aside").css("left", "-310px");
    });

});