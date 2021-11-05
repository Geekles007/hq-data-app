import {Injectable, UseGuards} from '@nestjs/common';
import {IService} from "../interfaces/IService";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateUserInput} from "./dto/create-user.input";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import {DateTime} from "luxon";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constants";
import {PaginateUserResult} from "./dto/PaginateSiteResult";

@Injectable()
export class UsersService implements IService<User, CreateUserInput> {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        // private readonly authService: AuthService,
    ) {

    }

    async findAll(first: number, after?: number): Promise<PaginateUserResult> {
        const [result, total] = await this.usersRepository.findAndCount({
            take: first,
            skip: after
        });
        try {
            return {
                data: result,
                count: total
            };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async findOne(id: string): Promise<User> {
        return await this.usersRepository.findOneOrFail(id);
    }

    async create(createUserInput: CreateUserInput): Promise<User> {
        try {
            const newUser = await this.usersRepository.create({
                id: uuidv4(),
                ...createUserInput,
                createdAt: DateTime.now().toUTC().toISO(),
                updatedAt: DateTime.now().toUTC().toISO(),
                password: await bcrypt.hash(createUserInput.password, 12)
            });
            return this.usersRepository.save(newUser);
        } catch (error: any) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }

    async update(id: string, createUserInput: CreateUserInput): Promise<User | null> {
        let user = await this.usersRepository.findOneOrFail(createUserInput?.id);
        const newPassword = createUserInput?.password && createUserInput?.password !== "" ? await bcrypt.hash(createUserInput?.password, 12) : user?.password;
        if (user) {
            return this.usersRepository.save({
                id: id,
                firstname: createUserInput?.firstname && createUserInput?.firstname !== "" ? createUserInput?.firstname : user?.firstname,
                lastname: createUserInput?.lastname && createUserInput?.lastname !== "" ? createUserInput?.lastname : user?.lastname,
                email: createUserInput?.email && createUserInput?.email !== "" ? createUserInput?.email : user?.email,
                username: createUserInput?.username && createUserInput?.username !== "" ? createUserInput?.username : user?.username,
                password: newPassword,
                createdAt: user?.createdAt,
                updatedAt: DateTime.now().toUTC().toISO()
            });
        } else {
            throw new Error("Something went wrong.");
        }
    }

    async createOrEdit(data: CreateUserInput): Promise<User | null> {
        const exists: User | undefined = await this.usersRepository.createQueryBuilder("users")
            .where("users.email = :email", {email: data.email})
            .orWhere("users.username = :username", {username: data.username})
            .getOne();
        if (data?.id) {
            return this.update(data?.id, data);
        } else {
            if (!exists) {
                return this.create(data);
            } else {
                throw new Error("This user already exists!");
            }
        }
    }

    async delete(ids: Array<string>): Promise<boolean | null> {
        const dataToRemove = await this.usersRepository.createQueryBuilder("users")
            .where("users.id IN (:...ids)", {
                ids: ids
            }).getMany() ?? [];
        try {
            if (dataToRemove.length > 0) {
                const deleted = await this.usersRepository.remove(dataToRemove);
                return true;
            }
        } catch (e: any) {
            throw new Error("We can't delete those users.")
        }
        return null;
    }

    async updateToken(connected: User, token: string): Promise<User> {
        if (connected) {
            return this.usersRepository.save({
                ...connected,
                token: token,
                updatedAt: DateTime.now().toUTC().toISO()
            });
        } else {
            throw new Error("Something went wrong.");
        }
    }

    async getConnectedId(token: string): Promise<User | undefined> {
        const jwt = token.replace('Bearer ', '');
        let connected: User | undefined;
        const jwtService = new JwtService({
            secret: jwtConstants.secret ?? ""
        });
        const decoded: {
            sub: string,
            username: string,
        } = await jwtService.decode(jwt, {json: true}) as {
            sub: string,
            username: string,
        };
        if (decoded) {
            connected = await this.usersRepository.createQueryBuilder("users")
                .where("users.email = :email", {email: decoded?.sub ?? ""})
                .getOne();
        }
        return connected;
    }

    async findOneUser(login: string): Promise<User | undefined> {
        try {
            return await this.usersRepository.createQueryBuilder("users")
                .where("users.username = :login", {login: login})
                .orWhere("users.email = :login", {login: login}).getOne();
        } catch (e: any) {
            throw new Error("Username or password incorrect.")
        }
    }

}
