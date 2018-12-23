package com.ncu.edu.happychat.controller;

import com.ncu.edu.happychat.entity.Relationships;
import com.ncu.edu.happychat.service.RelationshipsService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(value="/deleteRelationship")
    public String deleteRelationships(@RequestParam("jsonData") String jsonData){
        JSONObject jsonObject=JSONObject.fromObject(jsonData);
        int userId=jsonObject.getInt("userId");
        int friendId=jsonObject.getInt("friendId");
        List<Relationships> list=service.findAll();
        Relationships relationships=null;
        for (int i=0;i<list.size();i++){
            if (list.get(i).getUserId()==userId&&list.get(i).getFriendId()==friendId){
                relationships=list.get(i);
            }
        }
        service.deleteRelationships(relationships);
        return "1";
    }


    @PostMapping("/u")
    public void updateRelationships(Relationships relationships){
        service.updateRelationships(relationships);
    }
}
