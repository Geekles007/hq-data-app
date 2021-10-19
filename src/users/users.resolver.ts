import {Resolver, Query, Mutation, Args, ID} from '@nestjs/graphql';
import {UsersService} from "./users.service";
import {User} from "./user.entity";
import {CreateUserInput} from "./dto/create-user.input";
import {IConnection} from "../interfaces/IConnection";
import {DeleteResult} from "typeorm";

@Resolver((of: any) => User)
export class UsersResolver {
    constructor(private usersService: UsersService) {
    }

    @Query(returns => [User])
    findAllUser(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Query(returns => User)
    findUserById(@Args("id") id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Mutation(returns => User)
    createOrEditUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User | null> {
        return this.usersService.createOrEdit(createUserInput);
    }

    @Mutation(returns => Boolean)
    deleteUsers(@Args({name: "userIds", type: () => [ID]}) userIds: Array<string>): Promise<boolean | null> {
        return this.usersService.delete(userIds);
    }
}
