import { Injectable } from "@nestjs/common";
import { Message } from "./ChatInterfaces/message.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ChatService {
    constructor(
        @InjectModel('Messages') private readonly messages: Model<Message>) {}

    async getMessages(id: string){
        try {
            const messagesForConversation = await this.messages
                .find( { conversation_id: id })
                .sort( { date: 'asc'})
                .exec();

            if(!messagesForConversation || messagesForConversation.length === 0) {
                console.log("no messages for this conversation!");
            }
            return messagesForConversation;

            }
        catch (error) {
            throw new Error('failed to find messages');
        }
        }
    }
