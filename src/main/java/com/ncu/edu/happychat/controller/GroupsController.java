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
}
