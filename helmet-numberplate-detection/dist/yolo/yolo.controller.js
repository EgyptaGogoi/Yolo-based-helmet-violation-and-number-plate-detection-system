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
exports.YoloController = void 0;
const common_1 = require("@nestjs/common");
const yolo_service_1 = require("./yolo.service");
const platform_express_1 = require("@nestjs/platform-express");
let YoloController = class YoloController {
    constructor(yoloService) {
        this.yoloService = yoloService;
    }
    async interLocalImage(file) {
        if (!file) {
            throw new Error('File not provided');
        }
        return this.yoloService.inferLocalImage(file.path);
    }
};
exports.YoloController = YoloController;
__decorate([
    (0, common_1.Post)('local'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], YoloController.prototype, "interLocalImage", null);
exports.YoloController = YoloController = __decorate([
    (0, common_1.Controller)('yolo'),
    __metadata("design:paramtypes", [yolo_service_1.YoloService])
], YoloController);
//# sourceMappingURL=yolo.controller.js.map