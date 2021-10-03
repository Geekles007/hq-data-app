import { IService } from "../interfaces/IService";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserInput } from "./dto/create-user.input";
export declare class UsersService implements IService<User, CreateUserInput> {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<Array<User>>;
    create(createUserInput: CreateUserInput): Promise<User>;
}
