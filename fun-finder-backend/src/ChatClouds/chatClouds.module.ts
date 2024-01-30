import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CloudsController } from "./chatClouds.controller";
import { ChatCloudsService } from "./chatClouds.service";
import { PrivateChatSchema } from "./ChatCloudsInterfaces/chatclouds.model";
import { UserModule } from "src/Auth/users.module";
import { ChatModule } from "src/Chat/chat.module";
import { EventSchema } from "src/Events/EventInterfaces/events.model";
// MongooseModule.forFeature([
//   { name: 'Events', schema: EventSchema },])],

@Module({
    imports: [
        MongooseModule.forFeature([
          { name: 'Private_Chats', schema: PrivateChatSchema },
          {name: 'Events', schema:EventSchema}]),
        UserModule,
        ChatModule
      ],
    controllers: [CloudsController],
    providers: [ChatCloudsService],
    exports: [MongooseModule.forFeature([{ name: 'Private_Chats', schema: PrivateChatSchema }])]
})
export class ChatCloudsModule {}
