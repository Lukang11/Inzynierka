import { 
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket
 } from "@nestjs/websockets";
import { Server } from "http";
import { ObjectId, UUID } from "mongodb";
import { Socket } from "socket.io";



@WebSocketGateway(8001, {cors:'*'})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    chatServer: Server;

    users: { [key: string]: string } = {}; // przechowujemy liste podłączonych użytkowników

    handleConnection(client: Socket) {
        console.log(`nowe połączenie: ${client.id}`);
        this.users[client.id];
    }

    handleDisconnect(client: Socket) {
        console.log(`Rozłączono: ${client.id}`);
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() chatObj: [mes: String, id: String], @MessageBody() id: string, @ConnectedSocket() client: Socket): void {
        const message = []
        console.log(chatObj, "podaje chat obj");
        message.push({
            sender_id: chatObj[1],
            _id: new ObjectId,
            conversation_id: "na razie puste",
            text: chatObj[0],
            date: new Date
          });

        chatObj[1] = client.id;
        this.chatServer.emit('message',message );
        console.log(client.id);
    }
}

// _id: string;
//   conversation_id: string;
//   sender_id: string;
//   text: string;
//   date: Date;