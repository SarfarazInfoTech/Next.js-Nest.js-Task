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
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MenuService = class MenuService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMenus() {
        return this.prisma.menu.findMany({
            where: { parentId: null },
            include: {
                children: {
                    include: {
                        children: {
                            include: {
                                children: {
                                    include: {
                                        children: {
                                            include: { children: true },
                                        }
                                    },
                                }
                            },
                        },
                    },
                },
            },
            orderBy: { depth: 'asc' },
        });
    }
    async createMenu(dto) {
        let depth = 0;
        if (dto.parentId) {
            const parent = await this.prisma.menu.findUnique({
                where: { id: dto.parentId },
                select: { depth: true },
            });
            if (parent) {
                depth = parent.depth + 1;
            }
        }
        return this.prisma.menu.create({
            data: {
                name: dto.name,
                parentId: dto.parentId || null,
                depth,
            },
        });
    }
    async updateMenu(id, dto) {
        const menu = await this.prisma.menu.findUnique({ where: { id } });
        if (!menu)
            throw new common_1.NotFoundException('Menu not found');
        return this.prisma.menu.update({
            where: { id },
            data: { name: dto.name, parentId: dto.parentId || null },
        });
    }
    async deleteMenu(id) {
        return this.prisma.menu.delete({ where: { id } });
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MenuService);
//# sourceMappingURL=menu.service.js.map