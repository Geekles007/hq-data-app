import { BaseService } from "../interfaces/IService";
import { Borehole } from "./borehole.entity";
import { CreateBoreholeInput } from "./dto/create-borehole.input";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.entity";
import { SitesService } from "../sites/sites.service";
export declare class BoreholesService implements BaseService<Borehole, CreateBoreholeInput> {
    private boreholesRepository;
    private usersService;
    private sitesService;
    constructor(boreholesRepository: Repository<Borehole>, usersService: UsersService, sitesService: SitesService);
    create(data: CreateBoreholeInput, connected?: User): Promise<Borehole>;
    delete(ids: Array<string>): Promise<boolean | null>;
    findAll(first: number, after?: number): Promise<Borehole[]>;
    findOne(id: string): Promise<Borehole>;
    update(id: string, data: CreateBoreholeInput, connected?: User): Promise<Borehole | null>;
    createOrEdit(data: CreateBoreholeInput, token: string): Promise<Borehole | null>;
}
