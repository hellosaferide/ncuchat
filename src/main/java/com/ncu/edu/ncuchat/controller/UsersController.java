package com.ncu.edu.ncuchat.controller;


import com.ncu.edu.ncuchat.entity.Users;
import com.ncu.edu.ncuchat.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {
    @Autowired
    private UsersService service;

    @RequestMapping("/userNickName")
    public String findUserNickNameByUserId(Integer id){
        return service.findUserNickNameByUserId(id);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Users> findAll() {
        return service.findAll();
    }

    @PostMapping("/i")
    public void saveUsers(Users users) {
        service.saveUsers(users);
    }

    @PostMapping("/d")
    public void deleteUsers(Users users) {
        service.deleteUsers(users);
    }

    @PostMapping("/u")
    public void updateUsers(Users users) {
        service.updateUsers(users);
    }

    @PostMapping("/g")
    public List<Users> queryUsers(String userPhone) {
        return service.queryUsers(userPhone);
    }

    /*@RequestMapping(value = "/loadLoginUser",method = RequestMethod.GET)
    public List<LoginUser> queryLoginUser(){
        return service.queryLoginUsers();
    }*/
}