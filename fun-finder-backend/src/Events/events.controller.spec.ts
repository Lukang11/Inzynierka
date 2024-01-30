import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { PlacesTags } from './EventInterfaces/place_tags.model';

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: {
            getAllEvents: jest.fn(() => Promise.resolve('test')),
            getEventsByLocation: jest.fn(() => Promise.resolve('events')),
            insertEvent: jest.fn(() => Promise.resolve('created')),
            getUsersHobbies: jest.fn(() => Promise.resolve(['hobby1', 'hobby2'])),
            addUsersHobbies: jest.fn(() => Promise.resolve('added')),
            fetchTopRatingPlaces: jest.fn(() => Promise.resolve(['place1', 'place2'])),
            getAllTypesForPlaces: jest.fn(() => Promise.resolve(['type1', 'type2'])),
            getEventById: jest.fn(() => Promise.resolve('event')),
            getTopratingPlaces: jest.fn(() => Promise.resolve(['place1', 'place2'])),
            addTypesForPlaces: jest.fn(() => Promise.resolve('added')),
            getTypeDataByName: jest.fn(() => Promise.resolve('data')),
            addUserToEvent: jest.fn(() => Promise.resolve('added')),

            
            
          },
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    service = module.get<EventsService>(EventsService);
  });

  it('should return an array of events', async () => {
    expect(await controller.getAllEvents()).toBe('test');
    expect(service.getAllEvents).toHaveBeenCalled();
  });
  it('should return events based on location', async () => {
  
    expect(await controller.getEventByLocationFromDataBase({ location: 'New York' })).toBe('events');
    expect(service.getEventsByLocation).toHaveBeenCalledWith('new york');
  });
  it('should add a new event', async () => {
    const eventDto = {
      name: 'Event1',
      location: 'Location1',
      eventStart: new Date(),
      eventEnd: new Date(),
      relatedHobbies: ['hobby1', 'hobby2'],
        eventDescription: 'description',
        eventParticipants: ['user1', 'user2'],

    };
  
  
    expect(await controller.addEvents(eventDto)).toBe('created');
    expect(service.insertEvent).toHaveBeenCalledWith(eventDto);
  });
  
  it('should return hobbies for a given user email', async () => {
    const userEmail = 'test@example.com';
  
    expect(await controller.getUsersHobbies(userEmail)).toEqual(['hobby1', 'hobby2']);
    expect(service.getUsersHobbies).toHaveBeenCalledWith(userEmail);
  });
  it('should add hobbies for a given user email', async () => {
    const userEmail = 'test@example.com';
    const hobbies = { hobbies: ['hobby1', 'hobby2'] };
   
  
    expect(await controller.addUsersHobbies(userEmail, hobbies)).toBe('added');
    expect(service.addUsersHobbies).toHaveBeenCalledWith(userEmail, hobbies.hobbies);
  });
  it('should return top rating places', async () => {
    
  
    expect(await controller.getTopRatingPlaces()).toEqual(['place1', 'place2']);
    expect(service.fetchTopRatingPlaces).toHaveBeenCalled();
  });
  it('should return an event by id', async () => {
    const eventId = '123';
    
  
    expect(await controller.getEventById(eventId)).toBe('event');
    expect(service.getEventById).toHaveBeenCalledWith(eventId);
  });
  it('should return all types for places', async () => {
   ;
  
    expect(await controller.getAllTypesForPlaces()).toEqual(['type1', 'type2']);
    expect(service.getAllTypesForPlaces).toHaveBeenCalled();
  });
  it('should add types for places', async () => {
    const types = { name: "type1", data: ['data1', 'data2'],} as PlacesTags
    
  
    expect(await controller.addTypesForPlaces(types)).toBe('added');
    expect(service.addTypesForPlaces).toHaveBeenCalledWith(types);
  });
  it('should return place tag by name', async () => {
    const tag = { name: 'tag1' };
    
  
    expect(await controller.getPlacesTagByName(tag)).toBe('data');
    expect(service.getTypeDataByName).toHaveBeenCalledWith(tag);
  });
  
          
  
  
  
});
