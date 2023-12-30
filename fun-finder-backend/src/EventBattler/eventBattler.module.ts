import { Module } from "@nestjs/common";
import { EventBattlerGateway } from "./EventBattlerGateWay/eventBattler.gateway";



@Module({
    imports: [],
    controllers: [],
    providers: [EventBattlerGateway],
    exports: []
})
export class EventBattlerModule {}