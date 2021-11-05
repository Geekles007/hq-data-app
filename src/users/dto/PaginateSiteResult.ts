import {Field, ObjectType} from "@nestjs/graphql";
import {User} from "../user.entity";

@ObjectType()
export class PaginateUserResult {

    @Field(type => [User], {nullable: false})
    data: User[] = [];

    @Field({nullable: false})
    count: number = 0;

}