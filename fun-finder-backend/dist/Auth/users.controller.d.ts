import { UserService } from './users.service';
import { User } from './AuthInterfaces/users.model';
import { Response, Request } from 'express';
export declare class UserController {
    private readonly userService;
    private readonly googleOAuthClient;
    constructor(userService: UserService);
    register(user: User): Promise<User>;
    login(credentials: {
        email: string;
        password: string;
    }): Promise<{
        user: User;
        accessToken: string;
    } | null>;
    logout(res: Response): Promise<void>;
    verifyToken(req: Request, res: Response): void;
    verifyGoogleToken(req: Request, res: Response): Promise<void>;
    getCurrentUserDataByEmail(email: string): Promise<User>;
    getCurrentUserDataById(id: string): Promise<User>;
    getCurrentUserDesc(email: string): Promise<{
        description: string;
    }>;
    updateCurrentUserDesc(email: string, body: {
        description: string;
    }): Promise<{
        message: string;
        user: User;
    } | {
        message: string;
        user?: undefined;
    }>;
    getCurrentUserScore(email: string): Promise<{
        score: number;
    }>;
    updateUserScore(email: string, body: {
        score: number;
    }): Promise<{
        message: string;
        user: User;
    } | {
        message: string;
        user?: undefined;
    }>;
}
