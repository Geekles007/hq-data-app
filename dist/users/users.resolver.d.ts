import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { PaginateUserResult } from "./dto/PaginateSiteResult";
export declare class UsersResolver {
    private usersService;
    constructor(usersService: UsersService);
    findAllUser(first: number, after: number): Promise<PaginateUserResult>;
    findUserById(id: string): Promise<User>;
    createOrEditUser(createUserInput: CreateUserInput, token?: string): Promise<User | null>;
    deleteUsers(userIds: Array<string>): Promise<boolean | null>;
}
