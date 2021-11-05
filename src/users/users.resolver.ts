import {Resolver, Query, Mutation, Args, ID} from '@nestjs/graphql';
import {UsersService} from "./users.service";
import {User} from "./user.entity";
import {CreateUserInput} from "./dto/create-user.input";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Headers, Req, UseGuards} from "@nestjs/common";
import {TokenReq} from "../decorators/token.decorator";
import {PaginateUserResult} from "./dto/PaginateSiteResult";

@Resolver((of: any) => User)
export class UsersResolver {
    constructor(private usersService: UsersService) {
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => PaginateUserResult)
    findAllUser(@Args('first') first: number, @Args('after') after: number): Promise<PaginateUserResult> {
        return this.usersService.findAll(first, after);
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => User)
    findUserById(@Args("id") id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    // @UseGuards(JwtAuthGuard)
    @Mutation(returns => User)
    createOrEditUser(@Args('input') createUserInput: CreateUserInput, @TokenReq() token?: string): Promise<User | null> {
        return this.usersService.createOrEdit(createUserInput);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Boolean)
    deleteUsers(@Args({name: "ids", type: () => [ID]}) userIds: Array<string>): Promise<boolean | null> {
        return this.usersService.delete(userIds);
    }
}
