package com.ncu.edu.ncuchat.service;


import com.ncu.edu.ncuchat.dao.RelationshipsDao;
import com.ncu.edu.ncuchat.entity.Relationships;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RelationshipsService {
    @Autowired
    private RelationshipsDao relationshipsDao;

    public List<Relationships> findAll(){
        return relationshipsDao.findAll();
    }

    public void saveRelationships(Relationships relationships) {
        relationshipsDao.save(relationships);
    }

    public void deleteRelationships(Relationships relationships) {
        relationshipsDao.delete(relationships);
    }

    public void updateRelationships(Relationships relationships) {
        if (relationshipsDao.findById(relationships.getUserId()).isPresent()){
            relationshipsDao.save(relationships);
        }
    }
}
