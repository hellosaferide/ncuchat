package com.ncu.edu.happychat.entity;

import javax.persistence.*;

@Entity
@Table(name = "impression")
public class Impression {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int impressionId;

    private int userId;

    private String impressionContent;

    public int getImpressionId() {
        return impressionId;
    }

    public void setImpressionId(int impressionId) {
        this.impressionId = impressionId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }


    public String getImpressionContent() {
        return impressionContent;
    }

    public void setImpressionContent(String impressionContent) {
        this.impressionContent = impressionContent;
    }

    @Override
    public String toString() {
        return "Impression{" +
                "impressionId=" + impressionId +
                ", userId=" + userId +
                ", impressionContent='" + impressionContent + '\'' +
                '}';
    }
}
