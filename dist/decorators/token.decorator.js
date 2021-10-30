"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenReq = void 0;
const common_1 = require("@nestjs/common");
exports.TokenReq = (0, common_1.createParamDecorator)((data, req) => {
    var _a, _b;
    return (_b = (_a = req === null || req === void 0 ? void 0 : req.args[2]) === null || _a === void 0 ? void 0 : _a.headers['authorization']) !== null && _b !== void 0 ? _b : undefined;
});
//# sourceMappingURL=token.decorator.js.map