import { BaseEntity } from "../entities/base.entity";
import { Region } from "../regions/region.entity";
import { Atelier } from "../ateliers/atelier.entity";
import { Brand } from "../brands/brand.entity";
import { Site } from "../sites/site.entity";
import { Place } from "../places/place.entity";
import { Clim } from "../clims/clim.entity";
import { Generator } from "../generators/generator.entity";
import { Group } from "../groups/group.entity";
import { Borehole } from "../boreholes/borehole.entity";
export declare class User extends BaseEntity {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    createdRegions: Region[];
    updatedRegions: Region[];
    createdAteliers: Atelier[];
    updatedAteliers: Atelier[];
    createdBrands: Brand[];
    updatedBrands: Brand[];
    createdSites: Site[];
    updatedSites: Site[];
    createdPlaces: Place[];
    updatedPlaces: Place[];
    createdClims: Clim[];
    updatedClims: Clim[];
    createdGenerators: Generator[];
    updatedGenerators: Generator[];
    createdGroups: Group[];
    updatedGroups: Group[];
    createdBoreholes: Borehole[];
    updatedBoreholes: Borehole[];
    token: string;
}
