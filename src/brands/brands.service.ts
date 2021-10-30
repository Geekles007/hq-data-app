import { Injectable } from '@nestjs/common';
import {BaseService} from "../interfaces/IService";
import {v4 as uuidv4} from "uuid";
import {DateTime} from "luxon";
import {Brand} from "./brand.entity";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateBrandInput} from "./dto/create-brand.input";

@Injectable()
export class BrandsService implements BaseService<Brand, CreateBrandInput> {

    constructor(
        @InjectRepository(Brand) private brandsRepository: Repository<Brand>,
        private usersService: UsersService
    ) {
    }

    async create(data: CreateBrandInput, connected?: User): Promise<Brand> {
        try {
            const newBrand = await this.brandsRepository.create({
                id: uuidv4(),
                ...data,
                createdBy: connected,
                updatedBy: connected
            });
            return this.brandsRepository.save(newBrand);
        } catch(error: any) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }

    async delete(ids: Array<string>): Promise<boolean | null> {
        const dataToRemove = await this.brandsRepository.createQueryBuilder("brands")
            .where("brands.id IN (:...ids)", {
                ids: ids
            }).getMany() ?? [];
        try {
            if(dataToRemove.length > 0) {
                const deleted = await this.brandsRepository.remove(dataToRemove);
                return true;
            }
        } catch (e: any) {
            throw new Error("We can't delete those users.")
        }
        return null;
    }

    async findAll(first: number, after?: number): Promise<Brand[]> {
        const brands: Brand[] = await this.brandsRepository.find({
            take: first,
            skip: after,
            relations: ["createdBy", "updatedBy"]
        });
        try {
            return brands;
        } catch(error: any) {
            throw new Error(error.message) ;
        }
    }

    async findOne(id: string): Promise<Brand> {
        return await this.brandsRepository.findOneOrFail(id, {
            relations: ["createdBy", "updatedBy"]
        });
    }

    async update(id: string, data: CreateBrandInput, connected?: User): Promise<Brand | null> {
        let brand = await this.brandsRepository.findOneOrFail({
            where: {id: data?.id ?? ""},
            relations: ["createdBy"]
        });
        if(brand) {
            brand.updatedBy = connected;
            brand.name = data.name;
            brand.updatedAt = new Date(DateTime.now().toUTC().toISO());
            return await this.brandsRepository.save(brand);
        } else {
            throw new Error("Something went wrong.");
        }
    }

    async createOrEdit(data: CreateBrandInput, token: string): Promise<Brand | null> {
        const connected: User | undefined = await this.usersService.getConnectedId(token);
        const exists: Brand | undefined = await this.brandsRepository.createQueryBuilder("brands")
            .where("brands.name = :name", {name: data.name}).getOne();
        if(data?.id) {
            return this.update(data?.id, data, connected);
        } else {
            if(!exists) {
                return this.create(data, connected);
            } else {
                throw new Error("This brand already exists!");
            }
        }
    }

}
