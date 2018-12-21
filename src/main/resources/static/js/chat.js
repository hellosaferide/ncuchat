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
    $("#"+friendId).attr("class","list-group-item active");

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


