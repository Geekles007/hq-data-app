import {Field, ObjectType} from "@nestjs/graphql";
import {Brand} from "../brand.entity";

@ObjectType()
export class PaginateBrandResult {

    @Field(type => [Brand], {nullable: false})
    data: Brand[] = [];

    @Field({nullable: false})
    count: number = 0;

}