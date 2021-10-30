import { BaseEntity } from "../entities/base.entity";
import { User } from "../users/user.entity";
import { Clim } from "../clims/clim.entity";
import { Generator } from "../generators/generator.entity";
export declare class Brand extends BaseEntity {
    name: string;
    createdBy?: User;
    updatedBy?: User;
    clims: Clim[];
    generators: Generator[];
}
