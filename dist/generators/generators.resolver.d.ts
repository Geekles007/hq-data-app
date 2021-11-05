import { CreateGeneratorInput } from "./dto/create-generator.input";
import { GeneratorsService } from "./generators.service";
import { Generator } from "./generator.entity";
import { PaginateGeneratorResult } from "./dto/PaginateGeneratorResult";
export declare class GeneratorsResolver {
    private generatorsService;
    constructor(generatorsService: GeneratorsService);
    findAllGenerator(first: number, after: number): Promise<PaginateGeneratorResult>;
    findGeneratorById(id: string): Promise<Generator>;
    createOrEditGenerator(createGeneratorInput: CreateGeneratorInput, token: string): Promise<Generator | null>;
    deleteGenerators(generatorIds: Array<string>): Promise<boolean | null>;
}
