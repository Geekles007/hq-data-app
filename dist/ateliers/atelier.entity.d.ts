import { User } from "../users/user.entity";
import { BaseEntity } from "../entities/base.entity";
import { Region } from "../regions/region.entity";
import { Clim } from "../clims/clim.entity";
export declare class Atelier extends BaseEntity {
    name: string;
    reference: string;
    createdBy?: User;
    updatedBy?: User;
    region?: Region;
    clims: Clim[];
}
