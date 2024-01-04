import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "http";
import { Socket } from "socket.io";
import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway(8002, {cors: true})
export class EventBattlerGateway implements OnGatewayConnection {

    @WebSocketServer() server: Server
    private clients: Map<string, { socket: Socket, roomId: string }> = new Map();


    handleConnection(client: Socket) {
        const sender_id = client.handshake.query.sender_id as string; // trzeba dodać query do connecta
        const room_id = client.handshake.query.room_id as string;
        this.clients.set(sender_id, {socket: client, roomId: room_id});
        console.log(`nowe połączenie: ${sender_id}`);
        console.log(`connecting to room: ${room_id}`)
        client.join(room_id); // łaczenie do pokoju 

        const participants = this.getParticipantsInRoom(room_id);
        client.emit('updateParticipants', participants);
        client.to(room_id.toString()).emit('updateParticipants', participants); // przy nowym dołączeniu aktualizujemu liste uzytkownikow

        client.on('disconnect', () => {
            this.clients.delete(sender_id);
            console.log('disconect client : ',sender_id);
            const participants = this.getParticipantsInRoom(room_id);
            client.to(room_id.toString()).emit('handleDisconect', participants);
            console.log('new participants list', participants);
        })
    }

    private getParticipantsInRoom(roomId: string): string[] {
        const participants = Array.from(this.clients.values())
            .filter(client => client.roomId === roomId)
            .map(client => client.socket.handshake.query.sender_id as string);
        return participants;
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, data: {message: string, user_id: string}): void {
        console.log("o takie ", data, "takie dane przekazuje");
        const message = data.message;
        const userId = data.user_id;

        const messageToSendToUser = {
            id: this.generateUniqueId(),
            sender_id: userId,
            text: message,
        }

        const roomToSend = this.clients.get(userId)
        client.to(roomToSend.roomId.toString()).emit('message',messageToSendToUser) // wyslanie wiadomości do roomu
        client.emit('message',messageToSendToUser) // wysylam do wysylającego
    }

    generateUniqueId(): string {
        return uuidv4();
      }


}