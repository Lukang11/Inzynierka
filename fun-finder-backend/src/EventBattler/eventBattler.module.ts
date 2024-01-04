import { Module, forwardRef } from '@nestjs/common';
import { EventBattlerGateway } from './EventBattlerGateWay/eventBattler.gateway';
import { EventBattler } from './eventBattler.controller';
import { JwtModule } from '@nestjs/jwt';
import { EventBattlerService } from './eventBattler.service';
import { UserModule } from 'src/Auth/users.module';
import { UserService } from 'src/Auth/users.service';
import { EventsModule } from 'src/Events/events.module';
import { EventsService } from 'src/Events/events.service';

@Module({
  imports: [
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
