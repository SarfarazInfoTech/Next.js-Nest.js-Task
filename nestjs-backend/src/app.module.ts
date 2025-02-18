import { Module } from '@nestjs/common';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [MenuController],
  providers: [MenuService, PrismaService],
})
export class AppModule {}