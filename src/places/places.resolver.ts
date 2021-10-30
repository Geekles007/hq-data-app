import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {PlacesService} from "../places/places.service";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Place} from "../places/place.entity";
import {CreatePlaceInput} from "../places/dto/create-place.input";
import {TokenReq} from "../decorators/token.decorator";

@Resolver()
export class PlacesResolver {
    constructor(private placesService: PlacesService) {
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => [Place])
    findAllPlace(@Args('first') first: number, @Args('after') after: number): Promise<Place[]> {
        return this.placesService.findAll(first, after);
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => Place)
    findPlaceById(@Args("id") id: string): Promise<Place> {
        return this.placesService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Place)
    createOrEditPlace(@Args('createPlaceInput') createPlaceInput: CreatePlaceInput, @TokenReq() token: string): Promise<Place | null> {
        return this.placesService.createOrEdit(createPlaceInput, token);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Boolean)
    deletePlaces(@Args({name: "placeIds", type: () => [ID]}) placeIds: Array<string>): Promise<boolean | null> {
        return this.placesService.delete(placeIds);
    }
}
