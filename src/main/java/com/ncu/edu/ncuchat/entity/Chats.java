package com.ncu.edu.ncuchat.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "chats")
public class Chats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int logId;
    private int userId;
    private int friendId;
    private Timestamp sendTime;
    private String sendContent;

    public int getLogId() {
        return logId;
    }

    public void setLogId(int logId) {
        this.logId = logId;
    }

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

    public Timestamp getSendTime() {
        return sendTime;
    }

    public void setSendTime(Timestamp sendTime) {
        this.sendTime = sendTime;
    }

    public String getSendContent() {
        return sendContent;
    }

    public void setSendContent(String sendContent) {
        this.sendContent = sendContent;
    }

    @Override
    public String toString() {
        return "Chats{" +
                "logId=" + logId +
                ", userId=" + userId +
                ", friendId=" + friendId +
                ", sendTime=" + sendTime +
                ", sendContent='" + sendContent + '\'' +
                '}';
    }

    public String toSaveString(){
        return sendTime + ":" + userId + " : " + sendContent;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Chats)) return false;
        Chats chats = (Chats) o;
        return getUserId() == chats.getUserId() &&
                getFriendId() == chats.getFriendId();
    }

    @Override
    public int hashCode() {

        return Objects.hash(getUserId(), getFriendId());
    }
}
