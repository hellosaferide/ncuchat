function onLoad() {
	var height=$(window).height();
	$("#logo").height(height*0.1);
	$("#body").height(height*0.8);
	$("#bottom").height(height*0.1);
}
var xmlhttp;
if (window.XMLHttpRequest)
{
    xmlhttp=new XMLHttpRequest();
}
else
{
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}

function registerSubmit() {
    var userTel= document.getElementById("usertel").value;
    var userName = userTel;
    var userNickName = document.getElementById("username").value;
    var userEmail = document.getElementById("email").value;
    var userSex = document.getElementById("sex").value;
    switch (userSex){
        case "男":userSex="1";break;
        case "女":userSex="2";break;
        default:userSex="0";break;
    }
    var userAddress = document.getElementById("address").value;
    var userRemark = document.getElementById("remark").value;
    var userPwd = document.getElementById("current-password").value;
    var userPwdAgain = document.getElementById("password-again").value;
    var userPhoto = (Math.random()*10)%5;

    if(userTel==""||userPwd==""){
        alert("手机号和密码不能为空！");
    }else if(userPwd!=userPwdAgain){
        alert("两次密码输入不一致！");
    }else {
        var registerMessage = {
            "userTelephone":userTel,
            "userName":userName,
            "userNickName":userNickName,
            "userEmail":userEmail,
            "userSex":userSex,
            "userAddress":userAddress,
            "userRemark":userRemark,
            "userPwd":userPwd,
            "userPhoto":userPhoto
        };
        registerAjax(registerMessage);
    }
}
function registerAjax(obj1) {
    $.ajax({
        type:"get",
        datatype:"string",
        url:"/register",
        async:false,
        data:{
            "obj":JSON.stringify(obj1)
        },
        success:function (data) {
            if(data==="-1"){
                alert("该手机号已被注册！");
            }else {
                alert("注册成功");
            }
        }

    });

}
function loginSubmit() {
    var tel = document.getElementById("username").value;
    var pwd = document.getElementById("pwd").value;
    if(tel==""||pwd==""){
        alert("手机号和密码不能为空！");
    }else {
        var loginUser = {"tel":tel,"pwd":pwd};//json数据
        SaveToDB(loginUser);
    }

}

function SaveToDB(loginUser) {
    var jsonData = JSON.stringify(loginUser);
    //ajax get请求
    $.ajax({
        type:"get",
        url:"/login",
        datatype:String,
        data:{
           "username":loginUser.tel,
            "password":loginUser.pwd
        },
        success:function (data) {
            if(data!=="-1"){
                document.location.href="/chat1";
            }else {
                alert("请重新登录！");
            }
        },
        error:function (data) {
            alert(data);
        }
    });
}