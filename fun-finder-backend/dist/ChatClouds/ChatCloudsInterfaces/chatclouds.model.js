"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateChatModel = exports.PrivateChatSchema = void 0;
const mongoose = require("mongoose");
exports.PrivateChatSchema = new mongoose.Schema({
    participants: {
        type: [String],
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    last_message: {
        type: String,
        default: '',
    },
});
exports.PrivateChatModel = mongoose.model('PrivateChat', exports.PrivateChatSchema);
//# sourceMappingURL=chatclouds.model.js.map