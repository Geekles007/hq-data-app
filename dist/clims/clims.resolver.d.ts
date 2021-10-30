import { ClimsService } from "./clims.service";
import { Clim } from "./clim.entity";
import { CreateClimInput } from "./dto/create-clim.input";
export declare class ClimsResolver {
    private climsService;
    constructor(climsService: ClimsService);
    findAllClim(first: number, after: number): Promise<Clim[]>;
    findClimById(id: string): Promise<Clim>;
    createOrEditClim(createClimInput: CreateClimInput, token: string): Promise<Clim | null>;
    deleteClims(climIds: Array<string>): Promise<boolean | null>;
}
