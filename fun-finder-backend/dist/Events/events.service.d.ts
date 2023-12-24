/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { GoogleApiQueryObject, GoogleApiQueryResponse } from './EventInterfaces/eventsInterfaces';
import { Place } from './EventInterfaces/place.model';
import { CreatePlaceDto } from './EventInterfaces/create-place.dto';
import { User, UserEvents, UserHobbies } from 'src/Auth/AuthInterfaces/users.model';
export declare class EventsService {
    private readonly eventsModel;
    private readonly placeModel;
    private readonly userModel;
    constructor(eventsModel: Model<Event>, placeModel: Model<Place>, userModel: Model<User>);
    insertEvent(name: string, location: string, relatedHobbies: string[]): Promise<void>;
    getAllEvents(): Promise<(import("mongoose").Document<unknown, {}, Event> & Event & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getEventsByLocation(desiredLocation: string): Promise<(import("mongoose").Document<unknown, {}, Event> & Event & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    createOfResourceInMongoDbOnlyIfDoesntExist(createPlaceDto: CreatePlaceDto): Promise<Place>;
    getEventsByLocationFromGoogleApi(queryObject: GoogleApiQueryObject): Promise<GoogleApiQueryResponse> | null;
    getAllPlaces(): Promise<(import("mongoose").Document<unknown, {}, Place> & Place & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getUsersEvents(email: string): Promise<UserEvents[]>;
    getUsersHobbies(email: string): Promise<UserHobbies[]>;
    addUsersEvents(user_id: string, user_hobbies: UserHobbies): Promise<UserEvents[]>;
    addUsersHobbies(usr_email: string, user_hobbies: string[]): Promise<any>;
    addUsersEvent(user_id: string, user_event: UserEvents): Promise<any>;
}
