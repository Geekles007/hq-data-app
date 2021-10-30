import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {TokenReq} from "../decorators/token.decorator";
import {Site} from "./site.entity";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {SitesService} from "./sites.service";
import {UseGuards} from "@nestjs/common";
import {CreateSiteInput} from "./dto/create-site.input";

@Resolver()
export class SitesResolver {
    constructor(private sitesService: SitesService) {
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => [Site])
    findAllSite(@Args('first') first: number, @Args('after') after: number): Promise<Site[]> {
        return this.sitesService.findAll(first, after);
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => Site)
    findSiteById(@Args("id") id: string): Promise<Site> {
        return this.sitesService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Site)
    createOrEditSite(@Args('createSiteInput') createSiteInput: CreateSiteInput, @TokenReq() token: string): Promise<Site | null> {
        return this.sitesService.createOrEdit(createSiteInput, token);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Boolean)
    deleteSites(@Args({name: "siteIds", type: () => [ID]}) siteIds: Array<string>): Promise<boolean | null> {
        return this.sitesService.delete(siteIds);
    }
}
