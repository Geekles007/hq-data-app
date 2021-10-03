import { Module } from '@nestjs/common';
import {DateScalar} from "../types/DateScalar";

@Module({
    providers: [DateScalar]
})
export class CommonModule {}
