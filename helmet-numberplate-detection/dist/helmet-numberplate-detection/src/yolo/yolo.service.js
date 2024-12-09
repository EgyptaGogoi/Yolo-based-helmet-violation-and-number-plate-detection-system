"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoloService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const fs = require("fs");
let YoloService = class YoloService {
    constructor() {
        this.apiUrl = process.env.ROBOFLOW_API_URL;
        this.apiKey = process.env.ROBOFLOW_API_KEY;
    }
    async inferLocalImage(imagePath) {
        const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
        try {
            const response = await (0, axios_1.default)({
                method: 'POST',
                url: this.apiUrl,
                params: {
                    api_key: this.apiKey,
                },
                data: imageBase64,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            return response.data;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
exports.YoloService = YoloService;
exports.YoloService = YoloService = __decorate([
    (0, common_1.Injectable)()
], YoloService);
//# sourceMappingURL=yolo.service.js.map