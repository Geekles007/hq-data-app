import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CreateGroupInput {
    @Field({nullable: true})
    id?: string;

    @Field()
    name: string = "";

    @Field({nullable: true})
    siteId?: string;
}