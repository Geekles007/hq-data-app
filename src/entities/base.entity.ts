import {Field, ID, ObjectType} from "@nestjs/graphql";
import {Column, CreateDateColumn, Generated, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {DateTime} from "luxon";
import {User} from "../users/user.entity";

@ObjectType()
export class BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    @Field(Type => ID)
    @Generated("uuid")
    id: string = "";

    @Column({nullable: true, default: DateTime.now().toUTC().toISO(), type: "timestamp"})
    @Field({nullable: true})
    @CreateDateColumn({name: "created_at"})
    createdAt: Date = new Date();

    @Column({nullable: true, default: DateTime.now().toUTC().toISO(), type: "timestamp"})
    @Field({nullable: true})
    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date = new Date();
}