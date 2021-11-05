import { BaseService } from "../interfaces/IService";
import { SitesService } from "../sites/sites.service";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.entity";
import { Place } from "./place.entity";
import { CreatePlaceInput } from "./dto/create-place.input";
import { PaginatePlaceResult } from "./dto/PaginatePlaceResult";
export declare class PlacesService implements BaseService<Place, CreatePlaceInput> {
    private placesRepository;
    private usersService;
    private sitesService;
    constructor(placesRepository: Repository<Place>, usersService: UsersService, sitesService: SitesService);
    create(data: CreatePlaceInput, connected?: User): Promise<Place>;
    delete(ids: Array<string>): Promise<boolean | null>;
    findAll(first: number, after?: number): Promise<PaginatePlaceResult>;
    findOne(id: string): Promise<Place>;
    update(id: string, data: CreatePlaceInput, connected?: User): Promise<Place | null>;
    createOrEdit(data: CreatePlaceInput, token: string): Promise<Place | null>;
}
