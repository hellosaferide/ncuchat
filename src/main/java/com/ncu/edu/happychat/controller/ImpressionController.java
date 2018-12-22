package com.ncu.edu.happychat.controller;


import com.ncu.edu.happychat.entity.Impression;
import com.ncu.edu.happychat.entity.JsonTransform;
import com.ncu.edu.happychat.service.ImpressionService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/impression")
public class ImpressionController {

    @Autowired
    private ImpressionService impressionService;

    @RequestMapping(value = "/findAllImpression",method = RequestMethod.GET)
    public List<Impression> findAll(){
        return impressionService.findAll();
    }


    @RequestMapping(value = "/saveFriendImpression")
    public @ResponseBody String saveImpression(@RequestParam("obj") String obj){
        JSONObject jsonObject=JSONObject.fromObject(obj);
        int userId=jsonObject.getInt("userId");
        String content=jsonObject.getString("impressionText");
        Impression impression=new Impression();
        impression.setUserId(userId);
        impression.setImpressionContent(content);
        impressionService.saveImpression(impression);
        return "1";
    }

    @RequestMapping(value = "/findFriendImpression",method = RequestMethod.GET)
    public @ResponseBody String findAllFriendImpression(@RequestParam("userId") String user){
        int userId = Integer.parseInt(user);
        List<Impression> impressionList = impressionService.findAllByUserId(userId);
        return JsonTransform.impressionListToJson(impressionList).toString();
    }
}
