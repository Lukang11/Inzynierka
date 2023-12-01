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
        chatObj[1] = client.id;
        this.chatServer.emit('message',chatObj );
        console.log(client.id);
    }
}
