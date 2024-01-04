import { Body, Controller, Get } from '@nestjs/common';
import { EventBattlerService } from './eventBattler.service';

@Controller('/battle')
export class EventBattler {
  constructor(private readonly eventBattlerService: EventBattlerService) {}

  @Get('')
  getRecommendedPlacesByUserIds(@Body() userIdsArray: string[]) {
    return this.eventBattlerService.fetchRecomendedPlacesforUserIds(
      userIdsArray,
    );
  }
}
