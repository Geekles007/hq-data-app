import {Entity, Generated, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class Connected {
    @Field(Type => String)
    access_token: string = "";
}