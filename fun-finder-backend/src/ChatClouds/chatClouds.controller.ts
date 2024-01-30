import {  Body, Controller,Get,Param, Post } from "@nestjs/common";
import { ChatCloudsService } from "./chatClouds.service";

@Controller('/clouds')
export class CloudsController {
    constructor(private readonly chatCloudsService: ChatCloudsService) {}

    @Get('participants/:id')
    getAllCloudsByParticipianId(@Param('id') id: string ) {
        return this.chatCloudsService.findUserInPrivateChat(id);
    }
    @Get('event/:id')
    getAllEventChatClouds(@Param('id') id: string) {
        return this.chatCloudsService.findUserEventChats(id);
    }
    @Post('chatParticipants/info')
    getAllParticipantsInfo(@Body() data: {participantsIds: [string]}) {
        return this.chatCloudsService.getParticipantsInfo(data);
    }
    @Post('event/createPrivateChat')
    createPrivateChat(@Body() data: {userCreatingChatId: string, chatParticipantId: string}) {
        this.chatCloudsService.createNewPrivateChat(data.userCreatingChatId,data.chatParticipantId);
    }
    @Post('event/createEventChat')
    createEventChat(@Body() data: {userCreatingChatId: string, chatName: string, imageUrl: string, event_id: string}) {
        this.chatCloudsService.createNewEventChat(data.userCreatingChatId,data.chatName,data.imageUrl,data.event_id);
    }
    @Post('event/addUserToChat')
    addUserToEventChat(@Body() data: {userId: string, eventId: string}) {
        this.chatCloudsService.addUserToEventChat(data.userId, data.eventId);
    }
}