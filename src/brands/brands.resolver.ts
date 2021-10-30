import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {TokenReq} from "../decorators/token.decorator";
import {Brand} from "./brand.entity";
import {BrandsService} from "./brands.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UseGuards} from "@nestjs/common";
import {CreateBrandInput} from "./dto/create-brand.input";

@Resolver()
export class BrandsResolver {
    constructor(private brandsService: BrandsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => [Brand])
    findAllBrand(@Args('first') first: number, @Args('after') after: number): Promise<Brand[]> {
        return this.brandsService.findAll(first, after);
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => Brand)
    findBrandById(@Args("id") id: string): Promise<Brand> {
        return this.brandsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Brand)
    createOrEditBrand(@Args('createBrandInput') createBrandInput: CreateBrandInput, @TokenReq() token: string): Promise<Brand | null> {
        return this.brandsService.createOrEdit(createBrandInput, token);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Boolean)
    deleteBrands(@Args({name: "brandIds", type: () => [ID]}) brandIds: Array<string>): Promise<boolean | null> {
        return this.brandsService.delete(brandIds);
    }
}
