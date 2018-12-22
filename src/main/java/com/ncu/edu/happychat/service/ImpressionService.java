package com.ncu.edu.happychat.service;



import com.ncu.edu.happychat.dao.ImpressionDao;
import com.ncu.edu.happychat.entity.Impression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImpressionService {
    @Autowired
    private ImpressionDao impressionDao;

    public List<Impression> findAllByUserId(Integer userId){
        return impressionDao.findAllByUserId(userId);
    }

    public List<Impression> findAll(){
        return impressionDao.findAll();
    }

    public void saveImpression(Impression impression){
        impressionDao.save(impression);
    }
}
