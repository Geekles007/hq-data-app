import { Etat } from "../clim.entity";
export declare class CreateClimInput {
    id?: string;
    etat: Etat;
    reference: string;
    power?: number;
    placeId?: string;
    atelierId?: string;
    brandId?: string;
}
