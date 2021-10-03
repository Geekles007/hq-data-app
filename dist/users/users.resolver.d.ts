import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { CreateUserInput } from "./dto/create-user.input";
export declare class UsersResolver {
    private usersService;
    constructor(usersService: UsersService);
    users(): Promise<User[]>;
    createUser(createUserInput: CreateUserInput): Promise<User>;
}
