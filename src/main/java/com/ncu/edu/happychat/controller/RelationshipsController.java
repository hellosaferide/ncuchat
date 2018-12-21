package com.ncu.edu.happychat.controller;

import com.ncu.edu.happychat.entity.Relationships;
import com.ncu.edu.happychat.service.RelationshipsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/relationships")
public class RelationshipsController {
    @Autowired
    private RelationshipsService service;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Relationships> findAll() {
        return service.findAll();
    }

    @PostMapping("/i")
    public void saveRelationships(Relationships relationships) {
        service.saveRelationships(relationships);
    }

    @PostMapping("/d")
    public void deleteRelationships(Relationships relationships){
        service.deleteRelationships(relationships);
    }

    @PostMapping("/u")
    public void updateRelationships(Relationships relationships){
        service.updateRelationships(relationships);
    }
}
