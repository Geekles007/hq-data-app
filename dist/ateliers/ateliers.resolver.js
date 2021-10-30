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
exports.AteliersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const ateliers_service_1 = require("../ateliers/ateliers.service");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const atelier_entity_1 = require("../ateliers/atelier.entity");
const create_atelier_input_1 = require("../ateliers/dto/create-atelier.input");
const token_decorator_1 = require("../decorators/token.decorator");
let AteliersResolver = class AteliersResolver {
    constructor(ateliersService) {
        this.ateliersService = ateliersService;
    }
    findAllAtelier(first, after) {
        return this.ateliersService.findAll(first, after);
    }
    findAtelierById(id) {
        return this.ateliersService.findOne(id);
    }
    createOrEditAtelier(createAtelierInput, token) {
        return this.ateliersService.createOrEdit(createAtelierInput, token);
    }
    deleteAteliers(atelierIds) {
        return this.ateliersService.delete(atelierIds);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => [atelier_entity_1.Atelier]),
    __param(0, (0, graphql_1.Args)('first')),
    __param(1, (0, graphql_1.Args)('after')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AteliersResolver.prototype, "findAllAtelier", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => atelier_entity_1.Atelier),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AteliersResolver.prototype, "findAtelierById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => atelier_entity_1.Atelier),
    __param(0, (0, graphql_1.Args)('createAtelierInput')),
    __param(1, (0, token_decorator_1.TokenReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_atelier_input_1.CreateAtelierInput, String]),
    __metadata("design:returntype", Promise)
], AteliersResolver.prototype, "createOrEditAtelier", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => Boolean),
    __param(0, (0, graphql_1.Args)({ name: "atelierIds", type: () => [graphql_1.ID] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AteliersResolver.prototype, "deleteAteliers", null);
AteliersResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [ateliers_service_1.AteliersService])
], AteliersResolver);
exports.AteliersResolver = AteliersResolver;
//# sourceMappingURL=ateliers.resolver.js.map