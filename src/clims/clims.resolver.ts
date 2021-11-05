import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ClimsService} from "./clims.service";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Clim} from "./clim.entity";
import {CreateClimInput} from "./dto/create-clim.input";
import {TokenReq} from "../decorators/token.decorator";
import {PaginateClimResult} from "./dto/PaginateClimResult";

@Resolver()
export class ClimsResolver {
    constructor(private climsService: ClimsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => PaginateClimResult)
    findAllClim(@Args('first') first: number, @Args('after') after: number): Promise<PaginateClimResult> {
        return this.climsService.findAll(first, after);
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => Clim)
    findClimById(@Args("id") id: string): Promise<Clim> {
        return this.climsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Clim)
    createOrEditClim(@Args('input') createClimInput: CreateClimInput, @TokenReq() token: string): Promise<Clim | null> {
        return this.climsService.createOrEdit(createClimInput, token);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Boolean)
    deleteClims(@Args({name: "ids", type: () => [ID]}) climIds: Array<string>): Promise<boolean | null> {
        return this.climsService.delete(climIds);
    }
}
