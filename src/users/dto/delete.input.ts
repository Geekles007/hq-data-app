import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class DeleteInput {
    @Field()
    id?: string;
}