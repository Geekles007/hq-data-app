import { Injectable } from '@nestjs/common';
import {BaseService} from "../interfaces/IService";
import {Borehole} from "./borehole.entity";
import {CreateBoreholeInput} from "./dto/create-borehole.input";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";
import {v4 as uuidv4} from "uuid";
import {DateTime} from "luxon";
import {Site} from "../sites/site.entity";
import {SitesService} from "../sites/sites.service";
import {PaginateBoreholeResult} from "./dto/PaginateBoreholeResult";

@Injectable()
export class BoreholesService implements BaseService<Borehole, CreateBoreholeInput> {

    constructor(
        @InjectRepository(Borehole) private boreholesRepository: Repository<Borehole>,
        private usersService: UsersService,
        private sitesService: SitesService,
    ) {
    }

    async create(data: CreateBoreholeInput, connected?: User): Promise<Borehole> {
        const site: Site | undefined = data?.siteId ? await this.sitesService.findOne(data?.siteId) : undefined;
        try {
            const newBorehole = await this.boreholesRepository.create({
                id: uuidv4(),
                ...data,
                site: site,
                createdBy: connected,
                updatedBy: connected
            });
            return this.boreholesRepository.save(newBorehole);
        } catch(error: any) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }

    async delete(ids: Array<string>): Promise<boolean | null> {
        const dataToRemove = await this.boreholesRepository.createQueryBuilder("boreholes")
            .where("boreholes.id IN (:...ids)", {
                ids: ids
            }).getMany() ?? [];
        try {
            if(dataToRemove.length > 0) {
                const deleted = await this.boreholesRepository.remove(dataToRemove);
                return true;
            }
        } catch (e: any) {
            throw new Error("We can't delete those users.")
        }
        return null;
    }

    async findAll(first: number, after?: number): Promise<PaginateBoreholeResult> {
        const [result, total] = await this.boreholesRepository.findAndCount({
            take: first,
            skip: after,
            relations: ["createdBy", "updatedBy", "site"],
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

    async findOne(id: string): Promise<Borehole> {
        return await this.boreholesRepository.findOneOrFail(id, {
            relations: ["createdBy", "updatedBy", "site"]
        });
    }

    async update(id: string, data: CreateBoreholeInput, connected?: User): Promise<Borehole | null> {
        const site: Site | undefined = data?.siteId ? await this.sitesService.findOne(data?.siteId) : undefined;
        let borehole = await this.boreholesRepository.findOneOrFail({
            where: {id: data?.id ?? ""},
            relations: ["createdBy", "site"]
        });
        if(borehole) {
            borehole.updatedBy = connected;
            borehole.reference = data.reference && data.reference !== "" ? data.reference : borehole?.reference;
            borehole.location = data.location && data.location !== "" ? data.location : borehole?.location;
            borehole.depth = data.depth ? data.depth : borehole?.depth;
            borehole.debitCubeH = data.debitCubeH ? data.debitCubeH : borehole?.debitCubeH;
            borehole.cost = data.cost ? data.cost : borehole?.cost;
            borehole.doneBy = data.doneBy && data.doneBy !== "" ? data.doneBy : borehole?.doneBy;
            borehole.date = data.date && data.date !== "" ? data.date : borehole?.date;
            borehole.pompe = data.pompe && data.pompe !== "" ? data.pompe : borehole?.pompe;
            borehole.debitCube = data.debitCube ? data.debitCube : borehole?.debitCube;
            borehole.observation = data.observation && data.observation !== "" ? data.observation : borehole?.observation;
            borehole.reference = data.reference;
            borehole.site = site;
            borehole.updatedAt = new Date(DateTime.now().toUTC().toISO());
            return await this.boreholesRepository.save(borehole);
        } else {
            throw new Error("Something went wrong.");
        }
    }

    async createOrEdit(data: CreateBoreholeInput, token: string): Promise<Borehole | null> {
        const connected: User | undefined = await this.usersService.getConnectedId(token);
        const exists: Borehole | undefined = await this.boreholesRepository.createQueryBuilder("boreholes")
            .where("boreholes.reference = :reference", {reference: data.reference}).getOne();
        if(data?.id) {
            return this.update(data?.id, data, connected);
        } else {
            if(!exists) {
                return this.create(data, connected);
            } else {
                throw new Error("This borehole already exists!");
            }
        }

    }

}
