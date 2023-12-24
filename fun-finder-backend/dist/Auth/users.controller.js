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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const jwt = require("jsonwebtoken");
const google_auth_library_1 = require("google-auth-library");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.googleOAuthClient = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID);
    }
    async register(user) {
        const existingUser = await this.userService.findByEmail(user.email);
        if (existingUser) {
            throw new Error('Użytkownik o tym adresie email już istnieje.');
        }
        return this.userService.createUser(user);
    }
    async login(credentials) {
        try {
            const { email, password } = credentials;
            const result = await this.userService.loginUser(email, password);
            return result;
        }
        catch (error) {
            console.error('Błąd logowania:', error.message);
            throw new common_1.UnauthorizedException('Nieprawidłowy adres email lub hasło');
        }
    }
    async logout(res) {
        try {
            res.clearCookie('accessToken', {
                httpOnly: true,
                sameSite: 'strict',
            });
            res.status(common_1.HttpStatus.OK).json({ message: 'Pomyślnie wylogowano!' });
        }
        catch (error) {
            console.error('Błąd podczas wylogowywania:', error);
            res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: 'Wystąpił błąd podczas wylogowywania' });
            console.log('Status:', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    verifyToken(req, res) {
        const accessToken = req.headers.authorization?.split(' ')[1];
        try {
            const isUserAuthenticated = !!jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
            res.status(isUserAuthenticated ? 200 : 401).json({ isUserAuthenticated });
        }
        catch (error) {
            res.status(401).json({ isUserAuthenticated: false });
        }
    }
    async verifyGoogleToken(req, res) {
        const idToken = req.headers.authorization?.split(' ')[1];
        try {
            const ticket = await this.googleOAuthClient.verifyIdToken({
                idToken: idToken,
                audience: process.env.CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload || !payload.email) {
                throw new common_1.UnauthorizedException('Invalid Google token');
            }
            let user = await this.userService.findByEmail(payload.email);
            if (user) {
                user = await this.userService.updateGoogleUser(user, payload);
            }
            else {
                user = await this.userService.createGoogleUser(payload);
            }
            res.status(200).json({ isUserAuthenticated: true });
        }
        catch (error) {
            console.error('Błąd weryfikacji tokenu Google:', error);
            res.status(401).json({ isUserAuthenticated: false });
        }
    }
    async getCurrentUserDataByEmail(email) {
        return this.userService.findByEmail(email);
    }
    async getCurrentUserDataById(id) {
        return this.userService.findById(id);
    }
    async getCurrentUserDesc(email) {
        const description = await this.userService.getUserDescByEmail(email);
        return { description };
    }
    async updateCurrentUserDesc(email, body) {
        const updatedUser = await this.userService.updateUserDescByEmail(email, body.description);
        return updatedUser ? { message: 'Description updated successfully', user: updatedUser } : { message: 'User not found' };
    }
    async getCurrentUserScore(email) {
        const score = await this.userService.getUserScoreByEmail(email);
        return { score };
    }
    async updateUserScore(email, body) {
        const updatedUser = await this.userService.updateUserScoreByEmail(email, body.score);
        return updatedUser ? { message: 'Score updated successfully', user: updatedUser } : { message: 'User not found' };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('/verify-token'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "verifyToken", null);
__decorate([
    (0, common_1.Get)('/verify-google-token'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyGoogleToken", null);
__decorate([
    (0, common_1.Get)('/user-data-email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCurrentUserDataByEmail", null);
__decorate([
    (0, common_1.Get)('/user-data-id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCurrentUserDataById", null);
__decorate([
    (0, common_1.Get)('/user-description/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCurrentUserDesc", null);
__decorate([
    (0, common_1.Post)('/update-user-description/:email'),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateCurrentUserDesc", null);
__decorate([
    (0, common_1.Get)('/user-score/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCurrentUserScore", null);
__decorate([
    (0, common_1.Post)('/update-user-score/:email'),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserScore", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('/users'),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UserController);
//# sourceMappingURL=users.controller.js.map