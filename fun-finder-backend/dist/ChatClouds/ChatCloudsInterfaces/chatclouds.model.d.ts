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
/// <reference types="mongoose/types/inferschematype" />
import * as mongoose from 'mongoose';
export interface PrivateChat extends mongoose.Document {
    participants: string[];
    created_at: Date;
    last_message: string;
}
export declare const PrivateChatSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    participants: string[];
    last_message: string;
    created_at: Date;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    participants: string[];
    last_message: string;
    created_at: Date;
}>> & mongoose.FlatRecord<{
    participants: string[];
    last_message: string;
    created_at: Date;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export declare const PrivateChatModel: mongoose.Model<PrivateChat, {}, {}, {}, mongoose.Document<unknown, {}, PrivateChat> & PrivateChat & {
    _id: mongoose.Types.ObjectId;
}, any>;
