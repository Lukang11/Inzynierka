import { ChatCloudsService } from "./chatClouds.service";
export declare class CloudsController {
    private readonly chatCloudsService;
    constructor(chatCloudsService: ChatCloudsService);
    getAllCloudsByParticipianId(id: string): Promise<any[]>;
    getAllGroupChatClouds(id: string): Promise<any[]>;
    getAllEventChatClouds(id: string): Promise<any[]>;
}
