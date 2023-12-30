// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './Events/events.module';
import { ChatModule } from './Chat/chat.module';
import { UserModule } from './Auth/users.module';
import { CronService } from './Cron/cron.service';
import { ChatCloudsModule } from './ChatClouds/chatClouds.module';
import { EventBattlerModule } from './EventBattler/eventBattler.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URL),
    EventsModule,
    ChatModule,
    UserModule,
    ChatCloudsModule,
    EventBattlerModule
  ],
  controllers: [AppController],
  providers: [AppService, CronService],
})
export class AppModule {}
