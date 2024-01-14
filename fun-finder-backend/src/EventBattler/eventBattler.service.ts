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

  findCommonElements(...arrays) {
    if (arrays.length < 2) {
      throw new Error('At least two arrays are required for comparison.');
    }

    // Check if all arrays are non-empty
    if (arrays.some((array) => array.length === 0)) {
      return [];
    }

    // Use the first array as a reference
    const referenceArray = arrays[0];

    // Reduce arrays to common elements
    const commonElements = referenceArray.reduce((acc, element) => {
      if (arrays.slice(1).every((array) => array.includes(element))) {
        acc.push(element);
      }
      return acc;
    }, []);

    return commonElements;
  }

  async fetchRecomendedPlacesforUserIds(users_id: string[]) {
    const userHobbiesPromises = users_id.map(async (val, index) => {
      const hobbies = await this.userService.getUserHobbiesById(val);
      return hobbies;
    });

    // Wait for all promises to resolve to get all api_tags from user
    const userHobbies = await Promise.all(userHobbiesPromises);
    console.log(userHobbies);

    const commonHobbies = this.findCommonElements(...userHobbies);
    console.log(commonHobbies);
    const placesWithTags =
      await this.eventService.getPlacesForBattler(commonHobbies);
    console.log(placesWithTags);

    return placesWithTags;
  }
}
