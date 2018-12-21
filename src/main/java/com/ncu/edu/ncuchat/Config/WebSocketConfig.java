package com.ncu.edu.ncuchat.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@Configuration
@EnableWebSocketMessageBroker//注解开启STOMP协议来传输基于代理的消息，此时控制器支持使用
@MessageMapping
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer{

	@Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
	    //注册两个STOMP的endpoint，分别用于广播和点对点
        registry.addEndpoint("/endpointWisely").withSockJS();
        registry.addEndpoint("/endpointChat").withSockJS();
    }


    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        registry.enableSimpleBroker("/queue","/topic");//queue用于广播，topic用于p2p
    }

}
