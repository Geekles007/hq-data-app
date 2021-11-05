import { Injectable } from '@nestjs/common';
import {BaseService} from "../interfaces/IService";
import {Region} from "./region.entity";
import {CreateRegionInput} from "./dto/create-region.input";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {v4 as uuidv4} from "uuid";
import {DateTime} from "luxon";
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";
import {PaginateResult} from "./dto/PaginateResult";

@Injectable()
export class RegionsService implements BaseService<Region, CreateRegionInput> {

    constructor(
        @InjectRepository(Region) private regionsRepository: Repository<Region>,
        private usersService: UsersService
        ) {
    }

    async create(data: CreateRegionInput, connected?: User): Promise<Region> {
        try {
            const newRegion = await this.regionsRepository.create({
                id: uuidv4(),
                ...data,
                createdBy: connected,
                updatedBy: connected
            });
            return this.regionsRepository.save(newRegion);
        } catch(error: any) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }

    async delete(ids: Array<string>): Promise<boolean | null> {
        const dataToRemove = await this.regionsRepository.createQueryBuilder("regions")
            .where("regions.id IN (:...ids)", {
                ids: ids
            }).getMany() ?? [];
        try {
            if(dataToRemove.length > 0) {
                const deleted = await this.regionsRepository.remove(dataToRemove);
                return true;
            }
        } catch (e: any) {
            throw new Error("We can't delete those users.")
        }
        return null;
    }

    async findAll(first?: number, after?: number): Promise<PaginateResult> {
        const [result, total] = await this.regionsRepository.findAndCount({
            take: first ?? undefined,
            skip: after ?? undefined,
            relations: ["createdBy", "updatedBy"]
        });
        try {
            return {
                data: result,
                count: total ?? 0
            };
        } catch(error: any) {
            throw new Error(error.message) ;
        }
    }

    async findOne(id: string): Promise<Region> {
        return await this.regionsRepository.findOneOrFail(id, {
            relations: ["createdBy", "updatedBy"]
        });
    }

    async update(id: string, data: CreateRegionInput, connected?: User): Promise<Region | null> {
        let region = await this.regionsRepository.findOneOrFail({
            where: {id: data?.id ?? ""},
            relations: ["createdBy"]
        });
        if(region) {
            region.updatedBy = connected;
            region.name = data.name && data?.name !== "" ? data?.name : region?.name;
            region.updatedAt = new Date(DateTime.now().toUTC().toISO());
            return await this.regionsRepository.save(region);
        } else {
            throw new Error("Something went wrong.");
        }
    }

    async createOrEdit(data: CreateRegionInput, token: string): Promise<Region | null> {
        const connected: User | undefined = await this.usersService.getConnectedId(token);
        const exists: Region | undefined = await this.regionsRepository.createQueryBuilder("regions")
            .where("regions.name = :name", {name: data.name}).getOne();
        if(data?.id) {
            return this.update(data?.id, data, connected);
        } else {
            if(!exists) {
                return this.create(data, connected);
            } else {
                throw new Error("This region already exists!");
            }
        }
    }

}
