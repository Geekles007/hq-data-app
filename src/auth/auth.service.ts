import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {Connected} from "./connected.entity";
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
    private jwtService: JwtService) {

    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneUser(username);
        if (user && await bcrypt.compare(password, user?.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any): Promise<Connected> {
        const payload = {
            username: user.username,
            sub: user.email
        }
        return {
            access_token: await this.jwtService.signAsync(payload),
            email: user?.email ?? ""
        }
    }

    async checkToken(token: string): Promise<any> {
        try {
            return await this.jwtService.verifyAsync(token);
        } catch (err: any) {
            const message = 'Token error: ' + (err.message || err.name);
            throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
    }

}
