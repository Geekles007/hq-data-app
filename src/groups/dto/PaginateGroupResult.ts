import {Field, ObjectType} from "@nestjs/graphql";
import {Group} from "../group.entity";

@ObjectType()
export class PaginateGroupResult {

    @Field(type => [Group], {nullable: false})
    data: Group[] = [];

    @Field({nullable: false})
    count: number = 0;

}