import { PlacesService } from "../places/places.service";
import { Place } from "../places/place.entity";
import { CreatePlaceInput } from "../places/dto/create-place.input";
import { PaginatePlaceResult } from "./dto/PaginatePlaceResult";
export declare class PlacesResolver {
    private placesService;
    constructor(placesService: PlacesService);
    findAllPlace(first: number, after: number): Promise<PaginatePlaceResult>;
    findPlaceById(id: string): Promise<Place>;
    createOrEditPlace(createPlaceInput: CreatePlaceInput, token: string): Promise<Place | null>;
    deletePlaces(placeIds: Array<string>): Promise<boolean | null>;
}
