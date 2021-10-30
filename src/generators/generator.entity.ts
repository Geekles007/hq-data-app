import {User} from "../users/user.entity";
import {Field, ID, Int, ObjectType, registerEnumType} from "@nestjs/graphql";
import {Column, Entity, JoinColumn, ManyToOne, OneToOne} from "typeorm";
import {BaseEntity} from "../entities/base.entity";
import {Brand} from "../brands/brand.entity";
import {Site} from "../sites/site.entity";

export enum State {
    f = "F",
    p = "P"
}

registerEnumType(State, {
    name: "State"
})

@Entity("generators")
@ObjectType()
export class Generator extends BaseEntity {

    @Column({type: "text", name: "reference"})
    @Field({nullable: false})
    reference: string = "";

    @Column({type: "text", name: "num_series"})
    @Field({nullable: false})
    numSeries: string = "";

    @Column({type: "text", name: "observation"})
    @Field({nullable: true})
    observation?: string;

    @Column({type: "enum", enum: State, name: "state"})
    @Field(type => State, {nullable: true})
    state: State = State.f;

    @Column({type: "decimal", name: "power"})
    @Field({nullable: true})
    power?: number;

    @ManyToOne(() => User, (user: User) => user.createdGenerators, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "created_by"})
    @Field(type => User)
    createdBy?: User;

    @ManyToOne(() => User, (user: User) => user.updatedGenerators, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "updated_by"})
    @Field(type => User)
    updatedBy?: User;

    @ManyToOne(() => Site, (site: Site) => site.generators, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "siteId"})
    @Field(type => Site, {nullable: true})
    site?: Site;

    @ManyToOne(() => Brand, (brand: Brand) => brand.generators, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "brandId"})
    @Field(type => Brand, {nullable: true})
    brand?: Brand;

}
