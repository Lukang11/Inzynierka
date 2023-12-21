import { 
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
    OnGatewayConnection,
 } from "@nestjs/websockets";
import { Server } from "http";
import { Socket } from "socket.io";
import { Data } from "./data.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import messageModel, { Message } from "../ChatInterfaces/message.model";
import { PrivateChat } from "src/ChatClouds/ChatCloudsInterfaces/chatclouds.model";
import { EventChat } from "../ChatInterfaces/eventChat.model";
import { GroupChat } from "../ChatInterfaces/groupChat.model";



@WebSocketGateway(8001, {cors: true})
export class ChatGateway implements OnGatewayConnection {
    constructor(
        @InjectModel('Messages') private readonly messages: Model<Message>,
        @InjectModel('Private_Chats') private readonly privateChatModel: Model<PrivateChat>,
        @InjectModel('Group_Chats') private readonly groupChat: Model<GroupChat>,
        @InjectModel('Event_Chats') private readonly eventChats: Model<EventChat>
      ) {}

    @WebSocketServer() server: Server
    private clients = new Map<String, Socket>();

    users: { [key: string]: string } = {}; // przechowujemy liste podłączonych użytkowników

    handleConnection(client: Socket) {
        const sender_id = client.handshake.query.sender_id as String;
        console.log(client.handshake.query)
        this.clients.set(sender_id, client);
        console.log(`nowe połączenie: ${sender_id}`);

        client.on('disconect', () => {
            this.clients.delete(sender_id);
            console.log('disconect client : ',sender_id)
        })
    }


    @SubscribeMessage('message')
    handleMessage(client: Socket, data: Data): void {
        console.log("o takie ", data, "takie dane przekazuje");
        const message = data.message;
        const userId = data.user_id;  // subscribe message przyjmuje tylko 2 argumenty socket, i pakuje otrzymane dany do tablicy dlatego tak
        const conversationId = data.conversationId;

       const messageToSend = new this.messages ({
            conversation_id: conversationId,
            sender_id: userId,
            text: message,
            date: new Date
          });
        this.sendMessageToDatabase(messageToSend);
        this.updateLastMessage(data.conversationId,data.message,data.chatType);

        const messageToSendToUser = {
            id: messageToSend._id,
            conversation_id: conversationId,
            sender_id: userId,
            text: message,
        }
        console.log(messageToSendToUser)
        console.log(messageToSend)

          client.emit('message',messageToSendToUser) // wyslanie wiadomosci do wysylającego

          data.participants.forEach( participant => {
            const sendTo = this.clients.get(participant._id);
            if(sendTo) {
                sendTo.emit('message',messageToSendToUser);
            }
            else{
                console.log("participant not found");
            }
          })
    }

    async sendMessageToDatabase(messageObject: Message) {
        try {
            await messageObject.save();
            console.log("created", messageModel);
        } catch (err) {
            console.error("unable to create user", err);
        }
    }
    
    async updateLastMessage(chatId: string, message: string, chatType: string) {
        switch (chatType) {
            case "person":
                try {
                    await this.privateChatModel.updateOne(
                        { _id: chatId},
                        {$set: {last_message: message}}
                    );
                    console.log("updatuje");
                }
                catch (err) {
                    console.log("failed to Update person chat", err);
                }
                break
            case "group":
                try {
                    await this.groupChat.updateOne(
                        { _id: chatId},
                        {$set: {last_message: message}}
                    );
                }
                catch (err) {
                    console.log("failed to Update group chat", err);
                }
                break
            case "event":
                try {
                    await this.eventChats.updateOne(
                        { _id: chatId},
                        {$set: {last_message: message}}
                    );
                    console.log("wykonuje dla eventow", chatId , message)
                }
                catch (err) {
                    console.log("failed to Update event chat", err);
                }
                break
        }
    }
}
// _id: string;
// conversation_id: string;
// sender_id: string;
// text: string;
// date: Date;