import { Injectable } from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '../models/chat-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any

  constructor() {
    this.initConnectionSocket()
   }

  // Va a iniciar la conexión con el Socket
  initConnectionSocket(){
    const url ='http://localhost:3000/chat-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }

  // No todos los usuarios pueden conectarse al socket.
  // Solo los asociados al roomId
  joinRoom(roomId: string) {
    this.stompClient.connect({}, () => {
      this.stompClient.suscribe(`/topic/${roomId}`, (messages: any) =>{
        const messageContent = JSON.parse(messages.body);
        console.log(messageContent)
      })
    })
  }

  sendMessage(roomId: string, chatMessage: ChatMessage){
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage))
  }
}
