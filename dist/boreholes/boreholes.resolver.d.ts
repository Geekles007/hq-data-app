import { BoreholesService } from "./boreholes.service";
import { Borehole } from "./borehole.entity";
import { CreateBoreholeInput } from "./dto/create-borehole.input";
import { PaginateBoreholeResult } from "./dto/PaginateBoreholeResult";
export declare class BoreholesResolver {
    private boreholesService;
    constructor(boreholesService: BoreholesService);
    findAllBorehole(first: number, after: number): Promise<PaginateBoreholeResult>;
    findBoreholeById(id: string): Promise<Borehole>;
    createOrEditBorehole(createBoreholeInput: CreateBoreholeInput, token: string): Promise<Borehole | null>;
    deleteBoreholes(boreholeIds: Array<string>): Promise<boolean | null>;
}
