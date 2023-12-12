import { Module } from "@nestjs/common";
import { ChatGateway } from "./ChatGateWay/chat.gateway";
import { MongooseModule } from "@nestjs/mongoose";
import { GroupChatSchema } from "./ChatInterfaces/groupChat.model";
import { EventChatSchema } from "./ChatInterfaces/eventChat.model";
import { MessageSchema } from "./ChatInterfaces/message.model";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Group_Chats', schema: GroupChatSchema},
            { name: 'Event_Chats', schema: EventChatSchema},
            { name: 'Messages', schema: MessageSchema}
        ])
    ],
    controllers: [ChatController],
    providers: [
                ChatGateway,
                ChatService
               ],
    exports: [
        MongooseModule.forFeature([
            { name: 'Group_Chats', schema: GroupChatSchema},
            { name: 'Event_Chats', schema: EventChatSchema}
        ])
    ]
})
export class ChatModule {}