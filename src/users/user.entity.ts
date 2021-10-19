import {Field, ID, ObjectType} from "@nestjs/graphql";
import {Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {DateTime} from "luxon";
import {v4 as uuidv4} from "uuid";

@Entity("users")
@ObjectType()
export class User {
    @PrimaryGeneratedColumn("uuid")
    @Field(Type => ID)
    @Generated("uuid")
    id: string = "";

    @Column({type: "text", name: "firstname"})
    @Field({nullable: false})
    firstname: string = "";

    @Column({type: "text", name: "lastname"})
    @Field({nullable: false})
    lastname: string = "";

    @Column({type: "text"})
    @Field({nullable: false})
    email: string = "";

    @Column({type: "text"})
    @Field({nullable: false})
    username: string = "";

    @Column({type: "text"})
    @Field({nullable: false})
    password: string = "";

    @Column({nullable: true, default: DateTime.now().toUTC().toISO(), type: "timestamp"})
    @Field({nullable: true})
    @CreateDateColumn({name: "created_at"})
    createdAt: Date = new Date();

    @Column({nullable: true, default: DateTime.now().toUTC().toISO(), type: "timestamp"})
    @Field({nullable: true})
    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date = new Date();
}