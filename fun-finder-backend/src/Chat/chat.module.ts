import { Module } from "@nestjs/common";
import { ChatGateway } from "./ChatGateWay/chat.gateway";


@Module({
    imports: [],
    controllers: [],
    providers: [ChatGateway]
})
export class ChatModule {}