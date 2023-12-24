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
exports.CloudsController = void 0;
const common_1 = require("@nestjs/common");
const chatClouds_service_1 = require("./chatClouds.service");
let CloudsController = class CloudsController {
    constructor(chatCloudsService) {
        this.chatCloudsService = chatCloudsService;
    }
    getAllCloudsByParticipianId(id) {
        return this.chatCloudsService.findUserInPrivateChat(id);
    }
    getAllGroupChatClouds(id) {
        return this.chatCloudsService.findUserGroupsChats(id);
    }
    getAllEventChatClouds(id) {
        return this.chatCloudsService.findUserEventChats(id);
    }
};
exports.CloudsController = CloudsController;
__decorate([
    (0, common_1.Get)('participants/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CloudsController.prototype, "getAllCloudsByParticipianId", null);
__decorate([
    (0, common_1.Get)('group/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CloudsController.prototype, "getAllGroupChatClouds", null);
__decorate([
    (0, common_1.Get)('event/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CloudsController.prototype, "getAllEventChatClouds", null);
exports.CloudsController = CloudsController = __decorate([
    (0, common_1.Controller)('/clouds'),
    __metadata("design:paramtypes", [chatClouds_service_1.ChatCloudsService])
], CloudsController);
//# sourceMappingURL=chatClouds.controller.js.map