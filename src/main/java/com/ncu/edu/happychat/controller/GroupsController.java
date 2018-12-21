package com.ncu.edu.happychat.controller;


import com.ncu.edu.happychat.entity.Groups;
import com.ncu.edu.happychat.service.GroupsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/groups")
public class GroupsController {
    @Autowired
    private GroupsService service;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Groups> findAll() {
        return service.findAll();
    }

    @PostMapping("/i")
    public void saveGroups(Groups groups) {
        service.saveGroups(groups);
    }

    @PostMapping("/d")
    public void deleteGroups(Groups groups){
        service.deleteGroups(groups);
    }

    @PostMapping("/u")
    public void updateGroups(Groups groups){
        service.updateGroups(groups);
    }
}
