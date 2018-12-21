package com.ncu.edu.happychat.service;


import com.ncu.edu.happychat.dao.UsersDao;
import com.ncu.edu.happychat.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {
    @Autowired
    private UsersDao usersDao;

    public List<Users> findAll(){
        return usersDao.findAll();
    }

    public void saveUsers(Users users) {
        usersDao.save(users);
    }

    public void deleteUsers(Users users) {
        usersDao.delete(users);
    }

    public void updateUsers(Users users) {
        if (usersDao.findById(users.getUserId()).isPresent()){
            usersDao.save(users);
        }
    }

    public String findUserNickNameByUserId(Integer user_id){
        return usersDao.findUserNickNameByUserId(user_id);
    }

    public int findByUserName(String userName){
        return usersDao.findByUserName(userName);
    }

    public List<Users> queryUsers(String userPhone){
        return usersDao.queryUsers(userPhone);
    }
}