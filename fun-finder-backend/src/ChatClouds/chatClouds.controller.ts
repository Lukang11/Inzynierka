import {  Controller,Get,Param } from "@nestjs/common";
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
}