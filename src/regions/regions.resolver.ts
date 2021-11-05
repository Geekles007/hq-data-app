import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {RegionsService} from "./regions.service";
import {CreateRegionInput} from "./dto/create-region.input";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UseGuards} from "@nestjs/common";
import {Region} from "./region.entity";
import {TokenReq} from "../decorators/token.decorator";
import {PaginateResult} from "./dto/PaginateResult";

@Resolver()
export class RegionsResolver {
    constructor(private regionsService: RegionsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => PaginateResult)
    findAllRegion(@Args('first') first: number, @Args('after') after?: number): Promise<PaginateResult> {
        return this.regionsService.findAll(first, after);
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => Region)
    findRegionById(@Args("id") id: string): Promise<Region> {
        return this.regionsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Region)
    createOrEditRegion(@Args('input') createRegionInput: CreateRegionInput, @TokenReq() token: string): Promise<Region | null> {
        return this.regionsService.createOrEdit(createRegionInput, token);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Boolean)
    deleteRegions(@Args({name: "ids", type: () => [ID]}) regionIds: Array<string>): Promise<boolean | null> {
        return this.regionsService.delete(regionIds);
    }
}
