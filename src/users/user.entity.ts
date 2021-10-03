import {Field, ID, ObjectType} from "@nestjs/graphql";
import {Column, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";

@Entity("users")
@ObjectType()
export class User {
    @PrimaryGeneratedColumn("uuid")
    @Field()
    @Generated("uuid")
    id: string = "";

    @Column()
    @Field({nullable: false})
    firstName: string = "";

    @Column()
    @Field({nullable: false})
    lastName: string = "";

    @Column()
    @Field({nullable: false})
    email: string = "";

    @Column()
    @Field({nullable: false})
    username: string = "";

    @Column()
    @Field({nullable: false})
    password: string = "";

    @Column({nullable: true})
    @Field({nullable: true})
    created_at?: string;

    @Column({nullable: true})
    @Field({nullable: true})
    updated_at?: string;
}