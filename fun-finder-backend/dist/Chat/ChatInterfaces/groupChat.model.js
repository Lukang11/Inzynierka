"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupChatModel = exports.GroupChatSchema = void 0;
const mongoose = require("mongoose");
exports.GroupChatSchema = new mongoose.Schema({
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
exports.GroupChatModel = mongoose.model('GroupChat', exports.GroupChatSchema);
//# sourceMappingURL=groupChat.model.js.map