package com.ncu.edu.ncuchat.controller;


import com.ncu.edu.ncuchat.entity.*;
import com.ncu.edu.ncuchat.service.*;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
public class LoadUserMessage {

    @Autowired
    private UsersService usersService;

    @Autowired
    private RelationshipsService relationshipsService;

    @Autowired
    private ChatsService chatsService;

    @Autowired
    private ImpressionService impressionService;

    @RequestMapping("/loadUserMessage")
    public @ResponseBody String loadUserMessage(HttpServletRequest request){
        List<Users> usersList = usersService.findAll();
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        Users users = new Users();
        for (Users user :usersList) {
            if(user.getUserName().equals(userDetails.getUsername())){
                users = user;
            }
        }
        return JsonTransform.usersToJSON(users).toString();
    }

    @RequestMapping(value = "/loadChats",method = RequestMethod.GET,produces = "text/plain;charset=UTF-8")
    public @ResponseBody String  loadUserChats(@RequestParam("userId") String userId){
        int id = Integer.valueOf(userId);
        List<Chats> chatsList = chatsService.findAll();
        List<Chats> chatsReturn = new ArrayList<>();
        for(Chats chats:chatsList){
            if(chats.getFriendId() == id){
                chatsReturn.add(chats);
            }
        }
        List<Chats> returnChats = new ArrayList<>();
        for(int i =chatsReturn.size()-1;i>=0;i--){
            if(returnChats.isEmpty()){
                returnChats.add(chatsReturn.get(i));
                continue;
            }else {
                if(!returnChats.contains(chatsReturn.get(i))){
                    returnChats.add(chatsReturn.get(i));
                }
            }
        }

        return JsonTransform.chatsListToJSON(returnChats).toString();
    }

    @RequestMapping("/getNickName")
    public @ResponseBody String getNickName(@RequestParam("userId") String userId){
        int id = Integer.valueOf(userId);
        String nickName = null;
        Users user = new Users();
        List<Users> usersList = usersService.findAll();
        for(Users users:usersList){
            if(users.getUserId() == id){
                user = users;
                break;
            }
        }
        return JsonTransform.usersToJSON(user).toString();
    }

    @RequestMapping("/loadChatBetweenTwo")
    public @ResponseBody String loadChatBetweenTwo(@RequestParam("obj") String obj){
        UserAndFriend userAndFriend = JsonTransform.jsonToUserAndFriend(obj);
        List<Chats> chatsList = chatsService.findAll();
        List<Chats> chatsByUserId = new ArrayList<>();
        for(Chats chats:chatsList){
            if(chats.getUserId() == userAndFriend.getUserId()&&chats.getFriendId() == userAndFriend.getFriendId()){
                    chatsByUserId.add(chats);
            }
            if(chats.getFriendId() == userAndFriend.getUserId()&&chats.getUserId() == userAndFriend.getFriendId()){
                chatsByUserId.add(chats);
            }
        }
        return JsonTransform.chatsListToJSON(chatsByUserId).toString();
    }

    @RequestMapping(value = "/loadFriendImpression",method = RequestMethod.GET,produces = "text/plain;charset=UTF-8")
    public @ResponseBody String findAllFriendImpression(@RequestParam("obj") String obj){
        int userId = Integer.valueOf(obj);
        System.out.println(userId);
        List<Impression> impressionList = impressionService.finAll();
        List<Impression> returnImpression = new ArrayList<>();
        for(Impression impression1:impressionList){
            if(impression1.getUserId() == userId){
                returnImpression.add(impression1);
            }
        }
        return JsonTransform.impressionListToJson(returnImpression).toString();
    }

    @RequestMapping(value = "/saveFriendImpression",method = RequestMethod.GET,produces = "text/plain;charset=UTF-8")
    public @ResponseBody String saveFriendImpression(@RequestParam("obj") String obj){

        JSONObject jsonObject = new JSONObject(obj);
        Impression impression = new Impression();
        impression.setUserId(jsonObject.getInt("userId"));
        impression.setImpressionText(jsonObject.getString("impressionText"));
        impressionService.saveImpression(impression);
        return "1";
    }

    @RequestMapping(value = "/searchFriend",method = RequestMethod.GET,produces = "text/plain;charset=UTF-8")
    public @ResponseBody String searchFriend(@RequestParam("obj") String obj){
        String userName = obj;
        List<Users> usersList = usersService.findAll();
        Users returnUser = new Users();
        boolean isContain = false;
        for(Users users:usersList){
            if(users.getUserName() .equals(userName) ){
                isContain = true;
                returnUser = users;
            }
        }
        if(isContain){
            return JsonTransform.usersToJSON(returnUser).toString();
        }else {
            return "-1";
        }
    }

    @RequestMapping(value = "/addFriend",method = RequestMethod.GET,produces = "text/plain;charset=UTF-8")
    public @ResponseBody String addFriend(@RequestParam("obj") String obj){
        JSONObject jsonObject = new JSONObject(obj);
        Relationships relationships = new Relationships();
        relationships.setUserId(jsonObject.getInt("userId"));
        relationships.setFriendId(jsonObject.getInt("friendId"));
        relationships.setGroupId(Integer.valueOf(jsonObject.getInt("userId")+"0"));
        List<Relationships> relationshipsList = relationshipsService.findAll();
        boolean isContain = false;
        for(Relationships relationships1:relationshipsList){
            if(relationships1.getUserId()==relationships.getUserId()
                    &&relationships1.getFriendId()==relationships.getFriendId()){
                isContain = true;
            }
        }
        if(isContain){
            return "-1";
        }else {
            relationshipsService.saveRelationships(relationships);
            return "1";
        }
    }

    @RequestMapping(value = "/saveChatBetweenTwoUser",method = RequestMethod.GET,produces = "text/plain;charset=UTF-8")
    public @ResponseBody String saveChatBetweenTwoUser(@RequestParam("obj") String obj){
        JSONObject jsonObject = new JSONObject(obj);
        int userId = jsonObject.getInt("userId");
        int friendId = jsonObject.getInt("friendId");
        List<Chats> chatsList = new ArrayList<>();
        ArrayList<Chats> returnChats = new ArrayList<>();
        for(Chats chats:chatsList){
            if(chats.getUserId() == userId&&chats.getFriendId() == friendId){
                returnChats.add(chats);
            }
            if(chats.getFriendId() == userId&&chats.getUserId() == friendId){
                returnChats.add(chats);
            }
        }
        String content = null;
        for(Chats chats:returnChats){
            content = content + chats.toSaveString();
        }
        try {
            File.writeMethod(content);
        }catch (Exception e){
            return "-1";
        }
        return "1";
    }
}
