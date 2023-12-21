import {  Body, Controller,Get,Param, Post } from "@nestjs/common";
import { ChatCloudsService } from "./chatClouds.service";

@Controller('/clouds')
export class CloudsController {
    constructor(private readonly chatCloudsService: ChatCloudsService) {}

    @Get('participants/:id')
    getAllCloudsByParticipianId(@Param('id') id: string ) {
        return this.chatCloudsService.findUserInPrivateChat(id);
    }
    @Get('group/:id')
    getAllGroupChatClouds(@Param('id') id: string) {
        return this.chatCloudsService.findUserGroupsChats(id);
    }
    @Get('event/:id')
    getAllEventChatClouds(@Param('id') id: string) {
        return this.chatCloudsService.findUserEventChats(id);
    }
    @Post('event/createPrivateChat')
    createPrivateChat(@Body() data: {userCreatingChatId: string, chatParticipantId: string}) {
        this.chatCloudsService.createNewPrivateChat(data.userCreatingChatId,data.chatParticipantId);
    }
    @Post('event/createGroupChat')
    createGroupChat(@Body() data: {userCreatingChatId: string, chatName: string}) {
        this.chatCloudsService.createNewGroupChat(data.userCreatingChatId,data.chatName);
    }
    @Post('event/createEventChat')
    createEventChat(@Body() data: {userCreatingChatId: string, chatName: string}) {
        this.chatCloudsService.createNewEventChat(data.userCreatingChatId,data.chatName);
    }
}