import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class GetAllInput {
    @Field()
    first?: number = 100;

    @Field()
    after: string = "";
}