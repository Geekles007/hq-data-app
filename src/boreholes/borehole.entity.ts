import {User} from "../users/user.entity";
import {Field, ObjectType} from "@nestjs/graphql";
import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseEntity} from "../entities/base.entity";
import {Site} from "../sites/site.entity";
import {DateTime} from "luxon";

@Entity("boreholes")
@ObjectType()
export class Borehole extends BaseEntity {

    @Column({type: "text", name: "reference"})
    @Field({nullable: false})
    reference: string = "";

    @Column({type: "text", name: "location"})
    @Field({nullable: true, defaultValue: ""})
    location: string = "";

    @Column({type: "text", default: "", name: "done_by"})
    @Field({nullable: true, defaultValue: ""})
    doneBy: string = "";

    @Column({type: "text", default: "", name: "pompe"})
    @Field({nullable: true, defaultValue: ""})
    pompe: string = "";

    @Column({type: "text", default: "", name: "observation"})
    @Field({nullable: true, defaultValue: ""})
    observation: string = "";

    @Column({nullable: true, default: DateTime.now().toString(), type: "date"})
    @Field({nullable: true})
    date?: string;

    @Column({type: "decimal", default: 0, name: "depth"})
    @Field({nullable: true, defaultValue: 0})
    depth?: number;

    @Column({type: "decimal", default: 0, name: "debit_cube"})
    @Field({nullable: true, defaultValue: 0})
    debitCube?: number;

    @Column({type: "decimal", default: 0, name: "cost"})
    @Field({nullable: true, defaultValue: 0})
    cost?: number;

    @Column({type: "decimal", default: 0, name: "depth_cube_h"})
    @Field({nullable: true, defaultValue: 0})
    debitCubeH?: number;

    @ManyToOne(() => {
        return User;
    }, (user: User) => user.createdBoreholes, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "created_by"})
    @Field(type => User)
    createdBy?: User;

    @ManyToOne(() => User, (user: User) => user.updatedBoreholes, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "updated_by"})
    @Field(type => User)
    updatedBy?: User;

    @ManyToOne(() => Site, (site: Site) => site.boreholes, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "siteId"})
    @Field(type => Site, {nullable: true})
    site?: Site;


}
