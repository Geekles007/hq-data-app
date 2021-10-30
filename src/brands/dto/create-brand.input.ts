import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CreateBrandInput {
    @Field({nullable: true})
    id?: string;

    @Field()
    name: string = "";
}