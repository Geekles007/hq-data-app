import { BaseEntity } from "../entities/base.entity";
import { User } from "../users/user.entity";
import { Site } from "../sites/site.entity";
export declare class Group extends BaseEntity {
    name: string;
    createdBy?: User;
    updatedBy?: User;
    site?: Site;
}
