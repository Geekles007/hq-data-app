import { AuthService } from "./auth.service";
import { Connected } from "./connected.entity";
import { UsersService } from "../users/users.service";
export declare class AuthResolver {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    signIn(login: string, password: string): Promise<Connected>;
}
