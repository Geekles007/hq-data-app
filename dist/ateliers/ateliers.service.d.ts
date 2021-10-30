import { BaseService } from "../interfaces/IService";
import { Atelier } from "../ateliers/atelier.entity";
import { CreateAtelierInput } from "../ateliers/dto/create-atelier.input";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.entity";
import { RegionsService } from "../regions/regions.service";
export declare class AteliersService implements BaseService<Atelier, CreateAtelierInput> {
    private ateliersRepository;
    private usersService;
    private regionsService;
    constructor(ateliersRepository: Repository<Atelier>, usersService: UsersService, regionsService: RegionsService);
    create(data: CreateAtelierInput, connected?: User): Promise<Atelier>;
    delete(ids: Array<string>): Promise<boolean | null>;
    findAll(first: number, after?: number): Promise<Atelier[]>;
    findOne(id: string): Promise<Atelier>;
    update(id: string, data: CreateAtelierInput, connected?: User): Promise<Atelier | null>;
    createOrEdit(data: CreateAtelierInput, token: string): Promise<Atelier | null>;
}
