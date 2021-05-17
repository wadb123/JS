var li = document.getElementsByTagName('li'), //获取所有标签 "li" 的DOM节点
    start = document.getElementById('btn-start'),//选中开始按钮ID
    stop = document.getElementById('btn-stop');//选中结束按钮ID
var time;

function color() {//随机色配置
    var rgb;
    var r = Math.floor(Math.random() * 256);//随机取颜色R的值
    var g = Math.floor(Math.random() * 256);//随机取颜色G的值
    var b = Math.floor(Math.random() * 256);//随机取颜色B的值
    rgb = 'rgb(' + r + ',' + g + ',' + b + ')';//生成随机的颜色值
    return rgb;
};
function getli() {//随机选取三个格子并变色
    for (var i = 0; i < 9; i++) {//每新的一轮随机变色刷新
        li[i].style.backgroundColor = "orange";
    }
    var one = Math.floor(Math.random() * 9),//随机数生成三个数
        two = Math.floor(Math.random() * 9),
        three = Math.floor(Math.random() * 9);
    if (one !== two && two !== three && three !== one) {//排除相同随机数
        console.log(one, two, three);//格子数值控制台
        var clrone = color(),//随机取三个颜色值
            clrtwo = color(),
            clrthree = color();
        if (clrone !== clrtwo !== "rgb(255, 165, 0)" && clrtwo !== clrthree !== "rgb(255, 165, 0)" && clrthree !== clrone !== "rgb(255, 165, 0)") {//排除相同颜色值
            console.log(clrone, clrtwo, clrthree);//颜色值控制台
        }
        else {
            getli();//若三个颜色值相同，则从新进行新的一轮
        }
        li[one].style.backgroundColor = clrone;//将三个随机颜色值与三个随机数的格子合并
        li[two].style.backgroundColor = clrtwo;
        li[three].style.backgroundColor = clrthree;
    }
    else {
        getli();//若三个格子的数值相同，则进行新的一轮
    }
};
/*开始闪时间绑定*/
start.onclick = function () {
    for (var i = 0; i < 9; i++) {//每新的一轮随机变色刷新
        li[i].style.backgroundColor = "orange";
    }
    clearInterval(time);//消除上一轮计时，从新新的一轮计时
    time = setInterval(function () {//随机三个格子的事件开始，并进行固定时间循环
        getli();
    }, 1000);
};
/*结束闪事件绑定*/
stop.onclick = function () {//计时消除，所有格子颜色复原
    clearInterval(time);
    for (var i = 0; i < 9; i++) {
        li[i].style.backgroundColor = "orange";
    }
}
