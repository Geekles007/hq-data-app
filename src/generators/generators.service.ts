import { Injectable } from '@nestjs/common';
import {BaseService} from "../interfaces/IService";
import {v4 as uuidv4} from "uuid";
import {DateTime} from "luxon";
import {SitesService} from "../sites/sites.service";
import {Site} from "../sites/site.entity";
import {Brand} from "../brands/brand.entity";
import {CreateGeneratorInput} from "./dto/create-generator.input";
import {BrandsService} from "../brands/brands.service";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Generator, State} from "./generator.entity";
import {PaginateGeneratorResult} from "./dto/PaginateGeneratorResult";

@Injectable()
export class GeneratorsService implements BaseService<Generator, CreateGeneratorInput> {

    constructor(
        @InjectRepository(Generator) private generatorsRepository: Repository<Generator>,
        private usersService: UsersService,
        private sitesService: SitesService,
        private brandsService: BrandsService
    ) {
    }

    async create(data: CreateGeneratorInput, connected?: User): Promise<Generator> {
        const brand: Brand | undefined = data?.brandId ? await this.brandsService.findOne(data?.brandId): undefined;
        const site: Site | undefined = data?.siteId ? await this.sitesService.findOne(data?.siteId): undefined;
        try {
            const newGenerator = await this.generatorsRepository.create({
                id: uuidv4(),
                ...data,
                state: data.state ? State.f : State.p,
                brand: brand,
                site: site,
                observation: data?.observation ?? "",
                numSeries: data?.numSeries ?? "",
                createdBy: connected,
                updatedBy: connected
            });
            return this.generatorsRepository.save(newGenerator);
        } catch(error: any) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }

    async delete(ids: Array<string>): Promise<boolean | null> {
        const dataToRemove = await this.generatorsRepository.createQueryBuilder("generators")
            .where("generators.id IN (:...ids)", {
                ids: ids
            }).getMany() ?? [];
        try {
            if(dataToRemove.length > 0) {
                const deleted = await this.generatorsRepository.remove(dataToRemove);
                return true;
            }
        } catch (e: any) {
            throw new Error("We can't delete those users.")
        }
        return null;
    }

    async findAll(first: number, after?: number): Promise<PaginateGeneratorResult> {
        const [result, total] = await this.generatorsRepository.findAndCount({
            take: first,
            skip: after,
            relations: ["createdBy", "updatedBy", "site", "brand"],
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

    async findOne(id: string): Promise<Generator> {
        return await this.generatorsRepository.findOneOrFail(id, {
            relations: ["createdBy", "updatedBy", "site", "brand"]
        });
    }

    async update(id: string, data: CreateGeneratorInput, connected?: User): Promise<Generator | null> {
        const brand: Brand | undefined = data?.brandId ? await this.brandsService.findOne(data?.brandId): undefined;
        const site: Site | undefined = data?.siteId ? await this.sitesService.findOne(data?.siteId): undefined;
        let generator = await this.generatorsRepository.findOneOrFail({
            where: {id: data?.id ?? ""},
            relations: ["createdBy", "site", "brand"]
        });
        if(generator) {
            generator.updatedBy = connected;
            generator.reference = data.reference && data.reference !== "" ? data.reference : generator?.reference;
            generator.power = data.power ? data.power : generator?.power;
            generator.state = data.state !== undefined ? (data.state ? State.f : State.p) : (generator?.state ? State.f : State.p);
            generator.brand = brand;
            generator.site = site;
            generator.observation = data?.observation && data?.observation !== "" ? data?.observation : generator?.observation;
            generator.numSeries = data?.numSeries && data?.numSeries !== "" ? data?.numSeries : generator?.numSeries;
            generator.updatedAt = new Date(DateTime.now().toUTC().toISO());
            return await this.generatorsRepository.save(generator);
        } else {
            throw new Error("Something went wrong.");
        }
    }

    async createOrEdit(data: CreateGeneratorInput, token: string): Promise<Generator | null> {
        const connected: User | undefined = await this.usersService.getConnectedId(token);
        const exists: Generator | undefined = await this.generatorsRepository.createQueryBuilder("generators")
            .where("generators.reference = :reference", {reference: data.reference}).getOne();
        if(data?.id) {
            return this.update(data?.id, data, connected);
        } else {
            if(!exists) {
                return this.create(data, connected);
            } else {
                throw new Error("This generator already exists!");
            }
        }

    }

}
