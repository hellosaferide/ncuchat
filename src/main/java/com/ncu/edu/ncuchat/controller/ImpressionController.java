package com.ncu.edu.ncuchat.controller;


import com.ncu.edu.ncuchat.entity.Impression;
import com.ncu.edu.ncuchat.service.ImpressionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping("/impression")
public class ImpressionController {

    @Autowired
    private ImpressionService impressionService;

    @RequestMapping(value = "/findAll",method = RequestMethod.GET)
    public List<Impression> findAll(){
        return impressionService.finAll();
    }

    @RequestMapping("/saveImpression")
    public void saveImpression(Impression impression){
        impressionService.saveImpression(impression);
    }
}
