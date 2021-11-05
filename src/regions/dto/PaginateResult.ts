import {Field, ObjectType} from "@nestjs/graphql";
import {Region} from "../region.entity";

@ObjectType()
export class PaginateResult {

    @Field(type => [Region], {nullable: false})
    data: Region[] = [];

    @Field({nullable: false})
    count: number = 0;

}