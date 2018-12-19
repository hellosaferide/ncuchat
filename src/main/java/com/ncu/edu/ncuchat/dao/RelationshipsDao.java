package com.ncu.edu.ncuchat.dao;


import com.ncu.edu.ncuchat.entity.Relationships;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RelationshipsDao extends JpaRepository<Relationships,Integer> {
}
