/// <reference types="node" />
import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server } from "http";
import { Socket } from "socket.io";
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    chatServer: Server;
    users: {
        [key: string]: string;
    };
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleMessage(chatObj: [mes: String, id: String], id: string, client: Socket): void;
}
