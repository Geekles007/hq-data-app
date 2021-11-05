import {Field, ObjectType} from "@nestjs/graphql";
import {Clim} from "../clim.entity";

@ObjectType()
export class PaginateClimResult {

    @Field(type => [Clim], {nullable: false})
    data: Clim[] = [];

    @Field({nullable: false})
    count: number = 0;

}