import {Field, InputType} from "@nestjs/graphql";
import {Etat} from "../clim.entity";
import {Optional} from "@nestjs/common";

@InputType()
export class CreateClimInput {
    @Field({nullable: true})
    id?: string;

    @Field()
    etat: Etat = Etat.n;

    @Field()
    reference: string = "";

    @Field()
    power?: number = 0;

    @Field({nullable: true})
    placeId?: string;

    @Field({nullable: true})
    atelierId?: string;

    @Field({nullable: true})
    brandId?: string;
}