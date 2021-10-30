import { Injectable } from '@nestjs/common';
import {BaseService} from "../interfaces/IService";
import {v4 as uuidv4} from "uuid";
import {DateTime} from "luxon";
import {Site} from "./site.entity";
import {RegionsService} from "../regions/regions.service";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Region} from "../regions/region.entity";
import {CreateSiteInput} from "./dto/create-site.input";

@Injectable()
export class SitesService implements BaseService<Site, CreateSiteInput> {

    constructor(
        @InjectRepository(Site) private sitesRepository: Repository<Site>,
        private usersService: UsersService,
        private regionsService: RegionsService
    ) {
    }

    async create(data: CreateSiteInput, connected?: User): Promise<Site> {
        const region: Region | undefined = data?.regionId ? await this.regionsService.findOne(data?.regionId) : undefined;
        try {
            const newSite = await this.sitesRepository.create({
                id: uuidv4(),
                ...data,
                region: region,
                createdBy: connected,
                updatedBy: connected
            });
            return this.sitesRepository.save(newSite);
        } catch(error: any) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }

    async delete(ids: Array<string>): Promise<boolean | null> {
        const dataToRemove = await this.sitesRepository.createQueryBuilder("sites")
            .where("sites.id IN (:...ids)", {
                ids: ids
            }).getMany() ?? [];
        try {
            if(dataToRemove.length > 0) {
                const deleted = await this.sitesRepository.remove(dataToRemove);
                return true;
            }
        } catch (e: any) {
            throw new Error("We can't delete those users.")
        }
        return null;
    }

    async findAll(first: number, after?: number): Promise<Site[]> {
        const sites: Site[] = await this.sitesRepository.find({
            take: first,
            skip: after,
            relations: ["region"]
        });
        try {
            return sites;
        } catch(error: any) {
            throw new Error(error.message) ;
        }
    }

    async findOne(id: string): Promise<Site> {
        return await this.sitesRepository.findOneOrFail(id, {
            relations: ["region", "createdBy", "updatedBy"]
        });
    }

    async update(id: string, data: CreateSiteInput, connected?: User): Promise<Site | null> {
        const region: Region | undefined = data?.regionId ? await this.regionsService.findOne(data?.regionId) : undefined;
        let site = await this.sitesRepository.findOneOrFail({
            where: {id: data?.id ?? ""},
            relations: ["createdBy", "region"]
        });
        if(site) {
            site.updatedBy = connected;
            site.name = data.name && data?.name !== "" ? data?.name : site?.name;
            site.region = region;
            site.updatedAt = new Date(DateTime.now().toUTC().toISO());
            return await this.sitesRepository.save(site);
        } else {
            throw new Error("Something went wrong.");
        }
    }

    async createOrEdit(data: CreateSiteInput, token: string): Promise<Site | null> {
        const connected: User | undefined = await this.usersService.getConnectedId(token);
        const exists: Site | undefined = await this.sitesRepository.createQueryBuilder("sites")
            .where("sites.reference = :reference", {reference: data.reference}).getOne();
        if(!exists) {
            if(data?.id) {
                return this.update(data?.id, data, connected);
            } else {
                return this.create(data, connected);
            }
        } else {
            throw new Error("This site already exists!");
        }
    }

}

