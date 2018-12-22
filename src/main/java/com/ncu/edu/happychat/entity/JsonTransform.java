package com.ncu.edu.happychat.entity;


import com.ncu.edu.happychat.socket.MessageModel;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import java.util.ArrayList;
import java.util.List;


public class JsonTransform {
    /**
     * 将json数据转换成MessageModel对象
     * @param json
     * @return
     */
    public static MessageModel josnToMessage(String json) {
        MessageModel messageModel ;
        JSONObject obj = JSONObject.fromObject(json);
        messageModel = (MessageModel)JSONObject.toBean(obj,MessageModel.class);
        return messageModel;
    }

    /**
     * 将用户list转换成json数据
     * @param obj
     * @return
     */
    public static String userListToJSON(List<Users> obj){
        JSONArray jsonObject = JSONArray.fromObject(obj);
        String json = jsonObject.toString();
        return json;
    }

    /**
     * 将json数据转换成用户对象
     * @param json
     * @return
     */
    public static Users jsonToUsers(String json){
        Users users = new Users();
        JSONObject obj = new JSONObject(json);
        users.setUserPhone(obj.getString("userTelephone"));
        users.setUserName(obj.getString("userName"));
        users.setUserNickname(obj.getString("userNickName"));
        users.setUserEmail(obj.getString("userEmail"));
        users.setUserSex(Integer.valueOf(obj.getString("userSex")));
        users.setUserAddress(obj.getString("userAddress"));
        users.setUserRemark(obj.getString("userRemark"));
        users.setUserPassword(obj.getString("userPwd"));
        users.setUserPhoto((int)obj.getDouble("userPhoto"));
        return users;
    }

    /**
     *
     * @param json
     * @return
     */
    public static ArrayList<String> jsonToUserLogin(String json){
        ArrayList<String> arrayList = new ArrayList<>();
        JSONObject obj = new JSONObject(json);
        arrayList.add(obj.getString("tel"));
        arrayList.add(obj.getString("pwd"));
        return arrayList;
    }

    /**
     * 将聊天对象list转换成json数据
     * @param chatsList
     * @return
     */
    public static String chatsListToJSON(List<Chats> chatsList){
        JSONArray jsonObject = JSONArray.fromObject(chatsList);
        return jsonObject.toString();
    }

    /**
     * 将用户对象转换成json数据
     * @param users
     * @return
     */
    public static JSONObject usersToJSON(Users users){
        JSONObject jsonObject = JSONObject.fromObject(users);
        return jsonObject;
    }

    public static JSONObject friendIdToJSON(ArrayList<Integer> arrayList){
        JSONObject jsonObject = JSONObject.fromObject(arrayList);
        return jsonObject;
    }
    public static UserAndFriend jsonToUserAndFriend(String json){
        JSONObject jsonObject = JSONObject.fromObject(json);
        UserAndFriend userAndFriend = (UserAndFriend)JSONObject.toBean(jsonObject,UserAndFriend.class);
        return userAndFriend;
    }

    public static Impression jsonToImpression(String json){
        JSONObject jsonObject = JSONObject.fromObject(json);
        Impression impression = (Impression)JSONObject.toBean(jsonObject,Impression.class);
        return impression;
    }
    public static JSONObject impressionToJson(Impression impression){
        JSONObject jsonObject=JSONObject.fromObject(impression);
        return jsonObject;
    }
    public static JSONArray impressionListToJson(List<Impression> impressionList){
        JSONArray jsonArray = JSONArray.fromObject(impressionList);
        return jsonArray;
    }


}
