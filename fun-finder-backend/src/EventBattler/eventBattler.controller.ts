import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventBattlerService } from './eventBattler.service';

@Controller('/battle')
export class EventBattler {
  constructor(private readonly eventBattlerService: EventBattlerService) {}

  @Post()
  getRecommendedPlacesByUserIds(@Body() Body: { participants: string[] }) {
    console.log(Body);
    return this.eventBattlerService.fetchRecomendedPlacesforUserIds(
      Body.participants,
    );
  }
  @Post('/createRoom')
  async createNewRoom(@Body() Body: { // tworzenie pokoju
    description: string,
    participants: number,
    location: string,
    date: Date
  }) {
    return await this.eventBattlerService.createNewRoom(Body);
  }
  @Get('/getRooms') // pobranie listy pokoi
  async getAllRooms(){
    return await this.eventBattlerService.getAllRooms();
  }
  @Post(`/removeFromRoom/:id`) // usuwanie uczestnika z  pokoju o podanym id
  async removeRoom(@Param('id') id: string){
    return await this.eventBattlerService.removeFromRoom(id);
  }
  @Post(`/addToRoom/:id`) // dodanie uczestnika do pokoju o podanym id
  async addToRoom(@Param('id') id: string){
    return await this.eventBattlerService.addToRoom(id);
  }
  @Get('/findRoom/:roomId') // znalezienie pokoju o podanym id
  async findBattleRoom(@Param('roomId') roomId: string) {
    return await this.eventBattlerService.checkIfRoomExists(roomId);
  }
}
