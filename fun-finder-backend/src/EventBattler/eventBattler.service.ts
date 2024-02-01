import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Auth/AuthInterfaces/users.model';
import { Place } from 'src/Events/EventInterfaces/place.model';
import { UserService } from 'src/Auth/users.service';
import { EventsService } from 'src/Events/events.service';
import { Events } from 'src/Events/EventInterfaces/events.model';
import { EventBattlerRooms } from './EventBattlerInterfaces/room.module';
import { promises } from 'dns';

@Injectable()
export class EventBattlerService {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => EventsService))
    private readonly eventService: EventsService,
    @InjectModel('Event_Battler_Rooms')
    private readonly EventRooms: Model<EventBattlerRooms>,
  ) {}

  //funkcja znajdująca wspólne preferencję dla liczby użytkowników wiekszej niż 1
  findCommonElements(...arrays) {
    //Pusta tablica dla jednego użytkownika
    if (arrays.length < 2) {
      return [];
    }
    // sprawdzanie czy wszystkie przekazane tablice nie są puste
    if (arrays.some((array) => array.length === 0)) {
      return [];
    }
    // użycie pierwszej tablicy jako referencji
    const referenceArray = arrays[0];
    // redukcja tablic tylko do wspolnego elementu
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

    // Poczekanie aż wszystkie Promisy będa rozwiązane by pozyskac wszystkie api_tags dla użytkownika
    const userHobbies = await Promise.all(userHobbiesPromises);
    const commonHobbies = this.findCommonElements(...userHobbies); // Znaleźienie wspólnych zainteresowań
    if (commonHobbies.length < 2) {
      return [];
    } else {
      const placesWithTags =
        await this.eventService.getPlacesForBattler(commonHobbies);
      const eventWithTags =
        await this.eventService.getEventsForBattler(commonHobbies);

      return { placesWithTags: placesWithTags, eventWithTags: eventWithTags };
    }
  }
  async createNewRoom(roomData: {
    description: string;
    participants: number;
    location: string;
    date: Date;
  }) {
    try {
      const newRoom = new this.EventRooms(roomData);
      await newRoom.save();
      console.log('Creating new room');
      return newRoom._id;
    } catch (err) {
      console.log('unable to create new room');
    }
  }
  async getAllRooms(): Promise<EventBattlerRooms[] | null> {
    try {
      return await this.EventRooms.find().exec();
    } catch (err) {
      console.log('failed to fetch rooms data');
    }
  }
  async removeFromRoom(id: string) {
    try {
      const eventRoom = await this.EventRooms.findById(id);
      if (eventRoom.participants === 1) {
        this.EventRooms.findByIdAndDelete(id).exec();
      } else {
        eventRoom.participants -= 1;
        await eventRoom.save();
        console.log('room participants decremented');
      }
    } catch (err) {
      console.log('could not delete room');
    }
  }
  async addToRoom(id: string) {
    try {
      const eventRoom = await this.EventRooms.findById(id);
      if (eventRoom) {
        eventRoom.participants += 1;
        await eventRoom.save();
        console.log('incremented room');
      }
    } catch (err) {
      console.log(err);
    }
  }
  async checkIfRoomExists(roomId: string) {
    try {
      const eventRoom = await this.EventRooms.findById(roomId);
      if (eventRoom === null) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      console.log('event not found');
      return false;
    }
  }
}
