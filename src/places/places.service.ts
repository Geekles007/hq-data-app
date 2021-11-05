import { Injectable } from '@nestjs/common';
import {BaseService} from "../interfaces/IService";
import {v4 as uuidv4} from "uuid";
import {DateTime} from "luxon";
import {SitesService} from "../sites/sites.service";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Site} from "../sites/site.entity";
import {Place} from "./place.entity";
import {CreatePlaceInput} from "./dto/create-place.input";
import {PaginatePlaceResult} from "./dto/PaginatePlaceResult";

@Injectable()
export class PlacesService implements BaseService<Place, CreatePlaceInput> {

    constructor(
        @InjectRepository(Place) private placesRepository: Repository<Place>,
        private usersService: UsersService,
        private sitesService: SitesService
    ) {
    }

    async create(data: CreatePlaceInput, connected?: User): Promise<Place> {
        const site: Site | undefined = data?.siteId ? await this.sitesService.findOne(data?.siteId) : undefined;
        try {
            const newPlace = await this.placesRepository.create({
                id: uuidv4(),
                ...data,
                site: site,
                createdBy: connected,
                updatedBy: connected
            });
            return this.placesRepository.save(newPlace);
        } catch(error: any) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }

    async delete(ids: Array<string>): Promise<boolean | null> {
        const dataToRemove = await this.placesRepository.createQueryBuilder("places")
            .where("places.id IN (:...ids)", {
                ids: ids
            }).getMany() ?? [];
        try {
            if(dataToRemove.length > 0) {
                const deleted = await this.placesRepository.remove(dataToRemove);
                return true;
            }
        } catch (e: any) {
            throw new Error("We can't delete those users.")
        }
        return null;
    }

    async findAll(first: number, after?: number): Promise<PaginatePlaceResult> {
        const [result, total] = await this.placesRepository.findAndCount({
            take: first,
            skip: after,
            relations: ["site", "createdBy", "updatedBy"]
        });
        try {
            return {
                data: result,
                count: total
            };
        } catch(error: any) {
            throw new Error(error.message) ;
        }
    }

    async findOne(id: string): Promise<Place> {
        return await this.placesRepository.findOneOrFail(id, {
            relations: ["site", "createdBy", "updatedBy"]
        }) ?? null;
    }

    async update(id: string, data: CreatePlaceInput, connected?: User): Promise<Place | null> {
        const site: Site | undefined = data?.siteId ? await this.sitesService.findOne(data?.siteId) : undefined;
        let place = await this.placesRepository.findOneOrFail({
            where: {id: data?.id ?? ""},
            relations: ["createdBy", "site"]
        });
        if(place) {
            place.updatedBy = connected;
            place.name = data.name && data?.name !== "" ? data?.name : place?.name;
            place.site = site;
            place.updatedAt = new Date(DateTime.now().toUTC().toISO());
            return await this.placesRepository.save(place);
        } else {
            throw new Error("Something went wrong.");
        }
    }

    async createOrEdit(data: CreatePlaceInput, token: string): Promise<Place | null> {
        const connected: User | undefined = await this.usersService.getConnectedId(token);
        const exists: Place | undefined = await this.placesRepository.createQueryBuilder("places")
            .where("places.name = :name", {name: data.name}).getOne();
        if(data?.id) {
            return this.update(data?.id, data, connected);
        } else {
            if(!exists) {
                return this.create(data, connected);
            } else {
                throw new Error("This place already exists!");
            }
        }
    }

}

