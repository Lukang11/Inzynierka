// events.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventSchema } from './EventInterfaces/events.model';
import { PlaceSchema } from './EventInterfaces/place.model';
import { UserModule } from 'src/Auth/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Events', schema: EventSchema },
      { name: 'Api_Places', schema: PlaceSchema },
    ]),
    UserModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
