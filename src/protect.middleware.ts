import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

@Injectable()
export class ProtectMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.jwt;

            if (!token) {
                throw new UnauthorizedException('Missing JWT');
            }

            const decodedToken = await this.jwtService.verifyAsync(token);

            if (!decodedToken) {
                throw new UnauthorizedException('Invalid JWT');
            }

            // You can attach the decoded user ID to the request for further processing
            req.userId = decodedToken.id;

            next();
        } catch (error) {
            throw new UnauthorizedException('Unauthorized');
        }
    }
}
