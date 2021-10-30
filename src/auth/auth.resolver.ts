import {Args, GqlExecutionContext, Mutation, Query, Resolver} from '@nestjs/graphql';
import {User} from "../users/user.entity";
import {AuthService} from "./auth.service";
import {Connected} from "./connected.entity";
import {UsersService} from "../users/users.service";

@Resolver((of: any) => User)
export class AuthResolver {

    constructor(private authService: AuthService, private usersService: UsersService) {}

    @Mutation(returns => Connected)
    public async signIn(@Args("login") login: string, @Args("password") password: string): Promise<Connected> {
        const user: User = await this.authService.validateUser(login, password);
        if(user) {
            const connected: Connected = await this.authService.login(user);
            await this.usersService.updateToken(user, connected.access_token);
            return connected;
        }
        throw new Error("Invalid credentials !");
    }

}
