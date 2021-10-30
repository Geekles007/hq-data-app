"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoreholesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const boreholes_service_1 = require("./boreholes.service");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const borehole_entity_1 = require("./borehole.entity");
const create_borehole_input_1 = require("./dto/create-borehole.input");
const token_decorator_1 = require("../decorators/token.decorator");
let BoreholesResolver = class BoreholesResolver {
    constructor(boreholesService) {
        this.boreholesService = boreholesService;
    }
    findAllBorehole(first, after) {
        return this.boreholesService.findAll(first, after);
    }
    findBoreholeById(id) {
        return this.boreholesService.findOne(id);
    }
    createOrEditBorehole(createBoreholeInput, token) {
        return this.boreholesService.createOrEdit(createBoreholeInput, token);
    }
    deleteBoreholes(boreholeIds) {
        return this.boreholesService.delete(boreholeIds);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => [borehole_entity_1.Borehole]),
    __param(0, (0, graphql_1.Args)('first')),
    __param(1, (0, graphql_1.Args)('after')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BoreholesResolver.prototype, "findAllBorehole", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => borehole_entity_1.Borehole),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoreholesResolver.prototype, "findBoreholeById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => borehole_entity_1.Borehole),
    __param(0, (0, graphql_1.Args)('createBoreholeInput')),
    __param(1, (0, token_decorator_1.TokenReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_borehole_input_1.CreateBoreholeInput, String]),
    __metadata("design:returntype", Promise)
], BoreholesResolver.prototype, "createOrEditBorehole", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => Boolean),
    __param(0, (0, graphql_1.Args)({ name: "boreholeIds", type: () => [graphql_1.ID] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BoreholesResolver.prototype, "deleteBoreholes", null);
BoreholesResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [boreholes_service_1.BoreholesService])
], BoreholesResolver);
exports.BoreholesResolver = BoreholesResolver;
//# sourceMappingURL=boreholes.resolver.js.map