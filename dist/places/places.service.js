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
exports.PlacesService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const luxon_1 = require("luxon");
const sites_service_1 = require("../sites/sites.service");
const typeorm_1 = require("typeorm");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("@nestjs/typeorm");
const place_entity_1 = require("./place.entity");
let PlacesService = class PlacesService {
    constructor(placesRepository, usersService, sitesService) {
        this.placesRepository = placesRepository;
        this.usersService = usersService;
        this.sitesService = sitesService;
    }
    async create(data, connected) {
        const site = (data === null || data === void 0 ? void 0 : data.siteId) ? await this.sitesService.findOne(data === null || data === void 0 ? void 0 : data.siteId) : undefined;
        try {
            const newPlace = await this.placesRepository.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, data), { site: site, createdBy: connected, updatedBy: connected }));
            return this.placesRepository.save(newPlace);
        }
        catch (error) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }
    async delete(ids) {
        var _a;
        const dataToRemove = (_a = await this.placesRepository.createQueryBuilder("places")
            .where("places.id IN (:...ids)", {
            ids: ids
        }).getMany()) !== null && _a !== void 0 ? _a : [];
        try {
            if (dataToRemove.length > 0) {
                const deleted = await this.placesRepository.remove(dataToRemove);
                return true;
            }
        }
        catch (e) {
            throw new Error("We can't delete those users.");
        }
        return null;
    }
    async findAll(first, after) {
        const [result, total] = await this.placesRepository.findAndCount({
            take: first,
            skip: after,
            relations: ["site", "createdBy", "updatedBy"]
        });
        try {
            return {
                data: result,
                count: total
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findOne(id) {
        var _a;
        return (_a = await this.placesRepository.findOneOrFail(id, {
            relations: ["site", "createdBy", "updatedBy"]
        })) !== null && _a !== void 0 ? _a : null;
    }
    async update(id, data, connected) {
        var _a;
        const site = (data === null || data === void 0 ? void 0 : data.siteId) ? await this.sitesService.findOne(data === null || data === void 0 ? void 0 : data.siteId) : undefined;
        let place = await this.placesRepository.findOneOrFail({
            where: { id: (_a = data === null || data === void 0 ? void 0 : data.id) !== null && _a !== void 0 ? _a : "" },
            relations: ["createdBy", "site"]
        });
        if (place) {
            place.updatedBy = connected;
            place.name = data.name && (data === null || data === void 0 ? void 0 : data.name) !== "" ? data === null || data === void 0 ? void 0 : data.name : place === null || place === void 0 ? void 0 : place.name;
            place.site = site;
            place.updatedAt = new Date(luxon_1.DateTime.now().toUTC().toISO());
            return await this.placesRepository.save(place);
        }
        else {
            throw new Error("Something went wrong.");
        }
    }
    async createOrEdit(data, token) {
        const connected = await this.usersService.getConnectedId(token);
        const exists = await this.placesRepository.createQueryBuilder("places")
            .where("places.name = :name", { name: data.name }).getOne();
        if (data === null || data === void 0 ? void 0 : data.id) {
            return this.update(data === null || data === void 0 ? void 0 : data.id, data, connected);
        }
        else {
            if (!exists) {
                return this.create(data, connected);
            }
            else {
                throw new Error("This place already exists!");
            }
        }
    }
};
PlacesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(place_entity_1.Place)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UsersService,
        sites_service_1.SitesService])
], PlacesService);
exports.PlacesService = PlacesService;
//# sourceMappingURL=places.service.js.map