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
exports.PlacesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const places_service_1 = require("../places/places.service");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const place_entity_1 = require("../places/place.entity");
const create_place_input_1 = require("../places/dto/create-place.input");
const token_decorator_1 = require("../decorators/token.decorator");
const PaginatePlaceResult_1 = require("./dto/PaginatePlaceResult");
let PlacesResolver = class PlacesResolver {
    constructor(placesService) {
        this.placesService = placesService;
    }
    findAllPlace(first, after) {
        return this.placesService.findAll(first, after);
    }
    findPlaceById(id) {
        return this.placesService.findOne(id);
    }
    createOrEditPlace(createPlaceInput, token) {
        return this.placesService.createOrEdit(createPlaceInput, token);
    }
    deletePlaces(placeIds) {
        return this.placesService.delete(placeIds);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => PaginatePlaceResult_1.PaginatePlaceResult),
    __param(0, (0, graphql_1.Args)('first')),
    __param(1, (0, graphql_1.Args)('after')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PlacesResolver.prototype, "findAllPlace", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => place_entity_1.Place),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlacesResolver.prototype, "findPlaceById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => place_entity_1.Place),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, token_decorator_1.TokenReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_place_input_1.CreatePlaceInput, String]),
    __metadata("design:returntype", Promise)
], PlacesResolver.prototype, "createOrEditPlace", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => Boolean),
    __param(0, (0, graphql_1.Args)({ name: "ids", type: () => [graphql_1.ID] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PlacesResolver.prototype, "deletePlaces", null);
PlacesResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [places_service_1.PlacesService])
], PlacesResolver);
exports.PlacesResolver = PlacesResolver;
//# sourceMappingURL=places.resolver.js.map