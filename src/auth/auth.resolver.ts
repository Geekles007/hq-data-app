import {Args, GqlExecutionContext, Mutation, Query, Resolver} from '@nestjs/graphql';
import {User} from "../users/user.entity";
import {AuthService} from "./auth.service";
import {Connected} from "./connected.entity";

@Resolver((of: any) => User)
export class AuthResolver {

    constructor(private authService: AuthService) {}

    @Mutation(returns => Connected)
    public async signIn(@Args("login") login: string, @Args("password") password: string): Promise<Connected> {
        const user: User = await this.authService.validateUser(login, password);
        if(user) {
            return this.authService.login(user);
        }
        throw new Error("Invalid credentials !");
    }

}
