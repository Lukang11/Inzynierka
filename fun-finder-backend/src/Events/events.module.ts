// events.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventSchema } from './EventInterfaces/events.model';
import { PlaceSchema } from './EventInterfaces/place.model';
import { UserModule } from 'src/Auth/users.module';
import { PlacesTagsSchema } from './EventInterfaces/place_tags.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Events', schema: EventSchema },
      { name: 'Api_Places', schema: PlaceSchema },
      { name: 'api_places_tags', schema: PlacesTagsSchema },
    ]),
    UserModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [
    EventsService,
    MongooseModule.forFeature([
      { name: 'Events', schema: EventSchema },])],
})
export class EventsModule {}
