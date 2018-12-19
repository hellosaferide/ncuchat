package com.ncu.edu.ncuchat.service;



import com.ncu.edu.ncuchat.dao.ImpressionDao;
import com.ncu.edu.ncuchat.entity.Impression;
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

    public List<Impression> finAll(){
        return impressionDao.findAll();
    }

    public void saveImpression(Impression impression){
        impressionDao.save(impression);
    }
}
