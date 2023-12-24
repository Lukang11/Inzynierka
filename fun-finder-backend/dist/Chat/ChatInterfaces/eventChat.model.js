"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventChatModel = exports.EventChatSchema = void 0;
const mongoose = require("mongoose");
exports.EventChatSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: mongoose.Types.ObjectId,
    },
    participants: {
        type: [String],
        required: true,
    },
    last_message: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: '',
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});
exports.EventChatModel = mongoose.model('EventChat', exports.EventChatSchema);
//# sourceMappingURL=eventChat.model.js.map