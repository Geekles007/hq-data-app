import {Field, ObjectType} from "@nestjs/graphql";
import {Generator} from "../generator.entity";

@ObjectType()
export class PaginateGeneratorResult {

    @Field(type => [Generator], {nullable: false})
    data: Generator[] = [];

    @Field({nullable: false})
    count: number = 0;

}