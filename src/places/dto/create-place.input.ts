import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CreatePlaceInput {
    @Field({nullable: true})
    id?: string;

    @Field()
    name: string = "";

    @Field()
    siteId?: string;
}