import { Injectable } from '@nestjs/common';
import {IService} from "../interfaces/IService";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import {CreateUserInput} from "./dto/create-user.input";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import {DateTime} from "luxon";

@Injectable()
export class UsersService implements IService<User, CreateUserInput> {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
    }

    async findAll(): Promise<User[]> {
        const users: User[] = await this.usersRepository.find();
        try {
            return users;
        } catch(error: any) {
            throw new Error(error.message) ;
        }
    }

    async findOne(id: string): Promise<User> {
        return this.usersRepository.findOneOrFail(id);
    }

    async create(createUserInput: CreateUserInput): Promise<User> {
        try {
            const newUser = this.usersRepository.create({
                id: uuidv4(),
                ...createUserInput,
                createdAt: DateTime.now().toUTC().toISO(),
                updatedAt: DateTime.now().toUTC().toISO(),
                password: await bcrypt.hash(createUserInput.password, 12)
            });
            return this.usersRepository.save(newUser);
        } catch(error: any) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }

    async update(id: string, createUserInput: CreateUserInput): Promise<User | null> {
        let user = await this.usersRepository.findOneOrFail(createUserInput?.id);
        if(user) {
            return this.usersRepository.save({
                id: id,
                ...createUserInput,
                createdAt: user?.createdAt,
                updatedAt: DateTime.now().toUTC().toISO()
            });
        } else {
            throw new Error("Something went wrong.");
        }
    }

    async createOrEdit(data: CreateUserInput): Promise<User | null> {
        const exists: User | undefined = await this.usersRepository.createQueryBuilder("users")
            .where("users.email = :email", {email: data.email}).getOne();
        if(!exists) {
            if(data?.id) {
                return this.update(data?.id, data);
            } else {
                return this.create(data);
            }
        } else {
            throw new Error("This user already exists!");
        }
    }

    async delete(ids: Array<string>): Promise<boolean | null> {
        const dataToRemove = await this.usersRepository.createQueryBuilder("users")
            .where("users.id IN (:...ids)", {
                ids: ids
            }).getMany() ?? [];
        try {
            if(dataToRemove.length > 0) {
                const deleted = await this.usersRepository.remove(dataToRemove);
                return true;
            }
        } catch (e: any) {
            throw new Error("We can't delete those users.")
        }
        return null;
    }

    async findOneUser(login: string): Promise<User | undefined> {
        try {
            return await this.usersRepository.createQueryBuilder("users")
                .where("users.username = :login", {login: login})
                .orWhere("users.email = :login", {login: login}).getOne();
        } catch(e: any) {
            throw new Error("Username or password incorrect.")
        }
    }

}
