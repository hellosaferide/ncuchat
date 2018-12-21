package com.ncu.edu.happychat.dao;


import com.ncu.edu.happychat.entity.Relationships;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RelationshipsDao extends JpaRepository<Relationships,Integer> {
}
