package com.ncu.edu.ncuchat.controller;

import com.ncu.edu.ncuchat.entity.JsonTransform;
import com.ncu.edu.ncuchat.entity.Relationships;
import com.ncu.edu.ncuchat.entity.Users;
import com.ncu.edu.ncuchat.service.RelationshipsService;
import com.ncu.edu.ncuchat.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
public class loginController {

    @Autowired
    UsersService usersService;

    @Autowired
    private RelationshipsService relationshipsService;

    @RequestMapping(value = "/loginCheck",produces = "text/plain;charset=UTF-8")
    public @ResponseBody String isLogin(HttpServletRequest request){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        return userDetails.getUsername();
    }

    @RequestMapping(value = "/login",produces = "text/plain;charset=UTF-8")
    public String login(@RequestParam("username")String username,@RequestParam("password")String password){
        List<Users> usersList = usersService.findAll();
        boolean isContain = false;
        for(Users user:usersList){
            if(user.getUserName().equals(username)&&user.getUserPassword().equals(password)){
                isContain = true;
            }
        }

        return ""+isContain;
    }

    @RequestMapping(value = "/register",method = RequestMethod.GET,produces = "text/plain;charset=UTF-8")
    public @ResponseBody String register(@RequestParam("obj") String obj){
        Users users = JsonTransform.jsonToUsers(obj);
        usersService.saveUsers(users);
        return "1";
    }

    @RequestMapping("/loadFriends")
    public @ResponseBody String loadFriends(@RequestParam("obj") String obj){
        ArrayList<Relationships> relationships = (ArrayList<Relationships>) relationshipsService.findAll();
        System.out.println(relationships);
        ArrayList<Integer> friends = new ArrayList<>();
        for(Relationships relationships1:relationships){
            if(relationships1.getUserId() == Integer.valueOf(obj)){
                friends.add(relationships1.getFriendId());
            }
        }
        System.out.println(friends.toString());
        ArrayList<Users> usersArrayList = (ArrayList<Users>) usersService.findAll();
        ArrayList<Users> userReturn = new ArrayList<>();
        for(Users user2:usersArrayList){
            for(Integer id:friends){
                if(id==user2.getUserId()){
                    userReturn.add(user2);
                }
            }
        }

        return JsonTransform.userListToJSON(userReturn);
    }

}
