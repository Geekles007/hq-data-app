import {createParamDecorator} from "@nestjs/common";

export const TokenReq = createParamDecorator((data: any, req: any) => {
    return req?.args[2]?.headers['authorization'] ?? undefined;
});