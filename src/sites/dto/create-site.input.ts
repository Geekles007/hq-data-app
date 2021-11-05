import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CreateSiteInput {
    @Field({nullable: true})
    id?: string;

    @Field()
    name: string = "";

    @Field()
    reference: string = "";

    @Field({nullable: true})
    regionId?: string;
}