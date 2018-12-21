package com.ncu.edu.happychat.socket;

import org.springframework.stereotype.Service;

@Service
public class MessageModel {
    private String sendUser;
    private String receiveUser;
    private String text;

    @Override
    public String toString() {
        return "MessageModel{" +
                "sendUser='" + sendUser + '\'' +
                ", receiveUser='" + receiveUser + '\'' +
                ", text='" + text + '\'' +
                '}';
    }

    public String getSendUser() {
        return sendUser;
    }

    public void setSendUser(String sendUser) {
        this.sendUser = sendUser;
    }

    public String getReceiveUser() {
        return receiveUser;
    }

    public void setReceiveUser(String receiveUser) {
        this.receiveUser = receiveUser;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
