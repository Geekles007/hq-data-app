import { BaseService } from "../interfaces/IService";
import { Brand } from "./brand.entity";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.entity";
import { CreateBrandInput } from "./dto/create-brand.input";
export declare class BrandsService implements BaseService<Brand, CreateBrandInput> {
    private brandsRepository;
    private usersService;
    constructor(brandsRepository: Repository<Brand>, usersService: UsersService);
    create(data: CreateBrandInput, connected?: User): Promise<Brand>;
    delete(ids: Array<string>): Promise<boolean | null>;
    findAll(first: number, after?: number): Promise<Brand[]>;
    findOne(id: string): Promise<Brand>;
    update(id: string, data: CreateBrandInput, connected?: User): Promise<Brand | null>;
    createOrEdit(data: CreateBrandInput, token: string): Promise<Brand | null>;
}
