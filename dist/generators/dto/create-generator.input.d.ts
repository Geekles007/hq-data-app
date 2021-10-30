import { State } from "../generator.entity";
export declare class CreateGeneratorInput {
    id?: string;
    state: State;
    reference: string;
    observation: string;
    numSeries: string;
    power?: number;
    brandId?: string;
    siteId?: string;
}
