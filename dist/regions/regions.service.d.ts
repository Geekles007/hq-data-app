import { BaseService } from "../interfaces/IService";
import { Region } from "./region.entity";
import { CreateRegionInput } from "./dto/create-region.input";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.entity";
import { PaginateResult } from "./dto/PaginateResult";
export declare class RegionsService implements BaseService<Region, CreateRegionInput> {
    private regionsRepository;
    private usersService;
    constructor(regionsRepository: Repository<Region>, usersService: UsersService);
    create(data: CreateRegionInput, connected?: User): Promise<Region>;
    delete(ids: Array<string>): Promise<boolean | null>;
    findAll(first?: number, after?: number): Promise<PaginateResult>;
    findOne(id: string): Promise<Region>;
    update(id: string, data: CreateRegionInput, connected?: User): Promise<Region | null>;
    createOrEdit(data: CreateRegionInput, token: string): Promise<Region | null>;
}
