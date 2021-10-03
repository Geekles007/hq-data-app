import { Injectable } from '@nestjs/common';
import {IService} from "../interfaces/IService";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateUserInput} from "./dto/create-user.input";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";

@Injectable()
export class UsersService implements IService<User, CreateUserInput> {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
    }

    async findAll(): Promise<Array<User>> {
        return this.usersRepository.find();
    }

    async create(createUserInput: CreateUserInput): Promise<User> {
        const newUser = this.usersRepository.create({
            id: uuidv4(),
            ...createUserInput,
            password: await bcrypt.hash(createUserInput.password, 12)
        });
        return this.usersRepository.save(newUser);
    }

}
