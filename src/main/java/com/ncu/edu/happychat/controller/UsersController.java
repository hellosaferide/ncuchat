package com.ncu.edu.happychat.controller;


import com.ncu.edu.happychat.entity.JsonTransform;
import com.ncu.edu.happychat.entity.Users;
import com.ncu.edu.happychat.service.UsersService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {
    @Autowired
    private UsersService usersService;

    @RequestMapping("/userNickName")
    public String findUserNickNameByUserId(Integer id){
        return usersService.findUserNickNameByUserId(id);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Users> findAll() {
        return usersService.findAll();
    }

    @PostMapping("/i")
    public void saveUsers(Users users) {
        usersService.saveUsers(users);
    }

    @PostMapping("/d")
    public void deleteUsers(Users users) {
        usersService.deleteUsers(users);
    }

    @PostMapping("/u")
    public void updateUsers(Users users) {
        usersService.updateUsers(users);
    }

    @PostMapping("/g")
    public List<Users> queryUsers(String userPhone) {
        return usersService.queryUsers(userPhone);
    }

    @RequestMapping(value = "/findFriend",method = RequestMethod.GET,produces = "text/plain;charset=UTF-8")
    public @ResponseBody
    String searchFriend(@RequestParam("user_info") String user_info){
        JSONObject object=JSONObject.fromObject(user_info);
        System.out.println(user_info);
        String userName=object.getString("username");
        int sex=object.getInt("sex");
        System.out.println(userName);
        System.out.println(sex);
        List<Users> usersList =usersService.queryUsers(userName,sex);
        if(!usersList.isEmpty()){
            return JsonTransform.userListToJSON(usersList).toString();
        }else {
            return "-1";
        }
    }

}