import {Resolver, Query, Mutation, Args, ID} from '@nestjs/graphql';
import {UsersService} from "./users.service";
import {User} from "./user.entity";
import {CreateUserInput} from "./dto/create-user.input";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Headers, Req, UseGuards} from "@nestjs/common";
import {TokenReq} from "../decorators/token.decorator";

@Resolver((of: any) => User)
export class UsersResolver {
    constructor(private usersService: UsersService) {
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => [User])
    findAllUser(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => User)
    findUserById(@Args("id") id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    // @UseGuards(JwtAuthGuard)
    @Mutation(returns => User)
    createOrEditUser(@Args('createUserInput') createUserInput: CreateUserInput, @TokenReq() token?: string): Promise<User | null> {
        return this.usersService.createOrEdit(createUserInput);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Boolean)
    deleteUsers(@Args({name: "userIds", type: () => [ID]}) userIds: Array<string>): Promise<boolean | null> {
        return this.usersService.delete(userIds);
    }
}
