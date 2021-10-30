import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {Field, ObjectType} from "@nestjs/graphql";
import {BaseEntity} from "../entities/base.entity";
import {User} from "../users/user.entity";
import {Clim} from "../clims/clim.entity";
import {Generator} from "../generators/generator.entity";

@Entity("brands")
@ObjectType()
export class Brand extends BaseEntity {

    @Column({type: "text", name: "name"})
    @Field({nullable: false})
    name: string = "";

    @ManyToOne(() => User, (user: User) => user.createdBrands, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "created_by"})
    @Field(type => User)
    createdBy?: User;

    @ManyToOne(() => User, (user: User) => user.updatedBrands, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "updated_by"})
    @Field(type => User)
    updatedBy?: User;

    @OneToMany(() => Clim, (clim: Clim) => clim.brand)
    clims!: Clim[];

    @OneToMany(() => Generator, (generator: Generator) => generator.brand)
    generators!: Generator[];

}