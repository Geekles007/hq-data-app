import { User } from "../users/user.entity";
import { BaseEntity } from "../entities/base.entity";
import { Site } from "../sites/site.entity";
import { Clim } from "../clims/clim.entity";
export declare class Place extends BaseEntity {
    name: string;
    createdBy?: User;
    updatedBy?: User;
    site?: Site;
    clims: Clim[];
}
