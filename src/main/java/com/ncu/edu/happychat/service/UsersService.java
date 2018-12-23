package com.ncu.edu.happychat.service;


import com.ncu.edu.happychat.dao.RelationshipsDao;
import com.ncu.edu.happychat.dao.UsersDao;
import com.ncu.edu.happychat.entity.Relationships;
import com.ncu.edu.happychat.entity.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsersService {
    @Autowired
    private UsersDao usersDao;

    @Autowired
    private RelationshipsDao relationshipsDao;

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
    public List<Users> queryUsers(String username,int sex){
        List<Users> usersList=usersDao.findAll();
        List<Users> returnUser=new ArrayList<>();
        for (int i=0;i<usersList.size();i++){
            if (usersList.get(i).getUserNickname().indexOf(username)!=-1&&usersList.get(i).getUserSex()==sex){
                returnUser.add(usersList.get(i));
            }
        }
        return returnUser;
    }
    public List<Users> selUserByNickname(String user_nickname){
        List<Users> usersList=usersDao.findAll();
        List<Users> returnUser=new ArrayList<>();
        for (int i=0;i<usersList.size();i++){
            if (usersList.get(i).getUserNickname().indexOf(user_nickname)!=-1){
                returnUser.add(usersList.get(i));
            }
        }
        return returnUser;
    }
    public List<Users> selExsitFriend(String user_nickname){

        List<Users> friendList=usersDao.findAll();
        List<Users> returnUser=new ArrayList<>();
        for (int i=0;i<friendList.size();i++){
            if (friendList.get(i).getUserNickname().indexOf(user_nickname)!=-1){
                returnUser.add(friendList.get(i));
            }
        }
        return returnUser;

    }

}