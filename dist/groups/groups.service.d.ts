import { BaseService } from "../interfaces/IService";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.entity";
import { SitesService } from "../sites/sites.service";
import { CreateGroupInput } from "./dto/create-group.input";
import { Group } from "./group.entity";
export declare class GroupsService implements BaseService<Group, CreateGroupInput> {
    private groupsRepository;
    private usersService;
    private sitesService;
    constructor(groupsRepository: Repository<Group>, usersService: UsersService, sitesService: SitesService);
    create(data: CreateGroupInput, connected?: User): Promise<Group>;
    delete(ids: Array<string>): Promise<boolean | null>;
    findAll(first: number, after?: number): Promise<Group[]>;
    findOne(id: string): Promise<Group>;
    update(id: string, data: CreateGroupInput, connected?: User): Promise<Group | null>;
    createOrEdit(data: CreateGroupInput, token: string): Promise<Group | null>;
}
