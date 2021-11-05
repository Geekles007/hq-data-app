import { RegionsService } from "./regions.service";
import { CreateRegionInput } from "./dto/create-region.input";
import { Region } from "./region.entity";
import { PaginateResult } from "./dto/PaginateResult";
export declare class RegionsResolver {
    private regionsService;
    constructor(regionsService: RegionsService);
    findAllRegion(first: number, after?: number): Promise<PaginateResult>;
    findRegionById(id: string): Promise<Region>;
    createOrEditRegion(createRegionInput: CreateRegionInput, token: string): Promise<Region | null>;
    deleteRegions(regionIds: Array<string>): Promise<boolean | null>;
}
