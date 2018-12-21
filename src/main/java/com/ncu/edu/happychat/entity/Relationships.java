package com.ncu.edu.happychat.entity;

import javax.persistence.*;

@Entity
@Table(name = "Relationships")

public class Relationships {

    @Id
    private int relation_id;

    private int userId;
    private int friendId;
    private int groupId;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getFriendId() {
        return friendId;
    }

    public void setFriendId(int friendId) {
        this.friendId = friendId;
    }

    public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    @Override
    public String toString() {
        return "Relationships{" +
                "userId=" + userId +
                ", friendId=" + friendId +
                ", groupId=" + groupId +
                '}';
    }

    public int getRelation_id() {
        return relation_id;
    }

    public void setRelation_id(int relation_id) {
        this.relation_id = relation_id;
    }
}
