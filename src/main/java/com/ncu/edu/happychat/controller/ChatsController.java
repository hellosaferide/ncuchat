package com.ncu.edu.happychat.controller;

import com.ncu.edu.happychat.entity.Chats;
import com.ncu.edu.happychat.service.ChatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/chats")
public class ChatsController {
    @Autowired
    private ChatsService service;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Chats> findAll() {
        return service.findAll();
    }

    @PostMapping("/i")
    public void saveChats(Chats chats) {
        service.saveChats(chats);
    }

    @PostMapping("/d")
    public void deleteChats(Chats chats){
        service.deleteChats(chats);
    }

    @PostMapping("/u")
    public void updateChats(Chats chats){
        service.updateChats(chats);
    }

    @PostMapping("/g")
    public List<Chats> queryContent(String userId,String friendId){
        return service.queryContent(userId,friendId);
    }
}
