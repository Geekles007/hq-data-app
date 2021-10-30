import { GroupsService } from "../groups/groups.service";
import { Group } from "../groups/group.entity";
import { CreateGroupInput } from "../groups/dto/create-group.input";
export declare class GroupsResolver {
    private groupsService;
    constructor(groupsService: GroupsService);
    findAllGroup(first: number, after: number): Promise<Group[]>;
    findGroupById(id: string): Promise<Group>;
    createOrEditGroup(createGroupInput: CreateGroupInput, token: string): Promise<Group | null>;
    deleteGroups(groupIds: Array<string>): Promise<boolean | null>;
}
