import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Auth/AuthInterfaces/users.model';
import { Place } from 'src/Events/EventInterfaces/place.model';
import { UserService } from 'src/Auth/users.service';
import { EventsService } from 'src/Events/events.service';
import { Events } from 'src/Events/EventInterfaces/events.model';

@Injectable()
export class EventBattlerService {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => EventsService))
    private readonly eventService: EventsService,
  ) {}

  async fetchRecomendedPlacesforUserIds(users_id: string[]) {
    console.log(users_id);

    const userHobbiesPromises = users_id.map(async (val, index) => {
      console.log(val);
      console.log(index);

      const hobbies = await this.userService.getUserHobbiesById(val);
      console.log(hobbies);
      return { index, hobbies };
    });

    // Wait for all promises to resolve
    const userHobbies = await Promise.all(userHobbiesPromises);

    return userHobbies;
  }
}
