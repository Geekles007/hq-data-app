import { AuthService } from "./auth.service";
import { Connected } from "./connected.entity";
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    signIn(login: string, password: string): Promise<Connected>;
}
