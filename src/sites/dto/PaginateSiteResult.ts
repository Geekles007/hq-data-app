import {Field, ObjectType} from "@nestjs/graphql";
import {Site} from "../site.entity";

@ObjectType()
export class PaginateSiteResult {

    @Field(type => [Site], {nullable: false})
    data: Site[] = [];

    @Field({nullable: false})
    count: number = 0;

}