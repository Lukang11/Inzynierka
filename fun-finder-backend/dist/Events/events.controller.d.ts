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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { EventsService } from './events.service';
import { GoogleApiQueryObject, GoogleApiQueryResponse } from './EventInterfaces/eventsInterfaces';
import { UserEvents } from 'src/Auth/AuthInterfaces/users.model';
export declare class EventsController {
    private readonly eventService;
    constructor(eventService: EventsService);
    getAllEvents(): any;
    getEventByLocationFromDataBase(object: {
        location: string;
    }): Promise<(import("mongoose").Document<unknown, {}, Event> & Event & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    addEvents(fullObject: {
        name: string;
        location: string;
        relatedHobbies: string[];
    }): any;
    findPlaceByLocalizationGoogleApi(queryObject: GoogleApiQueryObject): Promise<GoogleApiQueryResponse>;
    testFunction(object: any): void;
    getAllPlaces(): Promise<(import("mongoose").Document<unknown, {}, import("./EventInterfaces/place.model").Place> & import("./EventInterfaces/place.model").Place & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getUsersEvents(email: string): Promise<UserEvents[]>;
    addUsersEvents(user_id: string, user_events: UserEvents): Promise<any>;
    getUsersHobbies(email: string): Promise<import("src/Auth/AuthInterfaces/users.model").UserHobbies[]>;
    addUsersHobbies(email: string, object: any): Promise<any>;
}
