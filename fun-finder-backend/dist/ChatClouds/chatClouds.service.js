"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatCloudsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ChatCloudsService = class ChatCloudsService {
    constructor(privateChatModel, userModel, groupChat, eventChats) {
        this.privateChatModel = privateChatModel;
        this.userModel = userModel;
        this.groupChat = groupChat;
        this.eventChats = eventChats;
    }
    async findUserInPrivateChat(userId) {
        try {
            const privateChatsWithUser = await this.privateChatModel.find({ participants: userId });
            if (!privateChatsWithUser || privateChatsWithUser.length === 0) {
                console.log('User not found in any private chat');
            }
            const participantInfo = [];
            for (const privateChat of privateChatsWithUser) {
                const otherParticipantsIds = privateChat.participants.filter(participant => participant !== userId);
                console.log(otherParticipantsIds);
                const otherParticipant = await this.getUserInfoById(otherParticipantsIds[0]);
                participantInfo.push({
                    _id: otherParticipantsIds[0],
                    chatId: privateChat.id,
                    name: otherParticipant.fname + " " + otherParticipant.lname,
                    lastMessage: privateChat.last_message,
                });
            }
            return participantInfo;
        }
        catch (error) {
            throw new Error('Failed to find user in private chat');
        }
    }
    async findUserGroupsChats(userId) {
        try {
            const groupChatsForUser = await this.groupChat.find({ participants: userId });
            if (!groupChatsForUser || groupChatsForUser.length === 0) {
                console.log('No group chats for user');
            }
            const groupChatInfo = [];
            for (const groupChat of groupChatsForUser) {
                const groupChatData = {
                    chatId: groupChat._id,
                    name: groupChat.name,
                    lastMessage: groupChat.last_message,
                };
                groupChatInfo.push(groupChatData);
            }
            ;
            return groupChatInfo;
        }
        catch (error) {
            throw new Error('failed to find groups');
        }
    }
    async findUserEventChats(userId) {
        try {
            const eventChatsForUser = await this.eventChats.find({ participants: userId });
            if (!eventChatsForUser || eventChatsForUser.length === 0) {
                console.log('no event chats for user');
            }
            const eventChatInfo = [];
            for (const eventChat of eventChatsForUser) {
                const eventChatData = {
                    chatId: eventChat._id,
                    name: eventChat.name,
                    lastMessage: eventChat.last_message
                };
                eventChatInfo.push(eventChatData);
            }
            ;
            return eventChatInfo;
        }
        catch (error) {
            throw new Error('failed to find events');
        }
    }
    ;
    async getUserInfoById(userId) {
        try {
            const userInfo = await this.userModel.findOne({ _id: userId });
            return userInfo;
        }
        catch (error) {
            throw new Error('Failed to find user by Id');
        }
    }
};
exports.ChatCloudsService = ChatCloudsService;
exports.ChatCloudsService = ChatCloudsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Private_Chats')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __param(2, (0, mongoose_1.InjectModel)('Group_Chats')),
    __param(3, (0, mongoose_1.InjectModel)('Event_Chats')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ChatCloudsService);
//# sourceMappingURL=chatClouds.service.js.map