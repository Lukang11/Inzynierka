import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventBattlerService } from './eventBattler.service';

@Controller('/battle')
export class EventBattler {
  constructor(private readonly eventBattlerService: EventBattlerService) {}

  @Post()
  getRecommendedPlacesByUserIds(@Body() Body: { participants: string[] }) {
    console.log(Body.participants);
    return this.eventBattlerService.fetchRecomendedPlacesforUserIds(
      Body.participants,
    );
  }
}
