import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {Field, ObjectType} from "@nestjs/graphql";
import {BaseEntity} from "../entities/base.entity";
import {User} from "../users/user.entity";
import {Region} from "../regions/region.entity";
import {Place} from "../places/place.entity";
import {Generator} from "../generators/generator.entity";
import {Group} from "../groups/group.entity";
import {Borehole} from "../boreholes/borehole.entity";

@Entity("sites")
@ObjectType()
export class Site extends BaseEntity {

    @Column({type: "text", name: "name"})
    @Field({nullable: false})
    name: string = "";

    @Column({type: "text", name: "reference"})
    @Field({nullable: false})
    reference: string = "";

    @ManyToOne(() => User, (user: User) => user.createdSites, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "created_by"})
    @Field(type => User)
    createdBy?: User;

    @ManyToOne(() => User, (user: User) => user.updatedSites, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "updated_by"})
    @Field(type => User)
    updatedBy?: User;

    @ManyToOne(() => Region, (region: Region) => region.sites, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "regionId"})
    @Field(type => Region)
    region?: Region;

    @OneToMany(() => Place, (place: Place) => place.site)
    places!: Place[];

    @OneToMany(() => Generator, (generator: Generator) => generator.site)
    generators!: Generator[];

    @OneToMany(() => Group, (group: Group) => group.site)
    groups!: Group[];

    @OneToMany(() => Borehole, (borehole: Borehole) => borehole.site)
    boreholes!: Borehole[];

}
