import {User} from "../users/user.entity";
import {Field, ID, Int, ObjectType, registerEnumType} from "@nestjs/graphql";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne} from "typeorm";
import {BaseEntity} from "../entities/base.entity";
import {Region} from "../regions/region.entity";
import {Clim} from "../clims/clim.entity";

@Entity("ateliers")
@ObjectType()
export class Atelier extends BaseEntity {

    @Column({type: "text", name: "name"})
    @Field({nullable: false})
    name: string = "";

    @Column({type: "text", name: "reference"})
    @Field({nullable: false})
    reference: string = "";

    @ManyToOne(() => User, (user: User) => user.createdAteliers, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "created_by"})
    @Field(type => User)
    createdBy?: User;

    @ManyToOne(() => User, (user: User) => user.updatedAteliers, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "updated_by"})
    @Field(type => User)
    updatedBy?: User;

    @ManyToOne(() => Region, (region: Region) => region.ateliers, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "regionId"})
    @Field(type => Region)
    region?: Region;

    @OneToMany(() => Clim, (clim: Clim) => clim.atelier)
    clims!: Clim[];

}
