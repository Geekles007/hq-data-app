import {Field, ObjectType} from "@nestjs/graphql";
import {Place} from "../place.entity";

@ObjectType()
export class PaginatePlaceResult {

    @Field(type => [Place], {nullable: false})
    data: Place[] = [];

    @Field({nullable: false})
    count: number = 0;

}