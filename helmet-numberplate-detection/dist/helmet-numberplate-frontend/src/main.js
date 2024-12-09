"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const helmet_numberplate_frontend_module_1 = require("./helmet-numberplate-frontend.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(helmet_numberplate_frontend_module_1.HelmetNumberplateFrontendModule);
    await app.listen(process.env.port ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map