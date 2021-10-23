import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { Connected } from "./connected.entity";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<Connected>;
    checkToken(token: string): Promise<any>;
}
