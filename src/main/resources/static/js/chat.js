function onLoadChatPage() {
    var userId = null;
    if(userId == null){
        loadUserMessage();
    }
}
function loadUserMessage() {
    var xhr=new XMLHttpRequest();
    xhr.overrideMimeType("text/xml");
    var url = "/loadUserMessage" ;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = callback;
    xhr.send("");

    function callback() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var result = xhr.responseText;
                if(result==-1){
                    document.location="/";
                }else{
                    setUserMessage(xhr.responseText);
                }
            } else {
                window.alert("您所请求的页面有异常。");
            }
        }
    }
}


var current_friend;
var chats;
var allFriends;
function setUserMessage(UserJsonDatas) {

    var UserJsonData = JSON.parse(UserJsonDatas);//将字符串转成json数组
    var userId = UserJsonData.userId;
    var userName = UserJsonData.userName;
    var userTel= UserJsonData.userTelephone;
    var userNickName = UserJsonData.userNickname;
    var userEmail = UserJsonData.userEmail;
    var userSex ;
    switch (UserJsonData.userSex){
        case "1":userSex="男";break;
        case "2":userSex="女";break;
        default:userSex="不公开";break;
    }

    var userAddress = UserJsonData.userAddress;
    var userRemark = UserJsonData.userRemark;
    var userPhoto = UserJsonData.userPhoto;
    document.getElementById("user_nickname").innerHTML = userNickName;
    document.getElementById("user_nickname").data = userId;
    document.getElementById("user_mark").innerHTML = userRemark;



    $.ajax({
        type:"get",
        datatype:"string",
        async:false,
        url:"/loadFriends",
        data:{
            "userId":userId
        },
        success:function (data) {
            allFriends = JSON.parse(data);
        }
    });


    $.ajax({
        type:"get",
        datatype:"string",
        url:"/loadChats",
        async:false,
        data:{
            "userId":userId
        },

        success:function (data) {
            chats = JSON.parse(data);

            var i ;
            var friend;
            for(i =0 ; i < chats.length;i++){


                $.ajax({
                    type:"get",
                    datatype:"string",
                    url:"/getNickName",
                    async:false,
                    data:{
                        "userId":chats[i].userId
                    },
                    success:function (datas) {
                        friend = datas;
                    }
                });

                friend = JSON.parse(friend);//friend为朋友信息


                var time = timetrans(chats[i].sendTime.time);
                var contents = chats[i].sendContent;

                var content="<li class=\"list-group-item\" style='cursor: pointer' onclick='selectedFriend("+friend.userId+")' id='"+friend.userId+"'>\n" +
                    "\t\t\t\t\t\t\t\t\t<div class=\"container-fluid\">\n" +
                    "                                        <div class=\"row\">\n" +
                    "                                            <div class=\"col-sm-3\">\n" +
                    "                                                <img src='resource/ben-dehghan.jpg' width=\"60\" height=\"60\">\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"col-sm-4\">\n" +
                    "                                                <div id=\"friend_name\">"+friend.userNickname+"</div>\n" +
                    "                                                <div id='"+"content"+friend.userId+"'>"+contents+"</div>\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"col-sm-5\">\n" +
                    "                                                <span style='font-size: 10px;float: right' id='"+"time"+friend.userId+"' >"+time+"</span>\n" +
                    "                                            </div>\n" +
                    "                                        </div>\n" +
                    "                                    </div>\n" +
                    "\t\t\t\t\t\t\t\t</li>"
                $("#friendList").append(content);
            }
        }
    });
}
function timetrans(dates){
    var datetime = new Date();
    datetime.setTime(dates);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return month + "-" + date+" "+hour+":"+minute;
}

function selectedFriend(friendId) {

    var chats;
    var userId=document.getElementById("user_nickname").data;
    $("#"+friendId).attr("class","list-group-item active");
    $("#save").empty();
    $("#save").append("<i class=\"fas fa-download fa-2x\" style=\"font-size: 28px;cursor: pointer\" onclick=\"saveChats("+userId+","+friendId+")\" id=\"doownlad\"></i>")
    $("#chatContent").empty();
    $("#buttonSend").disabled = false;
    var i = 0;
    //找到当前点击的好友current_friend
    for(i = 0;i<allFriends.length;i++){
        if(allFriends[i].userId === friendId){
            current_friend = allFriends[i];
            break;
        }
    }
    for(i = 0;i<allFriends.length;i++){
        if(allFriends[i].userId != friendId){
            $("#"+allFriends[i].userId).attr("class","list-group-item");
        }
    }
    document.getElementById("chatUser").data = current_friend.userName;
    document.getElementById("chatUser").innerHTML = current_friend.userNickname;


    var jsonChat = {
        "userId":document.getElementById("user_nickname").data,
        "friendId":current_friend.userId
    };


    $.ajax({
        type:"get",
        datatype:"string",
        async:false,
        url:"/loadChatBetweenTwo",
        data:{
            "user_friend":JSON.stringify(jsonChat)

        },
        success:function (data) {
            chats= JSON.parse(data);
        }
    });
    var i =0;
    for(i=0;i<chats.length;i++){
        if(chats[i].userId === current_friend.userId){
            $('#chatContent').append("<div class=\"user_id\">\n" +
                "\t\t\t\t\t\t\t\t\t<img class=\"img-circle\" src='resource/ben-dehghan.jpg' width=\"60\" height=\"60\" >\n" +
                "\t\t\t\t\t\t\t\t\t<div class=\"chat-bubble chat-bubble-left\">\n" +
                "\t\t\t\t\t\t\t\t\t\t"+chats[i].sendContent+"\n" +
                "\t\t\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t\t\t</div>");
        }else {
            $('#chatContent').append("<div class=\"friend_id\">\n" +
                "\t\t\t\t\t\t\t\t\t<div class=\"chat-bubble chat-bubble-right\" style=\"display: inline-block;\">\n" +
                "\t\t\t\t\t\t\t\t\t\t"+chats[i].sendContent+"\n" +
                "\t\t\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t\t\t\t<img class=\"img-circle\" src='resource/ben-dehghan.jpg' width=\"60\" height=\"60\">\n" +
                "\t\t\t\t\t\t\t\t\t\n" +
                "\t\t\t\t\t\t\t\t</div>");
        }
    }


}

function saveChats(userId, friendId) {
    var saveChatsPackage = {
        "userId":userId,
        "friendId":friendId
    }
    $.ajax({
        type:"get",
        datatype:"string",
        async:false,
        url:"/saveChatBetweenTwoUser",
        data:{
            "obj":JSON.stringify(saveChatsPackage)
        },
        success:function (data) {
            alert("保存成功");
        }
    });
}

function loadChat() {
    $("#comment").css("color","blue");
    $("#addressbook").css("color","");
    $("#add").css("color","");
    $("#doownlad").css("color","");
    $("#friendList").empty();
    document.location.reload();
}

function loadFriend() {
    $("#comment").css("color","");
    $("#addressbook").css("color","blue");
    $("#add").css("color","");
    $("#doownlad").css("color","");
    loadAddressBook();
}


function loadAddressBook() {
    var i = 0;
    $("#friendList").empty();

    for(i=0;i<allFriends.length;i++){
        var friend = allFriends[i];
        $("#friendList").append("<li class=\"list-group-item\" onclick=\"selectedFriend("+friend.userId+")\" id='"+friend.userId+"'>\n" +
            "                                    <div class=\"container-fluid\">\n" +
            "                                        <div class=\"row\">\n" +
            "                                            <div class=\"col-sm-3\">\n" +
            "                                                <img src=\"resource/ben-dehghan.jpg\" width='50' height='50' onmouseover=\"hoverCard("+friend.userId+")\" onmouseout=\"outCard()\">\n" +
            "                                            </div>\n" +
            "                                            <div class=\"col-sm-9\">\n" +
            "                                                <div id=\"usernickname\">"+friend.userNickname+"</div>\n" +
            "                                                <div id=\"userremark\">"+friend.userRemark+"</div>\n" +
            "                                            </div>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                </li>") ;

    }
}

function findFriend() {
    var res;
    var username=document.getElementById("input_username").value;
    var sex0=document.getElementById("sex").value;
    var sex;
    if (sex0=="male") {
        sex=1;
    }else if(sex0=="female"){
        sex=2;
    }else{
        sex=0;
    }
    //昵称模糊查询
    var searchInfo = {
        "username":username,
        "sex":sex
    };
    $.ajax({
        type:"get",
        datatype:"string",
        async:false,
        url:"/users/findFriend",
        data:{
            "user_info":JSON.stringify(searchInfo)
        },
        success:function (data) {
            res= JSON.parse(data);
        }
    });
    $("#userListst").empty();
    var list=document.getElementById("userListst");
    for (var i=0;i<res.length;i++){

        var content="<li class=\"list-group-item\" id='"+res[i].userId+"'>\n" +
            "                                    <div class=\"container-fluid\">\n" +
            "                                        <div class=\"row\">\n" +
            "                                            <div class=\"col-sm-3\">\n" +
            "                                                <img src=\"resource/ben-dehghan.jpg\" width=\"50\" height=\"50\" />\n" +
            "                                            </div>\n" +
            "                                            <div class=\"col-sm-7\">\n" +
            "                                                <div class=\"user_name\">"+res[i].userNickname+"</div>\n" +
            "                                                <div class=\"user_remark\">"+res[i].userRemark+"</div>\n" +
            "                                            </div>\n" +
            "                                            <div class=\"col-sm-2\">\n" +
            "                                                <i class=\"fas fa-plus-circle fa-2x\" style=\"cursor: pointer;\" onclick='addFriend("+res[i].userId+")'></i>\n" +
            "                                            </div>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                </li>"
        $("#userListst").append(content);
    }


}
function addFriend(friendId) {
    var addFriedPackage = {
        "userId": document.getElementById("user_nickname").data,
        "friendId":friendId
    };
    $.ajax({
        type:"get",
        datatype:"string",
        async:false,
        url:"/addFriend",
        data:{
            "obj":JSON.stringify(addFriedPackage)
        },
        success:function (data) {
            if(data=="-1"){
                alert("该用户已经是您的好友");
            }else {
                alert("添加成功");
            }
        }
    });
}

