import { Injectable } from '@nestjs/common';
import {BaseService} from "../interfaces/IService";
import {v4 as uuidv4} from "uuid";
import {DateTime} from "luxon";
import {Site} from "../sites/site.entity";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {SitesService} from "../sites/sites.service";
import {CreateGroupInput} from "./dto/create-group.input";
import {Group} from "./group.entity";
import {PaginateGroupResult} from "./dto/PaginateGroupResult";

@Injectable()
export class GroupsService implements BaseService<Group, CreateGroupInput> {

    constructor(
        @InjectRepository(Group) private groupsRepository: Repository<Group>,
        private usersService: UsersService,
        private sitesService: SitesService
    ) {
    }

    async create(data: CreateGroupInput, connected?: User): Promise<Group> {
        const site: Site | undefined = data?.siteId ? await this.sitesService.findOne(data?.siteId) : undefined;
        try {
            const newGroup = await this.groupsRepository.create({
                id: uuidv4(),
                ...data,
                site: site,
                createdBy: connected,
                updatedBy: connected
            });
            return this.groupsRepository.save(newGroup);
        } catch (error: any) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }

    async delete(ids: Array<string>): Promise<boolean | null> {
        const dataToRemove = await this.groupsRepository.createQueryBuilder("groups")
            .where("groups.id IN (:...ids)", {
                ids: ids
            }).getMany() ?? [];
        try {
            if (dataToRemove.length > 0) {
                const deleted = await this.groupsRepository.remove(dataToRemove);
                return true;
            }
        } catch (e: any) {
            throw new Error("We can't delete those users.")
        }
        return null;
    }

    async findAll(first: number, after?: number): Promise<PaginateGroupResult> {
        const [result, total] = await this.groupsRepository.findAndCount({
            take: first,
            skip: after,
            relations: ["site", "createdBy", "updatedBy"]
        });
        try {
            return {
                data: result,
                count: total
            };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async findOne(id: string): Promise<Group> {
        return await this.groupsRepository.findOneOrFail(id, {
            relations: ["site", "createdBy", "updatedBy"]
        }) ?? null;
    }

    async update(id: string, data: CreateGroupInput, connected?: User): Promise<Group | null> {
        const site: Site | undefined = data?.siteId ? await this.sitesService.findOne(data?.siteId) : undefined;
        let group = await this.groupsRepository.findOneOrFail({
            where: {id: data?.id ?? ""},
            relations: ["createdBy", "site"]
        });
        if (group) {
            group.updatedBy = connected;
            group.name = data.name && data?.name !== "" ? data?.name : group?.name;
            group.site = site;
            group.updatedAt = new Date(DateTime.now().toUTC().toISO());
            return await this.groupsRepository.save(group);
        } else {
            throw new Error("Something went wrong.");
        }
    }

    async createOrEdit(data: CreateGroupInput, token: string): Promise<Group | null> {
        const connected: User | undefined = await this.usersService.getConnectedId(token);
        const exists: Group | undefined = await this.groupsRepository.createQueryBuilder("groups")
            .where("groups.name = :name", {name: data.name}).getOne();
        if (data?.id) {
            return this.update(data?.id, data, connected);
        } else {
            if (!exists) {
                return this.create(data, connected);
            } else {
                throw new Error("This group already exists!");
            }
        }
    }
}