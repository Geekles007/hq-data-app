import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
    @Field({nullable: true})
    id?: string;

    @Field()
    firstName: string = "";

    @Field()
    lastName: string = "";

    @Field()
    email: string = "";

    @Field()
    username: string = "";

    @Field()
    password: string = "";

    @Field()
    created_at?: string = Date.now().toString();

    @Field()
    updated_at?: string = Date.now().toString();
}