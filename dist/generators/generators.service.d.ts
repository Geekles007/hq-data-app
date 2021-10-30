import { BaseService } from "../interfaces/IService";
import { SitesService } from "../sites/sites.service";
import { CreateGeneratorInput } from "./dto/create-generator.input";
import { BrandsService } from "../brands/brands.service";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.entity";
import { Generator } from "./generator.entity";
export declare class GeneratorsService implements BaseService<Generator, CreateGeneratorInput> {
    private generatorsRepository;
    private usersService;
    private sitesService;
    private brandsService;
    constructor(generatorsRepository: Repository<Generator>, usersService: UsersService, sitesService: SitesService, brandsService: BrandsService);
    create(data: CreateGeneratorInput, connected?: User): Promise<Generator>;
    delete(ids: Array<string>): Promise<boolean | null>;
    findAll(first: number, after?: number): Promise<Generator[]>;
    findOne(id: string): Promise<Generator>;
    update(id: string, data: CreateGeneratorInput, connected?: User): Promise<Generator | null>;
    createOrEdit(data: CreateGeneratorInput, token: string): Promise<Generator | null>;
}
