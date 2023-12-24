"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const chat_gateway_1 = require("./ChatGateWay/chat.gateway");
const mongoose_1 = require("@nestjs/mongoose");
const groupChat_model_1 = require("./ChatInterfaces/groupChat.model");
const eventChat_model_1 = require("./ChatInterfaces/eventChat.model");
const message_model_1 = require("./ChatInterfaces/message.model");
const chat_controller_1 = require("./chat.controller");
const chat_service_1 = require("./chat.service");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Group_Chats', schema: groupChat_model_1.GroupChatSchema },
                { name: 'Event_Chats', schema: eventChat_model_1.EventChatSchema },
                { name: 'Messages', schema: message_model_1.MessageSchema }
            ])
        ],
        controllers: [chat_controller_1.ChatController],
        providers: [
            chat_gateway_1.ChatGateway,
            chat_service_1.ChatService
        ],
        exports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Group_Chats', schema: groupChat_model_1.GroupChatSchema },
                { name: 'Event_Chats', schema: eventChat_model_1.EventChatSchema }
            ])
        ]
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map