import {User} from "../users/user.entity";
import {Field, ID, Int, ObjectType, registerEnumType} from "@nestjs/graphql";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne} from "typeorm";
import {BaseEntity} from "../entities/base.entity";
import {Atelier} from "../ateliers/atelier.entity";
import {Site} from "../sites/site.entity";

@Entity("regions")
@ObjectType()
export class Region extends BaseEntity {

    @Column({type: "text", name: "name"})
    @Field({nullable: false})
    name: string = "";

    @ManyToOne(() => User, (user: User) => user.createdRegions, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "created_by"})
    @Field(type => User)
    createdBy?: User;

    @ManyToOne(() => User, (user: User) => user.updatedRegions, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "updated_by"})
    @Field(type => User)
    updatedBy?: User;

    @OneToMany(() => Atelier, (atelier: Atelier) => atelier.region)
    ateliers!: Atelier[];

    @OneToMany(() => Site, (site: Site) => site.region)
    sites!: Site[];

}
