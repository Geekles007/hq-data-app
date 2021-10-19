import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { CreateUserInput } from "./dto/create-user.input";
export declare class UsersResolver {
    private usersService;
    constructor(usersService: UsersService);
    findAllUser(): Promise<User[]>;
    findUserById(id: string): Promise<User>;
    createOrEditUser(createUserInput: CreateUserInput): Promise<User | null>;
    deleteUsers(userIds: Array<string>): Promise<boolean | null>;
}
