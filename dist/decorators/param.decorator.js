"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenReq = void 0;
const common_1 = require("@nestjs/common");
exports.TokenReq = (0, common_1.createParamDecorator)((data, req) => {
    return req.args[2].headers['authorization'];
});
//# sourceMappingURL=param.decorator.js.map