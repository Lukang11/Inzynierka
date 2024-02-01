import { Module, forwardRef } from '@nestjs/common';
import { EventBattlerGateway } from './EventBattlerGateWay/eventBattler.gateway';
import { EventBattler } from './eventBattler.controller';
import { JwtModule } from '@nestjs/jwt';
import { EventBattlerService } from './eventBattler.service';
import { UserModule } from 'src/Users/users.module';
import { UserService } from 'src/Users/users.service';
import { EventsModule } from 'src/Events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventBattlerRoomsSchema } from './EventBattlerInterfaces/room.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Event_Battler_Rooms', schema: EventBattlerRoomsSchema}
    ]),
    UserModule,
    forwardRef(() => EventsModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [EventBattler],
  providers: [EventBattlerGateway, EventBattlerService, UserService],
  exports: [EventBattlerService], // Export the service if needed
})
export class EventBattlerModule {}
