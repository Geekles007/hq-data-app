import { AteliersService } from "../ateliers/ateliers.service";
import { Atelier } from "../ateliers/atelier.entity";
import { CreateAtelierInput } from "../ateliers/dto/create-atelier.input";
export declare class AteliersResolver {
    private ateliersService;
    constructor(ateliersService: AteliersService);
    findAllAtelier(first: number, after: number): Promise<Atelier[]>;
    findAtelierById(id: string): Promise<Atelier>;
    createOrEditAtelier(createAtelierInput: CreateAtelierInput, token: string): Promise<Atelier | null>;
    deleteAteliers(atelierIds: Array<string>): Promise<boolean | null>;
}
