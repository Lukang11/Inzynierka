// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './Events/events.module';
import { UserModule } from './Auth/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URL),
    EventsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
