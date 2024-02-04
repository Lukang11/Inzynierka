

import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Events,GeoLocation } from './EventInterfaces/events.model';
import { User } from 'src/Users/UsersInterfaces/users.model';
import { Place } from './EventInterfaces/place.model';
import { PlacesTags } from './EventInterfaces/place_tags.model';
import { types } from 'util';
import { create } from 'domain';
import { exec } from 'child_process';


const mockEventModel = { 
    
    create: jest.fn().mockImplementation((doc) => doc),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    findById: jest.fn().mockResolvedValue(null),
    save: jest.fn().mockImplementation(function() { return this; }),};
const mockPlaceModel = {  };
const mockUserModel = {  };
const mockPlacesTagsModel = {  };

describe('EventsService', () => {
  let service: EventsService;
  let eventModel: Model<Events>;
  const MockEventModel = {
    create: jest.fn().mockImplementation((doc) => doc),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    findById: jest.fn().mockResolvedValue(null),
    save: jest.fn().mockImplementation(function() { return this; }),};
    
  let placeModel: Model<Place>;
  const mockPlaceModel = {
    find: jest.fn(),
    findOne: jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(null) 
      })),
    exec: jest.fn(),
    create: jest.fn().mockImplementation((doc) => doc),
  };
  let userModel: Model<User>;
  const mockUserModel = {
    findOne: jest.fn(),
    updateOne: jest.fn(),
  };
  let placesTagsModel: Model<PlacesTags>;
  
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getModelToken('Events'),
          useValue: MockEventModel,
        },
        {
          provide: getModelToken('Api_Places'),
          useValue: mockPlaceModel,
        },
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
        {
          provide: getModelToken('api_places_tags'),
          useValue: mockPlacesTagsModel,
        },
        
      ],
    }).compile();
    service = module.get<EventsService>(EventsService);
    eventModel = module.get<Model<Events>>(getModelToken('Events'));
    placeModel = module.get<Model<Place>>(getModelToken('Api_Places'));
    userModel = module.get<Model<User>>(getModelToken('User'));
    placesTagsModel = module.get<Model<PlacesTags>>(getModelToken('api_places_tags'));
  });

  it('should insert a new event', async () => {
    const mockEvent = { name: 'Test Event', location: 'Test Location' };
    mockEventModel.create.mockResolvedValue(mockEvent);
    mockEventModel.save.mockResolvedValue(mockEvent);
  
    const result = await service.insertEvent(mockEvent);
    expect(result).toEqual(mockEvent);
    expect(mockEventModel.create).toHaveBeenCalledWith(mockEvent);
  });
  describe('getAllEvents', () => {
    it('should return all events', async () => {
      const mockEvents = [{ name: 'Event 1' }, { name: 'Event 2' }];
      MockEventModel.find.mockResolvedValue(mockEvents);
  
      const result = await service.getAllEvents();
      expect(result).toEqual(mockEvents);
      expect(MockEventModel.find).toHaveBeenCalled();
    });
  
    it('should handle errors when fetching all events fails', async () => {
      const errorMessage = 'Error fetching all events';
      MockEventModel.find.mockRejectedValue(new Error(errorMessage));
  
      await expect(service.getAllEvents()).rejects.toThrow(errorMessage);
    });
  });
  
  describe('getEventsByLocation', () => {
    it('should return events filtered by location', async () => {
      const mockLocation = 'Test Location';
      const mockEvents = [{ name: 'Event 1', location: mockLocation }];
      MockEventModel.find.mockResolvedValue(mockEvents);
  
      const result = await service.getEventsByLocation(mockLocation);
      expect(result).toEqual(mockEvents);
      expect(MockEventModel.find).toHaveBeenCalledWith({ location: mockLocation });
    });
  
    it('should handle errors when fetching events by location fails', async () => {
      const mockLocation = 'Test Location';
      const errorMessage = 'Error fetching events by location';
      MockEventModel.find.mockRejectedValue(new Error(errorMessage));
  
      await expect(service.getEventsByLocation(mockLocation)).rejects.toThrow(errorMessage);
    });
  });
  

  describe('getAllPlaces', () => {
    it('should return an array of places', async () => {
      const mockPlaces = [{ types:'test',formattedAddress:'testowa',websiteUri:'zal.pl',displayName:{text:'test',languageCode:'PL'} }, 
       { types:'test',formattedAddress:'testowa',websiteUri:'zal.pl',displayName:{text:'test',languageCode:'PL'} }];
      mockPlaceModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockPlaces) });
  
      const result = await service.getAllPlaces();
      expect(result).toEqual(mockPlaces);
      expect(mockPlaceModel.find).toHaveBeenCalled();
    });
  
    it('should handle errors', async () => {
      const errorMessage = 'Error retrieving places';
      mockPlaceModel.find.mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error(errorMessage)) });
  
      await expect(service.getAllPlaces()).rejects.toThrow(errorMessage);
    });
  });
  describe('getUsersEvents', () => {
    it('should return events for a given user', async () => {
      const userEmail = 'test@example.com';
      const mockUser = { email: userEmail, events: [] };
      mockUserModel.findOne.mockResolvedValue(mockUser);
  
      const result = await service.getUsersEvents(userEmail);
      expect(result).toEqual(mockUser.events);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: userEmail });
    });
  
  
  });
  describe('getUsersHobbies', () => {
    it('should return hobbies for a given user', async () => {
      const userEmail = 'test@example.com';
      const mockUser = { email: userEmail, hobbies: ['soccer'] };
      mockUserModel.findOne.mockResolvedValue(mockUser);
  
      const result = await service.getUsersHobbies(userEmail);
      expect(result).toEqual(mockUser.hobbies);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: userEmail });
    });
  
   
  });
  describe('addUsersHobbies', () => {
    it('should add hobbies to a user', async () => {
      const userEmail = 'test@example.com';
      const hobbiesToAdd = ['hobby1', 'hobby2'];
      const mockUpdateResponse = {  };
      mockUserModel.updateOne.mockResolvedValue(mockUpdateResponse);
  
      const result = await service.addUsersHobbies(userEmail, hobbiesToAdd);
      expect(result).toEqual(mockUpdateResponse);
      expect(mockUserModel.updateOne).toHaveBeenCalledWith(
        { email: userEmail },
        { $push: { hobbies: hobbiesToAdd } }
      );
    });
  
    
  });
  describe('createOfResourceInMongoDbOnlyIfDoesntExist', () => {

  it('should not create a new place if it already exists', async () => {
    const createPlaceDto = {
        displayName: { text: 'Place 1', languageCode: 'EN' },
        formattedAddress: '123 Example St',
        types: ['restaurant'],
        websiteUri: 'https://example.com',
        iconMaskBaseUri: 'https://example.com',
    };
    mockPlaceModel.findOne.mockResolvedValue(createPlaceDto); 

    const result = await service.createOfResourceInMongoDbOnlyIfDoesntExist(createPlaceDto);
    expect(result).toBeNull();
    expect(mockPlaceModel.findOne).toHaveBeenCalledWith({
        'displayName.text': createPlaceDto.displayName.text,
        'displayName.languageCode': createPlaceDto.displayName.languageCode,
        formattedAddress: createPlaceDto.formattedAddress,
    });
    expect(mockPlaceModel.create).not.toHaveBeenCalled();
  });

  
});
describe('fetchTopRatingPlaces', () => {
    it('should fetch places with top ratings', async () => {
      const mockPlaces = [{ types:'test',formattedAddress:'testowa',websiteUri:'zal.pl',displayName:{text:'test',languageCode:'PL'} }];
      mockPlaceModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockPlaces) });
  
      const result = await service.fetchTopRatingPlaces();
      expect(result).toEqual(mockPlaces);
      expect(mockPlaceModel.find).toHaveBeenCalledWith({ rating: { $gt: 4.5, $lt: 5 } });
    });
  
  });
  
  
  describe('fetchTopRatingPlaces', () => {
    it('should fetch places with top ratings', async () => {
      const mockPlaces = [{ types:'test',formattedAddress:'testowa',websiteUri:'zal.pl',displayName:{text:'test',languageCode:'PL'} }];
      mockPlaceModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockPlaces) });
  
      const result = await service.fetchTopRatingPlaces();
      expect(result).toEqual(mockPlaces);
      expect(mockPlaceModel.find).toHaveBeenCalledWith({ rating: { $gt: 4.5, $lt: 5 } });
    });
    
  });
  describe('getEventById', () => {
    it('should retrieve an event by id', async () => {
      const eventId = 'event123';
      const mockEvent = { name: 'Test Event', location: 'Test Location',geoLocation:{latitude:1,longitude:1},startDate:new Date(),endDate:new Date(),description:'test',imageUrl:'test',maxEventParticipants:[] };
      MockEventModel.findById.mockResolvedValue(mockEvent);
  
      const result = await service.getEventById(eventId);
      expect(result).toEqual(mockEvent);
      expect(MockEventModel.findById).toHaveBeenCalledWith(eventId);
    });
  
    
  });
  
  
  
  
  
  
  
  
  

});

