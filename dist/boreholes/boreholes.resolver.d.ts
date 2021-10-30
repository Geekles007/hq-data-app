import { BoreholesService } from "./boreholes.service";
import { Borehole } from "./borehole.entity";
import { CreateBoreholeInput } from "./dto/create-borehole.input";
export declare class BoreholesResolver {
    private boreholesService;
    constructor(boreholesService: BoreholesService);
    findAllBorehole(first: number, after: number): Promise<Borehole[]>;
    findBoreholeById(id: string): Promise<Borehole>;
    createOrEditBorehole(createBoreholeInput: CreateBoreholeInput, token: string): Promise<Borehole | null>;
    deleteBoreholes(boreholeIds: Array<string>): Promise<boolean | null>;
}
