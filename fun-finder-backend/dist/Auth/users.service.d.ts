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
import { Model } from 'mongoose';
import { User } from './AuthInterfaces/users.model';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly UserModel;
    private readonly jwtService;
    constructor(UserModel: Model<User>, jwtService: JwtService);
    createUser(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(userId: string): Promise<User | null>;
    comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean>;
    loginUser(email: string, password: string): Promise<{
        user: User;
        accessToken: string;
    } | null>;
    createGoogleUser(payload: any): Promise<User>;
    updateGoogleUser(user: User, payload: any): Promise<User>;
    getUserDescByEmail(email: string): Promise<string | null>;
    updateUserDescByEmail(email: string, newDescription: string): Promise<User | null>;
    getUserScoreByEmail(email: string): Promise<number | null>;
    updateUserScoreByEmail(email: string, newScore: number): Promise<User | null>;
}
