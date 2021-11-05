import { BaseService } from "../interfaces/IService";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.entity";
import { CreateClimInput } from "./dto/create-clim.input";
import { Clim } from "./clim.entity";
import { BrandsService } from "../brands/brands.service";
import { AteliersService } from "../ateliers/ateliers.service";
import { PlacesService } from "../places/places.service";
import { PaginateClimResult } from "./dto/PaginateClimResult";
export declare class ClimsService implements BaseService<Clim, CreateClimInput> {
    private climsRepository;
    private usersService;
    private placesService;
    private ateliersService;
    private brandsService;
    constructor(climsRepository: Repository<Clim>, usersService: UsersService, placesService: PlacesService, ateliersService: AteliersService, brandsService: BrandsService);
    create(data: CreateClimInput, connected?: User): Promise<Clim>;
    delete(ids: Array<string>): Promise<boolean | null>;
    findAll(first: number, after?: number): Promise<PaginateClimResult>;
    findOne(id: string): Promise<Clim>;
    update(id: string, data: CreateClimInput, connected?: User): Promise<Clim | null>;
    createOrEdit(data: CreateClimInput, token: string): Promise<Clim | null>;
}
