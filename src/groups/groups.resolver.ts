import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {GroupsService} from "../groups/groups.service";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Group} from "../groups/group.entity";
import {CreateGroupInput} from "../groups/dto/create-group.input";
import {TokenReq} from "../decorators/token.decorator";
import {PaginateGroupResult} from "./dto/PaginateGroupResult";

@Resolver()
export class GroupsResolver {
    constructor(private groupsService: GroupsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => PaginateGroupResult)
    findAllGroup(@Args('first') first: number, @Args('after') after: number): Promise<PaginateGroupResult> {
        return this.groupsService.findAll(first, after);
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => Group)
    findGroupById(@Args("id") id: string): Promise<Group> {
        return this.groupsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Group)
    createOrEditGroup(@Args('input') createGroupInput: CreateGroupInput, @TokenReq() token: string): Promise<Group | null> {
        return this.groupsService.createOrEdit(createGroupInput, token);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Boolean)
    deleteGroups(@Args({name: "ids", type: () => [ID]}) groupIds: Array<string>): Promise<boolean | null> {
        return this.groupsService.delete(groupIds);
    }
}
