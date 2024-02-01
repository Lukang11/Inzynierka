import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "http";
import { Socket } from "socket.io";
import { v4 as uuidv4 } from 'uuid';
import { EventBattlerService } from "../eventBattler.service";

@WebSocketGateway(8002, {cors: true}) // nasłuch na port 8002
export class EventBattlerGateway implements OnGatewayConnection {
    constructor(
        private readonly eventBattlerService : EventBattlerService
      ) {}

    @WebSocketServer() server: Server
    private clients: Map<string, { socket: Socket, roomId: string }> = new Map();


    handleConnection(client: Socket) {
        const sender_id = client.handshake.query.sender_id as string; 
        // zapisanie informacji o id łączącego się użytkownika
        const room_id = client.handshake.query.room_id as string; 
        // zapisanie informacji o pokoju do którego łączy się użytkwonik

        this.clients.set(sender_id, {socket: client, roomId: room_id}); // dodanie użytkownika do tablicy połączonych klientów
        console.log(`nowe połączenie: ${sender_id}`);
        console.log(`connecting to room: ${room_id}`)
        client.join(room_id); // łaczenie do pokoju 
         this.eventBattlerService.addToRoom(room_id); // dodanie użytkownika do pokoju w bazie danych

        const participants = this.getParticipantsInRoom(room_id); // pobranie informacji o innych użytkownikach w pokoju
        client.emit('updateParticipants', participants); 
        // wysłanie zdarzenia do innych uczestników chatu o dołączeniu nowego klienta
        client.to(room_id.toString()).emit('updateParticipants', participants); 
        // przy nowym dołączeniu aktualizujemu liste uzytkownikow
         client.on('disconnect', () => { // logika przy zdarzeniu opuszczania pokoju przez klienta
            this.clients.delete(sender_id); // usuwanie klienta z listy połączonych klientów
            console.log('disconect client : ',sender_id);
            const participants = this.getParticipantsInRoom(room_id); // pobranie informacji o ilości uczestników pokoju
            this.eventBattlerService.removeFromRoom(room_id); // usunięcie wychodzącego klienta z bazy danych pokoju
            client.to(room_id.toString()).emit('handleDisconect', participants); 
            // przesłanie innym uczestnikom pokoju informacji 
            // o opuszczeniu pokoju przez klienta

        })
    }

    private getParticipantsInRoom(roomId: string): string[] {
        const participants = Array.from(this.clients.values())
            .filter(client => client.roomId === roomId)
            .map(client => client.socket.handshake.query.sender_id as string);
        return participants;
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, data: {message: string, user_id: string}): void { // nasłuch na zdarzenie wysłanie wiadomości
        const message = data.message;  // zapisanie wysyłanej wiadomości
        const userId = data.user_id; // zapisanie id wysyłającego wiadomość

        const messageToSendToUser = { // tworzenie obiektu wiadomości do wysłania reszcie użytkowników w pokoju
            id: this.generateUniqueId(),
            sender_id: userId,
            text: message,
        }
        const roomToSend = this.clients.get(userId) // znalezienie pokoju do którego wysłać wiadomość
        client.to(roomToSend.roomId.toString()).emit('message',messageToSendToUser) // wyslanie wiadomości do pokoju
        client.emit('message',messageToSendToUser) // wysylam do wysylającego
    }

    generateUniqueId(): string {
        return uuidv4();
      }


}