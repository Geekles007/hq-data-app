import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {TokenReq} from "../decorators/token.decorator";
import {CreateGeneratorInput} from "./dto/create-generator.input";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UseGuards} from "@nestjs/common";
import {GeneratorsService} from "./generators.service";
import {Generator} from "./generator.entity";

@Resolver()
export class GeneratorsResolver {
    constructor(private generatorsService: GeneratorsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => [Generator])
    findAllGenerator(@Args('first') first: number, @Args('after') after: number): Promise<Generator[]> {
        return this.generatorsService.findAll(first, after);
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => Generator)
    findGeneratorById(@Args("id") id: string): Promise<Generator> {
        return this.generatorsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Generator)
    createOrEditGenerator(@Args('createGeneratorInput') createGeneratorInput: CreateGeneratorInput, @TokenReq() token: string): Promise<Generator | null> {
        return this.generatorsService.createOrEdit(createGeneratorInput, token);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Boolean)
    deleteGenerators(@Args({name: "generatorIds", type: () => [ID]}) generatorIds: Array<string>): Promise<boolean | null> {
        return this.generatorsService.delete(generatorIds);
    }
}
