import {User} from "../users/user.entity";
import {Field, ID, Int, ObjectType, registerEnumType} from "@nestjs/graphql";
import {Column, Entity, JoinColumn, ManyToOne, OneToOne} from "typeorm";
import {BaseEntity} from "../entities/base.entity";
import {Place} from "../places/place.entity";
import {Brand} from "../brands/brand.entity";
import {Atelier} from "../ateliers/atelier.entity";

export enum Etat {
    o = "o",
    n = "n"
}

registerEnumType(Etat, {
    name: "Etat"
})

@Entity("clims")
@ObjectType()
export class Clim extends BaseEntity {

    @Column({type: "text", name: "reference"})
    @Field({nullable: false})
    reference: string = "";

    @Column({type: "enum", enum: Etat, name: "state"})
    @Field(type => Etat, {nullable: false})
    state: Etat = Etat.o;

    @Column({type: "decimal", name: "power"})
    @Field({nullable: false})
    power?: number;

    @ManyToOne(() => User, (user: User) => user.createdClims, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "created_by"})
    @Field(type => User)
    createdBy?: User;

    @ManyToOne(() => User, (user: User) => user.updatedClims, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "updated_by"})
    @Field(type => User)
    updatedBy?: User;

    @ManyToOne(() => Place, (place: Place) => place.clims, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "placeId"})
    @Field(type => Place, {nullable: true})
    place?: Place;

    @ManyToOne(() => Atelier, (atelier: Atelier) => atelier.clims, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "atelierId"})
    @Field(type => Atelier, {nullable: true})
    atelier?: Atelier;

    @ManyToOne(() => Brand, (brand: Brand) => brand.clims, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "brandId"})
    @Field(type => Brand, {nullable: true})
    brand?: Brand;

}
