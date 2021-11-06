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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const luxon_1 = require("luxon");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../auth/constants");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async findAll(first, after) {
        const [result, total] = await this.usersRepository.findAndCount({
            take: first,
            skip: after
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
        return await this.usersRepository.findOneOrFail(id);
    }
    async create(createUserInput) {
        try {
            const newUser = await this.usersRepository.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createUserInput), { blocked: true, createdAt: luxon_1.DateTime.now().toUTC().toISO(), updatedAt: luxon_1.DateTime.now().toUTC().toISO(), password: await bcrypt_1.default.hash(createUserInput.password, 12) }));
            return this.usersRepository.save(newUser);
        }
        catch (error) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }
    async update(id, createUserInput) {
        let user = await this.usersRepository.findOneOrFail(createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.id);
        const newPassword = (createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.password) && (createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.password) !== "" ? await bcrypt_1.default.hash(createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.password, 12) : user === null || user === void 0 ? void 0 : user.password;
        if (user) {
            return this.usersRepository.save({
                id: id,
                firstname: (createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.firstname) && (createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.firstname) !== "" ? createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.firstname : user === null || user === void 0 ? void 0 : user.firstname,
                lastname: (createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.lastname) && (createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.lastname) !== "" ? createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.lastname : user === null || user === void 0 ? void 0 : user.lastname,
                email: (createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.email) && (createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.email) !== "" ? createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.email : user === null || user === void 0 ? void 0 : user.email,
                username: (createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.username) && (createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.username) !== "" ? createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.username : user === null || user === void 0 ? void 0 : user.username,
                blocked: (createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.blocked) !== undefined ? createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.blocked : user === null || user === void 0 ? void 0 : user.blocked,
                password: newPassword,
                createdAt: user === null || user === void 0 ? void 0 : user.createdAt,
                updatedAt: luxon_1.DateTime.now().toUTC().toISO()
            });
        }
        else {
            throw new Error("Something went wrong.");
        }
    }
    async createOrEdit(data) {
        const exists = await this.usersRepository.createQueryBuilder("users")
            .where("users.email = :email", { email: data.email })
            .orWhere("users.username = :username", { username: data.username })
            .getOne();
        if (data === null || data === void 0 ? void 0 : data.id) {
            return this.update(data === null || data === void 0 ? void 0 : data.id, data);
        }
        else {
            if (!exists) {
                return this.create(data);
            }
            else {
                throw new Error("This user already exists!");
            }
        }
    }
    async delete(ids) {
        var _a;
        const dataToRemove = (_a = await this.usersRepository.createQueryBuilder("users")
            .where("users.id IN (:...ids)", {
            ids: ids
        }).getMany()) !== null && _a !== void 0 ? _a : [];
        try {
            if (dataToRemove.length > 0) {
                const deleted = await this.usersRepository.remove(dataToRemove);
                return true;
            }
        }
        catch (e) {
            throw new Error("We can't delete those users.");
        }
        return null;
    }
    async updateToken(connected, token) {
        if (connected) {
            return this.usersRepository.save(Object.assign(Object.assign({}, connected), { token: token, updatedAt: luxon_1.DateTime.now().toUTC().toISO() }));
        }
        else {
            throw new Error("Something went wrong.");
        }
    }
    async getConnectedId(token) {
        var _a, _b;
        const jwt = token.replace('Bearer ', '');
        let connected;
        const jwtService = new jwt_1.JwtService({
            secret: (_a = constants_1.jwtConstants.secret) !== null && _a !== void 0 ? _a : ""
        });
        const decoded = await jwtService.decode(jwt, { json: true });
        if (decoded) {
            connected = await this.usersRepository.createQueryBuilder("users")
                .where("users.email = :email", { email: (_b = decoded === null || decoded === void 0 ? void 0 : decoded.sub) !== null && _b !== void 0 ? _b : "" })
                .getOne();
        }
        return connected;
    }
    async findOneUser(login) {
        try {
            return await this.usersRepository.createQueryBuilder("users")
                .where("users.username = :login", { login: login })
                .orWhere("users.email = :login", { login: login }).getOne();
        }
        catch (e) {
            throw new Error("Username or password incorrect.");
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map