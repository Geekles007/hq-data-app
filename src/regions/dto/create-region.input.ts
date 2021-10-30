import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CreateRegionInput {
    @Field({nullable: true})
    id?: string;

    @Field()
    name: string = "";
}