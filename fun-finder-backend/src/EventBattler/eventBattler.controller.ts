import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventBattlerService } from './eventBattler.service';

export interface FetchRequest {
  participants: string[];
  latitude: number;
  longitude: number;
}

@Controller('/battle')
export class EventBattler {
  constructor(private readonly eventBattlerService: EventBattlerService) {}

  @Post()
  getRecommendedPlacesByUserIds(@Body() requestBody: FetchRequest) {
    console.log(requestBody.latitude);
    console.log(requestBody);
    return this.eventBattlerService.fetchRecomendedPlacesforUserIds(
      requestBody,
    );
  }
  @Post('/createRoom')
  async createNewRoom(
    @Body()
    Body: {
      description: string;
      participants: number;
      location: string;
      date: Date;
    },
  ) {
    return await this.eventBattlerService.createNewRoom(Body);
  }
  @Get('/getRooms')
  async getAllRooms() {
    return await this.eventBattlerService.getAllRooms();
  }
  @Post(`/removeFromRoom/:id`)
  async removeRoom(@Param('id') id: string) {
    return await this.eventBattlerService.removeFromRoom(id);
  }
  @Post(`/addToRoom/:id`)
  async addToRoom(@Param('id') id: string) {
    return await this.eventBattlerService.addToRoom(id);
  }
  @Get('/findRoom/:roomId')
  async findBattleRoom(@Param('roomId') roomId: string) {
    return await this.eventBattlerService.checkIfRoomExists(roomId);
  }
}
