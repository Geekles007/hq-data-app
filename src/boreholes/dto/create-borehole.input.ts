import {Field, InputType} from "@nestjs/graphql";
import {DateTime} from "luxon";

@InputType()
export class CreateBoreholeInput {
    @Field({nullable: true})
    id?: string;

    @Field()
    reference: string = "";

    @Field({nullable: true})
    location: string = "";

    @Field()
    depth: number = 0;

    @Field()
    debitCubeH: number = 0;

    @Field()
    cost: number = 0;

    @Field({nullable: true})
    date: string = DateTime.now().toString();

    @Field({nullable: true})
    observation: string = "";

    @Field({nullable: true})
    debitCube: number = 0;

    @Field({nullable: true})
    pompe: string = "";

    @Field({nullable: true})
    doneBy: string = "";

    @Field({nullable: true})
    siteId?: string;
}