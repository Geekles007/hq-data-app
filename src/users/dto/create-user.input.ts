import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
    @Field({nullable: true})
    id?: string;

    @Field()
    firstname: string = "";

    @Field()
    lastname: string = "";

    @Field()
    email: string = "";

    @Field()
    username: string = "";

    @Field()
    password: string = "";
}