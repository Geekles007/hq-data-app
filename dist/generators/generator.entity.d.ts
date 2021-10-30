import { User } from "../users/user.entity";
import { BaseEntity } from "../entities/base.entity";
import { Brand } from "../brands/brand.entity";
import { Site } from "../sites/site.entity";
export declare enum State {
    f = "F",
    p = "P"
}
export declare class Generator extends BaseEntity {
    reference: string;
    numSeries: string;
    observation?: string;
    state: State;
    power?: number;
    createdBy?: User;
    updatedBy?: User;
    site?: Site;
    brand?: Brand;
}
