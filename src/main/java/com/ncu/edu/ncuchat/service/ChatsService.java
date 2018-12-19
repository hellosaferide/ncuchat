package com.ncu.edu.ncuchat.service;

import com.ncu.edu.ncuchat.dao.ChatsDao;
import com.ncu.edu.ncuchat.entity.Chats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatsService {
    private final ChatsDao chatsDao;

    @Autowired
    public ChatsService(ChatsDao chatsDao) {
        this.chatsDao = chatsDao;
    }

    public List<Chats> findAll(){
        return chatsDao.findAll();
    }

    public void saveChats(Chats chats) {
        chatsDao.save(chats);
    }

    public void deleteChats(Chats chats) {
        chatsDao.delete(chats);
    }

    public void updateChats(Chats chats) {
        if (chatsDao.findById(chats.getLogId()).isPresent()){
            chatsDao.save(chats);
        }
    }

    public List<Chats> queryContent(String userId,String friendId){
        return chatsDao.queryContent(userId,friendId);
    }
}
