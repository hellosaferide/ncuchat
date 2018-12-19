package com.ncu.edu.ncuchat.entity;

import javax.persistence.*;

@Entity
@Table(name = "impression")
public class Impression {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int impressionId;

    private int userId;

    private String impressionText;

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

    public String getImpressionText() {
        return impressionText;
    }

    public void setImpressionText(String impressionText) {
        this.impressionText = impressionText;
    }

    @Override
    public String toString() {
        return "Impression{" +
                "impressionId=" + impressionId +
                ", userId=" + userId +
                ", impressionText='" + impressionText + '\'' +
                '}';
    }
}
