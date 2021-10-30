import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {AteliersService} from "../ateliers/ateliers.service";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Atelier} from "../ateliers/atelier.entity";
import {CreateAtelierInput} from "../ateliers/dto/create-atelier.input";
import {TokenReq} from "../decorators/token.decorator";

@Resolver()
export class AteliersResolver {
    constructor(private ateliersService: AteliersService) {
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => [Atelier])
    findAllAtelier(@Args('first') first: number, @Args('after') after: number): Promise<Atelier[]> {
        return this.ateliersService.findAll(first, after);
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => Atelier)
    findAtelierById(@Args("id") id: string): Promise<Atelier> {
        return this.ateliersService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Atelier)
    createOrEditAtelier(@Args('createAtelierInput') createAtelierInput: CreateAtelierInput, @TokenReq() token: string): Promise<Atelier | null> {
        return this.ateliersService.createOrEdit(createAtelierInput, token);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Boolean)
    deleteAteliers(@Args({name: "atelierIds", type: () => [ID]}) atelierIds: Array<string>): Promise<boolean | null> {
        return this.ateliersService.delete(atelierIds);
    }
}
