import {Field, ID, ObjectType} from "@nestjs/graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {DateTime} from "luxon";
import {BaseEntity} from "../entities/base.entity";
import {Region} from "../regions/region.entity";
import {Atelier} from "../ateliers/atelier.entity";
import {Brand} from "../brands/brand.entity";
import {Site} from "../sites/site.entity";
import {Place} from "../places/place.entity";
import {Clim} from "../clims/clim.entity";
import {Generator} from "../generators/generator.entity";

@Entity("users")
@ObjectType()
export class User extends BaseEntity{

    @Column({type: "text", name: "firstname"})
    @Field({nullable: false})
    firstname: string = "";

    @Column({type: "text", name: "lastname"})
    @Field({nullable: false})
    lastname: string = "";

    @Column({type: "text"})
    @Field({nullable: false})
    email: string = "";

    @Column({type: "text"})
    @Field({nullable: false})
    username: string = "";

    @Column({type: "text"})
    @Field({nullable: false})
    password: string = "";

    @OneToMany(() => Region, (region: Region) => region.createdBy)
    createdRegions!: Region[];

    @OneToMany(() => Region, (region: Region) => region.createdBy)
    updatedRegions!: Region[];

    @OneToMany(() => Atelier, (atelier: Atelier) => atelier.createdBy)
    createdAteliers!: Atelier[];

    @OneToMany(() => Atelier, (atelier: Atelier) => atelier.createdBy)
    updatedAteliers!: Atelier[];

    @OneToMany(() => Brand, (brand: Brand) => brand.createdBy)
    createdBrands!: Brand[];

    @OneToMany(() => Brand, (brand: Brand) => brand.createdBy)
    updatedBrands!: Brand[];

    @OneToMany(() => Site, (site: Site) => site.createdBy)
    createdSites!: Site[];

    @OneToMany(() => Site, (site: Site) => site.createdBy)
    updatedSites!: Site[];

    @OneToMany(() => Place, (place: Place) => place.createdBy)
    createdPlaces!: Place[];

    @OneToMany(() => Place, (place: Place) => place.createdBy)
    updatedPlaces!: Place[];

    @OneToMany(() => Clim, (clim: Clim) => clim.createdBy)
    createdClims!: Clim[];

    @OneToMany(() => Clim, (clim: Clim) => clim.createdBy)
    updatedClims!: Clim[];

    @OneToMany(() => Generator, (generator: Generator) => generator.createdBy)
    createdGenerators!: Generator[];

    @OneToMany(() => Generator, (generator: Generator) => generator.createdBy)
    updatedGenerators!: Generator[];

    @Column({type: "text"})
    @Field({nullable: true})
    token: string = "";

}