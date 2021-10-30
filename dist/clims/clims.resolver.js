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
exports.ClimsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const clims_service_1 = require("./clims.service");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const clim_entity_1 = require("./clim.entity");
const create_clim_input_1 = require("./dto/create-clim.input");
const token_decorator_1 = require("../decorators/token.decorator");
let ClimsResolver = class ClimsResolver {
    constructor(climsService) {
        this.climsService = climsService;
    }
    findAllClim(first, after) {
        return this.climsService.findAll(first, after);
    }
    findClimById(id) {
        return this.climsService.findOne(id);
    }
    createOrEditClim(createClimInput, token) {
        return this.climsService.createOrEdit(createClimInput, token);
    }
    deleteClims(climIds) {
        return this.climsService.delete(climIds);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => [clim_entity_1.Clim]),
    __param(0, (0, graphql_1.Args)('first')),
    __param(1, (0, graphql_1.Args)('after')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ClimsResolver.prototype, "findAllClim", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => clim_entity_1.Clim),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClimsResolver.prototype, "findClimById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => clim_entity_1.Clim),
    __param(0, (0, graphql_1.Args)('createClimInput')),
    __param(1, (0, token_decorator_1.TokenReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_clim_input_1.CreateClimInput, String]),
    __metadata("design:returntype", Promise)
], ClimsResolver.prototype, "createOrEditClim", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => Boolean),
    __param(0, (0, graphql_1.Args)({ name: "climIds", type: () => [graphql_1.ID] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ClimsResolver.prototype, "deleteClims", null);
ClimsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [clims_service_1.ClimsService])
], ClimsResolver);
exports.ClimsResolver = ClimsResolver;
//# sourceMappingURL=clims.resolver.js.map