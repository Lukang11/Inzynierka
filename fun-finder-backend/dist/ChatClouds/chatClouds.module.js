"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatCloudsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const chatClouds_controller_1 = require("./chatClouds.controller");
const chatClouds_service_1 = require("./chatClouds.service");
const chatclouds_model_1 = require("./ChatCloudsInterfaces/chatclouds.model");
const users_module_1 = require("../Auth/users.module");
const chat_module_1 = require("../Chat/chat.module");
let ChatCloudsModule = class ChatCloudsModule {
};
exports.ChatCloudsModule = ChatCloudsModule;
exports.ChatCloudsModule = ChatCloudsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Private_Chats', schema: chatclouds_model_1.PrivateChatSchema }]),
            users_module_1.UserModule,
            chat_module_1.ChatModule
        ],
        controllers: [chatClouds_controller_1.CloudsController],
        providers: [chatClouds_service_1.ChatCloudsService],
        exports: []
    })
], ChatCloudsModule);
//# sourceMappingURL=chatClouds.module.js.map