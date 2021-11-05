import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {BoreholesService} from "./boreholes.service";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Borehole} from "./borehole.entity";
import {CreateBoreholeInput} from "./dto/create-borehole.input";
import {TokenReq} from "../decorators/token.decorator";
import {PaginateBoreholeResult} from "./dto/PaginateBoreholeResult";

@Resolver()
export class BoreholesResolver {
    constructor(private boreholesService: BoreholesService) {
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => PaginateBoreholeResult)
    findAllBorehole(@Args('first') first: number, @Args('after') after: number): Promise<PaginateBoreholeResult> {
        return this.boreholesService.findAll(first, after);
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => Borehole)
    findBoreholeById(@Args("id") id: string): Promise<Borehole> {
        return this.boreholesService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Borehole)
    createOrEditBorehole(@Args('input') createBoreholeInput: CreateBoreholeInput, @TokenReq() token: string): Promise<Borehole | null> {
        return this.boreholesService.createOrEdit(createBoreholeInput, token);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Boolean)
    deleteBoreholes(@Args({name: "ids", type: () => [ID]}) boreholeIds: Array<string>): Promise<boolean | null> {
        return this.boreholesService.delete(boreholeIds);
    }
}
