import {User} from "../users/user.entity";
import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class Region {
    @Field(type => ID)
    id: string = "";

    @Field({nullable: false})
    name: string = "";

    @Field({nullable: true})
    created_at?: string;

    @Field({nullable: true})
    updated_at?: string;

    @Field(type => User)
    created_by?: User;

    @Field(type => User)
    updated_by?: User;
}