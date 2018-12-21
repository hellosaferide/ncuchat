package com.ncu.edu.happychat.dao;


import com.ncu.edu.happychat.entity.Chats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatsDao extends JpaRepository<Chats,Integer> {
    @Query(value = "select * from chats where  userId=?and friendId =?",nativeQuery = true)
    List<Chats> queryContent(String userId, String friendId);
}
