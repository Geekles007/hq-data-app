import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {RegionsService} from "./regions.service";
import {CreateRegionInput} from "./dto/create-region.input";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UseGuards} from "@nestjs/common";
import {Region} from "./region.entity";
import {TokenReq} from "../decorators/token.decorator";

@Resolver()
export class RegionsResolver {
    constructor(private regionsService: RegionsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => [Region])
    findAllRegion(@Args('first') first: number, @Args('after') after: number): Promise<Region[]> {
        return this.regionsService.findAll(first, after);
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => Region)
    findRegionById(@Args("id") id: string): Promise<Region> {
        return this.regionsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Region)
    createOrEditRegion(@Args('createRegionInput') createRegionInput: CreateRegionInput, @TokenReq() token: string): Promise<Region | null> {
        return this.regionsService.createOrEdit(createRegionInput, token);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Boolean)
    deleteRegions(@Args({name: "regionIds", type: () => [ID]}) regionIds: Array<string>): Promise<boolean | null> {
        return this.regionsService.delete(regionIds);
    }
}
