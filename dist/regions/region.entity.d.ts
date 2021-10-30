import { User } from "../users/user.entity";
import { BaseEntity } from "../entities/base.entity";
import { Atelier } from "../ateliers/atelier.entity";
import { Site } from "../sites/site.entity";
export declare class Region extends BaseEntity {
    name: string;
    createdBy?: User;
    updatedBy?: User;
    ateliers: Atelier[];
    sites: Site[];
}
