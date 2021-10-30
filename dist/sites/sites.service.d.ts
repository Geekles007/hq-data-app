import { BaseService } from "../interfaces/IService";
import { Site } from "./site.entity";
import { RegionsService } from "../regions/regions.service";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.entity";
import { CreateSiteInput } from "./dto/create-site.input";
export declare class SitesService implements BaseService<Site, CreateSiteInput> {
    private sitesRepository;
    private usersService;
    private regionsService;
    constructor(sitesRepository: Repository<Site>, usersService: UsersService, regionsService: RegionsService);
    create(data: CreateSiteInput, connected?: User): Promise<Site>;
    delete(ids: Array<string>): Promise<boolean | null>;
    findAll(first: number, after?: number): Promise<Site[]>;
    findOne(id: string): Promise<Site>;
    update(id: string, data: CreateSiteInput, connected?: User): Promise<Site | null>;
    createOrEdit(data: CreateSiteInput, token: string): Promise<Site | null>;
}
