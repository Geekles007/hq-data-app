import { Injectable } from '@nestjs/common';
import {BaseService} from "../interfaces/IService";
import {Atelier} from "../ateliers/atelier.entity";
import {CreateAtelierInput} from "../ateliers/dto/create-atelier.input";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";
import {v4 as uuidv4} from "uuid";
import {DateTime} from "luxon";
import {RegionsService} from "../regions/regions.service";
import {Region} from "../regions/region.entity";

@Injectable()
export class AteliersService implements BaseService<Atelier, CreateAtelierInput> {

    constructor(
        @InjectRepository(Atelier) private ateliersRepository: Repository<Atelier>,
        private usersService: UsersService,
        private regionsService: RegionsService
    ) {
    }

    async create(data: CreateAtelierInput, connected?: User): Promise<Atelier> {
        const region: Region | undefined = data?.regionId ? await this.regionsService.findOne(data?.regionId) : undefined;
        try {
            const newAtelier = await this.ateliersRepository.create({
                id: uuidv4(),
                ...data,
                region: region,
                createdBy: connected,
                updatedBy: connected
            });
            return this.ateliersRepository.save(newAtelier);
        } catch(error: any) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }

    async delete(ids: Array<string>): Promise<boolean | null> {
        const dataToRemove = await this.ateliersRepository.createQueryBuilder("ateliers")
            .where("ateliers.id IN (:...ids)", {
                ids: ids
            }).getMany() ?? [];
        try {
            if(dataToRemove.length > 0) {
                const deleted = await this.ateliersRepository.remove(dataToRemove);
                return true;
            }
        } catch (e: any) {
            throw new Error("We can't delete those users.")
        }
        return null;
    }

    async findAll(first: number, after?: number): Promise<Atelier[]> {
        const ateliers: Atelier[] = await this.ateliersRepository.find({
            take: first,
            skip: after,
            relations: ["region", "createdBy", "updatedBy"],
        });
        try {
            return ateliers;
        } catch(error: any) {
            throw new Error(error.message) ;
        }
    }

    async findOne(id: string): Promise<Atelier> {
        return await this.ateliersRepository.findOneOrFail(id, {
            relations: ["region", "createdBy", "updatedBy"]
        });
    }

    async update(id: string, data: CreateAtelierInput, connected?: User): Promise<Atelier | null> {
        const region: Region | undefined = data?.regionId ? await this.regionsService.findOne(data?.regionId) : undefined;
        let atelier = await this.ateliersRepository.findOneOrFail({
            where: {id: data?.id ?? ""},
            relations: ["region", "createdBy"]
        });
        if(atelier) {
            atelier.updatedBy = connected;
            atelier.name = data.name && data?.name !== "" ? data?.name : atelier.name;
            atelier.reference = data.reference && data?.reference !== "" ? data?.reference : atelier.reference;
            atelier.region = region;
            atelier.updatedAt = new Date(DateTime.now().toUTC().toISO());
            return await this.ateliersRepository.save(atelier);
        } else {
            throw new Error("Something went wrong.");
        }
    }

    async createOrEdit(data: CreateAtelierInput, token: string): Promise<Atelier | null> {
        const connected: User | undefined = await this.usersService.getConnectedId(token);
        const exists: Atelier | undefined = await this.ateliersRepository.createQueryBuilder("ateliers")
            .where("ateliers.reference = :reference", {reference: data.reference}).getOne();
        if(data?.id) {
            return this.update(data?.id, data, connected);
        } else {
            if(!exists) {
                return this.create(data, connected);
            } else {
                throw new Error("This atelier already exists!");
            }
        }
    }

}
