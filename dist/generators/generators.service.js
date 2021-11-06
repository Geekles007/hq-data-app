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
exports.GeneratorsService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const luxon_1 = require("luxon");
const sites_service_1 = require("../sites/sites.service");
const brands_service_1 = require("../brands/brands.service");
const typeorm_1 = require("typeorm");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("@nestjs/typeorm");
const generator_entity_1 = require("./generator.entity");
let GeneratorsService = class GeneratorsService {
    constructor(generatorsRepository, usersService, sitesService, brandsService) {
        this.generatorsRepository = generatorsRepository;
        this.usersService = usersService;
        this.sitesService = sitesService;
        this.brandsService = brandsService;
    }
    async create(data, connected) {
        var _a, _b;
        const brand = (data === null || data === void 0 ? void 0 : data.brandId) ? await this.brandsService.findOne(data === null || data === void 0 ? void 0 : data.brandId) : undefined;
        const site = (data === null || data === void 0 ? void 0 : data.siteId) ? await this.sitesService.findOne(data === null || data === void 0 ? void 0 : data.siteId) : undefined;
        try {
            const newGenerator = await this.generatorsRepository.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, data), { state: data.state ? generator_entity_1.State.f : generator_entity_1.State.p, brand: brand, site: site, observation: (_a = data === null || data === void 0 ? void 0 : data.observation) !== null && _a !== void 0 ? _a : "", numSeries: (_b = data === null || data === void 0 ? void 0 : data.numSeries) !== null && _b !== void 0 ? _b : "", createdBy: connected, updatedBy: connected }));
            return this.generatorsRepository.save(newGenerator);
        }
        catch (error) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }
    async delete(ids) {
        var _a;
        const dataToRemove = (_a = await this.generatorsRepository.createQueryBuilder("generators")
            .where("generators.id IN (:...ids)", {
            ids: ids
        }).getMany()) !== null && _a !== void 0 ? _a : [];
        try {
            if (dataToRemove.length > 0) {
                const deleted = await this.generatorsRepository.remove(dataToRemove);
                return true;
            }
        }
        catch (e) {
            throw new Error("We can't delete those users.");
        }
        return null;
    }
    async findAll(first, after) {
        const [result, total] = await this.generatorsRepository.findAndCount({
            take: first,
            skip: after,
            relations: ["createdBy", "updatedBy", "site", "brand"],
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
        return await this.generatorsRepository.findOneOrFail(id, {
            relations: ["createdBy", "updatedBy", "site", "brand"]
        });
    }
    async update(id, data, connected) {
        var _a;
        const brand = (data === null || data === void 0 ? void 0 : data.brandId) ? await this.brandsService.findOne(data === null || data === void 0 ? void 0 : data.brandId) : undefined;
        const site = (data === null || data === void 0 ? void 0 : data.siteId) ? await this.sitesService.findOne(data === null || data === void 0 ? void 0 : data.siteId) : undefined;
        let generator = await this.generatorsRepository.findOneOrFail({
            where: { id: (_a = data === null || data === void 0 ? void 0 : data.id) !== null && _a !== void 0 ? _a : "" },
            relations: ["createdBy", "site", "brand"]
        });
        if (generator) {
            generator.updatedBy = connected;
            generator.reference = data.reference && data.reference !== "" ? data.reference : generator === null || generator === void 0 ? void 0 : generator.reference;
            generator.power = data.power ? data.power : generator === null || generator === void 0 ? void 0 : generator.power;
            generator.state = data.state !== undefined ? (data.state ? generator_entity_1.State.f : generator_entity_1.State.p) : ((generator === null || generator === void 0 ? void 0 : generator.state) ? generator_entity_1.State.f : generator_entity_1.State.p);
            generator.brand = brand;
            generator.site = site;
            generator.observation = (data === null || data === void 0 ? void 0 : data.observation) && (data === null || data === void 0 ? void 0 : data.observation) !== "" ? data === null || data === void 0 ? void 0 : data.observation : generator === null || generator === void 0 ? void 0 : generator.observation;
            generator.numSeries = (data === null || data === void 0 ? void 0 : data.numSeries) && (data === null || data === void 0 ? void 0 : data.numSeries) !== "" ? data === null || data === void 0 ? void 0 : data.numSeries : generator === null || generator === void 0 ? void 0 : generator.numSeries;
            generator.updatedAt = new Date(luxon_1.DateTime.now().toUTC().toISO());
            return await this.generatorsRepository.save(generator);
        }
        else {
            throw new Error("Something went wrong.");
        }
    }
    async createOrEdit(data, token) {
        const connected = await this.usersService.getConnectedId(token);
        const exists = await this.generatorsRepository.createQueryBuilder("generators")
            .where("generators.reference = :reference", { reference: data.reference }).getOne();
        if (data === null || data === void 0 ? void 0 : data.id) {
            return this.update(data === null || data === void 0 ? void 0 : data.id, data, connected);
        }
        else {
            if (!exists) {
                return this.create(data, connected);
            }
            else {
                throw new Error("This generator already exists!");
            }
        }
    }
};
GeneratorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(generator_entity_1.Generator)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UsersService,
        sites_service_1.SitesService,
        brands_service_1.BrandsService])
], GeneratorsService);
exports.GeneratorsService = GeneratorsService;
//# sourceMappingURL=generators.service.js.map