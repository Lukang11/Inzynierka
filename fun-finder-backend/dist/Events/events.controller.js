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
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const events_service_1 = require("./events.service");
const common_2 = require("@nestjs/common");
let EventsController = class EventsController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    getAllEvents() {
        return this.eventService.getAllEvents();
    }
    getEventByLocationFromDataBase(object) {
        const location = object.location.toLowerCase();
        return this.eventService.getEventsByLocation(location);
    }
    addEvents(fullObject) {
        this.eventService.insertEvent(fullObject.name, fullObject.location, fullObject.relatedHobbies);
    }
    findPlaceByLocalizationGoogleApi(queryObject) {
        try {
            console.log(queryObject);
            const result = this.eventService.getEventsByLocationFromGoogleApi(queryObject);
            return result;
        }
        catch (error) {
            console.error('Error processing request:', error);
            throw new common_2.HttpException('Invalid data format', common_2.HttpStatus.BAD_REQUEST);
        }
    }
    testFunction(object) {
        this.eventService.createOfResourceInMongoDbOnlyIfDoesntExist(object);
    }
    getAllPlaces() {
        return this.eventService.getAllPlaces();
    }
    getUsersEvents(email) {
        return this.eventService.getUsersEvents(email);
    }
    addUsersEvents(user_id, user_events) {
        console.log(user_events);
        return this.eventService.addUsersEvent(user_id, user_events);
    }
    getUsersHobbies(email) {
        return this.eventService.getUsersHobbies(email);
    }
    addUsersHobbies(email, object) {
        console.log(object.hobbies);
        return this.eventService.addUsersHobbies(email, object.hobbies);
    }
};
exports.EventsController = EventsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], EventsController.prototype, "getAllEvents", null);
__decorate([
    (0, common_1.Get)('/loc'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "getEventByLocationFromDataBase", null);
__decorate([
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], EventsController.prototype, "addEvents", null);
__decorate([
    (0, common_1.Post)('/find-places-by-localization'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "findPlaceByLocalizationGoogleApi", null);
__decorate([
    (0, common_1.Post)('/test'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "testFunction", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "getAllPlaces", null);
__decorate([
    (0, common_1.Get)('/event/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "getUsersEvents", null);
__decorate([
    (0, common_1.Get)('/add-event/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "addUsersEvents", null);
__decorate([
    (0, common_1.Get)('/hobbies/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "getUsersHobbies", null);
__decorate([
    (0, common_1.Post)('/hobbies/add/:email'),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "addUsersHobbies", null);
exports.EventsController = EventsController = __decorate([
    (0, common_1.Controller)('/events'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
//# sourceMappingURL=events.controller.js.map