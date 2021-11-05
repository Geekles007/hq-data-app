import {Field, ObjectType} from "@nestjs/graphql";
import {Borehole} from "../borehole.entity";

@ObjectType()
export class PaginateBoreholeResult {

    @Field(type => [Borehole], {nullable: false})
    data: Borehole[] = [];

    @Field({nullable: false})
    count: number = 0;

}