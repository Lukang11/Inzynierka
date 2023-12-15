import { 
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
    OnGatewayConnection,
 } from "@nestjs/websockets";
import { Server } from "http";
import { ObjectId, UUID } from "mongodb";
import { Socket } from "socket.io";
import { Data } from "./data.model";
import { InjectModel, Schema } from "@nestjs/mongoose";
import { Model } from "mongoose";
import messageModel, { Message } from "../ChatInterfaces/message.model";



@WebSocketGateway(8001, {cors: true})
export class ChatGateway implements OnGatewayConnection {
    constructor(
        @InjectModel('Messages') private readonly messages: Model<Message>
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

        const messageToSendToUser = {
            id: messageToSend._id.toString(),
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
     generateRandomId() {
        return Math.random().toString(36).substring(2, 9);
      }   
}
// _id: string;
// conversation_id: string;
// sender_id: string;
// text: string;
// date: Date;