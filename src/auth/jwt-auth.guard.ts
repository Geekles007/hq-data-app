import {ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {GqlExecutionContext} from "@nestjs/graphql";
import * as jwt from 'jsonwebtoken';
import {JwtService} from "@nestjs/jwt";
import {AuthService} from "./auth.service";
import {jwtConstants} from "./constants";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor() {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context).getContext();
        if (!ctx.headers.authorization) {
            return false;
        }
        ctx.user = await this.validateToken(ctx.headers.authorization);
        return true;
    }

    async validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        const token = auth.split(' ')[1];

        const jwtService = new JwtService({
            secret: jwtConstants.secret ?? ""
        });

        try {
            return await jwtService.verifyAsync(token ?? "");
        } catch (err: any) {
            const message = 'Token error: ' + (err.message || err.name);
            throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
    }
}
