"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MessageSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        required: true,
    },
    conversation_id: {
        type: String,
        required: true,
    },
    sender_id: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: '1999-12-31T23:00:00.000Z',
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Messages', exports.MessageSchema);
//# sourceMappingURL=message.model.js.map