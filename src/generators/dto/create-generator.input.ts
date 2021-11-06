import {Field, InputType} from "@nestjs/graphql";
import {State} from "../generator.entity";

@InputType()
export class CreateGeneratorInput {
    @Field({nullable: true})
    id?: string;

    @Field()
    state: boolean = true;

    @Field()
    reference: string = "";

    @Field()
    observation: string = "";

    @Field()
    numSeries: string = "";

    @Field()
    power?: number = 0;

    @Field({nullable: true})
    brandId?: string;

    @Field({nullable: true})
    siteId?: string;
}