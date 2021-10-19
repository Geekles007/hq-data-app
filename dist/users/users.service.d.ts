import { IService } from "../interfaces/IService";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserInput } from "./dto/create-user.input";
export declare class UsersService implements IService<User, CreateUserInput> {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(createUserInput: CreateUserInput): Promise<User>;
    update(id: string, createUserInput: CreateUserInput): Promise<User | null>;
    createOrEdit(data: CreateUserInput): Promise<User | null>;
    delete(ids: Array<string>): Promise<boolean | null>;
    login(login: string, password: string): Promise<User | undefined>;
}
