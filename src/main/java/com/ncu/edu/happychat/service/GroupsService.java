package com.ncu.edu.happychat.service;


import com.ncu.edu.happychat.dao.GroupsDao;
import com.ncu.edu.happychat.entity.Groups;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupsService {
    @Autowired
    private GroupsDao groupsDao;

    public List<Groups> findAll(){
        return groupsDao.findAll();
    }

    public void saveGroups(Groups groups) {
        groupsDao.save(groups);
    }

    public void deleteGroups(Groups groups) {
        groupsDao.delete(groups);
    }

    public void updateGroups(Groups groups) {
        if (groupsDao.findById(groups.getGroupId()).isPresent()){
            groupsDao.save(groups);
        }
    }
}
