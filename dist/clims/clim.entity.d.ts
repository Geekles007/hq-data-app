import { User } from "../users/user.entity";
import { BaseEntity } from "../entities/base.entity";
import { Place } from "../places/place.entity";
import { Brand } from "../brands/brand.entity";
import { Atelier } from "../ateliers/atelier.entity";
export declare enum Etat {
    o = "o",
    n = "n"
}
export declare class Clim extends BaseEntity {
    reference: string;
    state: Etat;
    power?: number;
    createdBy?: User;
    updatedBy?: User;
    place?: Place;
    atelier?: Atelier;
    brand?: Brand;
}
