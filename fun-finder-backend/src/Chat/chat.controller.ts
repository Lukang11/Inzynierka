import { Controller, Get, Param } from "@nestjs/common";
import { ChatService } from "./chat.service";


@Controller('/messages')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get(`:id`)
    getAllMessagesByChatId(@Param('id') id: string) {
        return this.chatService.getMessages(id);
    }
}