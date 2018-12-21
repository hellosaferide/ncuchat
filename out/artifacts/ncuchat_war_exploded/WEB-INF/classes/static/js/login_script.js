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
function transformToRegister(){
	var formString="<form>" +
        "            \t\t\t\t\t\t<div class=\"form-group\">\n" +
        "              \t\t\t\t\t\t\t<input type=\"tel\" class=\"form-control\" id=\"usertel\" placeholder=\"请输入手机号\">\n" +
        "            \t\t\t\t\t\t</div>\n" +
        "            \t\t\t\t\t\t<div class=\"form-group\">\n" +
        "              \t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"username\" placeholder=\"请输入您的昵称\">\n" +
        "            \t\t\t\t\t\t</div>\n" +
        "            \t\t\t\t\t\t<div class=\"form-group\">\n" +
        "              \t\t\t\t\t\t\t<input type=\"email\" class=\"form-control\" id=\"email\" placeholder=\"请输入您的邮箱\">\n" +
        "            \t\t\t\t\t\t</div>\n" +
        "            \t\t\t\t\t\t\n" +
        "              \t\t\t\t\t\t<div class=\"form-group\">\n" +
        "              \t\t\t\t\t\t\t<select class=\"form-control\" id=\"sex\">\n" +
        "              \t\t\t\t\t\t\t\t<option>不公开</option>\n" +
        "                \t\t\t\t\t\t\t<option>男</option>\n" +
        "                \t\t\t\t\t\t\t<option>女</option>\n" +
        "              \t\t\t\t\t\t\t</select>\n" +
        "              \t\t\t\t\t\t</div>\n" +
        "            \t\t\t\t\t\t<div class=\"form-group\">\n" +
        "              \t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"address\" placeholder=\"请输入您的地址\">\n" +
        "            \t\t\t\t\t\t</div>\n" +
        "            \t\t\t\t\t\t<div class=\"form-group\">\n" +
        "              \t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"remark\" placeholder=\"备注\">\n" +
        "            \t\t\t\t\t\t</div>\n" +
        "            \t\t\t\t\t\t<div class=\"form-group\">\n" +
        "              \t\t\t\t\t\t\t<input type=\"password\" class=\"form-control\" id=\"current-password\" placeholder=\"请输入密码\">\n" +
        "            \t\t\t\t\t\t</div>\n" +
        "            \t\t\t\t\t\t<div class=\"form-group\">\n" +
        "              \t\t\t\t\t\t\t<input type=\"password\" class=\"form-control\" id=\"password-again\" placeholder=\"请再次输入密码\">\n" +
        "            \t\t\t\t\t\t</div>\n" +
        "          \t\t\t\t\t\t</form>\n" +
        "            \t\t\t\t\t\t<button type=\"submit\" onclick=\"registerSubmit()\" class=\"col-sm-12 btn btn-primary\">注册</button>\n" +
        "        \t\t\t\t\t\t    <span style='color: #f7f7f7'>已有账号？<span class=\"span_button\" href=\"\" onclick=\"transformToSubmit()\">点击登录</span></span>\n";
  	document.getElementById("container").innerHTML=formString;
}
function transformToSubmit() {
    var formString="<form>\n" +
        "    \t\t\t\t\t\t<div class=\"form-group\">\n" +
        "      \t\t\t\t\t\t\t<label for=\"username\">用户名：</label>\n" +
        "      \t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"username\" id=\"username\" placeholder=\"Enter username\">\n" +
        "    \t\t\t\t\t\t</div>\n" +
        "    \t\t\t\t\t\t<div class=\"form-group\">\n" +
        "      \t\t\t\t\t\t\t<label for=\"pwd\">密码:</label>\n" +
        "      \t\t\t\t\t\t\t<input type=\"password\" class=\"form-control\" name=\"password\" id=\"pwd\"  placeholder=\"Enter password\">\n" +
        "    \t\t\t\t\t\t</div>\n" +
        "    \t\t\t\t\t\t<div class=\"form-check\">\n" +
        "      \t\t\t\t\t\t\t<label class=\"form-check-label\">\n" +
        "        \t\t\t\t\t\t<input class=\"form-check-input\" type=\"checkbox\"> Remember me\n" +
        "      \t\t\t\t\t\t\t</label>\n" +
        "    \t\t\t\t\t\t</div>\n" +
        "  \t\t\t\t\t\t</form>\n" +
        "\t\t\t\t\t\t<button type=\"submit\" onclick=\"loginSubmit()\" class=\"col-sm-12 btn btn-primary\">登录</button>\n" +
        "                        <div class=\"container span_prompt\">\n" +
        "\t\t\t\t\t\t    <span>还没有账号？<span class=\"span_button\" onclick=\"transformToRegister()\">点击注册</span></span>\n" +
        "\t\t\t\t\t    </div>";
    document.getElementById("container").innerHTML=formString;

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
        var loginUser = {"tel":tel,"pwd":pwd};
        SaveToDB(loginUser);
    }

}

function SaveToDB(loginUser) {
    var jsonData = JSON.stringify(loginUser);
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
                document.location.href="/chat";
            }else {
                alert("请重新登录！");
            }
        },
        error:function (data) {
            alert(data);
        }
    });
}