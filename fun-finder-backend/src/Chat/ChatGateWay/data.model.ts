import { Participant } from "./participant.model";


export interface Data {
    message: string;
    user_id: string;
    conversationId: string;
    participants: Participant[];
    chatType: string;
}