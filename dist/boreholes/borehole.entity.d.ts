import { User } from "../users/user.entity";
import { BaseEntity } from "../entities/base.entity";
import { Site } from "../sites/site.entity";
export declare class Borehole extends BaseEntity {
    reference: string;
    location: string;
    doneBy: string;
    pompe: string;
    observation: string;
    date?: string;
    depth?: number;
    debitCube?: number;
    cost?: number;
    debitCubeH?: number;
    createdBy?: User;
    updatedBy?: User;
    site?: Site;
}
