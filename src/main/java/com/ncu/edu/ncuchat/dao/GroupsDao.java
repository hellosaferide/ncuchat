package com.ncu.edu.ncuchat.dao;


import com.ncu.edu.ncuchat.entity.Groups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupsDao extends JpaRepository<Groups,Integer> {
}