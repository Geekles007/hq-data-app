import {User} from "../users/user.entity";
import {Field, ID, Int, ObjectType, registerEnumType} from "@nestjs/graphql";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne} from "typeorm";
import {BaseEntity} from "../entities/base.entity";
import {Site} from "../sites/site.entity";
import {Atelier} from "../ateliers/atelier.entity";
import {Clim} from "../clims/clim.entity";

@Entity("places")
@ObjectType()
export class Place extends BaseEntity {

    @Column({type: "text", name: "name"})
    @Field({nullable: false})
    name: string = "";

    @ManyToOne(() => User, (user: User) => user.createdPlaces, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "created_by"})
    @Field(type => User)
    createdBy?: User;

    @ManyToOne(() => User, (user: User) => user.updatedPlaces, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "updated_by"})
    @Field(type => User)
    updatedBy?: User;

    @ManyToOne(() => Site, (site: Site) => site.places, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "siteId"})
    @Field(type => Site)
    site?: Site;

    @OneToMany(() => Clim, (clim: Clim) => clim.place)
    clims!: Clim[];

}
