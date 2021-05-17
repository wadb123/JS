var btm = document.getElementById("btm");//获取输入框DOM节点
var rangeNumber = document.getElementById("rangeNumber");//获取滑动块DOM节点
var orlm = document.getElementById("orlm");//获取水民DOM节点
var killer = document.getElementById("killer");//获取杀手DOM节点
var iptSm = document.getElementById("iptSm")//平民词汇输入框DOM节点
var iptSs = document.getElementById("iptSs")//杀手词汇输入框DOM节点
var footerTop = document.getElementById("footer-t");//获取发牌按钮DOM节点
var clpColor = document.getElementById("clp")//滑动条滑动后颜色DOM节点

//返回命令
function back() {
    window.history.go(-1);
};
//玩家人数的输入框与滚动条同步
function getNumber() {
    if (Number(btm.value) <= 4 && btm.value >= 18) {
        rangeNumber.value = btm.value;
    };
    clp();
    div();
};
//滚动条改变玩家人数随着改变
function change() {//监听滑动条
    if (rangeNumber.value >= 4 && rangeNumber.value <= 18) {
        btm.value = rangeNumber.value;
    };
    clp();
    div();
};
//设置滑动条的的渐变颜色
function div() {
    var a = parseInt(rangeNumber.value);
    clpColor.style.width = ((a - 4) / 14 * 280 - ((a - 4) / 14 * 19)) + "px";
};
//减号按钮与滚动条和输入框同步
function btLeft() {
    rangeNumber.value--;
    if (rangeNumber.value < 4) {
        rangeNumber = 4
    }
    else {
        btm.value = rangeNumber.value;
    };
    clp();
    div();
};
//加号按钮与滚动条和输入框同步
function btRight() {
    rangeNumber.value++;
    if (rangeNumber.value > 18) {
        rangeNumber = 18
    }
    else {
        btm.value = rangeNumber.value;
    };
    clp();
    div();
};
//设置杀手与平民对比身份的数量
function clp() {
    var index = parseInt(btm.value);
    killer.innerHTML = Math.floor(index / 4);//杀手人数
    orlm.innerHTML = (index - Math.floor(index / 4));//平民人数
};
//检测输入人数和分配角色人数总和是否相同
function number() {
    var a = parseInt(btm.value);//总输入人数
    var b = parseInt(killer.innerHTML);//杀手人数
    var c = parseInt(orlm.innerHTML);//平民人数
    if (a == b + c) {
        return true;//当各角色总和等于输入人数时输出正确
    };
};
//检测是否输入词组
function isnull(val) {
    var str = val.value.trim();
    if (str == '' || str == undefined || str == null) {
        return false;//未输入词组返回错误
    }
    else {
        return true;//输入词组返回正确
    };
};
//创建玩家身份数组，并将其打乱
function shuffle() {
    var a = [];//创建角色的组
    console.log(a);
    //将杀手与平民加到数组中
    for (var i = 0; i < orlm.innerHTML; i++) {
        a.push("平民")
    };
    for (var i = 0; i < killer.innerHTML; i++) {
        a.push("杀手")
    };

    var array = a.concat();//将角色数组合并为字符串，用于本地储存，
    //循环将两类玩家打乱
    for (var i = array.length; i--;) {
        var s = Math.floor(Math.random() * (i + 1));//取随机数
        var temp = array[i];
        array[i] = array[s];
        array[s] = temp;
    };
    return array;//返回数组，其为打乱身份后的数组
}; console.log(shuffle());//控制台

//跳转页面命令
footerTop.onclick = function () {//检查是否人数输入正确以及词汇是否输入
    number();//此函数为各角色总和是否等于输入人数
    var num = number();
    isnull(iptSm);//测试函数，来测试自己的词汇输入框
    isnull(iptSs);
    var sm = isnull(iptSm);
    var ss = isnull(iptSs);
    if (btm.value >= 4 && btm.value <= 18 && num == true && sm == true && ss == true && iptSm.value != iptSs.value) {//当都符合要求时跳转下个页面
        window.location.href = '../task3/fan.html';//跳转至
        shuffle();
        sessionStorage.setItem("shu", shuffle());//传参玩家身份数组，
        sessionStorage.setItem("orlm", iptSm.value);//传参平民词汇
        sessionStorage.setItem("killer", iptSs.value);//传参杀手词汇
        var k = killer.innerHTML;
        var m = orlm.innerHTML;
        sessionStorage.setItem("killerNumber", k);//杀手人数
        sessionStorage.setItem("orlmNumber", m);//平民人数
        //游戏开始时间开始计时
        var a = new Date();
        var time = a.getTime();
        sessionStorage.setItem("startTime", time);
    }
    else if (sm != true && ss != true) {
        alert("请输入词汇")//当词汇输入框未输入词汇时弹窗提醒
    }
    else if (iptSm.innerHTML == iptSm.innerHTML) {
        alert("请正确输入人数,及词汇不可相同！")//当人数输入错误，或词汇相同时弹窗提醒
    };
};
