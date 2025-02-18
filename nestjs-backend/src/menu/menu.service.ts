import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) { }

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

  async createMenu(dto: CreateMenuDto) {
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

  async updateMenu(id: string, dto: UpdateMenuDto) {
    const menu = await this.prisma.menu.findUnique({ where: { id } });
    if (!menu) throw new NotFoundException('Menu not found');

    return this.prisma.menu.update({
      where: { id },
      data: { name: dto.name, parentId: dto.parentId || null },
    });
  }

  async deleteMenu(id: string) {
    return this.prisma.menu.delete({ where: { id } });
  }
}
