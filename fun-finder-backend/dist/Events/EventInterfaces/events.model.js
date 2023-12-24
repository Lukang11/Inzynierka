"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.EventSchema = void 0;
const mongoose_1 = require("mongoose");
exports.EventSchema = new mongoose_1.default.Schema({
    name: { type: String, require: true },
    location: { type: String, require: true },
    relatedHobbies: {
        type: [String],
        default: [],
        require: true,
    },
});
class Event {
    constructor(name, location, relatedHobbies) {
        this.name = name;
        this.location = location;
        this.relatedHobbies = relatedHobbies;
    }
}
exports.Event = Event;
//# sourceMappingURL=events.model.js.map