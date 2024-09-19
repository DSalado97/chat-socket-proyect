package com.chat.socket.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {

    // Habilita el Broker, nos permite comunicarnos entre el servidor (back) y el cliente (front).
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Habilita el broker y los mensajes ingresarán a la ruta "/topic"
        registry.enableSimpleBroker("/topic");

        // La dirección a la que llegarán los mensajes.
        registry.setApplicationDestinationPrefixes("/app");
    }

    // Registra los Endpoints
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat-socket")    /* Con este path se conectará el frontend con el servidor socket. */
                .setAllowedOrigins("/http://localhost:4200")    /* Este es el cliente Angular */
                .withSockJS();  /* Libreria que se usa en el front */
    }
}
