function onLoadChatPage() {
    var userId = null;
    if(userId == null){
        loadUserMessage();
    }
    $("#friendCard").hide();
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
var userPhoto;
function setUserMessage(UserJsonDatas) {

    var UserJsonData = JSON.parse(UserJsonDatas);//将字符串转成json数组
    var userId = UserJsonData.userId;
    var userName = UserJsonData.userName;
    userPhoto = UserJsonData.userPhoto;
    var userTel= UserJsonData.userTelephone;
    var userNickName = UserJsonData.userNickname;
    $("#photo").attr("src","resource/"+userPhoto)
    var userEmail = UserJsonData.userEmail;
    var userSex ;
    switch (UserJsonData.userSex){
        case "1":userSex="男";break;
        case "2":userSex="女";break;
        default:userSex="不公开";break;
    }

    var userAddress = UserJsonData.userAddress;
    var userRemark = UserJsonData.userRemark;
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
                if(contents.length>15){
                    contents=contents.substr(0,15)+".....";
                }
                var content="<li class=\"list-group-item\" style='cursor: pointer' onclick='selectedFriend("+friend.userId+")' id='"+friend.userId+"'>\n" +
                    "\t\t\t\t\t\t\t\t\t<div class=\"container-fluid\">\n" +
                    "                                        <div class=\"row\">\n" +
                    "                                            <div class=\"col-sm-3\">\n" +
                    "                                                <img  width=\"60\" height=\"60\" id='img"+friend.userId+"'>\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"col-sm-4\">\n" +
                    "                                                <div id=\"friend_name\">"+friend.userNickname+"</div>\n" +
                    "                                                <" +
                    "div id='"+"content"+friend.userId+"'>"+contents+"</div>\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"col-sm-5\">\n" +
                    "                                                <span style='font-size: 10px;float: right' id='"+"time"+friend.userId+"' >"+time+"</span>\n" +
                    "                                            </div>\n" +
                    "                                        </div>\n" +
                    "                                    </div>\n" +
                    "\t\t\t\t\t\t\t\t</li>"

                $("#friendList").append(content);
                $("#img"+friend.userId).attr("src","resource/"+friend.userPhoto);
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
    $("#sendButton").attr("disabled",false);
    $("#save").empty();
    $("#save").append("<i class=\"fas fa-download fa-2x\" style=\"font-size: 28px;cursor: pointer\" onclick=\"saveChats("+userId+","+friendId+")\" id=\"doownlad\"></i>")
    $("#chatContent").empty();
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
                "\t\t\t\t\t\t\t\t\t<img class=\"chatimg\" width=\"60\" height=\"60\" >\n" +
                "\t\t\t\t\t\t\t\t\t<div class=\"chat-bubble chat-bubble-left\">\n" +
                "\t\t\t\t\t\t\t\t\t\t"+chats[i].sendContent+"\n" +
                "\t\t\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t\t\t</div>");
            $(".chatimg").eq(i).attr("src","resource/"+current_friend.userPhoto);

        }else {
            $('#chatContent').append("<div class=\"friend_id\">\n" +
                "\t\t\t\t\t\t\t\t\t<div class=\"chat-bubble chat-bubble-right\" style=\"display: inline-block;\">\n" +
                "\t\t\t\t\t\t\t\t\t\t"+chats[i].sendContent+"\n" +
                "\t\t\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t\t\t\t<img class=\"chatimg\" width=\"60\" height=\"60\">\n" +
                "\t\t\t\t\t\t\t\t\t\n" +
                "\t\t\t\t\t\t\t\t</div>");
            $(".chatimg").eq(i).attr("src","resource/"+userPhoto);
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
            "                                                <img width='50' height='50' onmouseover=\"hoverCard("+friend.userId+")\" id='img"+friend.userId+"'>\n" +
            "                                            </div>\n" +
            "                                            <div class=\"col-sm-7\">\n" +
            "                                                <div id=\"usernickname\">"+friend.userNickname+"</div>\n" +
            "                                                <div id=\"userremark\">"+friend.userRemark+"</div>\n" +
            "                                            </div>\n" +
            "                                            <div class=\"col-sm-2\">\n" +
            "                                                  <i class=\"fas fa-trash-alt\" onclick=\"deleteFriend("+friend.userId+","+document.getElementById("user_nickname").data+")\"></i>"+
            "                                            </div>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                </li>") ;
            $("#img"+friend.userId).attr("src","resource/"+friend.userPhoto);
    }
}
function deleteFriend(friendId,userId) {
    var isDelete=confirm("你确定要删除?");

    var jsonData={
        "userId":userId,
        "friendId":friendId
    }

    if(isDelete==true)
    {
        $.ajax({
            type:"get",
            datatype:"string",
            async:false,
            url:"/relationships/deleteRelationship",
            data:{
                "jsonData":JSON.stringify(jsonData)
            },
            success:function (data) {
                if (data=="1"){

                    alert("删除成功");
                }

            }

        });
        $.ajax({
            type:"get",
            datatype:"string",
            async:false,
            url:"/loadFriends",
            data:{
                "userId":document.getElementById("user_nickname").data
            },
            success:function (data) {
                allFriends = JSON.parse(data);
            }
        });
        loadAddressBook();


    }
    else
    {
        alert("放弃删除")
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
            "                                                <img id='userimg"+res[i].userId+"' width=\"50\" height=\"50\" />\n" +
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
        $("#userimg"+res[i].userId).attr("src","resource/"+res[i].userPhoto);
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
function hoverCard(friendId) {

    var friend;
    for(var i=0;i<allFriends.length;i++) {
        if(friendId === allFriends[i].userId){
            friend = allFriends[i];
        }
    }
    var sex;
    switch (friend.userSex){
        case 1:sex = "男";break;
        case 2:sex = "女";break;
        default:sex = "不公开";break;
    }
    document.getElementById("friend_nickname").data = friend.userId;
    document.getElementById("friend_nickname").innerHTML = friend.userNickname;
    document.getElementById("friend_sex").innerHTML = sex;
    document.getElementById("friend_mobile").innerHTML = friend.userPhone;
    document.getElementById("friend_email").innerHTML = friend.userEmail;
    document.getElementById("friend_address").innerHTML = friend.userAddress;
    document.getElementById("friend_username").innerHTML = friend.userName;

    var impression;
    $.ajax({
        type:"get",
        datatype:"string",
        async:false,
        url:"/impression/findFriendImpression",
        data:{
            "userId":friend.userId
        },
        success:function (data) {
            impression = JSON.parse(data);
        }
    });
    $("#friend_impression").empty();
    for(var i=0;i<impression.length;i++){

    $("#friend_impression").append("<span style=\"padding: 6px\" class=\"badge badge-pill badge-primary\">"+impression[i].impressionContent+"</span>")
}
$("#addImpression").empty();
$("#addImpression").append("<input class=\"input-group\" id=\"inputImpression\" style=\"margin-top: 10px\">\n" +
    "                <button class=\"btn-block btn-primary\" onclick=\"addImpression("+friendId+")\">添加好友印象</button>")

    var x = $('#'+friend.userId).offset().left;
    var y = $('#'+friend.userId).offset().top;
    var height = $("#friendCard").height();
    var height2 = $('#'+friend.userId).height();
    $("#friendCard").css('position',"absolute");
    $("#friendCard").css('z-index',1000);
    if(y>height){
        $("#friendCard").css({'top':y-height+3});
    }else {
        $("#friendCard").css({'top':y+height2+3});
    }
    $("#friendCard").show();
    hideInfoCard();
}
function outCard() {
    $("#friendCard").hide();
}
function hideInfoCard(){	//隐藏div
    //延时3秒
    setTimeout(outCard,20000);
}
function out() {
    $("#friendCard").hide();
}
function addImpression(friendId){
    var inputImpression = document.getElementById("inputImpression").value;
    if(!inputImpression == ""){
        var impression = {
            "userId":friendId,
            "impressionText":inputImpression
        };
        $.ajax({
            type:"get",
            datatype:"string",
            async:false,
            url:"/impression/saveFriendImpression",
            data:{
                "obj":JSON.stringify(impression)
            },
            success:function (data) {
                $("#inputImpression").val("");
                if(data=="-1"){
                    alert("添加印象失败");
                }
            }
        });
        hoverDivCard(friendId);
    }
}
function searchFriend() {
    var username=document.getElementById("interaction").value;
    var exsitFriend;
    var jsonData={
        "user_nickname":username
    }
    $.ajax({
        type:"get",
        datatype:"string",
        async:false,
        url:"/users/searchFriend",
        data:{
            "obj":JSON.stringify(jsonData)
        },
        success:function (data) {
            exsitFriend = JSON.parse(data);
        }
    });


    $("#friendList").empty();
    for (var i=0;i<exsitFriend.length;i++){
        var j;
        for(j=0;j<allFriends.length;j++){
            if (allFriends[j].userId==exsitFriend[i].userId){
                break;
            }
        }
        if(j==allFriends.length){
            break;
        }
        $("#friendList").append("<li class=\"list-group-item\" style=\"cursor: pointer\" onclick=\"selectedFriend("+exsitFriend[i].userId+")\" id=\"\">\n" +
            "                                    <div class=\"row\">\n" +
            "                                        <div class=\"col-lg-3\">\n" +
            "                                            <img id='exsit"+exsitFriend[i].userId+"' width=\"60\" height=\"60\">\n" +
            "                                        </div>\n" +
            "                                        <div class=\"col-lg-9\">\n" +
            "                                            <div class=\"user_nickname\">"+exsitFriend[i].userNickname+"</div>\n" +
            "                                            <div class=\"user_remark\">"+exsitFriend[i].userRemark+"</div>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                </li>")

        $("#exsit"+exsitFriend[i].userId).attr("src","resource/"+exsitFriend[i].userPhoto)

    }

}