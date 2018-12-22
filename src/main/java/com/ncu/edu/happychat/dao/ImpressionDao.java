package com.ncu.edu.happychat.dao;


import com.ncu.edu.happychat.entity.Impression;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImpressionDao extends JpaRepository<Impression,Integer> {
    /**
     * 根据好友Id查询拥有的印象
     * @param userId
     * @return
     */
    @Query(value = "select * from impression where  user_id=?",nativeQuery = true)
    List<Impression> findAllByUserId(Integer userId);
}
