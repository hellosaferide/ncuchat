package com.ncu.edu.happychat.dao;


import com.ncu.edu.happychat.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersDao extends JpaRepository<Users,Integer> {
    @Query(value = "select user_id,user_name," +
            "user_password from users where  user_phone=?",nativeQuery = true)
    List<Users> queryUsers(String userPhone);

    @Query(value = "select user_id from users where user_name = ?",nativeQuery = true)
    int findByUserName(String userName);

    @Query(value = "select user_nickname from users where user_id = ?",nativeQuery = true)
    String findUserNickNameByUserId(Integer user_id);
}