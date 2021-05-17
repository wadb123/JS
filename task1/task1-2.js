var li = document.getElementsByTagName('li'); //获取所有标签 "li" 的DOM节点
    start = document.getElementById('btn-start');//选中开始按钮ID
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
/*开始闪时间绑定*/
start.onclick = function () {
    function getli() {//随机选取三个格子并变色
        for (var i = 0; i < 9; i++) {//每新的一轮随机变色刷新
            li[i].style.backgroundColor = "orange";
        }
        function numrandom() {//随机数的选取
            var a = [0, 1, 2, 3, 4, 5, 6, 7, 8];//所有数值的容器
            var newa = [];//创建的新的空白容器，用来存放随机数
            var runNum = 3;//获取三个随机数
            for (k = 0; k < runNum; k++) {//使获取的三位随机数进行筛去选定，并将获取的数从总容器中删除
                var ran = Math.round(Math.random() * (a.length - 1));
                newa.push(a[ran]);
                a.splice(ran, 1);
            } 
            var clrone = color();//随机取三个颜色值
                clrtwo = color();
                clrthree = color();
            if (clrone !== clrtwo !== "rgb(255, 165, 0)" && clrtwo !== clrthree !== "rgb(255, 165, 0)" && clrthree !== clrone !== "rgb(255, 165, 0)") {//排除相同颜色值
                console.log(clrone, clrtwo, clrthree);//颜色值控制台
            }
            else {
                numrandom();//若三个颜色值相同，则从新进行新的一轮
            }
            li[newa[0]].style.backgroundColor = clrone;//将三个随机颜色值与三个随机数的格子合并
            li[newa[1]].style.backgroundColor = clrtwo;
            li[newa[2]].style.backgroundColor = clrthree;
            console.log(newa);//随机数控制台
            return newa;//当总容器值被取完，返还所有获取到的值(它们是不相等的)。继续循环
        } numrandom();
    };
    clearInterval(time);//消除上一轮计时，从新新的一轮计时
    time = setTimeout(getli());
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