"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelmetNumberplateFrontendModule = void 0;
const common_1 = require("@nestjs/common");
const helmet_numberplate_frontend_controller_1 = require("./helmet-numberplate-frontend.controller");
const helmet_numberplate_frontend_service_1 = require("./helmet-numberplate-frontend.service");
let HelmetNumberplateFrontendModule = class HelmetNumberplateFrontendModule {
};
exports.HelmetNumberplateFrontendModule = HelmetNumberplateFrontendModule;
exports.HelmetNumberplateFrontendModule = HelmetNumberplateFrontendModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [helmet_numberplate_frontend_controller_1.HelmetNumberplateFrontendController],
        providers: [helmet_numberplate_frontend_service_1.HelmetNumberplateFrontendService],
    })
], HelmetNumberplateFrontendModule);
//# sourceMappingURL=helmet-numberplate-frontend.module.js.map