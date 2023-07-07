import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
export declare class AppController {
    private readonly appService;
    private readonly jwtService;
    constructor(appService: AppService, jwtService: JwtService);
    register(email: string, password: string): Promise<import("./users/user.entity").Users>;
    login(email: string, password: string, response: Response): Promise<{
        email: string;
        message: string;
    }>;
    user(request: Request): Promise<{
        id: number;
        email: string;
    }>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
