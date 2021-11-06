import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
    @Field({nullable: true})
    id?: string;

    @Field({nullable: true})
    firstname?: string;

    @Field({nullable: true})
    lastname?: string;

    @Field({nullable: true})
    email?: string;

    @Field({nullable: true})
    username?: string;

    @Field({nullable: true})
    password: string = "";

    @Field({nullable: true})
    blocked?: boolean;
}