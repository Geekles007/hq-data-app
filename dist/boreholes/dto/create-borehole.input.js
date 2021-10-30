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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBoreholeInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const luxon_1 = require("luxon");
let CreateBoreholeInput = class CreateBoreholeInput {
    constructor() {
        this.reference = "";
        this.location = "";
        this.depth = 0;
        this.debitCubeH = 0;
        this.cost = 0;
        this.date = luxon_1.DateTime.now().toString();
        this.observation = "";
        this.debitCube = 0;
        this.pompe = "";
        this.doneBy = "";
    }
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateBoreholeInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateBoreholeInput.prototype, "reference", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateBoreholeInput.prototype, "location", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateBoreholeInput.prototype, "depth", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateBoreholeInput.prototype, "debitCubeH", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateBoreholeInput.prototype, "cost", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateBoreholeInput.prototype, "date", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateBoreholeInput.prototype, "observation", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], CreateBoreholeInput.prototype, "debitCube", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateBoreholeInput.prototype, "pompe", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateBoreholeInput.prototype, "doneBy", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateBoreholeInput.prototype, "siteId", void 0);
CreateBoreholeInput = __decorate([
    (0, graphql_1.InputType)()
], CreateBoreholeInput);
exports.CreateBoreholeInput = CreateBoreholeInput;
//# sourceMappingURL=create-borehole.input.js.map