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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(UserModel, jwtService) {
        this.UserModel = UserModel;
        this.jwtService = jwtService;
    }
    async createUser(user) {
        if (!user.email || !user.fname || !user.lname) {
            throw new Error('Wszystkie pola są wymagane.');
        }
        if (user.password) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user = { ...user, password: hashedPassword, description: "Not yet set", score: 0 };
        }
        const createdUser = await this.UserModel.create(user);
        return createdUser.toObject();
    }
    async findByEmail(email) {
        return this.UserModel.findOne({ email }).exec();
    }
    async findById(userId) {
        return this.UserModel.findOne({ _id: userId }).exec();
    }
    async comparePassword(candidatePassword, hashedPassword) {
        return bcrypt.compare(candidatePassword, hashedPassword);
    }
    async loginUser(email, password) {
        const user = await this.findByEmail(email);
        if (user && (await this.comparePassword(password, user.password))) {
            const payload = { _id: user._id, email: user.email, fname: user.fname, lname: user.lname };
            const accessToken = this.jwtService.sign(payload);
            return { user, accessToken };
        }
        throw new common_1.UnauthorizedException('Nieprawidłowy adres email lub hasło');
    }
    async createGoogleUser(payload) {
        const { email, given_name, family_name } = payload;
        const newUser = new this.UserModel({
            email,
            fname: given_name,
            lname: family_name,
        });
        const newUserObject = newUser.toObject();
        return this.createUser(newUserObject);
    }
    async updateGoogleUser(user, payload) {
        user.email = payload.email;
        user.fname = payload.given_name;
        user.lname = payload.family_name;
        return user.save();
    }
    async getUserDescByEmail(email) {
        const user = await this.UserModel.findOne({ email }).exec();
        return user ? user.description : null;
    }
    async updateUserDescByEmail(email, newDescription) {
        const user = await this.UserModel.findOneAndUpdate({ email }, { $set: { description: newDescription } }, { new: true }).exec();
        return user;
    }
    async getUserScoreByEmail(email) {
        const user = await this.UserModel.findOne({ email }).exec();
        return user ? user.score : null;
    }
    async updateUserScoreByEmail(email, newScore) {
        const user = await this.UserModel.findOneAndUpdate({ email }, { $set: { score: newScore } }, { new: true }).exec();
        return user || null;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=users.service.js.map