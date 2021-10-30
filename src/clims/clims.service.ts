import { Injectable } from '@nestjs/common';
import {BaseService} from "../interfaces/IService";
import {v4 as uuidv4} from "uuid";
import {DateTime} from "luxon";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateClimInput} from "./dto/create-clim.input";
import {Clim} from "./clim.entity";
import {Brand} from "../brands/brand.entity";
import {BrandsService} from "../brands/brands.service";
import {AteliersService} from "../ateliers/ateliers.service";
import {Atelier} from "../ateliers/atelier.entity";
import {PlacesService} from "../places/places.service";
import {Place} from "../places/place.entity";

@Injectable()
export class ClimsService implements BaseService<Clim, CreateClimInput> {

    constructor(
        @InjectRepository(Clim) private climsRepository: Repository<Clim>,
        private usersService: UsersService,
        private placesService: PlacesService,
        private ateliersService: AteliersService,
        private brandsService: BrandsService
    ) {
    }

    async create(data: CreateClimInput, connected?: User): Promise<Clim> {
        const place: Place | undefined = data?.placeId ? await this.placesService.findOne(data?.placeId) : undefined;
        const atelier: Atelier | undefined = data?.atelierId ? await this.ateliersService.findOne(data?.atelierId): undefined;
        const brand: Brand | undefined = data?.brandId ? await this.brandsService.findOne(data?.brandId): undefined;
        try {
            const newClim = await this.climsRepository.create({
                id: uuidv4(),
                ...data,
                place: place,
                atelier: atelier,
                brand: brand,
                createdBy: connected,
                updatedBy: connected
            });
            return this.climsRepository.save(newClim);
        } catch(error: any) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }

    async delete(ids: Array<string>): Promise<boolean | null> {
        const dataToRemove = await this.climsRepository.createQueryBuilder("clims")
            .where("clims.id IN (:...ids)", {
                ids: ids
            }).getMany() ?? [];
        try {
            if(dataToRemove.length > 0) {
                const deleted = await this.climsRepository.remove(dataToRemove);
                return true;
            }
        } catch (e: any) {
            throw new Error("We can't delete those users.")
        }
        return null;
    }

    async findAll(first: number, after?: number): Promise<Clim[]> {
        const clims: Clim[] = await this.climsRepository.find({
            take: first,
            skip: after,
            relations: ["createdBy", "updatedBy", "place", "atelier", "brand"],
        });
        try {
            return clims;
        } catch(error: any) {
            throw new Error(error.message) ;
        }
    }

    async findOne(id: string): Promise<Clim> {
        return await this.climsRepository.findOneOrFail(id, {
            relations: ["createdBy", "updatedBy", "place", "atelier", "brand"]
        });
    }

    async update(id: string, data: CreateClimInput, connected?: User): Promise<Clim | null> {
        const place: Place | undefined = data?.placeId ? await this.placesService.findOne(data?.placeId) : undefined;
        const atelier: Atelier | undefined = data?.atelierId ? await this.ateliersService.findOne(data?.atelierId): undefined;
        const brand: Brand | undefined = data?.brandId ? await this.brandsService.findOne(data?.brandId): undefined;
        let clim = await this.climsRepository.findOneOrFail({
            where: {id: data?.id ?? ""},
            relations: ["createdBy", "place", "atelier", "brand"]
        });
        if(clim) {
            clim.updatedBy = connected;
            clim.reference = data.reference && data.reference !== "" ? data.reference : clim?.reference;
            clim.state = data.etat ? data.etat : clim?.state;
            clim.power = data.power ? data.power : clim?.power;
            clim.reference = data.reference;
            clim.place = place;
            clim.atelier = atelier;
            clim.brand = brand;
            clim.updatedAt = new Date(DateTime.now().toUTC().toISO());
            return await this.climsRepository.save(clim);
        } else {
            throw new Error("Something went wrong.");
        }
    }

    async createOrEdit(data: CreateClimInput, token: string): Promise<Clim | null> {
        const connected: User | undefined = await this.usersService.getConnectedId(token);
        const exists: Clim | undefined = await this.climsRepository.createQueryBuilder("clims")
            .where("clims.reference = :reference", {reference: data.reference}).getOne();
        if(data?.id) {
            return this.update(data?.id, data, connected);
        } else {
            if(!exists) {
                return this.create(data, connected);
            } else {
                throw new Error("This clim already exists!");
            }
        }

    }

}
