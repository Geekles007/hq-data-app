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
exports.SitesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const token_decorator_1 = require("../decorators/token.decorator");
const site_entity_1 = require("./site.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const sites_service_1 = require("./sites.service");
const common_1 = require("@nestjs/common");
const create_site_input_1 = require("./dto/create-site.input");
let SitesResolver = class SitesResolver {
    constructor(sitesService) {
        this.sitesService = sitesService;
    }
    findAllSite(first, after) {
        return this.sitesService.findAll(first, after);
    }
    findSiteById(id) {
        return this.sitesService.findOne(id);
    }
    createOrEditSite(createSiteInput, token) {
        return this.sitesService.createOrEdit(createSiteInput, token);
    }
    deleteSites(siteIds) {
        return this.sitesService.delete(siteIds);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => [site_entity_1.Site]),
    __param(0, (0, graphql_1.Args)('first')),
    __param(1, (0, graphql_1.Args)('after')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], SitesResolver.prototype, "findAllSite", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => site_entity_1.Site),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SitesResolver.prototype, "findSiteById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => site_entity_1.Site),
    __param(0, (0, graphql_1.Args)('createSiteInput')),
    __param(1, (0, token_decorator_1.TokenReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_site_input_1.CreateSiteInput, String]),
    __metadata("design:returntype", Promise)
], SitesResolver.prototype, "createOrEditSite", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => Boolean),
    __param(0, (0, graphql_1.Args)({ name: "siteIds", type: () => [graphql_1.ID] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], SitesResolver.prototype, "deleteSites", null);
SitesResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [sites_service_1.SitesService])
], SitesResolver);
exports.SitesResolver = SitesResolver;
//# sourceMappingURL=sites.resolver.js.map