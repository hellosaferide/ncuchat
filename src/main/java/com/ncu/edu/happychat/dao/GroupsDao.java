package com.ncu.edu.happychat.dao;


import com.ncu.edu.happychat.entity.Groups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupsDao extends JpaRepository<Groups,Integer> {
}