import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat-message';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
  /*
  standalone: true,  // Esto indica que es un componente standalone
  imports: [FormsModule]  // Importamos FormsModule directamente
*/
})

export class ChatComponent implements OnInit {

  messageInput: string = '';
  userId: string = "";
  messageList: any[] = [];
  constructor(private chatService:ChatService,
    private route: ActivatedRoute
  ) {}
  
  
  ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"];
    this.chatService.joinRoom("ABC");
  }

  sendMessage(){
    const chatMessage = {
      message: this.messageInput,
      user: this.userId
    }as ChatMessage
    this.chatService.sendMessage("ABC", chatMessage);
    this.messageInput = '';
  }
 

}
