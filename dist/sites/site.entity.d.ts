import { BaseEntity } from "../entities/base.entity";
import { User } from "../users/user.entity";
import { Region } from "../regions/region.entity";
import { Place } from "../places/place.entity";
import { Generator } from "../generators/generator.entity";
export declare class Site extends BaseEntity {
    name: string;
    reference: string;
    createdBy?: User;
    updatedBy?: User;
    region?: Region;
    places: Place[];
    generators: Generator[];
}
