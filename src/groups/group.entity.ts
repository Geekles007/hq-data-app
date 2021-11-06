import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {Field, ObjectType} from "@nestjs/graphql";
import {BaseEntity} from "../entities/base.entity";
import {User} from "../users/user.entity";
import {Site} from "../sites/site.entity";

@Entity("groups")
@ObjectType()
export class Group extends BaseEntity {

    @Column({type: "text", name: "name"})
    @Field({nullable: false})
    name: string = "";

    @ManyToOne(() => User, (user: User) => user.createdGroups, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "created_by"})
    @Field(type => User)
    createdBy?: User;

    @ManyToOne(() => User, (user: User) => user.updatedGroups, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "updated_by"})
    @Field(type => User)
    updatedBy?: User;

    @ManyToOne(() => Site, (site: Site) => site.groups, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "siteId"})
    @Field(type => Site, {nullable: true})
    site?: Site;

}