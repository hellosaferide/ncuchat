function onLoadChatPage() {

    var height=$(window).height();
    $("#container").height(height);
    $("#infor").height(height);
    $("#chat").height(height);
    var userId = null;
    if(userId == null){
        loadUserMessage();
    }
}
var allFriends;
function loadUserMessage() {
    xmlhttp.overrideMimeType("text/xml");
    var url = "/loadUserMessage" ;
    xmlhttp.open("GET", url, true);
    xmlhttp.onreadystatechange = processResponse;
    xmlhttp.send("");

    function processResponse() {
        if (xmlhttp.readyState == 4) { // 判断对象状态
            if (xmlhttp.status == 200) { // 信息已经成功返回，开始处理信息
                var re = xmlhttp.responseText;
                if(re==-1){
                    document.location="/";
                }else{
                    setUserMessage(xmlhttp.responseText);
                }
            } else {
                window.alert("您所请求的页面有异常。");
            }
        }
    }
}

var current_friend;
var friends;

function setUserMessage(UserJsonDatas) {
    var UserJsonData = JSON.parse(UserJsonDatas);
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
    document.getElementById("user_Nick_Name").innerHTML = userNickName;
    document.getElementById("user_Nick_Name").data = userId;
    document.getElementById("user_Remark").innerHTML = userRemark;

    $.ajax({
        type:"get",
        datatype:"string",
        async:false,
        url:"/loadFriends",
        data:{
            "obj":userId
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
            friends = JSON.parse(data);
            var i ;
            var friend;
            for(i =0 ; i < friends.length;i++){
                $.ajax({
                    type:"get",
                    datatype:"string",
                    url:"/getNickName",
                    async:false,
                    data:{
                        "userId":friends[i].userId
                    },
                    success:function (datas) {
                        friend = datas;
                    }
                });
                friend = JSON.parse(friend);
                var time = timetrans(friends[i].sendTime.time);
                var contents = (friends[i].sendContent.length>15)?Mid(friends[i].sendContent,0,14)+"...":friends[i].sendContent;
                var content = "<hr style=\"padding: 0;margin: 0\">" +
                    "<div class=\"listItem\" onclick='selectedFriend("+friend.userId+")' id='"+friend.userId+"'>\n" +
                    "\t\t\t\t\t\t\t<div class=\"row\">\n" +
                    "\t\t\t\t\t\t\t\t<div class=\"col-sm-3\">\n" +
                    "\t\t\t\t\t\t\t\t\t<img th:src=\"@{static/resource/bg.jpg}\">\n" +
                    "\t\t\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t\t\t<div class=\"col-sm-8\">\n" +
                    "\t\t\t\t\t\t\t\t\t<div>\n" +
                    "\t\t\t\t\t\t\t\t\t\t<span style=\"float: left;\">"+friend.userNickname+"</span><span id='"+"time"+friend.userId+"' style=\"float: right\">"+time+"</span>\n" +
                    "\t\t\t\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t\t\t\t<div>&nbsp;</div>\n" +
                    "\t\t\t\t\t\t\t\t\t<span class=\"span_information\" id='"+"information"+friends[i].userId+"'>"+contents+"</span>\n" +
                    "\t\t\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t</div>";
                $("#friendsList").append(content) ;
            }
        }
    });
}

function selectedFriend(friendId) {
    var AllChatByTwo;
    $(".listItem").css("background","#333");
    $("#"+friendId).css("background","#666");
    document.getElementById("output").innerHTML="";
    document.getElementById("comment").disabled = false;
    document.getElementById("buttonSend").disabled = false;
    var i = 0;
    for(i = 0;i<allFriends.length;i++){
        if(allFriends[i].userId === friendId){
            current_friend = allFriends[i];
            break;
        }
    }
    document.getElementById("chatUser").data = current_friend.userName;
    document.getElementById("chatUser").innerHTML = current_friend.userNickname+
    "<span style='float: right;cursor: pointer;margin-right: 40px;'><a onclick='saveChats(document.getElementById(\"user_Nick_Name\").data,current_friend.userId)' class='saveA'>保存聊天记录</a></span>";

    var jsonChat = {
        "userId":document.getElementById("user_Nick_Name").data,
        "friendId":current_friend.userId
    };
    $.ajax({
        type:"get",
        datatype:"string",
        async:false,
        url:"/loadChatBetweenTwo",
        data:{
            "obj":JSON.stringify(jsonChat)
        },
        success:function (data) {
            AllChatByTwo = JSON.parse(data);
        }
    });
    var i =0;
    for(i=0;i<AllChatByTwo.length;i++){
        if(AllChatByTwo[i].userId === current_friend.userId){
            $('#output').append("<div class=\"chatMessage\">\n" +
                "                                <img th:src=\"@{static/resource/bg.jpg}\">\n" +
                "                                <div class=\"panel\" style=\"display:inline-block;max-width:83%\">\n" + AllChatByTwo[i].sendContent +
                "                                </div>\n" +
                "                            </div>");
        }else {
            $('#output').append("<div class=\"chatMessage\" style=\"text-align: right\">\n" +
                "                                <div class=\"panel\" style=\"display:inline-block;max-width:83%;\">\n" + AllChatByTwo[i].sendContent +
                "                                </div>\n" +
                "                                <img style=\"margin-right: 20px;\" th:src=\"@{static/resource/bg.jpg}\">\n" +
                "                            </div>");
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

function interactive(){
	document.getElementById("addressbook").src="resource/addressbook.png";
	document.getElementById("interactive").src="resource/interactive_fill.png";
	document.location.reload();
}
function addressbook(){
	document.getElementById("addressbook").src="resource/addressbook_fill.png";
	document.getElementById("interactive").src="resource/interactive.png";
	loadAddress();
}

function loadAddress() {
    var i = 0;
    document.getElementById("friendsList").innerHTML="";
    for(i=0;i<allFriends.length;i++){
        var friend = allFriends[i];
        var content1 = "<hr style=\"padding: 0;margin: 0\">" +
            "<div class=\"listItem\"  onclick='selectedFriend("+friend.userId+")' id='"+friend.userId+"'>\n" +
            "\t\t\t\t\t\t\t<div class=\"row\">\n" +
            "\t\t\t\t\t\t\t\t<div class=\"col-sm-3\">\n" +
            "\t\t\t\t\t\t\t\t\t<img onmouseover=\"hoverDivCard("+friend.userId+")\" onmouseout=\"outDivCard()\" id=\"head_Protrait\" th:src=\"@{static/resource/bg.jpg}\">\n" +
            "\t\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t\t\t<div class=\"col-sm-8\">\n" +
            "\t\t\t\t\t\t\t\t\t<div>\n" +
            "\t\t\t\t\t\t\t\t\t\t<span style=\"float: left;\">"+friend.userNickname+"</span>"+
            "\t\t\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t</div>";
        $("#friendsList").append(content1) ;
    }
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


function hoverDivCard(friendId) {
    var friend_card;
    var i = 0;
    for(i=0;i<allFriends.length;i++) {
        if(friendId === allFriends[i].userId){
            friend_card = allFriends[i];
        }
    }
    var sex;
    switch (friend_card.userSex){
        case 1:sex = "男";break;
        case 2:sex = "女";break;
        default:sex = "暂不公开";break;
    }
    document.getElementById("friendNickName").data = friend_card.userId;
    document.getElementById("friendNickName").innerHTML = friend_card.userNickname;
    document.getElementById("friendSex").innerHTML = sex;
    document.getElementById("friendTel").innerHTML = friend_card.userPhone;
    document.getElementById("friendEmail").innerHTML = friend_card.userEmail;
    document.getElementById("friendAddress").innerHTML = friend_card.userAddress;
    document.getElementById("individuality").innerHTML = friend_card.userRemark;

    var impressionJson;
    $.ajax({
        type:"get",
        datatype:"string",
        async:false,
        url:"/loadFriendImpression",
        data:{
            "obj":friend_card.userId
        },
        success:function (data) {
            impressionJson = JSON.parse(data);
        }
    });
    document.getElementById("friendsImpression").innerHTML="";
    var i=0;
    for(i=0;i<impressionJson.length;i++){
        var impressions = "<span style=\"padding: 6px\" class=\"badge badge-pill badge-primary\">"+impressionJson[i].impressionText+"</span>";
        $("#friendsImpression").append(impressions);
    }

    var x = $('#'+friend_card.userId).offset().left;
    var y = $('#'+friend_card.userId).offset().top;
    var height = $("#divCard").height();
    var height2 = $('#'+friend_card.userId).height();
    if(y>height){
        $("#divCard").css({'top':y-height+3});
    }else {
        $("#divCard").css({'top':y+height2+3});
    }

    $("#divCard").show();
}

function hoverDivCards() {
    $("#divCard").show();
}

function outDivCard() {
    $("#divCard").hide();
}

function addImpression() {
    var inputImpression = document.getElementById("inputImpression").value;
    if(!inputImpression == ""){
        var saveMessage = {
            "userId":document.getElementById("friendNickName").data,
            "impressionText":inputImpression
        };
        $.ajax({
            type:"get",
            datatype:"string",
            async:false,
            url:"/saveFriendImpression",
            data:{
                "obj":JSON.stringify(saveMessage)
            },
            success:function (data) {
                $("#inputImpression").val("");
                if(data=="-1"){
                    alert("添加印象失败");
                }
            }
        });
        hoverDivCard(document.getElementById("friendNickName").data);
    }
}

var nextFriend;
function searchFriend() {
    var userName = document.getElementById("searchInput").value;
    if(!userName == ""){
        $.ajax({
            type:"get",
            datatype:"string",
            async:false,
            url:"/searchFriend",
            data:{
                "obj":userName
            },
            success:function (data) {
                $("#inputImpression").val("");
                if(data=="-1"){
                    alert("没有该用户");
                }else {
                    nextFriend = JSON.parse(data);
                    addFriend();
                }
            }
        });
    }
}

function addFriend() {
    var element = document.getElementById("output");
    var friendSex ;
    switch (nextFriend.userSex){
        case 1:friendSex = "男";break;
        case 2:friendSex = "女";break;
        default:friendSex = "暂不公开";break;
    }
    var addFriendMessage = "<div class=\"card\" style=\"width:600px;\">\n" +
        "    <div class=\"card-body\">\n" +
        "        <h6 class=\"card-title\">昵称 ：<span>"+nextFriend.userNickname+"</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n" +
        "            <span>"+friendSex+"</span>\n" +
        "        </h6>\n" +
        "        <h6 class=\"card-title\">电话 ：<span>"+nextFriend.userPhone+"</span></h6>\n" +
        "        <h6 class=\"card-title\">邮箱 ：<span>"+nextFriend.userEmail+"</span></h6>\n" +
        "        <h6 class=\"card-title\">地址 ：<span>"+nextFriend.userAddress+"</span></h6>\n" +
        "        <h6 class=\"card-title\">个性签名 ：<span>"+nextFriend.userRemark+"</span></h6>\n" +
        "        <a style=\"cursor: pointer\" onclick='addFriendToList()'  class=\"btn btn-primary\">添加好友</a>\n" +
        "    </div>\n" +
        "</div>";
    element.innerHTML = addFriendMessage;
}
function addFriendToList() {
    var addFriedPackage = {
        "userId":document.getElementById("user_Nick_Name").data,
        "friendId":nextFriend.userId
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
            $("#inputImpression").val("");
            if(data=="-1"){
                alert("该用户已经是您的好友");
            }else {
                alert("添加成功");
            }
        }
    });
}