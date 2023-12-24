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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceSchema = exports.Place = exports.DisplayName = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let DisplayName = class DisplayName {
};
exports.DisplayName = DisplayName;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], DisplayName.prototype, "text", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], DisplayName.prototype, "languageCode", void 0);
exports.DisplayName = DisplayName = __decorate([
    (0, mongoose_1.Schema)()
], DisplayName);
let Place = class Place extends mongoose_2.Document {
};
exports.Place = Place;
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    __metadata("design:type", Array)
], Place.prototype, "types", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Place.prototype, "formattedAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], Place.prototype, "websiteUri", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: DisplayName, required: true }),
    __metadata("design:type", DisplayName)
], Place.prototype, "displayName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], Place.prototype, "iconMaskBaseUri", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], Place.prototype, "rating", void 0);
exports.Place = Place = __decorate([
    (0, mongoose_1.Schema)()
], Place);
exports.PlaceSchema = mongoose_1.SchemaFactory.createForClass(Place);
//# sourceMappingURL=place.model.js.map