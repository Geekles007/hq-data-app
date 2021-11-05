import {Field, ObjectType} from "@nestjs/graphql";
import {Atelier} from "../atelier.entity";

@ObjectType()
export class PaginateAtelierResult {

    @Field(type => [Atelier], {nullable: false})
    data: Atelier[] = [];

    @Field({nullable: false})
    count: number = 0;

}