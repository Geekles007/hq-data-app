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
exports.SitesService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const luxon_1 = require("luxon");
const site_entity_1 = require("./site.entity");
const regions_service_1 = require("../regions/regions.service");
const typeorm_1 = require("typeorm");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("@nestjs/typeorm");
let SitesService = class SitesService {
    constructor(sitesRepository, usersService, regionsService) {
        this.sitesRepository = sitesRepository;
        this.usersService = usersService;
        this.regionsService = regionsService;
    }
    async create(data, connected) {
        const region = (data === null || data === void 0 ? void 0 : data.regionId) ? await this.regionsService.findOne(data === null || data === void 0 ? void 0 : data.regionId) : undefined;
        try {
            const newSite = await this.sitesRepository.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, data), { region: region, createdBy: connected, updatedBy: connected }));
            return this.sitesRepository.save(newSite);
        }
        catch (error) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }
    async delete(ids) {
        var _a;
        const dataToRemove = (_a = await this.sitesRepository.createQueryBuilder("sites")
            .where("sites.id IN (:...ids)", {
            ids: ids
        }).getMany()) !== null && _a !== void 0 ? _a : [];
        try {
            if (dataToRemove.length > 0) {
                const deleted = await this.sitesRepository.remove(dataToRemove);
                return true;
            }
        }
        catch (e) {
            throw new Error("We can't delete those users.");
        }
        return null;
    }
    async findAll(first, after) {
        const sites = await this.sitesRepository.find({
            take: first,
            skip: after,
            relations: ["region"]
        });
        try {
            return sites;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findOne(id) {
        return await this.sitesRepository.findOneOrFail(id, {
            relations: ["region", "createdBy", "updatedBy"]
        });
    }
    async update(id, data, connected) {
        var _a;
        const region = (data === null || data === void 0 ? void 0 : data.regionId) ? await this.regionsService.findOne(data === null || data === void 0 ? void 0 : data.regionId) : undefined;
        let site = await this.sitesRepository.findOneOrFail({
            where: { id: (_a = data === null || data === void 0 ? void 0 : data.id) !== null && _a !== void 0 ? _a : "" },
            relations: ["createdBy", "region"]
        });
        if (site) {
            site.updatedBy = connected;
            site.name = data.name;
            site.region = region;
            site.updatedAt = new Date(luxon_1.DateTime.now().toUTC().toISO());
            return await this.sitesRepository.save(site);
        }
        else {
            throw new Error("Something went wrong.");
        }
    }
    async createOrEdit(data, token) {
        const connected = await this.usersService.getConnectedId(token);
        const exists = await this.sitesRepository.createQueryBuilder("sites")
            .where("sites.reference = :reference", { reference: data.reference }).getOne();
        if (!exists) {
            if (data === null || data === void 0 ? void 0 : data.id) {
                return this.update(data === null || data === void 0 ? void 0 : data.id, data, connected);
            }
            else {
                return this.create(data, connected);
            }
        }
        else {
            throw new Error("This site already exists!");
        }
    }
};
SitesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(site_entity_1.Site)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UsersService,
        regions_service_1.RegionsService])
], SitesService);
exports.SitesService = SitesService;
//# sourceMappingURL=sites.service.js.map