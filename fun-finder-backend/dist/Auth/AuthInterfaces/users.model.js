"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    hobbies: { type: [String], required: true },
    events: { type: [Object] },
    description: { type: String, required: true },
    score: { type: Number, required: true },
});
//# sourceMappingURL=users.model.js.map