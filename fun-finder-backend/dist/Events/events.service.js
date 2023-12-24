"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const axios_1 = require("axios");
let EventsService = class EventsService {
    constructor(eventsModel, placeModel, userModel) {
        this.eventsModel = eventsModel;
        this.placeModel = placeModel;
        this.userModel = userModel;
    }
    async insertEvent(name, location, relatedHobbies) {
        const newEvent = new this.eventsModel({
            name,
            location,
            relatedHobbies,
        });
        const result = await newEvent.save();
        console.log('Incoming POST request with this body :\n');
        console.log(result);
    }
    async getAllEvents() {
        try {
            const allEvents = await this.eventsModel.find().exec();
            console.log(allEvents);
            return allEvents;
        }
        catch (error) {
            console.error('Error fetching all events:', error);
            throw error;
        }
    }
    async getEventsByLocation(desiredLocation) {
        try {
            const events = await this.eventsModel
                .find({ location: desiredLocation })
                .exec();
            return events;
        }
        catch (error) {
            console.error('Error fetching events by location:', error);
            throw error;
        }
    }
    async createOfResourceInMongoDbOnlyIfDoesntExist(createPlaceDto) {
        const { displayName, formattedAddress } = createPlaceDto;
        const doesPlaceAlreadyExist = await this.placeModel
            .findOne({
            'displayName.text': displayName.text,
            'displayName.languageCode': displayName.languageCode,
            formattedAddress: formattedAddress,
        })
            .exec();
        const createdPlace = new this.placeModel(createPlaceDto);
        return !!doesPlaceAlreadyExist ? null : createdPlace.save();
    }
    async getEventsByLocationFromGoogleApi(queryObject) {
        const placesUrl = 'https://places.googleapis.com/v1/places:searchNearby';
        const headers = {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': `${process.env.API_KEY}`,
            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.types,places.websiteUri,places.iconMaskBaseUri,places.rating',
        };
        let response = null;
        await axios_1.default
            .post(placesUrl, queryObject, { headers })
            .then((res) => {
            response = res.data;
            console.log(response);
            response.places.map((value) => {
                this.createOfResourceInMongoDbOnlyIfDoesntExist(value);
            });
        })
            .catch((err) => {
            console.log(err);
        });
        return response;
    }
    async getAllPlaces() {
        return await this.placeModel.find().exec();
    }
    async getUsersEvents(email) {
        const user = await this.userModel.findOne({ email: email });
        const events = user.events;
        console.log(user);
        return events;
    }
    async getUsersHobbies(email) {
        const user = await this.userModel.findOne({ email: email });
        const user_hobbies = user.hobbies;
        return user_hobbies;
    }
    async addUsersEvents(user_id, user_hobbies) {
        const user = await this.userModel.findOne({ _id: user_id });
        const user_events = user.events;
        return user_events;
    }
    async addUsersHobbies(usr_email, user_hobbies) {
        try {
            const user = await this.userModel.updateOne({ email: usr_email }, { $push: { hobbies: user_hobbies } });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async addUsersEvent(user_id, user_event) {
        try {
            const user = await this.userModel.updateOne({ _id: user_id }, { $push: { events: user_event } });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Events')),
    __param(1, (0, mongoose_1.InjectModel)('Api_Places')),
    __param(2, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], EventsService);
//# sourceMappingURL=events.service.js.map