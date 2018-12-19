package com.ncu.edu.ncuchat.controller;


import com.ncu.edu.ncuchat.entity.Chats;
import com.ncu.edu.ncuchat.entity.JsonTransform;
import com.ncu.edu.ncuchat.service.ChatsService;
import com.ncu.edu.ncuchat.service.UsersService;
import com.ncu.edu.ncuchat.socket.MessageModel;
import com.ncu.edu.ncuchat.socket.WiselyMessage;
import com.ncu.edu.ncuchat.socket.WiselyResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import java.security.Principal;
import java.sql.Timestamp;
import java.util.Date;

@Controller
public class WsController {

	@MessageMapping("/welcome")
	@SendTo("/topic/getResponse")
	public WiselyResponse say(WiselyMessage message) throws Exception {
		Thread.sleep(3000);
		return new WiselyResponse("Welcome, " + message.getName() + "!");
	}

	@Autowired
	private SimpMessagingTemplate messagingTemplate;

    @Autowired
    MessageModel messageModel;

    @Autowired
    UsersService usersService;

    @Autowired
    ChatsService chatsService;

	@MessageMapping("/chat")
	public void handleChat(Principal principal, String msg) throws Exception { //2
        messageModel= JsonTransform.josnToMessage(msg);
        int userId = usersService.findByUserName(messageModel.getSendUser());
        int friendId = usersService.findByUserName(messageModel.getReceiveUser());
        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());
        Chats chats = new Chats();
        chats.setUserId(userId);
        chats.setFriendId(friendId);
        chats.setSendTime(timestamp);
        chats.setSendContent(messageModel.getText());
        chatsService.saveChats(chats);

		if (principal.getName().equals(messageModel.getReceiveUser())) {//3
			messagingTemplate.convertAndSendToUser(messageModel.getSendUser(),
					"/queue/notifications", msg);
		} else {
			messagingTemplate.convertAndSendToUser(messageModel.getReceiveUser(),
					"/queue/notifications", msg);
		}
	}
}